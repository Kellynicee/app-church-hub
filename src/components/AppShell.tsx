import { Link, useLocation, Outlet } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Info,
  PlayCircle,
  HandHeart,
  CalendarDays,
  Image as ImageIcon,
  QrCode,
  Mail,
  Bell,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type NavItem = {
  to: "/" | "/sermons" | "/check-in" | "/give" | "/events";
  label: string;
  icon: typeof Home;
  highlight?: boolean;
};

const primaryNav: NavItem[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/sermons", label: "Sermons", icon: PlayCircle },
  { to: "/check-in", label: "Check-In", icon: QrCode, highlight: true },
  { to: "/give", label: "Give", icon: HandHeart },
  { to: "/events", label: "Events", icon: CalendarDays },
];

const drawerNav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: Info },
  { to: "/sermons", label: "Sermons", icon: PlayCircle },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/give", label: "Give", icon: HandHeart },
  { to: "/check-in", label: "Check-In", icon: QrCode },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("mcic-theme")) as
      | "light"
      | "dark"
      | null;
    const initial = stored ?? "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("mcic-theme", next);
  };
  return { theme, toggle };
}

export function AppShell() {
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Ambient backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-aurora opacity-60" />

      {/* Top bar */}
      <header className="sticky top-0 z-40">
        <div className="glass mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="rounded-full p-2 transition hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.82_0.14_78)] to-[oklch(0.5_0.14_60)] text-[oklch(0.16_0.04_265)] shadow-gold">
              <span className="font-display text-base font-bold">M</span>
            </div>
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold">Morningstar</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Covenant Int'l
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-1">
            <Link
              to="/check-in"
              aria-label="Notifications"
              className="relative rounded-full p-2 transition hover:bg-accent"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold" />
            </Link>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="rounded-full p-2 transition hover:bg-accent"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="mx-auto max-w-2xl px-4 pb-32 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-40 px-3 safe-bottom">
        <div className="glass mx-auto flex max-w-2xl items-center justify-between rounded-3xl px-2 py-2 shadow-elegant">
          {primaryNav.map(({ to, label, icon: Icon, highlight }) => {
            const active = location.pathname === to;
            if (highlight) {
              return (
                <Link
                  key={to}
                  to={to}
                  className="-mt-8 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.82_0.14_78)] to-[oklch(0.5_0.14_60)] text-[oklch(0.16_0.04_265)] shadow-gold transition active:scale-95"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              );
            }
            return (
              <Link
                key={to}
                to={to}
                className="flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-1.5 transition"
                aria-label={label}
              >
                <Icon
                  className={`h-5 w-5 transition ${active ? "text-gold" : "text-muted-foreground"}`}
                />
                <span
                  className={`text-[10px] font-medium transition ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
                {active && (
                  <motion.span
                    layoutId="bnav-dot"
                    className="h-1 w-1 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 left-0 z-50 w-[84%] max-w-sm bg-card p-6 shadow-elegant"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.82_0.14_78)] to-[oklch(0.5_0.14_60)] text-[oklch(0.16_0.04_265)] shadow-gold">
                    <span className="font-display text-lg font-bold">M</span>
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold">Morningstar</p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Covenant Int'l Church
                    </p>
                  </div>
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full p-2 hover:bg-accent"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="space-y-1">
                {drawerNav.map(({ to, label, icon: Icon }) => {
                  const active = location.pathname === to;
                  return (
                    <li key={to}>
                      <Link
                        to={to}
                        className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                          active
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent text-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 rounded-3xl bg-hero p-5 text-white shadow-elegant">
                <p className="font-display text-lg leading-tight">
                  "Arise, shine; for thy light is come."
                </p>
                <p className="mt-2 text-xs text-white/80">— Isaiah 60:1</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
