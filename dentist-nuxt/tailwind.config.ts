import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  content: ['./components/**/*.{vue,js,ts}', './layouts/**/*.vue', './pages/**/*.vue', './app.vue'],
  theme: { extend: {
    fontFamily: { sans: ['Vazirmatn', 'Tahoma', 'sans-serif'] },
    colors: { jade: { 50: '#eef8f3', 100: '#dceee7', 200: '#c1e0d3', 500: '#277d6f', 600: '#17675c', 700: '#0c5149', 800: '#083b38', 900: '#07312f' }, gold: '#b5a078', ink: '#243f3c' },
    boxShadow: { soft: '0 20px 65px rgba(7,49,47,.09)' }
  } }
}
