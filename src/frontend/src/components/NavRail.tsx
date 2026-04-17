import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, BookOpen, Layers, LayoutDashboard } from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    ocid: "nav.dashboard",
  },
  {
    label: "Resources",
    path: "/resources",
    icon: BookOpen,
    ocid: "nav.resources",
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
    ocid: "nav.analytics",
  },
  {
    label: "Flashcards",
    path: "/flashcards",
    icon: Layers,
    ocid: "nav.flashcards",
  },
];

export default function NavRail() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const isActive = (path: string) => {
    if (path === "/dashboard")
      return currentPath === "/" || currentPath === "/dashboard";
    return currentPath.startsWith(path);
  };

  return (
    <>
      {/* Desktop nav rail */}
      <nav
        className="hidden md:flex flex-col items-center gap-1 w-[140px] min-h-screen pt-4 pb-8 border-r border-border bg-card"
        aria-label="Main navigation"
      >
        <div className="flex flex-col items-center gap-1 w-full px-3 mt-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                className="w-full"
              >
                <Link
                  to={item.path}
                  data-ocid={item.ocid}
                  className={cn(
                    "flex flex-col items-center gap-1.5 w-full px-2 py-3 rounded-lg text-center transition-smooth",
                    "hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon
                    size={20}
                    className={cn(
                      "shrink-0 transition-smooth",
                      active ? "text-primary-foreground" : "",
                    )}
                  />
                  <span className="text-[11px] font-medium font-body leading-tight">
                    {item.label}
                  </span>
                  {active && (
                    <motion.div layoutId="nav-indicator" className="sr-only" />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-card border-t border-border px-2 py-2 safe-bottom"
        aria-label="Bottom navigation"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              data-ocid={`${item.ocid}.mobile`}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg min-w-[60px] transition-smooth",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active ? "text-primary" : "text-muted-foreground",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {active && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute bottom-1.5 w-1 h-1 rounded-full bg-primary"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
