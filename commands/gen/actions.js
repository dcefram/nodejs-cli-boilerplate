const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const templates = require('./templates');

module.exports = (type, name, cmd) => {
  const ext = cmd.typescript ? 'ts' : 'js';

  if (type !== 'container') {
    console.log(
      chalk.red(
        'This tool only supports generating containers for now... kalungkutan'
      )
    );
    return;
  }

  // Create Folder
  console.log(chalk.green(`Creating folder (type: ${type})...`));
  shell.mkdir(path.join(process.cwd(), name));

  // Generate index.<ext>
  console.log(chalk.green('Generating index...'));
  const indexContents = templates.indexTemplate(name);
  fs.writeFileSync(
    path.join(process.cwd(), name, `index.${ext}`),
    indexContents,
    'utf8'
  );

  // Generate model.<ext>
  console.log(chalk.green('Generating model...'));
  const modelContents = templates.modelTemplate();
  fs.writeFileSync(
    path.join(process.cwd(), name, `model.${ext}`),
    modelContents,
    'utf8'
  );

  // Generate reducers.<ext>
  console.log(chalk.green('Generating reducers...'));
  const reducersContents = templates.reducersTemplate(!!cmd.typescript);
  fs.writeFileSync(
    path.join(process.cwd(), name, `reducers.${ext}`),
    reducersContents,
    'utf8'
  );

  // Generate effects.<ext>
  console.log(chalk.green('Generating effects...'));
  const effectsContents = templates.effectsTemplate(!!cmd.typescript);
  fs.writeFileSync(
    path.join(process.cwd(), name, `effects.${ext}`),
    effectsContents,
    'utf8'
  );

  // Generate selectors.<ext>
  console.log(chalk.green('Generating selectors...'));
  const selectorsContents = templates.selectorsTemplate(!!cmd.typescript);
  fs.writeFileSync(
    path.join(process.cwd(), name, `selectors.${ext}`),
    selectorsContents,
    'utf8'
  );
};
