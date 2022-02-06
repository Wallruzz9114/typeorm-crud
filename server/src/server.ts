import * as connectRedis from 'connect-redis';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import * as Redis from 'ioredis';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dbConfig from './utils/ormconfig';

const main = async (): Promise<void> => {
  const serverPort = 3000;
  const websitePort = 4200;
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  await createConnection(dbConfig);

  app.use(
    cors({
      origin: `http://localhost:${websitePort}`,
      credentials: true,
    })
  );

  app.use(
    session({
      name: 'cid',
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      },
      secret: process.env.SESSION_SECRET as string,
      saveUninitialized: false,
      resave: false,
    })
  );

  app.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`);
  });
};

main().catch((error) => {
  console.log(error);
});
