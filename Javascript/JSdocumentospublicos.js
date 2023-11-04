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
//    document.getElementById("infopersonal").style.visibility = "hidden";
//});
///*AL RECIBIR LA RESPUESTA DEL SERVIDOR, TRAS LA PETICION AJAX, SE DESBLOQUEA LA PANTALLA*/$(document).ajaxStop(function () {
//    $("#loading").html("");
//    $("#loading").removeAttr("style");
//    document.getElementById("infopersonal").style.visibility = "visible";

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

function cargahmtl() {
    document.getElementById("infopersonal").innerHTML += "<h2>Documentos para junta y afiliados  </H2> <hr><ul class='tabs' id='detalle' ></ul>";

    $("#detalle").append("<li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>Documentos que solo veran miembros de junta directiva</label><div id='tab-content0' class='tab-content animated fadeIn'></div> </li><li id='pagodos'> <input type='radio' checked name='tabs' id='tab1'><label for='tab1'>Documentos para los asociados</label><div id='tab-content1' class='tab-content animated fadeIn'></div> </li>");
    $('#tab-content0').append("<div id='listadoactualjunta'></div><hr>Para subir un nuevo documento: <input id=\"inputFile\" type=\"file\" /><paper-button raised id='subearchivojunta' onclick='subirarchivojunta()' >Subir</paper-button>");
    $('#tab-content1').append("<div id='listadoactualasociado'></div><hr>Para subir un nuevo documento: <input id=\"inputFileasociado\" type=\"file\" /><paper-button raised id='subearchivoasociado' onclick='subirarchivoasociado()' >Subir</paper-button>");
    var persona = new Object();
    persona.criterio = 'listajunta';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;


    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'docspublicos',
        // url: 'http://192.168.1.135//api/Listado',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                $('#listadoactualjunta').append("No hay documentos registrados");
            } else {


              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    $('#listadoactualjunta').append('<table><tr><td><a href=' + data[ele].replace(/ /g, "%20") + ">" + data[ele].split('/')[(data[ele].split('/')).length - 1] + "</a></td><td><paper-button raised id='eliminadoc' onclick=\"eliminadoc('" + data[ele].split('/')[(data[ele].split('/')).length - 1] + "','junta')\" >Eliminar</paper-button></td></tr></table></br>");
                }
                var persona = new Object();
                persona.criterio = 'listasocio';

                persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'docspublicos',
                    // url: 'http://192.168.1.135//api/Listado',
                    type: 'POST',
                    dataType: 'json',
                    data: persona,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                        if (data.length == 0) {
                            $('#listadoactualasociado').append("No hay documentos registrados");
                        } else {


                          /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                                $('#listadoactualasociado').append('<table><tr><td><a href=' + data[ele].replace(/ /g, "%20") + ">" + data[ele].split('/')[(data[ele].split('/')).length - 1] + "</a></td><td><paper-button raised id='eliminadoc' onclick=\"eliminadoc('" + data[ele].split('/')[(data[ele].split('/')).length - 1] + "','socio')\" >Eliminar</paper-button></td></tr></table></br>");
                            }

                        }


                    },
                    /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                        alert(xhr);
                    }
                });
            }


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });




}

function subirarchivojunta() {
    var files = $("#inputFile").get(0).files;
    if (files.length > 0) {

        var data = new FormData();

        files[0].name = document.getElementById("inputFile").value.split('\\')[(document.getElementById("inputFile").value.split('\\')).length - 1];
        data.append("usrid", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID);
        data.append("pssw", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA);

        for (i = 0; i < files.length; i++) {
            data.append("file" + i, files[i]);
        }
        data.append('nombreyextencion', document.getElementById("inputFile").value.split('\\')[(document.getElementById("inputFile").value.split('\\')).length - 1]);
        data.append('TIPO', 'DOCJUNTA');
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            type: "POST",
            url: urllocal + "file",
            // datatype:'json',
            contentType: false,
            processData: false,
            data: data,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (result) {
                if (result) {
                    alert("Documento subido correctamente");
                    window.location.href = "documentospublicos.html";
                }
            }
        });
    }

}

function subirarchivoasociado() {
    var files = $("#inputFileasociado").get(0).files;
    if (files.length > 0) {

        var data = new FormData();
        data.append("usrid", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID);
        data.append("pssw", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA);

        files[0].name = document.getElementById("inputFileasociado").value.split('\\')[(document.getElementById("inputFileasociado").value.split('\\')).length - 1];
        for (i = 0; i < files.length; i++) {
            data.append("file" + i, files[i]);
        }
        data.append('nombreyextencion', document.getElementById("inputFileasociado").value.split('\\')[(document.getElementById("inputFileasociado").value.split('\\')).length - 1]);
        data.append('TIPO', 'DOCSOCIO');
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            type: "POST",
            url: urllocal + "file",
            // datatype:'json',
            contentType: false,
            processData: false,
            data: data,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (result) {
                if (result) {
                    alert("Documento subido correctamente");
                    window.location.href = "documentospublicos.html";
                }
            }
        });
    }

}

function eliminadoc(uno, dos) {

    var persona = new Object();
    persona.criterio = 'elimina';
    persona.url = uno;
    persona.tipo = dos;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'docspublicos',
        // url: 'http://192.168.1.135//api/Listado',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            alert("Documento eliminado");
            window.location.href = "documentospublicos.html";

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

}