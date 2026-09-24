import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Globe2,
  Mail,
  Moon,
  Phone,
  Sparkles,
  Sun,
  UsersRound,
} from 'lucide-react';

const navItems = [
  { label: 'THE FUTURE', href: '#future' },
  { label: 'VIRTUAL MUN', href: '#experiences' },
  { label: 'VISION', href: '#vision' },
  { label: 'OUR PARTNERS', href: '#partners' },
  { label: 'CORE TEAM', href: '#team' },
];

const conferences = [
  { title: 'GLO DIS I 2026', status: 'Registrations Closed', tone: 'closed' },
  { title: 'GLO DIS II 2026', status: 'Registrations Closed', tone: 'closed' },
  { title: 'GLO DIS III 2026', status: 'Registrations Closed', tone: 'closed' },
  { title: 'GLO DIS IV 2026', status: 'Registrations Closed', tone: 'closed' },
  { title: 'GLO DIS V 2026', status: 'Register Now', tone: 'active' },
  { title: 'GLO DIS VI 2026', status: 'Coming Soon', tone: 'soon' },
  { title: 'GLO DIS VII 2026', status: 'Coming Soon', tone: 'soon' },
  { title: 'GLO DIS VIII 2026', status: 'Coming Soon', tone: 'soon' },
];

const partners = [
  { category: 'REWARD PARTNERS', brands: ['Canva', 'Notion'] },
  { category: 'ACADEMIC PARTNERS', brands: ['GDF Academic Badge'] },
  { category: 'PLATFORM PROVIDERS', brands: ['Luma'] },
  { category: 'TECHNICAL PARTNERS', brands: ['Jitsi', 'OpenAI', 'Lenovo', 'Alibaba Cloud'] },
  { category: 'SPONSORS', brands: ['Prezi'] },
];

const team = [
  { name: 'Rajiv Rathod', role: 'Supreme Leader of GDF, Founder' },
  { name: 'Lucki Linesh', role: 'Co Supreme Leader of GDF, Co-Founder' },
  { name: 'Shreta Das', role: 'HR Specialist / Chief of Staff' },
  { name: 'Zainab Fatima Waseem', role: 'HR Specialist' },
  { name: 'Saeemah', role: 'Outreach Executive' },
  { name: 'Madhav Rajyaguru', role: 'Content Creator' },
  { name: 'Nysa', role: 'Conference Manager (UAE)' },
  { name: 'Rudraksh Chatterjee', role: 'Research' },
  { name: 'Astha', role: 'Head of Research' },
  { name: 'Sai Sahas', role: 'Content Creator' },
  { name: 'Prabhkhel', role: 'AXIS Relations Intern' },
  { name: 'Shamil', role: 'Graphic Designer' },
  { name: 'Muhammad Talah', role: 'Backend Developer' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.64, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('gdf-theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    const meta = document.querySelector('meta[name="theme-color"]');
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('gdf-theme', theme);
    meta?.setAttribute('content', theme === 'dark' ? '#0A0712' : '#F8F9FF');
  }, [theme]);

  return [theme, setTheme];
}

function SectionTitle({ eyebrow, title, children, align = 'center' }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
      className={align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}
    >
      {eyebrow ? (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-gdf-magenta shadow-sm backdrop-blur dark:border-purple-500/30 dark:bg-gdf-darkCard/70 dark:text-gdf-pink">
          <Sparkles className="h-4 w-4" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="font-display text-3xl font-black uppercase tracking-[-0.04em] text-gdf-navy dark:text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {children ? (
        <p className="mt-5 text-base leading-8 text-gdf-muted dark:text-gdf-lavender sm:text-lg">
          {children}
        </p>
      ) : null}
    </motion.div>
  );
}

function Header({ theme, setTheme }) {
  return (
    <header className="sticky top-0 z-50 border-b border-purple-200/50 bg-white/70 shadow-sm shadow-purple-900/5 backdrop-blur-2xl transition-colors duration-500 dark:border-purple-500/20 dark:bg-[#0a0712]/72 dark:shadow-black/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="group flex min-w-0 items-center gap-3" aria-label="GDF GLOBAL DIPLOMACY FORUM">
          <span className="logo-emblem relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full border border-purple-200/70 bg-white/85 text-gdf-violet shadow-glow transition-transform duration-500 group-hover:scale-105 dark:border-purple-500/30 dark:bg-gdf-darkCard/85 dark:text-gdf-glow">
            <Globe2 className="relative z-10 h-6 w-6" strokeWidth={1.9} />
          </span>
          <span className="truncate font-display text-sm font-black uppercase tracking-[0.18em] text-gdf-navy dark:text-white sm:text-base">
            GDF GLOBAL DIPLOMACY FORUM
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-purple-200/40 bg-white/45 p-1 backdrop-blur-xl dark:border-purple-500/20 dark:bg-white/5 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-gdf-muted transition hover:bg-purple-50 hover:text-gdf-magenta dark:text-gdf-lavender dark:hover:bg-purple-500/10 dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Light/Dark Mode Toggle Switch"
          aria-pressed={theme === 'dark'}
          className="relative flex h-11 w-20 shrink-0 items-center rounded-full border border-purple-200/70 bg-white/70 p-1 shadow-inner shadow-purple-900/10 transition-colors duration-500 dark:border-purple-500/40 dark:bg-gdf-darkCard/80"
        >
          <span className="sr-only">Light/Dark Mode Toggle Switch</span>
          <span
            className={`absolute inset-y-1 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br shadow-lg transition-all duration-500 ${
              theme === 'dark'
                ? 'left-[calc(100%-2.5rem)] from-gdf-pink to-gdf-glow text-white shadow-purple-900/40'
                : 'left-1 from-gdf-magenta to-gdf-violet text-white shadow-purple-700/25'
            }`}
          >
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </span>
          <Sun className="ml-2 h-4 w-4 text-gdf-magenta/60 dark:text-white/25" />
          <Moon className="ml-auto mr-2 h-4 w-4 text-gdf-violet/45 dark:text-gdf-lavender/80" />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-28 lg:pt-24">
      <div className="absolute left-1/2 top-20 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-gdf-violet/10 blur-3xl dark:bg-gdf-glow/10" />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]"
      >
        <div>
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-gdf-magenta shadow-sm backdrop-blur dark:border-purple-500/30 dark:bg-gdf-darkCard/70 dark:text-gdf-pink"
          >
            <Globe2 className="h-4 w-4" />
            GDF OMAN SMART DIPLOMACY HUB
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl font-black uppercase leading-[0.91] tracking-[-0.075em] text-gdf-navy dark:text-white sm:text-6xl md:text-7xl xl:text-8xl"
          >
            COMMITTED TO EMPOWERING YOUR TOMORROW
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-xl font-semibold leading-8 text-gdf-muted dark:text-gdf-lavender sm:text-2xl"
          >
            Debate. Negotiate. Lead the World
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#experiences"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gdf-magenta to-gdf-violet px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-glow-pink transition duration-300 hover:-translate-y-1 hover:shadow-glow dark:from-gdf-pink dark:to-gdf-glow"
            >
              VIRTUAL MUN EXPERIENCES
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#future"
              className="inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-white/70 px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-gdf-navy shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gdf-magenta hover:text-gdf-magenta dark:border-purple-500/30 dark:bg-gdf-darkCard/70 dark:text-white dark:hover:border-gdf-pink dark:hover:text-gdf-pink"
            >
              THE FUTURE OF DIPLOMACY IN OMAN
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="relative mx-auto aspect-square w-full max-w-[38rem]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gdf-magenta/18 via-gdf-violet/18 to-transparent blur-2xl dark:from-gdf-pink/16 dark:via-gdf-glow/24" />
          <motion.div
            className="hero-orbit absolute inset-4 rounded-full border border-purple-200/60 shadow-glow dark:border-purple-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
          />
          <motion.div
            className="absolute left-4 top-12 h-28 w-28 rounded-full border border-fuchsia-200 bg-white/55 shadow-glow backdrop-blur dark:border-fuchsia-500/30 dark:bg-gdf-darkCard/65"
            animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-10 right-8 h-36 w-36 rounded-full border border-violet-200 bg-white/45 shadow-glow backdrop-blur dark:border-violet-500/30 dark:bg-gdf-darkCard/55"
            animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-16 top-6 h-16 w-16 rounded-full bg-gradient-to-br from-gdf-magenta to-gdf-violet shadow-glow-pink dark:from-gdf-pink dark:to-gdf-glow"
            animate={{ scale: [1, 1.16, 1], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="glass-card grid h-48 w-48 place-items-center rounded-full sm:h-60 sm:w-60">
              <Globe2 className="h-20 w-20 text-gdf-violet dark:text-gdf-glow sm:h-24 sm:w-24" strokeWidth={1.35} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="future" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="THE FUTURE OF DIPLOMACY IN OMAN">
          The Global Diplomacy Forum (GDF) is a community-run international diplomacy hub in Oman, known as the 'Bridge of the Middle East.' It serves as a neutral ground for global citizens to connect and develop Smart Diplomacy and leadership skills. GDF aligns with Oman Vision 2040, promoting inclusivity and ensuring everyone has a voice in international collaboration.
        </SectionTitle>
      </div>
    </section>
  );
}

function Experiences() {
  return (
    <section id="experiences" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="VIRTUAL MUN EXPERIENCES">
          Welcome to Global Diplomacy Forum - your premier destination for immersive online Model United Nations experiences. Explore our virtual conferences, skill-building workshops, and expert support designed to empower the next generation of global leaders. Click on each service to learn how we bring diplomacy to life, no matter where you are.
        </SectionTitle>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {conferences.map((conference, index) => (
            <motion.article
              key={conference.title}
              variants={fadeUp}
              className="glass-card group relative overflow-hidden rounded-2xl p-6 transition duration-500 hover:-translate-y-2"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gdf-violet/12 transition group-hover:scale-125 dark:bg-gdf-glow/15" />
              <div className="relative mb-8 flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-purple-100 to-fuchsia-100 text-sm font-black text-gdf-violet dark:from-purple-500/15 dark:to-pink-500/15 dark:text-gdf-glow">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <CalendarClock className="h-5 w-5 text-gdf-magenta dark:text-gdf-pink" />
              </div>
              <h3 className="relative font-display text-2xl font-black uppercase tracking-[-0.035em] text-gdf-navy dark:text-white">
                {conference.title}
              </h3>
              {conference.tone === 'active' ? (
                <a
                  href="mailto:info@gdf.social?subject=GLO%20DIS%20V%202026%20Registration"
                  className="relative mt-7 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-gdf-magenta to-gdf-violet px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white shadow-glow-pink transition hover:-translate-y-1 dark:from-gdf-pink dark:to-gdf-glow"
                >
                  {conference.status}
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className={`relative mt-7 inline-flex w-full cursor-not-allowed items-center justify-center rounded-full border px-5 py-3 text-sm font-black uppercase tracking-[0.14em] opacity-90 ${
                    conference.tone === 'closed'
                      ? 'border-slate-200 bg-slate-100 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-gdf-lavender/70'
                      : 'border-purple-200 bg-purple-50 text-gdf-violet dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-gdf-lavender'
                  }`}
                >
                  {conference.status}
                </button>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function VisionMission() {
  return (
    <section id="vision" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="VISION AND MISSION STATEMENTS" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="mt-12 grid gap-6 lg:grid-cols-2"
        >
          <motion.article variants={fadeUp} className="glass-card rounded-2xl p-7 sm:p-9">
            <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gdf-magenta to-gdf-violet text-white shadow-glow-pink dark:from-gdf-pink dark:to-gdf-glow">
              <BadgeCheck className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl font-black uppercase tracking-[-0.03em] text-gdf-navy dark:text-white">OUR VISION</h3>
            <p className="mt-5 text-base leading-8 text-gdf-muted dark:text-gdf-lavender sm:text-lg">
              At Global Diplomacy Forum (GDF), our vision is to cultivate a generation of globally aware, action-driven youth who are prepared to lead with empathy, insight, and integrity. We strive to create a world where diplomacy is not just practiced in international halls but championed in classrooms, communities, and conversations empowering young minds to shape a more just, peaceful, and cooperative future.
            </p>
          </motion.article>
          <motion.article variants={fadeUp} className="glass-card rounded-2xl p-7 sm:p-9">
            <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gdf-violet to-gdf-magenta text-white shadow-glow dark:from-gdf-glow dark:to-gdf-pink">
              <UsersRound className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl font-black uppercase tracking-[-0.03em] text-gdf-navy dark:text-white">OUR MISSION</h3>
            <p className="mt-5 text-base leading-8 text-gdf-muted dark:text-gdf-lavender sm:text-lg">
              Our mission is to offer an inclusive and impactful platform for students through virtual Model UN conferences that reflect real-world diplomacy. By fostering critical thinking, public speaking, and global collaboration, we aim to shape the next generation of leaders. With accessible opportunities and innovative formats, GDF is redefining how youth connect with global issues—making diplomacy digital, dynamic, and meaningful.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}

function LetterAndAxis() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.article
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="glass-card relative overflow-hidden rounded-2xl p-7 sm:p-9"
        >
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gdf-magenta/10 blur-2xl dark:bg-gdf-pink/12" />
          <h2 className="relative font-display text-3xl font-black uppercase tracking-[-0.04em] text-gdf-navy dark:text-white sm:text-4xl">
            LETTER FROM OUR LEADER
          </h2>
          <p className="relative mt-6 text-base leading-8 text-gdf-muted dark:text-gdf-lavender sm:text-lg">
            Welcome to the Global Diplomacy Forum. GDF began with a simple idea: to unite passionate young minds to collaborate and face global challenges. Your ideas and voice matter here—whether you're organizing, debating, or just starting out. You're valued and essential to our community. As we grow,we are committed to keeping GDF inclusive, exciting, and purposeful. Bring your energy and creativity—together, we're building the world of tomorrow.
          </p>
          <p className="relative mt-7 font-display text-xl font-black text-gdf-magenta dark:text-gdf-pink">
            {'-Rajiv Rathod and Lucki Linesh '}
          </p>
        </motion.article>

        <motion.article
          id="axis"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gdf-magenta to-gdf-violet p-7 text-white shadow-glow-pink dark:from-gdf-pink dark:to-gdf-glow sm:p-9"
        >
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full border border-white/20" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-xl" />
          <div className="relative mb-7 grid h-16 w-16 place-items-center rounded-2xl bg-white/16 backdrop-blur">
            <Globe2 className="h-8 w-8" />
          </div>
          <h2 className="relative font-display text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">
            GDF AXIS MUN CIRCUIT
          </h2>
          <p className="relative mt-6 text-base leading-8 text-white/88 sm:text-lg">
            GDF Axis is a worldwide programme created to help students showcase their campus and run MUN conferences on a global level. It opens doors for international connections, meaningful discussions, and a unified space for young leaders.
          </p>
        </motion.article>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section id="partners" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="OUR PARTNERS" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5"
        >
          {partners.map((group) => (
            <motion.article key={group.category} variants={fadeUp} className="glass-card rounded-2xl p-6">
              <h3 className="text-xs font-black uppercase tracking-[0.22em] text-gdf-magenta dark:text-gdf-pink">{group.category}</h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {group.brands.map((brand) => (
                  <span
                    key={brand}
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-purple-200/70 bg-white/75 px-4 text-sm font-black text-gdf-navy shadow-sm dark:border-purple-500/30 dark:bg-white/5 dark:text-white"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
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

function Team() {
  const highlighted = useMemo(() => new Set(['Rajiv Rathod', 'Lucki Linesh']), []);

  return (
    <section id="team" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="CORE TEAM" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {team.map((member) => (
            <motion.article
              key={member.name}
              variants={fadeUp}
              className="glass-card group flex min-h-64 flex-col items-center justify-center rounded-2xl p-6 text-center transition duration-500 hover:-translate-y-2"
            >
              <div
                className={`relative grid h-24 w-24 place-items-center rounded-full border-4 shadow-glow transition duration-500 group-hover:scale-105 ${
                  highlighted.has(member.name)
                    ? 'border-gdf-magenta bg-gradient-to-br from-gdf-magenta to-gdf-violet text-white dark:border-gdf-pink dark:from-gdf-pink dark:to-gdf-glow'
                    : 'border-purple-300 bg-gradient-to-br from-white to-purple-100 text-gdf-violet dark:border-purple-500/50 dark:from-gdf-darkCard dark:to-purple-950 dark:text-gdf-lavender'
                }`}
              >
                <span className="font-display text-2xl font-black tracking-[-0.06em]">{initials(member.name)}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-black tracking-[-0.03em] text-gdf-navy dark:text-white">{member.name}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-gdf-muted dark:text-gdf-lavender">{member.role}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer" className="px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-purple-200/50 bg-white/75 shadow-glow backdrop-blur-2xl dark:border-purple-500/25 dark:bg-gdf-darkCard/80">
        <div className="relative overflow-hidden bg-gradient-to-r from-gdf-magenta via-gdf-violet to-gdf-magenta px-6 py-10 text-center text-white dark:from-gdf-pink dark:via-gdf-glow dark:to-gdf-pink sm:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.24),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.18),transparent_30%)]" />
          <h2 className="relative font-display text-3xl font-black uppercase tracking-[-0.045em] sm:text-4xl lg:text-5xl">
            CONNECT TO WHAT COUNTS — DEBATE. NEGOTIATE. LEAD THE WORLD
          </h2>
        </div>

        <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="logo-emblem relative grid h-11 w-11 place-items-center rounded-full border border-purple-200/70 bg-white/75 text-gdf-violet dark:border-purple-500/30 dark:bg-white/5 dark:text-gdf-glow">
                <Globe2 className="relative z-10 h-5 w-5" />
              </span>
              <p className="font-display text-xl font-black uppercase tracking-[0.14em] text-gdf-navy dark:text-white">GLOBAL DIPLOMACY FORUM</p>
            </div>
            <div className="mt-6 flex flex-col gap-4 text-sm font-bold uppercase tracking-[0.12em] text-gdf-muted dark:text-gdf-lavender sm:flex-row sm:flex-wrap">
              <a href="tel:+96896267906" className="inline-flex items-center gap-2 transition hover:text-gdf-magenta dark:hover:text-gdf-pink">
                <Phone className="h-4 w-4" />
                PHONE: +968 96267906
              </a>
              <a href="mailto:info@gdf.social" className="inline-flex items-center gap-2 transition hover:text-gdf-magenta dark:hover:text-gdf-pink">
                <Mail className="h-4 w-4" />
                EMAIL: info@gdf.social
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-gdf-muted dark:text-gdf-lavender">SOCIAL:</span>
            <a
              href="https://www.linkedin.com/company/global-diplomacy-forum/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gdf-magenta to-gdf-violet text-white shadow-glow-pink transition hover:-translate-y-1 dark:from-gdf-pink dark:to-gdf-glow"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, setTheme] = useTheme();

  return (
    <div className="bg-site-light min-h-screen text-gdf-navy transition-colors duration-500 dark:text-white">
      <div className="noise-overlay" />
      <div className="relative z-10">
        <Header theme={theme} setTheme={setTheme} />
        <main>
          <Hero />
          <About />
          <Experiences />
          <VisionMission />
          <LetterAndAxis />
          <Partners />
          <Team />
        </main>
        <Footer />
      </div>
    </div>
  );
}
