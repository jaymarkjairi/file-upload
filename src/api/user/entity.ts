import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { hash } from 'bcryptjs'


@ObjectType('UsersEntity', { description: 'Object representing User Accounts' })
@Entity('users')
export default class UsersEntity extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({name: 'user_id'})
  user_id: number

  @Field()
  @Column('text')
  firstname: string

  @Field()
  @Column('text')
  lastname: string

  @Field()
  @Column('text', { unique: true })
  username: string

  @Field()
  @Column('text')
  password: string

  @Field()
  @Column('text')
  email: string

  @Field()
  @Column('text')
  profileurl: string

  @Field()
  @Column('text')
  phonenumber: string

  @Field()
  @Column('text')
  status: string

  @Field()
  @Column('text', { unique: true })
  address: string

  @BeforeInsert()
  async setPassword(password: string): Promise<void> {
    this.password = await hash(password || this.password, 12)
  }
}
