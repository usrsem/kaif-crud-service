'use strict';

const schemas = require('./schema.js');
const orm = require('@usrsem/idevorm');
const config = require('./config.js');

module.exports = () => {
  orm.setDriverName('pg');
  orm.setConfig(config.db.postgres);
  for (const tableName in schemas) {
    orm.addSchema(tableName, schemas[tableName]);
  }
};
