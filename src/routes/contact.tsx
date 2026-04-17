import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Prayer — Morningstar Covenant Int'l Church" },
      { name: "description", content: "Get in touch, submit a prayer request, find our location." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Contact</p>
        <h1 className="font-display text-4xl font-semibold leading-tight">
          We'd love to <span className="text-gradient-gold">hear from you</span>.
        </h1>
      </header>

      <section className="grid grid-cols-1 gap-3">
        {[
          { icon: MapPin, label: "Visit", value: "12 Glory Avenue, City Centre" },
          { icon: Phone, label: "Call", value: "+1 (555) 010-2024" },
          { icon: Mail, label: "Email", value: "hello@morningstar.church" },
        ].map((c) => (
          <div key={c.label} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-soft">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-gold to-[oklch(0.6_0.16_55)] text-[oklch(0.16_0.04_265)]">
              <c.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {c.label}
              </p>
              <p className="text-sm font-semibold">{c.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Prayer request form */}
      <section className="rounded-3xl bg-card p-5 shadow-soft">
        <h2 className="font-display text-xl font-semibold">Prayer Request</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Share what's on your heart — our team will pray with you in confidence.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            setTimeout(() => setSent(false), 2400);
          }}
          className="mt-4 space-y-3"
        >
          <input
            required
            placeholder="Your name"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <textarea
            required
            rows={4}
            placeholder="How can we pray with you?"
            className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.82_0.14_78)] to-[oklch(0.6_0.16_55)] py-3.5 text-sm font-semibold text-[oklch(0.16_0.04_265)] shadow-gold"
          >
            <Send className="h-4 w-4" /> Submit Request
          </button>
          {sent && (
            <p className="rounded-2xl bg-accent p-3 text-center text-sm text-accent-foreground">
              Received. We're praying with you 🙏
            </p>
          )}
        </form>
      </section>

      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Follow
        </p>
        <div className="flex gap-2">
          {[Instagram, Youtube, Facebook].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="grid h-12 flex-1 place-items-center rounded-2xl bg-card text-foreground shadow-soft transition hover:text-gold"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
