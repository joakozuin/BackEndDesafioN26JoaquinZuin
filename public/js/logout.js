

cargarLogout=()=>{

  console.log("Cargando Despedida....")

  // Petición HTTP Renderiza el usuario Logeado
  fetch("http://localhost:8080/api/login/logout")
  .then((respuesta) =>{

        return respuesta.json()

     })

  .then(data=>{
   //const nombreUs=JSON.parse(data)
   console.log('Nombre del usuario logeado')
   console.log(data)
   console.log(data.nombre)
        nombreUsuario = {
          titulo: "Renderizado Usuario Usando Motor Handlebars",
          usuario:data.nombre
          };

          console.log(nombreUsuario)

          let template = document.getElementById("handlebLogoutUsuario").innerHTML;
          let compile = Handlebars.compile(template);
         
          let compiledHTML = compile(nombreUsuario);
         
          document.getElementById('rendLogoutUsuario').innerHTML=compiledHTML

           
        })  
               
};

cargarLogout()





