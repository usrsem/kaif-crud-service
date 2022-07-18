'use strict';

const grpc = require('@grpc/grpc-js');

module.exports = class GrpcCrudService {
  constructor(repository) {
    this.repository = repository;
  }

  read(call, callback) {
    this.repository.read(call.request.id)
      .then((record) => callback(null, record))
      .catch((err) => callback(err));
  }

  create(call, callback) {
    this.repository.create(call.request)
      .then(() => callback(null, grpc.Empty()))
      .catch((err) => callback(err));
  }

  update(call, callback) {
    this.repository.update(call.request)
      .then(() => callback(null, grpc.Empty()))
      .catch((err) => callback(err));
  }

  delete(call, callback) {
    this.repository.delete(call.request.id)
      .then(() => callback(null, grpc.Empty()))
      .catch((err) => callback(err));
  }
};

// function GrpcCrudService(repository) {
//   console.log('Inited');
//   this.repository = repository;
// }
//
// GrpcCrudService.prototype.read = (call, callback) => {
//   this.repository.read(call.request.id)
//     .then((record) => callback(null, record))
//     .catch((err) => callback(err));
// };
//
// GrpcCrudService.prototype.create = (call, callback) => {
//   this.repository.create(call.request)
//     .then(() => callback(null, grpc.Empty()))
//     .catch((err) => callback(err));
// };
//
// GrpcCrudService.prototype.update = (call, callback) => {
//   this.repository.update(call.request)
//     .then(() => callback(null, grpc.Empty()))
//     .catch((err) => callback(err));
// };
//
// GrpcCrudService.prototype.delete = (call, callback) => {
//   this.repository.delete(call.request.id)
//     .then(() => callback(null, grpc.Empty()))
//     .catch((err) => callback(err));
// };
//
// module.exports = GrpcCrudService;
