import MongoClass from '../../contenedor/MongoClass.js'
import { usuariosEsquema } from "../../modelo/UsuariosEsquema.js"

export class MongoDBUsuarios extends MongoClass{

  constructor(){
      //nombre de la coleccion y el esquema
      //
      super('usuarios',usuariosEsquema)
  }

}