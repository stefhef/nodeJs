import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "varchar", length: 50} )
    name!: string

    @Column(({ type: "int" }))
    age!: number
}