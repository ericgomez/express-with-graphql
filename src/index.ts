import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import depthLimit from 'graphql-depth-limit';
import cors from 'cors';
import { executableSchema } from './graphql/index.js';
import MongoLib from './mongo/index.js';
import config from './config/index.js';

const app = express();
const httpServer = createServer(app);

const server = new ApolloServer({
  schema: executableSchema,
  validationRules: [depthLimit(2)], // limita la profundidad máxima de las consultas entrantes.
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async () => await MongoLib,
  })
);

await new Promise<void>((resolve) => httpServer.listen({ port: config.port }, resolve));
console.log(`🚀 Server ready at http://localhost:${config.port}/graphql`);
