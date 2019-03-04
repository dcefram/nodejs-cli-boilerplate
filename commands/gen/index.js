module.exports = {
  command: 'gen <type> <name>',
  desc: 'Scaffold a container or component',
  options: ['--typescript'],
  action: require('./actions'),
};
