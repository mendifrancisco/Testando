import api from "./api";

export interface ComentarioRequestDto {
    usuarioId: number;
    texto: string;
}

export interface ComentarioResponseDto {
    id: number;
    videoId: number;
    videoTitulo: string;
    usuarioId: number;
    usuarioNome: string;
    texto: string;
    publico: boolean;
    criadoEm: string;
}

class ComentarioService {

    async criar(videoId: number, dto: ComentarioRequestDto): Promise<ComentarioResponseDto> {
        const { data } = await api.post<ComentarioResponseDto>(`/comentarios/videos/${videoId}`, dto);
        return data;
    }

    async listarPublicos(videoId: number): Promise<ComentarioResponseDto[]> {
        const { data } = await api.get<ComentarioResponseDto[]>(`/comentarios/videos/${videoId}`);
        return data;
    }

    async listarPendentes(): Promise<ComentarioResponseDto[]> {
        const { data } = await api.get<ComentarioResponseDto[]>("/comentarios/pendentes");
        return data;
    }

    async aprovar(comentarioId: number): Promise<void> {
        await api.patch(`/comentarios/${comentarioId}/aprovar`);
    }

    async listarPorUsuario(usuarioId: number): Promise<ComentarioResponseDto[]> {
        const { data } = await api.get<ComentarioResponseDto[]>(`/comentarios/usuario/${usuarioId}`);
        return data;
    }

    async buscarPorId(comentarioId: number): Promise<ComentarioResponseDto> {
        const { data } = await api.get<ComentarioResponseDto>(`/comentarios/${comentarioId}`);
        return data;
    }

    async atualizar(comentarioId: number, dto: ComentarioRequestDto): Promise<ComentarioResponseDto> {
        const { data } = await api.put<ComentarioResponseDto>(`/comentarios/${comentarioId}`, dto);
        return data;
    }

    async deletar(comentarioId: number): Promise<void> {
        await api.delete(`/comentarios/${comentarioId}`);
    }
}

export default new ComentarioService();
