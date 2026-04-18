import { createFileRoute } from "@tanstack/react-router";
import { Heart, Sparkles, Users, Globe2 } from "lucide-react";
import gallery2 from "@/assets/gallery-2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Morningstar Covenant Int'l Church" },
      {
        name: "description",
        content:
          "Our story, vision and mission at Morningstar Covenant International Church.",
      },
    ],
  }),
  component: About,
});

const values = [
  { icon: Heart, title: "Worship", desc: "Encountering God in spirit and in truth." },
  { icon: Users, title: "Family", desc: "Doing life together as one covenant household." },
  { icon: Sparkles, title: "Glory", desc: "Carrying His presence everywhere we go." },
  { icon: Globe2, title: "Mission", desc: "Reaching nations with the gospel of Christ." },
];

function About() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
          About us
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight">
          A covenant family on a <span className="text-gradient-gold">glory</span> journey.
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Morningstar Covenant Int'l Church is a modern, Spirit-filled community pursuing
          authentic worship, lasting relationships and bold mission.
        </p>
      </header>

      <div className="overflow-hidden rounded-3xl shadow-elegant">
        <img src={gallery2} alt="Sanctuary" className="h-64 w-full object-cover" loading="lazy" />
      </div>

      <section className="rounded-3xl bg-card p-5 shadow-soft">
        <h2 className="font-display text-xl font-semibold">Our Vision</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          To raise a generation of glory-carriers — empowered by the Word, fueled by the Spirit
          and committed to the mission of Jesus.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl bg-card p-4 shadow-soft">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold to-[oklch(0.6_0.16_55)] text-[oklch(0.16_0.04_265)]">
              <v.icon className="h-5 w-5" />
            </div>
            <p className="mt-3 font-display text-base font-semibold">{v.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{v.desc}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl bg-hero p-6 text-white shadow-elegant">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Lead Pastors</p>
        <p className="mt-2 font-display text-2xl">Ps. Daniel & Grace Okoye</p>
        <p className="mt-2 text-sm text-white/85">
          Passionate about the glory of God, family discipleship and raising young leaders.
        </p>
      </section>
    </div>
  );
}
