'use strict';

const production = false;

const getPostgresConfig = () => {

  const getFromEnv = () => {
    const postgres = {
      host: 'KAIF_CRUD_POSTGRES_HOST',
      port: 'KAIF_CRUD_POSTGRES_PORT',
      database: 'KAIF_CRUD_POSTGRES_DB_NAME',
      user: 'KAIF_CRUD_POSTGRES_USER',
      password: 'KAIF_CRUD_POSTGRES_PASSWORD',
    };

    for (const key in postgres) {
      const varName = postgres[key];
      const value = process.env[varName];

      if (!value) {
        throw new Error(`ENV var with name ${varName} not found`);
      }

      postgres[key] = value;
    }

    return postgres;
  };

  const getDevEnv = () => ({
    host: '127.0.0.1',
    port: '5432',
    database: 'postgres',
    user: 'postgres',
    password: 'postgrespw',
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
};

module.exports = config;
