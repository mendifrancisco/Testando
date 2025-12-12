import api from "./api";

export interface Video {
    id: number;
    titulo: string;
    descricao: string;
    categoria: string;
    urlVideo: string;
    urlThumbnail?: string;
    notificacaoHabilitada?: boolean;
    dataEnvio: string;
}

export interface CriarVideoDTO {
    titulo: string;
    descricao: string;
    categoria: string;
    urlVideo: string;
    urlThumbnail?: string;
    notificacaoHabilitada?: boolean;
}

class VideoService {
    async buscarTodos(): Promise<Video[]> {
        const { data } = await api.get<Video[]>("/videos");
        return data;
    }

    async buscarPorId(id: number): Promise<Video> {
        const { data } = await api.get<Video>(`/videos/${id}`);
        return data;
    }

    async criar(dto: CriarVideoDTO): Promise<Video> {
        const { data } = await api.post<Video>("/videos", dto);
        return data;
    }

    async atualizar(id: number, dto: Partial<CriarVideoDTO>): Promise<Video> {
        const { data } = await api.put<Video>(`/videos/${id}`, dto);
        return data;
    }

    async deletar(id: number): Promise<void> {
        await api.delete(`/videos/${id}`);
    }
}

export default new VideoService();
