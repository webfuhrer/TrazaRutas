<?php



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
function devolverPuntos($usuario)
{
    $usuario_bd="root";
    $password_bd="";
    $server_name="localhost";
    $bd_name="trazarutas";
    $conexion=new mysqli($server_name, $usuario_bd, $password_bd, $bd_name);
    $sql="SELECT latitud, longitud FROM posiciones WHERE nombre='$usuario';";
    $resultados=$conexion->query($sql);
    
    //{"puntos": [{"lat": 40.32, "lng":-3.26}, {"lat": 40.31, "lng":-3.22} ]}
    $json="{\"puntos\":[";
    if ($resultados->num_rows > 0) {
                   
                             while($row = $resultados->fetch_assoc()) {
                                    $latitud= $row["latitud"];
                                    $longitud= $row["longitud"];
                                    $json.="{\"lat\":$latitud, \"lng\":$longitud},";
                                    
                                }
                    $json=substr($json, 0, strlen($json)-1);
                   }
                   $json.="]}";
    return $json;
                   
}