import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './client/index.html',
    './client/src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        crt: {
          bg: '#050505',
          border: '#222',
          amber: '#f97316'
        }
      }
    }
  },
  plugins: []
};

export default config;
