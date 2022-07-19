'use strict';

const assert = require('assert').strict;
const { describe, it, after, afterEach } = require('mocha');
const orm = require('@usrsem/idevorm');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const config = require('../../application/config.js');
const startOrm = require('../../application/db.js');
const startGrpcService = require('../../application/server.js');

const main = () => {
  startOrm();
  return startGrpcService();
};

const tableName = 'client';
const protoLoaderSettings = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

const packagePath = `${config.crudProtoPath}/${tableName}.proto`;
const packageDefinition = protoLoader.loadSync(
  packagePath,
  protoLoaderSettings
);
const grpcService = grpc.loadPackageDefinition(packageDefinition);
const service = new grpcService.ClientService(config.grpcServerHost,
  grpc.credentials.createInsecure());

const clientRequest = {
  telegramId: 0,
  telegramUsername: 'testUsername',
  telegramFullname: 'testFullname',
};

const clientDb = Object.assign(
  clientRequest,
  { createdAt: new Date('2022-07-07') }
);

module.exports = () => describe('CrudService', () => {
  const server = main();
  const repository = orm.getRepository('client');

  const clear = async () => {
    await repository.delete(clientRequest.telegramId);
  };

  // after(() => server.forceShutdown());

  it('Creates new entity', async () => {
    await clear();
    const callback = (err, data) => {
      console.log('err', err, 'data', data);
      assert.ifError(err);
      assert.deepStrictEqual(data, {});
    };
    service.create(clientRequest, callback);
  });

  it('Fails while creating existing client', async () => {
    await clear();
    const callback = (err, data) => {
      assert(err);
    };
    await repository.create(clientDb);
    service.create(clientRequest, callback);
  });

  it('Read existing client', async () => {
    await clear();
    await repository.create(clientDb);
    const callback = (err, data) => {
      assert.ifError(err);
      assert.deepStrictEqual(data, clientDb);
    };
    service.create({ telegramId: clientRequest.telegramId }, callback);
  });

  it('Fails while reading not existing client', async () => {
  });

  it('Updates existing client', async () => {
  });

  it('Fails while updating not existing client', async () => {
  });

  it('Deletes existing client', async () => {
  });

  it('Not fails while deleting not existing client', async () => {
  });
});
