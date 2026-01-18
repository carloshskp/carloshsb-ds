/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
      
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        profile: 'rgb(25,25,25)',
        surface: {
          DEFAULT: 'hsl(var(--ds-surface-1))',
          soft: 'hsl(var(--ds-surface-2))',
          glass: 'hsl(var(--ds-surface-glass))',
          overlay: 'hsl(var(--ds-surface-overlay))'
        },
        'accent-lime': 'hsl(var(--ds-accent-lime))',
        'accent-emerald': 'hsl(var(--ds-accent-emerald))',
        'accent-amber': 'hsl(var(--ds-accent-amber))',
        'focus-ring': 'hsl(var(--ds-focus-ring))',
        'border-soft': 'hsl(var(--ds-border-soft))',
        'border-strong': 'hsl(var(--ds-border-strong))',
        'zinc': {
          '400-alpha-10': 'hsl(var(--ds-zinc-400-alpha-10))',
          '400-alpha-20': 'hsl(var(--ds-zinc-400-alpha-20))',
          '400-alpha-30': 'hsl(var(--ds-zinc-400-alpha-30))',
          '400-alpha-35': 'hsl(var(--ds-zinc-400-alpha-35))',
          '800-alpha-50': 'hsl(var(--ds-zinc-800-alpha-50))',
          '800-alpha-80': 'hsl(var(--ds-zinc-800-alpha-80))',
          '800-alpha-95': 'hsl(var(--ds-zinc-800-alpha-95))',
          '800-alpha-98': 'hsl(var(--ds-zinc-800-alpha-98))',
          '900-alpha-95': 'hsl(var(--ds-zinc-900-alpha-95))',
          '900-alpha-96': 'hsl(var(--ds-zinc-900-alpha-96))',
          '900-alpha-98': 'hsl(var(--ds-zinc-900-alpha-98))'
        },
        'emerald': {
          '500-alpha-15': 'hsl(var(--ds-emerald-500-alpha-15))',
          '500-alpha-20': 'hsl(var(--ds-emerald-500-alpha-20))',
          '500-alpha-25': 'hsl(var(--ds-emerald-500-alpha-25))',
          '500-alpha-30': 'hsl(var(--ds-emerald-500-alpha-30))',
          '500-alpha-40': 'hsl(var(--ds-emerald-500-alpha-40))',
          '500-alpha-50': 'hsl(var(--ds-emerald-500-alpha-50))',
          '500-alpha-60': 'hsl(var(--ds-emerald-500-alpha-60))',
          '500-alpha-80': 'hsl(var(--ds-emerald-500-alpha-80))',
          '500-alpha-85': 'hsl(var(--ds-emerald-500-alpha-85))',
          '500-alpha-90': 'hsl(var(--ds-emerald-500-alpha-90))'
        },
        'lime': {
          '400-alpha-08': 'hsl(var(--ds-lime-400-alpha-08))',
          '400-alpha-18': 'hsl(var(--ds-lime-400-alpha-18))'
        },
        'red': {
          '500-alpha-60': 'hsl(var(--ds-red-500-alpha-60))',
          '500-alpha-80': 'hsl(var(--ds-red-500-alpha-80))',
          '500-alpha-90': 'hsl(var(--ds-red-500-alpha-90))',
          '500-alpha-96': 'hsl(var(--ds-red-500-alpha-96))',
          '600-alpha-96': 'hsl(var(--ds-red-600-alpha-96))',
          '700-alpha-98': 'hsl(var(--ds-red-700-alpha-98))'
        },
        'text': {
          'zinc-100': 'hsl(var(--ds-text-zinc-100))',
          'zinc-200': 'hsl(var(--ds-text-zinc-200))',
          'zinc-300': 'hsl(var(--ds-text-zinc-300))',
          'zinc-400': 'hsl(var(--ds-text-zinc-400))',
          'zinc-500': 'hsl(var(--ds-text-zinc-500))',
          'zinc-600': 'hsl(var(--ds-text-zinc-600))'
        },
        'ds-input': {
          bg: 'hsl(var(--ds-input-bg))',
          border: 'hsl(var(--ds-input-border))',
          text: 'hsl(var(--ds-input-text))'
        }
      },
      boxShadow: {
        'ds-soft': '0 12px 40px hsla(var(--ds-shadow-soft))',
        'ds-strong': '0 25px 60px hsla(var(--ds-shadow-strong))',
        'ds-terminal': 'var(--ds-shadow-terminal)',
        'ds-side-nav': 'var(--ds-shadow-side-nav)',
        'ds-side-nav-hover': 'var(--ds-shadow-side-nav-hover)',
        'ds-modal': 'var(--ds-shadow-modal)',
        'ds-card-hover': 'var(--ds-shadow-card-hover)'
      },
      backgroundImage: {
        'gradient-accent-top': 'var(--ds-gradient-accent-top)',
        'gradient-accent-horizontal': 'var(--ds-gradient-accent-horizontal)',
        'gradient-accent-diagonal': 'var(--ds-gradient-accent-diagonal)',
        'gradient-accent-diagonal-strong': 'var(--ds-gradient-accent-diagonal-strong)',
        'gradient-accent-vertical': 'var(--ds-gradient-accent-vertical)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}

