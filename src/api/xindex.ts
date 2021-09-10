import { ApolloServer } from 'apollo-server-express'
import {
    ApolloServerPluginInlineTraceDisabled,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import buildFederatedSchema from '../helpers/buildFederatedSchema'
import Resolvers from './user/resolver'
import dotenv from 'dotenv'
import express from 'express'
import { graphqlUploadExpress } from 'graphql-upload'

export default async function listen(port: number): Promise<string> {
    const app = express()
    dotenv.config({
        path: '.env',
    })
    const url = `http://localhost:${port}/graphql`

    const schema = await buildFederatedSchema(
        {
            resolvers: [Resolvers],
        }
    );

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginInlineTraceDisabled(),
            ApolloServerPluginLandingPageGraphQLPlayground()
        ],
        context: ({ req, res }) => ({ req, res })
    })

    await server.start()
    app.use(graphqlUploadExpress())
    server.applyMiddleware({app})

    app.listen({ port })
    console.log(`Accounts service ready at ${url}`)
    console.log(url)
    return url
}
