module.exports = {
    extends: [
        "react-app",
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "prettier"
    ],
    plugins: ["@typescript-eslint"],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    rules: {
        "prettier/prettier": "error"
    }
}