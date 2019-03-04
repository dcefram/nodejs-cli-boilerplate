module.exports = {
  command: 'new <project>',
  desc: 'Scaffold a project. ',
  options: [
    '--typescript',
    [
      '-N, --name <name>',
      'Specify project name. This defaults to string assigned to <project> param',
    ],
  ],
  action: require('./actions'),
};
