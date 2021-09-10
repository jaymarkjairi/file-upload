import { ApolloServer } from 'apollo-server'
import {
  ApolloServerPluginInlineTraceDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import buildFederatedSchema from '../helpers/buildFederatedSchema'
import Resolvers from './resolver'
// import { ConnectionOptions, createConnection } from "typeorm"
// import Entities from './entities'

export default async function listen(port: number): Promise<string> {
  // dotenv.config({
  //   path: '.env',
  // })

  // const options: ConnectionOptions = {
  //   type: 'postgres',
  //   host: process.env.TYPEORM_HOST,
  //   port: 5432,
  //   username: process.env.TYPEORM_USERNAME,
  //   password: process.env.TYPEORM_PASSWORD,
  //   database: process.env.TYPEORM_DATABASE,
  //   logging: true,
  //   synchronize: process.env.NODE_ENV !== 'production',
  //   entities: Entities,
  // }

  // await createConnection(options)

  const schema = await buildFederatedSchema(
    {
      resolvers: [Resolvers],
      // orphanedTypes: [User],
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

  const { url } = await server.listen({ port })
  console.log(`Accounts service ready at ${url}`)

  return url
}
