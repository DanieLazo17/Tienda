addEventListener("load", load);
//var NombreServidor = "https://servidoredi.herokuapp.com/";
var NombreServidor = "/ServidorEDI/";

function $(demo){
    return document.getElementById(demo);
}

function load(){
    document.getElementById('usuario_nuevo').addEventListener("keyup", validar);
    document.getElementById('contrasena_nueva').addEventListener("keyup", validar);
    document.getElementById('contrasena_repetida').addEventListener("keyup", validar);

    document.getElementById('usuario_nuevo').addEventListener("change", change);

    document.getElementById('boton_subir').addEventListener("click", click);
}

function change(){
    validarUsuarioEnServidor(NombreServidor, respuestaDeValidacion);
}

function respuestaDeValidacion(respuesta){

    if(respuesta){
        $("mensaje").style.color = 'red';
        $("mensaje").innerHTML = "Nombre de usuario duplicado";
    }
    else{
        $("mensaje").style.color = 'green';
        $("mensaje").innerHTML = "Nombre de usuario correcto";
    }
}

function validarUsuarioEnServidor(servidor, funcionARealizar){

    //Declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //Declaro un objeto del tipo formData
    var datos = new FormData();
    datos.append("usuarioNuevo",$("usuario_nuevo").value);

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
    xmlhttp.setRequestHeader("enctype", "multipart/form-data");

    //Envio el mensaje en el cuerpo del mensaje
    xmlhttp.send(datos);
}

function validar(){
    var usuario_nuevo = document.getElementById('usuario_nuevo').value.length;
    var contrasena_nueva = document.getElementById('contrasena_nueva').value;
    var contrasena_repetida = document.getElementById('contrasena_repetida').value;

    var patt = new RegExp(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/);

    var resultado_contrasena = patt.test(contrasena_nueva);
    var resultado_contrasena_repetida = patt.test(contrasena_repetida);

    if(usuario_nuevo >=6){
        $("restLongCaracteres").style.color = 'green';
    }else{
        $("restLongCaracteres").style.color = 'gray';
    }

    if( usuario_nuevo >=6 && resultado_contrasena && resultado_contrasena_repetida ){
        $("boton_subir").disabled = false;
    }else{
        $("boton_subir").disabled = true;
    }
}

function click(){
    $("boton_subir").disabled = true;
    
    var contrasena_nueva = $("contrasena_nueva").value;
    var contrasena_repetida = $("contrasena_repetida").value;
    
    if(contrasena_nueva == contrasena_repetida){
        enviarMensajeAlServidorPorPOST(NombreServidor, respuestaServidor);
    }
    else{
        $("mensaje").style.color = 'red';
        $("mensaje").innerHTML = "Las contraseñas no coinciden";
    }
}

function respuestaServidor(respuesta){

    if(respuesta == "perfil.html"){
        window.location.assign(NombreServidor + respuesta);
    }
    else{
        $("usuario_nuevo").value = "";
        $("contrasena_nueva").value = "";
        $("contrasena_repetida").value = "";
        $("demo").innerHTML = respuesta;
    }
}

function enviarMensajeAlServidorPorPOST(servidor, funcionARealizar){

    //Declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //Declaro un objeto del tipo formData
    var datos = new FormData();
    datos.append("nuevoUsuario",$("usuario_nuevo").value);
    datos.append("nuevaContra",$("contrasena_nueva").value);
    datos.append("nuevaFoto",$("foto_perfil").files[0]);

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
    xmlhttp.setRequestHeader("enctype", "multipart/form-data");

    //Envio el mensaje en el cuerpo del mensaje
    xmlhttp.send(datos);
}