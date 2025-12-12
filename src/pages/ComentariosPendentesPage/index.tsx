import React, { useState, useEffect } from "react";
import comentarioService, { ComentarioResponseDto } from "../../../services/api/comentarios";
import "./ComentariosPendentesPage.css";

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
            <div className="comentarios-pendentes-container">
                <h1 className="comentarios-pendentes-title">Comentários Pendentes</h1>
                <div className="comentarios-pendentes-loading">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="comentarios-pendentes-container">
            <h1 className="comentarios-pendentes-title">
                Comentários Pendentes de Aprovação
            </h1>

            {comentarios.length === 0 ? (
                <div className="comentarios-pendentes-empty">
                    <p className="comentarios-pendentes-empty-text">
                        Nenhum comentário pendente de aprovação.
                    </p>
                </div>
            ) : (
                <div className="comentarios-pendentes-list">
                    {comentarios.map((comentario) => (
                        <div
                            key={comentario.id}
                            className="comentarios-pendentes-card"
                        >
                            <div className="comentarios-pendentes-card-content">
                                <div className="comentarios-pendentes-card-header">
                                    <div className="comentarios-pendentes-user-info">
                                        <div className="comentarios-pendentes-avatar">
                                            <span className="comentarios-pendentes-avatar-text">
                                                {comentario.usuarioNome.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="comentarios-pendentes-user-details">
                                            <p className="comentarios-pendentes-user-name">
                                                {comentario.usuarioNome}
                                            </p>
                                            <p className="comentarios-pendentes-date">
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

                                <div className="comentarios-pendentes-video-info">
                                    <p className="comentarios-pendentes-video-text">
                                        Vídeo: <span className="comentarios-pendentes-video-title">{comentario.videoTitulo}</span>
                                    </p>
                                </div>

                                <p className="comentarios-pendentes-text">
                                    {comentario.texto}
                                </p>
                            </div>

                            <div className="comentarios-pendentes-actions">
                                <button
                                    onClick={() => handleAprovar(comentario.id)}
                                    className="comentarios-pendentes-btn comentarios-pendentes-btn-aprovar"
                                >
                                    ✓ Aprovar
                                </button>
                                <button
                                    onClick={() => handleDeletar(comentario.id)}
                                    className="comentarios-pendentes-btn comentarios-pendentes-btn-rejeitar"
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