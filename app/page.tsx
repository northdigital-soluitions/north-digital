"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const WA_NUMBER = "522287775402";
const IG_USER   = "northdigital.mx";
const EMAIL_D   = "northdigital.mx@gmail.com";
const EMAIL_S   = "hola@northstudio.mx";

type Mode   = "digital" | "studio";
type Region = "MX" | "US";

/* ─── Translations ───────────────────────────────────────── */
const T = {
  MX: {
    nav: { about: "nosotros", pricing: "precios", contact: "contacto" },
    hero: {
      digital: {
        tagline: "Marketing · Branding · IA",
        desc: "Impulsamos tu negocio con branding, redes sociales y estrategias digitales que convierten audiencias en clientes reales.",
      },
      studio: {
        tagline: "Diseño · Invitaciones · Presentaciones",
        desc: "Diseño creativo que conecta — invitaciones, presentaciones, flyers y menús que hacen destacar tu proyecto.",
      },
      cta_primary:     "Solicitar cotización",
      cta_secondary:   "Ver precios",
      stat_projects:   "Proyectos",
      stat_responsive: "Responsivo",
      stat_support:    "Soporte",
    },
    about: {
      eyebrow_d: "Soluciones empresariales",
      eyebrow_s: "Quiénes somos",
      title_d:   "North\nDigital",
      title_s:   "North\nStudio",
      /* DIGITAL — tono corporativo */
      desc1_d: "Somos el aliado digital de comercios, empresas y marcas que buscan crecer. Desarrollamos presencia web, identidad visual y estrategias digitales con enfoque en resultados medibles.",
      desc2_d: "Desde una landing page hasta un sistema de automatización completo — llevamos tu operación al siguiente nivel con tecnología a medida y atención directa.",
      values_d: ["Tecnología", "Escalabilidad", "Resultados", "Estrategia"],
      /* STUDIO — tono cálido/personal */
      desc1_s: "Somos el equipo creativo detrás de tus momentos más especiales. Diseñamos invitaciones digitales, menús, flyers y presentaciones para personas, fiestas y restaurantes con sello propio.",
      desc2_s: "Cada diseño cuenta una historia — la tuya. Trabajamos contigo para que cada pieza refleje exactamente la vibra que buscas: elegante, divertida, moderna o íntima.",
      values_s: ["Diseño", "Creatividad", "Personalización", "Calidez"],
      founder_label: "Fundador",
      founder_name:  "Emiliano Landa Estévez",
      founder_role:  "Fundador & Director",
      founder_bio_d: "Ingeniero biomédico en formación con experiencia en desarrollo de software, TICs y automatización. Construye soluciones digitales precisas y escalables para empresas y comercios — sin importar su tamaño.",
      founder_bio_s: "Ingeniero biomédico en formación con un ojo creativo afilado. Combina pensamiento analítico y sensibilidad de diseño para crear piezas que emocionan — desde una invitación de boda hasta el menú de tu restaurante.",
      badges: ["Ing. Biomédica · UV", "B2–C1 English", "Software Dev", "Automatización"],
    },
    pricing: {
      eyebrow_d: "North Digital",
      eyebrow_s: "North Studio",
      title:     "Precios",
      cta:       "Cotizar",
      note_d:    "* Precios expresados en MXN. Los precios en USD aplican para clientes en mercados internacionales.",
      note_s:    "* Precios expresados en MXN. Los paquetes tienen descuento integrado vs comprar por pieza.",
      from:      "Desde",
    },
    contact: {
      eyebrow:     "Hablemos",
      title:       "¿Tienes un\nproyecto?",
      desc:        "Cuéntanos qué necesitas. Te respondemos en menos de 24 horas.",
      placeholder: "Describe tu proyecto, qué necesitas cotizar o cualquier duda que tengas...",
      whatsapp:    "Enviar por WhatsApp",
      location:    "Coatepec, Veracruz · México",
    },
    footer: { rights: "Todos los derechos reservados" },
    wa_msg: {
      quote:   "¡Hola! Me gustaría solicitar una cotización.",
      pricing: "¡Hola! Me gustaría cotizar un servicio.",
      contact: "¡Hola! Me gustaría hablar sobre un proyecto.",
    },
  },
  US: {
    nav: { about: "about", pricing: "pricing", contact: "contact" },
    hero: {
      digital: {
        tagline: "Marketing · Branding · AI",
        desc: "We power your business with branding, social media, and digital strategies that turn audiences into real customers.",
      },
      studio: {
        tagline: "Design · Invitations · Presentations",
        desc: "Creative design that connects — invitations, presentations, flyers, and menus that make your project stand out.",
      },
      cta_primary:     "Request a quote",
      cta_secondary:   "See pricing",
      stat_projects:   "Projects",
      stat_responsive: "Responsive",
      stat_support:    "Support",
    },
    about: {
      eyebrow_d: "Business solutions",
      eyebrow_s: "Who we are",
      title_d:   "North\nDigital",
      title_s:   "North\nStudio",
      desc1_d: "We are the digital partner for businesses, brands, and companies looking to grow. We build web presence, visual identity, and digital strategies focused on measurable results.",
      desc2_d: "From a landing page to a full automation system — we take your operation to the next level with tailored technology and direct attention.",
      values_d: ["Technology", "Scalability", "Results", "Strategy"],
      desc1_s: "We are the creative team behind your most special moments. We design digital invitations, menus, flyers, and presentations for individuals, celebrations, and restaurants with a distinctive touch.",
      desc2_s: "Every design tells a story — yours. We work with you so each piece reflects exactly the vibe you're after: elegant, fun, modern, or intimate.",
      values_s: ["Design", "Creativity", "Personalization", "Warmth"],
      founder_label: "Founder",
      founder_name:  "Emiliano Landa Estévez",
      founder_role:  "Founder & Director",
      founder_bio_d: "Biomedical engineering student with experience in software development, ICTs, and automation. Builds precise, scalable digital solutions for businesses of all sizes.",
      founder_bio_s: "Biomedical engineering student with a sharp creative eye. Combines analytical thinking and design sensibility to create pieces that move people — from a wedding invitation to a restaurant menu.",
      badges: ["Biomed Eng · UV", "B2–C1 English", "Software Dev", "Automation"],
    },
    pricing: {
      eyebrow_d: "North Digital",
      eyebrow_s: "North Studio",
      title:     "Pricing",
      cta:       "Get a quote",
      note_d:    "* Prices in USD for international clients.",
      note_s:    "* Prices in USD. Bundles include built-in discounts vs individual pieces.",
      from:      "From",
    },
    contact: {
      eyebrow:     "Let's talk",
      title:       "Got a\nproject?",
      desc:        "Tell us what you need. We'll get back to you within 24 hours.",
      placeholder: "Describe your project, what you'd like to quote, or any questions you have...",
      whatsapp:    "Send via WhatsApp",
      location:    "Coatepec, Veracruz · Mexico",
    },
    footer: { rights: "All rights reserved" },
    wa_msg: {
      quote:   "Hi! I'd like to request a quote.",
      pricing: "Hi! I'd like to quote a service.",
      contact: "Hi! I'd like to talk about a project.",
    },
  },
};

/* ─── Pricing data ───────────────────────────────────────── */
type PriceRow     = { label_MX: string; label_US: string; mxn: string; usd: string };
type PriceSection = { title_MX: string; title_US: string; rows: PriceRow[]; icon: string };

const DIGITAL_SECTIONS: PriceSection[] = [
  {
    title_MX: "Desarrollo web", title_US: "Web development", icon: "🌐",
    rows: [
      { label_MX: "Landing page — sin fotos",                              label_US: "Landing page — no photos",                     mxn: "$1,499 MXN", usd: "$80 USD"  },
      { label_MX: "Landing page — con sesión fotográfica",                 label_US: "Landing page — with photo session",            mxn: "$1,999 MXN", usd: "$150 USD" },
      { label_MX: "Página web · catálogo 1–30 productos",                  label_US: "Website · catalog 1–30 products",              mxn: "$1,999 MXN", usd: "$280 USD" },
      { label_MX: "Página web · catálogo 31–60 productos",                 label_US: "Website · catalog 31–60 products",             mxn: "$3,499 MXN", usd: "$450 USD" },
      { label_MX: "Página web · catálogo 61–90 productos",                 label_US: "Website · catalog 61–90 products",             mxn: "$4,999 MXN", usd: "$650 USD" },
      { label_MX: "Página web · catálogo 90+ productos",                   label_US: "Website · catalog 90+ products",               mxn: "$5,999 MXN", usd: "$800 USD" },
      { label_MX: "+ Sesión fotográfica (1–2 hrs)",                        label_US: "+ Photo session (1–2 hrs)",                    mxn: "+$799 MXN",  usd: "+$60 USD" },
      { label_MX: "+ Dominio propio (.com / .mx)",                         label_US: "+ Custom domain (.com)",                       mxn: "+$299/año",  usd: "+$20/yr"  },
    ],
  },
  {
    title_MX: "Aplicaciones y automatización", title_US: "Apps & automation", icon: "⚙️",
    rows: [
      { label_MX: "Excel — hoja simple con fórmulas",                      label_US: "Excel — simple sheet with formulas",           mxn: "$799 MXN",   usd: "$100 USD" },
      { label_MX: "Excel — dashboard con reportes",                        label_US: "Excel — dashboard with reports",               mxn: "$1,499 MXN", usd: "$200 USD" },
      { label_MX: "Excel — sistema completo de inventario",                label_US: "Excel — full inventory system",                mxn: "$2,499 MXN", usd: "$350 USD" },
      { label_MX: "App de escritorio C# — básica",                        label_US: "C# desktop app — basic",                       mxn: "$2,999 MXN", usd: "$200 USD" },
      { label_MX: "App de escritorio C# — completa",                      label_US: "C# desktop app — full",                        mxn: "$3,999 MXN", usd: "$300 USD" },
    ],
  },
  {
    title_MX: "Diseño e identidad", title_US: "Design & identity", icon: "✦",
    rows: [
      { label_MX: "Identidad visual básica (logo + paleta + tipografía)",  label_US: "Basic visual identity (logo + palette + type)", mxn: "$1,199 MXN", usd: "$180 USD" },
      { label_MX: "+ Material para redes (3 plantillas)",                  label_US: "+ Social media templates (3 pieces)",           mxn: "+$499 MXN",  usd: "+$80 USD" },
    ],
  },
  {
    title_MX: "Suscripciones mensuales", title_US: "Monthly subscriptions", icon: "↺",
    rows: [
      { label_MX: "Mantenimiento web (actualizaciones + soporte)",         label_US: "Web maintenance (updates + support)",          mxn: "$399/mes",   usd: "$60/mo"   },
      { label_MX: "Redes sociales — 12 posts/mes",                        label_US: "Social media — 12 posts/month",                mxn: "$999/mes",   usd: "$150/mo"  },
      { label_MX: "Redes sociales + sesión fotográfica mensual",           label_US: "Social media + monthly photo session",         mxn: "$1,599/mes", usd: "$180/mo"  },
      { label_MX: "Plan completo (web + redes + foto)",                    label_US: "Full plan (web + social + photo)",             mxn: "$2,499/mes", usd: "$249/mo"  },
    ],
  },
];

const STUDIO_SECTIONS: PriceSection[] = [
  {
    title_MX: "Invitaciones digitales", title_US: "Digital invitations", icon: "✉",
    rows: [
      { label_MX: "Invitación estática — diseño sencillo",                 label_US: "Static invitation — simple design",            mxn: "$169 MXN",   usd: "$20 USD"  },
      { label_MX: "Invitación estática — diseño elaborado (2–3 pantallas)",label_US: "Static invitation — elaborate (2–3 screens)",  mxn: "$249 MXN",   usd: "$30 USD"  },
      { label_MX: "Invitación con animación básica",                       label_US: "Invitation with basic animation",              mxn: "$279 MXN",   usd: "$35 USD"  },
      { label_MX: "Invitación con video elaborado",                        label_US: "Invitation with elaborate video",              mxn: "$349 MXN",   usd: "$45 USD"  },
    ],
  },
  {
    title_MX: "Presentaciones", title_US: "Presentations", icon: "▣",
    rows: [
      { label_MX: "Hasta 10 diapositivas — sin movimiento",                label_US: "Up to 10 slides — no animation",               mxn: "$499 MXN",   usd: "$65 USD"  },
      { label_MX: "Hasta 10 diapositivas — con movimiento",                label_US: "Up to 10 slides — animated",                   mxn: "$699 MXN",   usd: "$90 USD"  },
      { label_MX: "11–20 diapositivas — sin movimiento",                   label_US: "11–20 slides — no animation",                  mxn: "$799 MXN",   usd: "$110 USD" },
      { label_MX: "11–20 diapositivas — con movimiento",                   label_US: "11–20 slides — animated",                      mxn: "$999 MXN",   usd: "$135 USD" },
      { label_MX: "20+ diapositivas — con movimiento",                     label_US: "20+ slides — animated",                        mxn: "$1,199 MXN", usd: "$160 USD" },
    ],
  },
  {
    title_MX: "Flyers y redes sociales", title_US: "Flyers & social media", icon: "◈",
    rows: [
      { label_MX: "Post / flyer estático — pieza individual",              label_US: "Static post / flyer — single piece",           mxn: "$99 MXN",    usd: "$15 USD"  },
      { label_MX: "Post / flyer estático — paquete 5 piezas",             label_US: "Static post / flyer — 5-piece bundle",         mxn: "$399 MXN",   usd: "$55 USD"  },
      { label_MX: "Post / flyer estático — paquete 10 piezas",            label_US: "Static post / flyer — 10-piece bundle",        mxn: "$699 MXN",   usd: "$100 USD" },
      { label_MX: "Post animado — pieza individual",                       label_US: "Animated post — single piece",                 mxn: "$199 MXN",   usd: "$28 USD"  },
      { label_MX: "Post animado — paquete 5 piezas",                      label_US: "Animated post — 5-piece bundle",               mxn: "$799 MXN",   usd: "$110 USD" },
      { label_MX: "Post animado — paquete 10 piezas",                     label_US: "Animated post — 10-piece bundle",              mxn: "$1,499 MXN", usd: "$200 USD" },
    ],
  },
  {
    title_MX: "Menú digital para restaurante", title_US: "Digital restaurant menu", icon: "◉",
    rows: [
      { label_MX: "Hasta 20 platillos",                                    label_US: "Up to 20 dishes",                              mxn: "$399 MXN",   usd: "$55 USD"  },
      { label_MX: "21–50 platillos",                                       label_US: "21–50 dishes",                                 mxn: "$699 MXN",   usd: "$95 USD"  },
    ],
  },
];

/* ─── Design tokens ──────────────────────────────────────── */
const GOLD        = "#B8912A";
const GOLD_BORDER = "rgba(184,145,42,0.25)";

/* ─── Global styles injected once ───────────────────────── */
const GLOBAL_CSS = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: #000; -webkit-font-smoothing: antialiased; }

  @media (max-width: 480px) { .nav-links { display: none !important; } }
  @media (max-width: 768px) {
    .nav-links    { display: none !important; }
    .nav-hamburger { display: flex !important; }
    .nosotros-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .contact-grid  { grid-template-columns: 1fr !important; gap: 40px !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }

  /* --- scroll indicator bounce --- */
  @keyframes scrollBounce {
    0%,100% { opacity: 0.22; transform: translateX(-50%) translateY(0px); }
    55%      { opacity: 0.50; transform: translateX(-50%) translateY(7px); }
  }

  /* --- Fade in up (used on scroll-reveal) --- */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeLeft {
    from { opacity: 0; transform: translateX(-32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeRight {
    from { opacity: 0; transform: translateX(32px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* --- Mode crossfade --- */
  @keyframes modeFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .mode-content {
    animation: modeFadeIn 0.45s cubic-bezier(0.22,1,0.36,1) both;
  }

  /* --- Nav link fade in --- */
  @keyframes navIn {
    from { opacity: 0; transform: translateY(-5px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* --- Price row hover --- */
  .price-row { transition: background 0.18s; }
  .price-row:hover { background: rgba(0,0,0,0.025) !important; }
  .price-row-gold:hover { background: rgba(184,145,42,0.04) !important; }

  /* --- Scroll-reveal helpers --- */
  .reveal            { opacity: 0; }
  .reveal.visible    { animation: fadeUp   0.75s cubic-bezier(0.22,1,0.36,1) forwards; }
  .reveal-l.visible  { animation: fadeLeft  0.75s cubic-bezier(0.22,1,0.36,1) forwards; }
  .reveal-r.visible  { animation: fadeRight 0.75s cubic-bezier(0.22,1,0.36,1) forwards; }
  .reveal-l          { opacity: 0; }
  .reveal-r          { opacity: 0; }

  /* --- Textarea --- */
  .msg-textarea { resize: vertical; }
  .msg-textarea:focus { outline: none; }
  .msg-textarea-d:focus { border-color: rgba(255,255,255,0.3) !important; }
  .msg-textarea-s:focus { border-color: ${GOLD} !important; box-shadow: 0 0 0 3px rgba(184,145,42,0.1); }
  .msg-textarea-d::placeholder { color: rgba(255,255,255,0.2); }
  .msg-textarea-s::placeholder { color: rgba(184,145,42,0.35); }
`;

/* ─── useReveal — robust IntersectionObserver ────────────── */
function useReveal(direction: "up" | "left" | "right" = "up", delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cls = direction === "left" ? "reveal-l" : direction === "right" ? "reveal-r" : "reveal";
    el.classList.add(cls);
    const show = () => {
      el.style.animationDelay = `${delay}s`;
      el.classList.add("visible");
    };
    // Already in view on load?
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) { show(); return; }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { show(); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

/* ─── Particles ─────────────────────────────────────────── */
function Particles({ color }: { color: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.6,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color + "55"; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 115) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = color + Math.round((1 - d / 115) * 36).toString(16).padStart(2, "0");
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [color]);
  return (
    <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />
  );
}

/* ─── Region Switcher ────────────────────────────────────── */
function RegionSwitcher({ region, setRegion, mode, shown }: {
  region: Region; setRegion: (r: Region) => void; mode: Mode; shown: boolean;
}) {
  const d = mode === "digital";
  const FLAGS: Record<Region, string> = { MX: "/flag_mx.jpg", US: "/flag_us.jpg" };
  return (
    <div style={{
      position: "fixed", top: 16, left: 16, zIndex: 100,
      display: "flex", alignItems: "center",
      background: d ? "rgba(0,0,0,0.7)" : "rgba(255,253,248,0.92)",
      border: d ? "1px solid rgba(255,255,255,0.12)" : `1px solid ${GOLD_BORDER}`,
      borderRadius: 100, padding: "4px 5px",
      backdropFilter: "blur(16px)",
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : "translateY(-10px)",
      transition: "opacity 0.45s ease, transform 0.45s ease",
      pointerEvents: shown ? "auto" : "none",
    }}>
      {(["MX", "US"] as Region[]).map(r => (
        <button key={r} onClick={() => setRegion(r)} style={{
          fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: region === r ? 700 : 400,
          letterSpacing: "0.16em", textTransform: "uppercase",
          padding: "5px 12px", borderRadius: 100, border: "none", cursor: "pointer",
          background: region === r ? (d ? "#fff" : GOLD) : "transparent",
          color: region === r ? (d ? "#000" : "#fff") : (d ? "rgba(255,255,255,0.38)" : "rgba(184,145,42,0.6)"),
          display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
        }}>
          <Image src={FLAGS[r]} alt={r} width={18} height={13}
            style={{ borderRadius: 2, objectFit: "cover", opacity: region === r ? 1 : 0.4 }} />
          {r}
        </button>
      ))}
    </div>
  );
}

/* ─── Nav ────────────────────────────────────────────────── */
function Nav({ mode, setMode, scrollTo, region, scrollY }: {
  mode: Mode; setMode: (m: Mode) => void; scrollTo: (id: string) => void; region: Region; scrollY: number;
}) {
  const scrolled   = scrollY > 50;
  const linksShown = scrollY > (typeof window !== "undefined" ? window.innerHeight * 0.5 : 400);
  const [mobileOpen, setMobileOpen] = useState(false);
  const d = mode === "digital";
  const t = T[region].nav;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? (d ? "rgba(0,0,0,0.93)" : "rgba(255,255,255,0.95)") : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? (d ? "1px solid rgba(255,255,255,0.06)" : `1px solid ${GOLD_BORDER}`) : "none",
      transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px 24px 14px 108px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <Image
            src="/north_digital_logo.png" alt="North"
            width={46} height={46}
            style={{ objectFit: "contain", transition: "transform 0.35s", transform: scrolled ? "scale(0.85)" : "scale(1)" }}
          />
          <span style={{
            color: d ? "#fff" : "#0f0d08", fontFamily: "'Inter',sans-serif",
            fontWeight: 800, fontSize: 17, letterSpacing: "0.14em",
            opacity: scrolled ? 1 : 0.8, transition: "opacity 0.35s",
          }}>NORTH</span>
        </div>

        {/* Desktop links — hidden in hero */}
        <div className="nav-links" style={{
          display: "flex", alignItems: "center", gap: 32,
          opacity: linksShown ? 1 : 0,
          pointerEvents: linksShown ? "auto" : "none",
          transition: "opacity 0.5s ease",
        }}>
          {[t.about, t.pricing, t.contact].map((s, i) => (
            <button key={s} onClick={() => scrollTo(["nosotros","precios","contacto"][i])}
              style={{
                fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.2em",
                textTransform: "uppercase", background: "none", border: "none", cursor: "pointer",
                color: d ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)",
                transition: "color 0.2s, opacity 0.2s",
                animation: linksShown ? `navIn 0.4s ease ${i * 0.07}s both` : "none",
              }}
              onMouseOver={e => (e.currentTarget.style.color = d ? "#fff" : "#0f0d08")}
              onMouseOut={e => (e.currentTarget.style.color = d ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)")}>
              {s}
            </button>
          ))}
        </div>

        {/* Mode pill */}
        <div style={{
          display: "flex", padding: "5px", borderRadius: 100,
          background: d ? "rgba(255,255,255,0.07)" : "rgba(184,145,42,0.07)",
          border: d ? "1px solid rgba(255,255,255,0.12)" : `1px solid ${GOLD_BORDER}`,
        }}>
          {(["digital","studio"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              fontFamily: "'Inter',sans-serif", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "8px 22px", borderRadius: 100, border: "none", cursor: "pointer",
              background: mode === m ? (m === "digital" ? "#fff" : GOLD) : "transparent",
              color: mode === m ? (m === "digital" ? "#000" : "#fff") : (d ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)"),
              fontWeight: mode === m ? 800 : 400,
              transition: "background 0.3s, color 0.3s, font-weight 0.1s",
            }}>{m === "digital" ? "Digital" : "Studio"}</button>
          ))}
        </div>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setMobileOpen(o => !o)}
          style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 }}>
          {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, borderRadius: 2, background: d ? "#fff" : "#0a0a0a" }} />)}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div style={{
          background: d ? "rgba(0,0,0,0.97)" : "rgba(255,255,255,0.97)",
          borderTop: d ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
          padding: "24px 24px 32px", backdropFilter: "blur(20px)",
          animation: "modeFadeIn 0.3s ease",
        }}>
          <div style={{ display: "flex", borderRadius: 16, overflow: "hidden", border: d ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)", marginBottom: 24 }}>
            {(["digital","studio"] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setMobileOpen(false); }} style={{
                flex: 1, fontFamily: "'Inter',sans-serif", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase",
                padding: "16px",
                background: mode === m ? (d ? "#fff" : "#0a0a0a") : "transparent",
                color: mode === m ? (d ? "#000" : "#fff") : (d ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.38)"),
                fontWeight: mode === m ? 800 : 400, border: "none", cursor: "pointer",
              }}>{m === "digital" ? "Digital" : "Studio"}</button>
            ))}
          </div>
          {[t.about, t.pricing, t.contact].map((s, i) => (
            <button key={s} onClick={() => { scrollTo(["nosotros","precios","contacto"][i]); setMobileOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "left", padding: "14px 0",
                color: d ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)",
                fontFamily: "'Inter',sans-serif", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
                background: "none", border: "none", cursor: "pointer",
                borderBottom: d ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
              }}>{s}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */
function Hero({ mode, scrollTo, region }: { mode: Mode; scrollTo: (id: string) => void; region: Region }) {
  const d = mode === "digital";
  const [vis, setVis] = useState(false);
  /* Re-trigger fade when mode changes */
  useEffect(() => {
    setVis(false);
    const t = setTimeout(() => setVis(true), 80);
    return () => clearTimeout(t);
  }, [mode]);

  const t  = T[region];
  const ht = d ? t.hero.digital : t.hero.studio;

  return (
    <section style={{
      position: "relative", minHeight: "100svh",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden", background: d ? "#000" : "#fff",
      transition: "background 0.6s ease",
    }}>
      <Particles color={d ? "#ffffff" : GOLD} />

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: d
          ? "radial-gradient(ellipse 55% 45% at 50% 55%, rgba(255,255,255,0.032) 0%, transparent 70%)"
          : `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(184,145,42,0.055) 0%, transparent 70%)`,
        transition: "background 0.6s",
      }} />

      {/* Watermark word */}
      <div style={{
        position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)",
        fontFamily: "'Inter',sans-serif", fontWeight: 900,
        fontSize: "clamp(60px, 18vw, 220px)",
        letterSpacing: "-0.04em", textTransform: "uppercase", whiteSpace: "nowrap",
        color: d ? "rgba(255,255,255,0.028)" : "rgba(184,145,42,0.05)",
        pointerEvents: "none", userSelect: "none", zIndex: 0,
        transition: "color 0.6s",
      }}>{d ? "DIGITAL" : "STUDIO"}</div>

      {/* Main content */}
      <div style={{
        position: "relative", zIndex: 10, width: "100%", maxWidth: 700, margin: "0 auto",
        padding: "0 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 28, position: "relative" }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: d ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
            filter: "blur(30px)", transform: "scale(1.7)",
          }} />
          <Image src="/north_digital_logo.png" alt="North Digital" width={120} height={120}
            style={{ objectFit: "contain", position: "relative" }} />
        </div>

        {/* Wordmark */}
        <div style={{ marginBottom: 12, display: "flex", alignItems: "baseline", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: "clamp(40px,8vw,88px)", color: d ? "#fff" : "#0f0d08", letterSpacing: "-0.03em", lineHeight: 1 }}>NORTH</span>
          <span style={{
            fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: "clamp(40px,8vw,88px)",
            color: d ? "rgba(255,255,255,0.22)" : "rgba(184,145,42,0.4)",
            letterSpacing: "-0.02em", lineHeight: 1,
            transition: "color 0.5s",
          }}>{d ? "DIGITAL" : "STUDIO"}</span>
        </div>

        <p style={{
          fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.45em", textTransform: "uppercase",
          color: d ? "rgba(255,255,255,0.33)" : "rgba(184,145,42,0.7)", marginBottom: 26,
          transition: "color 0.4s",
        }}>{ht.tagline}</p>

        <p style={{
          fontFamily: "'Inter',sans-serif", fontSize: 15, lineHeight: 1.75, fontWeight: 300, maxWidth: 520,
          color: d ? "rgba(255,255,255,0.46)" : "rgba(15,13,8,0.5)", marginBottom: 40,
        }}>{ht.desc}</p>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.wa_msg.quote)}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "15px 36px", borderRadius: 100,
              background: d ? "#fff" : GOLD, color: d ? "#000" : "#fff",
              textDecoration: "none", display: "inline-block",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = d ? "0 8px 28px rgba(255,255,255,0.14)" : `0 8px 28px rgba(184,145,42,0.32)`; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
            {t.hero.cta_primary}
          </a>
          <button onClick={() => scrollTo("precios")} style={{
            fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "15px 36px", borderRadius: 100, background: "transparent",
            border: d ? "1px solid rgba(255,255,255,0.22)" : `1px solid ${GOLD_BORDER}`,
            color: d ? "rgba(255,255,255,0.7)" : "rgba(184,145,42,0.8)", cursor: "pointer",
            transition: "transform 0.2s, opacity 0.2s",
          }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.opacity = "1"; }}>
            {t.hero.cta_secondary}
          </button>
        </div>

        {/* Stats */}
        <div style={{
          marginTop: 52, paddingTop: 36, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24,
          width: "100%", maxWidth: 360,
          borderTop: d ? "1px solid rgba(255,255,255,0.07)" : `1px solid rgba(184,145,42,0.2)`,
        }}>
          {[{ n:"10+", l: t.hero.stat_projects }, { n:"100%", l: t.hero.stat_responsive }, { n:"24/7", l: t.hero.stat_support }].map((s, i) => (
            <div key={s.l} style={{
              textAlign: "center",
              opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${0.28 + i * 0.1}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${0.28 + i * 0.1}s`,
            }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 26, letterSpacing: "-0.02em", color: d ? "#fff" : "#0f0d08" }}>{s.n}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: d ? "rgba(255,255,255,0.28)" : "rgba(184,145,42,0.58)", marginTop: 4 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 38, left: "50%", zIndex: 10, animation: "scrollBounce 2.4s ease-in-out infinite", display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
        <div style={{ width: 1, height: 38, background: d ? "rgba(255,255,255,0.3)" : `rgba(184,145,42,0.5)` }} />
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 8, letterSpacing: "0.55em", textTransform: "uppercase", color: d ? "rgba(255,255,255,0.3)" : `rgba(184,145,42,0.5)` }}>scroll</span>
      </div>
    </section>
  );
}

/* ─── ModeBanner — animated split ───────────────────────── */
function ModeBanner({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const d   = mode === "digital";
  const ref = useReveal("up", 0);

  return (
    <div ref={ref} style={{ display: "flex", alignItems: "stretch" }}>

      {/* Digital */}
      <button onClick={() => setMode("digital")} style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "52px 32px", border: "none", cursor: "pointer", gap: 10, position: "relative", overflow: "hidden",
        background: d ? "#0a0a0a" : "#f0f0f0",
        transition: "background 0.55s ease",
      }}
        onMouseOver={e => { if (!d) (e.currentTarget as HTMLElement).style.background = "#e8e8e8"; }}
        onMouseOut={e => { if (!d) (e.currentTarget as HTMLElement).style.background = "#f0f0f0"; }}
      >
        {d && <span style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 36, height: 3, background: "#fff", borderRadius: 2 }} />}
        <span style={{
          fontFamily: "'Inter',sans-serif", fontWeight: 900,
          fontSize: "clamp(28px,4vw,56px)", letterSpacing: "-0.03em", textTransform: "uppercase",
          color: d ? "#fff" : "rgba(0,0,0,0.18)",
          transition: "color 0.55s ease",
        }}>Digital</span>
        <span style={{
          fontFamily: "'Inter',sans-serif", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase",
          color: d ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.13)",
          transition: "color 0.55s ease",
        }}>Marketing · Branding · IA</span>
        {!d && <span style={{ marginTop: 6, fontFamily: "'Inter',sans-serif", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(0,0,0,0.28)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 100, padding: "5px 14px" }}>Explorar →</span>}
      </button>

      <div style={{ width: 1, background: d ? "rgba(255,255,255,0.05)" : GOLD_BORDER, flexShrink: 0 }} />

      {/* Studio */}
      <button onClick={() => setMode("studio")} style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "52px 32px", border: "none", cursor: "pointer", gap: 10, position: "relative", overflow: "hidden",
        background: !d ? "#fff" : "#fdfaf3",
        transition: "background 0.55s ease",
      }}
        onMouseOver={e => { if (d) (e.currentTarget as HTMLElement).style.background = "#fff6e2"; }}
        onMouseOut={e => { if (d) (e.currentTarget as HTMLElement).style.background = "#fdfaf3"; }}
      >
        {/* Gold shimmer top */}
        <span style={{ position: "absolute", top: 0, left: "25%", right: "25%", height: 1, background: `linear-gradient(90deg,transparent,${GOLD},transparent)`, opacity: 0.5 }} />
        {!d && <span style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 36, height: 3, background: GOLD, borderRadius: 2 }} />}
        <span style={{
          fontFamily: "'Inter',sans-serif", fontWeight: 900,
          fontSize: "clamp(28px,4vw,56px)", letterSpacing: "-0.03em", textTransform: "uppercase",
          color: !d ? GOLD : "rgba(184,145,42,0.45)",
          transition: "color 0.55s ease",
        }}>Studio</span>
        <span style={{
          fontFamily: "'Inter',sans-serif", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase",
          color: !d ? "rgba(184,145,42,0.5)" : "rgba(184,145,42,0.25)",
          transition: "color 0.55s ease",
        }}>Diseño · Invitaciones · Arte</span>
        {d && <span style={{ marginTop: 6, fontFamily: "'Inter',sans-serif", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: `rgba(184,145,42,0.5)`, border: `1px solid ${GOLD_BORDER}`, borderRadius: 100, padding: "5px 14px" }}>Explorar →</span>}
      </button>
    </div>
  );
}

/* ─── Nosotros ────────────────────────────────────────────── */
function Nosotros({ mode, region }: { mode: Mode; region: Region }) {
  const d      = mode === "digital";
  const bg     = d ? "#0a0a0a" : "#fff";
  const text   = d ? "#fff" : "#0f0d08";
  const muted  = d ? "rgba(255,255,255,0.42)" : "rgba(15,13,8,0.46)";
  const border = d ? "rgba(255,255,255,0.07)" : GOLD_BORDER;
  const ta     = T[region].about;

  /* Per-mode content */
  const eyebrow = d ? ta.eyebrow_d : ta.eyebrow_s;
  const title   = d ? ta.title_d : ta.title_s;
  const desc1   = d ? ta.desc1_d : ta.desc1_s;
  const desc2   = d ? ta.desc2_d : ta.desc2_s;
  const values  = d ? ta.values_d : ta.values_s;
  const bio     = d ? ta.founder_bio_d : ta.founder_bio_s;

  const leftRef  = useReveal("left",  0);
  const rightRef = useReveal("right", 0.12);

  return (
    <section id="nosotros" style={{ background: bg, borderTop: `1px solid ${border}`, transition: "background 0.5s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px", display: "grid" }}
        className="nosotros-grid"
        /* inline fallback for non-SSR */
        // eslint-disable-next-line react/no-unknown-property
      >
        {/* Left col */}
        <div ref={leftRef}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", color: muted, marginBottom: 20 }}>
            <span key={`ey-${mode}`} className="mode-content">{eyebrow}</span>
          </p>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: "clamp(40px,5vw,60px)", letterSpacing: "-0.03em", lineHeight: 1.05, color: text, marginBottom: 28, textTransform: "uppercase", whiteSpace: "pre-line" }}>
            <span key={`ti-${mode}`} className="mode-content">{title}</span>
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 1.82, fontWeight: 300, color: muted, maxWidth: 420, marginBottom: 16 }}>
            <span key={`d1-${mode}`} className="mode-content">{desc1}</span>
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 1.82, fontWeight: 300, color: muted, maxWidth: 420, marginBottom: 32 }}>
            <span key={`d2-${mode}`} className="mode-content">{desc2}</span>
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {values.map((v, i) => (
              <span key={`${v}-${mode}`} className="mode-content" style={{
                fontFamily: "'Inter',sans-serif", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase",
                padding: "7px 14px", borderRadius: 100, border: `1px solid ${border}`, color: muted,
                animationDelay: `${0.05 + i * 0.05}s`,
              }}>{v}</span>
            ))}
          </div>
        </div>

        {/* Right col — founder card */}
        <div ref={rightRef} style={{ background: d ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)", border: `1px solid ${border}`, borderRadius: 24, padding: 36 }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", color: muted, marginBottom: 24 }}>{ta.founder_label}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
            <div style={{ width: 76, height: 76, borderRadius: "50%", overflow: "hidden", border: `2px solid ${border}`, flexShrink: 0 }}>
              <Image src="/foto_emiliano.jpg" alt={ta.founder_name} width={76} height={76}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, color: text, lineHeight: 1.2 }}>{ta.founder_name}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: muted, marginTop: 5 }}>{ta.founder_role}</p>
            </div>
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, lineHeight: 1.82, fontWeight: 300, color: muted, marginBottom: 24 }}>
            <span key={`bio-${mode}`} className="mode-content">{bio}</span>
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ta.badges.map(b => (
              <span key={b} style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 100, border: `1px solid ${border}`, color: muted }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Grid layout style */}
      <style>{`
        .nosotros-grid {
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .nosotros-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </section>
  );
}

/* ─── Price card ─────────────────────────────────────────── */
function PriceSectionCard({ section, d, region, delay }: { section: PriceSection; d: boolean; region: Region; delay: number }) {
  const [expanded, setExpanded] = useState(true);
  const ref    = useReveal("up", delay);
  const border = d ? "rgba(0,0,0,0.07)"   : GOLD_BORDER;
  const text   = d ? "#0a0a0a"             : "#0f0d08";
  const muted  = d ? "rgba(0,0,0,0.38)"   : "rgba(15,13,8,0.4)";
  const accent = d ? "rgba(0,0,0,0.022)"  : "rgba(184,145,42,0.04)";
  const rows   = section.rows.filter(r => region === "US" ? r.usd !== "—" : true);
  const first  = region === "MX" ? rows[0]?.mxn : rows[0]?.usd;
  const rowCls = d ? "price-row" : "price-row price-row-gold";

  return (
    <div ref={ref} style={{ border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
      <button onClick={() => setExpanded(e => !e)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12, padding: "18px 24px", background: accent, border: "none", cursor: "pointer", textAlign: "left",
        transition: "background 0.18s",
      }}
        onMouseOver={e => (e.currentTarget as HTMLElement).style.background = d ? "rgba(0,0,0,0.05)" : "rgba(184,145,42,0.07)"}
        onMouseOut={e => (e.currentTarget as HTMLElement).style.background = accent}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16 }}>{section.icon}</span>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: text }}>
            {region === "MX" ? section.title_MX : section.title_US}
          </span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {first && !expanded && <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: muted }}>{T[region].pricing.from} {first}</span>}
          <span style={{ color: muted, fontSize: 14, display: "inline-block", transition: "transform 0.3s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
        </div>
      </button>
      {expanded && rows.map((r, i) => (
        <div key={i} className={rowCls} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16, padding: "13px 24px", borderTop: `1px solid ${border}`,
        }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 300, color: muted, flex: 1 }}>
            {region === "MX" ? r.label_MX : r.label_US}
          </p>
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 14, color: text, flexShrink: 0 }}>
            {region === "MX" ? r.mxn : r.usd}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Precios ─────────────────────────────────────────────── */
function Precios({ mode, region }: { mode: Mode; region: Region }) {
  const d        = mode === "digital";
  const text     = d ? "#0a0a0a" : "#0f0d08";
  const muted    = d ? "rgba(0,0,0,0.4)" : "rgba(15,13,8,0.4)";
  const border   = d ? "rgba(0,0,0,0.07)" : GOLD_BORDER;
  const t        = T[region].pricing;
  const sections = d ? DIGITAL_SECTIONS : STUDIO_SECTIONS;
  const headRef  = useReveal("up", 0);

  return (
    <section id="precios" style={{ background: "#fff", borderTop: `1px solid ${border}` }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "100px 24px" }}>
        <div ref={headRef} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52, flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", color: muted, marginBottom: 12 }}>
              {d ? t.eyebrow_d : t.eyebrow_s}
            </p>
            <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: "clamp(36px,5vw,56px)", letterSpacing: "-0.03em", textTransform: "uppercase", color: text }}>{t.title}</h2>
          </div>
          <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(T[region].wa_msg.pricing)}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "12px 26px", borderRadius: 100, background: d ? "#0a0a0a" : GOLD, color: "#fff",
              textDecoration: "none", display: "inline-block", transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.opacity = "0.78"; (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
            {t.cta}
          </a>
        </div>
        {sections.map((s, i) => (
          <PriceSectionCard key={`${s.title_MX}-${mode}`} section={s} d={d} region={region} delay={i * 0.06} />
        ))}
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: muted, marginTop: 24, lineHeight: 1.7, fontWeight: 300 }}>
          {d ? t.note_d : t.note_s}
        </p>
      </div>
    </section>
  );
}

/* ─── Contacto ────────────────────────────────────────────── */
function Contacto({ mode, region }: { mode: Mode; region: Region }) {
  const d       = mode === "digital";
  const bg      = d ? "#0a0a0a" : "#fff";
  const text    = d ? "#fff" : "#0f0d08";
  const muted   = d ? "rgba(255,255,255,0.4)" : "rgba(15,13,8,0.42)";
  const border  = d ? "rgba(255,255,255,0.07)" : GOLD_BORDER;
  const inputBg = d ? "rgba(255,255,255,0.04)" : "rgba(184,145,42,0.04)";
  const email   = d ? EMAIL_D : EMAIL_S;
  const t       = T[region].contact;
  const [msg, setMsg] = useState("");

  const leftRef  = useReveal("left", 0);
  const rightRef = useReveal("right", 0.1);

  const waFull = msg.trim()
    ? `${T[region].wa_msg.contact}\n\n${msg.trim()}`
    : T[region].wa_msg.contact;

  return (
    <section id="contacto" style={{ background: bg, borderTop: `1px solid ${border}`, transition: "background 0.5s" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ display: "grid" }} className="contact-grid">

          {/* Left */}
          <div ref={leftRef}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase", color: muted, marginBottom: 20 }}>{t.eyebrow}</p>
            <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: "clamp(38px,5.5vw,72px)", letterSpacing: "-0.03em", textTransform: "uppercase", color: text, lineHeight: 1.05, marginBottom: 24, whiteSpace: "pre-line" }}>{t.title}</h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, lineHeight: 1.8, fontWeight: 300, color: muted, maxWidth: 380, marginBottom: 40 }}>{t.desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, fontFamily: "'Inter',sans-serif", fontSize: 11, color: muted }}>
              <span style={{ letterSpacing: "0.14em", textTransform: "uppercase" }}>{t.location}</span>
              <a href={`mailto:${email}`} style={{ color: muted, textDecoration: "none" }}>{email}</a>
              <a href={`https://www.instagram.com/${IG_USER}`} target="_blank" rel="noopener noreferrer" style={{ color: muted, textDecoration: "none", letterSpacing: "0.14em", textTransform: "uppercase" }}>@{IG_USER}</a>
            </div>
          </div>

          {/* Right */}
          <div ref={rightRef}>
            <div style={{ background: d ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${border}`, borderRadius: 24, padding: 32 }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: muted, marginBottom: 20 }}>
                {region === "MX" ? "Tu mensaje" : "Your message"}
              </p>
              <textarea
                value={msg} onChange={e => setMsg(e.target.value)} placeholder={t.placeholder} rows={6}
                className={`msg-textarea ${d ? "msg-textarea-d" : "msg-textarea-s"}`}
                style={{
                  width: "100%", fontFamily: "'Inter',sans-serif", fontSize: 13, lineHeight: 1.7, fontWeight: 300,
                  color: text, background: inputBg, border: `1px solid ${border}`, borderRadius: 14, padding: "16px 18px",
                  boxSizing: "border-box", transition: "border-color 0.2s",
                }}
              />
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waFull)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                    padding: "16px 28px", borderRadius: 100, background: "#25d366", color: "#fff",
                    textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    transition: "opacity 0.2s, transform 0.2s",
                  }}
                  onMouseOver={e => { (e.currentTarget as HTMLElement).style.opacity = "0.86"; (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
                  onMouseOut={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t.whatsapp}
                </a>
                <a href={`mailto:${email}?body=${encodeURIComponent(msg)}`}
                  style={{
                    fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.12em",
                    padding: "14px 28px", borderRadius: 100, border: `1px solid ${border}`,
                    color: muted, textDecoration: "none", textAlign: "center", transition: "opacity 0.2s",
                  }}
                  onMouseOver={e => (e.currentTarget as HTMLElement).style.opacity = "0.65"}
                  onMouseOut={e => (e.currentTarget as HTMLElement).style.opacity = "1"}>
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .contact-grid { grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; gap: 40px; } }
      `}</style>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */
function Footer({ mode, region }: { mode: Mode; region: Region }) {
  const d    = mode === "digital";
  const text = d ? "rgba(255,255,255,0.18)" : "rgba(184,145,42,0.5)";
  const bdr  = d ? "rgba(255,255,255,0.05)" : GOLD_BORDER;

  return (
    <footer style={{ background: d ? "#000" : "#fff", borderTop: `1px solid ${bdr}`, padding: "28px 24px", transition: "background 0.5s" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, fontFamily: "'Inter',sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: text }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image src="/north_digital_logo.png" alt="North" width={24} height={24} style={{ objectFit: "contain", opacity: 0.22 }} />
          <span>North {d ? "Digital" : "Studio"}</span>
        </div>
        <span>© {new Date().getFullYear()} · {T[region].footer.rights}</span>
        <a href={`https://www.instagram.com/${IG_USER}`} target="_blank" rel="noopener noreferrer" style={{ color: text, textDecoration: "none" }}>Instagram</a>
      </div>
    </footer>
  );
}

/* ─── Root ───────────────────────────────────────────────── */
export default function Home() {
  const [mode,   setMode]   = useState<Mode>("digital");
  const [region, setRegion] = useState<Region>("MX");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const navScrolled = scrollY > 50;

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <RegionSwitcher region={region} setRegion={setRegion} mode={mode} shown={navScrolled} />
      <Nav mode={mode} setMode={setMode} scrollTo={scrollTo} region={region} scrollY={scrollY} />
      <Hero mode={mode} scrollTo={scrollTo} region={region} />
      <ModeBanner mode={mode} setMode={setMode} />
      <Nosotros mode={mode} region={region} />
      <Precios mode={mode} region={region} />
      <Contacto mode={mode} region={region} />
      <Footer mode={mode} region={region} />
    </>
  );
}
