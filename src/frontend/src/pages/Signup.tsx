import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, Loader2, Lock, Mail } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!validateEmail(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    setLoading(true);
    const err = await register(email.trim().toLowerCase(), password);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    navigate({ to: "/dashboard" });
  };

  const passwordStrength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][
    passwordStrength
  ];
  // CSS class names — no raw OKLCH values in JS
  const strengthClass = [
    "",
    "strength-weak",
    "strength-fair",
    "strength-good",
    "strength-strong",
  ][passwordStrength];

  return (
    <div className="min-h-screen bg-background dark flex items-center justify-center px-4 py-12">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 auth-glow-violet" />
      </div>

      <div className="relative w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center auth-logo-box">
            <GraduationCap size={24} className="auth-icon-color" />
          </div>
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
              Create account
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Start your AI-powered study journey
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6 space-y-5 auth-card">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="signup-email"
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
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="signup.email_input"
                  className="pl-9 bg-secondary/50 border-border focus:border-primary"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="signup-password"
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
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-ocid="signup.password_input"
                  className="pl-9 bg-secondary/50 border-border focus:border-primary"
                  disabled={loading}
                />
              </div>
              {password && (
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-all duration-300",
                          i <= passwordStrength
                            ? strengthClass
                            : "strength-empty",
                        )}
                      />
                    ))}
                  </div>
                  <span className={cn("text-xs", strengthClass)}>
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="signup-confirm"
                className="text-sm text-foreground/80 font-medium"
              >
                Confirm password
              </Label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <Input
                  id="signup-confirm"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  data-ocid="signup.confirm_password_input"
                  className={cn(
                    "pl-9 bg-secondary/50 border-border focus:border-primary",
                    confirm &&
                      confirm !== password &&
                      "border-destructive focus:border-destructive",
                  )}
                  disabled={loading}
                />
              </div>
            </div>

            {error && (
              <div
                data-ocid="signup.error_state"
                className="rounded-lg px-3 py-2.5 text-sm auth-error"
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              data-ocid="signup.submit_button"
              disabled={loading}
              className={cn(
                "w-full h-10 font-semibold text-sm transition-smooth focus-visible:ring-2 focus-visible:ring-ring",
                loading ? "auth-btn-primary-loading" : "auth-btn-primary",
              )}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={15} className="animate-spin" />
                  Creating account…
                </span>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs text-muted-foreground bg-card">
                Already have an account?
              </span>
            </div>
          </div>

          <Link
            to="/login"
            data-ocid="signup.login_link"
            className={cn(
              "flex w-full items-center justify-center h-9 rounded-lg text-sm font-medium transition-smooth",
              "text-muted-foreground hover:text-foreground hover:bg-secondary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            Sign in instead
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
