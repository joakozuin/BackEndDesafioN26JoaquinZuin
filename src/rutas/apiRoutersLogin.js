import { Router } from "express";
import passport from 'passport'

const router = Router()

function isAuth(req,res,next){

    if(req.isAuthenticated()){
    
        next()
    } else {
        res.render('login')
    }
}

const joaLogin=(req,res,next)=>{
    console.log('Ingreso al Login')
    console.log(req.body)
    console.log(`Nombre:${req.body.nombre}`)
    console.log(`Password:${req.body.password}`)
    next()
}


router.post('/registro',joaLogin, passport.authenticate('registro',{
    failureRedirect:'/errorRegistro',
    successRedirect:'/registro',
}))


router.get('/registro',(req,res)=>{
    //res.render('registro')

    console.log('Registro Sin error')

    const usuario={
        nombre:req.nombre,
        error:false
    }
    res.json(usuario)
})


router.get('/errorRegistro',(req,res)=>{

    console.log('Registro Error')

    //res.render('errorRegistro')
    const usuario={
        nombre:req.nombre,
        error:true
    }
    res.json(usuario)
})


router.post('/' , joaLogin,passport.authenticate('login',{
    failureRedirect:'/api/login/errorLogin',
    successRedirect:'/api/login/datos', //redirecciona a una ruta
}))


router.get('/errorLogin',(req,res)=>{
    //res.render('errorLogin')
    console.log('Login con Error')

    res.json({
        mensaje:'Login con error',
        nombre:req.user.nombre,
        error:false
    })

})

/* router.get('/datos',isAuth,(req,res)=>{
    //res.render('info',{nombre:req.user.nombre})

}) */

router.get('/datos',(req,res)=>{
    //res.render('info',{nombre:req.user.nombre})
    console.log('Login Sin error')

    res.json({
        mensaje:'Login sin error',
        nombre:req.user.nombre,
        error:false
    })
})

router.get('/logout',(req,res)=>{

    req.session.destroy(err=>{
        res.redirect('/')

    })
})

router.get('/',(req,res)=>{

     res.render('login')
    //res.send('Hola')
})

export default router