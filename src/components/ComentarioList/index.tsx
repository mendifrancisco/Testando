import React from "react";
import { ComentarioResponseDto } from "../../../services/api/comentarios";

interface Props {
    comentarios: ComentarioResponseDto[];
    carregando?: boolean;
}

export default function ComentarioList({ comentarios, carregando }: Props) {
    if (carregando) {
        return (
            <div className="text-center py-8 text-slate-500">
                Carregando comentários...
            </div>
        );
    }

    if (comentarios.length === 0) {
        return (
            <div className="text-center py-8 text-slate-500">
                Nenhum comentário ainda. Seja o primeiro a comentar!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {comentarios.map((comentario) => (
                <div
                    key={comentario.id}
                    className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-700 font-semibold text-sm">
                                    {comentario.usuarioNome.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <p className="font-medium text-slate-800">
                                    {comentario.usuarioNome}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {new Date(comentario.criadoEm).toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </p>
                            </div>
                        </div>

                        {!comentario.publico && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                Pendente
                            </span>
                        )}
                    </div>

                    <p className="text-slate-700 leading-relaxed">
                        {comentario.texto}
                    </p>
                </div>
            ))}
        </div>
    );
}
