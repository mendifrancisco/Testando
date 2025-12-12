import React, { useState, useMemo } from 'react';
import { Video, CATEGORIES } from '../../../types';
import { Search, Trash2, Calendar, Tag, Play } from 'lucide-react';
import * as styles from './styles';

interface VideoListProps {
    videos: Video[];
    onDeleteVideo: (id: string) => void;
    onVideoClick: (video: Video) => void;
    title?: string;
    emptyMessage?: string;
}

export const VideoList: React.FC<VideoListProps> = ({
    videos,
    onDeleteVideo,
    onVideoClick,
    title = "Catálogo de Aulas",
    emptyMessage = "Nenhum vídeo encontrado."
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

    const filteredVideos = useMemo(() => {
        return videos.filter(video => {
            const matchesSearch = (video.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (video.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'Todos' || video.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [videos, searchTerm, selectedCategory]);

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
            </div>

            {/* Filters Container */}
            <div className={styles.filtersContainer}>

                {/* Search Bar - Top */}
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={20} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por título ou descrição..."
                        className={styles.searchInput}
                    />
                </div>

                {/* Categories - Bottom */}
                <div>
                    <p className={styles.categoryLabel}>Filtrar por Categoria</p>
                    <div className={styles.categoryList}>
                        <button
                            onClick={() => setSelectedCategory('Todos')}
                            className={styles.getCategoryButtonClass(selectedCategory === 'Todos')}
                        >
                            Todos
                        </button>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={styles.getCategoryButtonClass(selectedCategory === cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            {filteredVideos.length === 0 ? (
                <div className={styles.emptyStateContainer}>
                    <div className={styles.emptyStateIconWrapper}>
                        <Search className={styles.emptyStateIcon} size={24} />
                    </div>
                    <h3 className={styles.emptyStateTitle}>{emptyMessage}</h3>
                    <p className={styles.emptyStateText}>Tente ajustar seus filtros.</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {filteredVideos.map(video => (
                        <div
                            key={video.id}
                            className={styles.card}
                            onClick={() => onVideoClick(video)}
                        >
                            {/* Thumbnail Placeholder */}
                            <div className={styles.thumbnailWrapper}>
                                <div className={styles.thumbnailOverlay}></div>
                                <Play size={48} className={styles.playIcon} />
                                <span className={styles.durationBadge}>
                                    Aula
                                </span>
                            </div>

                            <div className={styles.cardContent}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.categoryBadge}>
                                        <Tag size={12} />
                                        {video.category}
                                    </span>
                                </div>

                                <h3 className={styles.cardTitle}>
                                    {video.title}
                                </h3>

                                <p className={styles.cardDescription}>
                                    {video.description}
                                </p>

                                <div className={styles.cardFooter}>
                                    <div className={styles.dateWrapper}>
                                        <Calendar size={14} />
                                        {formatDate(video.createdAt)}
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteVideo(video.id);
                                        }}
                                        className={styles.deleteButton}
                                        title="Excluir aula"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
