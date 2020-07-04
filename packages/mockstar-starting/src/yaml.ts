import yaml from 'js-yaml';
import fs from 'fs-extra';

// https://github.com/nodeca/js-yaml#api
// Get document, or throw exception on error
export function parseYaml(filePath: string): any {
  let config;

  try {
    config = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.log(e);
  }

  return config;
}

export function safeDump(obj: any, filePath: string) {
  let doc;

  try {
    doc = yaml.safeDump(obj, {
      styles: {
        '!!null': 'canonical', // dump null as ~
      },
      sortKeys: true, // sort object keys
    });
  } catch (e) {
    console.log(e);
  }

  return fs.outputFileSync(filePath, doc, 'utf-8');
}
