<?php

    function mostrarValor($parametro="Prueba"){
        echo "<br>";
        echo $parametro;
        return 1;
    }

    function leerArchivo($nombreArchivo){

        $archivo = fopen($nombreArchivo,"r");

        $contrasenaEnArchivo = fread($archivo,filesize($nombreArchivo));

        fclose($archivo);

        return $contrasenaEnArchivo;
    }

    function compararContrasena($contrasenaEnArchivo, $contrasenaIngresada){

        $estado = false;

        if($contrasenaEnArchivo == $contrasenaIngresada){
            $estado = true;
        }

        return $estado;
    }

    function buscarUsuario($nombreUsuario){

        $estado = false;

        $archivo = fopen('subidas/usuarios.json',"r");

        $usuarios = fread($archivo,filesize('subidas/usuarios.json'));

        fclose($archivo);

        $usuariosArray = json_decode($usuarios);
        //var_dump($usuariosArray);
        foreach($usuariosArray as $usuarioGenerico){

            foreach($usuarioGenerico as $atr => $valorAtr){

                if($atr == "usuario" && $valorAtr == $nombreUsuario){
                    
                    $estado = true;
                    return $estado;
                }
            }
        }

        return $estado;
    }

    function agregarUsuario($usuario, $contrasena){

        $estado = false;

        $archivo = fopen('subidas/usuarios.json',"w");

        $tempUsuario = new Usuario();

        $tempUsuario->SetNombre($usuario);
        $tempUsuario->SetContrasena($contrasena);

        fwrite($archivo, $tempUsuario);

        fclose($archivo);
    }

    //$archivo = fopen('../subidas/usuarios.json',"w");
    /*
    $tempUsuario = new Usuario();

    $tempUsuario->SetNombre("lucas");
    $tempUsuario->SetContrasena("ASD123asd");

    var_dump($tempUsuario);
    */
    //Error
    //fwrite($archivo, $tempUsuario);

    //fclose($archivo);

?>