import React, { useState, useEffect } from "react";
import { Layout } from "./src/components/Layout";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";

import videoService from "./services/api/videos";
import { interacao } from "./services/api/interactions";
import { getVideosCurtidos } from "./services/api/interactions";

import DashboardPage from "./src/pages/Catalogo";
import UploadPage from "./src/pages/UploadPage";
import LikedPage from "./src/pages/Curtidas";
import HistoryPage from "./src/pages/Historico";
import VideoDetailPage from "./src/pages/VideoDetailPage";
import StatsPage from "./src/pages/Dashboard";

import { Video, AppView } from "./types";
import { AuthPage } from "./src/components/AuthPage";

const AppContent: React.FC = () => {
  const { user, isLoading, isAuthenticated, login, logout, register, isGestor } = useAuth();

  const [currentView, setCurrentView] = useState<AppView>(() => {
    return (localStorage.getItem("currentView") as AppView) || AppView.LOGIN;
  });

  const [videos, setVideos] = useState<Video[]>([]);
  const [likedVideoIds, setLikedVideoIds] = useState<Set<string>>(new Set());
  const [historyVideoIds] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    localStorage.setItem("currentView", currentView);
  }, [currentView]);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        setCurrentView(AppView.LOGIN);
      }
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    async function load() {
      try {
        const serviceVideos = await videoService.buscarTodos();

        const mappedVideos: Video[] = serviceVideos.map((v: any) => ({
          ...v,
          id: String(v.id),
          dataEnvio: typeof v.dataEnvio === 'string' ? new Date(v.dataEnvio).getTime() : v.dataEnvio
        }));

        setVideos(mappedVideos);

        if (user) {
          const likes = await getVideosCurtidos(Number(user.id));
          setLikedVideoIds(new Set(likes));
        }
      } catch (error) {
        console.error("Erro ao carregar vídeos:", error);
      }
    }

    load();
  }, [isAuthenticated, user]);

  if (isLoading) return <div>Carregando...</div>;

  if (!isAuthenticated) {
    return (
      <AuthPage
        view={currentView}
        onNavigate={setCurrentView}
        onLogin={async (email, senha) => {
          await login(email, senha);
          setCurrentView(AppView.DASHBOARD);
        }}
        onRegister={async (nome, email, senha) => {
          await register(nome, email, senha);
          setCurrentView(AppView.DASHBOARD);
        }}
      />
    );
  }

  return (
    <Layout
      currentView={currentView}
      onChangeView={setCurrentView}
      onLogout={() => {
        logout();
        setCurrentView(AppView.LOGIN);
      }}
    >
      {currentView === AppView.DASHBOARD && (
        <DashboardPage
          videos={videos}
          onDeleteVideo={async (id) => {

            await videoService.deletar(Number(id));
            setVideos(v => v.filter(x => x.id !== id));
          }}
          onVideoClick={(video) => {
            setSelectedVideo(video);
            setCurrentView(AppView.VIDEO_DETAIL);
          }}
        />
      )}

      {currentView === AppView.UPLOAD && isGestor && (
        <UploadPage
          setCurrentView={setCurrentView}
          setVideos={setVideos}
        />
      )}

      {currentView === AppView.LIKED && (
        <LikedPage
          videos={videos.filter(v => likedVideoIds.has(v.id))}
          onVideoClick={(video) => {
            setSelectedVideo(video);
            setCurrentView(AppView.VIDEO_DETAIL);
          }}
        />
      )}

      {currentView === AppView.HISTORY && (
        <HistoryPage
          videos={videos.filter(v => historyVideoIds.includes(v.id))}
          onVideoClick={(video) => {
            setSelectedVideo(video);
            setCurrentView(AppView.VIDEO_DETAIL);
          }}
        />
      )}

      {currentView === AppView.VIDEO_DETAIL && selectedVideo && (
        <VideoDetailPage
          video={selectedVideo}
          onBack={() => setCurrentView(AppView.DASHBOARD)}
          isLiked={likedVideoIds.has(selectedVideo.id)}
          onToggleLike={async (id) => {
            if (!user) return;
            const liked = await interacao.toggleLike(Number(user.id), id);

            setLikedVideoIds(prev => {
              const set = new Set(prev);
              liked ? set.add(id) : set.delete(id);
              return set;
            });
          }}
        />
      )}

      {currentView === AppView.STATS && isGestor && (
        <StatsPage videos={videos} />
      )}

    </Layout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
