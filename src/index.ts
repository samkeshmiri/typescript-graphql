import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import cors from "cors";
import { redis } from "./redis";
import session from "express-session";
import { createSchema } from "./utils/createSchema";
import 'reflect-metadata';
import { createConnection, useContainer } from 'typeorm';
import * as typeorm from "typeorm";
import { Container } from "typeorm-typedi-extensions";

useContainer(Container);
typeorm.useContainer(Container);

// import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const main = async () => {

  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }), // pass in func to context key and create context which we can access in resolver
    // access session data in resolver via request object
    // plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
  });

  const app = Express();

  const RedisStore = require('connect-redis')(session);
  // let redisClient = redis.createClient() // client is already created and connected, no need to call ioredis

  app.use(
    cors({
      credentials: true,
      // origin: 'http://localhost:3000' // host for fe expected // react proj default
      origin: ["https://studio.apollographql.com", "http://localhost:4000"]
      // this means the client side app (studio) will be able to retrieve resources from the server on port 4000
    }));

  // session to be applied before getting to resolvers
  app.set(
    'trust proxy', 1
  );

  app.use(
    session({
      store:
        new RedisStore({
          client: redis
        }),
      name: "usercookie", // cookie name
      secret: "qwerty", // secret for cookie - should be in env file and imported in
      resave: false, // constantly creates new session for user
      saveUninitialized: false,
      cookie: {
        httpOnly: false, // so js can't access it if true
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // last 7 years
        sameSite: 'none', // configure endpoint to share cookies with origin in cors
        secure: true // this too
      },
    } as any),
    Express.json()
  );

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('server started on http://localhost:4000/graphql')
  });
}

main();