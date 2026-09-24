/**
 * Verbatim content extracted from the source PDF
 * "Global Diplomacy Forum | GDF Oman | Smart Diplomacy Hub" (4 pages).
 *
 * Page 1 -> Home
 * Page 2 -> About (Vision & Mission + Letter From Our Leader)
 * Page 3 -> GDF Axis
 * Page 4 -> Core Team
 *
 * Some strings in the PDF are stored with broken subset-font encodings
 * (e.g. "9LVLRQDQG0LVVLRQ 6WDWHPHQWV", "in OPDn.", "ekal“c_a pl^e[h").
 * They are decoded here to their true text:
 *   "Vision and Mission Statements", "in Oman.", "info@gdf.social".
 */

export const site = {
  name: 'Global Diplomacy Forum',
  shortName: 'GDF',
  title: 'Global Diplomacy Forum | GDF Oman | Smart Diplomacy Hub',
  email: 'info@gdf.social',
  phone: '+968 96267906',
  phoneHref: 'tel:+96896267906',
  linkedin: 'https://www.linkedin.com/company/global-diplomacy-forum/',
};

export const pages = [
  { id: 'home', label: 'Home', hash: '#/' },
  { id: 'about', label: 'About Us', hash: '#/about' },
  { id: 'axis', label: 'GDF Axis', hash: '#/axis' },
  { id: 'team', label: 'Core Team', hash: '#/team' },
];

/* ---------------------------------- Page 1 --------------------------------- */

export const home = {
  announcement: 'Committed to empowering your tomorrow',
  tagline: 'Debate. Negotiate. Lead the World',
  headline: ['The Future of', 'Diplomacy', 'in Oman.'],
  intro:
    'The Global Diplomacy Forum (GDF) is a community-run international diplomacy hub in Oman, known as the "Bridge of the Middle East." It serves as a neutral ground for global citizens to connect and develop Smart Diplomacy and leadership skills. GDF aligns with Oman Vision 2040, promoting inclusivity and ensuring everyone has a voice in international collaboration.',
  experiences: {
    title: 'Virtual MUN Experiences',
    body: 'Welcome to Global Diplomacy Forum - your premier destination for immersive online Model United Nations experiences. Explore our virtual conferences, skill-building workshops, and expert support designed to empower the next generation of global leaders. Click on each service to learn how we bring diplomacy to life, no matter where you are.',
  },
};

export const conferences = [
  { numeral: 'I', year: '2026', status: 'Registrations Closed', tone: 'closed' },
  { numeral: 'II', year: '2026', status: 'Registrations Closed', tone: 'closed' },
  { numeral: 'III', year: '2026', status: 'Registrations Closed', tone: 'closed' },
  { numeral: 'IV', year: '2026', status: 'Registrations Closed', tone: 'closed' },
  { numeral: 'V', year: '2026', status: 'Register Now', tone: 'active' },
  { numeral: 'VI', year: '2026', status: 'Coming Soon', tone: 'soon' },
  { numeral: 'VII', year: '2026', status: 'Coming Soon', tone: 'soon' },
  { numeral: 'VIII', year: '2026', status: 'Coming Soon', tone: 'soon' },
];

export const partners = [
  { category: 'Reward Partners', brands: ['Canva', 'Notion'] },
  { category: 'Academic Partners', brands: ['GDF Academic Badge'] },
  { category: 'Platform Providers', brands: ['Luma'] },
  { category: 'Technical Partners', brands: ['Jitsi', 'OpenAI', 'Lenovo', 'Alibaba Cloud'] },
  { category: 'Sponsors', brands: ['Prezi'] },
];

/* ---------------------------------- Page 2 --------------------------------- */

export const about = {
  intro:
    'The Global Diplomacy Forum (GDF) is a dynamic, youth-led platform that organizes impactful online Model UN conferences. We bring together students from around the world to engage in debates on global issues, hone their leadership skills, and participate in meaningful diplomacy. Our mission is to make Model UN accessible, inclusive, and transformative, empowering the next generation of leaders through dialogue, collaboration, and real-world problem-solving.',
  statementsEyebrow: 'Vision and Mission Statements',
  statementsTitle: 'Vision and Mission',
  vision: {
    title: 'Our Vision',
    body: 'At Global Diplomacy Forum (GDF), our vision is to cultivate a generation of globally aware, action-driven youth who are prepared to lead with empathy insight, and integrity. We strive to create a world where diplomacy is not just practiced in international halls but championed in classrooms, communities, and conversations - empowering young minds to shape a more just, peaceful, and cooperative future.',
  },
  mission: {
    title: 'Our Mission',
    body: 'Our mission is to offer an inclusive and impactful platform for students through virtual Model UN conferences that reflect real-world diplomacy. By fostering critical thinking, public speaking, and global collaboration, we aim to shape the next generation of leaders. With accessible opportunities and innovative formats, GDF is redefining how youth connect with global issues making diplomacy digital, dynamic, and meaningful.',
  },
  letter: {
    title: 'Letter From Our Leader',
    paragraphs: [
      'Welcome to the Global Diplomacy Forum. GDF began with a simple idea: to unite passionate young minds to collaborate and face global challenges.',
      'Your ideas and voice matter here—whether you’re organizing, debating, or just starting out. You’re valued and essential to our community.',
      'As we grow, I’m committed to keeping GDF inclusive, exciting, and purposeful. Bring your energy and creativity-together, we’re building the world of tomorrow.',
    ],
    signature: '~Rajiv Rathod',
  },
};

/* ---------------------------------- Page 3 --------------------------------- */

export const axis = {
  title: 'GDF AXIS MUN CIRCUIT',
  body: 'GDF Axis is a worldwide programme created to help students showcase their campus and run MUN conferences on a global level. It opens doors for international connections, meaningful discussions, and a unified space for young leaders.',
};

/* ---------------------------------- Page 4 --------------------------------- */

export const team = [
  { name: 'Rajiv Rathod', role: ['Supreme Leader of GDF', 'Founder'] },
  { name: 'Lucki Linesh', role: ['Co Supreme Leader of GDF', 'Co - Founder'] },
  { name: 'Josh', role: ['Head of Conference', 'Affairs'] },
  { name: 'Saeemah', role: ['Outreach Executive'] },
  { name: 'Shreta Das', role: ['Chief of Staff'] },
  { name: 'Zainab Fatima Waseem', role: ['HR Specialist'] },
  { name: 'Madhav Rajyaguru', role: ['Content Creator'] },
  { name: 'Nysa', role: ['Conference Manager', '(UAE)'] },
  { name: 'Rudraksh Chatterjee', role: ['Research'] },
  { name: 'Astha', role: ['Head of Research'] },
  { name: 'Sai Sahas', role: ['Content Creator'] },
  { name: 'Prabhkhel', role: ['AXIS Relations Intern'] },
  { name: 'Shamil', role: ['Graphic Designer'] },
  { name: 'Muhammad Talah', role: ['Backend Developer'] },
];

/* --------------------------- Footer (every page) --------------------------- */

export const footer = {
  heading: ['CONNECT', 'TO WHAT', 'COUNTS'],
  subheading: 'DEBATE. NEGOTIATE. LEAD THE WORLD',
  labels: { phone: 'PHONE', email: 'EMAIL', social: 'SOCIAL' },
};
