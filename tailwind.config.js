/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gdf: {
          navy: '#1E1035',
          muted: '#6B7280',
          magenta: '#E024B3',
          violet: '#8B5CF6',
          dark: '#0A0712',
          darkCard: '#1A132F',
          pink: '#F43F5E',
          glow: '#A855F7',
          lavender: '#A78BFA',
        },
      },
      boxShadow: {
        glow: '0 0 44px rgba(139, 92, 246, 0.22)',
        'glow-pink': '0 0 38px rgba(224, 36, 179, 0.24)',
      },
      backgroundImage: {
        'light-radial': 'radial-gradient(circle at 20% 20%, rgba(224,36,179,0.16), transparent 30%), radial-gradient(circle at 80% 10%, rgba(139,92,246,0.18), transparent 32%), linear-gradient(135deg, #F8F9FF 0%, #F4E8FF 48%, #FFFFFF 100%)',
        'dark-radial': 'radial-gradient(circle at 18% 18%, rgba(244,63,94,0.17), transparent 28%), radial-gradient(circle at 78% 12%, rgba(168,85,247,0.22), transparent 34%), linear-gradient(135deg, #0A0712 0%, #130C25 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
