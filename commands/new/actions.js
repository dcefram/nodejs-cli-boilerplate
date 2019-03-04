const shell = require('shelljs');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

function executeCRA(project, isTypescript = false) {
  shell.exec(
    `npx create-react-app ${project} ${isTypescript ? '--typescript' : ''}`
  );
}

// Procedural thingy
module.exports = (project, cmd) => {
  if (!shell.which('npx')) {
    console.log(
      chalk.red(
        'Sorry, this tool requires Node 8 and npx exposed in your path mga engot'
      )
    );
    return;
  }

  const name = cmd.name || project;

  console.log(chalk.green('Execute create-react-app...'));
  executeCRA(project, !!cmd.typescript);

  if (cmd.typescript) {
    // @TODO: Create types folder, etc.
  }

  console.log(chalk.green('Updating package.json...'));

  // Read package.json, update name if name !== project
  if (name !== project) {
    const packageRaw = fs.readFileSync(
      path.join(project, 'package.json'),
      'utf8'
    );

    try {
      const packageJson = JSON.parse(packageRaw);

      packageJson.name = name;

      // Write it back to the source
      fs.writeFileSync(
        path.join(project, 'package.json'),
        JSON.stringify(packageJson),
        'utf8'
      );
    } catch (error) {
      console.log(
        'uhmmm... we failed to update package.json :facepalm: plox report it in Github and paste the ff. message:',
        error.message
      );
    }
  }

  if (!cmd.typescript) {
    packages = packages.filter(package => /^(?!@types)/g.test(package));
  }

  shell.cd(project);
  shell.exec(`npm install --save ${packages.join(' ')}`);
  shell.cd('..');

  console.log(chalk.green.bold.underline('Tapos na po mga ginoo'));
};
