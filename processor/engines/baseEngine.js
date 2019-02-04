import slugify from "slugify";

const baseEngine = {
  getPlaceholders: (template) => {
    const pattern = /{{(.*?)}}/g;
    return template.match(pattern);
  },
  replacePlaceholders: (template, replacementPattern) => {
    let newTemplate = '';
    newTemplate = template.replace(/{{(.*?)}}/g, (a, b) => {
      const patternSyntax = replacementPattern.split('|');
      const variablePrefix = patternSyntax.length > 2 && patternSyntax[2] || '';

      return `${patternSyntax[0]} ${variablePrefix}${b.trim()} ${patternSyntax[1]}`;
    });

    return newTemplate;
  },
  getFileName: (name) => {
    return slugify(name.toLowerCase(), '_');
  }
};

export default baseEngine;
