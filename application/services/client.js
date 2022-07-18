'use strict';

const GrpcCrudService = require('../grpc-crud-service.js');
const { Empty } = require('@grpc/grpc-js');

module.exports = class ClientGrpcService extends GrpcCrudService {
  create(call, callback) {
    const client = call.request;
    client.createdAt = new Date();
    this.repository.create(client)
      .then(() => callback(null, new Empty()))
      .catch((err) => callback(err));
  }
};
