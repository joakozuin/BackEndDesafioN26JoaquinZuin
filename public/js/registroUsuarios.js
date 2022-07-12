

cargarRegistro=()=>{

  console.log("Cargando formulario Registro")

 let template = document.getElementById("handlebRegistro").innerHTML;
 let compile = Handlebars.compile(template);

 let compiledHTML = compile();

 document.getElementById('rendRegistro').innerHTML=compiledHTML
               
};


cargarRegistro()



const botonRegistro=document.querySelector("#enviarRegistro")
//const botonRegist=document.querySelector("#enviarLogin")


//Enviar Logeando al cliente
//
botonRegistro.addEventListener("click", (e) => {

  e.preventDefault()

  const inputNombre = document.querySelector("#nombreLogin").value;
  const inputContrasena = document.querySelector("#contrasenaLogin").value;

  const usuario = {
    nombre: inputNombre,
    password: inputContrasena,
  };

  console.log("Cliente pidiendo acceso al servidor");
  console.log(usuario)

                      //socket.emit("nuevoProducto", producto);

  //Petición Post HTTP envia producto a la ruta
  //en formato JSON

  fetch("http://localhost:8080/api/login/registro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  })
    .then((respuesta) =>{
          console.log("1-Todo bien:", respuesta.url);
          return respuesta.json()
    } )
    .then((data) => {
      console.log(data);
      console.log("2-Mensaje       :", data.mensaje);
      console.log("2-Nombre Usuario:", data.nombre);
      console.log("2-Error         :", data.error);

    //cargar una página HTML
    //
       if(data.error){
        location.assign("http://localhost:8080/errorRegistro.html");
       }else{
        location.assign("http://localhost:8080/index.html");
       }

    })
    .catch((error) => {
      console.error("Error:", error);
    });

}); 

 