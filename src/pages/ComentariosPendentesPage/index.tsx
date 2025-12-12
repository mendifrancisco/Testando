import React, { useState, useEffect } from "react";
import comentarioService, { ComentarioResponseDto } from "../../../services/api/comentarios";

export default function ComentariosPendentesPage() {
    const [comentarios, setComentarios] = useState<ComentarioResponseDto[]>([]);
    const [carregando, setCarregando] = useState(true);

    const carregarPendentes = async () => {
        try {
            setCarregando(true);
            const data = await comentarioService.listarPendentes();
            setComentarios(data);
        } catch (error) {
            console.error("Erro ao carregar comentários pendentes:", error);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarPendentes();
    }, []);

    const handleAprovar = async (id: number) => {
        try {
            await comentarioService.aprovar(id);
            // Remover da lista após aprovar
            setComentarios(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error("Erro ao aprovar comentário:", error);
        }
    };

    const handleDeletar = async (id: number) => {
        if (!confirm("Tem certeza que deseja deletar este comentário?")) return;

        try {
            await comentarioService.deletar(id);
            setComentarios(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error("Erro ao deletar comentário:", error);
        }
    };

    if (carregando) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">Comentários Pendentes</h1>
                <div className="text-center py-12 text-slate-500">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">
                Comentários Pendentes de Aprovação
            </h1>

            {comentarios.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
                    <p className="text-slate-500">Nenhum comentário pendente de aprovação.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {comentarios.map((comentario) => (
                        <div
                            key={comentario.id}
                            className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-blue-700 font-semibold">
                                                {comentario.usuarioNome.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800">
                                                {comentario.usuarioNome}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {new Date(comentario.criadoEm).toLocaleDateString("pt-BR", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <p className="text-sm text-slate-600 mb-1">
                                        Vídeo: <span className="font-medium">{comentario.videoTitulo}</span>
                                    </p>
                                </div>

                                <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">
                                    {comentario.texto}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleAprovar(comentario.id)}
                                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    ✓ Aprovar
                                </button>
                                <button
                                    onClick={() => handleDeletar(comentario.id)}
                                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    ✕ Rejeitar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
