import api from "./api";
import { Comment } from "../../types";
import { Video } from "./videos";

interface CurtidaResponseDto {
    id: number;
    nomeUsuario: string;
    video: {
        id: number;
        titulo: string;
        thumbnail: string;
        urlVideo: string;
    };
}

interface CommentBackendDto {
    id: number;
    texto: string;
    usuarioId: number;
    videoId: number;
    timestamp: string;
}

export async function getVideosCurtidos(usuarioId: number) {
  const { data } = await api.get(`/curtidas/usuario/${usuarioId}`);

  const normalized: Video[] = data.map((c: CurtidaResponseDto) => ({
      id: String(c.video.id),
      title: c.video.titulo,
        description: "",
        category: "",
        url: c.video.urlVideo,
        thumbnail: c.video.thumbnail,
        createdAt: 0,
        original: c.video
  }));

  return normalized;
}


export const interacao = {

    async getHistory(usuarioId: number): Promise<number[]> {
        try {
            const response = await api.get(`/visualizacoes/usuario/${usuarioId}`);

            return response.data
                .map((v: any) => v.video?.id)
                .filter((id: number | undefined) => id !== undefined);

        } catch (e) {
            console.error("Erro ao carregar histórico:", e);
            return [];
        }
    },


    async addToHistory(usuarioId: number, videoId: string): Promise<void> {
        console.log("💾 Salvando histórico:", { usuarioId, videoId });
        await api.post(`/visualizacoes/${usuarioId}/${videoId}`);
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
