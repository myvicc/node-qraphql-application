import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"

import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

import {typeDefs, resolvers} from "./graphql/graphql";

async function bootstrap() {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
    });

    await server.start();

    app.use(
        "/",
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async ({req}) => ({token: req.headers.token})
        })
    );

    await new Promise(resolve => httpServer.listen(3000, resolve));

    console.log(`🚀 Server ready at http://localhost:3000/`)

}
bootstrap().catch(err => console.log(err))