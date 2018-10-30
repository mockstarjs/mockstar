'use strict';

module.exports = function (ctx) {

  const cmd = ctx.cmd;

  cmd.register('build', 'Build local server', {}, require('./build'));
};
