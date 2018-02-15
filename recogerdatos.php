<?php
include 'AccesoBD.php';
$accion=$_POST['accion'];
if ($accion=='grabar')
{
            $usuario=$_POST['usuario'];
            $datos=$_POST['datos'];
            //.....&.....&.....&
            $lista_puntos= split('#', $datos);
            grabarDatos($usuario, $lista_puntos);
}
else //Suponemos que es qver ruta
{
     $usuario=$_POST['usuario'];
     $json=devolverPuntos($usuario);
     echo($json);
}