import type { ReactNode } from "react";
import Header from "./Header";
import NavRail from "./NavRail";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background dark">
      {/* Global header */}
      <Header />

      {/* Body: nav rail + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop navigation rail */}
        <NavRail />

        {/* Main content */}
        <main
          className="flex-1 overflow-y-auto pb-20 md:pb-0"
          id="main-content"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>

      {/* Branding footer — hidden on mobile to preserve space above tab bar */}
      <footer className="hidden md:flex items-center justify-center py-3 bg-card border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-smooth"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
