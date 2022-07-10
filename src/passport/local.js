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

    const usPassBD=usuarioBD.usuario.contrasena

    const usP=comparar(password,usPassBD)

    if(usuarioBD && usP){

      return done(null, usuarioBD)

     }

     done(null,false)

}

))


//Magia de passport
//usuario es un argumento q utiliza para hacer
//magia puede tener otro nombre, pero parece q se debe
//repetar ese nombre en la serealización y deserealización
passport.serializeUser((usuario,done)=>{
    done(null,usuario.id)
})

passport.deserializeUser(async(id,done)=>{
    const usuario = await Usuario.findById(id)
    done(null,usuario)
})

