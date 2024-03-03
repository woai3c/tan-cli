/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    corePlugins: {
        preflight: false,
    },
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'bg-color': 'var(--el-bg-color)',
                primary: 'var(--el-color-primary)',
                'primary_light-9': 'var(--el-color-primary-light-9)',
                'text-color-primary': 'var(--el-text-color-primary)',
                'text-color-regular': 'var(--el-text-color-regular)',
                'text-color-disabled': 'var(--el-text-color-disabled)',
            },
        },
    },
}
