import { Field, InputType } from 'type-graphql'

@InputType('RegisterUserInput')
export default class RegisterUserInput {
  @Field(() => String)
  firstname: string

  @Field(() => String)
  lastname: string

  @Field(() => String)
  username: string

  @Field(() => String)
  password: string

  @Field(() => String)
  email: string

  @Field(() => String)
  profileurl: string

  @Field(() => String)
  phonenumber: string

  @Field(() => String)
  status: string

  @Field(() => String)
  address: string
}
