/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 */
'use strict';

var path = require('path');
var chalk = require('chalk');
var spawn = require('child_process').spawn;
var easyfile = require('easyfile');
var packageJson = require('../../package.json');

function installDev(projectDir, verbose) {
  var proc = spawn('npm', [
    'install',
    verbose? '--verbose': '',
    '--save-dev',
    'webpack@' + packageJson.dependencies['webpack'],
    'webpack-dev-server@' + packageJson.dependencies['webpack-dev-server'],
    'babel-loader@' + packageJson.devDependencies['babel-loader'],
    'json-loader@' + packageJson.devDependencies['json-loader'],
    'react-hot-loader@' + packageJson.devDependencies['react-hot-loader'],
    'haste-resolver-webpack-plugin@' + packageJson.devDependencies['haste-resolver-webpack-plugin'],
    'webpack-html-plugin@' + packageJson.devDependencies['webpack-html-plugin'],
    'babel-preset-es2015@' + packageJson.devDependencies['babel-preset-es2015'],
    'babel-preset-react@' + packageJson.devDependencies['babel-preset-react']
  ], {stdio: 'inherit'});

  proc.on('close', function (code) {
    if (code !== 0) {
      console.error('`npm install` failed');
      return;
    } else {
      console.log(chalk.white.bold('To run your app on browser:'));
      console.log(chalk.white('   cd ' + projectDir));
      console.log(chalk.white('   react-web start'));
    }
  });
}

module.exports = function(projectDir, config) {

  var root = config.getRoot();
  var src = path.join(__dirname, 'templates/webpack.config.js');
  var dest = path.join(root, 'web/webpack.config.js');

  easyfile.copy(src, dest, {
    force: true,
    backup: true,
  });

  process.chdir(root);
  installDev(projectDir);
}
