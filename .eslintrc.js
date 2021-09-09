module.exports = {
  extends: ["airbnb-typescript-prettier"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-shadow": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "react/jsx-props-no-spreading": 0,
    camelcase: 0,
  },
  parserOptions: { project: "./tsconfig.json" },
};
