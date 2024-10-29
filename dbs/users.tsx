import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


// @Entity({ database: "secondDB" })
@Entity('Users')
export class Users {
    @PrimaryGeneratedColumn()
    id?: number;


    @Column()
    usuario?: string;


    @Column()
    contraseña?: string;
}
export default Users;