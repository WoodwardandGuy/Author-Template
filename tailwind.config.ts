import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        // E.L. Westbury brand palette (see design-assets/DESIGN-SPEC.md).
        // Two dark backgrounds + one light is the whole system — do not add a third dark tone.
        ivory: '#F6F2EA', // default page background; text on dark
        ink: {
          DEFAULT: '#2A2733', // body text on light; dark button hover
          dark: '#1A1822', // deep plum — footer / newsletter band (alias below)
        },
        heroBlack: '#0A0A0B', // hero section background + scrim
        aubergine: '#22202B', // featured release + book detail hero
        deepPlum: '#1A1822', // footer, newsletter band
        smokyGreen: '#3E4A42', // brand statement, book club header, praise band, primary buttons
        brass: {
          DEFAULT: '#9A7B4F', // primary accent: links, rules, CTA fill, active nav
          hover: '#B08D5C', // CTA hover fill
          dark: '#7C6340',
        },
        gold: '#C9A227', // hero subline, edition note, dark-section accents
        warmSand: '#E9E2D4', // photo placeholder fill
        // Back-compat alias so any lingering `brand` utility keeps resolving to brass.
        brand: {
          DEFAULT: '#9A7B4F',
          dark: '#7C6340',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        // Content rise-in (hero content, modal panel).
        elwRise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        // Modal backdrop veil.
        elwVeil: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'elw-rise': 'elwRise 0.8s ease both',
        'elw-rise-fast': 'elwRise 0.4s ease both',
        'elw-veil': 'elwVeil 0.3s ease both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
