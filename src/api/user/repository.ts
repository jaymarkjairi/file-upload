import {
    EntityRepository,
    AbstractRepository,
    getCustomRepository,
} from 'typeorm'
import RegisterUserInput from './inputs/RegisterUserInput'
import UsersEntity from './entity'

@EntityRepository(UsersEntity)
export class UserRepository extends AbstractRepository<UsersEntity> {

    getUsers(): Promise<UsersEntity[]> {
        const user = this.repository.find()
        return user
      }

    create(createInput: RegisterUserInput): Promise<UsersEntity> {
        const user = this.repository.create(createInput)

        return user.save()
    }

}

const getUserRepository = (): UserRepository => {
    const userRepository = getCustomRepository(UserRepository)
    return userRepository
}

export default getUserRepository