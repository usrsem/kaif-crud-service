'use strict';

const orm = require('@usrsem/idevorm');
const { log } = require('./application/loader.js');
const startOrm = require('./application/db.js');
const startGrpcService = require('./application/server.js');

const main = () => {
  startOrm();
  startGrpcService();
};

if (require.main === module) {
  try {
    main();
  } catch (e) {
    log.error(e);
  }
}

