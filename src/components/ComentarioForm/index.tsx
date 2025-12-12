import React, { useState } from "react";
import comentarioService from "../../../services/api/comentarios";

interface Props {
    videoId: number;
    usuarioId: number;
    onComentarioAdicionado: () => void;
}

export default function ComentarioForm({ videoId, usuarioId, onComentarioAdicionado }: Props) {
    const [texto, setTexto] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!texto.trim()) {
            setErro("O comentário não pode estar vazio");
            return;
        }

        try {
            setEnviando(true);
            setErro(null);

            await comentarioService.criar(videoId, {
                usuarioId,
                texto: texto.trim()
            });

            setTexto("");
            onComentarioAdicionado();
        } catch (err: any) {
            console.error("Erro ao criar comentário:", err);
            setErro(err?.response?.data?.message || "Erro ao enviar comentário");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            {erro && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-100">
                    {erro}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Adicionar comentário
                </label>
                <textarea
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Escreva seu comentário..."
                    rows={3}
                    disabled={enviando}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none disabled:bg-slate-50 disabled:text-slate-500"
                />
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={enviando || !texto.trim()}
                    className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                    {enviando ? "Enviando..." : "Comentar"}
                </button>
            </div>
        </form>
    );
}
