import React from "react";
import { VideoList } from "../../components/VideoList";
import { Video } from "../../../types";

interface Props {
  videos: Video[];
  onVideoClick: (video: Video) => void;
}

const LikedPage: React.FC<Props> = ({ videos, onVideoClick }) => {

  return (
    <VideoList
      videos={videos}
      onVideoClick={onVideoClick}
      title="Vídeos Curtidos"
      emptyMessage="Você ainda não curtiu nenhum vídeo."
    />
  );
};

export default LikedPage;
