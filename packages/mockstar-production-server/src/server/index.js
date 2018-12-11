const express = require('express');

module.exports = {
  create: () => express().set('json spaces', 2),
  middleware: require('./middleware'),
  router: require('./router'),
  bodyParser: require('./body-parser')
};
