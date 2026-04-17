import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play, Pause, Search, Filter } from "lucide-react";
import { useState } from "react";
import sermon1 from "@/assets/sermon-1.jpg";
import sermon2 from "@/assets/sermon-2.jpg";
import sermon3 from "@/assets/sermon-3.jpg";

export const Route = createFileRoute("/sermons")({
  head: () => ({
    meta: [
      { title: "Sermons — Morningstar Covenant Int'l Church" },
      {
        name: "description",
        content:
          "Watch and listen to the latest sermons from Morningstar Covenant Int'l Church.",
      },
    ],
  }),
  component: Sermons,
});

const series = ["All", "Glory", "Covenant", "Family", "Mission"] as const;

const data = [
  {
    title: "Arise & Shine",
    speaker: "Ps. Daniel Okoye",
    series: "Glory",
    date: "Apr 14, 2025",
    duration: "42:18",
    img: sermon1,
  },
  {
    title: "The Covenant Path",
    speaker: "Ps. Grace Ade",
    series: "Covenant",
    date: "Apr 07, 2025",
    duration: "38:42",
    img: sermon2,
  },
  {
    title: "Carriers of Light",
    speaker: "Ps. Daniel Okoye",
    series: "Mission",
    date: "Mar 31, 2025",
    duration: "45:10",
    img: sermon3,
  },
  {
    title: "When God Shows Up",
    speaker: "Min. Tobi Ade",
    series: "Glory",
    date: "Mar 24, 2025",
    duration: "36:25",
    img: sermon1,
  },
];

function Sermons() {
  const [active, setActive] = useState<(typeof series)[number]>("All");
  const [playing, setPlaying] = useState<string | null>(null);

  const list = active === "All" ? data : data.filter((d) => d.series === active);
  const featured = data[0];

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Sermons</p>
        <h1 className="font-display text-4xl font-semibold leading-tight">Be filled.</h1>
      </header>

      {/* Featured player */}
      <article className="overflow-hidden rounded-3xl bg-card shadow-elegant">
        <div className="relative">
          <img
            src={featured.img}
            alt={featured.title}
            className="h-56 w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button
            onClick={() => setPlaying(playing === featured.title ? null : featured.title)}
            className="absolute bottom-4 left-4 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.82_0.14_78)] to-[oklch(0.6_0.16_55)] text-[oklch(0.16_0.04_265)] shadow-gold transition active:scale-95"
            aria-label="Play"
          >
            {playing === featured.title ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </button>
          <div className="absolute bottom-4 left-24 right-4 text-white">
            <p className="text-[10px] uppercase tracking-widest text-gold">Now featured</p>
            <p className="font-display text-lg font-semibold leading-tight">{featured.title}</p>
            <p className="text-xs opacity-80">
              {featured.speaker} • {featured.duration}
            </p>
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-accent">
            <motion.div
              animate={{ width: playing ? "62%" : "12%" }}
              transition={{ duration: 0.6 }}
              className="h-full rounded-full bg-gradient-to-r from-gold to-[oklch(0.6_0.16_55)]"
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
            <span>14:22</span>
            <span>{featured.duration}</span>
          </div>
        </div>
      </article>

      {/* Search + filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 rounded-full bg-card px-4 py-3 shadow-soft">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search sermons, speakers, series…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <Filter className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {series.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                active === s
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-card text-muted-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Sermon list */}
      <div className="space-y-3">
        {list.map((s, i) => (
          <motion.article
            key={s.title + i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft"
          >
            <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl">
              <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 grid place-items-center bg-black/30">
                <Play className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-base font-semibold">{s.title}</p>
              <p className="text-xs text-muted-foreground">{s.speaker}</p>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="rounded-full bg-accent px-2 py-0.5 text-accent-foreground">
                  {s.series}
                </span>
                <span>{s.date}</span>
                <span>•</span>
                <span>{s.duration}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
