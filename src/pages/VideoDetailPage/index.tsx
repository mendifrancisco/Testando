import React, { useEffect } from "react";
import { VideoDetail as Component } from "../../components/VideoDetail";
import { Video } from "../../../types";
import { useAuth } from "../../contexts/AuthContext";
import { interacao } from "../../../services/api/interactions";
interface Props {
  video: Video | null;
  onBack: () => void;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
}

import * as styles from "./styles";

const VideoDetailPage: React.FC<Props> = ({
  video,
  onBack,
  isLiked,
  onToggleLike
}) => {
  const { user } = useAuth();

  // 🔥 AQUI ESTAVA FALTANDO
  useEffect(() => {
    if (!user || !video) return;

    console.log("👁️ [VIDEO OPEN] Salvando histórico", {
      usuarioId: user.id,
      videoId: video.id
    });

    interacao.addToHistory(user.id, video.id);
  }, [video?.id]);

  if (!video) {
    return <div className={styles.notFound}>Vídeo não encontrado</div>;
  }

  return (
    <Component
      video={video}
      onBack={onBack}
      isLiked={isLiked}
      onToggleLike={onToggleLike}
    />
  );
};

export default VideoDetailPage;
