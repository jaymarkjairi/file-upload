import { ObjectType, Field } from 'type-graphql'
import { ISingleUpload } from '../interface/ISingleUpload'

@ObjectType('SingleUploadResponse')
export default class SingleUploadResponse implements ISingleUpload {
  @Field()
  url: string
}
