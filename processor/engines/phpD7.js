import baseEngine from './baseEngine';

const phpD7 = {
  parse: (template) => {
    return baseEngine.replacePlaceholders(template, '<?php print|?>|$');
  },
  getExtension: () => {
    return 'tpl.php';
  }
};

export default phpD7;
