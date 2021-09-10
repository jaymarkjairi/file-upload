import { Field, InputType } from 'type-graphql'
import { Directive } from 'type-graphql'


@Directive(`@key(fields:"user_id")`)
@InputType('StorageInput')
export default class StorageInput {
  @Field(() => String)
  user_id: number

  @Field(() => String)
  filename: string
}
