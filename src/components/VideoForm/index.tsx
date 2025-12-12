import React, { useState } from "react";
import * as styles from "./styles";

export interface CriarVideoDTO {
    titulo: string;
    urlVideo: string;
    descricao: string;
    categoria: string;
    notificacaoHabilitada: boolean;
}

interface Props {
    onSubmit: (dto: CriarVideoDTO) => Promise<void>;
    onCancel: () => void;
}

export default function VideoForm({ onSubmit, onCancel }: Props) {
    const [titulo, setTitulo] = useState("");
    const [urlVideo, setUrlVideo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [notificacaoHabilitada, setNotificacaoHabilitada] = useState(true);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const validar = () => {
        if (!titulo.trim()) return "Título é obrigatório.";
        if (!urlVideo.trim()) return "URL do vídeo é obrigatória.";
        if (!descricao.trim()) return "Descrição é obrigatória.";
        if (!categoria.trim()) return "Categoria é obrigatória.";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro(null);

        const valida = validar();
        if (valida) {
            setErro(valida);
            return;
        }

        const dto: CriarVideoDTO = {
            titulo: titulo.trim(),
            urlVideo: urlVideo.trim(),
            descricao: descricao.trim(),
            categoria: categoria.trim(),
            notificacaoHabilitada,
        };

        try {
            setCarregando(true);
            await onSubmit(dto);
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Erro desconhecido";
            setErro(`Falha ao criar vídeo: ${msg}`);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Enviar nova aula</h1>
                <p className={styles.subtitle}>Preencha os dados do vídeo</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                {erro && (
                    <div className={styles.errorContainer}>
                        <span>⚠️</span>
                        <span>{erro}</span>
                    </div>
                )}

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Título</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Ex: Introdução ao React"
                        required
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>URL do vídeo (YouTube / Drive / Vimeo)</label>
                    <div className={styles.linkInputWrapper}>
                        <div className={styles.linkIconWrapper}>
                            <svg className={styles.linkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className={styles.linkInput}
                            value={urlVideo}
                            onChange={(e) => setUrlVideo(e.target.value)}
                            placeholder="https://..."
                            required
                        />
                    </div>
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Descrição</label>
                    <textarea
                        className={styles.textarea}
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        rows={4}
                        placeholder="Descreva o conteúdo da aula..."
                        required
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label className={styles.label}>Categoria</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        placeholder="Ex: Frontend"
                        required
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={notificacaoHabilitada}
                            onChange={(e) => setNotificacaoHabilitada(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className={styles.label}>Habilitar notificação para os alunos</span>
                    </label>
                </div>

                <div className={styles.footer}>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-3 rounded-lg font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={carregando}
                            className={styles.submitButton}
                        >
                            {carregando ? "Enviando..." : "Enviar Aula"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
