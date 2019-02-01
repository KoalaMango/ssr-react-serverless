import baseEngine from './baseEngine';

const { getFileName } = baseEngine;

const phpD7 = {
  parse: (pattern) => {
    return baseEngine.replacePlaceholders(pattern.h_markup, '<?php print|?>|$');
  },
  getExtension: () => {
    return 'tpl.php';
  }
};

export default Object.assign(phpD7, { getFileName });
