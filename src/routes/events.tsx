import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock, MapPin } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Morningstar Covenant Int'l Church" },
      {
        name: "description",
        content: "Upcoming gatherings, conferences and outreach at Morningstar.",
      },
    ],
  }),
  component: Events,
});

const events = [
  { date: "Apr 27", month: "April", title: "Night of Glory", time: "7:00 PM", location: "Main Auditorium", img: gallery1, tag: "Worship" },
  { date: "May 04", month: "May", title: "Family Sunday", time: "9:00 AM", location: "Main Campus", img: gallery3, tag: "Family" },
  { date: "May 18", month: "May", title: "Youth Conference", time: "10:00 AM", location: "Hall B", img: gallery2, tag: "Youth" },
  { date: "Jun 02", month: "June", title: "Healing Service", time: "6:00 PM", location: "Main Auditorium", img: gallery4, tag: "Outreach" },
];

function Events() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Events</p>
        <h1 className="font-display text-4xl font-semibold leading-tight">
          What's <span className="text-gradient-gold">happening</span>.
        </h1>
      </header>

      <div className="space-y-4">
        {events.map((e) => (
          <article key={e.title} className="overflow-hidden rounded-3xl bg-card shadow-soft">
            <div className="relative h-44">
              <img src={e.img} alt={e.title} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute left-4 top-4 rounded-2xl bg-white/95 px-3 py-2 text-center font-display leading-none text-primary">
                <div className="text-[10px] font-semibold uppercase tracking-widest">{e.month}</div>
                <div className="mt-0.5 text-xl font-bold">{e.date.split(" ")[1]}</div>
              </div>
              <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[oklch(0.16_0.04_265)]">
                {e.tag}
              </span>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-display text-xl font-semibold">{e.title}</h3>
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="space-y-1 text-xs text-muted-foreground">
                <p className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> {e.date}
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" /> {e.time}
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" /> {e.location}
                </p>
              </div>
              <button className="rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition active:scale-95">
                RSVP
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
