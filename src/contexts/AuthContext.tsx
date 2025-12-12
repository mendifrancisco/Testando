import React, { createContext, useContext, useState, useEffect } from "react";
import authService, { UserData } from "../../services/api/authService";
import api from "../../services/api/api";

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isGestor: boolean;
  isAluno: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // =====================================================
  // 🔐 BOOTSTRAP: RESTAURA TOKEN + USUÁRIO
  // =====================================================
  useEffect(() => {
    async function bootstrap() {
      console.group("🔐 [AUTH BOOTSTRAP]");

      const token = localStorage.getItem("token");
      console.log("Token no localStorage:", token);

      if (!token) {
        console.warn("Nenhum token encontrado. Usuário não autenticado.");
        setIsLoading(false);
        console.groupEnd();
        return;
      }

      // Injeta token no axios
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Authorization header setado no Axios:");
      console.log(api.defaults.headers.common["Authorization"]);

      try {
        console.log("Chamando /auth/me...");
        const usuario = await authService.getCurrentUser();
        console.log("Usuário retornado pelo backend:", usuario);

        setUser(usuario);
      } catch (error) {
        console.error("Erro ao validar token em /auth/me:", error);
        console.warn("Removendo token inválido...");
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsLoading(false);
        console.log("Bootstrap finalizado. isLoading = false");
        console.groupEnd();
      }
    }

    bootstrap();
  }, []);

  // =====================================================
  // 🔐 LOGIN
  // =====================================================
  const login = async (email: string, senha: string) => {
    console.group("🔑 [LOGIN]");
    console.log("Email:", email);

    try {
      const usuario = await authService.login(email, senha);
      console.log("Usuário autenticado:", usuario);
      console.log("Token após login:", localStorage.getItem("token"));

      console.log("Authorization header após login:");
      console.log(api.defaults.headers.common["Authorization"]);

      setUser(usuario);
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    } finally {
      console.groupEnd();
    }
  };

  // =====================================================
  // 📝 REGISTER
  // =====================================================
  const register = async (nome: string, email: string, senha: string) => {
    console.group("📝 [REGISTER]");
    console.log("Nome:", nome, "| Email:", email);

    try {
      const usuario = await authService.register(nome, email, senha);
      console.log("Usuário registrado e autenticado:", usuario);
      setUser(usuario);
    } catch (error) {
      console.error("Erro no register:", error);
      throw error;
    } finally {
      console.groupEnd();
    }
  };

  // =====================================================
  // 🚪 LOGOUT
  // =====================================================
  const logout = async () => {
    console.group("🚪 [LOGOUT]");

    try {
      await authService.logout();
      console.log("Logout executado no service");
    } finally {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);

      console.log("Token removido do localStorage");
      console.log("Authorization header removido do Axios");
      console.groupEnd();
    }
  };

  // =====================================================
  // PROVIDER
  // =====================================================
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isGestor: user?.role === "GESTOR",
        isAluno: user?.role === "ALUNO",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =====================================================
// HOOK
// =====================================================
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return ctx;
}
