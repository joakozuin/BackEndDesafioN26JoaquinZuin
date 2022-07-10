import passport from "passport";
import { Strategy } from "passport-local";

import { encriptar,comparar } from "./encriptar.js";

//import Usuario from "../models/usuario.js";
//import {usuariosDao as Usuario} from "../daos/index.js";
import {usuariosDao as Usuario} from "../daos/index.js";
const LocalStrategy = Strategy 

passport.use('registro',new LocalStrategy(
    {
      usernameField:'nombre',
      passwordField:'password',
      passReqToCallback:true
    },
    async(req,nombre,password,done)=>{

      console.log('1-registro passport')

     const usuarioBD = await Usuario.findNombre(nombre)

     console.log('2-registro passport')
     console.log(usuarioBD)

      if(usuarioBD.usuario){

       return done(null,false)

       }

       /* const usuarioNuevo = new usuariosDao()
       usuarioNuevo.nombre = nombre
       //usuarioNuevo.contrasena = password
       usuarioNuevo.contrasena = 
       await usuarioNuevo.save() */

       const us={
        nombre:nombre,
        contrasena:encriptar(password)
       }

       const usuarioNuevo=Usuario.create(us)
       done(null, usuarioNuevo)

    }

))

passport.use('login',new LocalStrategy({
    usernameField:'nombre',
    passwordField:'password',
    passReqToCallback:true
},
  async(req,nombre,password,done) => {

    const usuarioBD = await Usuario.findNombre(nombre)

    if(!usuarioBD.usuario){

      console.log('Passport Login No existe Usuario')
      return done(null,false)
 
    }

    const usPassBD=usuarioBD.usuario.contrasena
    
    const usP=comparar(password,usPassBD)

    if(usuarioBD && usP){

      console.log('Passport Login Existe Usuario')
      return done(null, usuarioBD)

     }
     
}

))


//Magia de passport
//usuario es un argumento q utiliza para hacer
//magia puede tener otro nombre, pero parece q se debe
//repetar ese nombre en la serealización y deserealización
passport.serializeUser((usuario,done)=>{

  console.log('Passport Serializando el usuario')
  console.log(usuario)
  console.log(usuario.usuario._id)

    done(null,usuario.usuario._id)
})

passport.deserializeUser(async(id,done)=>{
  console.log('Passport desSerializando el usuario')
  console.log(id)
  
    const usuario = await Usuario.findById(id)

    console.log(usuario)

    done(null,usuario)
})

