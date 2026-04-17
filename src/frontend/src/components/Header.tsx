import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Bell, GraduationCap } from "lucide-react";
import { mockUserProfile } from "../data/mockData";
import SmartSearch from "./SmartSearch";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Header() {
  const profile = mockUserProfile;
  const initials = getInitials(profile.name);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-14 flex items-center gap-3 px-4",
        "bg-card border-b border-border",
      )}
      data-ocid="header"
    >
      {/* Logo + Brand — visible on mobile, hidden on desktop (desktop shows in rail) */}
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

        {/* User avatar */}
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 px-2 py-1 rounded-lg transition-smooth",
            "hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          data-ocid="header.user_menu_button"
          aria-label={`User menu for ${profile.name}`}
        >
          <Avatar className="w-7 h-7 ring-1 ring-border">
            <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:block text-sm font-medium text-foreground max-w-[100px] truncate">
            {profile.name.split(" ")[0]}
          </span>
        </button>
      </div>
    </header>
  );
}
