import api from "./api";
import { Comment } from "../../types";

interface CurtidaResponseDto {
    id: number;
    usuarioId: number;
    videoId: number;
    dataCurtida: string;
}

interface CommentBackendDto {
    id: number;
    texto: string;
    usuarioId: number;
    videoId: number;
    timestamp: string;
}

export const interactionService = {

    async getHistory(usuarioId: number): Promise<string[]> {
        const response = await api.get(`/visualizacoes/${usuarioId}`);

        return response.data.map((h: any) => h.videoId.toString());
    },

    async addToHistory(usuarioId: number, videoId: string): Promise<void> {
        console.log("💾 Salvando histórico:", { usuarioId, videoId });
        await api.post(`/visualizacoes/${usuarioId}/${videoId}`);
    },

    async getLikedVideos(userId: number): Promise<string[]> {
        const response = await api.get<CurtidaResponseDto[]>(`/curtidas/${userId}`);

        console.log("🔥 Curtidas do backend (RAW):", response.data);

        return response.data.map((c: any) => {
            if (!c) return "0";
            const id = c.videoId ?? c.video_id ?? c.video?.id ?? 0;
            return String(id);
        });
    },

    async toggleLike(usuarioId: number, videoId: string) {
        console.log("👍 enviando curtida:", { usuarioId, videoId });
        await api.post("/curtidas", {
            usuarioId,
            videoId: parseInt(videoId)
        });
        return true;
    },

    async addComment(videoId: string, userId: number, content: string): Promise<Comment> {
        const response = await api.post<CommentBackendDto>(`/videos/${videoId}/comentarios`, {
            usuarioId: userId,
            texto: content
        });

        const newComment = response.data;
        return {
            id: newComment.id.toString(),
            videoId: newComment.videoId.toString(),
            userId: newComment.usuarioId.toString(),
            author: `Usuário ${newComment.usuarioId}`,
            content: newComment.texto,
            timestamp: new Date().getTime()
        };
    }

};
