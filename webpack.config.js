module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/index'],
    output: {
        filename: './dist/app.js'
    },
    watch: true
};