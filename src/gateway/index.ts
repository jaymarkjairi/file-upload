import 'reflect-metadata'
import { ApolloGateway } from '@apollo/gateway'
import { ApolloServer } from 'apollo-server-express'

import templateListenAt from '../api'
// import fileServerListenAt from '../fileserver'
import {
    ApolloServerPluginInlineTraceDisabled,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import express from 'express'
import { ConnectionOptions, createConnection } from "typeorm"
import Entities from '../api/entities'
import dotenv from 'dotenv'
import FileUploadDataSource from '@profusion/apollo-federation-upload'

import { graphqlUploadExpress } from 'graphql-upload'

async function startServer(): Promise<void> {
    const app = express()
    // const port = process.env.API_PORT
    const uri = `http://localhost:4000`

    dotenv.config({
        path: '.env',
    })


    const serviceList = [
        { name: 'template', url: await templateListenAt(4001) },
        // { name: 'fileserver', url: await fileServerListenAt(4002) }
    ]

    const gateway = new ApolloGateway({
        buildService: ({ url }) => new 
        FileUploadDataSource({ 
            url, 
            useChunkedTransfer: true 
        }),
        serviceList
    })

    const { schema, executor } = await gateway.load()

    const options: ConnectionOptions = {
        type: 'postgres',
        host: process.env.TYPEORM_HOST,
        port: 5432,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        logging: true,
        synchronize: process.env.NODE_ENV !== 'production',
        entities: Entities,
    }

    await createConnection(options)

    const server = new ApolloServer({
        schema,
        executor,
        plugins: [
            ApolloServerPluginInlineTraceDisabled(),
            ApolloServerPluginLandingPageGraphQLPlayground()
        ],
        context: ({ req, res }) => ({ req, res })
    })

    await server.start()
    app.use(graphqlUploadExpress())
    server.applyMiddleware({ app })


    app.listen(4000)
    console.log(`Accounts service ready at ${uri}/graphql`)

}
startServer().catch(console.error)