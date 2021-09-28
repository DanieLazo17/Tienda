addEventListener("load", load);
var nombreServidor = "https://servidordestino.herokuapp.com/";

//Revisado
//var nombreServidor = "http://localhost:666/";
//var nombreServidor = "https://servidoredi.herokuapp.com/";
//var nombreServidor = "/ServidorEDI/";

function $(demo){
    return document.getElementById(demo);
}

function load(){
    document.getElementById('txtUsuarioNuevo').addEventListener("keyup", validar);
    document.getElementById('txtContrasenaNueva').addEventListener("keyup", validar);
    document.getElementById('txtContrasenaNuevaDup').addEventListener("keyup", validar);

    document.getElementById('txtUsuarioNuevo').addEventListener("change", buscarNombreUsuario);

    document.getElementById('btnSubir').addEventListener("click", click);
}

function buscarNombreUsuario(){
    validarUsuarioEnServidor(nombreServidor + "Usuario/Nuevo", respuestaDeValidacion);
}

function respuestaDeValidacion(respuesta){

    if(respuesta == "Nombre de usuario duplicado"){
        $("mensaje").style.color = 'red';
        $("mensaje").innerHTML = respuesta;
        $("txtContrasenaNueva").disabled = true;
        $("txtContrasenaNuevaDup").disabled = true;
    }
    else{
        $("txtContrasenaNueva").disabled = false;
        $("txtContrasenaNuevaDup").disabled = false;
        $("mensaje").style.color = 'green';
        $("mensaje").innerHTML = respuesta;
    }
}

function validarUsuarioEnServidor(servidor, funcionARealizar){

    //Declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //Declaro un objeto del tipo formData
    var datoDeForm = new FormData();
    datoDeForm.append("usuarioNuevo",$("txtUsuarioNuevo").value);

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
    xmlhttp.send(datoDeForm);
}

function validar(){
    var usuario_nuevo = document.getElementById('txtUsuarioNuevo').value.length;
    var contrasena_nueva = document.getElementById('txtContrasenaNueva').value;
    var contrasena_repetida = document.getElementById('txtContrasenaNuevaDup').value;

    var patt = new RegExp(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/);

    var resultado_contrasena = patt.test(contrasena_nueva);
    var resultado_contrasena_repetida = patt.test(contrasena_repetida);

    if(usuario_nuevo >=6){
        $("restLongCaracteres").style.color = 'green';
    }else{
        $("restLongCaracteres").style.color = 'gray';
    }

    if( usuario_nuevo >=6 && resultado_contrasena && resultado_contrasena_repetida ){
        $("btnSubir").disabled = false;
    }else{
        $("btnSubir").disabled = true;
    }
}

function click(){
    $("btnSubir").disabled = true;
    
    var contrasena_nueva = $("txtContrasenaNueva").value;
    var contrasena_repetida = $("txtContrasenaNuevaDup").value;
    
    if(contrasena_nueva == contrasena_repetida){
        enviarMensajeAlServidorPorPOST(nombreServidor + "Usuario/Registro", respuestaServidor);
    }
    else{
        $("mensaje").style.color = 'red';
        $("mensaje").innerHTML = "Las contraseñas no coinciden";
    }
}

function respuestaServidor(respuesta){

    $("txtUsuarioNuevo").value = "";
    $("txtContrasenaNueva").value = "";
    $("txtContrasenaNuevaDup").value = "";
    $("mensaje").style.color = 'green';
    $("mensaje").innerHTML = respuesta;
    
}

function enviarMensajeAlServidorPorPOST(servidor, funcionARealizar){

    //Declaro el objeto
    var xmlhttp = new XMLHttpRequest();

    //Declaro un objeto del tipo formData
    var datos = new FormData();
    datos.append("nuevoUsuario",$("txtUsuarioNuevo").value);
    datos.append("nuevaContra",$("txtContrasenaNueva").value);
    datos.append("nuevaFoto",$("fileFoto").files[0]);

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