'use strict';

const GrpcCrudService = require('../grpc-crud-service.js');

module.exports = class ClientGrpcService extends GrpcCrudService {
  create(call, callback) {
    const client = call.request;
    client.createdAt = new Date();
    console.log('call', call.request);
    this.repository.create(client)
      .then(() => callback(null, {}))
      .catch((err) => callback(err));
  }
};
