import Users from './users';
import { dbMSSQL } from '../data-sources';




export async function insertNewUser() {


  // Crea una nueva instancia del modelo Users
  const newUser = new Users();
  newUser.usuario = "Nolberto";
  newUser.contraseña = "1234";  


 


  // Guarda el nuevo usuario en la base de datos
  try {
    dbMSSQL.manager.save(newUser)
    console.log('Nuevo usuario insertado exitosamente');
  } catch (error) {
    console.error('Error al insertar el usuario:', error);
  }
}



users 
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
