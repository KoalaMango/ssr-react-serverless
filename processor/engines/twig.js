import baseEngine from './baseEngine';

const twig = {
  parse: (template) => {
    return baseEngine.replacePlaceholders(template, '{{|}}');
  },
  getExtension: () => {
    return 'twig';
  }
};

export default twig;
