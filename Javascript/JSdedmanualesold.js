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

}
else {
   /*VERIFICA SI EL ROL DEL USUARIO TIENE ACCESO A ESTA PAGINA*/  if ((JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ROL == 1) || (JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ROL == 2) || (JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ROL == 4))
    { } else
    {
        alert("No puedes ingresar a esta caracteristica");
        location.href = "/login.html";
    }
}



var miniprofile = document.getElementById("people");
miniprofile.innerHTML = "<li>  <img src='/Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg' onerror='this.src = 'Imagenes/btn_menu.png'' onclick='muestraprofilegrande();' /><table><tr><td><h2>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</h2><em>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "</em> </td><td></td><td><input type=image src=\"Imagenes/list-view.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"menu.html\"'></input></td><td><input type=image src=\"Imagenes/settings.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"prefuser.html\"'></input></td><td><input type=image src=\"Imagenes/plug.png\" width=\"45\" height=\"45\" onclick = \"salirdelsistema()\"></input></td></tr></table></li>";
//FIN DEL PERFIL DE USUARIO MINI

/*CIERRA SESION Y QUITA LAS COOKIES DE MEMORIA, REDIRIGE AL INICIO DE SESION */function salirdelsistema() {

   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("USUARIOLOGUEADO", null);

    window.location.href = "Login.html";


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

function cargatabs() {
    document.getElementById("infopersonal").innerHTML += "<h2>Deducciones a personas que pagan por saldo, segun defunciones  </H2> <hr><ul class='tabs' id='detalle' ></ul>";

    $("#detalle").append("<li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>Mutualidad</label><div id='tab-content0' class='tab-content animated fadeIn'></div> </li><li id='pagodos'> <input type='radio' checked name='tabs' id='tab1'><label for='tab1'>Solidaridad</label><div id='tab-content1' class='tab-content animated fadeIn'></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab3'><label for='tab3'>Listado de deducciones</label><div id='tab-content3' class='tab-content animated fadeIn'></div> </li>");


    var topemut = 0;
    var topesol = 0;
    var montomutp = 0;
    var montosolp = 0;
    var persona = new Object();
    persona.ope = "1";
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Parametros',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Error en la contraseÃ±a");
            } else {

                topemut = data.TOPE_MUT;
                topesol = data.TOPE_SOL + 1;
                montosolp = data.CUOTA_DEF_SOL;
                montomutp = data.CUOTA_DEF_MUT;
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });



    var persona = new Object();
    persona.criterio = 'listadoarebajar';
    //        //ajax de los ayudas prestadas
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'defsol',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                $("#tab-content1").append("No hay defunciones");

            } else {
                $('#tab-content1').append("Número de quincena <select id ='quincenasdisponibles'>  <option value=\"1\">Primera</option><option value=\"2\">Segunda</option></select>Número de mes <select id ='mesesdisponibles'><option value=\"1\">Enero</option><option value=\"2\">Febrero</option><option value=\"3\">Marzo</option><option value=\"4\">Abril</option><option value=\"5\">Mayo</option><option value=\"6\">Junio</option><option value=\"7\">Julio</option><option value=\"8\">Agosto</option><option value=\"9\">Setiembre</option><option value=\"10\">Octubre</option><option value=\"11\">Noviembre</option><option value=\"12\">Diciembre</option></select>NÃºmero de aÃ±o<select id ='annosdisponibles'></select></hr><paper-button raised id='btnaplicasol' onclick='aplicarsol()'>Aplicar las deducciones de un total de <spam id='montosol'></spam> colones</paper-button><table id='tabladefsol' class='display'><thead><tr><th scope='col' abbr='Starter'>Nombre del afiliado</th><th scope='col' abbr='Starter'>Nombre del fallecido</th><th scope='col' abbr='Starter'>Fecha defuncion</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Parentezco</th><th scope='col' abbr='Starter'>Fecha de inicio del tramite</th><th scope='col' abbr='Starter'>Usuario y fecha</th><th scope='col' abbr='Starter'>Seleccionar</th></tr></thead><tbody>");

                var x = document.getElementById("annosdisponibles");
                var option = document.createElement("option");
                var fecha = new Date();
                var ano = fecha.getFullYear();
                option.text = ano;
                option.value = ano;
                option.id = ano;
                //   option.id=
                x.add(option);



                var option = document.createElement("option");
                var fecha = new Date();
                var ano = fecha.getFullYear();
                ano = ano + 1;
                option.text = ano;
                option.value = ano;
                option.id = ano;
                //   option.id=
                x.add(option);


                var option = document.createElement("option");
                var fecha = new Date();
                var ano = fecha.getFullYear();
                ano = ano - 1;
                option.text = ano;
                option.value = ano;
                option.id = ano;
                //   option.id=
                x.add(option);


                var mes = fecha.getMonth();



                var ele = document.getElementById("mesesdisponibles");
                for (var ii = 0; ii < ele.length; ii++) {
                    if (ele.options[ii].value == mes) { //Found!
                        ele.options[ii].selected = true;
                    }
                }


                var dia = fecha.getDay;

                if (dia < 16) {
                    var ele = document.getElementById("quincenasdisponibles");
                    for (var ii = 0; ii < ele.length; ii++) {
                        if (ele.options[ii].value == 2) { //Found!
                            ele.options[ii].selected = true;
                        }
                    }

                }
                else {
                    var ele = document.getElementById("quincenasdisponibles");
                    for (var ii = 0; ii < ele.length; ii++) {
                        if (ele.options[ii].value == 1) { //Found!
                            ele.options[ii].selected = true;
                        }
                    }
                }
                $('#tab-content1').append(" </tbody></table>");
                var cont = 0;
              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById("tabladefsol").getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);

                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    // Append a text node to the cell
                    var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION.IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.IDENTIFICACION.SEGUNDO_APELLIDO);

                    newCell.appendChild(newText);
                    //var personabeneficiario = new Object();
                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                    var newCell2 = newRow.insertCell(1);


                    var newText2 = document.createTextNode(data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.NOMBRE + ' ' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.SEGUNDO_APELLIDO);
                    newCell2.appendChild(newText2);

                    var newCell3 = newRow.insertCell(2);

                    var dater = new Date(data[ele].FECHA_DEFUNCION);
                    var newText3 = document.createTextNode(dateConvert(dater, "YYYY-MM-DD"));
                    newCell3.appendChild(newText3);


                    var newCell4 = newRow.insertCell(3);


                    var newText4 = document.createTextNode(data[ele].MONTO_SUBSIDIO);
                    newCell4.appendChild(newText4);


                    var newCell5 = newRow.insertCell(4);


                    var newText5 = document.createTextNode(data[ele].IDENTIFICACION_FAMILIAR.PARENTEZCO.DESCRIPCION);
                    newCell5.appendChild(newText5);



                    var newCell7 = newRow.insertCell(5);

                    var dater = new Date(data[ele].FECHA_INICIO_TRAMITE);
                    var newText7 = document.createTextNode(dateConvert(dater, "YYYY-MM-DD"));

                    newCell7.appendChild(newText7);





                    var newCell10 = newRow.insertCell(6);

                    var dater = new Date(data[ele].FEC_ULT_ACT);
                    var newText10 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + dateConvert(dater, "YYYY-MM-DD"));
                    newCell10.appendChild(newText10);

                    cont = cont + 1;
                    var btnFORZAR = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnFORZAR.type = "checkbox";

                    btnFORZAR.id = 'check' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.IDENTIFICACION;
                    btnFORZAR.value = "Deduccion";

                    if (cont <= 11) {
                        btnFORZAR.setAttribute("checked", "");
                    }
                    btnFORZAR.setAttribute("onclick", "revalorarsol(this.checked," + montosolp + ")");
                    var newCell10 = newRow.insertCell(7);
                    var textonumero = document.createTextNode(cont);
                    newCell10.appendChild(textonumero);
                    newCell10.appendChild(btnFORZAR);


                }
                if (topesol < cont) {
                    document.getElementById("montosol").innerHTML = (topesol - 1) * montosolp;
                }
                else {
                    document.getElementById("montosol").innerHTML = cont * montosolp;
                }
                $('#tabladefsol').dataTable({
                    "scrollY": "300px",
                    "scrollCollapse": true,
                    "paging": false,
                    dom: 'Bfrtip',
                    buttons: [
                        'print'
                    ]
                });
            }

            //  document.getElementById("montosol").innerHTML = "Aplicar las deducciones de un total de " + cont * montosolp + " colones";
            //document.getElementById("montosol").innerHTML = "Aplicar las deducciones de un total de ";
        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });



    var persona = new Object();
    persona.criterio = 'listadoarebajar';
    //        //ajax de los ayudas prestadas
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'defmut',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                $("#tab-content0").append("No hay defunciones");

            } else {
                $('#tab-content0').append("Número de quincena <select id ='quincenasdisponiblesmut'>  <option value=\"1\">Primera</option><option value=\"2\">Segunda</option></select>Número de mes<select id ='mesesdisponiblesmut'><option value=\"1\">Enero</option><option value=\"2\">Febrero</option><option value=\"3\">Marzo</option><option value=\"4\">Abril</option><option value=\"5\">Mayo</option><option value=\"6\">Junio</option><option value=\"7\">Julio</option><option value=\"8\">Agosto</option><option value=\"9\">Setiembre</option><option value=\"10\">Octubre</option><option value=\"11\">Noviembre</option><option value=\"12\">Diciembre</option></select>NÃºmero de aÃ±o<select id ='annosdisponiblesmut'></select></hr><paper-button raised id='btnaplicasol' onclick='aplicarmut()'>Aplicar las deducciones de un total de <spam id='montomut'></spam> colones</paper-button><table id='tabladefmut' class='display'><thead><tr><th scope='col' abbr='Starter'>Nombre del afiliado</th><th scope='col' abbr='Starter'>Fecha defuncion</th><th scope='col' abbr='Starter'>Beneficiarios</th><th scope='col' abbr='Starter'>Usuario y fecha</th><th scope='col' abbr='Starter'>Seleccionar</th></tr></thead><tbody>");

                var x = document.getElementById("annosdisponiblesmut");
                var option = document.createElement("option");
                var fecha = new Date();
                var ano = fecha.getFullYear();
                option.text = ano;
                option.value = ano;
                option.id = ano;
                //   option.id=
                x.add(option);



                var option = document.createElement("option");
                var fecha = new Date();
                var ano = fecha.getFullYear();
                ano = ano + 1;
                option.text = ano;
                option.value = ano;
                option.id = ano;
                //   option.id=
                x.add(option);


                var option = document.createElement("option");
                var fecha = new Date();
                var ano = fecha.getFullYear();
                ano = ano - 1;
                option.text = ano;
                option.value = ano;
                option.id = ano;
                //   option.id=
                x.add(option);



                var mes = fecha.getMonth();



                var ele = document.getElementById("mesesdisponiblesmut");
                for (var ii = 0; ii < ele.length; ii++) {
                    if (ele.options[ii].value == mes) { //Found!
                        ele.options[ii].selected = true;
                    }
                }


                var dia = fecha.getDay;

                if (dia < 16) {
                    var ele = document.getElementById("quincenasdisponiblesmut");
                    for (var ii = 0; ii < ele.length; ii++) {
                        if (ele.options[ii].value == 2) { //Found!
                            ele.options[ii].selected = true;
                        }
                    }

                }
                else {
                    var ele = document.getElementById("quincenasdisponiblesmut");
                    for (var ii = 0; ii < ele.length; ii++) {
                        if (ele.options[ii].value == 1) { //Found!
                            ele.options[ii].selected = true;
                        }
                    }
                }




                $('#tab-content0').append(" </tbody></table>");
                var cont = 0;
              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById("tabladefmut").getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);

                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    // Append a text node to the cell
                    var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO);

                    newCell.appendChild(newText);
                    //var personabeneficiario = new Object();
                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;


                    var newCell3 = newRow.insertCell(1);

                    var dater = new Date(data[ele].FECHA_DEFUNCION);
                    var newText3 = document.createTextNode(dateConvert(dater, "YYYY-MM-DD"));
                    newCell3.appendChild(newText3);


                    var newCell4 = newRow.insertCell(2);


                    var newText4 = document.createTextNode(data[ele].BENEFICIARIOS);
                    newCell4.appendChild(newText4);





                    var newCell10 = newRow.insertCell(3);

                    var dater = new Date(data[ele].FEC_ULT_ACT);
                    var newText10 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + dateConvert(dater, "YYYY-MM-DD"));
                    newCell10.appendChild(newText10);

                    
                    var btnFORZAR = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnFORZAR.type = "checkbox";

                    btnFORZAR.id = 'check' + data[ele].IDENTIFICACION.IDENTIFICACION + 'mut';
                    btnFORZAR.value = "Deduccion";

                    if (cont < topemut) {
                        btnFORZAR.setAttribute("checked", "");
                    }
                    btnFORZAR.setAttribute("onclick", "revalorarmut(this.checked," + montomutp + ")");

                    var newCell10 = newRow.insertCell(4);

                    newCell10.appendChild(btnFORZAR);

                    cont = cont + 1;
                }
                if (topemut < cont) {
                    document.getElementById("montomut").innerHTML = (topemut - 1) * montomutp;
                }
                else {
                    document.getElementById("montomut").innerHTML = cont * montomutp;
                }
                $('#tabladefmut').dataTable({
                    "scrollY": "300px",
                    "scrollCollapse": true,
                    "paging": false,
                    dom: 'Bfrtip',
                    buttons: [
                        'print'
                    ]
                });
            }

            //  


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });






    var persona = new Object();
    persona.criterio = 'lista';
    //        //ajax de los ayudas prestadas
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'dedmanuales',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                $("#tab-content3").append("No hay defunciones");

            } else {
                $('#tab-content3').append("<table id='tabladef' class='display'><thead><tr><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Quincena - Mes - Ano</th><th scope='col' abbr='Starter'>Cantidad y monto</th><th scope='col' abbr='Starter'>Usuario y fecha</th><th scope='col' abbr='Starter'>Ver detalle</th></tr></thead><tbody>");
                $('#tab-content3').append(" </tbody></table>");
                var cont = 0;
              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById("tabladef").getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);

                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    // Append a text node to the cell
                    var newText = document.createTextNode(data[ele].FONDO);

                    newCell.appendChild(newText);
                    //var personabeneficiario = new Object();
                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;


                    var newCell3 = newRow.insertCell(1);


                    var newText3 = document.createTextNode(data[ele].QUINCENA + ' - ' + data[ele].MES + ' - ' + data[ele].ANNO);
                    newCell3.appendChild(newText3);


                    var newCell4 = newRow.insertCell(2);


                    var newText4 = document.createTextNode(data[ele].CANTIDAD + ' - ' + data[ele].MONTO);
                    newCell4.appendChild(newText4);

                    var newCell10 = newRow.insertCell(3);

                    var dater = new Date(data[ele].FEC_ULT_ACT);
                    var newText10 = document.createTextNode(data[ele].RESPONSABLE);
                    newCell10.appendChild(newText10);

                    var newCellr = newRow.insertCell(4);
                    var btnmodifica = document.createElement("paper-button");
                    //btnmodifica.type = "button";
                    btnmodifica.setAttribute("raised", "");
                    btnmodifica.setAttribute("onclick", "detalle('" + data[ele].FEC_ULT_ACT + "','" + data[ele].FONDO + "');");

                    btnmodifica.id = 'botondetalle' + data[ele].QUINCENA + data[ele].MES + data[ele].ANNO + data[ele].FONDO;


                    newCellr.appendChild(btnmodifica);

                }

                $('#tabladef').dataTable({
                    "scrollY": "500px",
                    "scrollCollapse": true,
                    "paging": false,
                    dom: 'Bfrtip',
                    buttons: [
                        'print'
                    ]
                });
            }

            //  


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });

}
function revalorarmut(uno, dos) {
    if (uno) {
        document.getElementById("montomut").innerHTML = parseInt(document.getElementById("montomut").innerHTML) + parseInt(dos);

    }
    else {
        document.getElementById("montomut").innerHTML = parseInt(document.getElementById("montomut").innerHTML) - parseInt(dos);
    }
}
function revalorarsol(uno, dos) {
    //if(uno)
    //    {
    //        document.getElementById("montosol").innerHTML = parseInt(document.getElementById("montosol").innerHTML)+ parseInt(dos);

    //    }
    //else
    //    { document.getElementById("montosol").innerHTML = parseInt(document.getElementById("montosol").innerHTML)- parseInt(dos);
    //        }
}
function aplicarsol() {

    var topemut = 0;
    var topesol = 0;
    var montomutp = 0;
    var montosolp = 0;
    var persona = new Object();
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    persona.ope = "1";

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Parametros',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Error en la contraseÃ±a");
            } else {

                topemut = data.TOPE_MUT + 1;
                topesol = data.TOPE_SOL + 1;
                montosolp = data.CUOTA_DEF_SOL;
                montomutp = data.CUOTA_DEF_MUT;

                var persona = new Object();
                persona.criterio = 'insertarmanual';
                persona.fondo = 'SOLIDARIDAD';
                persona.cantidad = parseInt(document.getElementById("montosol").innerHTML) / montosolp;
                persona.monto = document.getElementById("montosol").innerHTML;
                persona.responsable = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO;
                persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;

                persona.quincena = document.getElementById("quincenasdisponibles").value;

                persona.mes = document.getElementById("mesesdisponibles").value;

                persona.anno = document.getElementById("annosdisponibles").value;
                persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'dedmanuales',
                    type: 'POST',
                    dataType: 'json',
                    data: persona,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                        if (data.length == 0) {


                        } else {

                            regdefsol();

                        }

                    },
                    /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

                    }
                });
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });



}

function aplicarmut() {

    var topemut = 0;
    var topesol = 0;
    var montomutp = 0;
    var montosolp = 0;
    var persona = new Object();
    persona.ope = "1";
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Parametros',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Error en la contraseÃ±a");
            } else {

                topemut = data.TOPE_MUT + 1;
                topesol = data.TOPE_SOL + 1;
                montosolp = data.CUOTA_DEF_SOL;
                montomutp = data.CUOTA_DEF_MUT;
                var persona = new Object();
                persona.criterio = 'insertarmanual';
                persona.fondo = 'MUTUALIDAD';
                persona.cantidad = parseInt(document.getElementById("montomut").innerHTML) / montomutp;
                persona.monto = document.getElementById("montomut").innerHTML;
                persona.responsable = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO;
                persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.quincena = document.getElementById("quincenasdisponiblesmut").value;

                persona.mes = document.getElementById("mesesdisponiblesmut").value;

                persona.anno = document.getElementById("annosdisponiblesmut").value;
                //        //ajax de los ayudas prestadas
                persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'dedmanuales',
                    type: 'POST',
                    dataType: 'json',
                    data: persona,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                        if (data.length == 0) {


                        } else {
                            regdefmut();


                        }

                    },
                    /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

                    }
                });
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });


    //     var persona = new Object();
    //    persona.criterio = 'insertar';
    //    persona.fondo = 'MUTUALIDAD';
    //    persona.cantidad =  parseInt(document.getElementById("montomut").innerHTML) / montomutp;
    //    persona.monto =  document.getElementById("montomut").innerHTML;
    //    persona.responsable =JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO;
    //    persona.idusuario =JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    //                    //        //ajax de los ayudas prestadas
    //                    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
    //                        url: urllocal + 'dedmanuales',
    //                        type: 'POST',
    //                        dataType: 'json',
    //                        data: persona,
    //                        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
    //                            if (data.length == 0) {


    //                            } else {


    //alert("Deducciones aplicadas, correctamente");
    //        window.location.href="dedmanuales.html";                         
    //            }   

    //                        },
    //                        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

    //                        }
    //                    });

}

function regdefmut() {


    var persona = new Object();
    persona.criterio = 'listadoarebajar';
    //        //ajax de los ayudas prestadas
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'defmut',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                $("#tab-content0").append("No hay defunciones");

            } else {

              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var chequeo = document.getElementById('check' + data[ele].IDENTIFICACION.IDENTIFICACION + 'mut');
                    if (chequeo.checked) {
                        // alert(data[ele].IDENTIFICACION.IDENTIFICACION);
                        var persona = new Object();
                        persona.criterio = 'deducir';

                        persona.idsocio = data[ele].IDENTIFICACION.IDENTIFICACION;
                        //        //ajax de los ayudas prestadas
                        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                            url: urllocal + 'defmut',
                            type: 'POST',
                            dataType: 'json',
                            data: persona,
                            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                                if (data.length == 0) {


                                } else {


                                }


                            },
                            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

                            }
                        });

                    }

                }
                alert("Deducciones aplicadas, correctamente");
                window.location.href = "dedmanuales.html";
            }

            //  


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });





}

function regdefsol() {


    var persona = new Object();
    persona.criterio = 'listadoarebajar';
    //        //ajax de los ayudas prestadas
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'defsol',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                $("#tab-content0").append("No hay defunciones");

            } else {

              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var chequeo = document.getElementById('check' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.IDENTIFICACION);
                    if (chequeo.checked) {


                        var persona = new Object();
                        persona.criterio = 'deducir';
                        persona.idfallecido = data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.IDENTIFICACION;
                        persona.idsocio = data[ele].IDENTIFICACION.IDENTIFICACION.IDENTIFICACION;
                        //        //ajax de los ayudas prestadas
                        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                            url: urllocal + 'defsol',
                            type: 'POST',
                            dataType: 'json',
                            data: persona,
                            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                                if (data.length == 0) {


                                } else {


                                }


                            },
                            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

                            }
                        });





                    }

                }
                alert("Deducciones aplicadas, correctamente");
                window.location.href = "dedmanuales.html";
            }

            //  


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

        }
    });





}

function detalle(uno, dos) {
    if (dos == 'MUTUALIDAD') {

        var persona = new Object();
        persona.criterio = 'listadoxdeduccion';
        //        //ajax de los ayudas prestadas
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
        persona.fechadeduccion = uno;
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'defmut',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                if (data.length == 0) {
                    $("#tab-content3").append("No hay defunciones");

                } else {
                    $('#tab-content3').append("<paper-button raised id='btnvolver' onclick='aplicarmut()'>volver</paper-button><table id='tabladefmut' class='display'><thead><tr><th scope='col' abbr='Starter'>Nombre del afiliado</th><th scope='col' abbr='Starter'>Fecha defuncion</th><th scope='col' abbr='Starter'>Beneficiarios</th><th scope='col' abbr='Starter'>Usuario y fecha</th><th scope='col' abbr='Starter'>Seleccionar</th></tr></thead><tbody>");





                    $('#tab-content3').append(" </tbody></table>");
                    var cont = 0;
                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                        var tableRef = document.getElementById("tabladefmut").getElementsByTagName('tbody')[0];

                        // Insert a row in the table at the last row
                        var newRow = tableRef.insertRow(tableRef.rows.length);

                        // Insert a cell in the row at index 0
                        var newCell = newRow.insertCell(0);

                        // Append a text node to the cell
                        var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO);

                        newCell.appendChild(newText);
                        //var personabeneficiario = new Object();
                        //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;


                        var newCell3 = newRow.insertCell(1);

                        var dater = new Date(data[ele].FECHA_DEFUNCION);
                        var newText3 = document.createTextNode(dateConvert(dater, "YYYY-MM-DD"));
                        newCell3.appendChild(newText3);


                        var newCell4 = newRow.insertCell(2);


                        var newText4 = document.createTextNode(data[ele].BENEFICIARIOS);
                        newCell4.appendChild(newText4);





                        var newCell10 = newRow.insertCell(3);

                        var dater = new Date(data[ele].FEC_ULT_ACT);
                        var newText10 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + dateConvert(dater, "YYYY-MM-DD"));
                        newCell10.appendChild(newText10);




                    }

                    $('#tabladefmut').dataTable({
                        "scrollY": "300px",
                        "scrollCollapse": true,
                        "paging": false,
                        dom: 'Bfrtip',
                        buttons: [
                            'print'
                        ]
                    });
                }

                //  


            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });
    } else {
        var persona = new Object();
        persona.criterio = 'listadoxdeduccion';
        //        //ajax de los ayudas prestadas
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
        persona.fechadeduccion = uno;
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'defsol',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                if (data.length == 0) {
                    $("#tab-content3").append("No hay defunciones");

                } else {
                    document.getElementById('tab-content3').innerHTML = "";
                    $('#tab-content3').append("<paper-button raised id='btnvolver' onclick='aplicarsol()'>Volver</paper-button><table id='tabladefsol' class='display'><thead><tr><th scope='col' abbr='Starter'>Nombre del afiliado</th><th scope='col' abbr='Starter'>Nombre del fallecido</th><th scope='col' abbr='Starter'>Fecha defuncion</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Parentezco</th><th scope='col' abbr='Starter'>Fecha de inicio del tramite</th><th scope='col' abbr='Starter'>Usuario y fecha</th></tr></thead><tbody>");


                    $('#tab-content3').append(" </tbody></table>");

                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                        var tableRef = document.getElementById("tabladefsol").getElementsByTagName('tbody')[0];

                        // Insert a row in the table at the last row
                        var newRow = tableRef.insertRow(tableRef.rows.length);

                        // Insert a cell in the row at index 0
                        var newCell = newRow.insertCell(0);

                        // Append a text node to the cell
                        var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION.IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.IDENTIFICACION.SEGUNDO_APELLIDO);

                        newCell.appendChild(newText);
                        //var personabeneficiario = new Object();
                        //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                        var newCell2 = newRow.insertCell(1);


                        var newText2 = document.createTextNode(data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.NOMBRE + ' ' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.SEGUNDO_APELLIDO);
                        newCell2.appendChild(newText2);

                        var newCell3 = newRow.insertCell(2);

                        var dater = new Date(data[ele].FECHA_DEFUNCION);
                        var newText3 = document.createTextNode(dateConvert(dater, "YYYY-MM-DD"));
                        newCell3.appendChild(newText3);


                        var newCell4 = newRow.insertCell(3);


                        var newText4 = document.createTextNode(data[ele].MONTO_SUBSIDIO);
                        newCell4.appendChild(newText4);


                        var newCell5 = newRow.insertCell(4);


                        var newText5 = document.createTextNode(data[ele].IDENTIFICACION_FAMILIAR.PARENTEZCO.DESCRIPCION);
                        newCell5.appendChild(newText5);



                        var newCell7 = newRow.insertCell(5);

                        var dater = new Date(data[ele].FECHA_INICIO_TRAMITE);
                        var newText7 = document.createTextNode(dateConvert(dater, "YYYY-MM-DD"));

                        newCell7.appendChild(newText7);





                        var newCell10 = newRow.insertCell(6);

                        var dater = new Date(data[ele].FEC_ULT_ACT);
                        var newText10 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + dateConvert(dater, "YYYY-MM-DD"));
                        newCell10.appendChild(newText10);




                    }

                    $('#tabladefsol').dataTable({
                        "scrollY": "300px",
                        "scrollCollapse": true,
                        "paging": false,
                        dom: 'Bfrtip',
                        buttons: [
                            'print'
                        ]
                    });
                }

                //  document.getElementById("montosol").innerHTML = "Aplicar las deducciones de un total de " + cont * montosolp + " colones";
                //document.getElementById("montosol").innerHTML = "Aplicar las deducciones de un total de ";
            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });


    }
}

