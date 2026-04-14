export default {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'chore', 'test']],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'never', ['upper-case']],
  },
};
