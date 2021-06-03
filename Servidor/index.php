<?php
    require "Entidades/Usuario.php";
    include "Funciones/funciones.php";

    if( isset($_POST['usuario']) && isset($_POST['contra']) ){

        $nombre = $_POST['usuario'];
        $contrasena = $_POST['contra'];
        
        if( compararContrasena( leerArchivo('subidas/' . $nombre . '.txt'), $contrasena ) ){
            echo 'perfil.html';
        }
        else{
            echo 'Contraseña incorrecta';
        }
    }

    if( isset($_POST['usuarioNuevo']) ){

        $usuario_nuevo = $_POST['usuarioNuevo'];

        if( buscarUsuario($usuario_nuevo) ){
            echo true;
        }
        else{
            echo false;
        }
    }

    if( isset($_POST['nuevoUsuario']) && isset($_POST['nuevaContra']) ){

        $nuevoUsuario = $_POST['nuevoUsuario'];
        $nuevaContra = $_POST['nuevaContra'];

        if( agregarUsuario($nuevoUsuario, $nuevaContra) ){
            echo true;
        }
        else{
            echo false;
        }
    }

    if( isset($_FILES['nuevaFoto']) ){

        $usuario_nuevo = $_POST['usuarioNuevo'];

        if( buscarUsuario($usuario_nuevo) ){
            echo true;
        }
        else{
            echo false;
        }
    }

?>