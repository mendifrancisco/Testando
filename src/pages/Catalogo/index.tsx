import React from "react";
import { VideoList } from "../../components/VideoList/index";
import { Video } from "../../../types";
import { useEffect, useState } from "react";
import  api  from "../../../services/api/api";

interface Props {
    videos: Video[];
    onDeleteVideo: (id: string) => void;
    onVideoClick: (video: Video) => void;
}

const Dashboard: React.FC<Props> = ({ onDeleteVideo, onVideoClick }) => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  //Quando a tela carrega, fazer um GET na API /videos
  useEffect(() => {
    async function loadVideos() {
      try {
        const { data } = await api.get("/videos");

        //componentes de UI não devem conhecer o formato da API, então
        //normalizar os dados para o formato usado na aplicação
        const normalized = data.map((v: any) => ({
          id: String(v.id),
          title: v.titulo,
          description: v.descricao,
          category: v.categoria,
          url: v.urlVideo,
          thumbnail: v.urlThumbnail,
          createdAt: new Date(v.dataEnvio).getTime(),
          original: v 
        }));

        setVideos(normalized);

      } catch (err) {
        console.error("Erro ao carregar vídeos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);
  //Guardar os vídeos no estado (useState)
  //Só renderizar a lista depois de ter carregado os dados


  if (loading) return <p>Carregando...</p>;

  return (
    <VideoList
      videos={videos}
      //Passar os handlers (onDeleteVideo, onVideoClick) para a lista
      onDeleteVideo={onDeleteVideo}
      onVideoClick={onVideoClick}
      title="Catálogo de Aulas"
    />
  );
};

export default Dashboard;
