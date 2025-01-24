/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      in: [" 'Inter', 'sans-serif' "],
      
    },
    extend: {

      animation: {
        appear: "appear 5s linear",
      },
      keyframes: {
        appear: {
          from: {
            opacity: "0",
            transform: "scale(0.4)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      
      colors:{
        'white': '#ffff',
        'lwhite':'rgba(217, 217, 217, 1)',
        'lgray':'rgba(246, 246, 246, 1)',


        'darkblue':'rgba(10, 9, 35, 1)',
        'ldarkblue':'rgba(15, 33, 103, 1)',
        'lightblue':'rgba(29, 78, 216, 1)',

        'navfrom':'rgba(10, 9, 35, 1)',
        'navto':'rgba(10, 9, 35, 0)',
        'buttonfrom':'rgba(18, 15, 103, 1)',
        'buttonto':'rgba(30, 66, 205, 1)',
        'bannerfrom':'rgba(29, 78, 216, 1)',
        'bannerto':'rgba(29, 78, 216, 1)',

        'newsblue':'rgba(17, 47, 130, 1)',
        
        
      },
      backgroundColor:{
        
      },
      backgroundImage:{
        'herobg':"url(./Assets/herosecbg.jpg)",
        'slider1':"url(./Assets/slider1.svg)",
        'newsletter':"url(./Assets/newsletterbg.jpg)",
        'bbgufill':"url(./Assets/bbgufill.svg)",
        'bbgdfill':"url(./Assets/bbgdfill.svg)",
        'sbgdline':"url(./Assets/sbgdline.svg)",
        'sbguline':"url(./Assets/sbguline.svg)",

        'careerherobg':"url(./Assets/careermainbg.jpg)",

        'certbg':"url(./Assets/certbg.jpg)",

        'trainbg':"url(./Assets/trainingherobg.jpg)",
        
        'loginbg':"url(./Assets/loginbg.jpg)",
        'updatebg':"url(./Assets/updatebg.jpg)",
        
      },
      fontSize:{
        H: "clamp(33px, 6vw, 60px)",
        P: "clamp(8px, 3vw, 14px)",
        SH: "clamp(25px, 5vw, 35px)",
        Sl: "clamp(18px, 3vw, 35px)",
        40:'40px',
        35:'35px',
        24:'24px',
        18:'18px',
        16:'16px'
      },
      margin:{
        150:'150px',
        100:'100px',
        50:'50px'
      },
      padding:{
        100:'100px',
        50:'50px'
      },
      width:{
        bg:"clamp(350px, 6vw, 550px)",
        500:'500px',
        700:'700px',
        100:'100px',
        1300:'1300px',
        
      },
      height:{
        45:'45px',
        700:'700px',
        420:'420px'
      },
      boxShadow:{
        '3xl':'0 4px 20px rgba(0, 0, 0, 0.5)'
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".timeline-view": {
          "animation-timeline": "view-timeline",
        },
        ".timeline-range": {
          "animation-range": "entry 0% cover 40%",
        },
      });
    }),
  ],
}

