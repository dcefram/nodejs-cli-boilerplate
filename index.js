#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const program = require('commander');

program.version('0.1.0', '-v', '--version');

const commands = fs.readdirSync(path.join(__dirname, 'commands'));

commands.forEach(key => {
  const entry = require(`./commands/${key}`);
  const command = program
    .command(entry.command)
    .action(entry.action)
    .description(entry.desc);

  if (entry.options) {
    entry.options.forEach(option => {
      const args = typeof option === 'string' ? [option] : option;
      command.option(...args);
    });
  }
});

program.parse(process.argv);
