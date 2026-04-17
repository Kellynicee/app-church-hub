import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import hero from "@/assets/hero-worship.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Morningstar Covenant Int'l Church" },
      { name: "description", content: "Beautiful moments from worship, events and outreach." },
    ],
  }),
  component: Gallery,
});

const cats = ["All", "Worship", "Events", "Outreach"] as const;

const items = [
  { src: hero, cat: "Worship", h: "row-span-2" },
  { src: g1, cat: "Worship", h: "" },
  { src: g2, cat: "Events", h: "row-span-2" },
  { src: g3, cat: "Outreach", h: "" },
  { src: g4, cat: "Events", h: "" },
  { src: g5, cat: "Outreach", h: "" },
];

function Gallery() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [open, setOpen] = useState<string | null>(null);

  const list = cat === "All" ? items : items.filter((i) => i.cat === cat);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Gallery</p>
        <h1 className="font-display text-4xl font-semibold leading-tight">
          Beautiful <span className="text-gradient-gold">moments</span>.
        </h1>
      </header>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
              cat === c ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid auto-rows-[140px] grid-cols-2 gap-2">
        {list.map((it, i) => (
          <motion.button
            key={it.src + i}
            layout
            onClick={() => setOpen(it.src)}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className={`group relative overflow-hidden rounded-2xl ${it.h}`}
          >
            <img src={it.src} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-primary">
              {it.cat}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4 backdrop-blur"
          >
            <button
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white"
              onClick={() => setOpen(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={open}
              alt=""
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-elegant"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
