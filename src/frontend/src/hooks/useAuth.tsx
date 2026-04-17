import { useActor } from "@caffeineai/core-infrastructure";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createActor } from "../backend";

interface AuthState {
  isAuthenticated: boolean;
  currentUserEmail: string | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_KEY = "sb_auth_email";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { actor, isFetching } = useActor(createActor);
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    currentUserEmail: null,
    isLoading: true,
  });

  // Restore session from localStorage on mount
  useEffect(() => {
    if (isFetching) return;
    const stored = localStorage.getItem(AUTH_KEY);
    setState({
      isAuthenticated: !!stored,
      currentUserEmail: stored,
      isLoading: false,
    });
  }, [isFetching]);

  const login = useCallback(
    async (email: string, password: string): Promise<string | null> => {
      if (!actor) return "Service unavailable. Please try again.";
      try {
        const result = await actor.login(email, password);
        if (result.__kind__ === "ok") {
          localStorage.setItem(AUTH_KEY, email);
          setState({
            isAuthenticated: true,
            currentUserEmail: email,
            isLoading: false,
          });
          return null;
        }
        const err = result.err;
        if (err.__kind__ === "InvalidCredentials")
          return "Invalid email or password.";
        if (err.__kind__ === "NotAuthenticated")
          return "Invalid email or password.";
        if (err.__kind__ === "InternalError") return err.InternalError;
        return "Login failed. Please try again.";
      } catch {
        return "Network error. Please try again.";
      }
    },
    [actor],
  );

  const register = useCallback(
    async (email: string, password: string): Promise<string | null> => {
      if (!actor) return "Service unavailable. Please try again.";
      try {
        const result = await actor.register(email, password);
        if (result.__kind__ === "ok") {
          localStorage.setItem(AUTH_KEY, email);
          setState({
            isAuthenticated: true,
            currentUserEmail: email,
            isLoading: false,
          });
          return null;
        }
        const err = result.err;
        if (err.__kind__ === "EmailAlreadyExists")
          return "An account with this email already exists.";
        if (err.__kind__ === "InternalError") return err.InternalError;
        return "Registration failed. Please try again.";
      } catch {
        return "Network error. Please try again.";
      }
    },
    [actor],
  );

  const logout = useCallback(async () => {
    try {
      if (actor) await actor.logout();
    } catch {
      // ignore
    }
    localStorage.removeItem(AUTH_KEY);
    setState({
      isAuthenticated: false,
      currentUserEmail: null,
      isLoading: false,
    });
  }, [actor]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
