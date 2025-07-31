export interface ThemeConfig {
  id: string
  name: string
  description: string
  cssFile: string
  className: string
  preview: {
    light: {
      background: string
      foreground: string
      accent: string
    }
    dark: {
      background: string
      foreground: string
      accent: string
    }
  }
}

export const themes: Record<string, ThemeConfig> = {
  'futuristic-ai': {
    id: 'futuristic-ai',
    name: 'Futuristic AI',
    description: 'Modern, clean design inspired by AI interfaces and Vercel aesthetics',
    cssFile: 'futuristic-ai.css',
    className: 'theme-futuristic-ai',
    preview: {
      light: {
        background: '#ffffff',
        foreground: '#0a0a0a',
        accent: '#3b82f6'
      },
      dark: {
        background: '#020817',
        foreground: '#fafafa',
        accent: '#3b82f6'
      }
    }
  },
  'solarized': {
    id: 'solarized',
    name: 'Solarized',
    description: 'Classic color scheme by Ethan Schoonover',
    cssFile: 'solarized.css',
    className: 'theme-solarized',
    preview: {
      light: {
        background: '#fdf6e3',
        foreground: '#657b83',
        accent: '#859900'
      },
      dark: {
        background: '#002b36',
        foreground: '#93a1a1',
        accent: '#859900'
      }
    }
  }
}

export const defaultTheme = 'futuristic-ai'