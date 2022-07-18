'use strict';

const orm = require('@usrsem/idevorm');
const services = require('./grpc-services.js');

module.exports = {
  getGrpcService: (tableName) => {
    const repository = orm.getRepository(tableName);
    const Service = services.get(tableName);
    return new Service(repository);
  },
};
