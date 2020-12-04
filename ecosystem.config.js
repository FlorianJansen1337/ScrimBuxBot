require('dotenv').config({
    path: './.env'
});

module.exports = [
    {
        name: "ScrimBuxBot",
        script: "./index.ts",
        watch: "./*"
    }
]