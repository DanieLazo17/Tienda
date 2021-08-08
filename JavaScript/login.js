addEventListener("load", load);
var NombreServidor = "https://servidordestino.herokuapp.com/";
var ServidorAplicacion = "https://appdestino.herokuapp.com/";

//Revisado
//var NombreServidor = "http://localhost:666/";
//var NombreServidor = "https://servidoredi.herokuapp.com/";
//var NombreServidor = "/ServidorEDI/";

function $(demo){
    return document.getElementById(demo);
}

function load(){
    document.getElementById('txtUsuario').addEventListener("keyup", validar);
    document.getElementById('txtContrasena').addEventListener("keyup", validar);

    document.getElementById('btnIngreso').addEventListener("click", click);
}

function validar(){

    var nombre_usuario = document.getElementById('txtUsuario').value.length;
    var contrasena = document.getElementById('txtContrasena').value;

    var patt = new RegExp(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/);

    var res = patt.test(contrasena);

    if( nombre_usuario >=6 && res ){
        $('btnIngreso').disabled = false;
    }else{
        $('btnIngreso').disabled = true;
    }
}

function click(){
    $("btnIngreso").disabled = true;
    
    //var nombre_usuario = $("nombre_usuario").value;
    //var contrasena = $("contrasena").value;
    
    enviarMensajeAlServidorPorPOST(NombreServidor, respuestaServidor);
    //enviarMensajeAlServidorPorGET(NombreServidor, respuestaServidor);
}

function respuestaServidor(respuesta){

    if(respuesta == "perfil.html"){
        window.location.assign(ServidorAplicacion + respuesta);
    }
    else{
        $("txtUsuario").value = "";
        $("txtContrasena").value = "";
        $("demo").innerHTML = respuesta;
    }
}

function enviarMensajeAlServidorPorGET(servidor, funcionARealizar){

    //Declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //Indico hacia donde va el mensaje
    xmlhttp.open("GET", servidor, true);

    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState == XMLHttpRequest.DONE){

            if(xmlhttp.status == 200){
                funcionARealizar(xmlhttp.responseText);
            }
            else{
                alert("Ocurrió un error");
            }
        }
    }
    //Envio el mensaje
    xmlhttp.send();
}

function enviarMensajeAlServidorPorPOST(servidor, funcionARealizar){

    //Declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //Declaro un objeto del tipo formData
    var datos = new FormData();
    datos.append("nombre",$("txtUsuario").value);
    datos.append("contrasena",$("txtContrasena").value);

    //Indico hacia donde va el mensaje
    xmlhttp.open("POST", servidor, true);

    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState == XMLHttpRequest.DONE){

            if(xmlhttp.status == 200){
                funcionARealizar(xmlhttp.responseText);
            }
            else{
                alert("Ocurrió un error");
            }
        }
    }
    //Definimos que estamos enviando
    //xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //xmlhttp.setRequestHeader("Content-type", "multipart/form-data");
    xmlhttp.setRequestHeader("enctype", "multipart/form-data");

    //Envio el mensaje en el cuerpo del mensaje
    xmlhttp.send(datos);
}