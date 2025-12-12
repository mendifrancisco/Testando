import React, { useEffect, useState } from "react";
import { VideoList } from "../../components/VideoList";
import { Video } from "../../../types";
import { getVideosCurtidos } from "../../../services/api/interactions";

const LikedPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const usuarioId = 1; // ou do contexto
        const liked = await getVideosCurtidos(usuarioId);
        setVideos(liked);
      } catch (err) {
        console.error("Erro ao carregar curtidos:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <VideoList
      title="Vídeos Curtidos"
      videos={videos}
      onDeleteVideo={() => {}}
      onVideoClick={(v) => console.log(v)}
    />
  );
};

export default LikedPage;
