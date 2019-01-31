import fs from "fs";
import slugify from "slugify";
import engines from './engines';

export const createPattern = (pattern) => {
  // Create dir if it does not exist.
  const filename = slugify(pattern.name.toLowerCase(), '_');
  const path = `./patterns/${filename}`;
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
    if (pattern.js) {
      fs.writeFile(`${path}/${filename}.js`, pattern.js, () => {});
    }
    if (pattern.scss) {
      fs.writeFile(`${path}/${filename}.scss`, pattern.scss, () => {});
    }

    Object.keys(engines).forEach((engine) => {
      const extension = engines[engine].getExtension();
      const contents = (engines[engine]).parse(pattern.h_markup);
      fs.writeFile(`${path}/${filename}.${extension}`, contents, () => {});
    });
  }
};
