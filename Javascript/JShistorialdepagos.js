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
//    $("#tablahistorial").dataTable({
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
    $("#tablahistorial").dataTable({
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
var urllocal = 'api/';

var miniprofile = document.getElementById("people");
miniprofile.innerHTML = "<li>  <img src='/Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg' onerror='this.src = 'Imagenes/btn_menu.png'' onclick='muestraprofilegrande();' /><table><tr><td><h2>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</h2><em>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "</em> </td><td></td><td><input type=image src=\"Imagenes/list-view.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"menu.html\"'></input></td><td><input type=image src=\"Imagenes/settings.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"prefuser.html\"'></input></td><td><input type=image src=\"Imagenes/plug.png\" width=\"45\" height=\"45\" onclick = \"salirdelsistema()\"></input></td></tr></table></li>";
//FIN DEL PERFIL DE USUARIO MINI

/*CIERRA SESION Y QUITA LAS COOKIES DE MEMORIA, REDIRIGE AL INICIO DE SESION */function salirdelsistema() {

   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("USUARIOLOGUEADO", null);

    window.location.href = "Login.html";


}

/*VERIFICA LA COOKIE DE ACCESO AL SISTEMA*/if (JSON.parse(localStorage.getItem("USUARIOLOGUEADO")) == null) {
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
    persona.identificacion = getUrlVars()["id"];
    persona.fondo = getUrlVars()["fondo"];

    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    $('#infopersonal').append("<input type='button' id='btnestudiopagosvsrebajos' value='Descargar estudio de rebajos vs pagos' onclick='estudiopagosvsrebajos()'/><input type='button' value='Cargar datos del 2015 o antes' onclick='cargadatosantiguos()'/><h1>Historial de pagos en " + getUrlVars()["fondo"] + " del afiliado: " + JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO + "</h1> <table id='tablahistorial' class='display'><thead><tr><th scope='col' abbr='Starter'>Quincena/Mes/Año</th><th scope='col' abbr='Starter'>ID y serie del pago</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Fecha (fecha de ingreso del pago)</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Usuario</th></tr></thead><tbody></tbody></table>");
    var essoloplanillacentral = true;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Historial_pagos',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {

            } else {




              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById("tablahistorial").getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);

                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    // Append a text node to the cell
                    var newText = document.createTextNode(data[ele].QUINCENA + '/' + data[ele].MES + '/' + data[ele].ANNO);

                    newCell.appendChild(newText);
                    //var personabeneficiario = new Object();
                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                    var newCell2 = newRow.insertCell(1);


                    var newText2 = document.createTextNode(data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO);
                    newCell2.appendChild(newText2);

                    var newCell3 = newRow.insertCell(2);


                    var newText3 = document.createTextNode(data[ele].MONTO);
                    newCell3.appendChild(newText3);


                    var newCell4 = newRow.insertCell(3);


                    var newText4 = document.createTextNode(data[ele].SALDO);
                    newCell4.appendChild(newText4);


                    var newCell5 = newRow.insertCell(4);

                    var fecha1 = new Date(data[ele].FEC_ULT_ACT);
                    // var fecha1 = new Date(fecha1.setTime(fecha1.getTime() + 1 * 86400000));
                    var newText5 = document.createTextNode(fecha1.toLocaleDateString("es-ES", options));
                    newCell5.appendChild(newText5);



                    var newCell7 = newRow.insertCell(5);

                    switch (data[ele].METODO_PAGO) {

                        case 2: {

                            var newText7 = document.createTextNode("Por Banco, pago de para: " + data[ele].FONDO);
                            essoloplanillacentral = false;
                            break;
                        }
                        case 3: {

                            var newText7 = document.createTextNode("Por Planilla, pago de para: " + data[ele].FONDO);

                            break;
                        }
                        default: {
                            essoloplanillacentral = false;
                            var newText7 = document.createTextNode("En efectivo, pago de para: " + data[ele].FONDO);
                            break;
                        }
                    }

                    newCell7.appendChild(newText7);

                    var newCell8 = newRow.insertCell(6);


                    var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                    newCell8.appendChild(newText8);


                }

                if (essoloplanillacentral) {
                    document.getElementById('btnestudiopagosvsrebajos').style.display = 'visible';
                } else {
                    document.getElementById('btnestudiopagosvsrebajos').style.display = 'none';
                }
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });
    if (getUrlVars()["fondo"] == 'ASOBISO') {

        var persona = new Object();
        persona.identificacion = getUrlVars()["id"];
        persona.fondo = 'ASOCIACION';
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Historial_pagos',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                if (data.length == 0) {

                } else {




                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                        var tableRef = document.getElementById("tablahistorial").getElementsByTagName('tbody')[0];

                        // Insert a row in the table at the last row
                        var newRow = tableRef.insertRow(tableRef.rows.length);

                        // Insert a cell in the row at index 0
                        var newCell = newRow.insertCell(0);

                        // Append a text node to the cell
                        var newText = document.createTextNode(data[ele].QUINCENA + '/' + data[ele].MES + '/' + data[ele].ANNO);

                        newCell.appendChild(newText);
                        //var personabeneficiario = new Object();
                        //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                        var newCell2 = newRow.insertCell(1);


                        var newText2 = document.createTextNode(data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO);
                        newCell2.appendChild(newText2);

                        var newCell3 = newRow.insertCell(2);


                        var newText3 = document.createTextNode(data[ele].MONTO);
                        newCell3.appendChild(newText3);


                        var newCell4 = newRow.insertCell(3);


                        var newText4 = document.createTextNode(data[ele].SALDO);
                        newCell4.appendChild(newText4);


                        var newCell5 = newRow.insertCell(4);


                        var newText5 = document.createTextNode(dateConvert(data[ele].FEC_ULT_ACT, "DD-MM-YYYY"));
                        newCell5.appendChild(newText5);



                        var newCell7 = newRow.insertCell(5);

                        switch (data[ele].METODO_PAGO) {

                            case 2:
                                essoloplanillacentral = false;
                                var newText7 = document.createTextNode("Por Banco");
                                break;
                            case 3:
                                var newText7 = document.createTextNode("Por Planilla");
                                break;
                            default:
                                essoloplanillacentral = false;
                                var newText7 = document.createTextNode("En efectivo");
                        }

                        newCell7.appendChild(newText7);

                        var newCell8 = newRow.insertCell(6);


                        var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                        newCell8.appendChild(newText8);




                    }



                    if (essoloplanillacentral) {
                        document.getElementById('btnestudiopagosvsrebajos').style.display = 'visible';
                    } else {
                        document.getElementById('btnestudiopagosvsrebajos').style.display = 'none';
                    }



                }

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                alert(xhr);
            }
        });


        var persona = new Object();
        persona.identificacion = getUrlVars()["id"];
        persona.fondo = 'OTRO';
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Historial_pagos',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                if (data.length == 0) {

                } else {




                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                        var tableRef = document.getElementById("tablahistorial").getElementsByTagName('tbody')[0];

                        // Insert a row in the table at the last row
                        var newRow = tableRef.insertRow(tableRef.rows.length);

                        // Insert a cell in the row at index 0
                        var newCell = newRow.insertCell(0);

                        // Append a text node to the cell
                        var newText = document.createTextNode(data[ele].QUINCENA + '/' + data[ele].MES + '/' + data[ele].ANNO);

                        newCell.appendChild(newText);
                        //var personabeneficiario = new Object();
                        //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                        var newCell2 = newRow.insertCell(1);


                        var newText2 = document.createTextNode(data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO);
                        newCell2.appendChild(newText2);

                        var newCell3 = newRow.insertCell(2);


                        var newText3 = document.createTextNode(data[ele].MONTO);
                        newCell3.appendChild(newText3);


                        var newCell4 = newRow.insertCell(3);


                        var newText4 = document.createTextNode(data[ele].SALDO);
                        newCell4.appendChild(newText4);


                        var newCell5 = newRow.insertCell(4);


                        var fecha1 = new Date(data[ele].FEC_ULT_ACT);
                        var fecha1 = new Date(fecha1.setTime(fecha1.getTime() + 1 * 86400000));
                        var newText5 = document.createTextNode(fecha1.toLocaleDateString("es-ES", options));
                        newCell5.appendChild(newText5);




                        var newCell7 = newRow.insertCell(5);

                        switch (data[ele].METODO_PAGO) {

                            case 2:
                                essoloplanillacentral = false;
                                var newText7 = document.createTextNode("Por Banco");
                                break;
                            case 3:
                                var newText7 = document.createTextNode("Por Planilla");
                                break;
                            default:
                                essoloplanillacentral = false;
                                var newText7 = document.createTextNode("En efectivo");
                        }

                        newCell7.appendChild(newText7);

                        var newCell8 = newRow.insertCell(6);


                        var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                        newCell8.appendChild(newText8);




                    }




                    if (essoloplanillacentral) {
                        document.getElementById('btnestudiopagosvsrebajos').style.display = 'visible';
                    } else {
                        document.getElementById('btnestudiopagosvsrebajos').style.display = 'none';
                    }



                }

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                alert(xhr);
            }
        });




    }




}

function cargadatosantiguos() {

    var persona = new Object();
    persona.identificacionparaantigupo = getUrlVars()["id"];
    persona.fondo = getUrlVars()["fondo"];
    persona.op = 8;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    // $('#infopersonal').append("<input type='button' value='Cargar datos del 2015 o antes' onclick='cargadatosantiguos()'/><h1>Historial de pagos en " + getUrlVars()["fondo"] + " del afiliado: " + JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO + "</h1> <table id='tablahistorial' class='display'><thead><tr><th scope='col' abbr='Starter'>Quincena/Mes/Año</th><th scope='col' abbr='Starter'>ID y serie del pago</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Fecha (fecha de ingreso del pago)</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Usuario</th></tr></thead><tbody></tbody></table>");

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Historial_pagos',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {

            } else {




              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById("tablahistorial").getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);

                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    // Append a text node to the cell
                    var newText = document.createTextNode(data[ele].QUINCENA + '/' + data[ele].MES + '/' + data[ele].ANNO);

                    newCell.appendChild(newText);
                    //var personabeneficiario = new Object();
                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                    var newCell2 = newRow.insertCell(1);


                    var newText2 = document.createTextNode(data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO);
                    newCell2.appendChild(newText2);

                    var newCell3 = newRow.insertCell(2);


                    var newText3 = document.createTextNode(data[ele].MONTO);
                    newCell3.appendChild(newText3);


                    var newCell4 = newRow.insertCell(3);


                    var newText4 = document.createTextNode(data[ele].SALDO);
                    newCell4.appendChild(newText4);


                    var newCell5 = newRow.insertCell(4);

                    var fecha1 = new Date(data[ele].FEC_ULT_ACT);
                    // var fecha1 = new Date(fecha1.setTime(fecha1.getTime() + 1 * 86400000));
                    var newText5 = document.createTextNode(fecha1.toLocaleDateString("es-ES", options));
                    newCell5.appendChild(newText5);



                    var newCell7 = newRow.insertCell(5);

                    switch (data[ele].METODO_PAGO) {

                        case 2: {

                            var newText7 = document.createTextNode("Por Banco, pago de para: " + data[ele].FONDO);

                            break;
                        }
                        case 3: {

                            var newText7 = document.createTextNode("Por Planilla, pago de para: " + data[ele].FONDO);

                            break;
                        }
                        default: {

                            var newText7 = document.createTextNode("En efectivo, pago de para: " + data[ele].FONDO);
                            break;
                        }
                    }

                    newCell7.appendChild(newText7);

                    var newCell8 = newRow.insertCell(6);


                    var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                    newCell8.appendChild(newText8);




                }

                //if (getUrlVars()["fondo"] == 'MUTUALIDAD') {

                //    var persona = new Object();
                //    persona.identificacion = getUrlVars()["id"];
                //    persona.fondo = 'AFILMUT';
                //    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                //    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                //    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                //        url: urllocal + 'Historial_pagos',
                //        type: 'POST',
                //        dataType: 'json',
                //        data: persona,
                //        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                //            if (data.length == 0) {

                //            } else {




                //              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                //                    var tableRef = document.getElementById("tablahistorial").getElementsByTagName('tbody')[0];

                //                    // Insert a row in the table at the last row
                //                    var newRow = tableRef.insertRow(tableRef.rows.length);

                //                    // Insert a cell in the row at index 0
                //                    var newCell = newRow.insertCell(0);

                //                    // Append a text node to the cell
                //                    var newText = document.createTextNode(data[ele].QUINCENA + '/' + data[ele].MES + '/' + data[ele].ANNO);

                //                    newCell.appendChild(newText);
                //                    //var personabeneficiario = new Object();
                //                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                //                    var newCell2 = newRow.insertCell(1);


                //                    var newText2 = document.createTextNode(data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO);
                //                    newCell2.appendChild(newText2);

                //                    var newCell3 = newRow.insertCell(2);


                //                    var newText3 = document.createTextNode(data[ele].MONTO);
                //                    newCell3.appendChild(newText3);


                //                    var newCell4 = newRow.insertCell(3);


                //                    var newText4 = document.createTextNode(data[ele].SALDO);
                //                    newCell4.appendChild(newText4);


                //                    var newCell5 = newRow.insertCell(4);


                //                    var newText5 = document.createTextNode(dateConvert(data[ele].FEC_ULT_ACT, "DD-MM-YYYY"));
                //                    newCell5.appendChild(newText5);



                //                    var newCell7 = newRow.insertCell(5);

                //                    switch (data[ele].METODO_PAGO) {

                //                        case 2:
                //                            var newText7 = document.createTextNode("Por Banco (afiliación)");
                //                            break;
                //                        case 3:
                //                            var newText7 = document.createTextNode("Por Planilla (afiliación)");
                //                            break;
                //                        default:
                //                            var newText7 = document.createTextNode("En efectivo (afiliación)");
                //                    }

                //                    newCell7.appendChild(newText7);

                //                    var newCell8 = newRow.insertCell(6);


                //                    var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                //                    newCell8.appendChild(newText8);




                //                }




                //            }

                //        },
                //        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                //            alert(xhr);
                //        }
                //    });
                //    var persona = new Object();
                //    persona.identificacion = getUrlVars()["id"];
                //    persona.fondo = 'MUTUALIDAD AFILIACION';
                //    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                //    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                //    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                //        url: urllocal + 'Historial_pagos',
                //        type: 'POST',
                //        dataType: 'json',
                //        data: persona,
                //        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                //            if (data.length == 0) {

                //            } else {




                //              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                //                    var tableRef = document.getElementById("tablahistorial").getElementsByTagName('tbody')[0];

                //                    // Insert a row in the table at the last row
                //                    var newRow = tableRef.insertRow(tableRef.rows.length);

                //                    // Insert a cell in the row at index 0
                //                    var newCell = newRow.insertCell(0);

                //                    // Append a text node to the cell
                //                    var newText = document.createTextNode(data[ele].QUINCENA + '/' + data[ele].MES + '/' + data[ele].ANNO);

                //                    newCell.appendChild(newText);
                //                    //var personabeneficiario = new Object();
                //                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                //                    var newCell2 = newRow.insertCell(1);


                //                    var newText2 = document.createTextNode(data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO);
                //                    newCell2.appendChild(newText2);

                //                    var newCell3 = newRow.insertCell(2);


                //                    var newText3 = document.createTextNode(data[ele].MONTO);
                //                    newCell3.appendChild(newText3);


                //                    var newCell4 = newRow.insertCell(3);


                //                    var newText4 = document.createTextNode(data[ele].SALDO);
                //                    newCell4.appendChild(newText4);


                //                    var newCell5 = newRow.insertCell(4);


                //                    var fecha1 = new Date(data[ele].FEC_ULT_ACT);
                //                    var fecha1 = new Date(fecha1.setTime(fecha1.getTime() + 1 * 86400000));
                //                    var newText5 = document.createTextNode(fecha1.toLocaleDateString("es-ES", options));
                //                    newCell5.appendChild(newText5);




                //                    var newCell7 = newRow.insertCell(5);

                //                    switch (data[ele].METODO_PAGO) {

                //                        case 2:
                //                            var newText7 = document.createTextNode("Por Banco (afiliación)");
                //                            break;
                //                        case 3:
                //                            var newText7 = document.createTextNode("Por Planilla (afiliación)");
                //                            break;
                //                        default:
                //                            var newText7 = document.createTextNode("En efectivo (afiliación)");
                //                            break;
                //                    }

                //                    newCell7.appendChild(newText7);

                //                    var newCell8 = newRow.insertCell(6);


                //                    var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                //                    newCell8.appendChild(newText8);




                //                }




                //            }

                //        },
                //        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                //            alert(xhr);
                //        }
                //    });
                //}
                //if (getUrlVars()["fondo"] == 'SOLIDARIDAD') {

                //    var persona = new Object();
                //    persona.identificacion = getUrlVars()["id"];
                //    persona.fondo = 'AFILSOL';
                //    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                //    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                //    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                //        url: urllocal + 'Historial_pagos',
                //        type: 'POST',
                //        dataType: 'json',
                //        data: persona,
                //        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                //            if (data.length == 0) {

                //            } else {




                //              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                //                    var tableRef = document.getElementById("tablahistorial").getElementsByTagName('tbody')[0];

                //                    // Insert a row in the table at the last row
                //                    var newRow = tableRef.insertRow(tableRef.rows.length);

                //                    // Insert a cell in the row at index 0
                //                    var newCell = newRow.insertCell(0);

                //                    // Append a text node to the cell
                //                    var newText = document.createTextNode(data[ele].QUINCENA + '/' + data[ele].MES + '/' + data[ele].ANNO);

                //                    newCell.appendChild(newText);
                //                    //var personabeneficiario = new Object();
                //                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                //                    var newCell2 = newRow.insertCell(1);


                //                    var newText2 = document.createTextNode(data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO);
                //                    newCell2.appendChild(newText2);

                //                    var newCell3 = newRow.insertCell(2);


                //                    var newText3 = document.createTextNode(data[ele].MONTO);
                //                    newCell3.appendChild(newText3);


                //                    var newCell4 = newRow.insertCell(3);


                //                    var newText4 = document.createTextNode(data[ele].SALDO);
                //                    newCell4.appendChild(newText4);


                //                    var newCell5 = newRow.insertCell(4);


                //                    var newText5 = document.createTextNode(dateConvert(data[ele].FEC_ULT_ACT, "DD-MM-YYYY"));
                //                    newCell5.appendChild(newText5);



                //                    var newCell7 = newRow.insertCell(5);

                //                    switch (data[ele].METODO_PAGO) {

                //                        case 2:
                //                            var newText7 = document.createTextNode("Por Banco (afiliación)");
                //                            break;
                //                        case 3:
                //                            var newText7 = document.createTextNode("Por Planilla (afiliación)");
                //                            break;
                //                        default:
                //                            var newText7 = document.createTextNode("En efectivo (afiliación)");
                //                    }

                //                    newCell7.appendChild(newText7);

                //                    var newCell8 = newRow.insertCell(6);


                //                    var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                //                    newCell8.appendChild(newText8);




                //                }




                //            }

                //        },
                //        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                //            alert(xhr);
                //        }
                //    });
                //    var persona = new Object();
                //    persona.identificacion = getUrlVars()["id"];
                //    persona.fondo = 'SOLIDARIDAD AFILIACION';
                //    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                //    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                //    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                //        url: urllocal + 'Historial_pagos',
                //        type: 'POST',
                //        dataType: 'json',
                //        data: persona,
                //        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                //            if (data.length == 0) {

                //            } else {




                //              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                //                    var tableRef = document.getElementById("tablahistorial").getElementsByTagName('tbody')[0];

                //                    // Insert a row in the table at the last row
                //                    var newRow = tableRef.insertRow(tableRef.rows.length);

                //                    // Insert a cell in the row at index 0
                //                    var newCell = newRow.insertCell(0);

                //                    // Append a text node to the cell
                //                    var newText = document.createTextNode(data[ele].QUINCENA + '/' + data[ele].MES + '/' + data[ele].ANNO);

                //                    newCell.appendChild(newText);
                //                    //var personabeneficiario = new Object();
                //                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                //                    var newCell2 = newRow.insertCell(1);


                //                    var newText2 = document.createTextNode(data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO);
                //                    newCell2.appendChild(newText2);

                //                    var newCell3 = newRow.insertCell(2);


                //                    var newText3 = document.createTextNode(data[ele].MONTO);
                //                    newCell3.appendChild(newText3);


                //                    var newCell4 = newRow.insertCell(3);


                //                    var newText4 = document.createTextNode(data[ele].SALDO);
                //                    newCell4.appendChild(newText4);


                //                    var newCell5 = newRow.insertCell(4);


                //                    var fecha1 = new Date(data[ele].FEC_ULT_ACT);
                //                    var fecha1 = new Date(fecha1.setTime(fecha1.getTime() + 1 * 86400000));
                //                    var newText5 = document.createTextNode(fecha1.toLocaleDateString("es-ES", options));
                //                    newCell5.appendChild(newText5);




                //                    var newCell7 = newRow.insertCell(5);

                //                    switch (data[ele].METODO_PAGO) {

                //                        case 2:
                //                            var newText7 = document.createTextNode("Por Banco (afiliación)");
                //                            break;
                //                        case 3:
                //                            var newText7 = document.createTextNode("Por Planilla (afiliación)");
                //                            break;
                //                        default:
                //                            var newText7 = document.createTextNode("En efectivo (afiliación)");
                //                            break;
                //                    }

                //                    newCell7.appendChild(newText7);

                //                    var newCell8 = newRow.insertCell(6);


                //                    var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                //                    newCell8.appendChild(newText8);




                //                }




                //            }

                //        },
                //        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                //            alert(xhr);
                //        }
                //    });
                //}




            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

    if (getUrlVars()["fondo"] == 'ASOBISO') {
        var persona = new Object();
        persona.identificacionparaantigupo = getUrlVars()["id"];
        persona.fondo = 'ASOCIACION';
        persona.op = 8;
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Historial_pagos',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                if (data.length == 0) {

                } else {




                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                        var tableRef = document.getElementById("tablahistorial").getElementsByTagName('tbody')[0];

                        // Insert a row in the table at the last row
                        var newRow = tableRef.insertRow(tableRef.rows.length);

                        // Insert a cell in the row at index 0
                        var newCell = newRow.insertCell(0);

                        // Append a text node to the cell
                        var newText = document.createTextNode(data[ele].QUINCENA + '/' + data[ele].MES + '/' + data[ele].ANNO);

                        newCell.appendChild(newText);
                        //var personabeneficiario = new Object();
                        //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                        var newCell2 = newRow.insertCell(1);


                        var newText2 = document.createTextNode(data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO);
                        newCell2.appendChild(newText2);

                        var newCell3 = newRow.insertCell(2);


                        var newText3 = document.createTextNode(data[ele].MONTO);
                        newCell3.appendChild(newText3);


                        var newCell4 = newRow.insertCell(3);


                        var newText4 = document.createTextNode(data[ele].SALDO);
                        newCell4.appendChild(newText4);


                        var newCell5 = newRow.insertCell(4);


                        var newText5 = document.createTextNode(dateConvert(data[ele].FEC_ULT_ACT, "DD-MM-YYYY"));
                        newCell5.appendChild(newText5);



                        var newCell7 = newRow.insertCell(5);

                        switch (data[ele].METODO_PAGO) {

                            case 2:
                                var newText7 = document.createTextNode("Por Banco");
                                break;
                            case 3:
                                var newText7 = document.createTextNode("Por Planilla");
                                break;
                            default:
                                var newText7 = document.createTextNode("En efectivo");
                        }

                        newCell7.appendChild(newText7);

                        var newCell8 = newRow.insertCell(6);


                        var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                        newCell8.appendChild(newText8);




                    }




                }

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                alert(xhr);
            }
        });


        var persona = new Object();
        persona.identificacionparaantigupo = getUrlVars()["id"];

        persona.op = 8;
        persona.fondo = 'OTRO';
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Historial_pagos',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                if (data.length == 0) {

                } else {




                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                        var tableRef = document.getElementById("tablahistorial").getElementsByTagName('tbody')[0];

                        // Insert a row in the table at the last row
                        var newRow = tableRef.insertRow(tableRef.rows.length);

                        // Insert a cell in the row at index 0
                        var newCell = newRow.insertCell(0);

                        // Append a text node to the cell
                        var newText = document.createTextNode(data[ele].QUINCENA + '/' + data[ele].MES + '/' + data[ele].ANNO);

                        newCell.appendChild(newText);
                        //var personabeneficiario = new Object();
                        //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                        var newCell2 = newRow.insertCell(1);


                        var newText2 = document.createTextNode(data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO);
                        newCell2.appendChild(newText2);

                        var newCell3 = newRow.insertCell(2);


                        var newText3 = document.createTextNode(data[ele].MONTO);
                        newCell3.appendChild(newText3);


                        var newCell4 = newRow.insertCell(3);


                        var newText4 = document.createTextNode(data[ele].SALDO);
                        newCell4.appendChild(newText4);


                        var newCell5 = newRow.insertCell(4);


                        var fecha1 = new Date(data[ele].FEC_ULT_ACT);
                        var fecha1 = new Date(fecha1.setTime(fecha1.getTime() + 1 * 86400000));
                        var newText5 = document.createTextNode(fecha1.toLocaleDateString("es-ES", options));
                        newCell5.appendChild(newText5);




                        var newCell7 = newRow.insertCell(5);

                        switch (data[ele].METODO_PAGO) {

                            case 2:
                                var newText7 = document.createTextNode("Por Banco");
                                break;
                            case 3:
                                var newText7 = document.createTextNode("Por Planilla");
                                break;
                            default:
                                var newText7 = document.createTextNode("En efectivo");
                        }

                        newCell7.appendChild(newText7);

                        var newCell8 = newRow.insertCell(6);


                        var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                        newCell8.appendChild(newText8);




                    }




                }

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                alert(xhr);
            }
        });
    }



}

function estudiopagosvsrebajos() {

    location.href = 'estudiorebajosvspagos.html?id=' + getUrlVars()["id"] + '&fondo=' + getUrlVars()["fondo"];

}