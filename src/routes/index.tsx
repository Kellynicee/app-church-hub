import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Play,
  HandHeart,
  QrCode,
  Radio,
  Users,
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";
import heroImg from "@/assets/hero-worship.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import sermon1 from "@/assets/sermon-1.jpg";
import sermon2 from "@/assets/sermon-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Morningstar Covenant Int'l Church — Arise & Shine" },
      {
        name: "description",
        content:
          "Welcome home. Join Morningstar Covenant Int'l Church for worship, sermons, events, giving and community.",
      },
    ],
  }),
  component: Home,
});

const services = [
  { day: "Sunday", title: "Glory Service", time: "9:00 AM" },
  { day: "Wednesday", title: "Word Encounter", time: "6:30 PM" },
  { day: "Friday", title: "Prayer Vigil", time: "10:00 PM" },
];

const events = [
  {
    date: "Apr 27",
    title: "Night of Glory",
    time: "7:00 PM",
    location: "Main Auditorium",
    img: gallery1,
  },
  {
    date: "May 04",
    title: "Family Sunday",
    time: "9:00 AM",
    location: "Main Campus",
    img: gallery3,
  },
  {
    date: "May 18",
    title: "Youth Conference",
    time: "10:00 AM",
    location: "Hall B",
    img: gallery2,
  },
];

const sermons = [
  { title: "Arise & Shine", speaker: "Ps. Daniel Okoye", duration: "42 min", img: sermon1 },
  { title: "The Covenant Path", speaker: "Ps. Grace Ade", duration: "38 min", img: sermon2 },
];

function Home() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] shadow-elegant">
        <img
          src={heroImg}
          alt="Worship at Morningstar"
          width={1080}
          height={1600}
          className="h-[520px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-[oklch(0.16_0.04_265)]/95" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs font-medium uppercase tracking-[0.3em] text-gold"
          >
            Welcome home
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 font-display text-4xl font-semibold leading-[1.05] text-white"
          >
            Arise, shine —<br />
            <span className="text-gradient-gold">your light has come.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3 max-w-md text-sm leading-relaxed text-white/85"
          >
            Morningstar Covenant Int'l Church — a place of glory, family and purpose.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-5 flex flex-wrap gap-3"
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.82_0.14_78)] to-[oklch(0.62_0.16_55)] px-5 py-3 text-sm font-semibold text-[oklch(0.16_0.04_265)] shadow-gold transition active:scale-95"
            >
              Join Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/sermons"
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-semibold text-white"
            >
              <Play className="h-4 w-4" /> Watch Sermons
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="grid grid-cols-4 gap-3">
        {[
          { to: "/give", label: "Give", icon: HandHeart },
          { to: "/check-in", label: "Check-In", icon: QrCode },
          { to: "/sermons", label: "Live", icon: Radio },
          { to: "/about", label: "Connect", icon: Users },
        ].map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group flex flex-col items-center gap-2 rounded-2xl bg-card p-3 shadow-soft transition hover:-translate-y-0.5"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[oklch(0.95_0.04_85)] to-[oklch(0.88_0.07_80)] text-primary transition group-hover:from-gold group-hover:to-[oklch(0.62_0.16_55)] group-hover:text-[oklch(0.16_0.04_265)]">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-medium">{label}</span>
          </Link>
        ))}
      </section>

      {/* Service times */}
      <section>
        <SectionHeader eyebrow="Gather with us" title="Service Times" />
        <div className="grid gap-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {s.day}
                  </p>
                  <p className="font-display text-lg font-semibold leading-tight">{s.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground">
                <Clock className="h-3.5 w-3.5" /> {s.time}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming events */}
      <section>
        <SectionHeader
          eyebrow="What's next"
          title="Upcoming Events"
          action={{ label: "All events", to: "/events" }}
        />
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
          {events.map((e) => (
            <article
              key={e.title}
              className="group relative w-[78%] flex-shrink-0 snap-start overflow-hidden rounded-3xl bg-card shadow-soft"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={e.img}
                  alt={e.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 rounded-xl bg-white/95 px-2.5 py-1.5 text-center font-display text-xs font-bold leading-tight text-primary">
                  {e.date}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {e.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {e.location}
                  </span>
                </div>
                <button className="mt-3 w-full rounded-full bg-primary py-2 text-xs font-semibold text-primary-foreground transition active:scale-95">
                  RSVP
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Latest sermons */}
      <section>
        <SectionHeader
          eyebrow="Be filled"
          title="Latest Sermons"
          action={{ label: "Library", to: "/sermons" }}
        />
        <div className="space-y-3">
          {sermons.map((s) => (
            <Link
              key={s.title}
              to="/sermons"
              className="group flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft transition active:scale-[0.99]"
            >
              <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/30">
                  <Play className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-semibold leading-tight">{s.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.speaker}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{s.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Beautiful moments */}
      <section>
        <SectionHeader eyebrow="Family" title="Beautiful Moments" action={{ label: "Gallery", to: "/gallery" }} />
        <div className="grid grid-cols-3 gap-2">
          {[gallery1, gallery2, gallery3].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="aspect-square overflow-hidden rounded-2xl"
            >
              <img src={img} loading="lazy" alt="moment" className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Verse card */}
      <section className="relative overflow-hidden rounded-[2rem] bg-hero p-6 text-primary-foreground shadow-elegant">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/30 blur-3xl" />
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Verse of the day</p>
        <p className="mt-3 font-display text-2xl leading-snug">
          "For where two or three are gathered in my name, there am I among them."
        </p>
        <p className="mt-3 text-xs opacity-80">— Matthew 18:20</p>
      </section>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: { label: string; to: string };
}) {
  return (
    <div className="mb-3 flex items-end justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
          {eyebrow}
        </p>
        <h2 className="font-display text-xl font-semibold">{title}</h2>
      </div>
      {action && (
        <Link
          to={action.to}
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          {action.label} <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}
