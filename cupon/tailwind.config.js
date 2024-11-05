/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0px 24px 90px rgba(121, 140, 158, 0.12)',
      },
      
      borderRadius: {
        'custom': '10px',
      },

      colors: {
        'custom-blue': '#07427e', // Base color without alpha
      },
      container:{
        center:true,
        padding:{
          DEFAULT:'1rem',
          sm:'2rem',
          md:'3rem',
          lg:'4rem',
          xl:'5rem',
          '2xl':'6rem'
        }
      }
    },
  },
  plugins: [],
}

