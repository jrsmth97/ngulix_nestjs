import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    name: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    email: string

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        // select: false,
    })
    password: string

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    created_at: Date

}