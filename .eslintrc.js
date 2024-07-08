module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "google",
        //"plugin:@typescript-eslint/recommended",
        "plugin:angular/johnpapa"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 4],
        "linebreak-style": ["warn","windows"],
        "prefer-const": ["off"],
        "max-len": ["error", 110],
        "semi": ["error", "always"],
        "quotes": ["warn", "double"],
        "comma-dangle": ["error", "never"],
        "eqeqeq": "off",
        "arrow-parens": ["error", "as-needed", {"requireForBlockBody": true}],
        "no-prototype-builtins": "off",
        "func-call-spacing": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/quotes": "off", // see quotes
        "@typescript-eslint/semi": "off", // see semi
        "@typescript-eslint/indent": "off", // see indent
        "@typescript-eslint/keyword-spacing": "off", // see keyword-spacing
        "@typescript-eslint/space-before-blocks": "off", // see space-before-blocks
        "@typescript-eslint/object-curly-spacing": "off", // see object-curly-spacing
        "@typescript-eslint/comma-dangle": "off", // see comma-dangle
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/space-before-function-paren": "off",
        "@typescript-eslint/no-non-null-assertion":"off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "off",
        "require-jsdoc": "off"
    }
}
