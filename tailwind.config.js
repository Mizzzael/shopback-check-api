const colors = require('tailwindcss/colors');

const sans = ['Panton', 'sans-serif'];
module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        fontFamily: {
            sans,
            serif: sans,
            mono: sans,
            display: sans,
            body: sans,
        },
        colors: {
            // Build your palette here
            transparent: 'transparent',
            white: colors.white,
            black: colors.black,
            gray: colors.trueGray,
            melona: {
                50: '#571622',
                100: '#6c1b29',
                200: '#812031',
                300: '#962438',
                400: '#ab2940',
                500: '#c02d47',
                600: '#d13651',
                700: '#d64a63',
                800: '#db5e74',
                900: '#e07386',
            },
            cloud: {
                50: '#34cba8',
                100: '#47d1b1',
                200: '#5bd7ba',
                300: '#6fdcc3',
                400: '#83e2cc',
                500: '#98e7d4',
                600: '#acecdd',
                700: '#c1f1e6',
                800: '#d5f6ee',
                900: '#eafaf7',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
