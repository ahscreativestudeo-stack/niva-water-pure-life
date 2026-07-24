import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#plant", label: "Plant" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gradient-brand shadow-card backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <div className={`grid h-11 w-11 place-items-center rounded-full transition-all ${scrolled ? "bg-white/95" : "bg-white/90"} shadow-card`}>
            <img src={logo} alt="NIVA Drinking Water" className="h-9 w-9 object-contain" />
          </div>
          <div className="leading-tight">
            <div className={`font-display text-lg font-bold ${scrolled ? "text-white" : "text-white drop-shadow"}`}>NIVA</div>
            <div className={`text-[10px] uppercase tracking-widest ${scrolled ? "text-white/80" : "text-white/90 drop-shadow"}`}>HA Enterprises</div>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/15 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/923462044095"
            target="_blank"
            rel="noreferrer"
            className="ml-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-brand-deep shadow-card transition-transform hover:-translate-y-0.5"
          >
            Order Now
          </a>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="bg-gradient-brand px-4 pb-6 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-white/95 hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/923462044095"
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-brand-deep"
            >
              Order Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
