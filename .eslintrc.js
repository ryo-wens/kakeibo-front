module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "prettier",
        "plugin:prettier/recommended",
    ],
    plugins: ["react","react-app","@typescript-eslint"],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    rules: {
        "prettier/prettier": "error"
    }
}