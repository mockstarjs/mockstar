'use strict';

module.exports = function (ctx) {

  const cmd = ctx.cmd;

    cmd.register('pm2', 'Commands pass to pm2', {}, require('./pm2'));
};
