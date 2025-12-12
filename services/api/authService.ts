// src/services/authService.ts
import api from "./api";

export interface DadosUsuario {
  id: number;
  nome: string;
  email: string;
  role: "ALUNO" | "GESTOR";
}

// Alias para compatibilidade com AuthContext
export type UserData = DadosUsuario;

class AuthService {
  async me(): Promise<DadosUsuario | null> {
    try {
      const { data } = await api.get<DadosUsuario>("/auth/me");
      return data;
    } catch {
      return null;
    }
  }

  // Alias para compatibilidade com AuthContext
  async getCurrentUser(): Promise<DadosUsuario | null> {
    return this.me();
  }

  async login(email: string, senha: string): Promise<DadosUsuario> {
    const { data } = await api.post("/auth/login", { email, senha });

    console.log("📦 Resposta do login:", data);

    // Garantir que o token não tenha espaços em branco
    const token = data.token?.trim();

    if (!token) {
      throw new Error("Token não recebido do servidor");
    }

    console.log("💾 Salvando token:", token);
    localStorage.setItem("token", token);

    const { data: usuario } = await api.get<DadosUsuario>("/auth/me");
    return usuario;
  }

  async registrar(nome: string, email: string, senha: string): Promise<DadosUsuario> {
    await api.post("/usuarios", { nome, email, senha });
    return this.login(email, senha);
  }

  // Alias para compatibilidade com AuthContext
  async register(nome: string, email: string, senha: string): Promise<DadosUsuario> {
    return this.registrar(nome, email, senha);
  }

  async logout() {
    localStorage.removeItem("token");
  }

  async buscarUsuarioAtual(): Promise<DadosUsuario | null> {
    try {
      const { data } = await api.get<DadosUsuario>("/auth/me");
      return data;
    } catch {
      return null;
    }
  }
}

export default new AuthService();
