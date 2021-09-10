import { ApolloServer } from 'apollo-server'
import {
  ApolloServerPluginInlineTraceDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import buildFederatedSchema from '../helpers/buildFederatedSchema'
import Resolvers from './resolver'

import { Container } from 'typedi'

export default async function fileServerListen(port: number): Promise<string> {

  const schema = await buildFederatedSchema(
    {
      resolvers: [Resolvers],
      container: Container
    }
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginInlineTraceDisabled(),
      ApolloServerPluginLandingPageGraphQLPlayground()
    ],
    context: ({ req, res }) => ({ req, res })
  });

  const { url } = await server.listen({ port })
  console.log(`File service ready at ${url}`)

  return url
}
