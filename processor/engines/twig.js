import baseEngine from './baseEngine';

const { getFileName } = baseEngine;

const twig = {
  parse: (pattern) => {
    return baseEngine.replacePlaceholders(pattern.h_markup, '{{|}}');
  },
  getExtension: () => {
    return 'twig';
  }
};

export default Object.assign(twig, { getFileName });
