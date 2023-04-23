/** @type {import('tailwindcss').Config} */
const plugin =require('tailwindcss/plugin');

module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    plugins: [],
    theme: {
        extend: {
            colors: {
                "color-primary-blue": "#579AFF",
                "color-primary-blue-accent": "#408CFF",
                "color-success": "#157F40",
                "color-danger": "#CF3426",

                // Fonts
                "color-font-primary": "#4A4A4A",
                "color-font-secondary": "#515151",
                "color-font-tertiary": "#9E9E9E",

                // Background
                "color-bg-primary": "#F6FAFF",
                "color-bg-secondary": "#B0B0B0",
                "color-bg-tertiary": "#F9F9F9",
                "color-bg-accent": "#edf3fe",

                // Shades
                "color-shades-primary": "#858585",
                "color-shades-secondary": "#cfcfcf",
                "color-shades-accent": "#EFEFEF",

                //Borders
                "color-border-primary": "#C5C5C5",
                "color-border-secondary": "#F3F3F3",
            },
            dropShadow: {
                '3xl': '0 10px 30px rgba(207, 207, 207, 0.5)',

            },
            minHeight: {
                "80": "80px",
                "140": "140px",
                "220": "220px",
                "550": "550px",
            },
            maxHeight: {
                "60": "60px",
                "230":"230px",
                "240": "240px",
            },
            height: {
                "195": "195px",
                "230":"230px",
            },
            width: {
                "160": "160px",
            },
            maxWidth: {
                "110": "110px",
                "120":"120px",
                "125": "125px",
                "160": "160px",
            },
            padding: {
                "18": "4.5rem",
            },

        },

    },
}
