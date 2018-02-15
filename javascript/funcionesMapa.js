var map;
function temporizador()
{
     map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center:  {lat:44, lng:-3},
          mapTypeId: 'terrain'
        });
    setInterval(function(){cargarRuta()}, 3000);
}
function cargarRuta()
{
    var usuario=document.getElementById("usuario").value;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
			//alert(this.readyState);
			if (this.readyState == 4 && this.status == 200) {
				
			//alert(this.responseText);
			tratarRuta(this.responseText);
			}
	}
	xmlhttp.open("POST", "recogerdatos.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        datos="usuario="+usuario+"&accion=verruta";
            xmlhttp.send(datos);
}
function tratarRuta(txt_json)
{
     //{"puntos": [{"lat": 40.32, "lng":-3.26}, {"lat": 40.31, "lng":-3.22} ]}
    var obj_json=JSON.parse(txt_json);
    var lista_puntos=obj_json.puntos;
    var lista_puntos_ruta=new Array();//[{lat:...,lng:...},{lat:...,lng:333}]
    for (i=0; i<lista_puntos.length; i++)
    {
        var latitud=lista_puntos[i].lat;
        var longitud=lista_puntos[i].lng;
        lista_puntos_ruta[i]={lat:latitud, lng:longitud};
    }
     
      var ruta = new google.maps.Polyline({
          path: lista_puntos_ruta,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        ruta.setMap(map);
        map.setCenter(lista_puntos_ruta[0]);
}