/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        
        'primary-background': 'var(--primary-background)',
        'ca-green': 'var(--ca-green)',
        'ca-pink': 'var(--ca-pink)',
        'ca-pink-shade': 'var(--ca-pink-shade)',
        'foreground': 'var(--foreground)',
        'high-concern': 'var(--high-concern)',
        'high-concern-shade': 'var(--high-concern-shade)',
        'neutral-chip': 'var(--neutral-chip)',
        'neutral-chip-shade': 'var(--neutral-chip-shade)',
        'no-concern': 'var(--no-concern)',
        'no-concern-shade': 'var(--no-concern-shade)',
        'location-placed': 'var(--location-placed)',
        'location-placed-shade': 'var(--location-placed-shade)',
        'location-placed-secondary': 'var(--location-placed-secondary)',
        'primary-gray': 'var(--primary-gray)',
        'primary-text': 'var(--primary-text)',
        'secondary-text': 'var(--secondary-text)',
        'some-concern': 'var(--some-concern)',
        'some-concern-shade': 'var(--some-concern-shade)',
        'facility-green': 'var(--facility-green)',
        'facility-green-shade': 'var(--facility-green-shade)'

      }
    },
  },
  plugins: [],
}
