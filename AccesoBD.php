<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function grabarDatos($usuario, $lista_puntos)
{
    $usuario_bd="root";
    $password_bd="";
    $server_name="localhost";
    $bd_name="trazarutas";
    $conexion=new mysqli($server_name, $usuario_bd, $password_bd, $bd_name);
    $sql="";
    for ($i=0; $i<count($lista_puntos); $i++)
    {
        $latitud=split(",",$lista_puntos[$i])[0];//40.32565,-3.2548
         $longitud=split(",",$lista_puntos[$i])[1];
            $sql.="INSERT INTO posiciones(nombre, latitud, longitud) VALUES('$usuario', '$latitud', '$longitud');";
    }
    $conexion->multi_query($sql);
    $conexion->close();
}