import React from "react";
import { VideoDetail as Component } from "../../components/VideoDetail";
import { Video } from "../../../types";

interface Props {
    video: Video | null;
    onBack: () => void;
    isLiked: boolean;
    onToggleLike: (id: string) => void;
}

import * as styles from "./styles";

const VideoDetailPage: React.FC<Props> = ({ video, onBack, isLiked, onToggleLike }) => {
    if (!video) return <div className={styles.notFound}>Vídeo não encontrado</div>;

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
