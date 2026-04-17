import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, GraduationCap, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import SmartSearch from "./SmartSearch";

function getInitials(email: string) {
  const parts = email.split("@")[0].split(/[._-]/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Header() {
  const { currentUserEmail, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayEmail = currentUserEmail ?? "User";
  const initials = getInitials(displayEmail);
  const displayName = displayEmail.split("@")[0];

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate({ to: "/login" });
  };

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-14 flex items-center gap-3 px-4",
        "bg-card border-b border-border",
      )}
      data-ocid="header"
    >
      {/* Logo + Brand */}
      <Link
        to="/dashboard"
        className={cn(
          "flex items-center gap-2 shrink-0 md:w-[108px]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md",
        )}
        data-ocid="header.logo_link"
        aria-label="Go to dashboard"
      >
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-glow shrink-0">
          <GraduationCap size={15} className="text-primary-foreground" />
        </div>
        <span className="hidden md:block font-display font-semibold text-sm text-foreground tracking-tight">
          StudyBuddy
        </span>
      </Link>

      {/* Smart search — center */}
      <div className="flex-1 flex justify-center px-2">
        <SmartSearch />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Notifications */}
        <button
          type="button"
          className={cn(
            "relative w-8 h-8 flex items-center justify-center rounded-lg",
            "text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          data-ocid="header.notifications_button"
          aria-label="Notifications"
        >
          <Bell size={17} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
        </button>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className={cn(
              "flex items-center gap-2 px-2 py-1 rounded-lg transition-smooth",
              "hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
            data-ocid="header.user_menu_button"
            aria-label={`User menu for ${displayName}`}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            <Avatar className="w-7 h-7 ring-1 ring-border">
              <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-semibold">
                {initials || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-sm font-medium text-foreground max-w-[100px] truncate">
              {displayName}
            </span>
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div
              className="absolute right-0 mt-1 w-52 rounded-xl border border-border bg-popover shadow-xl overflow-hidden z-50"
              data-ocid="header.user_menu"
              role="menu"
              style={{ boxShadow: "0 8px 24px oklch(0 0 0 / 0.5)" }}
            >
              <div className="px-3 py-2.5 border-b border-border">
                <p className="text-xs font-medium text-foreground truncate">
                  {displayName}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {displayEmail}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                data-ocid="header.logout_button"
                role="menuitem"
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-smooth",
                  "text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                  "focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
