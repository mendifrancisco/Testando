import React from "react";
import { VideoList } from "../../components/VideoList";
import { Video } from "../../../types";

interface Props {
    videos: Video[];
    onDeleteVideo: (id: string) => void;
    onVideoClick: (video: Video) => void;
}

const HistoryPage: React.FC<Props> = ({ videos, onDeleteVideo, onVideoClick }) => {

    return (
        <VideoList
            videos={videos}
            onDeleteVideo={onDeleteVideo}
            onVideoClick={onVideoClick}
            title="Histórico de Visualização"
            emptyMessage="Você ainda não assistiu a nenhum vídeo."
        />
    );
};

export default HistoryPage;
