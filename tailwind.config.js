/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "maven-pro": ["Maven Pro", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        background: "#f0f2f2",
        "primary-background": "#F0F2F2",
        "secondary-background": "#F8F8F8",
        "ca-green": "#17603D",
        "ca-pink": "#A70C53",
        "ca-pink-shade": "#730034",
        foreground: "#ffffff",
        "high-concern": "#FFCDC2",
        "high-concern-shade": "#DC5B3E",
        "neutral-chip": "#BDE7FF",
        "neutral-chip-shade": "#75AFCF",
        "no-concern": "#C5E2AE",
        "no-concern-shade": "#6EB138",
        "location-placed": "#ECDDFF",
        "location-placed-shade": "#DABDFF",
        "location-placed-secondary": "#6C2FBB33",
        "primary-gray": "#D4D4D4",
        "secondary-gray": "#EBEBEB",
        "tertiary-gray": "#808080",
        "modal-background-gray": "#E3E3E3",
        "primary-text": "#121212",
        "secondary-text": "#353535",
        "error-red": "#FF0000",
        "some-concern": "#FBC49D",
        "some-concern-shade": "#E87420",
        "facility-green": "#BCF0E4",
        "facility-green-shade": "#38AE75",
        "topic-chip-yellow": "#FFF490",
        "topic-chip-yellow-border": "#B5AE69",
      },
    },
  },
  plugins: [],
};
