addEventListener("load", load);
var NombreServidor = "https://servidordestino.herokuapp.com/";
//var NombreServidor = "http://localhost:666/Acceso/";
//var NombreServidor = "https://servidoredi.herokuapp.com/";
//var NombreServidor = "/ServidorEDI/";

function $(demo){
    return document.getElementById(demo);
}

function load(){
    document.getElementById('nombre_usuario').addEventListener("keyup", validar);
    document.getElementById('contrasena').addEventListener("keyup", validar);

    document.getElementById('boton_ingreso').addEventListener("click", click);
}

function validar(){

    var nombre_usuario = document.getElementById('nombre_usuario').value.length;
    var contrasena = document.getElementById('contrasena').value;

    var patt = new RegExp(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/);

    var res = patt.test(contrasena);

    if( nombre_usuario >=6 && res ){
        $('boton_ingreso').disabled = false;
    }else{
        $('boton_ingreso').disabled = true;
    }
}

function click(){
    $("boton_ingreso").disabled = true;
    
    //var nombre_usuario = $("nombre_usuario").value;
    //var contrasena = $("contrasena").value;
    
    enviarMensajeAlServidorPorPOST(NombreServidor, respuestaServidor);
    //enviarMensajeAlServidorPorGET(NombreServidor + "?nombre_usuario=" + nombre_usuario + "&contrasena=" + contrasena, respuestaServidor);
}

function respuestaServidor(respuesta){

    if(respuesta == "perfil.html"){
        window.location.assign(NombreServidor + respuesta);
    }
    else{
        $("nombre_usuario").value = "";
        $("contrasena").value = "";
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
    datos.append("nombre",$("nombre_usuario").value);
    datos.append("contrasena",$("contrasena").value);

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