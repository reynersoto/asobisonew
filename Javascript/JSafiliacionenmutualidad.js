///*AL CONSUMIR UN API POR AJAX, MUESTRA UN MSG AL USUAIRO Y BLOQUE LA PANTALLA PARA EVITAR DOBLE ENVIO DE LA INFORMACION*/$(document).ajaxStart(function () {
//    $("#loading").html("<div id='contenedor_caja'><H1>HOLA, ESTAMOS CARGANDO LA APLICACION, GRACIAS POR SU PACIENCIA</H1></div>");
//    // $("#carga").addClass("loading");
//    document.getElementById('loading').style.width = screen.width + 'px';
//    document.getElementById('loading').style.height = screen.height + 'px';
//    document.getElementById('loading').style.backgroundColor = "white";
//    document.getElementById('loading').style.zIndex = '220';
//    //document.getElementById('loading').style.opacity = '0.9';
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


if (JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")) != null) {
    if (JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).ESTADO.ID != 12 && JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).ESTADO.ID != 19) {
        alert("Persona ya esta afiliada a mutualidad");
        location.href = "/inicio.html";
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

function cargahtml() {

    //     Nombre <input type="text" name="nombre" id="nombre" placeholder="Nombre" />
    //                Primer apellido <input type="text" name="ap1" id="ap1" placeholder="Primer apellido" />
    //                Segundo apellido <input type="text" name="ap2" id="ap2" placeholder="Segundo apellido" />
    //                Correo electronico principal <input type="text" name="email" id="email" placeholder="***Correo electronico principal" />
    //                Correo electronico secundario <input type="text" name="email2" id="email2" placeholder="Correo electronico secundarios" />
    //                Fecha nacimiento <input type="date" name="fecha_nac" id="fecha_nac" placeholder="Fecha de nacimiento" />
    //
    //              
    //                <input type="button" name="previous" class="previous action-button" value="Previo" />
    //                <input type="button" name="next" class="next action-button" value="Siguiente" />
    //            </fieldset>
    //            <fieldset>
    //                <h2 class="fs-title">Segundo paso</h2>
    //                <h3 class="fs-subtitle">Datos personales</h3>
    //               Primer telefono <input type="text" name="tel1" id="tel1" placeholder="Primer teléfono" />
    //               Segundo telefono <input type="text" name="tel2" id="tel2" placeholder="Segundo teléfono" />
    //               Movil <input type="text" name="cel" id="cel" placeholder="teléfono movil" />
    //                Fecha ingreso al ICE <input type="date" name="fecha_ing_ICE" id="fecha_ing_ICE" placeholder="Fecha de ingreso al ICE" />
    //
    //               Direccion <textarea name="direccion" id="direccion" placeholder="Dirección"></textarea>
    //               
    $("#infopersonal").append("<h1>Nueva a filiación en mutualidad para: <br>"
        + JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION
        + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE
        + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO
        + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO
        + "</h2><table><tr><td><h3>Actualice los datos personales(si es necesario) <paper-button raised id='btnocultaact' onclick='cambiaract()'>No es necesario, ocultar</paper-button><h3><div id='cuadro_para_act' style=\"visibility: visible\"><table><tr><td><input class='form-control' placeholder='Nombre' id='nombre'/><input class='form-control' placeholder='Primer apellido' id='ap1'/><input class='form-control' placeholder='Segundo apellido' id='ap2'/><input class='form-control' placeholder='Correo electronico principal' id='email'/><input class='form-control' placeholder='Segundo correo electronico' id='email2'/><br/>Fecha de nacimiento<br/><input class='form-control' placeholder='Fecha nacimiento' id='fecha_nac' type='date'/></td><td><br/>Primer teléfono<br/><input class='form-control' placeholder='Primer telefono' id='tel1' type='number'/><br/>Segundo teléfono<br/><input class='form-control' placeholder='Segundo telefono' id='tel2' type='number'/><br/>Teléfono movil<br/><input class='form-control' placeholder='Movil' id='cel' type='number'/><br/>Fecha de ingreso a la institución<br/><input class='form-control' placeholder='Fecha ingreso al ICE' id='fecha_ing_ICE' type='date'/><input class='form-control' placeholder='Direccion' id='direccion'/></td></tr></table>  Centro funcional <select name=\"cfs\" id=\"cfs\"></select><input class='form-control' placeholder='Observaciones' id='obs'/> Para cambiar la fotografia:<input id=\"inputFile\" type=\"file\" /><br><paper-button raised id='actualizardatapersonal' onclick='actdataper()'>Actualizar</paper-button></div></td><td><hr>Forma de pago de afiliacion<br><paper-button raised id='btnefectivo' onclick='cambiotipopago()'>Cambiar a Por planilla, Actual EN EFECTIVO</paper-button><div id='cuadro_por_planilla' style=\"visibility: hidden\"><input type=\"radio\" name=\"radiocuota\" value=\"1000\" id='cuota1000' /><label for=\"radiocuota\">1000</label><br><input type=\"radio\" name=\"radiocuota\" value=\"1500\"/ id='cuota1500'><label for=\"radiocuota\">1500</label><br><input type=\"radio\" name=\"radiocuota\" value=\"3000\" id='cuota3000' /><label for=\"radiocuota\">3000</label> </div><input class='form-control' placeholder='Observaciones' id='obs'/><br>Para subir la boleta:<input id=\"inputFileboleta\" type=\"file\" /><hr><paper-button raised id='btnafilia' onclick='afiliar()'>Afiliar</paper-button></td></tr></table>");



    document.getElementById("nombre").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE;
    document.getElementById("ap1").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO;
    document.getElementById("ap2").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO;

    document.getElementById("email").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).EMAIL1;
    document.getElementById("email2").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).EMAIL2;
    document.getElementById("tel1").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).TEL1;
    document.getElementById("tel2").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).TEL2;
    document.getElementById("cel").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).CEL;
    document.getElementById("direccion").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).DIRECCION;
    var dater = new Date(JSON.parse(localStorage.getItem("PERSONABUSCADA")).FECHA_NACIMIENTO);
    document.getElementById("fecha_nac").value = dateConvert(dater, "YYYY-MM-DD");
    var date1 = new Date(JSON.parse(localStorage.getItem("PERSONABUSCADA")).FECHA_INGRESO_ICE);
    document.getElementById("fecha_ing_ICE").value = dateConvert(date1, "YYYY-MM-DD");


    var persona = new Object();
    persona.identificacion = '0';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'centrofuncional',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.NUMERO == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {
              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                    var x = document.getElementById("cfs");
                    var option = document.createElement("option");
                    option.text = data[ele].NUMERO + ' ' + data[ele].DESCRIPCION;
                    option.value = data[ele].NUMERO;
                    option.id = data[ele].NUMERO;
                    //   option.id=
                    x.add(option);

                }
                $('#cfs').val(JSON.parse(localStorage.getItem("PERSONABUSCADA")).CENTRO_FUNCIONAL.NUMERO);
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

    var ele = document.getElementById("cfs");
    for (var ii = 0; ii < ele.length; ii++)
        if (ele.options[ii].value == JSON.parse(localStorage.getItem("PERSONABUSCADA")).CENTRO_FUNCIONAL.NUMERO) { //Found!
            ele.options[ii].selected = true;
        }
    alert(JSON.parse(localStorage.getItem("PERSONABUSCADA")).CENTRO_FUNCIONAL.NUMERO);
    listadebeneficiarios();

}

function cambiotipopago() {
    if (document.getElementById('cuadro_por_planilla').style.visibility == 'hidden') {
        document.getElementById('cuadro_por_planilla').style.visibility = 'visible';
        document.getElementById("btnefectivo").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Cambiar a Efectivo, actual POR PLANILLAS</div>";

    } else {
        document.getElementById('cuadro_por_planilla').style.visibility = 'hidden';
        document.getElementById("btnefectivo").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Cambiar a Por planilla, actual EN EFECTIVO</div>";

    }
}

function cambiaract() {
    if (document.getElementById('cuadro_para_act').style.visibility == 'hidden') {
        document.getElementById('cuadro_para_act').style.visibility = 'visible';
        $("#cuadro_para_act").css("display", "block");
        document.getElementById("btnocultaact").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">No es necesario, ocultar</div>";

    } else {
        document.getElementById('cuadro_para_act').style.visibility = 'hidden';
        $("#cuadro_para_act").css("display", "none");
        document.getElementById("btnocultaact").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Mostrar datos personales</div>";
    }

}

function buscarnuevobn() {

    if (document.getElementById("idenbn").value != "") {
        var persona = new Object();
        persona.identificacion = document.getElementById("idenbn").value;

        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        //ajax de los datos personales
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Persona',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                if (data.IDENTIFICACION == 0) {
                    $('#nombn').removeAttr("disabled");
                    $('#pabn').removeAttr("disabled");
                    $('#sabn').removeAttr("disabled");
                    $('#btnagregabn').removeAttr("disabled");


                } else {
                    document.getElementById("nombn").value = data.NOMBRE;
                    document.getElementById("pabn").value = data.PRIMER_APELLIDO;
                    document.getElementById("sabn").value = data.SEGUNDO_APELLIDO;
                    $('#btnagregabn').removeAttr("disabled");

                }

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                alert(xhr);
            }
        });
    } else {
        alert("Rellene la identificacion del beneficiario");
    }

}

function listadebeneficiarios() {



    $("#tablabeneficiarios tr:gt(0)").remove();
    var persona = new Object();
    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    var conto = 0;
    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({

        url: urllocal + 'Beneficiarios',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            try {
                if (data.ID == 0) {
                    alert("Persona no esta afiliada ni registrada");
                } else {

                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                        conto = conto = 1;
                        var tableRef = document.getElementById('tablabeneficiarios').getElementsByTagName('tbody')[0];

                        // Insert a row in the table at the last row

                        var newRow = tableRef.insertRow(tableRef.rows.length);
                        //<paper-button raised id='botonpopbene'  onclick='muestradivbn()'>Mostrar beneficiarios</paper-button>
                        //                            // Insert a cell in the row at index 0

                        // Insert a cell in the row at index 0
                        var newCell = newRow.insertCell(0);

                        // Append a text node to the cell
                        var newText = document.createTextNode(data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION)

                        newCell.appendChild(newText);
                        //var personabeneficiario = new Object();
                        //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                        var newCell2 = newRow.insertCell(1);


                        var newText2 = document.createTextNode(data[ele].IDENTIFICACION_BENEFICIARIO.NOMBRE
                            + ' ' + data[ele].IDENTIFICACION_BENEFICIARIO.PRIMER_APELLIDO
                            + ' ' + data[ele].IDENTIFICACION_BENEFICIARIO.SEGUNDO_APELLIDO);
                        newCell2.appendChild(newText2);

                        var newCell3 = newRow.insertCell(2);


                        var newText3 = document.createTextNode(data[ele].PORCENTAGE + '%');
                        newCell3.appendChild(newText3);
                        var newCell4 = newRow.insertCell(3);


                        var newText4 = document.createTextNode(data[ele].PRIORIDAD + 'º');
                        newCell4.appendChild(newText4);

                        var newCell5 = newRow.insertCell(4);


                        var newText5 = document.createTextNode(data[ele].PARENTEZCO);
                        newCell5.appendChild(newText5);




                    }
                    if (document.getElementById('prioribn') != null) {
                        document.getElementById('prioribn').value = (data.length + 1);

                    }

                }
            } catch (err) {
                console.log(err.message);
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });


}

function agregarbn() {

    var persona = new Object();
    persona.ope = "1";
    persona.identificacion = document.getElementById('idenbn').value;
    persona.nombre = document.getElementById('nombn').value;
    persona.primer_apellido = document.getElementById('pabn').value;
    persona.segundo_apellido = document.getElementById('sabn').value;
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.cf = "1";
    persona.direccion = "";
    persona.email1 = "sincorreo@asobiso.com";
    persona.email2 = "";
    persona.tel1 = "0";
    persona.tel2 = "0";
    persona.cel = "0";
    persona.fecha_nacimiento = "01/01/1900";
    persona.fecha_ingreso_ice = "01/01/1900";
    persona.departamento = "";
    persona.puesto = "";
    persona.foto = "Fotos/" + persona.identificacion + ".jpg";
    persona.pass = "";
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'NuevaPersona',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {
                var persona = new Object();
                persona.idbene = document.getElementById('idenbn').value;
                persona.idsocio = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
                persona.tipo = 1;
                persona.porcentage = document.getElementById('porcenbn').value;
                persona.prioridad = document.getElementById('prioribn').value;
                persona.parentezco = document.getElementById('parenbn').value;
                persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
                var tabla;
                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'Beneficiarios',
                    type: 'POST',
                    dataType: 'json',
                    data: persona,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                        if (data.ID == 0) {
                            alert("Persona no esta afiliada ni registrada");
                        } else {
                            document.getElementById('idenbn').value = '';
                            document.getElementById('nombn').value = '';
                            document.getElementById('pabn').value = '';
                            document.getElementById('sabn').value = '';
                            document.getElementById('porcenbn').value = '0';
                            document.getElementById('prioribn').value = '';
                            document.getElementById('parenbn').value = '';
                            alert("Beneficiario agregado, puede agregar uno nuevo");
                            listadebeneficiarios();
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

function afiliar() {


    var objeto = new Object();
    objeto.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;

    objeto.usuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;

    objeto.observaciones = document.getElementById("obs").value;
    objeto.esnuevo = "1";

    if (document.getElementById('cuadro_por_planilla').style.visibility == 'hidden') {
        objeto.cuota = "efectivo";
    } else {
        objeto.cuota = "planilla";
        if ($("#cuota1000").is(':checked')) {
            objeto.cuotacantidad = 1000;
        }
        if ($("#cuota1500").is(':checked')) {
            objeto.cuotacantidad = 1500;
        }
        if ($("#cuota3000").is(':checked')) {
            objeto.cuotacantidad = 3000;
        }
    }
    objeto.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    objeto.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Mutualidad',
        type: 'POST',
        dataType: 'json',
        data: objeto,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            alert("Proceso iniciado, continue");
        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });

    var files = $("#inputFileboleta").get(0).files;
    if (files.length > 0) {

        var data = new FormData();
        files[0].name = localStorage.getItem("PERSONABUSCADA").IDENTIFICACION;
        data.append("usrid", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID);
        data.append("pssw", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA);

        for (i = 0; i < files.length; i++) {
            data.append("file" + i, files[i]);
        }
        data.append('ID', JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION);
        data.append('TIPO', 'FOTOGRAFIABOLETA');
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            type: "POST",
            url: urllocal + "file",
            // datatype:'json',
            contentType: false,
            processData: false,
            data: data,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (result) {
                if (result) {

                }
            }
        });
    }

    document.getElementById('infopersonal').innerHTML = "";

    $("#infopersonal").append("<h1>Nueva a filiación en mutualidad para: <br>" + JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO + "</h2><table><tr><td><hr>Beneficiarios <br><table id='tablabeneficiarios' class='table2'><thead><tr><th scope='col' abbr='Starter'>Identificacion del beneficiario</th><th scope='col' abbr='Starter'>Nombre del beneficiario</th><th scope='col' abbr='Starter'>Porcentage</th><th scope='col' abbr='Starter'>Prioridad</th><th scope='col' abbr='Starter'>Parentezco</th></tr></thead><tbody></table> </td><td><br><paper-button raised id='buscanuevobn' onclick='generaidtmp()'>Generar temporal</paper-button><input class='form-control' placeholder='Identificacion del nuevo beneficiario' id='idenbn'/><paper-button raised id='buscanuevobn' onclick='buscarnuevobn()'>Buscar</paper-button><input class='form-control' placeholder='Nombre del nuevo beneficiario' id='nombn' disabled/><input class='form-control' placeholder='Primer apellido del nuevo beneficiario' id='pabn'  disabled/><input class='form-control' placeholder='Segundo apellido del nuevo beneficiario' id='sabn'  disabled/><input class='form-control' placeholder='Parentesco' id='parenbn'/><input class='form-control' placeholder='Procentage del beneficiario' id='porcenbn' type='number' value='0'/><input class='form-control' placeholder='Prioridad del nuevo beneficiario' id='prioribn' type='number' value='1'/><paper-button raised id='btnagregabn' onclick='agregarbn()' disabled>Agregar beneficiario</paper-button><paper-button raised id='btnfinalizar' onclick='finaliza()'>Finalizar</paper-button></td></tr></table>")
}

function finaliza() {

    location.href = "inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;

}

function actdataper() {



    var persona = new Object();
    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
    persona.nombre = document.getElementById("nombre").value;
    persona.primer_apellido = document.getElementById("ap1").value;
    persona.segundo_apellido = document.getElementById("ap2").value;

    var ele = document.getElementById("cfs");
    for (var ii = 0; ii < ele.length; ii++)
        if (ele.options[ii].selected = true) { //Found!
            persona.nuemrocf = ele.options[ii].value;
            break;
        }

    persona.direccion = document.getElementById("direccion").value;
    persona.email1 = document.getElementById("email").value;
    persona.email2 = document.getElementById("email2").value;
    persona.tel1 = document.getElementById("tel1").value;
    persona.tel2 = document.getElementById("tel2").value;
    persona.cel = document.getElementById("cel").value;
    persona.fec_nac = document.getElementById("fecha_nac").value;
    persona.fec_ing_ICE = document.getElementById("fecha_ing_ICE").value;

    persona.usuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.esnuevo = "1";
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //ajax de los datos personales
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Persona',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {

            } else {
               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("PERSONABUSCADA", JSON.stringify(data));
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });
    var files = $("#inputFile").get(0).files;
    if (files.length > 0) {
        var data = new FormData();
        files[0].name = localStorage.getItem("PERSONABUSCADA").IDENTIFICACION;
        files[0].usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        files[0].pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        for (i = 0; i < files.length; i++) {
            data.append("file" + i, files[i]);
        }
        data.append('ID', JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION);
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

                }
            }
        });
    }

    alert("Datos cambiados correctamente");
    cambiaract();
}

function generaidtmp() {
    var persona = new Object();
    persona.criterio = "idtmp";
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;


    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Comunes',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {

                document.getElementById("idenbn").value = data;

                $('#nombn').removeAttr("disabled");
                $('#pabn').removeAttr("disabled");
                $('#sabn').removeAttr("disabled");
                $('#btnagregabn').removeAttr("disabled");
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });



}