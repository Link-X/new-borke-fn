module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react-hooks'],
    extends: [
        // "standard",
        // "plugin:@typescript-eslint/eslint-recommended",
        // "plugin:@typescript-eslint/recommended",
        'standard-with-typescript',
        'plugin:react/recommended'
        // "prettier", // 暂时不开启prettier的eslint规则
        // "prettier/@typescript-eslint",
        // "prettier/react"
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
        project: './tsconfig.json'
    },
    env: {
        es6: true,
        node: true
    },
    rules: {
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/promise-function-async': 0,
        'no-callback-literal': 0,
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/no-floating-promises': ['warn'],
        '@typescript-eslint/no-empty-function': ['warn'],
        '@typescript-eslint/strict-boolean-expressions': [
            'warn',
            {
                allowNullable: false,
                ignoreRhs: true
            }
        ],
        '@typescript-eslint/consistent-type-assertions': 0,
        '@typescript-eslint/require-await': 0,
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'generator-star-spacing': ['error', { before: false, after: true }]
    }
}
