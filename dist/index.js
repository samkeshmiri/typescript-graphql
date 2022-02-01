import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import cors from "cors";
import { redis } from "./redis";
import session from "express-session";
import { createSchema } from "./utils/createSchema";
const main = async () => {
    await createConnection();
    const schema = await createSchema();
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
    });
    const app = Express();
    const RedisStore = require('connect-redis')(session);
    app.use(cors({
        credentials: true,
        origin: ["https://studio.apollographql.com", "http://localhost:4000"]
    }));
    app.set('trust proxy', 1);
    app.use(session({
        store: new RedisStore({
            client: redis
        }),
        name: "usercookie",
        secret: "qwerty",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: false,
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
            sameSite: 'none',
            secure: true
        },
    }), Express.json());
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log('server started on http://localhost:4000/graphql');
    });
};
main();
//# sourceMappingURL=index.js.map