<?php
include 'AccesoBD.php';
$usuario=$_POST['usuario'];
$datos=$_POST['datos'];
//.....&.....&.....&
$lista_puntos= split('#', $datos);
grabarDatos($usuario, $lista_puntos);