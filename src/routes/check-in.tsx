import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, ScanLine, Check, KeyRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/check-in")({
  head: () => ({
    meta: [
      { title: "Check-In — Morningstar Covenant Int'l Church" },
      { name: "description", content: "Check in to today's service via QR or 6-digit code." },
    ],
  }),
  component: CheckIn,
});

function CheckIn() {
  const [tab, setTab] = useState<"qr" | "code">("qr");
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [success, setSuccess] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const filled = code.every((c) => c !== "");

  useEffect(() => {
    if (filled) {
      const t = setTimeout(() => setSuccess(true), 400);
      return () => clearTimeout(t);
    }
  }, [filled]);

  const updateAt = (i: number, val: string) => {
    const v = val.replace(/[^0-9]/g, "").slice(0, 1);
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 5) inputs.current[i + 1]?.focus();
  };

  const reset = () => {
    setCode(["", "", "", "", "", ""]);
    setSuccess(false);
    inputs.current[0]?.focus();
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Check-In</p>
        <h1 className="font-display text-4xl font-semibold leading-tight">
          Welcome, <span className="text-gradient-gold">friend</span>.
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Mark your attendance for today's service.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-card p-1.5 shadow-soft">
        {[
          { id: "qr", label: "QR Code", icon: QrCode },
          { id: "code", label: "6-Digit Code", icon: KeyRound },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as "qr" | "code")}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${
              tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === "qr" ? (
          <motion.section
            key="qr"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="overflow-hidden rounded-3xl bg-hero p-6 text-primary-foreground shadow-elegant"
          >
            <p className="text-xs uppercase tracking-widest text-gold">Scan to check in</p>
            <div className="relative mx-auto mt-5 grid h-64 w-64 place-items-center overflow-hidden rounded-3xl bg-white/95">
              {/* Faux QR */}
              <div className="grid h-52 w-52 grid-cols-12 grid-rows-12 gap-[2px]">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${
                      Math.random() > 0.45 ? "bg-[oklch(0.16_0.04_265)]" : "bg-transparent"
                    } rounded-[2px]`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold to-[oklch(0.6_0.16_55)] text-[oklch(0.16_0.04_265)] shadow-gold">
                  <span className="font-display text-xl font-bold">M</span>
                </div>
              </div>
              <motion.div
                aria-hidden
                initial={{ y: -110 }}
                animate={{ y: 110 }}
                transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute left-3 right-3 h-1 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent"
              />
            </div>
            <p className="mt-5 text-center text-sm opacity-85">
              Open your camera and point at the QR. Or use a 6-digit code instead.
            </p>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white/10 py-3 text-sm font-semibold backdrop-blur">
              <ScanLine className="h-4 w-4" /> Open scanner
            </button>
          </motion.section>
        ) : (
          <motion.section
            key="code"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5 rounded-3xl bg-card p-6 shadow-soft"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Enter today's code
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                You'll find the code on the screens in the auditorium.
              </p>
            </div>
            <div className="flex justify-between gap-2">
              {code.map((c, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputs.current[i] = el;
                  }}
                  inputMode="numeric"
                  value={c}
                  onChange={(e) => updateAt(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !c && i > 0) inputs.current[i - 1]?.focus();
                  }}
                  className="h-14 w-full rounded-2xl border border-border bg-background text-center font-display text-2xl font-bold outline-none focus:border-gold"
                />
              ))}
            </div>
            <button
              disabled={!filled}
              onClick={() => setSuccess(true)}
              className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition disabled:opacity-50"
            >
              Check In
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={reset}
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="w-full max-w-sm overflow-hidden rounded-3xl bg-card p-8 text-center shadow-elegant"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-gold to-[oklch(0.6_0.16_55)] text-[oklch(0.16_0.04_265)] shadow-gold"
              >
                <Check className="h-10 w-10" strokeWidth={3} />
              </motion.div>
              <h2 className="mt-5 font-display text-2xl font-semibold">You're checked in!</h2>
              <p className="mt-1 text-sm text-muted-foreground">Welcome home, beloved.</p>
              <p className="mt-4 rounded-2xl bg-accent px-4 py-3 text-xs text-accent-foreground">
                Sunday Glory Service • {new Date().toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </p>
              <button
                onClick={reset}
                className="mt-5 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
