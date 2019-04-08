'use strict';

module.exports = function (ctx) {

  const cmd = ctx.cmd;

  cmd.register('check', 'Check healthy for project.', {}, require('./check'));
};
