import api from "./api";

export interface DadosUsuario {
  id: number;
  nome: string;
  email: string;
  role: "ALUNO" | "GESTOR";
}

export type UserData = DadosUsuario;

class AuthService {

  // =====================================================
  // 🔍 /auth/me
  // =====================================================
  async me(): Promise<DadosUsuario | null> {
    console.group("👤 [AUTH SERVICE] /auth/me");

    try {
      console.log("Authorization header enviado:");
      console.log(api.defaults.headers.common["Authorization"]);

      const { data } = await api.get<DadosUsuario>("/auth/me");
      console.log("Usuário retornado:", data);

      console.groupEnd();
      return data;
    } catch (error) {
      console.error("Erro ao chamar /auth/me:", error);
      console.groupEnd();
      return null;
    }
  }

  async getCurrentUser(): Promise<DadosUsuario | null> {
    console.log("➡️ getCurrentUser()");
    return this.me();
  }

  // =====================================================
  // 🔑 LOGIN
  // =====================================================
  async login(email: string, senha: string): Promise<DadosUsuario> {
    console.group("🔑 [AUTH SERVICE] LOGIN");
    console.log("Email:", email);

    // --- LOGIN ---
    const { data } = await api.post("/auth/login", { email, senha });
    console.log("Resposta do /auth/login:", data);

    const token = data.token?.trim();
    console.log("Token recebido:", token);

    if (!token) {
      console.error("❌ Token não recebido do servidor");
      console.groupEnd();
      throw new Error("Token não recebido do servidor");
    }

    // --- SALVA TOKEN ---
    localStorage.setItem("token", token);
    console.log("Token salvo no localStorage");

    // --- SETA HEADER ---
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Authorization header setado no Axios:");
    console.log(api.defaults.headers.common["Authorization"]);

    // --- BUSCA USUÁRIO ---
    try {
      console.log("Chamando /auth/me após login...");
      const { data: usuario } = await api.get<DadosUsuario>("/auth/me");
      console.log("Usuário autenticado:", usuario);

      console.groupEnd();
      return usuario;
    } catch (error) {
      console.error("Erro ao buscar usuário após login:", error);
      console.groupEnd();
      throw error;
    }
  }

  // =====================================================
  // 📝 REGISTER
  // =====================================================
  async registrar(nome: string, email: string, senha: string): Promise<DadosUsuario> {
    console.group("📝 [AUTH SERVICE] REGISTER");
    console.log("Nome:", nome, "| Email:", email);

    await api.post("/usuarios", { nome, email, senha });
    console.log("Usuário registrado com sucesso");

    console.groupEnd();
    return this.login(email, senha);
  }

  async register(nome: string, email: string, senha: string): Promise<DadosUsuario> {
    return this.registrar(nome, email, senha);
  }

  // =====================================================
  // 🚪 LOGOUT
  // =====================================================
  async logout() {
    console.group("🚪 [AUTH SERVICE] LOGOUT");

    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];

    console.log("Token removido do localStorage");
    console.log("Authorization header removido do Axios");

    console.groupEnd();
  }

  // =====================================================
  // 🔁 BUSCAR USUÁRIO ATUAL
  // =====================================================
  async buscarUsuarioAtual(): Promise<DadosUsuario | null> {
    console.group("🔁 [AUTH SERVICE] buscarUsuarioAtual");

    try {
      console.log("Authorization header:");
      console.log(api.defaults.headers.common["Authorization"]);

      const { data } = await api.get<DadosUsuario>("/auth/me");
      console.log("Usuário retornado:", data);

      console.groupEnd();
      return data;
    } catch (error) {
      console.error("Erro ao buscar usuário atual:", error);
      console.groupEnd();
      return null;
    }
  }
}

export default new AuthService();
