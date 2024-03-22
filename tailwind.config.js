module.exports = {
    prefix: 'tw-',
    darkMode: 'class',
    content: ['./src/pages/**/*.tsx', './src/components/**.tsx', './src/layouts/**.tsx'],
    theme: {
        screens: {
            xs: '480px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1400px',
        },
        extend: {},
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [],
};
