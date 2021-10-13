import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity('user')
export class UserEntity  extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        const salt = 10
        this.password = await bcrypt.hash(this.password, salt)
    }
}