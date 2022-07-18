'use strict';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { log } = require('./loader.js');
const { capitalize } = require('./lib/string.js');
const config = require('./config.js');
const factories = require('./factories.js');
const schemas = require('./schema.js');

const protoLoaderSettings = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};


const getServer = () => {
  const server = new grpc.Server();

  for (const tableName in schemas) {
    const packagePath = `${config.crudProtoPath}/${tableName}.proto`;
    const packageDefinition = protoLoader.loadSync(
      packagePath,
      protoLoaderSettings
    );

    const proto = grpc.loadPackageDefinition(packageDefinition);
    const serviceName = `${capitalize(tableName)}Service`;

    log.info(`Initing ${serviceName}`);

    const service = proto[serviceName].service;
    const implementation = factories.getGrpcService(tableName);

    server.addService(service, implementation);
  }

  return server;
};

const startGrpcService = () => {
  log.info('Starting gRPC server');
  const routeServer = getServer();

  routeServer.bindAsync(
    config.grpcServerHost,
    grpc.ServerCredentials.createInsecure(),
    () => routeServer.start()
  );
  log.info('Server started');
};

module.exports = startGrpcService;
