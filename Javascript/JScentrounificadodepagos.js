///*AL CONSUMIR UN API POR AJAX, MUESTRA UN MSG AL USUAIRO Y BLOQUE LA PANTALLA PARA EVITAR DOBLE ENVIO DE LA INFORMACION*/$(document).ajaxStart(function () {
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



    document.getElementById("infopersonal").innerHTML += "<h2>Centro de pagos</H2> <hr><ul class='tabs' id='detalle'  style='max-width:1500px;width:1500px' ></ul>";



    $("#detalle").append("<li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>Recibos hechos por " + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</label><div id='tab-content0' class='tab-content animated fadeIn'></div> </li><li id='pagodos'> <input type='radio' checked name='tabs' id='tab1'><label for='tab1'>Recibos por numero y serie</label><div id='tab-content1' class='tab-content animated fadeIn'></div> </li><li id='pagotres'> <input type='radio' checked name='tabs' id='tab2'><label for='tab2'>Recibos por afiliado</label><div id='tab-content2' class='tab-content animated fadeIn'></div> </li>");

    var persona = new Object();
    persona.op = '2';
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
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
                var d = document.createElement('div');
                d.setAttribute('id', 'historialmut');
                d.setAttribute('style', 'height:500px;overflow-y: scroll');
                document.getElementById("tab-content0").appendChild(d);


                $('#historialmut').append("<h1>Listado de pagos</h1><table id='tablahistorial'  class='display'><thead><tr><th scope='col' abbr='Starter'>Quincena/Mes/Año</th><th scope='col' abbr='Starter'>ID y serie del pago</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Fecha</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Asociado Y fondo</th><th scope='col' abbr='Starter'>Usuario</th><th scope='col' abbr='Starter'>Operacion</th><th scope='col' abbr='Starter'>Reimprimir</th></tr></thead><tbody></tbody></table>");

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


                    var newText5 = document.createTextNode(data[ele].FEC_ULT_ACT);
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


                    var newcellper = newRow.insertCell(6);
                    var newTextper = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + ' en el fondo: ' + data[ele].FONDO);

                    newcellper.appendChild(newTextper)

                    var newCell8 = newRow.insertCell(7);


                    var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                    newCell8.appendChild(newText8);

                    var newCellanula = newRow.insertCell(8);
                    var btnmodifica = document.createElement("paper-button");
                    //btnmodifica.type = "button";
                    btnmodifica.setAttribute("raised", "");
                    if ((data[ele].SERIE_DEL_PAGO != '') & (data[ele].IDENTIFICACION_PAGO != '')) {
                        btnmodifica.setAttribute("onclick", "anulapago('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" + data[ele].IDENTIFICACION.IDENTIFICACION + "','" + data[ele].FONDO + "';");
                        btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO;


                        newCellanula.appendChild(btnmodifica);

                    }
                    //                            
                    var newCellr = newRow.insertCell(9);
                    var btnmodifica = document.createElement("paper-button");
                    //btnmodifica.type = "button";
                    btnmodifica.setAttribute("raised", "");
                    if ((data[ele].SERIE_DEL_PAGO != '') & (data[ele].IDENTIFICACION_PAGO != '')) {
                        btnmodifica.setAttribute("onclick", "operacionpagomut('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" + data[ele].SALDO + "','" + data[ele].FEC_ULT_ACT + "','" + data[ele].METODO_PAGO + "','" + data[ele].USUARIO.ID + "','" + data[ele].IDENTIFICACION.IDENTIFICACION + "','" + data[ele].FONDO + "');");
                    }
                    btnmodifica.id = 'botonreimprime' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO;


                    newCellr.appendChild(btnmodifica);




                    //                            switch (data[ele].METODO_PAGO) {
                    //                             
                    //                                case 2:
                    //                                  document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO).value='Imprimir comprobante';
                    //                                    break;
                    //                                case 3:
                    //                                     document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO).value='Imprimir comprobante';
                    //                                    break;
                    //                                default:
                    //                                     document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO).value='Reimprimir recibo';
                    //}
                    //newCell0.innerHTML= "<input type='button' id= boton" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + " value='modificar' onclick='modificabeneficiario(" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ") />'";




                }


                $('#tablahistorial').dataTable({
                    "scrollY": "500px",
                    "scrollCollapse": true,
                    "paging": false
                });




            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });
    //                           

    var d = document.createElement('div');
    d.setAttribute('id', 'cajabusqxid');
    d.setAttribute('style', 'height:500px;overflow-y: scroll');
    document.getElementById("tab-content1").appendChild(d);
    $('#cajabusqxid').append("<h1>Busqueda de recibos</h1><input  class='form-control' placeholder='Identificacion del pago' id='idenpago'/><input  class='form-control' placeholder='Serie del pago' id='seriepago'/><paper-button raised onclick='busquedapagobanc()'>Buscar pago por banco</paper-button><paper-button raised onclick='busquedapagoefectivo()'>Buscar pago en efectivo</paper-button><hr><table id='tablahistorialxid'  class='display'><thead><tr><th scope='col' abbr='Starter'>Quincena/Mes/Año</th><th scope='col' abbr='Starter'>ID y serie del pago</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Fecha</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Asociado Y fondo</th><th scope='col' abbr='Starter'>Usuario</th><th scope='col' abbr='Starter'>Operacion</th><th scope='col' abbr='Starter'>Reimprimir</th></tr></thead><tbody></tbody></table>");


    var d = document.createElement('div');
    d.setAttribute('id', 'cajabusqxidsocio');
    d.setAttribute('style', 'height:500px;overflow-y: scroll');
    document.getElementById("tab-content2").appendChild(d);

    $('#cajabusqxidsocio').append("<h1>Busqueda de recibos de un afiliado</h1><input  class='form-control' placeholder='Identificacion del asociado' id='idensocio'/><paper-button raised onclick='busquedapagoafil()'>Buscar</paper-button><hr><table id='tablahistorialxafiliado' class='display'><thead><tr><th scope='col' abbr='Starter'>Quincena/Mes/Año</th><th scope='col' abbr='Starter'>ID y serie del pago</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Fecha</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Usuario</th><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Reimprimir</th></tr></thead><tbody></tbody></table>");




}


function anulapago(uno, dos, tres, cuatro, cinco) {

    var persona = new Object();
    persona.op = '3';
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.idpago = uno;
    persona.seriepago = dos;
    persona.idsocio = cuatro;
    persona.monto = tres;
    persona.fondo = cinco;
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



            }
            alert("Pago anulado, relice la busqueda nuevamente, corrobore todos los montos y datos");
            window.location.href = "inicio.html";

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });


}
//
function operacionpagomut(UNO, DOS, TRES, CUATRO, CINCO, SEIS, SIETE, OCHO, NUEVE) {

    var persona = new Object();
    persona.operacion = "7";
    persona.IDPERSONA = OCHO;
    persona.IDPAGO = UNO;
    persona.SERIEPAGO = DOS;
    persona.TIPO = NUEVE;
    persona.METODOPAGO = SEIS;
    persona.MONTO = TRES;
    persona.MONTOSALDO = CUATRO;
    persona.FECHAPAGO = CINCO;
    persona.IDUSUARIO = SIETE;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Pagoasociado',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            ////                 
            //                      var d = document.createElement('div');
            //                        d.setAttribute('id', 'popimprime');
            //                        d.setAttribute('class', 'popobs');
            //                        document.body.appendChild(d);
            //                      $('#infopersonal').append(
            //                   $(""));
            //                   
            //                    alert(data);
            $("#infopersonal").remove();
            document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"centrounificadodepagos.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + data + "'></img><br><br><img src='data:image/bmp;base64," + data + "'></img></div>";



        }
    });


}

function imprimir() {
    var objeto = document.getElementById('imprimeme'); //obtenemos el objeto a imprimir
    var ventana = window.open('', '_blank'); //abrimos una ventana vacía nueva
    ventana.document.write(objeto.innerHTML); //imprimimos el HTML del objeto en la nueva ventana
    ventana.document.close(); //cerramos el documento
    ventana.print(); //imprimimos la ventana
    ventana.close(); //cerramos la ventana
}

function busquedapagoefectivo() {
    if (document.getElementById("idenpago").value != "" && document.getElementById("seriepago").value != "") {
        var persona = new Object();
        persona.operacion = "9";

        persona.idpago = document.getElementById("idenpago").value;
        persona.seriepago = document.getElementById("seriepago").value;
        //ajax de los datos personales
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Pagoasociado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                if (data.ID == 0) {
                    alert("Persona no esta afiliada ni registrada");
                } else {
                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                        var tableRef = document.getElementById("tablahistorialxid").getElementsByTagName('tbody')[0];

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


                        var newText5 = document.createTextNode(data[ele].FEC_ULT_ACT);
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


                        var newcellper = newRow.insertCell(6);
                        var newTextper = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + ' en el fondo: ' + data[ele].FONDO);

                        newcellper.appendChild(newTextper)

                        var newCell8 = newRow.insertCell(7);


                        var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                        newCell8.appendChild(newText8);

                        var newCellanula = newRow.insertCell(8);
                        var btnmodifica = document.createElement("paper-button");
                        //btnmodifica.type = "button";
                        btnmodifica.setAttribute("raised", "");
                        if ((data[ele].SERIE_DEL_PAGO != '') & (data[ele].IDENTIFICACION_PAGO != '')) {
                            btnmodifica.setAttribute("onclick", "anulapago('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" + data[ele].IDENTIFICACION.IDENTIFICACION + "','" + data[ele].FONDO + "';");
                            btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO;


                            newCellanula.appendChild(btnmodifica);

                        }



                        //                            
                        var newCellr = newRow.insertCell(9);
                        var btnmodifica = document.createElement("paper-button");
                        //btnmodifica.type = "button";
                        btnmodifica.setAttribute("raised", "");
                        if ((data[ele].SERIE_DEL_PAGO != '') & (data[ele].IDENTIFICACION_PAGO != '')) {
                            btnmodifica.setAttribute("onclick", "operacionpagomut('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" + data[ele].SALDO + "','" + data[ele].FEC_ULT_ACT + "','" + data[ele].METODO_PAGO + "','" + data[ele].USUARIO.ID + "','" + data[ele].IDENTIFICACION.IDENTIFICACION + "','" + data[ele].FONDO + "');");
                        }
                        btnmodifica.id = 'botonreimprime' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO;


                        newCellr.appendChild(btnmodifica);

                    }
                    $('#tablahistorialxid').dataTable({
                        "scrollY": "500px",
                        "scrollCollapse": true,
                        "paging": false
                    });


                }
            }
        });

    } else {
        alert("Debe rellenar los campos de identificacion de pago y la serie del mismo");
    }


}

function busquedapagoafil() {

    if (document.getElementById("idensocio").value != "") {
        var persona = new Object();
        persona.identificacion = document.getElementById("idensocio").value;
        persona.fondo = 'MUTUALIDAD';
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Historial_pagos',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                if (data.length == 0) {
                    $('#' + tab).append("Sin historial en " + fondo);

                } else {



                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                        var tableRef = document.getElementById("tablahistorialxafiliado").getElementsByTagName('tbody')[0];

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


                        var newText5 = document.createTextNode(data[ele].FEC_ULT_ACT);
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

                        var newCell8 = newRow.insertCell(7);


                        var newText8 = document.createTextNode('Mutualidad');
                        newCell8.appendChild(newText8);
                        var newCellr = newRow.insertCell(8);
                        var btnmodifica = document.createElement("paper-button");
                        //btnmodifica.type = "button";
                        btnmodifica.setAttribute("raised", "");
                        if ((data[ele].SERIE_DEL_PAGO != '') & (data[ele].IDENTIFICACION_PAGO != '')) {
                            btnmodifica.setAttribute("onclick", "operacionpagomut('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" + data[ele].SALDO + "','" + data[ele].FEC_ULT_ACT + "','" + data[ele].METODO_PAGO + "','" + data[ele].USUARIO.ID + "','" + data[ele].IDENTIFICACION.IDENTIFICACION + "','" + data[ele].FONDO + "');");
                        }
                        btnmodifica.id = 'botonreimprime' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO;


                        newCellr.appendChild(btnmodifica);
                    }
                    var persona = new Object();
                    persona.identificacion = document.getElementById("idensocio").value;
                    persona.fondo = 'SOLIDARIDAD';
                    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                        url: urllocal + 'Historial_pagos',
                        type: 'POST',
                        dataType: 'json',
                        data: persona,
                        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                            if (data.length == 0) {
                                $('#' + tab).append("Sin historial en " + fondo);

                            } else {



                              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                                    var tableRef = document.getElementById("tablahistorialxafiliado").getElementsByTagName('tbody')[0];

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


                                    var newText5 = document.createTextNode(data[ele].FEC_ULT_ACT);
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
                                    var newCell8 = newRow.insertCell(7);


                                    var newText8 = document.createTextNode('Solidaridad');
                                    newCell8.appendChild(newText8);
                                    var newCellr = newRow.insertCell(8);
                                    var btnmodifica = document.createElement("paper-button");
                                    //btnmodifica.type = "button";
                                    btnmodifica.setAttribute("raised", "");
                                    if ((data[ele].SERIE_DEL_PAGO != '') & (data[ele].IDENTIFICACION_PAGO != '')) {
                                        btnmodifica.setAttribute("onclick", "operacionpagomut('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" + data[ele].SALDO + "','" + data[ele].FEC_ULT_ACT + "','" + data[ele].METODO_PAGO + "','" + data[ele].USUARIO.ID + "','" + data[ele].IDENTIFICACION.IDENTIFICACION + "','" + data[ele].FONDO + "');");
                                    }
                                    btnmodifica.id = 'botonreimprime' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO;


                                    newCellr.appendChild(btnmodifica);

                                }

                                var persona = new Object();
                                persona.identificacion = document.getElementById("idensocio").value;
                                persona.fondo = 'ASOBISO';
                                persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                                persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                                    url: urllocal + 'Historial_pagos',
                                    type: 'POST',
                                    dataType: 'json',
                                    data: persona,
                                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                                        if (data.length == 0) {
                                            $('#' + tab).append("Sin historial en " + fondo);

                                        } else {



                                          /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                                                var tableRef = document.getElementById("tablahistorialxafiliado").getElementsByTagName('tbody')[0];

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


                                                var newText5 = document.createTextNode(data[ele].FEC_ULT_ACT);
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

                                                var newCell8 = newRow.insertCell(7);


                                                var newText8 = document.createTextNode('Asobiso');
                                                newCell8.appendChild(newText8);
                                                var newCellr = newRow.insertCell(8);
                                                var btnmodifica = document.createElement("paper-button");
                                                //btnmodifica.type = "button";
                                                btnmodifica.setAttribute("raised", "");
                                                if ((data[ele].SERIE_DEL_PAGO != '') & (data[ele].IDENTIFICACION_PAGO != '')) {
                                                    btnmodifica.setAttribute("onclick", "operacionpagomut('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" + data[ele].SALDO + "','" + data[ele].FEC_ULT_ACT + "','" + data[ele].METODO_PAGO + "','" + data[ele].USUARIO.ID + "','" + data[ele].IDENTIFICACION.IDENTIFICACION + "','" + data[ele].FONDO + "');");
                                                }
                                                btnmodifica.id = 'botonreimprime' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO;


                                                newCellr.appendChild(btnmodifica);
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


                    $('#tablahistorialxafiliado').dataTable({
                        "scrollY": "500px",
                        "scrollCollapse": true,
                        "paging": false
                    });




                }

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                alert(xhr);
            }
        });
    } else {
        alert("Rellene el campo de identificacion del asociado");
    }


}

function busquedapagobanc() {
    if (document.getElementById("idenpago").value) {
        var persona = new Object();
        persona.operacion = "9";

        persona.idpago = document.getElementById("idenpago").value;
        persona.seriepago = 'Deposito';
        //ajax de los datos personales
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Pagoasociado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                if (data.ID == 0) {
                    alert("Persona no esta afiliada ni registrada");
                } else {
                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                        var tableRef = document.getElementById("tablahistorialxid").getElementsByTagName('tbody')[0];

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


                        var newText5 = document.createTextNode(data[ele].FEC_ULT_ACT);
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


                        var newcellper = newRow.insertCell(6);
                        var newTextper = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + ' en el fondo: ' + data[ele].FONDO);

                        newcellper.appendChild(newTextper)

                        var newCell8 = newRow.insertCell(7);


                        var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                        newCell8.appendChild(newText8);

                        var newCell0 = newRow.insertCell(8);
                        var btnmodifica = document.createElement("paper-button");
                        //btnmodifica.type = "button";
                        btnmodifica.setAttribute("raised", "");
                        if ((data[ele].SERIE_DEL_PAGO != '') & (data[ele].IDENTIFICACION_PAGO != '')) {
                            btnmodifica.setAttribute("onclick", "anulapago('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" + data[ele].IDENTIFICACION.IDENTIFICACION + "','" + data[ele].FONDO + "';");
                        }
                        btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO;


                        newCell0.appendChild(btnmodifica);



                        //                            
                        var newCellr = newRow.insertCell(9);
                        var btnmodifica = document.createElement("paper-button");
                        //btnmodifica.type = "button";
                        btnmodifica.setAttribute("raised", "");
                        if ((data[ele].SERIE_DEL_PAGO != '') & (data[ele].IDENTIFICACION_PAGO != '')) {
                            btnmodifica.setAttribute("onclick", "operacionpagomut('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" + data[ele].SALDO + "','" + data[ele].FEC_ULT_ACT + "','" + data[ele].METODO_PAGO + "','" + data[ele].USUARIO.ID + "','" + data[ele].IDENTIFICACION.IDENTIFICACION + "','" + data[ele].FONDO + "');");
                        }
                        btnmodifica.id = 'botonreimprime' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO;


                        newCellr.appendChild(btnmodifica);

                    }
                    $('#tablahistorialxid').dataTable({
                        "scrollY": "500px",
                        "scrollCollapse": true,
                        "paging": false
                    });


                }
            }
        });

    } else {
        alert("Debe rellenar el campo de identificacion de pago");
    }


}