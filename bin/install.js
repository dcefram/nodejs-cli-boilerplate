#!/usr/bin/env node

const childExec = require('child_process').execSync;

process.on('unhandledRejection', err => {
  console.log(err);
  // console.log(`@@@@@ ${err.message}`);
  // process.exit(1);
});

async function install() {
  console.log('----- installing pat for the first time');

  console.log('--- running yarn');
  childExec('yarn', { stdio: 'inherit' });

  if (require('os').platform() === 'win32') {
    const isElevated = require('is-elevated');

    if (!(await isElevated())) {
      throw new Error(
        'Please open your terminal with elevated privileges before running this script.'
      );
    }
  }

  // Do npm ln
  const { exec } = require('shelljs');
  exec('npm ln');
}

install();
