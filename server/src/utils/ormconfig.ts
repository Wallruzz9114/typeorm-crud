import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { root } from '../paths';

dotenv.config();

const dbConfig: ConnectionOptions = {
  type: 'sqlite',
  database: `${root}/db/crud.sqlite`,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
};

console.log(dbConfig);

export default dbConfig;
