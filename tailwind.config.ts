
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Event specific color themes
				'rvs-primary': 'hsl(var(--rvs-primary))',
				'rvs-secondary': '#D3E4FD',
				'rvs-accent': '#9b87f5',
				'rvs-light': '#FFDEE2',
				'bms-primary': 'hsl(var(--bms-primary))',
				'bms-secondary': '#264653',
				'bms-accent': '#E9C46A',
				'bms-light': '#E9F5F4',
				'sm-primary': 'hsl(var(--sm-primary))',
				'sm-secondary': '#1D3557',
				'sm-accent': '#457B9D',
				'sm-light': '#F1FAEE',
				'cs-primary': 'hsl(var(--cs-primary))',
				'cs-secondary': '#0A97D9',
				'cs-accent': '#E5243B',
				'cs-light': '#F1F9F1',
				// SDG-inspired palette 
				'sdg-green': 'hsl(var(--sdg-green))',
				'sdg-blue': 'hsl(var(--sdg-blue))',
				'sdg-red': 'hsl(var(--sdg-red))',
				'sdg-orange': 'hsl(var(--sdg-orange))',
				'sdg-yellow': 'hsl(var(--sdg-yellow))',
				'sdg-magenta': 'hsl(var(--sdg-magenta))',
				'sdg-teal': 'hsl(var(--sdg-teal))',
				'sdg-purple': 'hsl(var(--sdg-purple))',
				// Blue-Orange palette
				'bright-orange': 'hsl(var(--bright-orange))',
				'deep-orange': 'hsl(var(--deep-orange))',
				'light-orange': 'hsl(var(--light-orange))',
				'soft-orange': 'hsl(var(--soft-orange))',
				'ocean-blue': 'hsl(var(--ocean-blue))',
				'deep-blue': 'hsl(var(--deep-blue))',
				'sky-blue': 'hsl(var(--sky-blue))',
				'light-blue': 'hsl(var(--light-blue))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide-in': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'marquee': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'marquee': 'marquee 25s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
