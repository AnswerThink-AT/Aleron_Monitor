export default {
  '*.js': (stagedFiles) => [`eslint ${stagedFiles.join(' ')}`],
  '*.{js,ts,html,css,xml}': (stagedFiles) => [
    `prettier --ignore-unknown --write ${stagedFiles.join(' ')}`,
  ],
};
