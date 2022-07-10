import bcrypt from 'bcrypt'

export const encriptar=(contrasena)=>{

    return bcrypt.hashSync(contrasena,bcrypt.genSaltSync(5))
}

export const comparar=(contrasena,usPw)=>{

    return bcrypt.compareSync(contrasena,usPw)
}