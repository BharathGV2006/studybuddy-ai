import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, Loader2, Lock, Mail } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    setError(null);
    setLoading(true);
    const err = await login(email.trim().toLowerCase(), password);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background dark flex items-center justify-center px-4 py-12">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 auth-glow-indigo" />
      </div>

      <div className="relative w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center auth-logo-box">
            <GraduationCap size={24} className="auth-icon-color" />
          </div>
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to continue your studies
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6 space-y-5 auth-card">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="login-email"
                className="text-sm text-foreground/80 font-medium"
              >
                Email address
              </Label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="login.email_input"
                  className="pl-9 bg-secondary/50 border-border focus:border-primary"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="login-password"
                className="text-sm text-foreground/80 font-medium"
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-ocid="login.password_input"
                  className="pl-9 bg-secondary/50 border-border focus:border-primary"
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div
                data-ocid="login.error_state"
                className="rounded-lg px-3 py-2.5 text-sm auth-error"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              data-ocid="login.submit_button"
              disabled={loading}
              className={cn(
                "w-full h-10 font-semibold text-sm transition-smooth",
                "focus-visible:ring-2 focus-visible:ring-ring",
                loading ? "auth-btn-primary-loading" : "auth-btn-primary",
              )}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={15} className="animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs text-muted-foreground bg-card">
                Don't have an account?
              </span>
            </div>
          </div>

          <Link
            to="/signup"
            data-ocid="login.signup_link"
            className={cn(
              "flex w-full items-center justify-center h-9 rounded-lg text-sm font-medium transition-smooth",
              "text-muted-foreground hover:text-foreground hover:bg-secondary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            Create an account
          </Link>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-smooth"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
