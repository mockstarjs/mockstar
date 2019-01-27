'use strict';

module.exports = function (ctx) {

  const cmd = ctx.cmd;

  cmd.register('status', 'Show the running status of MockStar', {}, require('./status'));
};
