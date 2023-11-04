///*AL CONSUMIR UN API POR AJAX, MUESTRA UN MSG AL USUAIRO Y BLOQUE LA PANTALLA PARA EVITAR DOBLE ENVIO DE LA INFORMACION*/$(document).ajaxStart(function () {
//    $("#loading").html("<div id='contenedor_caja'><H1>HOLA, ESTAMOS CARGANDO LA APLICACION, GRACIAS POR SU PACIENCIA</H1></div>");
//    // $("#carga").addClass("loading");
//    document.getElementById('loading').style.width = screen.width + 'px';
//    document.getElementById('loading').style.height = screen.height + 'px';
//    document.getElementById('loading').style.backgroundColor = "white";
//    document.getElementById('loading').style.zIndex = '80';
//    document.getElementById('loading').style.opacity = '0.9';
//    $('#contenedor_caja').css({
//        width: ($(window).width() * 80) / 100,
//        position: 'absolute',
//        left: (($(window).width() * 20) / 100),

//        top: ($(window).height() - ($('#contenedor_caja').outerHeight() * 2)) / 2
//    });
//    document.getElementById("infopersonal").style.visibility = "collapse";
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




//if(JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")) != null)
//    
//    {
//        
//         alert("Persona ya esta afiliada a solidaridad");
//                    location.href = "/inicio.html";
//        
//    }

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

function cargahtml() {
    $("#infopersonal").append("<h1>Nueva afiliación en solidaridad para: <br>" + JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO + "</h2><table><tr><td><h3>Actualice los datos personales(si es necesario) <paper-button raised id='btnocultaact' onclick='cambiaract()'>No es necesario, ocultar</paper-button><h3><div id='cuadro_para_act' style=\"visibility: visible\"><table><tr><td><input  class='form-control' placeholder='Nombre' id='nombre'/><input  class='form-control' placeholder='Primer apellido' id='ap1'/><input  class='form-control' placeholder='Segundo apellido' id='ap2'/><input  class='form-control' placeholder='Correo electrónico principal' id='email'/><input  class='form-control' placeholder='Segundo correo electrónico' id='email2'/><br/>Fecha de nacimiento<br/><input  class='form-control' placeholder='Fecha de nacimiento' id='fecha_nac' type='date'/></td><td><br/>Primer teléfono<br/><input  class='form-control' placeholder='Primer teléfono' id='tel1' type='number'/><br/>Segundo teléfono<br/><input  class='form-control' placeholder='Segundo teléfono' id='tel2' type='number'/><br/>Teléfono movil<br/><input  class='form-control' placeholder='Movil' id='cel' type='number'/><br/>Fecha de ingreso a la institución<br/><input  class='form-control' placeholder='Fecha de ingreso al ICE' id='fecha_ing_ICE' type='date'/><input  class='form-control' placeholder='Dirección' id='direccion'/></td></tr></table>  Centro funcional <select name=\"cfs\" id=\"cfs\"></select><input  class='form-control' placeholder='Observaciones' id='obs'/> Para cambiar la fotografia:<input id=\"inputFile\" type=\"file\" /><br><paper-button raised id='actualizardatapersonal' onclick='actdataper()'>Actualizar</paper-button></div></td><td><hr>Forma de pago de afiliacion<br><paper-button raised id='btnefectivo' onclick='cambiotipopago()'>Cambiar a Por planilla, actual EN EFECTIVO</paper-button><div id='cuadro_por_planilla' style=\"visibility: hidden\"><input type=\"radio\" name=\"radiocuota\" value=\"750\" id='cuota750' /><label for=\"radiocuota\">750</label><br><input type=\"radio\" name=\"radiocuota\" value=\"1000\"/ id='cuota1000'><label for=\"radiocuota\">1000</label><br><input type=\"radio\" name=\"radiocuota\" value=\"2500\" id='cuota2500' /><label for=\"radiocuota\">2500</label> <br><input type=\"radio\" name=\"radiocuota\" value=\"5000\" id='cuota5000' /><label for=\"radiocuota\">5000</label> </div><input  class='form-control' placeholder='Observaciones' id='obs'/><br>Para subir la boleta:<input id=\"inputFileboleta\" type=\"file\" /><hr><paper-button raised id='btnafilia' onclick='afiliar()'>Afiliar</paper-button></td></tr></table>");
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

                    x.add(option);

                }
                $('#cfs').val(JSON.parse(localStorage.getItem("PERSONABUSCADA")).CENTRO_FUNCIONAL.NUMERO);
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

    //      var ele = document.getElementById("cfs");
    //            for (var ii = 0; ii < ele.length; ii++)
    //                if (ele.options[ii].value == JSON.parse(localStorage.getItem("PERSONABUSCADA")).CENTRO_FUNCIONAL.NUMERO) { //Found!
    //                    ele.options[ii].selected = true;
    //                }
    //    alert(JSON.parse(localStorage.getItem("PERSONABUSCADA")).CENTRO_FUNCIONAL.NUMERO);
    // listadefamiliares();

}

function cambiotipopago() {
    if (document.getElementById('cuadro_por_planilla').style.visibility == 'hidden') {
        document.getElementById('cuadro_por_planilla').style.visibility = 'visible';
        document.getElementById("btnefectivo").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Cambiar a Efectivo, actual POR PLANILLA</div>";

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

function buscarnuevofam() {

    if (document.getElementById("idenfam").value != "") {
        var persona = new Object();
        persona.identificacion = document.getElementById("idenfam").value;

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
                    $('#nomfam').removeAttr("disabled");
                    $('#pafam').removeAttr("disabled");
                    $('#safam').removeAttr("disabled");
                    $('#btnagregafam').removeAttr("disabled");


                } else {
                    document.getElementById("nomfam").value = data.NOMBRE;
                    document.getElementById("pafam").value = data.PRIMER_APELLIDO;
                    document.getElementById("safam").value = data.SEGUNDO_APELLIDO;
                    $('#btnagregafam').removeAttr("disabled");

                }

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                alert(xhr);
            }
        });
    } else {
        alert("Rellene la identificacion del familiar");
    }

}

function listadefamiliares() {

    $("#tablafam tr:gt(0)").remove();
    var persona = new Object();
    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Familiares',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            try {
                if (data.ID == 0) {
                    alert("Persona no esta afiliada ni registrada");
                } else {




                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                        var tableRef = document.getElementById('tablafam').getElementsByTagName('tbody')[0];

                        // Insert a row in the table at the last row
                        var newRow = tableRef.insertRow(tableRef.rows.length);

                        // Insert a cell in the row at index 0
                        var newCell = newRow.insertCell(0);

                        // Append a text node to the cell
                        var newText = document.createTextNode(data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION)

                        newCell.appendChild(newText);
                        //var personabeneficiario = new Object();
                        //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                        var newCell2 = newRow.insertCell(1);


                        var newText2 = document.createTextNode(data[ele].IDENTIFICACION_FAMILIAR.NOMBRE + ' ' + data[ele].IDENTIFICACION_FAMILIAR.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION_FAMILIAR.SEGUNDO_APELLIDO);
                        newCell2.appendChild(newText2);


                        var newCell4 = newRow.insertCell(2);


                        var newText4 = document.createTextNode(data[ele].PARENTEZCO.DESCRIPCION);
                        newCell4.appendChild(newText4);

                        var newCell3 = newRow.insertCell(3);


                        var newText3 = document.createTextNode(data[ele].ESTADO);
                        newCell3.appendChild(newText3);

                        var newCell6 = newRow.insertCell(4);




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

function agregarfam() {

    var persona = new Object();
    persona.ope = "1";
    persona.identificacion = document.getElementById('idenfam').value;
    persona.nombre = document.getElementById('nomfam').value;
    persona.primer_apellido = document.getElementById('pafam').value;
    persona.segundo_apellido = document.getElementById('safam').value;
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.cf = "1";
    persona.direccion = "";
    persona.email1 = "sincorreo@asobiso.azurewebsites.net";
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

                var posicion = document.getElementById('parenfam').options.selectedIndex; //posicion

                var persona = new Object();
                persona.idfam = document.getElementById('idenfam').value;
                persona.idsocio = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
                persona.tipo = 1;
                persona.estado = 'ACTIVO';
                persona.parentezco = document.getElementById('parenfam').options[posicion].value;
                persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                var tabla;
                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'Familiares',
                    type: 'POST',
                    dataType: 'json',
                    data: persona,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                        if (data.ID == 0) {
                            alert("Persona no esta afiliada ni registrada");
                        } else {
                            document.getElementById('idenfam').value = '';
                            document.getElementById('nomfam').value = '';
                            document.getElementById('pafam').value = '';
                            document.getElementById('safam').value = '';
                            alert("Familiar agregado correctamente, puede agregar otro");
                            listadefamiliares();
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


    //    
    //    
    //    


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
        if ($("#cuota750").is(':checked')) {
            objeto.cuotacantidad = 750;
        }
        if ($("#cuota1000").is(':checked')) {
            objeto.cuotacantidad = 1000;
        }
        if ($("#cuota2500").is(':checked')) {
            objeto.cuotacantidad = 2500;
        }
        if ($("#cuota5000").is(':checked')) {
            objeto.cuotacantidad = 5000;
        }
    }
    objeto.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    objeto.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Solidaridad',
        type: 'POST',
        dataType: 'json',
        data: objeto,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
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

            $("#infopersonal").append("<h1>Nueva afiliación en solidaridad para: <br>" + JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO + "</h2><table><tr><td><hr>Familiares <br><table id='tablafam' class='table2'><thead><tr><th scope='col' abbr='Starter'>Identificacion del familiar</th><th scope='col' abbr='Starter'>Nombre del familiar</th><th scope='col' abbr='Starter'>Parentezco</th><th scope='col' abbr='Starter'>Estado</th></tr></thead><tbody></table> <br></td><td><paper-button raised onclick='generaidtmp()'>Generar temporal</paper-button><input  class='form-control' placeholder='Identificacion del nuevo familiar' id='idenfam'/><paper-button raised id='buscanuevofam' onclick='buscarnuevofam()'>Buscar</paper-button><input  class='form-control' placeholder='Nombre del nuevo familiar' id='nomfam' disabled/><input  class='form-control' placeholder='Primer apellido del nuevo familiar' id='pafam'  disabled/><input  class='form-control' placeholder='Segundo apellido del nuevo familiar' id='safam'  disabled/><br>Seleccione el parentesco<select name=\"parenfam\" id=\"parenfam\"></select><br/><paper-button raised id='btnagregafam' onclick='agregarfam()' disabled>Agregar familiar</paper-button><paper-button raised id='btnfinalizar' onclick='finaliza()'>Finalizar</paper-button></td></tr></table>");

            var persona = new Object();
            persona.identificacion = '0';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            var tabla;
            /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                url: urllocal + 'Tipo_familiar',
                type: 'POST',
                dataType: 'json',
                data: persona,
                /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                    if (data.NUMERO == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                      /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                            var x = document.getElementById("parenfam");
                            var option = document.createElement("option");
                            option.text = data[ele].ID + ' ' + data[ele].DESCRIPCION;
                            option.value = data[ele].ID;
                            option.id = data[ele].ID;
                            //   option.id=
                            x.add(option);

                        }
                    }

                },
                /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });

            alert("Proceso iniciado, continue");
        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert("error");
        }
    });




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
    var posicion = document.getElementById('cfs').options.selectedIndex; //posicion
    persona.nuemrocf = document.getElementById('cfs').options[posicion].value;
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

                document.getElementById("idenfam").value = data;

                $('#nomfam').removeAttr("disabled");
                $('#pafam').removeAttr("disabled");
                $('#safam').removeAttr("disabled");
                $('#btnagregafam').removeAttr("disabled");
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });



}