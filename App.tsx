import React, { useState, useEffect } from "react";
import { Layout } from "./src/components/Layout";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";

import videoService from "./services/api/videos";
import { interactionService } from "./services/api/interactions";

import DashboardPage from "./src/pages/Catalogo";
import UploadPage from "./src/pages/UploadPage";
import LikedPage from "./src/pages/Curtidas";
import HistoryPage from "./src/pages/Historico";
import VideoDetailPage from "./src/pages/VideoDetailPage";
import StatsPage from "./src/pages/StatsPage";

import { Video, AppView } from "./types";
import { AuthPage } from "./src/components/AuthPage";

// =======================================================
// COMPONENTE PRINCIPAL DA APLICAÇÃO
// =======================================================
const AppContent: React.FC = () => {
  const { user, isLoading, isAuthenticated, login, logout, register, isGestor } = useAuth();

  const [currentView, setCurrentView] = useState<AppView>(() => {
    return (localStorage.getItem("currentView") as AppView) || AppView.LOGIN;
  });

  const [videos, setVideos] = useState<Video[]>([]);
  const [likedVideoIds, setLikedVideoIds] = useState<Set<string>>(new Set());
  const [historyVideoIds] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // =======================================================
  // Salvar tela atual no localStorage
  // =======================================================
  useEffect(() => {
    localStorage.setItem("currentView", currentView);
  }, [currentView]);

  // =======================================================
  // Redirecionamento automático após login/logout
  // =======================================================
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        setCurrentView(AppView.LOGIN);
      }
    }
  }, [isLoading, isAuthenticated]);

  // =======================================================
  // Carregar vídeos depois do login
  // =======================================================
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    async function load() {
      try {
        const serviceVideos = await videoService.buscarTodos();

        // Mapear videos do serviço (id: number) para videos da aplicação (id: string)
        const mappedVideos: Video[] = serviceVideos.map((v: any) => ({
          ...v,
          id: String(v.id),
          dataEnvio: typeof v.dataEnvio === 'string' ? new Date(v.dataEnvio).getTime() : v.dataEnvio
        }));

        setVideos(mappedVideos);

        if (user) {
          const likes = await interactionService.getLikedVideos(Number(user.id));
          setLikedVideoIds(new Set(likes));
        }
      } catch (error) {
        console.error("Erro ao carregar vídeos:", error);
      }
    }

    load();
  }, [isAuthenticated, user]);

  // =======================================================
  // Loading inicial
  // =======================================================
  if (isLoading) return <div>Carregando...</div>;

  // =======================================================
  // TELA DE LOGIN
  // =======================================================
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

  // =======================================================
  // ÁREA LOGADA
  // =======================================================
  return (
    <Layout
      currentView={currentView}
      onChangeView={setCurrentView}
      onLogout={() => {
        logout();
        setCurrentView(AppView.LOGIN);
      }}
    >
      {/* Catálogo */}
      {currentView === AppView.DASHBOARD && (
        <DashboardPage
          videos={videos}
          onDeleteVideo={async (id) => {
            // Conversão de id string para number se a API espera number
            await videoService.deletar(Number(id));
            setVideos(v => v.filter(x => x.id !== id));
          }}
          onVideoClick={(video) => {
            setSelectedVideo(video);
            setCurrentView(AppView.VIDEO_DETAIL);
          }}
        />
      )}

      {/* Upload (somente gestor) */}
      {currentView === AppView.UPLOAD && isGestor && (
        <UploadPage
          setCurrentView={setCurrentView}
          setVideos={setVideos}
        />
      )}

      {/* Curtidos */}
      {currentView === AppView.LIKED && (
        <LikedPage
          videos={videos.filter(v => likedVideoIds.has(v.id))}
          onVideoClick={(video) => {
            setSelectedVideo(video);
            setCurrentView(AppView.VIDEO_DETAIL);
          }}
        />
      )}

      {/* Histórico */}
      {currentView === AppView.HISTORY && (
        <HistoryPage
          videos={videos.filter(v => historyVideoIds.includes(v.id))}
          onVideoClick={(video) => {
            setSelectedVideo(video);
            setCurrentView(AppView.VIDEO_DETAIL);
          }}
        />
      )}

      {/* Detalhes do vídeo */}
      {currentView === AppView.VIDEO_DETAIL && selectedVideo && (
        <VideoDetailPage
          video={selectedVideo}
          onBack={() => setCurrentView(AppView.DASHBOARD)}
          isLiked={likedVideoIds.has(selectedVideo.id)}
          onToggleLike={async (id) => {
            if (!user) return;
            const liked = await interactionService.toggleLike(Number(user.id), id);

            setLikedVideoIds(prev => {
              const set = new Set(prev);
              liked ? set.add(id) : set.delete(id);
              return set;
            });
          }}
        />
      )}

      {/* Estatísticas (somente gestor) */}
      {currentView === AppView.STATS && isGestor && (
        <StatsPage videos={videos} />
      )}

    </Layout>
  );
};

// =======================================================
// WRAPPER DO PROVIDER
// =======================================================
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
