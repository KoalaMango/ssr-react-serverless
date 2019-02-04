import fs from "fs";
import slugify from "slugify";
import engines from './engines';

export const createPattern = async (pattern) => {
  // Create dir if it does not exist.
  const filename = slugify(pattern.name.toLowerCase(), '_');
  const path = `./patterns/${filename}`;
  if (!fs.existsSync(path)){
    await fs.mkdirSync(path);
    if (pattern.js) {
      await fs.writeFile(`${path}/${filename}.js`, pattern.js, () => {});
    }
    if (pattern.scss) {
      await fs.writeFile(`${path}/${filename}.scss`, pattern.scss, () => {});
    }
    await Object.keys(engines).forEach(async (engine) => {
      const extension = engines[engine].getExtension();
      const contents = engines[engine].parse(pattern);
      const templateName = engines[engine].getFileName(pattern.name);
      await fs.writeFile(`${path}/${templateName}.${extension}`, contents, () => {});
    });
  }
};
