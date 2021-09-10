import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
  } from 'typeorm'
  import { ObjectType, Field, ID } from 'type-graphql'
  
  @ObjectType('AddressEntity', { description: 'Object representing file address' })
  @Entity('fileaddress')
  export default class AddressEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({name: 'file_id'})
    file_id: number
  
    @Field()
    @Column('text', {name: 'user_id'})
    user_id: number
  
    @Field()
    @Column('text', { unique: true, name: 'filename' })
    filename: string
  }
  