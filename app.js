/****************************************************************************************/
/*  Archivo JS que permite configurar el HTML de la app "sortear amigos"                */
/****************************************************************************************/
/*                             ****FUNCIONES****                                        */
/****************************************************************************************/
/*  agregarAmigo() -- Se agrega un nuevo amigo al arreglo amigos                        */
/*  recorrerArreglo() -- Recorre el arreglo amigos y los lista en el HTML               */
/*  sortearAmigo() -- Entrega el nombre de un amigo aleatoriamente                      */
/*  verificarArrayAmigos() -- Verifica que hay amigos en el arreglo                     */
/*  permitirSoloLetras() -- Verifica que se ingresen letras y numeros a un input*/
/****************************************************************************************/


//creacion arreglo de listados de amigos.-
let amigos=[];

//selectores de la app como el input de amigos, el boton de añadir y las listas para mostrar
//los amigos agregados y el resultado del amigo secreto.-
const inputAmigos = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");
const listaResultados = document.getElementById("resultado");

//Se verifica que el input de amigos no se encuentre vacio de lo contrario lo almacena en el 
//arreglo amigos.
function agregarAmigo(){
    if(inputAmigos.value === ""){
        alert("Por favor, inserte un nombre.");
    }else{
        let validarInputAmigo = permitirSoloLetras(inputAmigos.value);
        console.log(validarInputAmigo);
        if(validarInputAmigo){
            amigos.push(inputAmigos.value);
            recorrerArreglo();
        }else{
            alert("El nombre no cumple con las politicas, deben ser solo letras, minimo 3 y maximo 15!");
        }
      
        inputAmigos.value="";
    }
}

//Recorre el arreglo y agrega los amigos que hay disponible al HTML.
function recorrerArreglo(){
    listaAmigos.innerHTML="";
    for (let i = 0; i < amigos.length; i++) {
        let li = document.createElement("li");
        li.innerHTML=amigos[i];
        listaAmigos.appendChild(li);
    }    
}

function sortearAmigo(){
    //limpar las listas antes de mostrar los datos
    listaAmigos.innerHTML="";
    listaResultados.innerHTML="";

    //se agregan los atributos disabled al input y boton de agregar amigos
    //al presionar el boton de sortear amigos
    inputAmigos.setAttribute("disabled", "disabled");
    inputAmigos.nextElementSibling.setAttribute("disabled", "disabled");
    //verifica si el arreglo tiene amigos en el arreglo
    //SI tiene amigos en el arreglo, sortea un indice al azar del arreglo y lo muestra en el HTML
    //y elimina ese amigo del arreglo para que cuando vuelva a sortear solo se muestren los amigos
    //que quedan.
    //en el caso de NO tener amigos envia una alerta que no existen amigos en el arreglo y
    //se activa el input y boton para nuevamente ingresar amigos al arreglo y volver a jugar
    if(verificarArrayAmigos()){
        let indiceAmigoSorteado = Math.floor((Math.random()*amigos.length));
        listaResultados.append(amigos[indiceAmigoSorteado]);
        amigos.splice(indiceAmigoSorteado,1);
        console.log(amigos);
    }else{
        alert("No hay amigos para sortear!");
        inputAmigos.removeAttribute("disabled");
        inputAmigos.nextElementSibling.removeAttribute("disabled");
    }
    
}

//ver si el arreglo amigos se encuentra con datos
function verificarArrayAmigos(){
    return Array.isArray(amigos) && amigos.length !== 0;
}

//funcion que permite verificar que el input que le entregemos solo contenga letras y numeros
function permitirSoloLetras(input){
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]\d{3,15}$/;
    return regex.test(input);
}



