import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone, MessageCircle, Mail, MapPin, Send, Facebook, Instagram, Youtube, Twitter,
  Droplets, ShieldCheck, Leaf, HeartPulse, X as XIcon,
  Filter, Beaker, Sparkles, TestTube, Package, Waves, Sun, FlaskConical,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Bubbles, Wave } from "@/components/Bubbles";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";

import banner from "@/assets/banner.png";
import bannerHero from "@/assets/banner-hero.png";
import logo from "@/assets/logo.png";
import b19 from "@/assets/bottle-19l.png";
import b6 from "@/assets/bottle-6l.png";
import b500 from "@/assets/bottle-500ml.png";
import bPair from "@/assets/bottles-pair.png";
import nivaVideo from "@/assets/niva-video.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NIVA Drinking Water — Pure Water. Pure Life. | HA Enterprises" },
      { name: "description", content: "NIVA by HA Enterprises delivers premium, purified drinking water across Karachi. RO-purified, mineral-balanced bottles in 330ml, 500ml, 1.5L, 6L and 19L." },
      { property: "og:title", content: "NIVA Drinking Water — Pure Water. Pure Life. | HA Enterprises" },
      { property: "og:description", content: "NIVA by HA Enterprises delivers premium, purified drinking water across Karachi. RO-purified, mineral-balanced bottles in 330ml, 500ml, 1.5L, 6L and 19L." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const products = [
  { name: "500 ml", desc: "Everyday convenience", img: b500, tag: "Popular" },
  { name: "1.5 Litre", desc: "Family & office use", img: bPair, tag: "Value" },
  { name: "6 Litre", desc: "Home kitchen sized", img: b6, tag: "Household" },
  { name: "19 Litre", desc: "Bulk dispenser bottle", img: b19, tag: "Corporate" },
];

const process = [
  { icon: Droplets, label: "Raw Water" },
  { icon: Filter, label: "Sand Filter" },
  { icon: Beaker, label: "Carbon Filter" },
  { icon: FlaskConical, label: "RO Plant" },
  { icon: Sun, label: "UV Sterilization" },
  { icon: Sparkles, label: "Ozonation" },
  { icon: Waves, label: "Mineral Balancing" },
  { icon: TestTube, label: "Quality Testing" },
  { icon: Package, label: "NIVA Bottling" },
];

const gallery = [banner, b19, b6, b500, bPair, banner];

const locations = [
  "NICVD Karachi", "Muhammadi Building Bank", "Global Express", "Hospital Solution Office",
  "M.M. Co Office", "Oil Refinery", "N.H.S Housing Society", "Askari 4",
];

function Home() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div id="home" className="relative overflow-hidden bg-background">
      <Navbar />

      {/* HERO — banner shown as-is */}
      <section className="relative w-full bg-white pt-20">
        <div className="relative w-full">
          <img
            src={bannerHero}
            alt="NIVA Water — Pure. Safe. Healthy. HA Enterprises"
            className="block h-auto w-full object-contain"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <Bubbles />
        </div>

        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-6 py-8 sm:px-8">
          <a
            href="https://wa.me/923462044095"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5"
          >
            Order Now
            <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-7 py-3.5 text-sm font-semibold text-brand-deep transition-colors hover:bg-brand-ice"
          >
            Contact Us
          </a>
        </div>
      </section>


      {/* PRODUCTS */}
      <section id="products" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">Our Products</p>
              <h2 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Sizes for every moment</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                From on-the-go 330ml to the 19L dispenser bottle — NIVA delivers pure, mineral-balanced water in every format.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {products.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div className="group relative flex h-full flex-col items-center rounded-2xl bg-gradient-soft p-6 shadow-card transition-all hover:-translate-y-2 hover:shadow-glow">
                  <span className="absolute right-4 top-4 rounded-full bg-brand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {p.tag}
                  </span>
                  <div className="flex h-48 items-end justify-center">
                    <img src={p.img} alt={`NIVA ${p.name} bottle`} className="animate-float h-full w-auto object-contain drop-shadow-xl" style={{ animationDelay: `${i * 0.4}s` }} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-brand-deep">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative bg-gradient-soft py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">About Us</p>
              <h2 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">
                A dream for your health, <span className="text-gradient-brand">bottled with care</span>.
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                HA Enterprises is the proud maker of <strong>NIVA Drinking Water</strong> — a premium bottled water brand
                dedicated to delivering clean, safe and mineral-balanced hydration across Karachi. Every drop passes
                through our multi-stage purification plant, sealed under strict hygiene standards to guarantee the
                purity your family deserves.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                From households and hospitals to corporate offices and refineries, NIVA is trusted for one simple
                promise: <em>Pure Water. Pure Life.</em>
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-5">
              {[
                { n: 25000, label: "Happy Customers" },
                { n: 500000, label: "Bottles Delivered" },
                { n: 120, label: "Corporate Clients" },
                { n: 10, label: "Years of Experience" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-white p-6 shadow-card">
                  <div className="text-3xl font-bold text-gradient-brand sm:text-4xl">
                    <Counter to={s.n} suffix="+" />
                  </div>
                  <div className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PLANT */}
      <section id="plant" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">Our Plant</p>
              <h2 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">9-Step Purification Process</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Every NIVA bottle passes through a rigorously engineered process — from raw source to sealed purity.
              </p>
            </div>
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-brand via-brand-light to-transparent md:left-1/2" />
            <div className="grid gap-6 md:grid-cols-2">
              {process.map((s, i) => (
                <Reveal key={s.label} delay={i * 60}>
                  <div className={`relative flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card md:${i % 2 === 0 ? "ml-auto" : "mr-auto"} md:max-w-md`}>
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow">
                      <s.icon size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-widest text-brand">Step {i + 1}</div>
                      <div className="text-lg font-bold text-brand-deep">{s.label}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative bg-gradient-soft py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">Gallery</p>
              <h2 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Moments of purity</h2>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((src, i) => (
              <Reveal key={i} delay={i * 60}>
                <button
                  onClick={() => setLightbox(src)}
                  className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-brand-ice shadow-card"
                >
                  <img
                    src={src}
                    alt={`NIVA gallery ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-brand-deep/0 transition-colors group-hover:bg-brand-deep/30" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal>
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">Watch</p>
              <h2 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Experience NIVA</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-glow bg-brand-deep">
              <video
                src={nivaVideo.url}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
                aria-label="NIVA promotional video"
                poster={banner}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* DELIVERY LOCATIONS */}
      <section className="relative bg-gradient-brand py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <div className="text-center text-white">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/80">We Deliver To</p>
              <h2 className="mt-2 text-4xl font-bold sm:text-5xl">Trusted across Karachi</h2>
            </div>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {locations.map((loc, i) => (
              <Reveal key={loc} delay={i * 50}>
                <div className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:bg-white/20">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-brand-deep">
                    <MapPin size={18} />
                  </div>
                  <div className="text-sm font-semibold text-white">{loc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand">Get in Touch</p>
              <h2 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">Order NIVA today</h2>
              <p className="mt-4 text-muted-foreground">
                Reach us on phone or WhatsApp — our team is ready to serve homes, offices and corporate clients across Karachi.
              </p>

              <div className="mt-8 space-y-4">
                <a href="tel:03001196110" className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card transition-transform hover:-translate-y-0.5">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white"><Phone size={20} /></span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Phone</div>
                    <div className="font-semibold text-brand-deep">0300-1196110</div>
                  </div>
                </a>
                <a href="https://wa.me/923462044095" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card transition-transform hover:-translate-y-0.5">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#25D366] text-white"><MessageCircle size={20} /></span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</div>
                    <div className="font-semibold text-brand-deep">0346-2044095</div>
                  </div>
                </a>
                <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white"><MapPin size={20} /></span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Service Area</div>
                    <div className="font-semibold text-brand-deep">Karachi, Pakistan</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl shadow-card">
                <iframe
                  title="NIVA delivery area map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=66.9%2C24.78%2C67.3%2C25.05&layer=mapnik"
                  className="h-64 w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Thank you! We'll be in touch shortly."); }}
              className="rounded-3xl bg-gradient-soft p-8 shadow-card sm:p-10"
            >
              <h3 className="text-2xl font-bold text-brand-deep">Send us a message</h3>
              <p className="mt-1 text-sm text-muted-foreground">We usually respond within a few hours.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input required placeholder="Full name" className="rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand" />
                <input required type="tel" placeholder="Phone number" className="rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand" />
                <input required type="email" placeholder="Email" className="sm:col-span-2 rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand" />
                <textarea required placeholder="Your message" rows={5} className="sm:col-span-2 rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5">
                Send Message <Send size={16} />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-brand-deep pt-16 pb-8 text-white/85">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:px-8 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-white">
                <img src={logo} alt="NIVA" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <div className="font-display text-xl font-bold text-white">NIVA</div>
                <div className="text-xs uppercase tracking-widest text-white/70">HA Enterprises</div>
              </div>
            </div>
            <p className="mt-4 text-sm">Pure Water. Pure Life. Premium purified drinking water — trusted across homes, offices and industry.</p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {["Home", "About", "Products", "Plant", "Gallery", "Contact"].map((l) => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="transition-colors hover:text-white">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">Products</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {products.map((p) => <li key={p.name}>{p.name} Bottle</li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone size={14} /> 0300-1196110</li>
              <li className="flex items-center gap-2"><MessageCircle size={14} /> 0346-2044095</li>
              <li className="flex items-center gap-2"><Mail size={14} /> info@niva-water.com</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> Karachi, Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-6 pt-6 text-center text-xs text-white/60 sm:px-8">
          © {new Date().getFullYear()} HA Enterprises · NIVA Drinking Water. All rights reserved.
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/923462044095"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-glow transition-transform hover:scale-110"
      >
        <MessageCircle size={26} />
      </a>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-6 backdrop-blur"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25" aria-label="Close">
            <XIcon />
          </button>
          <img src={lightbox} alt="Preview" className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-glow" />
        </div>
      )}
    </div>
  );
}
