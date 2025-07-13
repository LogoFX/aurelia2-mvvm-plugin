import importPlugin from 'eslint-plugin-import'
import eslintJs from "@eslint/js";
import eslintTs from 'typescript-eslint';
import globals from "globals";
import tsParser from '@typescript-eslint/parser'

const tsFiles = ['{src,test}/**/*.ts']

const customTsConfig = {
    files: tsFiles,
    plugins: {
        import: importPlugin,
        'import/parsers': tsParser,
    },
    languageOptions: {
        globals: {
          ...globals.builtin,
          ...globals.nodeBuiltin,
          ...globals.browser,
          ...globals.node,
          ...globals.jest,
        },

        parser: tsParser,
        ecmaVersion: 2019,
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.lint.json",
            tsconfigRootDir: ".",
            exclude: ["node_modules", "dist", "**/*.json" ],
        },
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts'],
        },
    },
    rules: {
        ...importPlugin.configs.typescript.rules,

        "@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-expressions": "warn",
        "@typescript-eslint/prefer-for-of": "warn",
        "@typescript-eslint/no-empty-object-type": "warn",
        "@typescript-eslint/no-unsafe-function-type": "warn",
        "@typescript-eslint/no-empty-function": "warn",
        "@typescript-eslint/no-inferrable-types": 0,
        "no-unused-vars": 0,
        "no-constant-binary-expression": "warn",
        "no-prototype-builtins": 0,
        "no-console": 0,
        "getter-return": 0,
        indent: ["error", 2, { "SwitchCase": 1 }],
        semi: 1,
    },
}

const recommendedTypeScriptConfigs = [
    ...eslintTs.configs.recommended.map((config) => ({
        ...config,
        files: tsFiles,
    })),
    ...eslintTs.configs.stylistic.map((config) => ({
        ...config,
        files: tsFiles,
    })),
]

export default [
    {
        ignores: [
            "**/dist",
            "**/node_modules",
            "**/*.js",
            "**/*.cjs",
            "examples/*",
            "test/js-framework-benchmark",
            "**/docs",
        ],
    },
    eslintJs.configs.recommended,
    ...recommendedTypeScriptConfigs,
    customTsConfig,
];
