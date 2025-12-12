import React, { useState, useMemo } from "react";
import { Video } from "../../../types";
import * as styles from './styles';
import { BarChart3, Eye, ThumbsUp, MessageSquare, Search, TrendingUp, Calendar, Tag, ArrowUpDown } from "lucide-react";

interface Props {
    videos: Video[];
}

type SortField = 'title' | 'views' | 'likes' | 'comments' | 'createdAt';
type SortOrder = 'asc' | 'desc';

const StatsPage: React.FC<Props> = ({ videos }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<SortField>('views');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

    const stats = useMemo(() => {
        return videos.reduce((acc, video) => ({
            views: acc.views + (video.stats?.views || 0),
            likes: acc.likes + (video.stats?.likes || 0),
            comments: acc.comments + (video.stats?.comments || 0),
            totalVideos: acc.totalVideos + 1
        }), { views: 0, likes: 0, comments: 0, totalVideos: 0 });
    }, [videos]);

    const filteredAndSortedVideos = useMemo(() => {
        let filtered = videos.filter(video =>
            (video.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (video.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
        );

        filtered.sort((a, b) => {
            let aValue: any, bValue: any;

            switch (sortField) {
                case 'title':
                    aValue = a.title?.toLowerCase() || '';
                    bValue = b.title?.toLowerCase() || '';
                    break;
                case 'views':
                    aValue = a.stats?.views || 0;
                    bValue = b.stats?.views || 0;
                    break;
                case 'likes':
                    aValue = a.stats?.likes || 0;
                    bValue = b.stats?.likes || 0;
                    break;
                case 'comments':
                    aValue = a.stats?.comments || 0;
                    bValue = b.stats?.comments || 0;
                    break;
                case 'createdAt':
                    aValue = a.createdAt;
                    bValue = b.createdAt;
                    break;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [videos, searchTerm, sortField, sortOrder]);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('desc');
        }
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div>
                <h2 className={styles.header}>
                    <BarChart3 size={20} className={styles.headerIcon} />
                    Dashboard de Estatísticas
                </h2>
                <p className={styles.headerSubtitle}>Análise detalhada do desempenho dos vídeos</p>
            </div>

            {/* Cards de Totais - Compactos */}
            <div className={styles.statsGrid}>
                <div className={styles.statCardBlue}>
                    <div className="flex items-center justify-between mb-2">
                        <div className={styles.statIconWrapperBlue}>
                            <Eye size={14} />
                        </div>
                        <TrendingUp className={styles.statTrendIconBlue} size={12} />
                    </div>
                    <p className={styles.statLabelBlue}>Visualizações</p>
                    <h3 className={styles.statValueBlue}>{stats.views.toLocaleString()}</h3>
                </div>

                <div className={styles.statCardRed}>
                    <div className="flex items-center justify-between mb-2">
                        <div className={styles.statIconWrapperRed}>
                            <ThumbsUp size={14} />
                        </div>
                        <TrendingUp className={styles.statTrendIconRed} size={12} />
                    </div>
                    <p className={styles.statLabelRed}>Curtidas</p>
                    <h3 className={styles.statValueRed}>{stats.likes.toLocaleString()}</h3>
                </div>

                <div className={styles.statCardGreen}>
                    <div className="flex items-center justify-between mb-2">
                        <div className={styles.statIconWrapperGreen}>
                            <MessageSquare size={14} />
                        </div>
                        <TrendingUp className={styles.statTrendIconGreen} size={12} />
                    </div>
                    <p className={styles.statLabelGreen}>Comentários</p>
                    <h3 className={styles.statValueGreen}>{stats.comments.toLocaleString()}</h3>
                </div>

                <div className={styles.statCardPurple}>
                    <div className="flex items-center justify-between mb-2">
                        <div className={styles.statIconWrapperPurple}>
                            <BarChart3 size={14} />
                        </div>
                        <TrendingUp className={styles.statTrendIconPurple} size={12} />
                    </div>
                    <p className={styles.statLabelPurple}>Vídeos</p>
                    <h3 className={styles.statValuePurple}>{stats.totalVideos}</h3>
                </div>
            </div>

            {/* Tabela de Estatísticas */}
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <div className={styles.tableHeaderContent}>
                        <h3 className={styles.tableTitle}>Estatísticas por Vídeo</h3>
                        <div className={styles.searchWrapper}>
                            <Search className={styles.searchIcon} size={16} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar..."
                                className={styles.searchInput}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <th onClick={() => handleSort('title')} className={styles.thBase}>
                                    <div className={styles.thContent}>
                                        Título
                                        <ArrowUpDown size={10} />
                                    </div>
                                </th>
                                <th className={styles.thLeftHiddenMd}>Categoria</th>
                                <th onClick={() => handleSort('views')} className={styles.thCenter}>
                                    <div className={styles.thContentCenter}>
                                        <Eye size={10} />
                                        <span className={styles.hiddenSm}>Views</span>
                                        <ArrowUpDown size={10} />
                                    </div>
                                </th>
                                <th onClick={() => handleSort('likes')} className={styles.thCenter}>
                                    <div className={styles.thContentCenter}>
                                        <ThumbsUp size={10} />
                                        <span className={styles.hiddenSm}>Likes</span>
                                        <ArrowUpDown size={10} />
                                    </div>
                                </th>
                                <th onClick={() => handleSort('comments')} className={styles.thCenterHiddenSm}>
                                    <div className={styles.thContentCenter}>
                                        <MessageSquare size={10} />
                                        <span className="hidden lg:inline">Coment.</span>
                                        <ArrowUpDown size={10} />
                                    </div>
                                </th>
                                <th onClick={() => handleSort('createdAt')} className={styles.thLeftHiddenLg}>
                                    <div className={styles.thContent}>
                                        <Calendar size={10} />
                                        Data
                                        <ArrowUpDown size={10} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {filteredAndSortedVideos.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className={styles.emptyRow}>
                                        <Search size={32} className={styles.emptyIcon} />
                                        <p className={styles.emptyTitle}>Nenhum vídeo encontrado</p>
                                        <p className={styles.emptySubtitle}>Tente ajustar sua busca</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredAndSortedVideos.map((video) => (
                                    <tr key={video.id} className={styles.tableRow}>
                                        <td className={styles.tdBase}>
                                            <div className={styles.videoTitle}>{video.title}</div>
                                            <div className={styles.videoDescription}>{video.description}</div>
                                        </td>
                                        <td className={styles.tdHiddenMd}>
                                            <span className={styles.categoryBadge}>
                                                <Tag size={8} />
                                                <span className={styles.categoryText}>{video.category}</span>
                                            </span>
                                        </td>
                                        <td className={styles.tdCenter}>
                                            <span className={styles.statBadgeBlue}>
                                                <Eye size={12} />
                                                {(video.stats?.views || 0).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className={styles.tdCenter}>
                                            <span className={styles.statBadgeRed}>
                                                <ThumbsUp size={12} />
                                                {(video.stats?.likes || 0).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className={styles.tdCenterHiddenSm}>
                                            <span className={styles.statBadgeGreen}>
                                                <MessageSquare size={12} />
                                                {(video.stats?.comments || 0).toLocaleString()}
                                            </span>
                                        </td>
                                        <td className={styles.tdLeftHiddenLg}>
                                            {formatDate(video.createdAt)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StatsPage;
