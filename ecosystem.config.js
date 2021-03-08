require('dotenv').config({
    path: './.env'
});

module.exports = [
    {
        name: "ScrimBuxBot",
        script: "./src/index.ts",
        watch: "./src"
    }
]