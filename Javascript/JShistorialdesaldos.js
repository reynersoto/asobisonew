///*AL CONSUMIR UN API POR AJAX, MUESTRA UN MSG AL USUAIRO Y BLOQUE LA PANTALLA PARA EVITAR DOBLE ENVIO DE LA INFORMACION*/$(document).ajaxStart(function () { //TODA PETICION ASINCRONA A LAS API DEL BACKEND, DISPARAN EL METODO DE BLOQUEO DE LA LIBRERIA BLOCKUI QUE MUESTRA UN MSG AL USUARIO MIENTRAS EL SERVIDOR RESPONDE LA PETICION
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
///*AL RECIBIR LA RESPUESTA DEL SERVIDOR, TRAS LA PETICION AJAX, SE DESBLOQUEA LA PANTALLA*/$(document).ajaxStop(function () {//CUANDO LA PETICION ASINCRONA A LAS API DEL BACKEND, RETORNAN ALGUNA RESPUESTA, SE UTILIZA LA LIBRERIA BLOCKUI PARA DESBLOQUEAR EL MSG AL USUARIO EN PANTALLA
//    $("#loading").html("");
//    $("#loading").removeAttr("style");
//    $("#tablahistorial").dataTable({ //SE UTILIZA LA LIBRERIA datatable PARA AGREGAR A UNA TABLA HTML DIVERSAS FUNCIONALIDADES Y ESTILO, POR EJEMPLO ORDENAMIENTO POR COLUMNAS, PAGINACION, IMPRESION, EXPORTAR A EXCEL, Y UNA VENTANA DE BUSQUEDA FUNCIONAL
//        "scrollY": "500px",
//        "scrollCollapse": true,
//        "paging": false,
//        "sorting":false,
//        dom: 'Bfrtip',
//        buttons: [
//            'print'
//        ]
//    });
//    document.getElementById("infopersonal").style.visibility = "visible";
//});
/*AL CONSUMIR UN API POR AJAX, MUESTRA UN MSG AL USUAIRO Y BLOQUE LA PANTALLA PARA EVITAR DOBLE ENVIO DE LA INFORMACION*/$(document).ajaxStart(function () { //TODA PETICION ASINCRONA A LAS API DEL BACKEND, DISPARAN EL METODO DE BLOQUEO DE LA LIBRERIA BLOCKUI QUE MUESTRA UN MSG AL USUARIO MIENTRAS EL SERVIDOR RESPONDE LA PETICION
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
/*AL RECIBIR LA RESPUESTA DEL SERVIDOR, TRAS LA PETICION AJAX, SE DESBLOQUEA LA PANTALLA*/$(document).ajaxStop(function () {//CUANDO LA PETICION ASINCRONA A LAS API DEL BACKEND, RETORNAN ALGUNA RESPUESTA, SE UTILIZA LA LIBRERIA BLOCKUI PARA DESBLOQUEAR EL MSG AL USUARIO EN PANTALLA
    $.unblockUI();
    $("#tablahistorial").dataTable({ //SE UTILIZA LA LIBRERIA datatable PARA AGREGAR A UNA TABLA HTML DIVERSAS FUNCIONALIDADES Y ESTILO, POR EJEMPLO ORDENAMIENTO POR COLUMNAS, PAGINACION, IMPRESION, EXPORTAR A EXCEL, Y UNA VENTANA DE BUSQUEDA FUNCIONAL
        "scrollY": "500px",
        "scrollCollapse": true,
        "paging": false,
        "sorting": false,
        dom: 'Bfrtip',
        buttons: [
            'print',
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]
    });
});
var urllocal = 'api/';//TODAS LAS PETICIONES A LAS API DEL BACKEND (CARPETA CONTROLLER DEL BACKEND), SE REALIZAN A LA CARPETA VIRTUAL api/

var miniprofile = document.getElementById("people");
miniprofile.innerHTML = "<li>  <img src='/Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg' onerror='this.src = 'Imagenes/btn_menu.png'' onclick='muestraprofilegrande();' /><table><tr><td><h2>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</h2><em>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "</em> </td><td></td><td><input type=image src=\"Imagenes/list-view.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"menu.html\"'></input></td><td><input type=image src=\"Imagenes/settings.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"prefuser.html\"'></input></td><td><input type=image src=\"Imagenes/plug.png\" width=\"45\" height=\"45\" onclick = \"salirdelsistema()\"></input></td></tr></table></li>";
//FIN DEL PERFIL DE USUARIO MINI

/*CIERRA SESION Y QUITA LAS COOKIES DE MEMORIA, REDIRIGE AL INICIO DE SESION */function salirdelsistema() {

   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("USUARIOLOGUEADO", null);

    window.location.href = "Login.html";


}

/*VERIFICA LA COOKIE DE ACCESO AL SISTEMA*/if (JSON.parse(localStorage.getItem("USUARIOLOGUEADO")) == null) { //VERIFICA SI EL USUARIO ESTA LOGUEADO EN EL SISTEMA, ESTO AL INSPECCIONAR SI EXISTE UNA COOKIE(LOCALSTORAGE) ESPECIFICO QUE SE CREA EN LA PAGINA DE LOGIN, AL INGRESAR CON UN USUAIRO VALIDO, SI NO EXISTE, LO DEVULEVE DE INMEDIATO A LA PAGINA DE LOGIN
    alert("No estas autorizado para ingresar aun");
    location.href = "/login.html";

} else {
    // alert(JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO);
}

/*PARA LEER PARAMETROS DEL URL*/function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;

}
var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

function cargahtml() {


    var persona = new Object();
    persona.IDENTIFICACION = getUrlVars()["id"];
    persona.FONDO = getUrlVars()["fondo"];
    persona.tipo = '76';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID; //SE ENVIA AL BACKEND EL ID DEL USUARIO LOGUEADO, PARA VALIDAR QUE LA PERSONA QUE ESTA HACIENDO LA PETICION ES UN USUARIO VALIDO DEL SISTEMA
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA; //SE ENVIA AL BACKEND LA CLAVE ENCRIPTADA DEL USUARIO LOGUEADO, PARA VALIDAR QUE LA PERSONA QUE ESTA HACIENDO LA PETICION ES UN USUARIO VALIDO DEL SISTEMA
    $('#infopersonal').append("<h1>Historial de saldos en " + getUrlVars()["fondo"] + " del afiliado: " + JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO + "</h1><strong>Importante, este listado se esta tomando desde noviembre 2022</strong> <table id='tablahistorial' class='display'><thead></thead><tbody></tbody></table>");

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({ //METODO DE JQUERY QUE PERMITA EJECUTAR UNA PETICIOON ASINCRONA AL BACKEND, EN ESTE PROYECTO A LOS CONTROLADORES DE LA CARPETA CONTROLLER, IGUALEMNTE EN ESTE PROYECTO SIEMPRE SE UTILZIA UNICAMENTE EL VERBO POST PARA ENVIAR Y RECIBIR DATOS ENTRE FRONT-END Y BACK-END, TODA COMUNICACION SE HACE MEDIANTE JSON
        url: urllocal + 'Listado',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) { //ESTE METODO ANONIMO SE EJECTUTA AL RECIBIR LA RESPUESTA A LA PETICION DESDE EL BACKEND, NOS INTERESA EL PARAMETRO DATA, DONDE PODEMOS OBTENER LA INFORMACION DE  CLASES O LISTAS DE CLASES DESDE EL BACKEND SEGUN SEA LO SOLICITADO, SI LA PETICION ESPERA DE RESPUESTA UNA CLASE O UNA LISTA DE CLASES DEL BACKEND,QUE ES LA MAYORIA DE LOS CASOS, SE ACCEDE A LOS ATRIBUTOS PUBLICOS DE ESTA CLASE CON EL MISMO NOMBRE QUE ESTAN EN EL BACKEND, EN LA CARPETA MODELS
            if (data.length > 0) {
                var $thead = $('#tablahistorial').find('thead');
                var tr = $("<tr>");
                $thead.append(tr);
                var columns = [];
                $.each(data[0], function (name, value) {
                    var column = {
                        "data": name,
                        "title": name
                    };
                    columns.push(column);
                });
                $('#tablahistorial').dataTable({ //SE UTILIZA LA LIBRERIA datatable PARA AGREGAR A UNA TABLA HTML DIVERSAS FUNCIONALIDADES Y ESTILO, POR EJEMPLO ORDENAMIENTO POR COLUMNAS, PAGINACION, IMPRESION, EXPORTAR A EXCEL, Y UNA VENTANA DE BUSQUEDA FUNCIONAL
                    data: data,
                    columns: columns,
                    dom: 'Bfrtip',
                    buttons: [
                        'print',
                        'copyHtml5',
                        'excelHtml5',
                        'csvHtml5',
                        'pdfHtml5'
                    ]
                });
            }

           

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) { //SI LA PETICION DEVUELVE UN ERROR, SE CAPTURA EN ESTE METODO ANONIMO, SE INSPECCIONA EL PARAMETRO xhr PARA OBTENER INFORMACION DEL ERROR
            alert(xhr);
        }
    });
  




}

