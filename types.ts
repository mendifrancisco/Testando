export type Role = 'STUDENT' | 'MANAGER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface VideoStats {
  views: number;
  likes: number;
  comments: number;
}

export interface VideoStats {
  visualizacoes: number;
  curtidas: number;
  comentarios: number;
}

export interface Video {
  id: string;
  titulo: string;
  urlVideo: string;
  descricao: string;
  categoria: string;
  dataEnvio: number;       // timestamp (ex: Date.parse(data))
  urlThumbnail?: string;
  stats?: VideoStats;
}


export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  author: string;
  content: string;
  timestamp: number;
  avatar?: string;
}

export enum AppView {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
  UPLOAD = 'UPLOAD',
  HISTORY = 'HISTORY',
  LIKED = 'LIKED',
  VIDEO_DETAIL = 'VIDEO_DETAIL',
  STATS = 'STATS'

}

export const CATEGORIES = [
  "Desenvolvimento Web",
  "Ciência de Dados",
  "Frontend",
  "Backend",
  "Outros"
];