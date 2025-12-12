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
    /**
     * Criar um novo comentário em um vídeo
     */
    async criar(videoId: number, dto: ComentarioRequestDto): Promise<ComentarioResponseDto> {
        const { data } = await api.post<ComentarioResponseDto>(`/comentarios/videos/${videoId}`, dto);
        return data;
    }

    /**
     * Listar comentários públicos de um vídeo
     */
    async listarPublicos(videoId: number): Promise<ComentarioResponseDto[]> {
        const { data } = await api.get<ComentarioResponseDto[]>(`/comentarios/videos/${videoId}`);
        return data;
    }

    /**
     * Listar comentários pendentes de aprovação (apenas GESTOR)
     */
    async listarPendentes(): Promise<ComentarioResponseDto[]> {
        const { data } = await api.get<ComentarioResponseDto[]>("/comentarios/pendentes");
        return data;
    }

    /**
     * Aprovar um comentário (apenas GESTOR)
     */
    async aprovar(comentarioId: number): Promise<void> {
        await api.patch(`/comentarios/${comentarioId}/aprovar`);
    }

    /**
     * Listar comentários de um usuário específico
     */
    async listarPorUsuario(usuarioId: number): Promise<ComentarioResponseDto[]> {
        const { data } = await api.get<ComentarioResponseDto[]>(`/comentarios/usuario/${usuarioId}`);
        return data;
    }

    /**
     * Buscar comentário por ID
     */
    async buscarPorId(comentarioId: number): Promise<ComentarioResponseDto> {
        const { data } = await api.get<ComentarioResponseDto>(`/comentarios/${comentarioId}`);
        return data;
    }

    /**
     * Atualizar um comentário
     */
    async atualizar(comentarioId: number, dto: ComentarioRequestDto): Promise<ComentarioResponseDto> {
        const { data } = await api.put<ComentarioResponseDto>(`/comentarios/${comentarioId}`, dto);
        return data;
    }

    /**
     * Deletar um comentário (apenas GESTOR)
     */
    async deletar(comentarioId: number): Promise<void> {
        await api.delete(`/comentarios/${comentarioId}`);
    }
}

export default new ComentarioService();
