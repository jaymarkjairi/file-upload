import {
    EntityRepository,
    AbstractRepository,
    getCustomRepository,
} from 'typeorm'
import StorageInput from './inputs/StorageInput'
import AddressEntity from './entity'

@EntityRepository(AddressEntity)
export class UserRepository extends AbstractRepository<AddressEntity> {

    getUsers(): Promise<AddressEntity[]> {
        const address = this.repository.find()
        return address
      }

    create(createInput: StorageInput): Promise<AddressEntity> {
        const user = this.repository.create(createInput)
        return user.save()
    }

}

const getUserRepository = (): UserRepository => {
    const userRepository = getCustomRepository(UserRepository)
    return userRepository
}

export default getUserRepository