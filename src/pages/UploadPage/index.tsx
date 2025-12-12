import React from "react";
import videoService from "../../../services/api/videos";
import { Video } from "../../../types";
import { AppView } from "../../../types";
import VideoForm from "../../components/VideoForm";

interface Props {
    setCurrentView: (v: AppView) => void;
    setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
}

export default function UploadPage({ setCurrentView, setVideos }: Props) {
    const handleSubmit = async (dto: any) => {
        const criado = await videoService.criar(dto);

        const mappedVideo: Video = {
            ...criado,
            id: String(criado.id),
            dataEnvio: typeof criado.dataEnvio === 'string' ? new Date(criado.dataEnvio).getTime() : criado.dataEnvio
        };

        setVideos(prev => [mappedVideo, ...prev]);
        setCurrentView(AppView.DASHBOARD);
    };

    const handleCancel = () => {
        setCurrentView(AppView.DASHBOARD);
    };

    return (
        <div style={{ maxWidth: 780, margin: "0 auto", padding: 16 }}>
            <VideoForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
    );
}

