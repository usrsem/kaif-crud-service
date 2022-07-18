'use strict';

const production = false;

const getPostgresConfig = () => {

  const getFromEnv = () => {
    const postgresVars = {
      host: 'KAIF_CRUD_POSTGRES_HOST',
      port: 'KAIF_CRUD_POSTGRES_PORT',
      database: 'KAIF_CRUD_POSTGRES_DB_NAME',
      user: 'KAIF_CRUD_POSTGRES_USER',
      password: 'KAIF_CRUD_POSTGRES_PASSWORD',
    };

    for (const key in postgresVars) {
      const varName = postgresVars[key];
      const value = process.env[varName];

      if (!value) {
        throw new Error(`ENV var with name ${varName} not found`);
      }

      postgresVars[key] = value;
    }

    return postgresVars;
  };

  const getDevEnv = () => ({
    host: '127.0.0.1',
    port: '5433',
    database: 'kaifcrud',
    user: 'kaifcrud',
    password: 'kaifcrud',
  });

  if (production) {
    return getFromEnv();
  } else {
    return getDevEnv();
  }
};


const config = {
  db: {
    postgres: getPostgresConfig(),
  },
  crudProtoPath: __dirname + '/../protos',
  grpcServerHost: '0.0.0.0:50055',
};

module.exports = config;
