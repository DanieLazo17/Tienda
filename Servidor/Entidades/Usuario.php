<?php
    class Usuario {
  
        private $nombre;
        private $contrasena;

        public function __construct(){
            
        }

        public function SetNombre($nombre){
            
            $this->nombre = $nombre;
        }

        public function SetContrasena($contrasena){
            
            $this->contrasena = $contrasena;
        }

        public function GetNombre(){
            
            return $this->nombre;
        }

        public function GetContrasena(){
            
            return $this->contrasena;
        }

    }
?>