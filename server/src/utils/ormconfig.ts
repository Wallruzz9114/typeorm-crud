import { ConnectionOptions } from 'typeorm';

const dbConfig: ConnectionOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  logging: true,
  synchronize: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
};

console.log(dbConfig);

export default dbConfig;
