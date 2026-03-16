/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Aqui você pode personalizar cores se quiser, 
      // mas o seu código já usa as cores padrão do Tailwind (indigo, zinc, etc)
    },
  },
  plugins: [],
}