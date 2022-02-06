import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import UserRoutes from './routes/user.routes';
import dbConfig from './utils/ormconfig';

const main = async (): Promise<void> => {
  const serverPort = 3000;
  const websitePort = 4200;
  const app = express();

  await createConnection(dbConfig);

  app.use(
    cors({
      origin: `http://localhost:${websitePort}`,
      credentials: true,
    })
  );

  app.use(UserRoutes);

  app.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`);
  });
};

main().catch((error) => {
  console.log(error);
});
