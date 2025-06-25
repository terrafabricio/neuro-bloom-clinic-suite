
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
					DEFAULT: 'hsl(216, 82%, 45%)', // Azul confiável
					foreground: 'hsl(0, 0%, 100%)',
					light: 'hsl(216, 82%, 55%)',
					dark: 'hsl(216, 82%, 35%)'
				},
				secondary: {
					DEFAULT: 'hsl(159, 60%, 55%)', // Verde suave
					foreground: 'hsl(0, 0%, 100%)',
					light: 'hsl(159, 60%, 65%)',
					dark: 'hsl(159, 60%, 45%)'
				},
				accent: {
					DEFAULT: 'hsl(43, 96%, 65%)', // Amarelo caloroso
					foreground: 'hsl(223, 47%, 23%)',
					light: 'hsl(43, 96%, 75%)',
					dark: 'hsl(43, 96%, 55%)'
				},
				destructive: {
					DEFAULT: 'hsl(0, 84%, 60%)',
					foreground: 'hsl(0, 0%, 100%)'
				},
				muted: {
					DEFAULT: 'hsl(220, 14%, 96%)',
					foreground: 'hsl(220, 8%, 46%)'
				},
				popover: {
					DEFAULT: 'hsl(0, 0%, 100%)',
					foreground: 'hsl(220, 8%, 46%)'
				},
				card: {
					DEFAULT: 'hsl(0, 0%, 100%)',
					foreground: 'hsl(220, 8%, 46%)'
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
				neuro: {
					// Cores específicas da NeuroClinic
					blue: {
						50: 'hsl(216, 100%, 97%)',
						100: 'hsl(216, 95%, 94%)',
						200: 'hsl(216, 95%, 87%)',
						300: 'hsl(216, 94%, 73%)',
						400: 'hsl(216, 91%, 60%)',
						500: 'hsl(216, 82%, 45%)', // Primary
						600: 'hsl(216, 82%, 35%)',
						700: 'hsl(216, 82%, 28%)',
						800: 'hsl(216, 82%, 23%)',
						900: 'hsl(216, 82%, 18%)'
					},
					green: {
						50: 'hsl(159, 100%, 96%)',
						100: 'hsl(159, 85%, 89%)',
						200: 'hsl(159, 75%, 79%)',
						300: 'hsl(159, 70%, 68%)',
						400: 'hsl(159, 65%, 60%)',
						500: 'hsl(159, 60%, 55%)', // Secondary
						600: 'hsl(159, 60%, 45%)',
						700: 'hsl(159, 60%, 38%)',
						800: 'hsl(159, 60%, 32%)',
						900: 'hsl(159, 60%, 26%)'
					},
					yellow: {
						50: 'hsl(43, 100%, 96%)',
						100: 'hsl(43, 100%, 90%)',
						200: 'hsl(43, 100%, 80%)',
						300: 'hsl(43, 96%, 70%)',
						400: 'hsl(43, 96%, 65%)', // Accent
						500: 'hsl(43, 96%, 55%)',
						600: 'hsl(43, 96%, 45%)',
						700: 'hsl(43, 96%, 38%)',
						800: 'hsl(43, 96%, 32%)',
						900: 'hsl(43, 96%, 26%)'
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				heading: ['Poppins', 'system-ui', 'sans-serif']
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
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
