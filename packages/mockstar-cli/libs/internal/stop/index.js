'use strict';

module.exports = function (ctx) {

  const cmd = ctx.cmd;

  cmd.register('stop', 'Stop current background service', {}, require('./stop'));
};
