import UsersEntity from './entity'
import {Resolver, Mutation, Arg, Query} from 'type-graphql'
import StorageInput from './inputs/StorageInput'
import UserRepository from './repository'

@Resolver(() => UsersEntity)
export default class UserResolver{
  private address = UserRepository()

  @Query(() => [UsersEntity])
  async getFiles(): Promise<UsersEntity[]> {
    const address = await this.address.getUsers().catch((err) => {
      console.error(err)

      throw Error(err)
    })
    return address
  }

  @Mutation(() => UsersEntity)
  async uploadFiles(
    @Arg('input') storageInput: StorageInput
  ): Promise<UsersEntity> {
    const storageInp = storageInput

    const address = await this.address.create(storageInp).catch((err) => {
      console.error(err)

      throw Error(err)
    })

    return address
  }
}