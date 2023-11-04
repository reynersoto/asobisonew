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
var hoy = new Date();

var urllocal = 'api/';

var url_string = window.location.href
var url = new URL(url_string);
var numerodepago = url.searchParams.get("numpago");




var fondo = url.searchParams.get("fondo");


if (numerodepago !== null && fondo !== null) {

    var persona = new Object();
    persona.idpago = numerodepago;
    persona.fondo = fondo;
    persona.operacion = '10';

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Pagoasociado',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

            $('#infopersonal').append("<h1>Pagos registrados en el fondo " + fondo + " con el numero: " + numerodepago + "</h1><table style='font-size: larger;' class='table2' id='tablahistorialmutualidad' ><thead><tr><th scope='col' abbr='Starter'>Fecha</th><th scope='col' abbr='Starter'>Numero del pago</th><th scope='col' abbr='Starter'>Asociado</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Seleccionar</th></tr></thead><tbody></tbody></table>");

          /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                var tableRef = document.getElementById("tablahistorialmutualidad").getElementsByTagName('tbody')[0];

                // Insert a row in the table at the last row
                var newRow = tableRef.insertRow(tableRef.rows.length);

                // Insert a cell in the row at index 0
                var newCell = newRow.insertCell(0);

                // Append a text node to the cell
                var newText = document.createTextNode(data[ele].FEC_ULT_ACT);

                newCell.appendChild(newText);
                //var personabeneficiario = new Object();
                //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                var newCell2 = newRow.insertCell(1);


                var newText2 = document.createTextNode(data[ele].IDENTIFICACION_PAGO);
                newCell2.appendChild(newText2);



                var newCell3 = newRow.insertCell(2);


                var newText3 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO);
                newCell3.appendChild(newText3);


                var newCell3 = newRow.insertCell(3);


                var newText3 = document.createTextNode(data[ele].MONTO);
                newCell3.appendChild(newText3);


                var newCell4 = newRow.insertCell(4);


                var newText4 = document.createTextNode(data[ele].SALDO);
                newCell4.appendChild(newText4);



                var newCellanula = newRow.insertCell(5);
                var btnmodifica = document.createElement("input");
                //btnmodifica.type = "button";
                btnmodifica.setAttribute("type", "button");
                btnmodifica.setAttribute("value", "Seleccionar");
                if ((data[ele].SERIE_DEL_PAGO != '') & (data[ele].IDENTIFICACION_PAGO != '')) {
                    btnmodifica.setAttribute("onclick", "muestradetalles('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].MONTO + "','" + data[ele].FEC_ULT_ACT + "','" + data[ele].FONDO + "','" + data[ele].IDENTIFICACION.IDENTIFICACION + "','" + data[ele].MONTO + "');");
                }
                btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO;


                newCellanula.appendChild(btnmodifica);



            }
        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });



}


function muestradetalles(uno, dos, tres, cuatro, idasociado, montodelpago) {
    $('#infodepago').remove();
    $('#infopersonal').append("<div id='infodepago'><hr>Numero actual: <input type='text' value= " + uno + " id='numerodepago'/> <input type='button' value='Cambiar Numero' onclick= 'cambiar(\"" + tres + "\",\"" + tres + "\",\"" + uno + "\",\"" + cuatro + "\",\"" + idasociado + "\",\"" + montodelpago + "\")' /> <hr> Monto actual: <input type='text' value= " + dos + " id='montodepago'/> <input type='button' value='Cambiar Monto' onclick= 'cambiarmonto(\"" + tres + "\",\"" + tres + "\",\"" + uno + "\",\"" + cuatro + "\",\"" + idasociado + "\",\"" + montodelpago + "\")' /> <hr> Fecha actual: " + tres + " <input type='date' value= " + tres + " id='fechadepago'/> <input type='button' value='Cambiar fecha' onclick= 'cambiarfecha(\"" + tres + "\",\"" + tres + "\",\"" + uno + "\",\"" + cuatro + "\",\"" + idasociado + "\",\"" + montodelpago + "\")' /> <hr> </div>");

}

function cambiar(uno, dos, tres, cuatro, idasociado, montodelpago) {
    //fecha,fecha,idpagooriginal,fondo
    var r = confirm("Desea cambiar este numero de pago?");
    if (r == true) {
        var persona = new Object();
        persona.numeropagoold = tres;
        persona.fondo = cuatro;
        persona.fechadelpago = uno;
        persona.fondo = cuatro;
        persona.numeropagonew = document.getElementById("numerodepago").value;
        persona.operacion = "11";
        persona.iddelasociado = idasociado;
        persona.montopagado = montodelpago;
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Pagoasociado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                alert("Se cambio correctamente el numero de deposito");
                location.href = 'Adm_de_pagos.html?numpago=' + document.getElementById("numerodepago").value + '&fondo=' + cuatro + '';;
            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });




    } else {

    }

}


function cambiarmonto(uno, dos, tres, cuatro, idasociado, montodelpago) {
    //fecha,fecha,idpagooriginal,fondo
    var r = confirm("Desea cambiar el monto al pago?");
    if (r == true) {
        var persona = new Object();
        persona.numeropagoold = tres;
        persona.fondo = cuatro;
        persona.fechadelpago = uno;
        persona.fondo = cuatro;
        persona.montonew = document.getElementById("montodepago").value;
        persona.operacion = "12";
        persona.iddelasociado = idasociado;
        persona.montopagado = montodelpago;
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Pagoasociado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                alert("Se cambio correctamente el monto al deposito");
                location.href = 'Adm_de_pagos.html?numpago=' + tres + '&fondo=' + cuatro + '';
            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });




    } else {

    }

}


function cambiarfecha(uno, dos, tres, cuatro, idasociado, montodelpago) {
    //fecha,fecha,idpagooriginal,fondo
    var r = confirm("Desea cambiar la fecha al pago?");
    if (r == true) {
        var persona = new Object();
        persona.numeropagoold = tres;
        persona.fondo = cuatro;
        persona.fechadelpago = uno;
        persona.fondo = cuatro;
        persona.fechanew = document.getElementById("fechadepago").value;
        persona.operacion = "13";
        persona.iddelasociado = idasociado;
        persona.montopagado = montodelpago;
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Pagoasociado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                alert("Se cambio correctamente la fecha al deposito");
                location.href = 'Adm_de_pagos.html?numpago=' + tres + '&fondo=' + cuatro + '';
            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });




    } else {

    }

}