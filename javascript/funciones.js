/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var numero_puntos_totales=5;
var n_puntos_actuales=0;
var lista_puntos=new Array();
function grabarRuta()
{
    //Escuchar la posicion (y sus cambios)
    // Cada cierto numero de puntos, enviarlos al fichero php
    if (navigator.geolocation)
    {
        opciones={
            enableHighAccuracy:true,
            timeout: 2000,
            maximumAge:2000
        }
        navigator.geolocation.watchPosition(posicionCapturada, errorCaptura, opciones);
    }
    else
    {
        alert ("La geolocalización no está disponible");
    }
}
function posicionCapturada(posicion){
    
    lista_puntos[n_puntos_actuales]=posicion.coords.latitude+","+posicion.coords.longitude;
    n_puntos_actuales++;
    if (n_puntos_actuales==numero_puntos_totales)
    {
        //Formar uhnh strig con lista_puntos
        cadena=formarCadena(lista_puntos);
        enviarDatos(cadena);
        n_puntos_actuales=0;
    }
}
function enviarDatos(cadena)
{
    usuario=document.getElementById("nombre").value;
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
	
    if (this.readyState == 4 && this.status == 200) {
		
   
	
    }
}
xmlhttp.open("POST", "recogerdatos.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("usuario="+usuario+"&datos="+cadena);
alert("Envio de "+"usuario="+usuario+"datos="+cadena)
}
function formarCadena(lista)
{
    aux="";
    for (i=0; i<lista.length; i++)
    {
       aux+=lista[i]+"#";
    }
    aux=aux.substring(0, aux.length-1);
    return aux;
}
function errorCaptura(e)
{
    alert("Error en la captura");
}