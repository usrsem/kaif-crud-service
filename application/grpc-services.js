'use strict';

const DefaultMap = require('./lib/default-map.js');
const GrpcCrudService = require('./grpc-crud-service.js');
const fs = require('fs');

const services = new DefaultMap(() => GrpcCrudService);
const servicesPath = __dirname + '/services';

fs.readdirSync(servicesPath).forEach((file) => {
  const Service = require(`${servicesPath}/${file}`);
  const name = file.replace('.js', '');
  services.set(name, Service);
});

module.exports = services;
