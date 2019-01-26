'use strict';

module.exports = function (ctx) {

  const cmd = ctx.cmd;

  cmd.register('run', 'Start a front service', {}, require('./run'));
};
