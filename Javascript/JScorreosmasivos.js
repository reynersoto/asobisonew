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
var msg = "";
var miniprofile = document.getElementById("people");
miniprofile.innerHTML = "<li>  <img src='/Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg' onerror='this.src = 'Imagenes/btn_menu.png'' onclick='muestraprofilegrande();' /><table><tr><td><h2>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</h2><em>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "</em> </td><td></td><td><input type=image src=\"Imagenes/list-view.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"menu.html\"'></input></td><td><input type=image src=\"Imagenes/settings.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"prefuser.html\"'></input></td><td><input type=image src=\"Imagenes/plug.png\" width=\"45\" height=\"45\" onclick = \"salirdelsistema()\"></input></td></tr></table></li>";
//FIN DEL PERFIL DE USUARIO MINI
var adjunto = 0;
var machote = 0;

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

function cargahtml() {

    document.getElementById("infopersonal").innerHTML += "<table><tr><td><h2>Envió de correos a afiliados  </H2> <hr/><table><tr><td>Escriba el asunto del correo <input type='text' id='Asuntodelcorreo'/></td></tr><tr> <td>Adjuntar copia del correo a: <input type='text' id='copiadelcorreo1' value='abiensocial@ice.go.cr'/>  </td><td>Adjuntar copia del correo a: <input type='text' id='copiadelcorreo2'/>  </td><td>Adjuntar copia del correo a: <input type='text' id='copiadelcorreo3'/>  </td></tr></table> <br> Escriba el cuerpo del correo <textarea id= 'cuerpodelcorreo' cols=100 rows= 5></textarea> </td><td><h3 id='cantidaddedocsadjuntos'>Adjuntar documentos</h3><table> <tr><td> <img id='previomachote' src='' width='100px' height='100px'  /> <td>Si desea <strong>adjuntar documentos al correo</strong>, selecciónelos de antemano   <input type='file' id='inputFileboletamut' multiple  onchange='cargaadjuntos(this)' /> <hr /> Si desea utilizar una imagen como <strong>machote del correo </strong>, selecciónela  <input type='file' id='machote' accept='image/x-png,image/gif,image/jpeg'  onchange='readURL(this)' /></td> </tr> </table></td><td><div id='espacioparalistado'></div></td></tr></table>";

    document.getElementById("infopersonal").innerHTML += "<hr/><ul class='tabs' id = 'detalle' ></ul>";

    $("#detalle").append("<li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>Correos solo a morosos en Mutualidad</label><div id='tab-content0' class='tab-content animated fadeIn'></div> </li><li id='pagodos'> <input type='radio' checked name='tabs' id='tab1'><label for='tab1'>Correos solo a morosos en Solidaridad</label><div id='tab-content1' class='tab-content animated fadeIn'></div> </li><li id='pagotres'> <input type='radio' checked name='tabs' id='tab3'><label for='tab3'>Asociados en general</label><div id='tab-content3' class='tab-content animated fadeIn'></div> </li>    <li id='pagocuatro'> <input type='radio' checked name='tabs' id='tab4'><label for='tab4'>Morosos pensionados en general</label><div id='tab-content4' class='tab-content animated fadeIn'></div></li><li id='pagocinco'> <input type='radio' checked name='tabs' id='tab5'><label for='tab5'>Envió de correos según planilla</label><div id='tab-content5' class='tab-content animated fadeIn'></div></li>");
    $('#tab-content0').append("Seleccione el monto mínimo a enviar <select id ='montomut'>  <option value=\"-1000\">Menor a 1000</option><option value=\"-5000\">Menor a 5000</option><option value=\"-10000\">Menor a 10000</option><option value=\"0\">Todos los morosos</option></select><hr><paper-button raised id='compruebamut' onclick='comprobarmut()' >Comprobar</paper-button>");
    $('#tab-content1').append("Seleccione el monto mínimo a enviar <select id ='montosol'>  <option value=\"-1000\">Menor a 1000</option><option value=\"-5000\">Menor a 5000</option><option value=\"-10000\">Menor a 10000</option><option value=\"0\">Todos los morosos</option></select><hr><paper-button raised id='compruebasol' onclick='comprobarsol()' >Comprobar</paper-button>");
    $('#tab-content3').append("Seleccione el filtro <select  id=\"ddl_filtro\"  style=\"height:44px;\"><option value=\"MUTUALIDAD\">Afiliados a mutualidad</option><option value=\"SOLIDARIDAD\">Afiliados a solidaridad</option><option value=\"ASOBISO\">Afiliados a la asociación</option><option value=\"TODOS\">Afiliado a cualquier fondo</option></select><hr><select  id=\"ddl_filtro_estados\"  style=\"height:44px;\"></select><hr><paper-button raised id='compruebatodos' onclick='comprobartodos()' >Comprobar</paper-button>");
    $('#tab-content5').append("Seleccione la planilla <select  id=\"ddl_filtroplanilla\"  style=\"height:44px;\"><option value=\"911\">Afiliados en planilla 911</option><option value=\"proyecto\">Afiliados en planilla proyecto</option><option value=\"central\">Afiliados en planilla central</option><option value=\"saldo\">Afiliado paga por saldo</option></select><hr><paper-button raised id='compruebatodos' onclick='comprobarporplanilla()' >Comprobar</paper-button>");

    $('#tab-content4').append("<paper-button raised id='btngeneramorpen' onclick='comprobarpensionadosmorosos()' >Generar listado</paper-button><hr>");
    document.getElementById('copiadelcorreo2').value = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL;
    var persona = new Object();
    persona.criterio = "todos";
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


                var x = document.getElementById("ddl_filtro_estados");
                var option = document.createElement("option");
                option.text = dataestado[ele].ID + ' ' + dataestado[ele].DESCRIPCION;
                option.value = dataestado[ele].ID;
                option.id = dataestado[ele].ID;
                //   option.id=
                x.add(option);


            }
        }
    });
}

function comprobarmut() {

    // msg = document.getElementById("textocorreomut").value;
    var persona = new Object();
    persona.criterio = 'lista';
    persona.monto = document.getElementById("montomut").value;
    persona.fondo = 'MUTUALIDAD';
    persona.estado = '1000';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    document.getElementById('espacioparalistado').innerHTML = "<h2>Listado de personas a las que se les va a enviar el correo</h2><paper-button raised id='enviamut' onclick='enviar()' >Enviar</paper-button><table id='tabla' class='display' style='font-size:xx-small'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Correo</th></tr></thead><tbody>";
    $('#espacioparalistado').append(" </tbody></table>");
    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Correo',

        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {

               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("listaaenviarcorreo", JSON.stringify(data));


              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);
                    newRow.id = data[ele].IDENTIFICACION;
                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    var newText = document.createTextNode(data[ele].IDENTIFICACION);

                    newCell.appendChild(newText);
                    var newCell = newRow.insertCell(1);

                    var newText = document.createTextNode(data[ele].NOMBRE + ' ' + data[ele].PRIMER_APELLIDO + ' ' + data[ele].SEGUNDO_APELLIDO)

                    newCell.appendChild(newText);

                    var newCell = newRow.insertCell(2);

                    var newText = document.createTextNode(data[ele].EMAIL1);

                    newCell.appendChild(newText);


                }

                $('#tabla').dataTable({
                    "scrollY": "400px",
                    "scrollCollapse": true,
                    "paging": false,
                    dom: 'Bfrtip',
                    buttons: [
                        'print'
                    ]
                });
            }


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

}

function comprobarsol() {

    //  msg = document.getElementById("textocorreomut").value;
    var persona = new Object();
    persona.criterio = 'lista';
    persona.monto = document.getElementById("montosol").value;
    persona.fondo = 'SOLIDARIDAD';
    persona.estado = '1000';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    document.getElementById('espacioparalistado').innerHTML = "<h2>Listado de personas a las que se les va a enviar el correo</h2><paper-button raised id='enviasol' onclick='enviar()' >Enviar</paper-button><table id='tabla' style='font-size:xx-small' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Correo</th></tr></thead><tbody>";
    $('#espacioparalistado').append(" </tbody></table>");
    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Correo',

        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {
               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("listaaenviarcorreo", JSON.stringify(data));

              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);
                    newRow.id = data[ele].IDENTIFICACION;
                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    var newText = document.createTextNode(data[ele].IDENTIFICACION)

                    newCell.appendChild(newText);
                    var newCell = newRow.insertCell(1);

                    var newText = document.createTextNode(data[ele].NOMBRE + ' ' + data[ele].PRIMER_APELLIDO + ' ' + data[ele].SEGUNDO_APELLIDO)

                    newCell.appendChild(newText);

                    var newCell = newRow.insertCell(2);

                    var newText = document.createTextNode(data[ele].EMAIL1);

                    newCell.appendChild(newText);


                }

                $('#tabla').dataTable({
                    "scrollY": "400px",
                    "scrollCollapse": true,
                    "paging": false,
                    dom: 'Bfrtip',
                    buttons: [
                        'print'
                    ]
                });
            }


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

}

function comprobartodos() {

    //   msg = document.getElementById("textocorreotod").value;
    var persona = new Object();
    persona.criterio = 'lista';
    persona.monto = "100000";
    persona.fondo = document.getElementById("ddl_filtro").value;
    persona.estado = document.getElementById("ddl_filtro_estados").value;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    document.getElementById('espacioparalistado').innerHTML = "<h2>Listado de personas a las que se les va a enviar el correo</h2><paper-button raised id='enviatodos' onclick='enviar()' >Enviar</paper-button><table id='tabla' style='font-size:xx-small' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Correo</th></tr></thead><tbody>";
    $('#espacioparalistado').append(" </tbody></table>");
    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Correo',

        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {
               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("listaaenviarcorreo", JSON.stringify(data));

              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);
                    newRow.id = data[ele].IDENTIFICACION;
                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    var newText = document.createTextNode(data[ele].IDENTIFICACION);

                    newCell.appendChild(newText);
                    var newCell = newRow.insertCell(1);

                    var newText = document.createTextNode(data[ele].NOMBRE + ' ' + data[ele].PRIMER_APELLIDO + ' ' + data[ele].SEGUNDO_APELLIDO)

                    newCell.appendChild(newText);

                    var newCell = newRow.insertCell(2);

                    var newText = document.createTextNode(data[ele].EMAIL1);

                    newCell.appendChild(newText);


                }

                $('#tabla').dataTable({
                    "scrollY": "400px",
                    "scrollCollapse": true,
                    "paging": false,
                    dom: 'Bfrtip',
                    buttons: [
                        'print'
                    ]
                });
            }


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

}


function comprobarporplanilla() {
    // msg = document.getElementById("textocorreoporplanilla").value;
    var persona = new Object();
    persona.criterio = 'listaxplanilla';
    persona.monto = "100000";
    persona.planilla = document.getElementById("ddl_filtroplanilla").value;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    document.getElementById('espacioparalistado').innerHTML = "<h2>Listado de personas a las que se les va a enviar el correo</h2><paper-button raised id='enviatodos' onclick='enviar()' >Enviar</paper-button><table id='tabla' style='font-size:xx-small' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificación</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Correo</th></tr></thead><tbody>";
    $('#espacioparalistado').append(" </tbody></table>");
    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Correo',

        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {
               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("listaaenviarcorreo", JSON.stringify(data));

              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);
                    newRow.id = data[ele].IDENTIFICACION;
                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    var newText = document.createTextNode(data[ele].IDENTIFICACION);

                    newCell.appendChild(newText);
                    var newCell = newRow.insertCell(1);

                    var newText = document.createTextNode(data[ele].NOMBRE + ' ' + data[ele].PRIMER_APELLIDO + ' ' + data[ele].SEGUNDO_APELLIDO)

                    newCell.appendChild(newText);

                    var newCell = newRow.insertCell(2);

                    var newText = document.createTextNode(data[ele].EMAIL1);

                    newCell.appendChild(newText);


                }

                $('#tabla').dataTable({
                    "scrollY": "400px",
                    "scrollCollapse": true,
                    "paging": false,
                    dom: 'Bfrtip',
                    buttons: [
                        'print'
                    ]
                });
            }


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });
}



function mostrarocultarsaldoasobiso() {

}

function comprobarpensionadosmorosos() {

    // msg = document.getElementById("textocorreotod").value;
    var persona = new Object();
    persona.criterio = 'listapensionadosmorosos';

    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    document.getElementById('espacioparalistado').innerHTML = "<h2>Listado de personas a las que se les va a enviar el correo  </h2><paper-button raised id='enviatodos' onclick='enviar()' >Enviar</paper-button><table id='tabla' style='font-size:xx-small' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Detalle de saldos</th></tr></thead><tbody>";
    $('#espacioparalistado').append(" </tbody></table>");
    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Correo',

        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {
               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("listaaenviarcorreo", JSON.stringify(data));

              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);
                    newRow.id = data[ele].IDENTIFICACION;
                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    //   var newText = document.createTextNode(data[ele].IDENTIFICACION);


                    var btnFORZAR = document.createElement("a");
                    //btnmodifica.type = "button";
                    // btnFORZAR.type = "button";
                    btnFORZAR.setAttribute("href", "inicio.html?id=" + data[ele].IDENTIFICACION);
                    btnFORZAR.id = 'boton'
                    btnFORZAR.innerHTML = data[ele].IDENTIFICACION;


                    newCell.appendChild(btnFORZAR);
                    var newCell = newRow.insertCell(1);

                    var newText = document.createTextNode(data[ele].NOMBRE + ' ' + data[ele].PRIMER_APELLIDO + ' ' + data[ele].SEGUNDO_APELLIDO)

                    newCell.appendChild(newText);

                    var newCell = newRow.insertCell(2);
                    if (data[ele].EMAIL2 != "") {
                        var newText = document.createTextNode(data[ele].EMAIL1 + ' si existe también se enviara a correo alterno: ' + data[ele].EMAIL2);
                    } else {
                        var newText = document.createTextNode(data[ele].EMAIL1);

                    }
                    newCell.appendChild(newText);
                    var newCell = newRow.insertCell(3);

                    var newText = document.createTextNode(data[ele].DEPARTAMENTO);

                    newCell.appendChild(newText);

                }

                $('#tabla').dataTable({
                    "scrollY": "400px",
                    "scrollCollapse": true,
                    "paging": false,
                    dom: 'Bfrtip',
                    buttons: [
                        'print'
                    ]
                });
            }


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

}

function enviar() {
    if (document.getElementById('Asuntodelcorreo').value != '' && document.getElementById('cuerpodelcorreo').value != '') {
        var r = confirm("¿Desea enviar el correo a todos los asociados de la lista?, se enviara también una copia del correo a los correos de los campos respectivos");
        var contador = JSON.parse(localStorage.getItem("listaaenviarcorreo")).length;
        if (r == true) {
            var correos = '';
            for (var ele in JSON.parse(localStorage.getItem("listaaenviarcorreo"))) {


                correos += JSON.parse(localStorage.getItem("listaaenviarcorreo"))[ele].EMAIL1 + ';';
            }



            if (document.getElementById('copiadelcorreo1').value != '') {
                correos += document.getElementById('copiadelcorreo1').value + ';'
            }
            if (document.getElementById('copiadelcorreo2').value != '') {
                correos += document.getElementById('copiadelcorreo2').value + ';'
            }
            if (document.getElementById('copiadelcorreo3').value != '') {
                correos += document.getElementById('copiadelcorreo3').value + ';'
            }

            var persona = new Object();
            // persona.criterio = 'deducir';
            persona.adjunto = adjunto;
            persona.machote = machote;
            persona.de = 'avisos@asobiso.com';
            persona.clave = 'contraasobiso@123'
            persona.para = correos;
            persona.asunto = document.getElementById('Asuntodelcorreo').value;
            persona.HTML = document.getElementById('cuerpodelcorreo').value;
            //   persona.identificacion = lista[ele].IdentificaciOn;
            //        //ajax de los ayudas prestadas
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                url: urllocal + 'CorreoIndividualconadjuntosymachote',
                type: 'POST',
                dataType: 'json',
                data: persona,
                /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

                    //try {
                    //    $("#filapenmoroso" + data).remove();
                    //    document.getElementById('msgdecargando').innerHTML = 'Correo electrónico enviado exitosamente a: ' + data;

                    //    lista.splice(ele, 1);
                    //   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem('listadecorreosaenviarmorosopensionado', JSON.stringify(lista));
                    //}
                    //catch (err) {

                    //}
                    alert(data);
                    location.href = 'correosmasivos.html';

                },
                /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

                }
            });




        }
    } else {
        alert('Favor rellenar el asunto y el mensaje del correo');
    }
}



function enviarapensionadosmorosos() {
    var r = confirm("¿Desea enviar el correo a todos los asociados de la lista?, el proceso puede durar un poco y se eliminara el asociado de la lista al enviarle correctamente el mismo");
    var contador = JSON.parse(localStorage.getItem("listaaenviarcorreo")).length;
    if (r == true) {

        for (var ele in JSON.parse(localStorage.getItem("listaaenviarcorreo"))) {

            var persona = new Object();
            persona.criterio = 'msgconcomprobacionconcorreoalterno';

            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
            persona.para = JSON.parse(localStorage.getItem("listaaenviarcorreo"))[ele].EMAIL1;
            persona.paraalterno = JSON.parse(localStorage.getItem("listaaenviarcorreo"))[ele].EMAIL2;
            persona.asunto = "Correo de la Asociación de bienestar social de los empleados del grupo ICE";
            persona.html = 'Este es un correo dirigido a: ' + JSON.parse(localStorage.getItem("listaaenviarcorreo"))[ele].NOMBRE + ' ' + JSON.parse(localStorage.getItem("listaaenviarcorreo"))[ele].PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("listaaenviarcorreo"))[ele].SEGUNDO_APELLIDO + ' <hr>' + 'Información importante: ' + JSON.parse(localStorage.getItem("listaaenviarcorreo"))[ele].DEPARTAMENTO + '<hr>' + msg + ' <hr> ' + ' Correo enviado por: ' + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + '<br/> <b> Este es una dirección de correo no atendida. Cualquier consulta adicional, la puede efectuar al correo abiensocial@ice.go.cr. Los números de teléfono: 20001894, 20006436, 20007391, 20007393.</b>';
            persona.correodeusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL;
            persona.idasociado = JSON.parse(localStorage.getItem("listaaenviarcorreo"))[ele].IDENTIFICACION;
            var tabla;
            /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                url: urllocal + 'Correo',

                type: 'POST',
                dataType: 'json',
                data: persona,
                /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                    contador = contador - 1;

                    $("#" + data).remove();
                    if (contador == 0) {

                        persona.criterio = 'respaldo';

                        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
                        persona.para = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL;
                        persona.asunto = "Correo de la Asociación de bienestar social de los empleados del grupo ICE";
                        persona.html = 'Este es un mensaje generado para corroborar envió de correos masivos desde el sistema ASOBISO, se envió el correo al siguiente listado de personas: ';
                        for (var eley in JSON.parse(localStorage.getItem("listaaenviarcorreo"))) {

                            persona.html += '<br/>' + JSON.parse(localStorage.getItem("listaaenviarcorreo"))[eley].NOMBRE + ' ' + JSON.parse(localStorage.getItem("listaaenviarcorreo"))[eley].PRIMER_APELLIDO + JSON.parse(localStorage.getItem("listaaenviarcorreo"))[eley].SEGUNDO_APELLIDO + ' ' + JSON.parse(localStorage.getItem("listaaenviarcorreo"))[eley].EMAIL1 + ' y ' + JSON.parse(localStorage.getItem("listaaenviarcorreo"))[eley].EMAIL2;
                        }
                        persona.correodeusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL;
                        // persona.idasociado = JSON.parse(localStorage.getItem("listaaenviarcorreo"))[ele].IDENTIFICACION;
                        var tabla;
                        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                            url: urllocal + 'Correo',

                            type: 'POST',
                            dataType: 'json',
                            data: persona,
                            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {


                                alert("Correos enviados a todos los asociados que estaban en la lista, se le envió una copia oculta a su correo");
                                var vectorvacio = [];
                               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("listaaenviarcorreo", JSON.stringify(vectorvacio));
                            }

                            ,
                            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                                // alert(xhr);
                            }
                        });




                    }

                },
                /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                    // alert(xhr);
                }
            });
        }




    }
}


function guardaradjuntos() {


}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        machote = 1;
        reader.onload = function (e) {

            $('#previomachote').attr('src', e.target.result);
            var filesmachote = $("#machote").get(0).files;
            var data = new FormData();
            for (i = 0; i < filesmachote.length; i++) {
                console.log(filesmachote[i]);
                data.append("file" + i, filesmachote[i]);
            }
            data.append('TIPO', 'MACHOTEDECORREO');
            data.append("usrid", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID);
            data.append("pssw", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA);

            /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                type: "POST",
                url: urllocal + "fileboleta",
                // datatype:'json',
                contentType: false,
                processData: false,
                data: data,
                /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (result) { },
                /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                    // alert(xhr);
                }
            });




        }

        reader.readAsDataURL(input.files[0]);
    }
}

function cargaadjuntos(input) {

    if (input.files && input.files[0]) {
        adjunto = 1;
        document.getElementById('cantidaddedocsadjuntos').innerHTML = 'Documentos adjuntos, actualmente hay: ' + input.files.length + ' documentos.'
        var files = $("#inputFileboletamut").get(0).files;

        var data = new FormData();
        //  files[0].name = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
        for (i = 0; i < files.length; i++) {
            data.append("file" + i, files[i]);
        }
        //  data.append('ID', JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION + 'mut');
        data.append('TIPO', 'ADJUNTOPARACORREOS');
        data.append("usrid", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID);
        data.append("pssw", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA);

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            type: "POST",
            url: urllocal + "fileboleta",
            // datatype:'json',
            contentType: false,
            processData: false,
            data: data,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (result) {

            }
        });

    }



}

$("#machote").change(function () {
    readURL(this);
});