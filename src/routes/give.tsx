import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CreditCard, Building2, Smartphone, Check, HandHeart } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/give")({
  head: () => ({
    meta: [
      { title: "Give — Morningstar Covenant Int'l Church" },
      {
        name: "description",
        content:
          "Partner with the work of the Kingdom through your tithes, offerings and seed at Morningstar.",
      },
    ],
  }),
  component: Give,
});

const presets = [10, 25, 50, 100, 250, 500];
const funds = ["Tithe", "Offering", "Missions", "Building"] as const;
const methods = [
  { id: "card", label: "Card", icon: CreditCard },
  { id: "bank", label: "Bank Transfer", icon: Building2 },
  { id: "mobile", label: "Mobile Money", icon: Smartphone },
] as const;

function Give() {
  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState("");
  const [fund, setFund] = useState<(typeof funds)[number]>("Tithe");
  const [method, setMethod] = useState<string>("card");
  const [done, setDone] = useState(false);

  const finalAmount = custom ? Number(custom) || 0 : amount;

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Give</p>
        <h1 className="font-display text-4xl font-semibold leading-tight">
          Sow into the <span className="text-gradient-gold">Kingdom</span>.
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          "Each one must give as he has decided in his heart." — 2 Cor. 9:7
        </p>
      </header>

      {/* Amount */}
      <section className="rounded-3xl bg-card p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Amount
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => {
                setAmount(p);
                setCustom("");
              }}
              className={`relative rounded-2xl border py-3 text-base font-semibold transition ${
                amount === p && !custom
                  ? "border-transparent bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-background text-foreground"
              }`}
            >
              ${p}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
          <span className="text-base font-semibold text-muted-foreground">$</span>
          <input
            inputMode="decimal"
            value={custom}
            onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="Custom amount"
            className="flex-1 bg-transparent text-base outline-none"
          />
        </div>
      </section>

      {/* Fund */}
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Designate
        </p>
        <div className="grid grid-cols-4 gap-2">
          {funds.map((f) => (
            <button
              key={f}
              onClick={() => setFund(f)}
              className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                fund === f
                  ? "bg-gradient-to-r from-gold to-[oklch(0.6_0.16_55)] text-[oklch(0.16_0.04_265)] shadow-gold"
                  : "bg-card text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Method */}
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Payment method
        </p>
        <div className="space-y-2">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left transition ${
                method === m.id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-card text-foreground"
              }`}
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl ${
                  method === m.id ? "bg-white/15" : "bg-accent"
                }`}
              >
                <m.icon className="h-5 w-5" />
              </span>
              <span className="flex-1 font-semibold">{m.label}</span>
              {method === m.id && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setDone(true);
          setTimeout(() => setDone(false), 2400);
        }}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.82_0.14_78)] to-[oklch(0.6_0.16_55)] py-4 text-base font-semibold text-[oklch(0.16_0.04_265)] shadow-gold"
      >
        <HandHeart className="h-5 w-5" />
        Give ${finalAmount.toFixed(2)} to {fund}
      </motion.button>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-accent p-4 text-center text-sm font-medium text-accent-foreground"
        >
          Thank you for your generosity 🙏
        </motion.div>
      )}
    </div>
  );
}
