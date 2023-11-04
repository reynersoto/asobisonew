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

function devuelveactivos() {
    //PERFIL DE USUARIO MINI
    document.getElementById("infopersonal").innerHTML = "";

    $('#infopersonal').append("<h1>Centro de alquiler de equipos de " + JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO + "</h1><ul class='tabs' id='detalle' ><li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>Equipos para alquilar</label><div id='tab-content0' class='tab-content animated fadeIn'> <h3>Seleccione el equipo a alquilar</h3><table id='tablaactivos' class='display'><thead><tr><th scope='col' abbr='Starter'>Numero del activo</th><th scope='col' abbr='Starter'>Descripcion</th><th scope='col' abbr='Starter'>Monto estimado mensual</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Tipo</th><th scope='col' abbr='Starter'>Ultima modificacion</th><th scope='col' abbr='Starter'>Seleccionar</th></tr></thead><tbody></tbody></table></div> </li><li id='pagodos'> <input type='radio' checked name='tabs' id='tab1'><label for='tab1'>Equipos alquilados</label><div id='tab-content1' class='tab-content animated fadeIn'><h3>Listado de equipos alquilados</h3><table id='tablaactivosalq' class='display'><thead><tr><th scope='col' abbr='Starter'>Activo</th><th scope='col' abbr='Starter'>Fecha del prestamo</th><th scope='col' abbr='Starter'>Fecha de devolución</th><th scope='col' abbr='Starter'>Plazo inicial en meses</th><th scope='col' abbr='Starter'>Estado del prestamo</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Monto actual</th><th scope='col' abbr='Starter'>Usuario y fecha</th><th scope='col' abbr='Starter'>Devolver</th><th scope='col' abbr='Starter'>Pagar</th></tr></thead><tbody></tbody></table></div> </li></ul>");


    var persona = new Object();
    persona.paraprestar = 'Si';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Activo',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {



              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                    var dater = new Date(data[ele].FEC_ULT_ACT);
                    var tableRef = document.getElementById('tablaactivos').getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);

                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    // Append a text node to the cell
                    var newText = document.createTextNode(data[ele].NUMERO_ACTIVO)

                    newCell.appendChild(newText);
                    //var personabeneficiario = new Object();
                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                    var newCell2 = newRow.insertCell(1);


                    var newText2 = document.createTextNode(data[ele].DESCRIPCION);
                    newCell2.appendChild(newText2);

                    var newCell3 = newRow.insertCell(2);


                    var newText3 = document.createTextNode(data[ele].MONTO_MENSUAL);
                    newCell3.appendChild(newText3);
                    var newCell4 = newRow.insertCell(3);

                    if (data[ele].ESTADO) {
                        var newText4 = document.createTextNode("Prestado");
                    } else {
                        var newText4 = document.createTextNode("En bodega");
                    }
                    newCell4.appendChild(newText4);


                    var newCell5 = newRow.insertCell(4);

                    if (data[ele].PARA_PRESTAMO) {
                        var newText5 = document.createTextNode("Para prestamo");
                    } else {
                        var newText5 = document.createTextNode("Para oficina");
                    }
                    newCell5.appendChild(newText5);

                    var newCell6 = newRow.insertCell(5);


                    var newText6 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(dater, "YYYY-MM-DD"));
                    newCell6.appendChild(newText6);


                    //BOTON DE MODIFICAR

                    //BOTON DE ELIMINAR
                    var btnelimina = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnelimina.type = "button";
                    btnelimina.setAttribute("onclick", "Seleccionar('" + data[ele].NUMERO_ACTIVO + "',\"" + data[ele].DESCRIPCION + "\",'" + data[ele].MONTO_MENSUAL + "');");
                    btnelimina.id = 'botons' + data[ele].NUMERO_ACTIVO;
                    btnelimina.value = "Seleccionar";

                    var newCell8 = newRow.insertCell(6);

                    newCell8.appendChild(btnelimina);

                }

                $('#tablaactivos').dataTable({
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




    var persona = new Object();
    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
    //        //ajax de los activos en prestamo
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Prestamo_activo',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {


            } else {
              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById("tablaactivosalq").getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);

                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    // Append a text node to the cell
                    var newText = document.createTextNode(data[ele].NUMERO_ACTIVO.NUMERO_ACTIVO + '/' + data[ele].NUMERO_ACTIVO.DESCRIPCION);

                    newCell.appendChild(newText);
                    //var personabeneficiario = new Object();
                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                    var newCell2 = newRow.insertCell(1);

                    var dater = new Date(data[ele].FECHA_PRESTAMO);

                    var newText2 = document.createTextNode(dater, "YYYY-MM-DD");
                    newCell2.appendChild(newText2);

                    var newCell3 = newRow.insertCell(2);

                    var dater = new Date(data[ele].FECHA_DEVOLUCION);
                    var newText3 = document.createTextNode(dater, "YYYY-MM-DD");
                    newCell3.appendChild(newText3);


                    var newCell4 = newRow.insertCell(3);


                    var newText4 = document.createTextNode(data[ele].PLAZO_INICIAL_MESES);
                    newCell4.appendChild(newText4);


                    var newCell5 = newRow.insertCell(4);


                    var newText5 = document.createTextNode(data[ele].ESTADO_DEL_PRESTAMO);
                    newCell5.appendChild(newText5);



                    var newCell7 = newRow.insertCell(5);


                    var newText7 = document.createTextNode(data[ele].METODO_PAGO.DESCRIPCION);

                    newCell7.appendChild(newText7);


                    var newCellX = newRow.insertCell(6);


                    var newTextX = document.createTextNode(data[ele].MONTO);

                    newCellX.appendChild(newTextX);



                    var newCell8 = newRow.insertCell(7);


                    var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + data[ele].FEC_ULT_ACT);
                    newCell8.appendChild(newText8);

                    var btnelimina = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnelimina.type = "button";
                    btnelimina.setAttribute("onclick", "devolver('" + data[ele].NUMERO_ACTIVO.NUMERO_ACTIVO + "','" + data[ele].FECHA_PRESTAMO + "');");
                    btnelimina.id = 'botond' + data[ele].NUMERO_ACTIVO;
                    btnelimina.value = "Devolver";

                    var newCell8 = newRow.insertCell(8);

                    newCell8.appendChild(btnelimina);

                    var btnelimina = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnelimina.type = "button";
                    btnelimina.setAttribute("onclick", "pagar('" + data[ele].NUMERO_ACTIVO.NUMERO_ACTIVO + "','" + data[ele].MONTO + "');");
                    btnelimina.id = 'botonp' + data[ele].NUMERO_ACTIVO;
                    btnelimina.value = "Pagar";

                    var newCell8 = newRow.insertCell(9);

                    newCell8.appendChild(btnelimina);

                }
                $('#tablaactivosalq').dataTable({
                    "scrollY": "500px",
                    "scrollCollapse": true,
                    "paging": false
                });
            }


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }

    });




    //return tabla.value;}


}

function Seleccionar(id, nombre, monto) {
    document.getElementById("infopersonal").innerHTML = "";

    $('#infopersonal').append("<h1>Centro de alquiler de equipos de " + JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO + "</h1> <input  class='form-control' placeholder='Identificacion del equipo' id='idequipo' value= " + id + " disabled/><input  class='form-control' placeholder='Descripcion del equipo' id='descequipo' value= " + nombre + " disabled/><input  class='form-control' placeholder='monto del equipo' id='monequipo' value= '" + monto + "' /><input  class='form-control' placeholder='Cantidad de meses de alquiler(aproximado)' id='cantmesesequipo' onkeyup=\"calculafecdev()\" type='number'/><input  class='form-control' placeholder='Fecha de devolucion(aproximada)' id='fecdev' disabled type='date'/>Seleccione el tipo de rebajo <select name=\"tipoded\" id=\"tipodedequipo\"  style=\"height:254px;width:100%;\"><option value=\"3\">En efectivo</option><option value=\"1\">Por rebajo de planilla</option></select><hr><paper-button raised id='btnalquila' onclick='alquilar()'>Comenzar proceso de alquiler</paper-button><paper-button raised id='btnvolver' onclick='devuelveactivos()'>Volver</paper-button>");

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

function calculafecdev() {
    var hoy = new Date();
    if (document.getElementById("cantmesesequipo").value != '') {

        hoy.setMonth(hoy.getMonth() + parseInt(document.getElementById("cantmesesequipo").value));

    }

    document.getElementById("fecdev").value = dateConvert(hoy, "YYYY-MM-DD");
}

function alquilar() {
    var posicion = document.getElementById('tipodedequipo').options.selectedIndex; //posicion
    var persona = new Object();
    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
    persona.alquiler = 1;
    persona.idactivo = document.getElementById("idequipo").value;
    persona.fecdev = document.getElementById("fecdev").value;
    persona.cantmeses = document.getElementById("cantmesesequipo").value;
    persona.metodopago = document.getElementById('tipodedequipo').options[posicion].value;
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //ajax de los datos personales
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Prestamo_activo',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {



        }
    });
    alert("Alquiler realizado correctamente");

    var imagen1 = new Object();
    var imagen2 = new Object();
    var persona = new Object();
    persona.criterio = 'ordensalidaequipo';
    persona.idactivo = document.getElementById("idequipo").value;
    persona.idpersona = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
    persona.monto = document.getElementById("monequipo").value;
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.plazo = document.getElementById("cantmesesequipo").value;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    $("#infopersonal").remove();
    document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"alquilerdeequipo.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"></div><paper-button raised id='imrimir2' onclick=\"imprimir2();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"alquilerdeequipo.html\"'>Volver</paper-button><hr><div id=\"imprimeme2\"></div>";
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Imagen',
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


            $('#imprimeme').append("<img src='data:image/bmp;base64," + data + "'><img src='data:image/bmp;base64," + data + "'>");
            persona.criterio = 'boletaequipo';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                url: urllocal + 'Imagen',
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

                    $('#imprimeme2').append("<img src='data:image/bmp;base64," + data + "'>");

                }
            });
        }

    });




}

var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

function imprimir() {
    var objeto = document.getElementById('imprimeme'); //obtenemos el objeto a imprimir
    var ventana = window.open('', '_blank'); //abrimos una ventana vacía nueva
    ventana.document.write(objeto.innerHTML); //imprimimos el HTML del objeto en la nueva ventana
    ventana.document.close(); //cerramos el documento
    ventana.print(); //imprimimos la ventana
    ventana.close(); //cerramos la ventana
}

function imprimir2() {
    var objeto = document.getElementById('imprimeme2'); //obtenemos el objeto a imprimir
    var ventana = window.open('', '_blank'); //abrimos una ventana vacía nueva
    ventana.document.write(objeto.innerHTML); //imprimimos el HTML del objeto en la nueva ventana
    ventana.document.close(); //cerramos el documento
    ventana.print(); //imprimimos la ventana
    ventana.close(); //cerramos la ventana
}

function devolver(uno, dos) {
    var persona = new Object();
    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
    persona.idpersona = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
    persona.devolver = 1;
    persona.idactivo = uno;
    persona.fecpres = dos;
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.criterio = 'boletaequipodev';
    //ajax de los datos personales
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Prestamo_activo',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {



        }
    });
    alert("Devolucion realizada correctamente");

    $("#infopersonal").remove();
    document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"alquilerdeequipo.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"></div>";
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Imagen',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            ////                 
            //                  


            $('#imprimeme').append("<img src='data:image/bmp;base64," + data + "'><img src='data:image/bmp;base64," + data + "'>");

        }
    });
    // devuelveactivos();
}

function pagar(uno, dos) {
    document.getElementById("infopersonal").innerHTML = "";

    $('#infopersonal').append("<h1>Centro de alquiler de equipos de " + JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO + "</h1><p id='alertadepagorepetido'></p><div>Es un pago bancario? <input type ='checkbox'  class='form-control' placeholder='Es un deposito bancario' id='esbanco'  style='width: 30px;'/></div></h2> <input type ='date'  class='form-control' placeholder='Fecha del pago' id='fechapago'/> <input onchange='corroborapagorepetido(this)' class='form-control' placeholder='Numero de pago' id='idpago'/><input  class='form-control' placeholder='Identificacion del equipo' id='idequipo' value= " + uno + " disabled/><input  class='form-control' placeholder='monto actual' id='monequipo' value= " + dos + " disabled/><input  class='form-control' placeholder='Cantidad a pagar' id='apagar' onkeyup=\"calculanuevosaldo(" + dos + ")\"/><input  class='form-control' placeholder='Nuevo saldo' id='nuevosaldo' disabled/><hr><paper-button raised id='btnalquila' onclick='rpagar()'>Realizar pago</paper-button><paper-button raised id='btnvolver' onclick='devuelveactivos()'>Volver</paper-button>");

    var persona = new Object();
    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    persona.fondo = 'EQUIPO';
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Historial_pagos',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {


            } else {



                $('#infopersonal').append("<h1>Historial de pagos de Equipo</h1><table id='tablahistorialequipo' class='table2'><thead><tr><th scope='col' abbr='Starter'>Quincena/Mes/Año</th><th scope='col'>ID y serie del pago</th><th scope='col' >Monto</th><th scope='col'>Saldo</th><th scope='col' >Fecha</th><th scope='col' >Metodo de pago</th><th scope='col' >Usuario</th><th scope='col' >Anular</th></tr></thead><tbody></tbody></table>");

              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById("tablahistorialequipo").getElementsByTagName('tbody')[0];

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
                    if (data[ele].prestamosdeequipopagados.length > 0) {
                        var newCell0 = newRow.insertCell(7);
                        var btnmodifica = document.createElement("paper-button");
                        //btnmodifica.type = "button";
                        btnmodifica.setAttribute("raised", "");
                        btnmodifica.setAttribute("onclick", "anulapago('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" + data[ele].SALDO + "','" + data[ele].FEC_ULT_ACT + "','" + data[ele].prestamosdeequipopagados[0].ACTIVO.NUMERO_ACTIVO + "','" + JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION + "',\"EQUIPO\");");
                        // btnmodifica.setAttribute("onclick", "anulapago('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION + "',\"MUTUALIDAD\");");
                        btnmodifica.innerHTML = "Anular Pago Equipo: " + data[ele].prestamosdeequipopagados[0].ACTIVO.NUMERO_ACTIVO + ' - ' + data[ele].prestamosdeequipopagados[0].ACTIVO.DESCRIPCION;
                        btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'equipo';


                        newCell0.appendChild(btnmodifica);

                    }
                    else {
                        var newCell4 = newRow.insertCell(7);


                        var newText4 = document.createTextNode("No Aplica");
                        newCell4.appendChild(newText4);
                    }
                    try {
                        switch (data[ele].METODO_PAGO) {

                            case 2:
                                document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'equipo').value = 'Imprimir comprobante';
                                break;
                            case 3:
                                document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'equipo').value = 'Imprimir comprobante';
                                break;
                            default:
                                document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'equipo').value = 'Reimprimir recibo';
                        }
                        //newCell0.innerHTML= "<input type='button' id= boton" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + " value='modificar' onclick='modificabeneficiario(" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ") />'";

                    } catch (error) { }



                }

                $('#tablahistorialequipo').dataTable({
                    "scrollY": "200px",
                    "scrollCollapse": true,
                    "paging": false,
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
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });


}

function calculanuevosaldo(m) {

    if (document.getElementById("apagar").value != '') {
        espaciador(document.getElementById("apagar"));

        document.getElementById("nuevosaldo").value = parseInt(m) + parseInt(document.getElementById("apagar").value.replace(' ', '').replace(' ', ''));
    }


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

function rpagar() {
    if (document.getElementById('alertadepagorepetido').innerHTML != '') {

        if (confirm("Desea agregar el pago, aun con la advertencia: " + document.getElementById('alertadepagorepetido').innerHTML) == true) {


            if (window.confirm("Desea registrar el pago?")) {
                if (document.getElementById("idpago").value != "" && document.getElementById("fechapago").value != "" && document.getElementById("nuevosaldo").value != "") {

                    var persona = new Object();
                    persona.operacion = "3";
                    persona.IDPERSONA = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
                    persona.IDPAGO = document.getElementById("idpago").value;
                    persona.SERIEPAGO = "E";
                    persona.TIPO = "EQUIPO";
                    if (document.getElementById('esbanco').checked) {
                        persona.METODOPAGO = "2";
                    } else {
                        persona.METODOPAGO = "1";
                    }
                    var hoy = new Date();
                    persona.MONTO = document.getElementById("apagar").value.replace(' ', '').replace(' ', '');
                    persona.IDACTIVO = document.getElementById("idequipo").value;
                    var dater = new Date(hoy);
                    persona.FECHAPAGO = document.getElementById("fechapago").value;
                    persona.MONTOSALDO = document.getElementById("nuevosaldo").value;
                    persona.IDUSUARIO = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                        url: urllocal + 'Pagoasociado',
                        type: 'POST',
                        dataType: 'json',
                        data: persona,
                        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

                            $("#infopersonal").remove();
                            document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"alquilerdeequipo.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + data + "'></img><br><br><img src='data:image/bmp;base64," + data + "'></img></div>";


                        }
                    });
                    alert("Pago realizado, imprima el recibo");
                }
            }


        }

        else {
            alert('No se proceso el pago')
        }
    }
    else {

        if (window.confirm("Desea registrar el pago?")) {
            if (document.getElementById("idpago").value != "" && document.getElementById("fechapago").value != "" && document.getElementById("nuevosaldo").value != "") {

                var persona = new Object();
                persona.operacion = "3";
                persona.IDPERSONA = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
                persona.IDPAGO = document.getElementById("idpago").value;
                persona.SERIEPAGO = "E";
                persona.TIPO = "EQUIPO";
                if (document.getElementById('esbanco').checked) {
                    persona.METODOPAGO = "2";
                } else {
                    persona.METODOPAGO = "1";
                }
                var hoy = new Date();
                persona.MONTO = document.getElementById("apagar").value.replace(' ', '').replace(' ', '');
                persona.IDACTIVO = document.getElementById("idequipo").value;
                var dater = new Date(hoy);
                persona.FECHAPAGO = document.getElementById("fechapago").value;
                persona.MONTOSALDO = document.getElementById("nuevosaldo").value;
                persona.IDUSUARIO = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'Pagoasociado',
                    type: 'POST',
                    dataType: 'json',
                    data: persona,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

                        $("#infopersonal").remove();
                        document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"alquilerdeequipo.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + data + "'></img><br><br><img src='data:image/bmp;base64," + data + "'></img></div>";


                    }
                });
                alert("Pago realizado, imprima el recibo");
            }
        }

    }
}


function corroborapagorepetido(input) {
    if (input.value != '') {
        var persona = new Object();
        persona.operacion = "10";
        persona.IDPAGO = input.value;
        persona.SERIEPAGO = 'E';
        persona.METODOPAGO = '2';
        persona.TIPO = 'EQUIPO'

        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;



        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Pagoasociado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                if (data != "") {
                    document.getElementById('alertadepagorepetido').innerHTML = '<strong style="color:red;font-size:x-large;">Según los registros este numero de pago ya ha sido ingresado a otra persona en este mismo periodo, cédula: ' + data + ' favor omitir si es necesario</strong>';
   } else {
                    document.getElementById('alertadepagorepetido').innerHTML = '';
                }
            }
        });
    }
}

function espaciador(input) {
    if (input.value.replace(' ', '').length > 3) {
        if (input.value.replace(' ', '').length < 7) {
            // var output = [document.getElementById("montopagomut").value.slice(0, document.getElementById("montopagomut").value.length - 3), ' ', document.getElementById("montopagomut").value.slice(document.getElementById("montopagomut").value.length)].join('');
            var montosinespacios = input.value.replace(' ', '');
            var output = [montosinespacios.slice(0, montosinespacios.length - 3), ' ', montosinespacios.slice(montosinespacios.length - 3, montosinespacios.length)].join('');
            input.value = output;
        } else {
            var montosinespacios = input.value.replace(' ', '').replace(' ', '');
            var output = [montosinespacios.slice(0, montosinespacios.length - 6), ' ', montosinespacios.slice(-6, montosinespacios.length - 3), ' ', montosinespacios.slice(montosinespacios.length - 3, montosinespacios.length)].join('');
            input.value = output;



        }
    } else {
        var montosinespacios = input.value.replace(' ', '').replace(' ', '');
        input.value = montosinespacios;
    }
}


function anulapago(uno, dos, tres, cuatro, cinco, idequipo, idsocio) {
    var opcion = confirm("¿Desea anular el pago " + uno + "? , esto eliminara todos los pagos con este numero y modificara los saldos de los prestamos de equipo asociado, deberá ingresar nuevamente el pago corregido correspondiente ");
    if (opcion == true) {
        var persona = new Object();
        persona.op = '3';
        persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.idpago = uno;
        persona.seriepago = dos;
        persona.idsocio = idsocio;
        persona.monto = tres;
        persona.fondo = cinco;
        persona.idequipo = idequipo;
        persona.ESEQUIPO = true;
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
                alert("Pago anulado, realice la búsqueda nuevamente, corrobore todos los montos y datos");
                window.location.href = "alquilerdeequipo.html";

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                alert(xhr);
            }
        });
    }

}