module.exports = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
    '@storybook/addon-storysource'
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {}
  },
  staticDirs: ['../stories']
};
