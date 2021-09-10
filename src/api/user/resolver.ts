import UsersEntity from './entity'
import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import RegisterUserInput from './inputs/RegisterUserInput'
import UserRepository from './repository'
import SingleUploadResponse from './response/SingleUploadResponse'
import {GraphQLUpload, FileUpload} from 'graphql-upload'

@Resolver(() => UsersEntity)
export default class UserResolver {
  private users = UserRepository()

  @Query(() => [UsersEntity])
  async getUsers(): Promise<UsersEntity[]> {
    const user = await this.users.getUsers().catch((err) => {
      console.error(err)

      throw Error(err)
    })
    return user
  }

  @Mutation(() => UsersEntity)
  async registerUser(
    @Arg('input') createInput: RegisterUserInput
  ): Promise<UsersEntity> {
    const userInp = createInput

    const user = await this.users.create(userInp).catch((err) => {
      console.error(err)

      throw Error(err)
    })

    return user
  }

  @Mutation(() => SingleUploadResponse)
  async simpleTests(
    @Arg('args', () => GraphQLUpload) fileUpload: FileUpload
  ): Promise<SingleUploadResponse> {
    const { filename } = fileUpload
    return { url: filename }
  }
}