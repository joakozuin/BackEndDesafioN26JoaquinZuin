import { Router } from "express";
import passport from 'passport'

const router = Router()

function isAuth(req,res,next){

    if(req.isAuthenticated()){
    
        next()
    } else {
        res.redirect('/api/login/errorLogin')
    }
}

const joaLogin=(req,res,next)=>{
    console.log('Ingreso al Login')
    console.log(req.body)
    console.log(`Nombre:${req.body.nombre}`)
    console.log(`Password:${req.body.password}`)
    next()
}




router.post('/registro', passport.authenticate('registro',{
    failureRedirect:'/api/login/errorRegistro',
    successRedirect:'/api/login/registrar',
}))

router.get('/registrar',(req,res)=>{
    //res.render('registro')
    console.log('Registro Sin error')
    res.json({
        mensaje:'Registro sin error',
        nombre:req.user[0].nombre,
        error:false
    })
})


router.get('/errorRegistro',(req,res)=>{
    console.log('Registro Error')
    //res.render('errorRegistro')
    res.json({
        mensaje:'Registro con error',
        nombre:'',
        error:true
    })
})


router.post('/' ,passport.authenticate('login',{
    failureRedirect:'/api/login/errorLogin',
    successRedirect:'/api/login/datos', //redirecciona a una ruta
    failureMessage:true,
    successMessage:true
}),)


router.get('/errorLogin',(req,res)=>{
    //res.render('errorLogin')
    console.log('ruta errorLogin-Login con Error')
    //console.log(req.user[0].nombre)
    res.json({
        mensaje:'Login con error',
        nombre:'',
        error:true
    })

})

/* router.get('/datos',isAuth,(req,res)=>{
    //res.render('info',{nombre:req.user.nombre})

}) */

router.get('/datos',isAuth,(req,res)=>{
    //res.render('info',{nombre:req.user.nombre})
    console.log('ruta datos-Login sin Error')
    res.json({
        mensaje:'Login sin error',
        nombre:req.user[0].nombre,
        error:false
    })
})

router.get('/logout',(req,res)=>{

    const nombre=req.user[0].nombre

    req.session.destroy(err=>{
       res.json({
        mensaje:'Solicitando nombre usuario deslogeado',
        nombre:nombre,
        error:false
    })

    })
})

router.get('/',(req,res)=>{

    //res.render('login')
    console.log('ruta datos-Login usuario logeado')
    console.log(req.user[0].nombre)
    res.json({
        mensaje:'Solicitando nombre usuario logeado',
        nombre:req.user[0].nombre,
        error:false
    })
})

export default router