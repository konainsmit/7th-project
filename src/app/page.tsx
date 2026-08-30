"use client";

import { useState } from "react";
import {
  ArrowRight, Bell, CalendarDays, Check, ChevronDown, ChevronRight,
  CircleHelp, Clock3, Coffee, Compass, Download, Heart, Lightbulb,
  MapPin, Menu, Navigation, Plane, Plus, Search, Settings2, Sparkles,
  Utensils, WalletCards, X, Zap,
} from "lucide-react";

type Trip = { place: string; dates: string; days: number; title: string; image: string };

const demos: Record<string, Trip> = {
  tokyo: { place: "Tokyo, Japan", dates: "Oct 12 – 17, 2025", days: 5, title: "Tech & Anime Tour", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=85" },
  rome: { place: "Rome, Italy", dates: "May 04 – 10, 2025", days: 7, title: "Cultural Honeymoon", image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=85" },
  dubai: { place: "Dubai, UAE", dates: "Nov 18 – 21, 2025", days: 3, title: "Luxury Escapade", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85" },
};

const dayData = [
  { day: "DAY 01", date: "SAT, OCT 12", title: "Neon beginnings", area: "Shibuya · Harajuku", color: "coral", activities: [
    ["09:00", "Morning", "Meiji Jingu Shrine", "Quiet forest trails & a fresh start", "Temple", "18 min walk"],
    ["13:30", "Afternoon", "Takeshita Street", "Street style, crepes & colorful finds", "Explore", "12 min train"],
    ["19:00", "Evening", "Shibuya Sky at sunset", "A golden-hour view above the city", "Viewpoint", "8 min walk"],
  ]},
  { day: "DAY 02", date: "SUN, OCT 13", title: "Future / familiar", area: "Akihabara · Asakusa", color: "azure", activities: [
    ["09:30", "Morning", "Senso-ji Temple", "Lanterns, incense and old Tokyo", "Temple", "22 min train"],
    ["14:00", "Afternoon", "Akihabara arcades", "Retro games & an afternoon of play", "Culture", "18 min train"],
    ["20:00", "Evening", "Uobei Sushi", "Conveyor belt sushi, done differently", "Food", "5 min walk"],
  ]},
];

function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${className}`}>{children}</span>;
}

export default function Home() {
  const [trip, setTrip] = useState(demos.tokyo);
  const [selectedDay, setSelectedDay] = useState(0);
  const [vibes, setVibes] = useState(["Culture", "Food"]);
  const [observability, setObservability] = useState(false);
  const [saved, setSaved] = useState(false);
  const [generated, setGenerated] = useState(false);

  const loadDemo = (key: string) => { setTrip(demos[key]); setSelectedDay(0); setGenerated(true); };
  const toggleVibe = (v: string) => setVibes((current) => current.includes(v) ? current.filter((x) => x !== v) : [...current, v]);

  return (
    <main className="min-h-screen bg-[#fdfbf7] text-[#0f172a]">
      <div className="top-banner"><div className="flex items-center gap-2"><span className="pulse-dot" /> <span className="font-bold">Demo Simulation Mode</span><span className="hidden text-[#fce5a7] sm:inline">— Explore the agent in action with instant trip presets</span></div><Sparkles size={15} /></div>
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 lg:px-10">
        <div className="flex items-center gap-3"><div className="brand-mark"><Compass size={19} strokeWidth={2.5} /></div><span className="font-display text-[23px] font-bold tracking-[-.04em]">wayfinder<span className="text-[#ff5a5f]">.</span></span></div>
        <div className="hidden items-center gap-8 text-[13px] font-semibold text-slate-500 md:flex"><a className="nav-active">My trips</a><a>Inspiration</a><a>Saved places</a></div>
        <div className="flex items-center gap-3"><button className="icon-button"><Bell size={18} /></button><div className="avatar">AM</div><button className="md:hidden"><Menu size={22} /></button></div>
      </nav>

      <section className="mx-auto max-w-[1440px] px-5 pb-7 lg:px-10">
        <div className="hero-grid">
          <div className="hero-copy"><Pill className="bg-[#fff0ed] text-[#e54d52]"><Zap size={13} className="mr-1" fill="currentColor" /> AI itinerary engine</Pill><h1 className="font-display mt-5 max-w-[640px] text-[clamp(44px,5vw,72px)] font-bold leading-[.98] tracking-[-.065em]">Travel <em className="serif-accent">deeper.</em><br />Worry less.</h1><p className="mt-6 max-w-[500px] text-[16px] leading-7 text-slate-500">Your thoughtful, beautifully organized trip — from first idea to final boarding call.</p><div className="mt-7 flex flex-wrap gap-3"><button onClick={() => setGenerated(true)} className="primary-button">Build my itinerary <ArrowRight size={17} /></button><button onClick={() => setObservability(true)} className="secondary-button"><Sparkles size={16} /> See how it works</button></div></div>
          <div className="hero-photo" style={{ backgroundImage: `url(${trip.image})` }}><div className="photo-shade" /><div className="photo-caption"><span><MapPin size={14} fill="currentColor" /> {trip.place}</span><span className="text-white/70">{trip.days} days of discovery</span></div></div>
        </div>

        <div className="metric-bar"><div><span className="metric-number">5h <ArrowRight size={15} /> 30s</span><span className="metric-label">Planning time reduced</span></div><div><span className="metric-number">+96%</span><span className="metric-label">Budget variance accuracy</span></div><div><span className="metric-number">15,000<span className="text-[#ff5a5f]">+</span></span><span className="metric-label">Local hidden gems indexed</span></div><div className="hidden border-l border-[#e8e2d8] pl-8 xl:block"><span className="text-[12px] font-bold text-[#0284c7]">POWERED BY WAYFINDER AI</span><span className="mt-1 block text-[11px] text-slate-400">Curated for curious humans</span></div></div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-20 lg:px-10"><div className="section-heading"><div><Pill className="bg-[#e8f6fb] text-[#0270a8]">01 / Plan your trip</Pill><h2 className="font-display mt-3 text-3xl font-bold tracking-[-.04em]">Start with a feeling.</h2></div><p className="max-w-[320px] text-right text-sm leading-6 text-slate-400">Tell us a little about your trip.<br />We&apos;ll handle the rest.</p></div>
        <div className="demo-row"><span className="demo-label"><Sparkles size={14} /> Quick load a demo</span>{Object.entries(demos).map(([key, item]) => <button key={key} onClick={() => loadDemo(key)} className={`demo-button ${trip.place === item.place ? "demo-selected" : ""}`}><span className="demo-emoji">{key === "tokyo" ? "✦" : key === "rome" ? "◌" : "◈"}</span>{item.days}-day {item.place.split(",")[0]} <ChevronRight size={14} /></button>)}</div>
        <div className="planner-grid">
          <aside className="intake-card"><div className="card-top"><span className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">Trip details</span><Settings2 size={17} className="text-slate-300" /></div><label className="field-label">Where to?</label><div className="input-box"><MapPin size={17} className="text-[#ff5a5f]" /><span>{trip.place}</span><ChevronDown size={15} className="ml-auto text-slate-300" /></div><div className="field-row"><div><label className="field-label">Dates</label><div className="input-box"><CalendarDays size={16} className="text-[#0284c7]" /><span>{trip.dates}</span></div></div><div><label className="field-label">Travelers</label><div className="input-box"><span>2 adults</span><ChevronDown size={14} className="ml-auto text-slate-300" /></div></div></div><label className="field-label">Budget level</label><div className="budget-grid">{["Budget", "Moderate", "Luxury"].map((b, i) => <button className={`budget-choice ${i === 1 ? "choice-active" : ""}`} key={b}><span>{["$", "$$", "$$$"][i]}</span>{b}</button>)}</div><label className="field-label">What are you into?</label><div className="vibe-grid">{["Adventure", "Culture", "Food", "Nightlife"].map((v) => <button key={v} onClick={() => toggleVibe(v)} className={`vibe-choice ${vibes.includes(v) ? "vibe-active" : ""}`}>{vibes.includes(v) ? <Check size={14} /> : <Plus size={14} />}{v}</button>)}</div><div className="budget-total"><div><WalletCards size={17} /><span>Estimated daily spend</span></div><strong>$185 <small>/ day</small></strong></div><button onClick={() => setGenerated(true)} className="generate-button"><Sparkles size={17} /> {generated ? "Itinerary refreshed" : "Generate my itinerary"}</button></aside>

          <div className="itinerary-area"><div className="itinerary-head"><div><Pill className="bg-[#fff4d6] text-[#b17b00]">Your trip · {trip.days} days</Pill><h2 className="font-display mt-3 text-[32px] font-bold tracking-[-.05em]">{trip.place.split(",")[0]} <span className="font-normal text-slate-300">/</span> {trip.title}</h2></div><div className="flex gap-2"><button className="round-action" onClick={() => setSaved(!saved)}><Heart size={17} fill={saved ? "#ff5a5f" : "none"} className={saved ? "text-[#ff5a5f]" : ""} /></button><button className="export-button"><Download size={15} /> Export guide</button></div></div><div className="day-tabs">{dayData.map((d, i) => <button onClick={() => setSelectedDay(i)} className={`day-tab ${selectedDay === i ? "day-selected" : ""}`} key={d.day}><span>{d.day}</span><strong>{d.date}</strong></button>)}<button className="day-tab more-days">+ {Math.max(0, trip.days - 2)} more days</button></div><div className="timeline"><div className="timeline-line" />{dayData[selectedDay].activities.map(([time, period, title, desc, tag, transit], i) => <div className="timeline-item" key={title}><div className="time-label">{time}<span>{period}</span></div><div className={`timeline-dot dot-${i}`} /> <article className={`activity-card ${i === 1 ? "featured-activity" : ""}`}><div className="activity-image" style={{ backgroundImage: `url(${i === 0 ? "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=400&q=80" : i === 1 ? "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=500&q=80" : "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80"})` }}><Pill className="absolute left-3 top-3 bg-white/90 text-slate-600">{tag}</Pill></div><div className="activity-content"><div><h3>{title}</h3><p>{desc}</p></div><span className="transit"><Navigation size={12} /> {transit}</span></div></article></div>)}</div><div className="tip-card"><div className="tip-icon"><Lightbulb size={18} /></div><div><b>Local tip from your guide</b><p>Get to Meiji Jingu before 9am for the morning purification ceremony — it&apos;s a beautiful, quiet ritual.</p></div><button><ChevronRight size={18} /></button></div></div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1440px] items-center justify-between border-t border-[#ebe6dc] px-5 py-7 text-xs text-slate-400 lg:px-10"><span>© 2025 wayfinder. Made for the curious.</span><span className="flex items-center gap-5"><a>Privacy</a><a>Feedback</a><button onClick={() => setObservability(true)} className="flex items-center gap-1 text-slate-600"><CircleHelp size={14} /> Agent observability</button></span></footer>
      {observability && <div className="drawer-backdrop" onClick={() => setObservability(false)}><aside className="observability" onClick={(e) => e.stopPropagation()}><div className="flex items-center justify-between"><div><Pill className="bg-[#e8f6fb] text-[#0270a8]">Live trace</Pill><h2 className="font-display mt-3 text-2xl font-bold">Agent observability</h2></div><button onClick={() => setObservability(false)}><X size={20} /></button></div><div className="agent-status"><span className="pulse-dot" /> Agent completed in 2.4s</div><div className="trace-list">{["Analyzing travel vibe", "Optimizing geographical route clusters", "Selecting cuisine gems", "Formatting itinerary"].map((x, i) => <div className="trace-row" key={x}><span className="trace-check"><Check size={12} /></span><span>{x}</span><small>{["0.3s", "0.7s", "1.1s", "0.3s"][i]}</small></div>)}</div><div className="payload"><div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400"><span>Structured payload</span><span>JSON</span></div><pre>{JSON.stringify({ destination: trip.place, duration_days: trip.days, budget_tier: "moderate", vibes, activities: 6, map_pins: 12 }, null, 2)}</pre></div></aside></div>}
    </main>
  );
}
