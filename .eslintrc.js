module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'import'],
  rules: {
    'react/react-in-jsx-scope': 'off', // JSX에서 'React' 임포트가 필요 없음 (React 17+ 자동 임포트).
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환 타입 명시 필요 없음.
    '@typescript-eslint/naming-convention': 'off', // 변수 및 함수 명명 규칙 강제 안 함.
    '@typescript-eslint/no-floating-promises': 'off', // 처리되지 않은 프로미스 경고 무시.
    '@typescript-eslint/strict-boolean-expressions': 'off', // 엄격한 boolean 표현식 사용 안 함.
    '@typescript-eslint/no-confusing-void-expression': 'off', // void 반환 표현식에 대한 규칙 무시.
    '@typescript-eslint/no-unused-vars': 'warn', // 사용되지 않는 변수 있을 시 경고.
    '@typescript-eslint/prefer-reduce-type-parameter': 'off', // reduce 함수의 타입 파라미터를 사용하지 않아도 됨.
    '@typescript-eslint/consistent-type-assertions': 'off', // 타입 단언을 일관되게 사용할 필요 없음.
    '@tanstack/query/exhaustive-deps': 'error', // @tanstack/query에서 의존성 배열이 완전한지 검사.
    '@tanstack/query/no-rest-destructuring': 'warn', // @tanstack/query에서 REST 매개변수 해체 사용 경고.
    '@tanstack/query/stable-query-client': 'error', // @tanstack/query에서 안정적인 쿼리 클라이언트 사용.
    // 'react-native/no-unused-styles': 2,
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          'type',
        ],
        pathGroups: [{pattern: 'react', group: 'builtin', position: 'before'}],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'never',
      },
    ],
  },
  ignorePatterns: ['node_modules/', '*.js', '*.d.ts'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};
