import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  Compass,
  Globe2,
  Mail,
  Menu,
  Moon,
  Phone,
  Quote,
  Sparkles,
  Sun,
  Target,
  Users,
  X,
} from 'lucide-react';

import { about, axis, conferences, footer, home, pages, partners, site, team } from './content';

/* -------------------------------------------------------------------------- */
/*                                   motion                                   */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

const pageTransition = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.22, ease: 'easeIn' } },
};

const reveal = {
  variants: fadeUp,
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.2 },
};

/* -------------------------------------------------------------------------- */
/*                                    hooks                                   */
/* -------------------------------------------------------------------------- */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('gdf-theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('gdf-theme', theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0A0712' : '#F8F9FF');
  }, [theme]);

  return [theme, setTheme];
}

/**
 * Returns the routed page id for the current hash, or `null` when the hash is
 * an in-page anchor (e.g. "#experiences") that must not trigger navigation.
 */
function routeFromHash() {
  if (typeof window === 'undefined') return 'home';
  const raw = window.location.hash;
  if (!raw || raw === '#') return 'home';
  if (!raw.startsWith('#/')) return null;
  const id = raw.slice(2).replace(/\/$/, '');
  if (!id) return 'home';
  return pages.some((page) => page.id === id) ? id : 'home';
}

function useHashRoute() {
  const [pageId, setPageId] = useState(() => routeFromHash() ?? 'home');

  useEffect(() => {
    const onHashChange = () => {
      const next = routeFromHash();
      if (next === null) return; // in-page anchor: let the browser scroll
      setPageId(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return pageId;
}

/* -------------------------------------------------------------------------- */
/*                                  primitives                                */
/* -------------------------------------------------------------------------- */

function Emblem({ className = 'h-12 w-12', iconClassName = 'h-6 w-6' }) {
  return (
    <span
      className={`logo-emblem relative grid shrink-0 place-items-center overflow-hidden rounded-full border border-purple-200/70 bg-white/85 text-gdf-violet shadow-glow dark:border-purple-500/30 dark:bg-gdf-darkCard/85 dark:text-gdf-glow ${className}`}
    >
      <Globe2 className={`relative z-10 ${iconClassName}`} strokeWidth={1.9} />
    </span>
  );
}

function Eyebrow({ children, icon: Icon = Sparkles }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-white/75 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.26em] text-gdf-magenta shadow-sm backdrop-blur dark:border-purple-500/30 dark:bg-gdf-darkCard/70 dark:text-gdf-pink sm:text-xs">
      <Icon className="h-4 w-4" />
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, children, align = 'center', icon, as: Tag = 'h2' }) {
  const alignment = align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl';
  return (
    <motion.div {...reveal} className={alignment}>
      {eyebrow ? (
        <div className="mb-5">
          <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <Tag className="font-display text-3xl font-black uppercase leading-[1.04] tracking-[-0.045em] text-gdf-navy dark:text-white sm:text-4xl lg:text-5xl">
        {title}
      </Tag>
      {children ? (
        <p className="mt-6 text-base leading-8 text-gdf-muted dark:text-gdf-lavender sm:text-lg sm:leading-9">
          {children}
        </p>
      ) : null}
    </motion.div>
  );
}

function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.41v1.56h.05c.47-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.46v6.29h.01ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

/* -------------------------------------------------------------------------- */
/*                                   chrome                                   */
/* -------------------------------------------------------------------------- */

function AnnouncementBar() {
  const items = Array.from({ length: 6 });
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gdf-magenta via-gdf-violet to-gdf-magenta py-2.5 text-white dark:from-gdf-pink dark:via-gdf-glow dark:to-gdf-pink">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((_, index) => (
          <span
            key={index}
            className="flex items-center gap-10 text-[0.65rem] font-black uppercase tracking-[0.3em] sm:text-xs"
          >
            {home.announcement}
            <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Header({ theme, setTheme, pageId }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pageId]);

  return (
    <header className="sticky top-0 z-50 border-b border-purple-200/50 bg-white/75 shadow-sm shadow-purple-900/5 backdrop-blur-2xl transition-colors duration-500 dark:border-purple-500/20 dark:bg-[#0a0712]/75">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#/" className="group flex min-w-0 items-center gap-3" aria-label={site.title}>
          <Emblem className="h-11 w-11 transition-transform duration-500 group-hover:scale-105" iconClassName="h-5 w-5" />
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-black uppercase leading-tight tracking-[0.16em] text-gdf-navy dark:text-white sm:text-base">
              Global Diplomacy Forum
            </span>
            <span className="hidden text-[0.6rem] font-bold uppercase tracking-[0.3em] text-gdf-magenta dark:text-gdf-pink sm:block">
              GDF Oman
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-1 rounded-full border border-purple-200/40 bg-white/50 p-1 backdrop-blur-xl dark:border-purple-500/20 dark:bg-white/5 lg:flex"
          aria-label="Primary"
        >
          {pages.map((page) => {
            const active = page.id === pageId;
            return (
              <a
                key={page.id}
                href={page.hash}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition ${
                  active
                    ? 'bg-gradient-to-r from-gdf-magenta to-gdf-violet text-white shadow-glow-pink dark:from-gdf-pink dark:to-gdf-glow'
                    : 'text-gdf-muted hover:bg-purple-50 hover:text-gdf-magenta dark:text-gdf-lavender dark:hover:bg-purple-500/10 dark:hover:text-white'
                }`}
              >
                {page.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${site.email}`}
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-gdf-magenta to-gdf-violet px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-glow-pink transition duration-300 hover:-translate-y-0.5 dark:from-gdf-pink dark:to-gdf-glow xl:inline-flex"
          >
            Contact
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Light/Dark Mode Toggle Switch"
            aria-pressed={theme === 'dark'}
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-purple-200/70 bg-white/70 text-gdf-magenta shadow-inner shadow-purple-900/10 transition-colors duration-500 hover:text-gdf-violet dark:border-purple-500/40 dark:bg-gdf-darkCard/80 dark:text-gdf-lavender"
          >
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-purple-200/70 bg-white/70 text-gdf-navy transition dark:border-purple-500/40 dark:bg-gdf-darkCard/80 dark:text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-purple-200/50 bg-white/95 backdrop-blur-xl dark:border-purple-500/20 dark:bg-[#0a0712]/95 lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {pages.map((page) => (
                <a
                  key={page.id}
                  href={page.hash}
                  className={`rounded-2xl px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] transition ${
                    page.id === pageId
                      ? 'bg-gradient-to-r from-gdf-magenta to-gdf-violet text-white dark:from-gdf-pink dark:to-gdf-glow'
                      : 'text-gdf-muted hover:bg-purple-50 hover:text-gdf-magenta dark:text-gdf-lavender dark:hover:bg-purple-500/10'
                  }`}
                >
                  {page.label}
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-purple-200/70 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-gdf-magenta dark:border-purple-500/30 dark:text-gdf-pink"
              >
                {site.email}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-8 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-purple-200/50 bg-white/75 shadow-glow backdrop-blur-2xl dark:border-purple-500/25 dark:bg-gdf-darkCard/80">
        <div className="relative overflow-hidden bg-gradient-to-br from-gdf-magenta via-gdf-violet to-gdf-magenta px-6 py-12 text-white dark:from-gdf-pink dark:via-gdf-glow dark:to-gdf-pink sm:px-10 sm:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.26),transparent_30%),radial-gradient(circle_at_82%_0%,rgba(255,255,255,0.18),transparent_32%)]" />
          <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full border border-white/20" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-display text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              {footer.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="max-w-sm text-sm font-black uppercase tracking-[0.2em] text-white/90 sm:text-base">
              {footer.subheading}
            </p>
          </div>
        </div>

        <div className="grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Emblem className="h-12 w-12" iconClassName="h-5 w-5" />
              <p className="font-display text-xl font-black uppercase leading-tight tracking-[0.12em] text-gdf-navy dark:text-white sm:text-2xl">
                {site.name}
              </p>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-gdf-muted dark:text-gdf-lavender">
              {home.tagline}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-[0.65rem] font-black uppercase tracking-[0.26em] text-gdf-magenta dark:text-gdf-pink">
                {footer.labels.phone}
              </h3>
              <a
                href={site.phoneHref}
                className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-gdf-navy transition hover:text-gdf-magenta dark:text-white dark:hover:text-gdf-pink"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {site.phone}
              </a>
            </div>
            <div>
              <h3 className="text-[0.65rem] font-black uppercase tracking-[0.26em] text-gdf-magenta dark:text-gdf-pink">
                {footer.labels.email}
              </h3>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-flex items-center gap-2 break-all text-sm font-bold text-gdf-navy transition hover:text-gdf-magenta dark:text-white dark:hover:text-gdf-pink"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {site.email}
              </a>
            </div>
            <div>
              <h3 className="text-[0.65rem] font-black uppercase tracking-[0.26em] text-gdf-magenta dark:text-gdf-pink">
                {footer.labels.social}
              </h3>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="mt-3 grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gdf-magenta to-gdf-violet text-white shadow-glow-pink transition hover:-translate-y-1 dark:from-gdf-pink dark:to-gdf-glow"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-200/50 px-6 py-5 text-center text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gdf-muted dark:border-purple-500/20 dark:text-gdf-lavender sm:px-10">
          © {new Date().getFullYear()} {site.name} — {site.shortName} Oman
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*                              page 1 — home                                 */
/* -------------------------------------------------------------------------- */

function HeroVisual() {
  return (
    <motion.div variants={fadeUp} className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gdf-magenta/18 via-gdf-violet/18 to-transparent blur-2xl dark:from-gdf-pink/16 dark:via-gdf-glow/24" />
      <motion.div
        className="hero-orbit absolute inset-4 rounded-full border border-purple-200/60 shadow-glow dark:border-purple-500/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
      />
      <motion.div
        className="absolute left-2 top-14 h-24 w-24 rounded-full border border-fuchsia-200 bg-white/55 shadow-glow backdrop-blur dark:border-fuchsia-500/30 dark:bg-gdf-darkCard/65"
        animate={{ y: [0, -16, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-8 right-6 h-32 w-32 rounded-full border border-violet-200 bg-white/45 shadow-glow backdrop-blur dark:border-violet-500/30 dark:bg-gdf-darkCard/55"
        animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-14 top-4 h-14 w-14 rounded-full bg-gradient-to-br from-gdf-magenta to-gdf-violet shadow-glow-pink dark:from-gdf-pink dark:to-gdf-glow"
        animate={{ scale: [1, 1.16, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <div className="glass-card grid h-44 w-44 place-items-center rounded-full sm:h-56 sm:w-56">
          <Globe2 className="h-20 w-20 text-gdf-violet dark:text-gdf-glow sm:h-24 sm:w-24" strokeWidth={1.3} />
        </div>
      </div>
    </motion.div>
  );
}

function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden px-4 pb-12 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-16 lg:pt-20">
        <div className="absolute left-1/2 top-16 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gdf-violet/10 blur-3xl dark:bg-gdf-glow/10" />
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <motion.div variants={fadeUp}>
              <Eyebrow icon={Globe2}>{home.tagline}</Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-7 font-display text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-gdf-navy dark:text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              <span className="block">{home.headline[0]}</span>
              <span className="block bg-gradient-to-r from-gdf-magenta via-gdf-violet to-gdf-magenta bg-clip-text text-transparent dark:from-gdf-pink dark:via-gdf-glow dark:to-gdf-pink">
                {home.headline[1]}
              </span>
              <span className="block">{home.headline[2]}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-base leading-8 text-gdf-muted dark:text-gdf-lavender sm:text-lg sm:leading-9"
            >
              {home.intro}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#experiences"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gdf-magenta to-gdf-violet px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-glow-pink transition duration-300 hover:-translate-y-1 hover:shadow-glow dark:from-gdf-pink dark:to-gdf-glow sm:text-sm"
              >
                Virtual MUN Experiences
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#/about"
                className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-white/70 px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-gdf-navy shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gdf-magenta hover:text-gdf-magenta dark:border-purple-500/30 dark:bg-gdf-darkCard/70 dark:text-white dark:hover:border-gdf-pink dark:hover:text-gdf-pink sm:text-sm"
              >
                About GDF
              </a>
            </motion.div>
          </div>

          <HeroVisual />
        </motion.div>
      </section>

      <Section id="experiences">
        <SectionHeading eyebrow="Virtual MUN" title={home.experiences.title}>
          {home.experiences.body}
        </SectionHeading>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {conferences.map((conference, index) => (
            <motion.article
              key={conference.numeral}
              variants={fadeUp}
              className="glass-card group relative flex flex-col overflow-hidden rounded-3xl p-6 transition duration-500 hover:-translate-y-2"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gdf-violet/12 transition duration-500 group-hover:scale-125 dark:bg-gdf-glow/15" />
              <div className="relative mb-8 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-purple-100 to-fuchsia-100 text-xs font-black text-gdf-violet dark:from-purple-500/15 dark:to-pink-500/15 dark:text-gdf-glow">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <CalendarClock className="h-5 w-5 text-gdf-magenta dark:text-gdf-pink" />
              </div>
              <h3 className="relative font-display text-2xl font-black uppercase leading-tight tracking-[-0.04em] text-gdf-navy dark:text-white">
                Glo DIs {conference.numeral}
                <span className="block text-gdf-magenta dark:text-gdf-pink">{conference.year}</span>
              </h3>
              <div className="relative mt-auto pt-7">
                {conference.tone === 'active' ? (
                  <a
                    href={`mailto:${site.email}?subject=Glo%20DIs%20${conference.numeral}%20${conference.year}%20Registration`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-gdf-magenta to-gdf-violet px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white shadow-glow-pink transition hover:-translate-y-1 dark:from-gdf-pink dark:to-gdf-glow"
                  >
                    {conference.status}
                  </a>
                ) : (
                  <span
                    className={`inline-flex w-full items-center justify-center rounded-full border px-5 py-3 text-xs font-black uppercase tracking-[0.14em] ${
                      conference.tone === 'closed'
                        ? 'border-slate-200 bg-slate-100 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-gdf-lavender/70'
                        : 'border-purple-200 bg-purple-50 text-gdf-violet dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-gdf-lavender'
                    }`}
                  >
                    {conference.status}
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      <Section id="partners">
        <SectionHeading title="Our Partners" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-5"
        >
          {partners.map((group) => (
            <motion.article key={group.category} variants={fadeUp} className="glass-card rounded-3xl p-6">
              <h3 className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-gdf-magenta dark:text-gdf-pink sm:text-xs">
                {group.category}
              </h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {group.brands.map((brand) => (
                  <span
                    key={brand}
                    className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-purple-200/70 bg-white/75 px-4 text-sm font-black text-gdf-navy shadow-sm dark:border-purple-500/30 dark:bg-white/5 dark:text-white"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                              page 2 — about                                */
/* -------------------------------------------------------------------------- */

function AboutPage() {
  const statements = [
    { ...about.vision, icon: Compass },
    { ...about.mission, icon: Target },
  ];

  return (
    <>
      <Section>
        <motion.div {...reveal} className="glass-card relative overflow-hidden rounded-[2rem] p-7 sm:p-10 lg:p-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gdf-magenta/10 blur-3xl dark:bg-gdf-pink/12" />
          <div className="relative">
            <Eyebrow icon={Globe2}>About Us</Eyebrow>
            <p className="mt-7 max-w-4xl text-lg leading-9 text-gdf-navy dark:text-white sm:text-xl sm:leading-10">
              {about.intro}
            </p>
          </div>
        </motion.div>
      </Section>

      <Section id="vision">
        <SectionHeading eyebrow={about.statementsEyebrow} title={about.statementsTitle} as="h1" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-6 lg:grid-cols-2"
        >
          {statements.map((statement) => (
            <motion.article key={statement.title} variants={fadeUp} className="glass-card rounded-3xl p-7 sm:p-9">
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gdf-magenta to-gdf-violet text-white shadow-glow-pink dark:from-gdf-pink dark:to-gdf-glow">
                <statement.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-black uppercase tracking-[-0.035em] text-gdf-navy dark:text-white sm:text-3xl">
                {statement.title}
              </h3>
              <p className="mt-5 text-base leading-8 text-gdf-muted dark:text-gdf-lavender sm:text-lg sm:leading-9">
                {statement.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      <Section id="letter">
        <motion.article {...reveal} className="glass-card relative overflow-hidden rounded-[2rem] p-7 sm:p-10 lg:p-14">
          <div className="absolute -left-16 -bottom-16 h-60 w-60 rounded-full bg-gdf-violet/10 blur-3xl dark:bg-gdf-glow/12" />
          <Quote className="absolute right-8 top-8 h-16 w-16 text-gdf-magenta/12 dark:text-gdf-pink/15 sm:h-24 sm:w-24" />
          <div className="relative">
            <h2 className="font-display text-3xl font-black uppercase tracking-[-0.045em] text-gdf-navy dark:text-white sm:text-4xl lg:text-5xl">
              {about.letter.title}
            </h2>
            <div className="mt-8 max-w-3xl space-y-5">
              {about.letter.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-gdf-muted dark:text-gdf-lavender sm:text-lg sm:leading-9">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-9 font-display text-xl font-black tracking-[-0.02em] text-gdf-magenta dark:text-gdf-pink sm:text-2xl">
              {about.letter.signature}
            </p>
          </div>
        </motion.article>
      </Section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                               page 3 — axis                                */
/* -------------------------------------------------------------------------- */

function AxisPage() {
  return (
    <Section id="axis">
      <motion.article
        {...reveal}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gdf-magenta via-gdf-violet to-gdf-magenta p-8 text-white shadow-glow-pink dark:from-gdf-pink dark:via-gdf-glow dark:to-gdf-pink sm:p-12 lg:p-16"
      >
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/20" />
        <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full border border-white/15" />
        <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />

        <div className="relative max-w-3xl">
          <div className="mb-8 grid h-16 w-16 place-items-center rounded-2xl bg-white/16 backdrop-blur">
            <Globe2 className="h-8 w-8" />
          </div>
          <h1 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            {axis.title}
          </h1>
          <p className="mt-8 text-base leading-8 text-white/90 sm:text-lg sm:leading-9">{axis.body}</p>

          <a
            href={`mailto:${site.email}?subject=GDF%20AXIS%20MUN%20CIRCUIT`}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-gdf-magenta shadow-lg transition duration-300 hover:-translate-y-1 dark:text-gdf-pink sm:text-sm"
          >
            Join the Circuit
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </motion.article>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               page 4 — team                                */
/* -------------------------------------------------------------------------- */

function TeamPage() {
  const leaders = new Set(['Rajiv Rathod', 'Lucki Linesh']);

  return (
    <Section id="team">
      <SectionHeading eyebrow="Global Diplomacy Forum" title="Core Team" icon={Users} as="h1" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {team.map((member) => (
          <motion.article
            key={member.name}
            variants={fadeUp}
            className="glass-card group flex min-h-[17rem] flex-col items-center justify-center rounded-3xl p-6 text-center transition duration-500 hover:-translate-y-2"
          >
            <div
              className={`grid h-24 w-24 place-items-center rounded-full border-4 shadow-glow transition duration-500 group-hover:scale-105 ${
                leaders.has(member.name)
                  ? 'border-gdf-magenta bg-gradient-to-br from-gdf-magenta to-gdf-violet text-white dark:border-gdf-pink dark:from-gdf-pink dark:to-gdf-glow'
                  : 'border-purple-300 bg-gradient-to-br from-white to-purple-100 text-gdf-violet dark:border-purple-500/50 dark:from-gdf-darkCard dark:to-purple-950 dark:text-gdf-lavender'
              }`}
            >
              <span className="font-display text-2xl font-black tracking-[-0.06em]">{initials(member.name)}</span>
            </div>
            <h3 className="mt-6 font-display text-lg font-black leading-tight tracking-[-0.03em] text-gdf-navy dark:text-white sm:text-xl">
              {member.name}
            </h3>
            <div className="mt-3 space-y-0.5">
              {member.role.map((line) => (
                <p key={line} className="text-sm font-semibold leading-6 text-gdf-muted dark:text-gdf-lavender">
                  {line}
                </p>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    app                                     */
/* -------------------------------------------------------------------------- */

const views = {
  home: HomePage,
  about: AboutPage,
  axis: AxisPage,
  team: TeamPage,
};

export default function App() {
  const [theme, setTheme] = useTheme();
  const pageId = useHashRoute();
  const View = views[pageId] ?? HomePage;

  const setTitle = useCallback(() => {
    const page = pages.find((item) => item.id === pageId);
    document.title = pageId === 'home' ? site.title : `${page.label} | ${site.name}`;
  }, [pageId]);

  useEffect(setTitle, [setTitle]);

  return (
    <div className="bg-site-light min-h-screen text-gdf-navy transition-colors duration-500 dark:text-white">
      <div className="noise-overlay" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <AnnouncementBar />
        <Header theme={theme} setTheme={setTheme} pageId={pageId} />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={pageId} {...pageTransition}>
              <View />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
}
