import esformatter from 'esformatter';
import camelCase from 'camelcase';
import baseEngine from './baseEngine';

esformatter.register(require('esformatter-jsx'));

const react = {
  parse: (pattern) => {
    const componentRender = baseEngine
        .replacePlaceholders(pattern.h_markup, '{|}|props.')
        .replace('class', 'className');

    return esformatter.format(
        react.generateComponentSkeleton(componentRender, camelCase(pattern.name)),
        { indent_size: 2, space_in_empty_paren: true });
  },
  generateComponentSkeleton: (content, name) => {
    return `
      import React from 'react';
      const ${name} = (props) => {
        return (
          ${content}
        );
      };
      export default ${name};
    `;
  },
  getExtension: () => {
    return 'jsx';
  },
  getFileName: (name) => {
    return camelCase(name);
  }
};

export default react;
