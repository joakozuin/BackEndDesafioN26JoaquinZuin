import mongoose from "mongoose"

export const usuariosEsquema = new mongoose.Schema({
    nombre:String,
    contrasena:String,
    correo:String
})



