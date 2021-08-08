addEventListener("load", load);
var NombreServidor = "https://servidordestino.herokuapp.com/";
var ServidorAplicacion = "https://appdestino.herokuapp.com/";

function $(demo){
    return document.getElementById(demo);
}

function load(){
    enviarMensajeAlServidorPorGET(NombreServidor + "Destino", cargarOpcionesDestino);
    $("destino").addEventListener("change", cambiarDestino);
}

function cambiarDestino() {
    var valorProvincia = $("provincia").value;
    enviarMensajeAlServidor(servidor + "/Departamento/" + valorProvincia,cargarOpcionesLocalidad);
}

function cargarOpcionesDestino(valor) {
    var destinos = JSON.parse(valor);
    destinos.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
    var opciones = ['<option value=0>Seleccione un destino</option>'];

    destinos.forEach(element => {
        opciones.push('<option value="' + element.idDestino + '">' + element.nombre + '</option>');
    });

    $("destino").innerHTML = opciones;
}

function cargarOpcionesLocalidad(valor) {
    var localidades = JSON.parse(valor);
    localidades.sort(function (x, y) { return x.nombre.localeCompare(y.nombre) });
    var opciones = []

    localidades.forEach(element => {
        opciones.push('<option value="' + element.valor + '">' + element.nombre + '</option>');
    });
    $("localidad").innerHTML = opciones;
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