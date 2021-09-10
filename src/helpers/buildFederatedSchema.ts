import { specifiedDirectives } from 'graphql'
import {
  printSchema,
  buildFederatedSchema as buildApolloFederationSchema,
} from '@apollo/federation'
import federationDirectives from '@apollo/federation/dist/directives'
import gql from 'graphql-tag'
import { 
  addResolversToSchema, 
  GraphQLResolverMap 
} from 'apollo-graphql'
import {
  buildSchema,
  BuildSchemaOptions,
  createResolversMap,
} from 'type-graphql'

export default async function buildFederatedSchema(
  options: Omit<BuildSchemaOptions, 'skipCheck'>,
  referenceResolvers?: GraphQLResolverMap<any>
) {
  const schema = await buildSchema({
    ...options,
    directives: [
      ...specifiedDirectives,
      ...federationDirectives,
      ...((options.directives || [])),
    ],
    skipCheck: true,
  })

  let federatedSchema = buildApolloFederationSchema({
    typeDefs: gql(printSchema(schema)),
    resolvers: createResolversMap(schema) as any,
  })

  if (referenceResolvers) {
    addResolversToSchema(federatedSchema, referenceResolvers)
  }
  return federatedSchema
}
