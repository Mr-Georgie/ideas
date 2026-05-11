module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "trans-black": "rgba(0, 0, 0, 0.5)",
        "hover-black": "rgba(0, 0, 0, 0.9)",
        "custom-dark-blue": "#0A192F",
        "custom-white": "#CCD6F6",
        "custom-grey": "#8892B0",
        "custom-green": "#64FFDA",
        "custom-indigo": "#6C63FF",
      },
      screens: {
        // 'sm': '576px',
        // => @media (min-width: 576px) { ... }

        md: "710px",
        // => @media (min-width: 960px) { ... }

        // 'lg': '1440px',
        // => @media (min-width: 1440px) { ... }
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        "bounce-fast": "bounce 0.5s infinite",
        "spin-slow": "spin 3s linear infinite",
        "spin-reverse": "spin 2s linear infinite reverse",
        wiggle: "wiggle 1s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "slide-in-bounce": "slideInBounce 0.6s ease-out",
        "scale-bounce": "scaleBounce 0.4s ease-out",
        "rotate-in": "rotateIn 0.5s ease-out",
        "flip-in": "flipIn 0.6s ease-out",
        "rubber-band": "rubberBand 1s ease-out",
        jello: "jello 0.9s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "rainbow-text": "rainbowText 3s linear infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideInBounce: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "60%": { transform: "translateX(10%)" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleBounce: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        rotateIn: {
          "0%": { transform: "rotate(-180deg)", opacity: "0" },
          "100%": { transform: "rotate(0deg)", opacity: "1" },
        },
        flipIn: {
          "0%": { transform: "rotateY(-90deg)", opacity: "0" },
          "100%": { transform: "rotateY(0deg)", opacity: "1" },
        },
        rubberBand: {
          "0%": { transform: "scale3d(1, 1, 1)" },
          "30%": { transform: "scale3d(1.25, 0.75, 1)" },
          "40%": { transform: "scale3d(0.75, 1.25, 1)" },
          "50%": { transform: "scale3d(1.15, 0.85, 1)" },
          "65%": { transform: "scale3d(0.95, 1.05, 1)" },
          "75%": { transform: "scale3d(1.05, 0.95, 1)" },
          "100%": { transform: "scale3d(1, 1, 1)" },
        },
        jello: {
          "0%, 11.1%, 100%": { transform: "translate3d(0, 0, 0)" },
          "22.2%": { transform: "skewX(-12.5deg) skewY(-12.5deg)" },
          "33.3%": { transform: "skewX(6.25deg) skewY(6.25deg)" },
          "44.4%": { transform: "skewX(-3.125deg) skewY(-3.125deg)" },
          "55.5%": { transform: "skewX(1.5625deg) skewY(1.5625deg)" },
          "66.6%": { transform: "skewX(-0.78125deg) skewY(-0.78125deg)" },
          "77.7%": { transform: "skewX(0.390625deg) skewY(0.390625deg)" },
          "88.8%": { transform: "skewX(-0.1953125deg) skewY(-0.1953125deg)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(255, 61, 127, 0.5)" },
          "50%": {
            boxShadow:
              "0 0 20px rgba(255, 61, 127, 0.8), 0 0 30px rgba(255, 61, 127, 0.6)",
          },
        },
        rainbowText: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};
