import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('increment')
    public id?: number;

    @Column('varchar', { length: 255, nullable: true})
    public firstName?: string;

    @Column('varchar', { length: 255, nullable: true})
    public lastName?: string;

    constructor(id?: number, firstName?: string, lastName?: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

}
