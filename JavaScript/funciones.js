function contarLetras(){

    var nombre = document.getElementById('txtUsuario').value;

    var consonantes = new RegExp(/^[bcdfghjklmnñpqrstvwxyz]*$/);
    var vocales = new RegExp(/^[aeiou]*$/);

    var contadorVocales = 0;
    var contadorConsonantes = 0;

    for(let i=0; i < nombre.length; i++){

        if( vocales.test(nombre[i]) ){
            contadorVocales++;
        }

        if( consonantes.test(nombre[i]) ){
            contadorConsonantes++;
        }
    }
    console.log('Número de vocales en el nombre: ' + contadorVocales);
    console.log('Número de consonantes en el nombre: ' +contadorConsonantes);

    //return document.getElementById('contador').innerHTML = 'Número de vocales en el nombre: ' + contadorVocales + '<br>Número de consonantes en el nombre: ' +contadorConsonantes;
}

var boton_ingreso = document.getElementById('btnIngreso');

boton_ingreso.onclick = contarLetras;