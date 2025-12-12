import api from "./api";
import { Comment } from "../../types";

// =====================================================
// DTOs
// =====================================================
interface CommentBackendDto {
  id: number;
  texto: string;
  usuarioId: number;
  videoId: number;
  timestamp: string;
}

// =====================================================
// CURTIDAS
// 👉 A API retorna APENAS IDs de vídeos (number[])
// =====================================================
export async function getVideosCurtidos(usuarioId: number): Promise<string[]> {
  console.group("❤️ [INTERACTIONS] getVideosCurtidos (IDs)");
  console.log("Usuário ID:", usuarioId);

  try {
    const { data } = await api.get<number[]>(`/curtidas/usuario/${usuarioId}`);
    console.log("Resposta bruta da API:", data);

    if (!Array.isArray(data)) {
      console.warn("Resposta inesperada (não é array):", data);
      console.groupEnd();
      return [];
    }

    const ids = data
      .filter((id): id is number => typeof id === "number")
      .map(id => String(id));

    console.log("IDs normalizados:", ids);
    console.groupEnd();
    return ids;

  } catch (error) {
    console.error("Erro ao carregar IDs de vídeos curtidos:", error);
    console.groupEnd();
    return [];
  }
}

// =====================================================
// INTERAÇÕES
// =====================================================
export const interacao = {

  // ---------------------------------
  // 📜 HISTÓRICO
  // (backend retorna objetos com video)
// ---------------------------------
  async getHistory(usuarioId: number): Promise<number[]> {
    console.group("📜 [INTERACTIONS] getHistory");
    console.log("Usuário ID:", usuarioId);

    try {
      const response = await api.get(`/visualizacoes/usuario/${usuarioId}`);
      console.log("Resposta bruta do histórico:", response.data);

      const ids = Array.isArray(response.data)
        ? response.data
            .map((v: any) => v?.video?.id)
            .filter((id: number | undefined): id is number => typeof id === "number")
        : [];

      console.log("IDs de vídeos assistidos:", ids);
      console.groupEnd();
      return ids;

    } catch (e) {
      console.error("Erro ao carregar histórico:", e);
      console.groupEnd();
      return [];
    }
  },

  // ---------------------------------
  // 💾 ADD HISTÓRICO
  // ---------------------------------
  async addToHistory(usuarioId: number, videoId: string): Promise<void> {
    console.group("💾 [INTERACTIONS] addToHistory");
    console.log("Dados:", { usuarioId, videoId });

    try {
      await api.post(`/visualizacoes/${usuarioId}/${videoId}`);
      console.log("Histórico salvo com sucesso");
    } catch (error) {
      console.error("Erro ao salvar histórico:", error);
    } finally {
      console.groupEnd();
    }
  },

  // ---------------------------------
  // 👍 TOGGLE LIKE
  // ---------------------------------
  async toggleLike(usuarioId: number, videoId: string): Promise<boolean> {
    console.group("👍 [INTERACTIONS] toggleLike");
    console.log("Dados:", { usuarioId, videoId });

    try {
      await api.post("/curtidas", {
        usuarioId,
        videoId: parseInt(videoId, 10)
      });

      console.log("Curtida enviada com sucesso");
      return true;

    } catch (error) {
      console.error("Erro ao enviar curtida:", error);
      return false;

    } finally {
      console.groupEnd();
    }
  },

  // ---------------------------------
  // 💬 COMENTÁRIOS
  // ---------------------------------
  async addComment(
    videoId: string,
    userId: number,
    content: string
  ): Promise<Comment> {

    console.group("💬 [INTERACTIONS] addComment");
    console.log("Dados:", { videoId, userId, content });

    try {
      const response = await api.post<CommentBackendDto>(
        `/videos/${videoId}/comentarios`,
        {
          usuarioId: userId,
          texto: content
        }
      );

      console.log("Comentário salvo:", response.data);

      const newComment = response.data;

      return {
        id: newComment.id.toString(),
        videoId: newComment.videoId.toString(),
        userId: newComment.usuarioId.toString(),
        author: `Usuário ${newComment.usuarioId}`,
        content: newComment.texto,
        timestamp: new Date().getTime()
      };

    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      throw error;

    } finally {
      console.groupEnd();
    }
  }
};
