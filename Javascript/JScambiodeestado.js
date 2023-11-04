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
    alert(JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO);
}


var miniprofile = document.getElementById("people");
miniprofile.innerHTML = "<li>  <img src='/Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg' onerror='this.src = 'Imagenes/btn_menu.png'' onclick='muestraprofilegrande();' /><table><tr><td><h2>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</h2><em>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "</em> </td><td></td><td><input type=image src=\"Imagenes/list-view.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"menu.html\"'></input></td><td><input type=image src=\"Imagenes/settings.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"prefuser.html\"'></input></td><td><input type=image src=\"Imagenes/plug.png\" width=\"45\" height=\"45\" onclick = \"salirdelsistema()\"></input></td></tr></table></li>";
//FIN DEL PERFIL DE USUARIO MINI

/*CIERRA SESION Y QUITA LAS COOKIES DE MEMORIA, REDIRIGE AL INICIO DE SESION */function salirdelsistema() {

   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("USUARIOLOGUEADO", null);

    window.location.href = "Login.html";


}


function cargatabs() {



    document.getElementById("infopersonal").innerHTML += "<h2>Datos modificables de " + JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO + "  </H2> <hr><ul class='tabs' id='detalle' ></ul>";


    if (JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")) != null) {
        //PESTA;A DE ASOBISO
        var dater = new Date(JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).FECHA_INGRESO);
        $("#detalle").append("<li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>Asociación(Asobiso)</label><div id='tab-content0' class='tab-content animated fadeIn'><H3> Saldo actual: " + JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).MONTO + " Estado " + JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).ESTADO.DESCRIPCION + " </H3>  Para cambiar de estado, seleccione alguno de la lista:  <select name=\"estadosposibles\" id=\"estadosposiblesaso\" onChange=\"activacambioestadoaso()\"></select>  <input  class='form-control' placeholder='Justificacion del cambio' id='justcambio'/><br><br><paper-button raised id='cambiaaso' onclick='cambiaraso()' disabled>Cambiar</paper-button><br><br> Para cambiar la planilla a la cual pertenece, seleccione de la lista: <select name=\"planillasposibles\" id=\"planillasposiblesaso\" onChange=\"activacambioplanillaaso()\"></select><br> Para modificar el saldo, cambie en el siguiente campo, ** recuerde que todo cambio de saldo quedara registrado en las observaciones de la persona junto con el usuario que lo cambio:<BR><BR> <input  class='form-control' placeholder='Saldo actual' id='montoaso'  onkeyup=\"activacambiomontoaso()\" value= " + JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).MONTO + " /><input  class='form-control' placeholder='Justificacion del cambio de saldo' id='justmontoaso'/><paper-button raised id='cambiamontoaso' type='number' onclick='cambiarmontoaso()' disabled >Cambiar Monto</paper-button><br> Para modifica la fecha de ingreso, cambie en el siguiente campo, ** recuerde que todo cambio quedara registrado en las observaciones de la persona junto con el usuario que lo cambio:<BR><BR> <input  class='form-control' placeholder='Fecha de ingreso' id='fecingaso'  onkeyup=\"activacambiofechaaso()\"  value= " + dateConvert(dater, "YYYY-MM-DD") + " type='date'/><input  class='form-control' placeholder='Justificacion del cambio de fecha de ingreso' id='justfecingaso'/><paper-button raised id='cambiafechaaso' onclick='cambiarfechaaso()' disabled>Cambiar fecha</paper-button></div> </li>");
        var persona = new Object();
        persona.criterio = "seleccionables";
        var dataestado = new Object();
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        //ajax de los datos personales
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Estado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
                for (var ele in dataestado) {


                    var x = document.getElementById("estadosposiblesaso");
                    var option = document.createElement("option");
                    option.text = dataestado[ele].ID + ' ' + dataestado[ele].DESCRIPCION;
                    option.value = dataestado[ele].ID;
                    option.id = dataestado[ele].ID;
                    //   option.id=
                    x.add(option);

                }
            }
        });

        var persona = new Object();
        persona.criterio = "seleccionables";
        var dataestado = new Object();
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        //ajax de los datos personales
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Metododepago',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
                for (var ele in dataestado) {


                    var x = document.getElementById("planillasposiblesaso");
                    var option = document.createElement("option");
                    option.text = dataestado[ele].ID + ' ' + dataestado[ele].DESCRIPCION;
                    option.value = dataestado[ele].ID;
                    option.id = dataestado[ele].ID;
                    //   option.id=
                    x.add(option);

                }

                var ele = document.getElementById("planillasposiblesaso");
                for (var ii = 0; ii < ele.length; ii++)
                    if (ele.options[ii].value == JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).METODO_PAGO.ID) { //Found!
                        ele.options[ii].selected = true;
                    }
            }
        });




    }


    if (JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")) != null) {
        //PESTA;A DE MUTUALIDAD
        var dater = new Date(JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).FECHA_INGRESO);
        $("#detalle").append("<li id='pagodos'> <input type='radio' checked name='tabs' id='tab1'><label for='tab1'>Mutualidad</label><div id='tab-content1' class='tab-content animated fadeIn'><paper-button raised id='reportafallbtn' onclick='reportarfallecido()' >Reportar como fallecido</paper-button><H3> Saldo actual: " + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).MONTO + " Estado " + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).ESTADO.DESCRIPCION + " </H3>  Para cambiar de estado, seleccione alguno de la lista:  <select name=\"estadosposibles\" id=\"estadosposiblesmut\"  onChange=\"activacambioestadomut()\"></select>  <input  class='form-control' placeholder='Justificacion del cambio' id='justcambiomut'/><br><br><paper-button raised id='cambiamut' onclick='cambiarmut()' disabled>Cambiar</paper-button><br><br> Para cambiar la planilla a la cual pertenece, seleccione de la lista: <select name=\"planillasposibles\" id=\"planillasposiblesmut\"  onChange=\"activacambioplanillamut()\"></select><br> Para modifica el saldo, cambie en el siguiente campo, ** recuerde que todo cambio de saldo quedara registrado en las observaciones de la persona junto con el usuario que lo cambio:<BR><BR> <input  class='form-control' placeholder='Saldo actual' id='montomut' type='number'  onkeyup=\"activacambiomontomut()\"  value= " + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).MONTO + " /><input  class='form-control' placeholder='Justificacion del cambio de saldo' id='justmontomut'/><paper-button raised id='cambiamontomut' onclick='cambiarmontomut()' disabled>Cambiar Monto</paper-button><br> Para modifica la fecha de ingreso, cambie en el siguiente campo, ** recuerde que todo cambio quedara registrado en las observaciones de la persona junto con el usuario que lo cambio: <BR><BR><input  class='form-control' placeholder='Fecha de ingreso' id='fecingmut'  onkeyup=\"activacambiofechamut()\" type='date'  value= " + dateConvert(dater, "YYYY-MM-DD") + "/><input  class='form-control' placeholder='Justificacion del cambio de fecha de ingreso' id='justfecingmut'/><paper-button raised id='cambiafechamut' onclick='cambiarfechamut()' disabled>Cambiar Fecha</paper-button></div> </li>");
        var persona = new Object();
        persona.criterio = "seleccionables";
        var dataestado = new Object();
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        //ajax de los datos personales
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Estado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
                for (var ele in dataestado) {


                    var x = document.getElementById("estadosposiblesmut");
                    var option = document.createElement("option");
                    option.text = dataestado[ele].ID + ' ' + dataestado[ele].DESCRIPCION;
                    option.value = dataestado[ele].ID;
                    option.id = dataestado[ele].ID;
                    //   option.id=
                    x.add(option);

                }


            }
        });
        var persona = new Object();
        persona.criterio = "seleccionables";
        var dataestado = new Object();
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        //ajax de los datos personales
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Metododepago',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
                for (var ele in dataestado) {


                    var x = document.getElementById("planillasposiblesmut");
                    var option = document.createElement("option");
                    option.text = dataestado[ele].ID + ' ' + dataestado[ele].DESCRIPCION;
                    option.value = dataestado[ele].ID;
                    option.id = dataestado[ele].ID;
                    //   option.id=
                    x.add(option);

                }
                var ele = document.getElementById("planillasposiblesmut");
                for (var ii = 0; ii < ele.length; ii++)
                    if (ele.options[ii].value == JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).METODO_PAGO.ID) { //Found!
                        ele.options[ii].selected = true;
                    }
            }
        });
    }
    if (JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")) != null) {
        //PESTA;A DE MUTUALIDAD
        var dater = new Date(JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).FECHA_INGRESO);
        $("#detalle").append("<li id='pagotres'> <input type='radio' checked name='tabs' id='tab2'><label for='tab2'>Solidaridad</label><div id='tab-content2' class='tab-content animated fadeIn'><H3> Saldo actual: " + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).MONTO + " Estado " + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).ESTADO.DESCRIPCION + " </H3>  Para cambiar de estado, seleccione alguno de la lista:  <select name=\"estadosposibles\" id=\"estadosposiblessol\"  onChange=\"activacambioestadosol()\"></select>  <input  class='form-control' placeholder='Justificacion del cambio' id='justcambiosol'/><br><br><paper-button raised id='cambiasol' onclick='cambiarsol()' disabled>Cambiar</paper-button><br> <br> Para cambiar la planilla a la cual pertenece, seleccione de la lista: <select name=\"planillasposibles\" id=\"planillasposiblessol\"  onChange=\"activacambioplanillasol()\"></select><br>Para modifica el saldo, cambie en el siguiente campo, ** recuerde que todo cambio de saldo quedara registrado en las observaciones de la persona junto con el usuario que lo cambio:<BR><BR> <input  class='form-control' placeholder='Saldo actual' id='montosol' type='number'   onkeyup=\"activacambiomontosol()\"  value = " + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).MONTO + " /><input  class='form-control' placeholder='Justificacion del cambio de saldo' id='justmontosol' /><paper-button raised id='cambiamontosol' onclick='cambiarmontosol()' disabled type='number'>Cambiar Monto</paper-button><br> Para modifica la fecha de ingreso, cambie en el siguiente campo, ** recuerde que todo cambio quedara registrado en las observaciones de la persona junto con el usuario que lo cambio: <BR><BR><input  class='form-control' placeholder='Fecha de ingreso' type='date' id='fecingsol'  onkeyup=\"activacambiofechasol()\" value= " + dateConvert(dater, "YYYY-MM-DD") + "/><input  class='form-control' placeholder='Justificacion del cambio de fecha de ingreso' id='justfecingsol'/><paper-button raised id='cambiafechasol' onclick='cambiarfechasol()' disabled type='date'>Cambiar Fecha</paper-button></div> </li>");
        var persona = new Object();
        persona.criterio = "seleccionables";
        var dataestado = new Object();
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        //ajax de los datos personales
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Estado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
                for (var ele in dataestado) {


                    var x = document.getElementById("estadosposiblessol");
                    var option = document.createElement("option");
                    option.text = dataestado[ele].ID + ' ' + dataestado[ele].DESCRIPCION;
                    option.value = dataestado[ele].ID;
                    option.id = dataestado[ele].ID;
                    //   option.id=
                    x.add(option);

                }
            }
        });
        var persona = new Object();
        persona.criterio = "seleccionables";
        var dataestado = new Object();
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        //ajax de los datos personales
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Metododepago',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
                for (var ele in dataestado) {


                    var x = document.getElementById("planillasposiblessol");
                    var option = document.createElement("option");
                    option.text = dataestado[ele].ID + ' ' + dataestado[ele].DESCRIPCION;
                    option.value = dataestado[ele].ID;
                    option.id = dataestado[ele].ID;
                    //   option.id=
                    x.add(option);

                }
                var ele = document.getElementById("planillasposiblessol");
                for (var ii = 0; ii < ele.length; ii++)
                    if (ele.options[ii].value == JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).METODO_PAGO.ID) { //Found!
                        ele.options[ii].selected = true;
                    }
            }
        });
    }




}

function activacambioestadoaso() {
    $('#cambiaaso').removeAttr("disabled")


}

function activacambioestadomut() {
    $('#cambiamut').removeAttr("disabled")


}

function activacambioestadosol() {
    $('#cambiasol').removeAttr("disabled")


}


function activacambiomontoaso() {
    $('#cambiamontoaso').removeAttr("disabled")


}

function activacambiomontomut() {
    $('#cambiamontomut').removeAttr("disabled")


}

function activacambiomontosol() {
    $('#cambiamontosol').removeAttr("disabled")


}

function activacambiofechaaso() {
    $('#cambiafechaaso').removeAttr("disabled")


}

function activacambiofechamut() {
    $('#cambiafechamut').removeAttr("disabled")


}

function activacambiofechasol() {
    $('#cambiafechasol').removeAttr("disabled")


}

function cambiaraso() {

    var persona = new Object();
    persona.criterio = "cambiar";
    var ele = document.getElementById("estadosposiblesaso");
    for (var ii = 0; ii < ele.length; ii++)
        if (ele.options[ii].value == document.getElementById("estadosposiblesaso").value) { //Found!
            persona.nuevoestado = ele.options[ii].id;
        }
    persona.fondo = "ASOCIACION";
    persona.idasociado = JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).IDENTIFICACION.IDENTIFICACION;
    persona.justifica = document.getElementById("justcambio").value;
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;



    //ajax de los datos personales
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Estado',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
            alert("Cambio efectuado correctamente");
        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });
    var persona = new Object();
    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).IDENTIFICACION.IDENTIFICACION;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //ajax de los datos de mutualidad
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Asobiso',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.IDENTIFICACION.IDENTIFICACION == 0) {


            } else {

               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("PERSONABUSCADAENASOBISO", JSON.stringify(data));

            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });

    window.locationf = "cambiodeestado.html";


}

function cambiarmut() {

    var persona = new Object();
    var ele = document.getElementById("estadosposiblesmut");
    for (var ii = 0; ii < ele.length; ii++)
        if (ele.options[ii].value == document.getElementById("estadosposiblesmut").value) { //Found!
            persona.nuevoestado = ele.options[ii].id;
        }

    if (persona.nuevoestado == 17 && JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).ESTADO.ID != 12) {

        alert("Este cambio, solo puede aplicarse a afiliados excluidos");

    } else {

        persona.criterio = "cambiar";
        var ele = document.getElementById("estadosposiblesmut");
        for (var ii = 0; ii < ele.length; ii++)
            if (ele.options[ii].value == document.getElementById("estadosposiblesmut").value) { //Found!
                persona.nuevoestado = ele.options[ii].id;
            }
        persona.fondo = "MUTUALIDAD";
        persona.idasociado = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
        persona.justifica = document.getElementById("justcambiomut").value;
        persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;

        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
        persona.fechasesion = "";
        persona.numerosesion = "";

        if (persona.nuevoestado == 10 || persona.nuevoestado == 11) {
            persona.fechasesion = prompt("Ingrese la fecha de la sesión");
            persona.numerosesion = prompt("Ingrese el numero de sesión");
        }
        //ajax de los datos personales
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Estado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
                alert("Cambio efectuado correctamente");

                if ((persona.nuevoestado == 15) || (persona.nuevoestado == 10) || (persona.nuevoestado == 11)) {

                    $("#infopersonal").remove();
                    document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"cambiodeestado.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + dataestado + "'></img></div>";


                } else if (persona.nuevoestado == 13) {
                    alert("Rellene los datos de la defunción");
                    window.location.href = "registradefmut.html";

                } else {
                    if (persona.nuevoestado == 17) {

                        alert("Este cambio, tras ser aprobado por la junta directiva, permitirá ingresar al asociado como nuevo ingreso, reiniciando los saldos");
                    }


                    window.location.href = "inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
                }
            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });
    }
}


function cambiarsol() {




    var persona = new Object();
    var ele = document.getElementById("estadosposiblessol");
    for (var ii = 0; ii < ele.length; ii++)
        if (ele.options[ii].value == document.getElementById("estadosposiblessol").value) { //Found!
            persona.nuevoestado = ele.options[ii].id;
        }

    if (persona.nuevoestado == 17 && JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).ESTADO.ID != 12) {

        alert("Este cambio, solo puede aplicarse a afiliados excluidos");

    } else {

        persona.criterio = "cambiar";
        var ele = document.getElementById("estadosposiblessol");
        for (var ii = 0; ii < ele.length; ii++)
            if (ele.options[ii].value == document.getElementById("estadosposiblessol").value) { //Found!
                persona.nuevoestado = ele.options[ii].id;
            }
        persona.fondo = "SOLIDARIDAD";
        persona.idasociado = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
        persona.justifica = document.getElementById("justcambiosol").value;
        persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;


        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
        if (persona.nuevoestado == 17) {

            alert("Este cambio, tras ser aprobado por la junta directiva, permitirá ingresar al asociado como nuevo ingreso, reiniciando los saldos");
        }
        //ajax de los datos personales
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Estado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
                alert("Cambio efectuado correctamente");


                var persona = new Object();
                persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
                persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                //ajax de los datos de mutualidad
                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'Solidaridad',
                    type: 'POST',
                    dataType: 'json',
                    data: persona,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                        if (data.IDENTIFICACION.IDENTIFICACION == 0) {


                        } else {

                           /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("PERSONABUSCADAENSOLIDARIDAD", JSON.stringify(data));
                            window.location.href = "inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;

                        }

                    },
                    /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

                    }
                });
            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });



    }
}

function activacambioplanillamut() {

    var persona = new Object();
    persona.criterio = "cambiar";
    var ele = document.getElementById("planillasposiblesmut");
    for (var ii = 0; ii < ele.length; ii++)
        if (ele.options[ii].value == document.getElementById("planillasposiblesmut").value) { //Found!
            persona.nuevaplanilla = ele.options[ii].id;
        }
    persona.fondo = "MUTUALIDAD";
    persona.idasociado = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
    persona.justificacion = ' Cambio de metodo de pago ';
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;

    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;


    //ajax de los datos personales
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Metododepago',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
            alert("Se ha cambiado el metodo de pago del afiliado");

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });




}

function activacambioplanillaaso() {

    var persona = new Object();
    persona.criterio = "cambiar";
    var ele = document.getElementById("planillasposiblesaso");
    for (var ii = 0; ii < ele.length; ii++)
        if (ele.options[ii].value == document.getElementById("planillasposiblesaso").value) { //Found!
            persona.nuevaplanilla = ele.options[ii].id;
        }
    persona.fondo = "ASOCIACION";
    persona.idasociado = JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).IDENTIFICACION.IDENTIFICACION;
    persona.justificacion = ' Cambio de metodo de pago ';
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;

    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;


    //ajax de los datos personales
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Metododepago',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
            alert("Se ha cambiado el metodo de pago del afiliado");

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });




}

function activacambioplanillasol() {


    var persona = new Object();
    persona.criterio = "cambiar";
    var ele = document.getElementById("planillasposiblessol");
    for (var ii = 0; ii < ele.length; ii++)
        if (ele.options[ii].value == document.getElementById("planillasposiblessol").value) { //Found!
            persona.nuevaplanilla = ele.options[ii].id;
        }
    persona.fondo = "SOLIDARIDAD";
    persona.idasociado = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
    persona.justificacion = ' Cambio de metodo de pago ';
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;

    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;


    //ajax de los datos personales
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Metododepago',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
            alert("Se ha cambiado el metodo de pago del afiliado");

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });


}

function cambiarmontoaso() {
    var today = new Date();

    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    if (document.getElementById("justmontoaso").value != "") {
        //    
        var persona = new Object();
        persona.operacion = "8";

        persona.fondo = "ASOBISO";
        persona.idasociado = JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).IDENTIFICACION.IDENTIFICACION;
        persona.nuevosaldo = document.getElementById("montoaso").value;
        persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.justifica = 'Cambio de saldo: ' + document.getElementById("justmontoaso").value + ' por el usuario ' + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + ' en la fecha: ' + date;

        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        //ajax de los datos personales
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Pagoasociado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
                alert("Saldo cambiado correctamente");
                location.href = "inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).IDENTIFICACION.IDENTIFICACION;

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });
    } else {
        alert('Debe proporcionar una razón para el cambio de saldo')
    }
    //    

}

function cambiarmontomut() {

    var today = new Date();

    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    //    
    if (document.getElementById("justmontomut").value != "") {
        var persona = new Object();
        persona.operacion = "8";

        persona.fondo = "MUTUALIDAD";
        persona.idasociado = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
        persona.nuevosaldo = document.getElementById("montomut").value;
        persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.justifica = 'Cambio de saldo: ' + document.getElementById("justmontomut").value + ' por el usuario ' + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + ' en la fecha: ' + date;

        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        //ajax de los datos personales
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Pagoasociado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
                alert("Saldo cambiado correctamente");
                location.href == "inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });
    } else {
        alert('Debe proporcionar una razon para el cambio de saldo')
    }
    //    
}

function cambiarmontosol() {
    var today = new Date();

    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

    if (document.getElementById("justmontosol").value != "") {
        //    
        var persona = new Object();
        persona.operacion = "8";

        persona.fondo = "SOLIDARIDAD";
        persona.idasociado = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
        persona.nuevosaldo = document.getElementById("montosol").value;
        persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.justifica = 'Cambio de saldo: ' + document.getElementById("justmontosol").value + ' por el usuario ' + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + ' en la fecha: ' + date;
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        //ajax de los datos personales
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Pagoasociado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
                alert("Saldo cambiado correctamente");
                location.href = "inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });

    } else {
        alert('Debe proporcionar una razon para el cambio de saldo')
    }

    //    
}

function cambiarfechamut() {
    var today = new Date();

    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var persona = new Object();
    persona.cambiafecha = "1";


    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
    persona.nuevafechaingreso = document.getElementById("fecingmut").value;
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.justifica = 'Cambio de fecha de ingreso: ' + document.getElementById("justfecingmut").value + ' por el usuario: ' + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + ' en la fecha: ' + date;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //ajax de los datos personales
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Mutualidad',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
            alert("Fecha cambiada correctamente");
            location.href = "inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });
}

function cambiarfechasol() {
    var today = new Date();

    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var persona = new Object();
    persona.cambiafecha = "1";


    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
    persona.nuevafechaingreso = document.getElementById("fecingsol").value;
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.justifica = 'Cambio en la fecha de ingreso: ' + document.getElementById("justfecingsol").value + ' por el usuario: ' + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + ' en la fecha: ' + date;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //ajax de los datos personales
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Solidaridad',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
            alert("Fecha cambiada correctamente");
            location.href = "inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });
}

function cambiarfechaaso() {
    var today = new Date();

    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var persona = new Object();
    persona.cambiafecha = "1";


    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).IDENTIFICACION.IDENTIFICACION;
    persona.nuevafechaingreso = document.getElementById("fecingaso").value;
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.justifica = 'Cambio en la fecha de ingreso: ' + document.getElementById("justfecingaso").value + ' por el usuario: ' + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + ' en la fecha: ' + date;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //ajax de los datos personales
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Asobiso',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
            alert("Fecha cambiada correctamente");
            location.href = "inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).IDENTIFICACION.IDENTIFICACION;

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });
}

function reportarfallecido() {

    alert("Rellene los campos de la defuncion");
    window.location.href = "registradefmut.html";
}



function dateConvert(dateobj, format) {
    var year = dateobj.getFullYear();
    var month = ("0" + (dateobj.getMonth() + 1)).slice(-2);
    var date = ("0" + dateobj.getDate()).slice(-2);
    var hours = ("0" + dateobj.getHours()).slice(-2);
    var minutes = ("0" + dateobj.getMinutes()).slice(-2);
    var seconds = ("0" + dateobj.getSeconds()).slice(-2);
    var day = dateobj.getDay();
    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var dates = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var converted_date = "";

    switch (format) {
        case "YYYY-MM-DD":
            converted_date = year + "-" + month + "-" + date;
            break;
        case "YYYY-MMM-DD DDD":
            converted_date = year + "-" + months[parseInt(month) - 1] + "-" + date + " " + dates[parseInt(day)];
            break;
    }

    return converted_date;
}

function imprimir() {
    var objeto = document.getElementById('imprimeme'); //obtenemos el objeto a imprimir
    var ventana = window.open('', '_blank'); //abrimos una ventana vacía nueva
    ventana.document.write(objeto.innerHTML); //imprimimos el HTML del objeto en la nueva ventana
    ventana.document.close(); //cerramos el documento
    ventana.print(); //imprimimos la ventana
    ventana.close(); //cerramos la ventana
}