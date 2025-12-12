import React, { useState, useEffect } from 'react';
import { Video } from '../../../types';
import { ArrowLeft, Heart, Calendar } from 'lucide-react';
import * as styles from './styles';
import { useAuth } from '../../contexts/AuthContext';
import comentarioService, { ComentarioResponseDto } from '../../../services/api/comentarios';
import ComentarioForm from '../ComentarioForm';
import ComentarioList from '../ComentarioList';

interface VideoDetailProps {
    video: Video;
    onBack: () => void;
    isLiked: boolean;
    onToggleLike: (id: string) => void;
}

export const VideoDetail: React.FC<VideoDetailProps> = ({ video, onBack, isLiked, onToggleLike }) => {
    const { user } = useAuth();
    const [comentarios, setComentarios] = useState<ComentarioResponseDto[]>([]);
    const [carregandoComentarios, setCarregandoComentarios] = useState(true);

    const carregarComentarios = async () => {
        try {
            setCarregandoComentarios(true);
            const data = await comentarioService.listarPublicos(Number(video.id));
            setComentarios(data);
        } catch (error) {
            console.error("Erro ao carregar comentários:", error);
        } finally {
            setCarregandoComentarios(false);
        }
    };

    useEffect(() => {
        carregarComentarios();
    }, [video.id]);

    const getEmbedUrl = (url: string | undefined) => {
        if (!url || typeof url !== 'string') return null;
        try {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            if (match && match[2].length === 11) {
                return `https://www.youtube.com/embed/${match[2]}`;
            }
        } catch (e) {
            console.error("Error parsing URL:", url, e);
            return null;
        }
        return null;
    };

    const embedUrl = getEmbedUrl(video?.url);

    return (
        <div className={styles.container}>
            <button
                onClick={onBack}
                className={styles.backButton}
            >
                <ArrowLeft size={20} />
                Voltar para o catálogo
            </button>

            <div className={styles.grid}>
                <div className={styles.mainContent}>
                    
                    <div className={styles.videoPlayerWrapper}>
                        {embedUrl ? (
                            <iframe
                                src={embedUrl}
                                title={video.title}
                                className={styles.iframe}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className={styles.externalVideoWrapper}>
                                <p className={styles.externalVideoTitle}>Vídeo Externo</p>
                                <p className={styles.externalVideoText}>Este vídeo não pode ser incorporado diretamente. Clique abaixo para abrir.</p>
                                <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.externalVideoButton}
                                >
                                    Abrir Vídeo Original
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Video Info */}
                    <div>
                        <h1 className={styles.videoTitle}>{video.title}</h1>
                        <div className={styles.videoMetaContainer}>
                            <div className={styles.videoMetaLeft}>
                                <span className={styles.dateWrapper}>
                                    <Calendar size={16} />
                                    {new Date(video.createdAt).toLocaleDateString('pt-BR')}
                                </span>
                                <span className={styles.categoryBadge}>
                                    {video.category}
                                </span>
                            </div>

                            <div className={styles.videoActions}>
                                <button
                                    onClick={() => onToggleLike(video.id)}
                                    className={styles.getLikeButtonClass(isLiked)}
                                >
                                    <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                                    <span className="font-medium">{isLiked ? 'Curtido' : 'Curtir'}</span>
                                </button>
                                {/* <button className={styles.shareButton}>
                                    <Share2 size={20} />
                                    <span className="font-medium">Compartilhar</span>
                                </button> */}
                            </div>
                        </div>

                        <div className={styles.descriptionContainer}>
                            <h3 className={styles.descriptionTitle}>Descrição</h3>
                            <p className={styles.descriptionText}>
                                {video.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar / Comments Column */}
                <div className={styles.sidebar}>
                    <div className={styles.commentsWrapper}>
                        <div className={styles.commentsHeader}>
                            <h3 className={styles.commentsTitle}>
                                Comentários <span className={styles.commentsCount}>({comentarios.length})</span>
                            </h3>
                        </div>

                        {user && (
                            <div className="mb-6">
                                <ComentarioForm
                                    videoId={Number(video.id)}
                                    usuarioId={Number(user.id)}
                                    onComentarioAdicionado={carregarComentarios}
                                />
                            </div>
                        )}

                        <ComentarioList
                            comentarios={comentarios}
                            carregando={carregandoComentarios}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
