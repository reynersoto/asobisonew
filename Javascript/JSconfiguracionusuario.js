///*AL CONSUMIR UN API POR AJAX, MUESTRA UN MSG AL USUAIRO Y BLOQUE LA PANTALLA PARA EVITAR DOBLE ENVIO DE LA INFORMACION*/$(document).ajaxStart(function () {
//    $("#loading").html("<div id='contenedor_caja'><H1>HOLA, ESTAMOS CARGANDO LA APLICACION, GRACIAS POR SU PACIENCIA</H1></div>");
//    // $("#carga").addClass("loading");
//    document.getElementById('loading').style.width = screen.width + 'px';
//    document.getElementById('loading').style.height = screen.height + 'px';
//    document.getElementById('loading').style.backgroundColor = "white";
//    document.getElementById('loading').style.zIndex = '20';
//    document.getElementById('loading').style.opacity = '0.9';
//    $('#contenedor_caja').css({
//        width: ($(window).width() * 80) / 100,
//        position: 'absolute',
//        left: (($(window).width() * 20) / 100),

//        top: ($(window).height() - ($('#contenedor_caja').outerHeight() * 2)) / 2
//    });
//});
///*AL RECIBIR LA RESPUESTA DEL SERVIDOR, TRAS LA PETICION AJAX, SE DESBLOQUEA LA PANTALLA*/$(document).ajaxStop(function () {
//    $("#loading").html("");
//    $("#loading").removeAttr("style");
//});
/*AL CONSUMIR UN API POR AJAX, MUESTRA UN MSG AL USUAIRO Y BLOQUE LA PANTALLA PARA EVITAR DOBLE ENVIO DE LA INFORMACION*/$(document).ajaxStart(function () {
    ///*LIBRERIA DE JAVASCRIPT QUE PERMITE BLOQUEAR LA PANTALLA PARA EVITAR EL DOBLE ENVIO DE INFORMACION*/$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


    /*LIBRERIA DE JAVASCRIPT QUE PERMITE BLOQUEAR LA PANTALLA PARA EVITAR EL DOBLE ENVIO DE INFORMACION*/$.blockUI({
        message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr><strong>Ya casi esta listo...</strong>',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
});
/*AL RECIBIR LA RESPUESTA DEL SERVIDOR, TRAS LA PETICION AJAX, SE DESBLOQUEA LA PANTALLA*/$(document).ajaxStop(function () {
    $.unblockUI();
});
var urllocal = 'api/';

/*VERIFICA LA COOKIE DE ACCESO AL SISTEMA*/if (JSON.parse(localStorage.getItem("USUARIOLOGUEADO")) == null) {
    alert("No estas autorizado para ingresar aun");
    location.href = "/login.html";

} else {
    // alert(JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO);
}



var miniprofile = document.getElementById("people");
miniprofile.innerHTML = "<li>  <img src='/Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg' onerror='this.src = 'Imagenes/btn_menu.png'' onclick='muestraprofilegrande();' /><table><tr><td><h2>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</h2><em>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "</em> </td><td></td><td><input type=image src=\"Imagenes/list-view.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"menu.html\"'></input></td><td><input type=image src=\"Imagenes/settings.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"prefuser.html\"'></input></td><td><input type=image src=\"Imagenes/plug.png\" width=\"45\" height=\"45\" onclick = \"salirdelsistema()\"></input></td></tr></table></li>";
//FIN DEL PERFIL DE USUARIO MINI

/*CIERRA SESION Y QUITA LAS COOKIES DE MEMORIA, REDIRIGE AL INICIO DE SESION */function salirdelsistema() {

   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("USUARIOLOGUEADO", null);

    window.location.href = "Login.html";


}

function cargarhtml() {
    $("#infopersonal").append("<h1>Opciones configurables del usuario: <br>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</h1><h3>Puede actualizar los datos personales(si es necesario) <input  class='form-control' placeholder='Correo electrónico' id='correo' value = " + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "/>**Recuerde que a este correo le llegaran todas las notificaciones del sistema<hr><paper-button raised id='btncambiacorreo' onclick='cambiarcorreo()'>Cambiar correo</paper-button><input  class='form-control' placeholder='Clave actual' id='contraactual' type='password'/><input  class='form-control' placeholder='Clave nueva' id='contranueva1' type='password'/><input  class='form-control' placeholder='Clave nueva (Escribir nuevamente)' id='contranueva2'  onkeyup=\"calculaigualdad()\" type='password'/><paper-button raised id='btncambiacontra' onclick='cambiarcontra()' disabled>Cambiar clave</paper-button><hr><img id='imagenactualperfil' width='100px' heigth='100px' src='Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg' />Para cambiar la fotografía:<input id=\"inputFilefoto\" type=\"file\" /><hr><paper-button raised id='btncambiafoto' onclick='cambiarfoto()'>Cambiar foto</paper-button>");


}

function calculaigualdad() {
    if (document.getElementById("contranueva1").value != "") {
        if (document.getElementById("contranueva1").value == document.getElementById("contranueva2").value) {
            $('#btncambiacontra').removeAttr("disabled");
        } else {
            $('#btncambiacontra').disabled = true;
        }

    } else {
        document.getElementById("contranueva2").value = '';
        alert("Rellene el primer campo de la nueva contrasena");
    }
}


function cambiarfoto() {
    var files = $("#inputFilefoto").get(0).files;
    if (files.length > 0) {

        var data = new FormData();
        files[0].name = localStorage.getItem("USUARIOLOGUEADO").IDENTIFICACION;
        data.append("usrid", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID);
        data.append("pssw", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA);

        for (i = 0; i < files.length; i++) {
            data.append("file" + i, files[i]);
        }
        data.append('ID', JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION);
        data.append('TIPO', 'FOTOGRAFIAPERSONA');
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            type: "POST",
            url: urllocal + "file",
            // datatype:'json',
            contentType: false,
            processData: false,
            data: data,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (result) {
                if (result) {
                    alert("Fotografia cambiada");
                    window.location.href = "prefuser.html";
                }
            }
        });
    } else {
        alert("Seleccione una fotografia primero");
    }
}


function cambiarcontra() {



    var persona = new Object();
    persona.login = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).LOGIN;
    persona.id = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.nuevacontra = document.getElementById("contranueva1").value;
    persona.contrasena = document.getElementById("contraactual").value;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    persona.cambiacontrasena = "1";
    //ajax de los datos de mutualidad
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Usuario',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data == 'Intento de ingreso desautorizado') {
                alert(data);
            } else {
                alert("Clave cambiada, deberá volver a ingresar con la nueva clave");
               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("USUARIOLOGUEADO", null);

                window.location.href = "Login.html";
            }
        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });



}

function cambiarcorreo() {
    if (document.getElementById("correo").value != '') {

        var persona = new Object();

        persona.id = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.login = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).LOGIN;

        persona.contrasena = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
        persona.cambiacorreo = "1";
        persona.nuevocorreo = document.getElementById("correo").value;
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        //ajax de los datos de mutualidad
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Usuario',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                alert("Correo cambiado, debera volver a ingresar");
               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("USUARIOLOGUEADO", null);

                window.location.href = "Login.html";
            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });

    } else {
        alert("Debe rellenar el campo de correo");
    }


}