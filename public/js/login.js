

cargarLogin=()=>{

  console.log("Cargando formulario Login")

 let template = document.getElementById("handlebLogin").innerHTML;
 let compile = Handlebars.compile(template);

 let compiledHTML = compile();

 document.getElementById('rendLogin').innerHTML=compiledHTML
               
};


cargarLogin()



const botonLogin=document.querySelector("#enviarLogin")
//const botonRegist=document.querySelector("#enviarLogin")


//Enviar Logeando al cliente
//
botonLogin.addEventListener("click", (e) => {

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

  fetch("http://localhost:8080/api/login/", {
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
      console.log("2-Nombre Usuario:", data.nombre);
      console.log("2-Error         :", data.error);

    //cargar una pagina HTML
    //

     location.assign("http://localhost:8080/productos.html");

    })
    .catch((error) => {
      console.error("Error:", error);
    });

}); 

 