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

Profile = {
    load: function () {
        this.links();
        this.social();
        this.accordion();
    },
    links: function () {
        $('a[href="#"]').click(function (e) {
            e.preventDefault();
        });
    },
    social: function () {
        $('.accordion .about-me .photo .photo-overlay .plus').click(function () {
            $('.social-link').toggleClass('active');
            $('.about-me').toggleClass('blur');
        });
        $('.social-link').click(function () {
            $(this).toggleClass('active');
            $('.about-me').toggleClass('blur');
        });
    },
    accordion: function () {
        var subMenus = $('.accordion .sub-nav').hide();
        $('.accordion > a').each(function () {
            if ($(this).hasClass('active')) {
                $(this).next().slideDown(100);
            }
        });
        $('.accordion > a').click(function () {
            $this = $(this);
            $target = $this.next();
            $this.siblings('a').removeAttr('class');
            $this.addClass('active');
            if (!$target.hasClass('active')) {
                subMenus.removeClass('active').slideUp(100);
                $target.addClass('active').slideDown(100);
            }
            return false;
        });
    }
}
$(function () {
    Profile.load();
});




(function () {
    var morphSearch = document.getElementById('morphsearch'),
        input = morphSearch.querySelector('input.morphsearch-input'),
        ctrlClose = morphSearch.querySelector('span.morphsearch-close'),
        crtBusca = document.getElementById('btnbuscar'),


        isOpen = isAnimating = false,
        // show/hide search area
        toggleSearch = function (evt) {
            // return if open and the input gets focused
            if (evt.type.toLowerCase() === 'focus' && isOpen) return false;

            var offsets = morphsearch.getBoundingClientRect();
            if (isOpen) {
                classie.remove(morphSearch, 'open');

                // trick to hide input text once the search overlay closes
                // todo: hardcoded times, should be done after transition ends
                if (input.value !== '') {
                    setTimeout(function () {
                        classie.add(morphSearch, 'hideInput');
                        setTimeout(function () {
                            classie.remove(morphSearch, 'hideInput');
                            input.value = '';
                        }, 300);
                    }, 500);
                }

                input.blur();
            } else {
                classie.add(morphSearch, 'open');
            }
            isOpen = !isOpen;
        };

    // events
    input.addEventListener('focus', toggleSearch);
    ctrlClose.addEventListener('click', toggleSearch);
    crtBusca.addEventListener('click', toggleSearch);
    // esc key closes search overlay
    // keyboard navigation events
    document.addEventListener('keydown', function (ev) {
        var keyCode = ev.keyCode || ev.which;
        if (keyCode === 27 && isOpen) {
            toggleSearch(ev);
        }
    });


})();




/*VERIFICA LA COOKIE DE ACCESO AL SISTEMA*/if (JSON.parse(localStorage.getItem("USUARIOLOGUEADO")) == null) {
    alert("No estas autorizado para ingresar aun");
    location.href = "/login.html";

} else {

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
//var first = getUrlVars()["me"];
//alert(first);
var objeto = new Object();
objeto.id = getUrlVars()["id"];
if (objeto.id != null) {
    //alert(objeto.id);
    document.getElementById("idbuscado").value = objeto.id;
    document.getElementById("idbuscado").val = objeto.id;
    // $('#idbuscado').val = objeto.id;
    enviar();
} else {


    //var persona = new Object();

    //persona.id = '';
    //persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    //persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    ////ajax de los datos personales
    ///*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
    //    url: urllocal + 'Estadistica',
    //    type: 'POST',
    //    dataType: 'json',
    //    data: persona,
    //    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
    //        if (data.ID == 0) {
    //            alert("Persona no esta afiliada ni registrada");
    //        } else {
    //            $("#infopersonal").remove();
    //            //document.body.innerHTML += '<div id="infopersonal" class="alcentro"></div>';
    //            $('body').append('<div id="infopersonal" class="alcentroListado"></div>');
    //            document.getElementById("infopersonal").innerHTML = "";




    //        }

    //    },
    //    /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
    //        alert(xhr);
    //    }
    //});


}

$(document).ready(function () {
    //var uri = urllocal + 'Usuario';
    //$.getJSON(uri)
    //    .done(function (data) {

    //      /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
    //            var x = document.getElementById("usuarios");
    //            var option = document.createElement("option");
    //            option.text = data[ele].NOMBRE_COMPLETO;
    //            option.value = data[ele].ID;
    //            //   option.id=
    //            x.add(option);
    //        }
    //    });
});


document.getElementById('idbuscado').addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        location.href = "/inicio.html?id=" + $('#idbuscado').val();
    }
});

function recarga() {
    location.href = "/inicio.html?id=" + $('#idbuscado').val();
}

var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

function enviar() {

    $("#infopersonal").remove();
    //document.body.innerHTML += '<div id="infopersonal" class="alcentro"></div>';
    $('body').append('<div id="infopersonal" class="alcentro"></div>');
    var persona = new Object();
    persona.identificacion = $('#idbuscado').val();

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
                alert("Persona no esta afiliada ni registrada");
                location.href = "/Nuevapersona.html?id=" + persona.identificacion;
            } else {
                var fecha1 = new Date(data.FECHA_NACIMIENTO);
                // var fecha1 = new Date(fecha1.setTime(fecha1.getTime() + 1 * 86400000));
                var fecha2 = new Date(data.FECHA_INGRESO_ICE);
                //  var fecha2 = new Date(fecha2.setTime(fecha2.getTime() + 1 * 86400000));

                //new Date(date.setTime(date.getTime() + days * 86400000));
                var fecha3 = new Date(data.FEC_ULT_ACT);
                //   var fecha3 = new Date(fecha3.setTime(fecha3.getTime() + 1 * 86400000));
                var direccionformateada = '';
                var email1formateada = '';
                var email2formateada = '';
                var departamentoformateada = '';
                var puestoformateada = '';
                var tel1formateada = '';
                var tel2formateada = '';
                var celformateada = '';
                if (data.DIRECCION != '') {
                    direccionformateada = data.DIRECCION;
                } else {
                    direccionformateada = 'No hay dirección registrada,';
                }
                if (data.EMAIL1 != '') {
                    email1formateada = data.EMAIL1;
                } else {
                    email1formateada = 'No hay correo principal registrado,';
                }
                if (data.EMAIL2 != '') {
                    email2formateada = data.EMAIL2;
                } else {
                    email2formateada = 'No hay correo secundario registrado,';
                }
                if (data.DEPARTAMENTO != '') {
                    departamentoformateada = data.DEPARTAMENTO;
                } else {
                    departamentoformateada = 'No hay departamento registrado,';
                }
                if (data.PUESTO != '') {
                    puestoformateada = data.PUESTO;
                } else {
                    puestoformateada = 'No hay puesto registrado,';
                }
                if (data.TEL1 != '') {
                    tel1formateada = data.TEL1;
                } else {
                    tel1formateada = 'No hay teléfono principal registrado,';
                }
                if (data.TEL2 != '') {
                    tel2formateada = data.TEL2;
                } else {
                    tel2formateada = 'No hay teléfono secundario registrado,';
                }
                if (data.CEL != '') {
                    celformateada = data.CEL;
                } else {
                    celformateada = 'No hay teléfono móvil registrado,';
                }



               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("PERSONABUSCADA", JSON.stringify(data));
                document.getElementById("infopersonal").innerHTML = " <h1><img class='round' src='/Fotos/" + data.IDENTIFICACION + ".jpg' alt='" + data.NOMBRE + ' ' + data.PRIMER_APELLIDO + ' ' + data.SEGUNDO_APELLIDO + "' onerror=this.src='Imagenes/img_usuario.png' width='50px' heigth='50px' />" + data.IDENTIFICACION + ' ' + data.NOMBRE + ' ' + data.PRIMER_APELLIDO + ' ' + data.SEGUNDO_APELLIDO + "</h1><p style='padding:30px;'>Nacio el " + fecha1.toLocaleDateString("es-ES", options) + ", ingreso a la institución el: " + fecha2.toLocaleDateString("es-ES", options) + " actualmente vive en: " + direccionformateada + " tiene registrados los correos: " + email1formateada + " - " + email2formateada + " labora para el departamento de: " + departamentoformateada + " tiene el puesto de " + puestoformateada + " sus teléfonos son: " + tel1formateada + " / " + tel2formateada + " / " + celformateada + "</p> <strong> <spam style='font-size:small'> Ultima actualización por: " + data.USUARIO.NOMBRE_COMPLETO + " la fecha: " + fecha3.toLocaleDateString("es-ES", options) + " </spam> </strong> </hr><table><tr><td><paper-button raised id='btnobspersona'  onclick= \"obs('" + data.IDENTIFICACION.IDENTIFICACION + "','SOLIDARIDAD','');\">Anotación</paper-button></td><td><paper-button raised id='btnmodificapersona' onClick='window.location.href=\"modificapersona.html\"'>Modificar datos personales</paper-button></td><td><paper-button raised id='btnmodificafondos' onClick='window.location.href=\"cambiodeestado.html\"'>Modificar datos en los fondos</paper-button></td><td><h3 id='alertas'></h3></td></tr></table> ";

                document.getElementById("infopersonal").innerHTML += "<paper-button raised  onclick = 'regeneraclave()'>Regenerar clave del sistema para enviar por correo manual</paper-button><ul class='tabs' id='detalle' ></ul>";
                $("#detalle").append("<li id='detalleinternomut'> <input type='radio' checked name='tabs' id='tab7'><label for='tab7'>Resumen</label><div id='tab-content7' class='tab-content animated fadeIn'></div> </li>");
                $("#detalle").append("<li id='detalleinternomut'> <input type='radio' name='tabs' id='tab1'><label id='clictab1' for='tab1' >Mutualidad</label><div id='tab-content1' class='tab-content animated fadeIn'></div> </li>");
                $("#detalle").append("<li id='detalleinternomut'> <input type='radio'name='tabs' id='tab2'><label id='clictab2' for='tab2' >Solidaridad</label><div id='tab-content2' class='tab-content animated fadeIn'></div> </li>");
                $("#detalle").append("<li id='detalleinternomut'> <input type='radio' name='tabs' id='tab3'><label id='clictab3' for='tab3' >Asobiso</label><div id='tab-content3' class='tab-content animated fadeIn'></div> </li>");
                $("#detalle").append("<li id='detalleinternomut'> <input type='radio' name='tabs' id='tab4'><label id='clictab4' for='tab4' >Equipo</label><div id='tab-content4' class='tab-content animated fadeIn'></div> </li>");
                $("#detalle").append("<li id='detalleinternomut'> <input type='radio' name='tabs' id='tab5'><label id='clictab5' for='tab5' >Ayudas</label><div id='tab-content5' class='tab-content animated fadeIn'></div> </li>");
                $("#detalle").append("<li id='detalleinternomut'> <input type='radio' name='tabs' id='tab6'><label id='clictab6' for='tab6' >Becas</label><div id='tab-content6' class='tab-content animated fadeIn'></div> </li>");
                $("#detalle").append("<li id='detalleinternomut'> <input type='radio' name='tabs' id='tab8'><label id='clictab8' for='tab8' >Cambios de estado</label><div id='tab-content8' class='tab-content animated fadeIn'> <paper-button raised  onclick ='cargacambiosdeestado(" + data.IDENTIFICACION + ")'>Cargar el historial de cambios de estados</paper-button> </div> </li>");
                $("#detalle").append("<li id='detalleinternomut'> <input type='radio' name='tabs' id='tab9'><label id='clictab9' for='tab9' >Cambios del saldo</label><div id='tab-content9' class='tab-content animated fadeIn'> <paper-button raised  onclick ='cargacambiossaldo(" + data.IDENTIFICACION + ")'>Cargar el historial de cambios de saldos</paper-button></div> </li>");

                cargamut(data.IDENTIFICACION);
                cargasol(data.IDENTIFICACION);
                cargaaso(data.IDENTIFICACION);
                cargapac(data.IDENTIFICACION);
                //cargahistorialprestamodeequipo(data.IDENTIFICACION);
                cargaayu(data.IDENTIFICACION);
                cargabec(data.IDENTIFICACION);
                //cargacambiosdeestado(data.IDENTIFICACION);
                //cargacambiossaldo(data.IDENTIFICACION);




                //var historialenhtml = localStorage.getItem("historialbusquedas");
              
                //if (historialenhtml != null) {

                //    var n = historialenhtml.search(data.IDENTIFICACION);
                //    if (n < 0) {
                //        historialenhtml = "<a class='dummy-media-object' href='/Inicio.html?id=" + data.IDENTIFICACION + "'><img class='round' src='Imagenes/img_usuario.png' /> <h3>" + data.NOMBRE + ' ' + data.PRIMER_APELLIDO + ' ' + data.SEGUNDO_APELLIDO + "</h3></a>" + historialenhtml;
                //        document.getElementById("ultbusq").innerHTML = 'Ultimas búsquedas ' + historialenhtml;
                //       /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("historialbusquedas", historialenhtml);
                //    }
                //} else {

                //    document.getElementById("ultbusq").innerHTML = 'sin busquedas anteriores';
                //   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("historialbusquedas", "<a class='dummy-media-object' href='/Inicio.html?id=" + data.IDENTIFICACION + "'><img class='round' src='Imagenes/img_usuario.png' /> <h3>" + data.NOMBRE + ' ' + data.PRIMER_APELLIDO + ' ' + data.SEGUNDO_APELLIDO + "</h3></a>");
                //}
                cargaresumen(persona.identificacion);
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });


    $("#tab7").attr('checked', 'checked');



}

function devuelvetablabeneficiarios(IDE) {




    var persona = new Object();
    persona.identificacion = IDE;
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
                //alert("Persona buscada es: " + data.NOMBRE + ' - ' + data.PRIMER_APELLIDO);
                ////$('#usuariologuado').value = formatItem(data);
                ////location.href = "/inicio.html";
                //document.getElementById("infopersonal").innerHTML = "<h1>" + data.IDENTIFICACION + ' ' + data.NOMBRE + ' ' + data.PRIMER_APELLIDO + ' ' + data.SEGUNDO_APELLIDO + "</h1></br> <p>nacio el " + data.FECHA_NACIMIENTO + ", ingreso a la institución el: " + data.FECHA_INGRESO_ICE + " actualmente vive es: " + data.DIRECCION + " tiene registrados los correos: " + data.EMAIL1 + " - " + data.EMAIL2 + " labora para el departamento de: " + data.DEPARTAMENTO + " tiene el puesto de " + data.PUESTO + " sus telefonos son: " + data.TEL1 + " / " + data.TEL2 + " / " + data.CEL + "</p> <strong> <spam style='font-size:small'> Ultima actualizacion por: " + data.USUARIO.NOMBRE_COMPLETO + " la fecha: " + data.FEC_ULT_ACT + " </spam> </strong> </hr>";
                //document.getElementById("infopersonal").innerHTML += "<ul class='tabs' id='detalle'></ul>";
                //var d = document.createElement('div');
                //d.setAttribute('id', 'iddiv');
                var d = document.createElement('div');
                d.setAttribute('id', 'benficiariospopup');
                d.setAttribute('style', 'visibility:hidden');
                document.body.appendChild(d);

                //$("#benficiariospopup").append("<li id='detalleinternomutinterno'> <input type='radio' checked name='tabbene' id='tabbene'><label for='tabbene'>Beneficiarios</label><div id='tab-contentmut' class='tab-content animated fadeIn'></div> </li>");
                //$("#benficiariospopup").append("<li id='detalleinternomutinterno'> <input type='radio' checked name='tabhistorialmut' id='tabhistorialmut'><label for='tabhistorialmut'>Historial</label><div id='tab-contentmuthistorial' class='tab-content animated fadeIn'></div> </li>");

                $('#benficiariospopup').append("<h1>Beneficiarios</h1> <paper-button raised onclick='cerrarpopbene()'>Salir</paper-button><table id='tablabeneficiarios' class='display'><thead><tr><th scope='col' abbr='Starter'>Modificar</th><th scope='col' abbr='Starter'>Identificación del beneficiario</th><th scope='col' abbr='Starter'>Nombre del beneficiario</th><th scope='col' abbr='Starter'>Porcentaje</th><th scope='col' abbr='Starter'>Prioridad</th><th scope='col' abbr='Starter'>Parentesco</th><th scope='col' abbr='Starter'>Ultima modificación</th></tr></thead><tbody>");
                $('#benficiariospopup').append(" </tbody></table><div id='espaciomodificabene' ></div>");

              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById('tablabeneficiarios').getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row

                    var newRow = tableRef.insertRow(tableRef.rows.length);
                    //<paper-button raised id='botonpopbene'  onclick='muestradivbn()'>Mostrar beneficiarios</paper-button>
                    //                            // Insert a cell in the row at index 0
                    var newCell0 = newRow.insertCell(0);
               

                   

                    var btnmodificamodid = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnmodificamodid.setAttribute("raised", "");
                    btnmodificamodid.setAttribute("type", "text");
                    btnmodificamodid.setAttribute("placeholder", "Escriba la nueva cedula");
                   // btnmodificamodid.setAttribute("onclick", "modificasoloidentificacion('" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + "');");
                    btnmodificamodid.id = 'nuevacedulaenvezde' + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
               


                    newCell0.appendChild(btnmodificamodid);

                    var btnmodificamodid = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnmodificamodid.setAttribute("raised", "");
                    btnmodificamodid.setAttribute("type", "button");
                    btnmodificamodid.setAttribute("onclick", "modificasoloidentificacion('" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + "');");
                    btnmodificamodid.id = 'botonmodificaid' + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                    btnmodificamodid.value = "Modificar solo la cedula";


                    newCell0.appendChild(btnmodificamodid);

                    var btnmodifica = document.createElement("hr");
      

                    newCell0.appendChild(btnmodifica);

                    var btnmodifica = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnmodifica.setAttribute("raised", "");
                    btnmodifica.setAttribute("type", "button");
                    btnmodifica.setAttribute("onclick", "modificabeneficiario('" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + "','" + data[ele].IDENTIFICACION_BENEFICIARIO.NOMBRE + "','" + data[ele].IDENTIFICACION_BENEFICIARIO.PRIMER_APELLIDO + "','" + data[ele].IDENTIFICACION_BENEFICIARIO.SEGUNDO_APELLIDO + "','" + data[ele].PRIORIDAD + "','" + data[ele].PORCENTAGE + "','" + data[ele].PARENTEZCO + "');");
                    btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                    btnmodifica.value = "Modificar datos diferentes a cedula";

                    newCell0.appendChild(btnmodifica);

                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(1);

                    // Append a text node to the cell
                    var newText = document.createTextNode(data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION)

                    newCell.appendChild(newText);
                    //var personabeneficiario = new Object();
                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                    var newCell2 = newRow.insertCell(2);


                    var newText2 = document.createTextNode(data[ele].IDENTIFICACION_BENEFICIARIO.NOMBRE + ' ' + data[ele].IDENTIFICACION_BENEFICIARIO.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION_BENEFICIARIO.SEGUNDO_APELLIDO);
                    newCell2.appendChild(newText2);

                    var newCell3 = newRow.insertCell(3);


                    var newText3 = document.createTextNode(data[ele].PORCENTAGE + '%');
                    newCell3.appendChild(newText3);
                    var newCell4 = newRow.insertCell(4);


                    var newText4 = document.createTextNode(data[ele].PRIORIDAD + 'º');
                    newCell4.appendChild(newText4);

                    var newCell5 = newRow.insertCell(5);


                    var newText5 = document.createTextNode(data[ele].PARENTEZCO);
                    newCell5.appendChild(newText5);

                    var newCell6 = newRow.insertCell(6);


                    var newText6 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(data[ele].FEC_ULT_ACT, "DD-MM-YYYY"));
                    newCell6.appendChild(newText6);




                    ////ajax de los datos personales
                    ///*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    //    url: 'api/Persona',
                    //    type: 'POST',
                    //    dataType: 'json',
                    //    data: personabeneficiario,
                    //    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                    //        var newCell2 = newRow.insertCell(1);


                    //            var newText2 = document.createTextNode(data.NOMBRE + ' '  + data.PRIMER_APELLIDO + ' ' + data.SEGUNDO_APELLIDO );
                    //            newCell2.appendChild(newText2);


                    //    },
                    //    /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

                    //    }
                    //});




                }
                $("#tablabeneficiarios").dataTable({
                    "scrollY": "500px",
                    "scrollCollapse": true,
                    "paging": false,
                    dom: 'Bfrtip',
                    buttons: [
                        'print'
                    ]
                });


            }
            $("#tab-content1").append("<input type='button' onclic='insertarbeneficiario(" + persona.identificacion + ")' value='insertar nuevo beneficiario a " + persona.identificacion + "/>");

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });



    //return tabla.value;


}


function devuelvetablafamiliares(IDE) {
    var persona = new Object();
    persona.identificacion = IDE;
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
                var d = document.createElement('div');
                d.setAttribute('id', 'familiarespopup');
                d.setAttribute('style', 'visibility:hidden');
                document.body.appendChild(d);


                $('#familiarespopup').append("<h1>Familiares</h1> <paper-button raised onclick='cerrarpopfam()'>Salir</paper-button><table id='tablafamiliares' class='display'><thead><tr><th scope= 'col'>Modificar</th><th scope='col' abbr='Starter'>Identificación del familiar</th><th scope='col' abbr='Starter'>Nombre del familiar</th><th scope='col' abbr='Starter'>Estado</th><th scope='col' abbr='Starter'>Parentesco</th><th scope='col' abbr='Starter'>Ultima modificación</th><th scope='col' abbr='Starter'>Fecha defunción</th><th scope='col' abbr='Starter'>Monto pagado</th><th scope='col' abbr='Starter'>Registrar defunción</th></tr></thead><tbody>");
                $('#familiarespopup').append(" </tbody></table><div id= 'espaciomodificafam'></div>");

              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById('tablafamiliares').getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);


                    var newCell0 = newRow.insertCell(0);

                    var btnmodifica = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnmodifica.setAttribute("type", "text");
                    btnmodifica.setAttribute("placeholder", "Escriba la nueva cédula");
                    btnmodifica.setAttribute("raised", "");
                    btnmodifica.id = 'nuevacedulafam' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION;
                   
                    //newCell0.innerHTML= "<input type='button' id= boton" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + " value='modificar' onclick='modificabeneficiario(" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ") />'";
                    newCell0.appendChild(btnmodifica);

                    var btnmodifica = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnmodifica.setAttribute("type", "button");
                    btnmodifica.setAttribute("raised", "");
                    btnmodifica.setAttribute("onclick", "modificasolocedulafamiliar('" + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION + "');");
                    btnmodifica.id = 'botonmodsolocedulafam' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION;
                    btnmodifica.value = "Modificar solo la cedula";
                    //newCell0.innerHTML= "<input type='button' id= boton" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + " value='modificar' onclick='modificabeneficiario(" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ") />'";
                    newCell0.appendChild(btnmodifica);


                    var btnmodifica = document.createElement("hr");
                  //newCell0.innerHTML= "<input type='button' id= boton" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + " value='modificar' onclick='modificabeneficiario(" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ") />'";
                    newCell0.appendChild(btnmodifica);

                    var btnmodifica = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnmodifica.setAttribute("type", "button");
                    btnmodifica.setAttribute("raised", "");
                    btnmodifica.setAttribute("onclick", "modificafamiliar('" + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION + "','" + data[ele].IDENTIFICACION_FAMILIAR.NOMBRE + "','" + data[ele].IDENTIFICACION_FAMILIAR.PRIMER_APELLIDO + "','" + data[ele].IDENTIFICACION_FAMILIAR.SEGUNDO_APELLIDO + "','" + data[ele].ESTADO + "','" + data[ele].PARENTEZCO.ID + "');");
                    btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION;
                    btnmodifica.value = "Modificar";
                    //newCell0.innerHTML= "<input type='button' id= boton" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + " value='modificar' onclick='modificabeneficiario(" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ") />'";
                    newCell0.appendChild(btnmodifica);


                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(1);

                    // Append a text node to the cell
                    var newText = document.createTextNode(data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION)

                    newCell.appendChild(newText);
                    //var personabeneficiario = new Object();
                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                    var newCell2 = newRow.insertCell(2);


                    var newText2 = document.createTextNode(data[ele].IDENTIFICACION_FAMILIAR.NOMBRE + ' ' + data[ele].IDENTIFICACION_FAMILIAR.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION_FAMILIAR.SEGUNDO_APELLIDO);
                    newCell2.appendChild(newText2);

                    var newCell3 = newRow.insertCell(3);


                    var newText3 = document.createTextNode(data[ele].ESTADO);
                    newCell3.appendChild(newText3);
                    var newCell4 = newRow.insertCell(4);


                    var newText4 = document.createTextNode(data[ele].PARENTEZCO.DESCRIPCION);
                    newCell4.appendChild(newText4);



                    var newCell6 = newRow.insertCell(5);


                    var newText6 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(data[ele].FEC_ULT_ACT, "DD-MM-YYYY"));
                    newCell6.appendChild(newText6);
                    var fecdef = document.createElement("input");
                    //btnmodifica.type = "button";

                    // btnobs.setAttribute("onclick", "obs('" + data[ele].IDENTIFICACION.IDENTIFICACION + "','MUTUALIDAD','" + data[ele].OBSERVACIONES + "');");
                    fecdef.id = 'fechadef' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION;

                    if (data[ele]._dEFUNCION_SOLIDARIDAD.MONTO_SUBSIDIO == '0') {

                        fecdef.type = "date";

                        // btnobs.value = "Agregar Observacion";

                        //                            

                    } else {
                        fecdef.type = "text";
                        fecdef.value = data[ele]._dEFUNCION_SOLIDARIDAD.FECHA_DEFUNCION;
                        fecdef.setAttribute("disabled", "");

                    }
                    var newCell11 = newRow.insertCell(6);
                    //                            

                    newCell11.appendChild(fecdef);
                    var montodef = document.createElement("input");
                    //btnmodifica.type = "button";
                    montodef.type = "text";

                    montodef.setAttribute("placeholder", "Escriba el monto pagado");
                    montodef.id = 'montodef' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION;
                    // onkeyup = 'espaciador(this)'

                    montodef.setAttribute("onkeyup", "espaciador(this)");
                    // btnobs.value = "Agregar Observacion";
                    if (data[ele]._dEFUNCION_SOLIDARIDAD.MONTO_SUBSIDIO != '0') {
                        montodef.value = data[ele]._dEFUNCION_SOLIDARIDAD.MONTO_SUBSIDIO;
                        montodef.setAttribute("disabled", "");
                    }

                    //                            
                    var newCell11 = newRow.insertCell(7);
                    //                            

                    newCell11.appendChild(montodef);


                    var btnobs = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnobs.type = "button";
                    btnobs.setAttribute("onclick", "registradefsolidaridad('" + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION + "','" + data[ele].PARENTEZCO.ID + "')");
                    btnobs.id = 'botregdefsol' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION;
                    btnobs.value = "Registra defuncion";
                    if (data[ele]._dEFUNCION_SOLIDARIDAD.MONTO_SUBSIDIO != '0') {
                        btnobs.setAttribute("disabled", "");

                    }
                    //                            
                    var newCell11 = newRow.insertCell(8);
                    //                            

                    newCell11.appendChild(btnobs);
                    ////ajax de los datos personales
                    ///*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    //    url: 'api/Persona',
                    //    type: 'POST',
                    //    dataType: 'json',
                    //    data: personabeneficiario,
                    //    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                    //        var newCell2 = newRow.insertCell(1);


                    //            var newText2 = document.createTextNode(data.NOMBRE + ' '  + data.PRIMER_APELLIDO + ' ' + data.SEGUNDO_APELLIDO );
                    //            newCell2.appendChild(newText2);


                    //    },
                    //    /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

                    //    }
                    //});




                }
                $("#tablafamiliares").dataTable({
                    "scrollY": "500px",
                    "scrollCollapse": true,
                    "paging": false,
                    dom: 'Bfrtip',
                    buttons: [
                        'print'
                    ]
                });



            }
            $("#tab-content2").append("<input type='button' onclic='insertarfamiliar(" + persona.identificacion + ")' value='insertar nuevo beneficiario a " + persona.identificacion + "/>");

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });



    //return tabla.value;


}

function devuelvetablahistorialdepagos(fondo, ide, tab) {
    var d = document.createElement('div');
    d.setAttribute('id', 'historial' + tab + '');
    d.setAttribute('style', 'visibility:hidden');
    document.body.appendChild(d);
    $('#historial' + tab).append("<paper-button raised onclick='cerrarpophistorial(\"historial" + tab + "\")'>Salir</paper-button><hr>Sin historial en " + fondo);

    var persona = new Object();
    persona.identificacion = ide;
    persona.fondo = fondo;
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

                $('#historial' + tab).remove();
                var d = document.createElement('div');
                d.setAttribute('id', 'historial' + tab + '');
                d.setAttribute('style', 'visibility:hidden');
                document.body.appendChild(d);
                $('#historial' + tab).append("<paper-button raised onclick='cerrarpophistorial(\"historial" + tab + "\")'>Salir</paper-button><hr>Sin historial en " + fondo);

                $('#historial' + tab).append("<h1>Historial de pagos en " + tab + "</h1>  <paper-button raised onclick='cerrarpophistorial(\"historial" + tab + "\")'>Salir</paper-button><table id='tablahistorial" + fondo + "' class='display'><thead><tr><th scope='col' abbr='Starter'>Quincena/Mes/Año</th><th scope='col' abbr='Starter'>ID y serie del pago</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Fecha</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Usuario</th></tr></thead><tbody></tbody></table>");

              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById("tablahistorial" + fondo).getElementsByTagName('tbody')[0];

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




                    ////ajax de los datos personales
                    ///*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    //    url: 'api/Persona',
                    //    type: 'POST',
                    //    dataType: 'json',
                    //    data: personabeneficiario,
                    //    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                    //        var newCell2 = newRow.insertCell(1);


                    //            var newText2 = document.createTextNode(data.NOMBRE + ' '  + data.PRIMER_APELLIDO + ' ' + data.SEGUNDO_APELLIDO );
                    //            newCell2.appendChild(newText2);


                    //    },
                    //    /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

                    //    }
                    //});




                }
                $("#tablahistorial" + fondo).dataTable({
                    "scrollY": "500px",
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


function devuelvetablaactivosprestados(ide, data) {

    $('#tab-content4').append("<table id='tablaactivosprestados' class='table2'><thead><tr><th scope='col' abbr='Starter'>Activo</th><th scope='col' abbr='Starter'>Fecha del prestamo</th><th scope='col' abbr='Starter'>Fecha de devolución</th><th scope='col' abbr='Starter'>Plazo inicial en meses</th><th scope='col' abbr='Starter'>Estado del prestamo</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Monto actual</th><th scope='col' abbr='Starter'>Usuario y fecha</th></tr></thead><tbody>");
    $('#tab-content4').append(" </tbody></table>");




    var bandera = '0';
  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
        bandera = '1';
        var tableRef = document.getElementById("tablaactivosprestados").getElementsByTagName('tbody')[0];

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


        var newText2 = document.createTextNode(dateConvert(data[ele].FECHA_PRESTAMO, "DD-MM-YYYY"));
        newCell2.appendChild(newText2);

        var newCell3 = newRow.insertCell(2);


        var newText3 = document.createTextNode(dateConvert(data[ele].FECHA_DEVOLUCION, "DD-MM-YYYY"));
        newCell3.appendChild(newText3);


        var newCell4 = newRow.insertCell(3);


        var newText4 = document.createTextNode(data[ele].PLAZO_INICIAL_MESES);
        newCell4.appendChild(newText4);


        var newCell5 = newRow.insertCell(4);


        var newText5 = document.createTextNode(data[ele].ESTADO_DEL_PRESTAMO);
        newCell5.appendChild(newText5);



        var newCell7 = newRow.insertCell(5);


        //        var newText7 = document.createTextNode(data[ele].METODO_PAGO.DESCRIPCION);

        //newCell7.appendChild(newText7);

        var btnFORZAR = document.createElement("select");
        //btnmodifica.type = "button";
        btnFORZAR.innerHTML = "<option value = '1'>Planilla central</option><option value= '3'>Efectivo</option>";

        btnFORZAR.setAttribute("onchange", "cambiartipodepagoaprestamodeactivo('" + data[ele].NUMERO_ACTIVO.NUMERO_ACTIVO + "','" + ide + "');");
        btnFORZAR.id = 'selectcambiatipo' + data[ele].NUMERO_ACTIVO.NUMERO_ACTIVO;
        if (data[ele].METODO_PAGO.DESCRIPCION == 'PLANILLA CENTRAL') {
            btnFORZAR.value = "1";
        } else {
            btnFORZAR.value = "3";
        }



        newCell7.appendChild(btnFORZAR);




        var newCellX = newRow.insertCell(6);


        var newTextX = document.createTextNode(data[ele].MONTO);

        newCellX.appendChild(newTextX);



        var newCell8 = newRow.insertCell(7);


        var newText8 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(data[ele].FEC_ULT_ACT, "DD-MM-YYYY"));
        newCell8.appendChild(newText8);




    }
    if (bandera == '1') {
       /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("ACTIVOSPRESTADOS", JSON.stringify(data));

    }




}



function devuelvecantidaddeprestamosdemasdedocemeses() {

 



    var persona = new Object();
    persona.cantidaddepretamosconmasdedocemeses = 'Si';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //        //ajax de los activos en prestamo
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Prestamo_activo',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            $("#tab-content4").append("Error al cargar, favor volver a cargar");
        }

    });




}

function devuelvetablaayudasprestadas(ide, data) {

    $('#tab-content5').append("<table id='tablaayudasprestadas' class='table2'><thead><tr><th scope='col' abbr='Starter'>Consecutivo y Descripcion</th><th scope='col' abbr='Starter'>Monto total</th><th scope='col' abbr='Starter'>Periodo y cuota</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Sesion de junta</th><th scope='col' abbr='Starter'>Fecha de inicio del tramite</th><th scope='col' abbr='Starter'>Fecha de aprobacion</th><th scope='col' abbr='Starter'>Fecha de cierre</th><th scope='col' abbr='Starter'>Usuario y fecha</th></tr></thead><tbody>");
    $('#tab-content5').append(" </tbody></table>");

  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

        var tableRef = document.getElementById("tablaayudasprestadas").getElementsByTagName('tbody')[0];

        // Insert a row in the table at the last row
        var newRow = tableRef.insertRow(tableRef.rows.length);

        // Insert a cell in the row at index 0
        var newCell = newRow.insertCell(0);

        // Append a text node to the cell
        var newText = document.createTextNode(data[ele].CONSECUTIVO_AYUDA + ' ' + data[ele].DESCRIPCION_AYUDA);

        newCell.appendChild(newText);
        //var personabeneficiario = new Object();
        //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
        var newCell2 = newRow.insertCell(1);


        var newText2 = document.createTextNode(data[ele].MONTO_TOTAL);
        newCell2.appendChild(newText2);

        var newCell3 = newRow.insertCell(2);


        var newText3 = document.createTextNode('cada ' + data[ele].PERIOCIDAD + ' un monto de ' + data[ele].CUOTA_POR_PERIODO);
        newCell3.appendChild(newText3);


        var newCell4 = newRow.insertCell(3);


        var newText4 = document.createTextNode(data[ele].ESTADO);
        newCell4.appendChild(newText4);


        var newCell5 = newRow.insertCell(4);


        var newText5 = document.createTextNode(data[ele].SESION_PROBACION.IDENTIFICACION);
        newCell5.appendChild(newText5);



        var newCell7 = newRow.insertCell(5);


        var newText7 = document.createTextNode(dateConvert(data[ele].FECHA_INICIO_TRAMITE, "DD-MM-YYYY"));

        newCell7.appendChild(newText7);


        var newCell8 = newRow.insertCell(6);


        var newText8 = document.createTextNode(dateConvert(data[ele].FECHA_APROBACION_AYUDA, "DD-MM-YYYY"));
        newCell8.appendChild(newText8);


        var newCell9 = newRow.insertCell(7);


        var newText9 = document.createTextNode(dateConvert(data[ele].FECHA_CIERRE_AYUDA, "DD-MM-YYYY"));
        newCell9.appendChild(newText9);



        var newCell10 = newRow.insertCell(8);


        var newText10 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(data[ele].FEC_ULT_ACT, "DD-MM-YYYY"));
        newCell10.appendChild(newText10);




    }


}



function devuelvetablabecasprestadas(ide, data) {

    $('#tab-content6').append("<table id='tablabecasprestadas' class='table2'><thead><tr><th scope='col' abbr='Starter'>Consecutivo y Descripcion</th><th scope='col' abbr='Starter'>Monto total</th><th scope='col' abbr='Starter'>Periodo y cuota</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Sesion de junta</th><th scope='col' abbr='Starter'>Fecha de inicio del tramite</th><th scope='col' abbr='Starter'>Fecha de aprobacion</th><th scope='col' abbr='Starter'>Fecha de cierre</th><th scope='col' abbr='Starter'>Usuario y fecha</th></tr></thead><tbody>");
    $('#tab-content6').append(" </tbody></table>");

  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

        var tableRef = document.getElementById("tablabecasprestadas").getElementsByTagName('tbody')[0];

        // Insert a row in the table at the last row
        var newRow = tableRef.insertRow(tableRef.rows.length);

        // Insert a cell in the row at index 0
        var newCell = newRow.insertCell(0);

        // Append a text node to the cell
        var newText = document.createTextNode(data[ele].CONSECUTIVO_BECA + ' ' + data[ele].DESCRIPCION_BECA);

        newCell.appendChild(newText);
        //var personabeneficiario = new Object();
        //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
        var newCell2 = newRow.insertCell(1);


        var newText2 = document.createTextNode(data[ele].MONTO_TOTAL);
        newCell2.appendChild(newText2);

        var newCell3 = newRow.insertCell(2);


        var newText3 = document.createTextNode('cada ' + data[ele].PERIOCIDAD + ' un monto de ' + data[ele].CUOTA_POR_PERIODO);
        newCell3.appendChild(newText3);


        var newCell4 = newRow.insertCell(3);


        var newText4 = document.createTextNode(data[ele].ESTADO);
        newCell4.appendChild(newText4);


        var newCell5 = newRow.insertCell(4);


        var newText5 = document.createTextNode(data[ele].SESION_PROBACION.IDENTIFICACION);
        newCell5.appendChild(newText5);



        var newCell7 = newRow.insertCell(5);


        var newText7 = document.createTextNode(data[ele].FECHA_INICIO_TRAMITE);

        newCell7.appendChild(newText7);


        var newCell8 = newRow.insertCell(6);


        var newText8 = document.createTextNode(data[ele].FECHA_APROBACION_AYUDA);
        newCell8.appendChild(newText8);


        var newCell9 = newRow.insertCell(7);


        var newText9 = document.createTextNode(data[ele].FECHA_CIERRE_AYUDA);
        newCell9.appendChild(newText9);



        var newCell10 = newRow.insertCell(8);


        var newText10 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + data[ele].FEC_ULT_ACT);
        newCell10.appendChild(newText10);




    }


}

function cargaaso(iden) {

    var persona = new Object();
    persona.identificacion = iden;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //ajax de los datos de asobiso
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Asobiso',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.IDENTIFICACION.IDENTIFICACION == 0) {
                $("#tab-content3").append("No afiliado a asobiso")
               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("PERSONABUSCADAENASOBISO", null);
            } else {
                var date1 = new Date(data.FECHA_INGRESO);
                var date2 = new Date(data.FEC_ULT_ACT);
                //  var date1 = new Date(date1.setTime(date1.getTime() + 1 * 86400000));
                // var date2 = new Date(date2.setTime(date2.getTime() + 1 * 86400000));
               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("PERSONABUSCADAENASOBISO", JSON.stringify(data));
                // alert("Persona afiliada desde: " + data.FECHA_INGRESO);
                devuelvetablahistorialdepagos("ASOBISO", persona.identificacion, "asobiso");
                if (data.MONTO < 0) {

                    $("#tab-content3").append("<p> Estado actual en el fondo: " + data.ESTADO.DESCRIPCION + " forma de pago: " + data.METODO_PAGO.DESCRIPCION + " fecha de afiliación: " + date1.toLocaleDateString("es-ES", options) + "<br/> <strong> <spam style='font-size:small'>Ultima actualización por: " + data.USUARIO.NOMBRE_COMPLETO + " la fecha: " + date2.toLocaleDateString("es-ES", options) + " </spam> </strong> </p><table><tr><td> saldo actual: " + data.MONTO + "<paper-button raised onclick='window.location.href=\"centraldepagos.html?ID=1\"'>Pagar</paper-button><br/>Detalle de saldo moroso<textarea rows='4' cols='50' id='detallesaldomorosoaso'></textarea></td></tr><tr><td>Observaciones: " + data.OBSERVACIONES + "<paper-button raised id='guardaobsaso' onclick= \"obs('" + data.IDENTIFICACION.IDENTIFICACION + "','ASOBISO','');\">Guardar nueva observación</paper-button><paper-button raised id='botonpophistorialaso' onclick='window.open(\"historialdepagos.html?id=" + iden + "&fondo=ASOBISO\")'>Mostrar historial</paper-button>  <paper-button raised id='botonpophistorialasosaldo' onclick='window.open(\"Historialdesaldos.html?id=" + iden + "&fondo=ASOBISO\")'>Mostrar historial de saldos</paper-button> </td></tr></table><br/><span id='alertadereingresoaso' style='visibility:collapse;font-size:large' class='badge bg-danger'></span>");
                    try {

                        var datosenviadetallemoroso = new Object();
                        datosenviadetallemoroso.id = iden;
                        datosenviadetallemoroso.fondo = 'ASOBISO';
                        datosenviadetallemoroso.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                        datosenviadetallemoroso.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
                        datosenviadetallemoroso.criterio = 'detallemoroso'
                        var tabla;
                        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                            url: urllocal + 'Comunes',
                            type: 'POST',
                            dataType: 'json',
                            data: datosenviadetallemoroso,
                            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

                                document.getElementById('detallesaldomorosoaso').innerHTML = data;
                            },
                            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                                alert(xhr);
                            }
                        });

                    } catch (error) {
                        console.error(error);
                        // expected output: ReferenceError: nonExistentFunction is not defined
                        // Note - error messages will vary depending on browser
                    }




                } else {
                    $("#tab-content3").append("<p> Estado actual en el fondo: " + data.ESTADO.DESCRIPCION + " forma de pago: " + data.METODO_PAGO.DESCRIPCION + " fecha de afiliacion: " + date1.toLocaleDateString("es-ES", options) + "<br/> <strong> <spam style='font-size:small'>Ultima actualizacion por: " + data.USUARIO.NOMBRE_COMPLETO + " la fecha: " + date2.toLocaleDateString("es-ES", options) + " </spam> </strong> </p><table><tr><td> saldo actual: " + data.MONTO + "<paper-button raised onclick='window.location.href=\"centraldepagos.html?ID=1\"'>Pagar</paper-button></td></tr><tr><td>Observaciones: " + data.OBSERVACIONES + "<paper-button raised id='guardaobsaso' onclick= \"obs('" + data.IDENTIFICACION.IDENTIFICACION + "','ASOBISO','');\">Guardar nueva observacion</paper-button><paper-button raised id='botonpophistorialaso' onclick='window.open(\"historialdepagos.html?id=" + iden + "&fondo=ASOBISO\")'>Mostrar historial</paper-button> </td></tr></table><br/><span id='alertadereingresoaso' style='visibility:collapse;font-size:large' class='badge bg-danger'></span>");

                }
                //  corroborareingresoaso(data.IDENTIFICACION.IDENTIFICACION)


                var datosenviadetallemorosomut = new Object();
                datosenviadetallemorosomut.id = data.IDENTIFICACION.IDENTIFICACION;
                datosenviadetallemorosomut.fondo = 'ASOBISO';
                datosenviadetallemorosomut.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                datosenviadetallemorosomut.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
                datosenviadetallemorosomut.criterio = 'esreingreso'
                var tabla;
                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'Comunes',
                    type: 'POST',
                    dataType: 'json',
                    data: datosenviadetallemorosomut,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                        console.log(data)
                        document.getElementById('alertadereingresoaso').innerHTML = data;
                        document.getElementById('alertadereingresoaso').style.visibility = "visible";
                    },
                    /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                        alert(xhr);
                    }
                });

            }



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            $("#tab-content3").append("Error al cargar, favor volver a cargar");
        }
    });
    $('#clictab3').removeAttr('onclick');
}


function cargamut(iden) {
    /*AL CONSUMIR UN API POR AJAX, MUESTRA UN MSG AL USUAIRO Y BLOQUE LA PANTALLA PARA EVITAR DOBLE ENVIO DE LA INFORMACION*/$(document).ajaxStart(function () {
        $("#tab-content1").append("<div id='quecargamut'>Cargando</div>");
        $("#loading").html("");
        $("#loading").removeClass("cargando");
    });
    $(document).ajaxComplete(function () {
        $("#quecargamut").remove();
    });
    var persona = new Object();
    persona.identificacion = iden;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //ajax de los datos de mutualidad
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Mutualidad',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.IDENTIFICACION.IDENTIFICACION == 0) {


                $("#tab-content1").append("Persona no esta afiliada a mutualidad<hr><a href='/afiliacionenmutualidad.html'>Desea afiliar a " + iden + "</a>");
               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("PERSONABUSCADAENMUTUALIDAD", null);

            } else {
                var date1 = new Date(data.FECHA_INGRESO);
                var date2 = new Date(data.FEC_ULT_ACT);
                //  var date1 = new Date(date1.setTime(date1.getTime() + 1 * 86400000));
                // var date2 = new Date(date2.setTime(date2.getTime() + 1 * 86400000));
               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("PERSONABUSCADAENMUTUALIDAD", JSON.stringify(data));
                // alert("Persona afiliada desde: " + data.FECHA_INGRESO);


                if (data.MONTO < 0) {
                    $("#tab-content1").append("<table><tr><td><img id=\"imgboletamut\" style=\"height:200px\" src='Imagenes/imgboletano.jpg'\"></td><td>Para subir la boleta:<input id='inputFileboletamut' type='file' /><paper-button raised id='botonsubeboletamut' onclick='cambiarBOLETAMUT()'>Cambiar la boleta</paper-button></td><td><div id='btnreingreso'></div>Observaciones: " + data.OBSERVACIONES + " </br>  <paper-button raised \ id='guardaobsmut' onclick= \"obs('" + data.IDENTIFICACION.IDENTIFICACION + "','MUTUALIDAD','');\">Guardar nueva observación</paper-button></td></tr></table><p> Estado actual en el fondo: " + data.ESTADO.DESCRIPCION + " forma de pago: " + data.METODO_PAGO.DESCRIPCION + " fecha de afiliación: " + date1.toLocaleDateString("es-ES", options) + "<table><tr><td> Saldo actual: " + data.MONTO + " Le alcanza hasta <strong><spam id= 'alcanzamut'></strong></spam> <paper-button raised onclick='window.location.href=\"centraldepagos.html?ID=2\"'>Pagar</paper-button><br/>Detalle de saldo moroso<textarea rows='4' cols='50' id='detallemosrosomut'></textarea></td><td><paper-button raised id='botonpopbene'  onclick='muestradivbn()'>Mostrar beneficiarios</paper-button></td><td><paper-button raised id='botonmodben' onclick=\"window.location = 'modificabeneficiarios.html';\">Modificar Beneficiarios</paper-button></td><td><paper-button raised id='botonpophistorialmut' onclick='window.open(\"historialdepagos.html?id=" + data.IDENTIFICACION.IDENTIFICACION + "&fondo=MUTUALIDAD\")'>Mostrar historial</paper-button></td>    <td><paper-button raised id='botonpophistorialmutsaldos' onclick='window.open(\"Historialdesaldos.html?id=" + data.IDENTIFICACION.IDENTIFICACION + "&fondo=MUTUALIDAD\")'>Mostrar historial de saldos</paper-button></td> <td><paper-button raised id='botonenviacorreomut' onclick='enviacorreoinfomut()'>Enviar correo con la información</paper-button></td><td><paper-button raised id='botonnotaexoanticipada' onclick='generanotaexoanticipada()'>Generar nota de exoneración anticipada</paper-button></td></tr></table><strong> <spam style='font-size:small'>Ultima actualización por: " + data.USUARIO.NOMBRE_COMPLETO + " la fecha: " + date2.toLocaleDateString("es-ES", options) + " </spam> <br/><span id='alertadereingresomut' style='visibility:collapse;font-size:large' class='badge bg-danger'></span> </strong> </p>");
                    try {
                        var datosenviadetallemorosomut = new Object();
                        datosenviadetallemorosomut.id = iden;
                        datosenviadetallemorosomut.fondo = 'MUTUALIDAD';
                        datosenviadetallemorosomut.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                        datosenviadetallemorosomut.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
                        datosenviadetallemorosomut.criterio = 'detallemoroso'
                        var tabla;
                        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                            url: urllocal + 'Comunes',
                            type: 'POST',
                            dataType: 'json',
                            data: datosenviadetallemorosomut,
                            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

                                document.getElementById('detallemosrosomut').innerHTML = data;
                            },
                            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                                alert(xhr);
                            }
                        });
                    } catch (error) {
                        console.error(error);
                        // expected output: ReferenceError: nonExistentFunction is not defined
                        // Note - error messages will vary depending on browser
                    }
                } else {
                    $("#tab-content1").append("<table><tr><td><img id=\"imgboletamut\" style=\"height:200px\" src='Imagenes/imgboletano.jpg'\"></td><td>Para subir la boleta:<input id='inputFileboletamut' type='file' /><paper-button raised id='botonsubeboletamut' onclick='cambiarBOLETAMUT()'>Cambiar la boleta</paper-button></td><td><div id='btnreingreso'></div>Observaciones: " + data.OBSERVACIONES + " </br>  <paper-button raised \ id='guardaobsmut' onclick= \"obs('" + data.IDENTIFICACION.IDENTIFICACION + "','MUTUALIDAD','');\">Guardar nueva observación</paper-button></td></tr></table><p> Estado actual en el fondo: " + data.ESTADO.DESCRIPCION + " forma de pago: " + data.METODO_PAGO.DESCRIPCION + " fecha de afiliación: " + date1.toLocaleDateString("es-ES", options) + "<table><tr><td> Saldo actual: " + data.MONTO + " Le alcanza hasta <strong><spam id= 'alcanzamut'></strong></spam> <paper-button raised onclick='window.location.href=\"centraldepagos.html?ID=2\"'>Pagar</paper-button></td><td><paper-button raised id='botonpopbene'  onclick='muestradivbn()'>Mostrar beneficiarios</paper-button></td><td><paper-button raised id='botonmodben' onclick=\"window.location = 'modificabeneficiarios.html';\">Modificar Beneficiarios</paper-button></td><td><paper-button raised id='botonpophistorialmut' onclick='window.open(\"historialdepagos.html?id=" + data.IDENTIFICACION.IDENTIFICACION + "&fondo=MUTUALIDAD\")'>Mostrar historial</paper-button></td>    <td><paper-button raised id='botonpophistorialmutsaldos' onclick='window.open(\"Historialdesaldos.html?id=" + data.IDENTIFICACION.IDENTIFICACION + "&fondo=MUTUALIDAD\")'>Mostrar historial de saldos</paper-button></td> <td><paper-button raised id='botonenviacorreomut' onclick='enviacorreoinfomut()'>Enviar correo con la información</paper-button></td></tr></table><strong> <spam style='font-size:small'>Ultima actualización por: " + data.USUARIO.NOMBRE_COMPLETO + " la fecha: " + date2.toLocaleDateString("es-ES", options) + " </spam> <br/><span id='alertadereingresomut' style='visibility:collapse;font-size:large' class='badge bg-danger'></span> </strong> </p>");


                }

                //corroborareingresomut(data.IDENTIFICACION.IDENTIFICACION)
                var datosenviadetallemorosomut = new Object();
                datosenviadetallemorosomut.id = data.IDENTIFICACION.IDENTIFICACION;
                datosenviadetallemorosomut.fondo = 'MUTUALIDAD';
                datosenviadetallemorosomut.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                datosenviadetallemorosomut.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
                datosenviadetallemorosomut.criterio = 'esreingreso'
                var tabla;
                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'Comunes',
                    type: 'POST',
                    dataType: 'json',
                    data: datosenviadetallemorosomut,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                        console.log(data)
                        document.getElementById('alertadereingresomut').innerHTML = data;
                        document.getElementById('alertadereingresomut').style.visibility = "visible";
                    },
                    /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                        alert(xhr);
                    }
                });




                if (data.ESTADO.ID == 12 || data.ESTADO.ID == 19) {

                    $("#btnreingreso").append("<paper-button raised \ id='reingresarenmut' onclick= \"reingresarenmut('" + data.IDENTIFICACION.IDENTIFICACION + "');\">Reingresar como nuevo</paper-button>");
                }
                devuelvetablabeneficiarios(data.IDENTIFICACION.IDENTIFICACION);
                devuelvetablahistorialdepagos("MUTUALIDAD", data.IDENTIFICACION.IDENTIFICACION, "mutualidad");
                calculasaldo('MUTUALIDAD', data.MONTO, 'alcanzamut');
                if (data.ESTADO.ID == 1 || data.ESTADO.ID == 7) {
                    var persona = new Object();
                    persona.IDENTIFICACION = data.IDENTIFICACION.IDENTIFICACION;
                    persona.ope = "3";

                    //ajax de los datos de asobiso
                    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                        url: urllocal + 'Asociado',
                        type: 'POST',
                        dataType: 'json',
                        data: persona,
                        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                            if (data == 1) {
                                document.getElementById("alertas").innerHTML = "Parece que el afiliado esta cercano o tiene mas de 30 años de pertenecer al fondo y su edad esta cerca o es de mas de 69 años, favor tomar en cuenta para exoneración";
                            }


                        },
                        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) { }
                    });

                }

                if (data.ESTADO.ID == 14) {
                    var persona = new Object();
                    persona.idsocio = data.IDENTIFICACION.IDENTIFICACION;
                    persona.criterio = "xidentificacion";
                    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
                    //ajax de los datos de asobiso
                    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                        url: urllocal + 'defmut',
                        type: 'POST',
                        dataType: 'json',
                        data: persona,
                        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                            $("#tab-content1").append("<hr><div style= 'font-size:large;background-color:brown;color:white;'>Información de los beneficiarios que registraron subsidio por este fallecimiento: <br> Fecha de defunción: " + data.FECHA_DEFUNCION +" <br> Monto del subsidio: " + data.MONTO_SUBSIDIO +" <br> Beneficiario(s) que recibieron el subsidio: " + data.BENEFICIARIOS + "</div>");


                        },
                        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) { }
                    });
                }




            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            $("#tab-content1").append("Error al cargar, favor volver a cargar");
        }
    });
    $('#clictab1').removeAttr('onclick');

}


function cargasol(iden) {
    /*AL CONSUMIR UN API POR AJAX, MUESTRA UN MSG AL USUAIRO Y BLOQUE LA PANTALLA PARA EVITAR DOBLE ENVIO DE LA INFORMACION*/$(document).ajaxStart(function () {
        $("#tab-content2").append("<div id='quecargasol'>Cargando</div>");
        $("#loading").html("");
        $("#loading").removeClass("cargando");
    });
    $(document).ajaxComplete(function () {
        $("#quecargasol").remove();
    });
    var persona = new Object();
    persona.identificacion = iden;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    ////ajax de los datos de solidaridad
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Solidaridad',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.IDENTIFICACION.IDENTIFICACION == 0) {

                $("#tab-content2").append("Persona no esta afiliada a solidaridad<hr><a href='/afiliacionensolidaridad.html'>Desea afiliar a " + persona.identificacion + "</a>");
               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("PERSONABUSCADAENSOLIDARIDAD", null);
            } else {
                var date1 = new Date(data.FECHA_INGRESO);
                var date2 = new Date(data.FEC_ULT_ACT);
                //     date1 = new Date(date1.setTime(date1.getTime() + 1 * 86400000));
                //   date2 = new Date(date2.setTime(date2.getTime() + 1 * 86400000));
               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("PERSONABUSCADAENSOLIDARIDAD", JSON.stringify(data));
                //alert("Persona afiliada desde: " + data.FECHA_INGRESO);
                ////$('#usuariologuado').value = formatItem(data);
                ////location.href = "/inicio.html";
                //document.getElementById("infopersonal").innerHTML = "<h1>" + data.IDENTIFICACION + ' ' + data.NOMBRE + ' ' + data.PRIMER_APELLIDO + ' ' + data.SEGUNDO_APELLIDO + "</h1></br> <p>nacio el " + data.FECHA_NACIMIENTO + ", ingreso a la institución el: " + data.FECHA_INGRESO_ICE + " actualmente vive es: " + data.DIRECCION + " tiene registrados los correos: " + data.EMAIL1 + " - " + data.EMAIL2 + " labora para el departamento de: " + data.DEPARTAMENTO + " tiene el puesto de " + data.PUESTO + " sus telefonos son: " + data.TEL1 + " / " + data.TEL2 + " / " + data.CEL + "</p> <strong> <spam style='font-size:small'> Ultima actualizacion por: " + data.USUARIO.NOMBRE_COMPLETO + " la fecha: " + data.FEC_ULT_ACT + " </spam> </strong> </hr>";
                //document.getElementById("infopersonal").innerHTML += "<ul id='tabs'></ul>";


                if (data.MONTO < 0) {
                    $("#tab-content2").append("<table><tr><td><img id=\"imgboletasol\" style=\"height:200px\" src='Imagenes/imgboletano.jpg'\"></td><td>Para subir la boleta:<input id='inputFileboletasol' type='file' /><paper-button raised id='botonsubeboletasol' onclick='cambiarBOLETASOL()'>Cambiar la boleta</paper-button></td><td><div id='btnreingresosol'></div>Observaciones: " + data.OBSERVACIONES + "<br/> <paper-button raised id='guardaobssol' onclick= \"obs('" + data.IDENTIFICACION.IDENTIFICACION + "','SOLIDARIDAD','');\">Guardar nueva observación</paper-button></td></tr></table><p> Estado actual en el fondo: " + data.ESTADO.DESCRIPCION + " forma de pago: " + data.METODO_PAGO.DESCRIPCION + " fecha de afiliación: " + date1 + "<table><tr><td> Saldo actual: " + data.MONTO + " Le alcanza hasta <strong><spam id= 'alcanzasol'></strong></spam><paper-button raised onclick='window.location.href=\"centraldepagos.html?ID=3\"'>Pagar</paper-button><br/> Detalle de saldo moroso<textarea rows='4' cols='50' id='detallemorososol'></textarea> </td><td><paper-button raised id='botonpopbene'  onclick='muestradivfam()'>Mostrar familiares</paper-button></td><td><paper-button raised id='botonmodfam' onclick=\"window.location = 'modificafamiliares.html';\">Modificar familiares</paper-button></td><td><paper-button raised id='botonpophistorialmut' onclick='window.open(\"historialdepagos.html?id=" + iden + "&fondo=SOLIDARIDAD\")'>Mostrar historial</paper-button></td> <td><paper-button raised id='botonpophistorialsolsaldos' onclick='window.open(\"Historialdesaldos.html?id=" + iden + "&fondo=SOLIDARIDAD\")'>Mostrar historial de saldos</paper-button></td>  <td><paper-button raised id='botonenviacorreosol' onclick='enviacorreoinfosol()'>Enviar correo con la información</paper-button></td></tr></table> <strong> <spam style='font-size:small'>Ultima actualización por: " + data.USUARIO.NOMBRE_COMPLETO + " la fecha: " + date2 + " </spam> <br/><span id='alertadereingresosol' style='visibility:collapse;font-size:large' class='badge bg-danger'></span> </strong> </p> ");
                    try {
                        var datosenviadetallemorososol = new Object();
                        datosenviadetallemorososol.id = iden;
                        datosenviadetallemorososol.fondo = 'SOLIDARIDAD';
                        datosenviadetallemorososol.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                        datosenviadetallemorososol.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
                        datosenviadetallemorososol.criterio = 'detallemoroso'
                        var tabla;
                        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                            url: urllocal + 'Comunes',
                            type: 'POST',
                            dataType: 'json',
                            data: datosenviadetallemorososol,
                            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

                                document.getElementById('detallemorososol').innerHTML = data;
                            },
                            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                                alert(xhr);
                            }
                        });
                    } catch (error) {
                        console.error(error);
                        // expected output: ReferenceError: nonExistentFunction is not defined
                        // Note - error messages will vary depending on browser
                    }
                } else {

                    $("#tab-content2").append("<table><tr><td><img id=\"imgboletasol\" style=\"height:200px\" src=\"Boletas/" + data.IDENTIFICACION.IDENTIFICACION + "sol.jpg\" onerror=\"this.src=\'Imagenes/imgboletano.jpg'\"></td><td>Para subir la boleta:<input id='inputFileboletasol' type='file' /><paper-button raised id='botonsubeboletasol' onclick='cambiarBOLETASOL()'>Cambiar la boleta</paper-button></td><td><div id='btnreingresosol'></div>Observaciones: " + data.OBSERVACIONES + "<br/> <paper-button raised id='guardaobssol' onclick= \"obs('" + data.IDENTIFICACION.IDENTIFICACION + "','SOLIDARIDAD','');\">Guardar nueva observacion</paper-button></td></tr></table><p> Estado actual en el fondo: " + data.ESTADO.DESCRIPCION + " forma de pago: " + data.METODO_PAGO.DESCRIPCION + " fecha de afiliacion: " + date1.toLocaleDateString("es-ES", options) + "<table><tr><td> Saldo actual: " + data.MONTO + " Le alcanza hasta <strong><spam id= 'alcanzasol'></strong></spam><paper-button raised onclick='window.location.href=\"centraldepagos.html?ID=3\"'>Pagar</paper-button>  </td><td><paper-button raised id='botonpopbene'  onclick='muestradivfam()'>Mostrar familiares</paper-button></td><td><paper-button raised id='botonmodfam' onclick=\"window.location = 'modificafamiliares.html';\">Modificar familiares</paper-button></td><td><paper-button raised id='botonpophistorialmut' onclick='window.open(\"historialdepagos.html?id=" + iden + "&fondo=SOLIDARIDAD\")'>Mostrar historial</paper-button></td>  <td><paper-button raised id='botonpophistorialsolsaldos' onclick='window.open(\"Historialdesaldos.html?id=" + iden + "&fondo=SOLIDARIDAD\")'>Mostrar historial de saldos</paper-button></td> <td><paper-button raised id='botonenviacorreosol' onclick='enviacorreoinfosol()'>Enviar correo con la información</paper-button></td></tr></table> <strong> <spam style='font-size:small'>Ultima actualizacion por: " + data.USUARIO.NOMBRE_COMPLETO + " la fecha: " + date2.toLocaleDateString("es-ES", options) + " </spam> <br/><span id='alertadereingresosol'  style='visibility:collapse;font-size:large' class='badge bg-danger'></span>  </strong> </p> ");

                }

                // corroborareingresosol(data.IDENTIFICACION.IDENTIFICACION)

                var datosenviadetallemorosomut = new Object();
                datosenviadetallemorosomut.id = data.IDENTIFICACION.IDENTIFICACION;
                datosenviadetallemorosomut.fondo = 'SOLIDARIDAD';
                datosenviadetallemorosomut.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                datosenviadetallemorosomut.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
                datosenviadetallemorosomut.criterio = 'esreingreso'
                var tabla;
                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'Comunes',
                    type: 'POST',
                    dataType: 'json',
                    data: datosenviadetallemorosomut,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                        console.log(data)
                        document.getElementById('alertadereingresosol').innerHTML = data;
                        document.getElementById('alertadereingresosol').style.visibility = "visible";
                    },
                    /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                        alert(xhr);
                    }
                });



                if (data.ESTADO.ID == 12 || data.ESTADO.ID == 19) {

                    $("#btnreingresosol").append("<paper-button raised \ id='reingresarensol' onclick= \"reingresarensol('" + data.IDENTIFICACION.IDENTIFICACION + "');\">Reingresar como nuevo</paper-button>");
                }
                devuelvetablafamiliares(persona.identificacion);
                devuelvetablahistorialdepagos("SOLIDARIDAD", persona.identificacion, "solidaridad");
                calculasaldo('SOLIDARIDAD', data.MONTO, 'alcanzasol');
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            $("#tab-content2").append("Error al cargar, favor volver a cargar");
        }
    });
    $('#clictab2').removeAttr('onclick');
}

function cargapac(iden) {
    /*AL CONSUMIR UN API POR AJAX, MUESTRA UN MSG AL USUAIRO Y BLOQUE LA PANTALLA PARA EVITAR DOBLE ENVIO DE LA INFORMACION*/$(document).ajaxStart(function () {
        $("#tab-content4").append("<div id='quecargapac'>Cargando</div>");
        $("#loading").html("");
        $("#loading").removeClass("cargando");
    });
    $(document).ajaxComplete(function () {
        $("#quecargapac").remove();
    });


    var persona = new Object();
    persona.identificacion = iden;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //        //ajax de los activos en prestamo
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Prestamo_activo',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                $("#tab-content4").append("Persona sin activos en préstamo");

            } else {
                //alert("Persona afiliada desde: " + data.FECHA_INGRESO);
                $("#tab-content4").append("Activos en prestamos");
                devuelvetablaactivosprestados(persona.identificacion, data);
            }
            $("#tab-content4").append("<hr><a href='/alquilerdeequipo.html'>Desea realizar nuevo préstamo a " + persona.identificacion + "</a><paper-button raised  onclick ='cargahistorialprestamodeequipo(" + persona.identificacion +")'>Cargar el historial de prestamos de equipo medico</paper-button>");

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            $("#tab-content4").append("Error al cargar, favor volver a cargar");
        }

    });
    $('#clictab4').removeAttr('onclick');




}

function cargaayu(iden) {
    /*AL CONSUMIR UN API POR AJAX, MUESTRA UN MSG AL USUAIRO Y BLOQUE LA PANTALLA PARA EVITAR DOBLE ENVIO DE LA INFORMACION*/$(document).ajaxStart(function () {
        $("#tab-content5").append("<div id='quecargaayu'>Cargando</div>");
        $("#loading").html("");
        $("#loading").removeClass("cargando");
    });
    $(document).ajaxComplete(function () {
        $("#quecargaayu").remove();
    });
    var persona = new Object();
    persona.identificacion = iden;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //        //ajax de los ayudas prestadas
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Ayuda',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                $("#tab-content5").append("Persona sin ayudas");

            } else {
                $("#tab-content5").append("Ayudas prestados");
                devuelvetablaayudasprestadas(persona.identificacion, data);
            }
            $("#tab-content5").append("</hr><a href='/prestarayuda.html?ID=" + persona.identificacion + "'>Desea prestar ayuda a " + persona.identificacion + "</a>");

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            $("#tab-content5").append("Error al cargar, favor volver a cargar");
        }
    });
    $('#clictab5').removeAttr('onclick');
}

function cargabec(iden) {
    /*AL CONSUMIR UN API POR AJAX, MUESTRA UN MSG AL USUAIRO Y BLOQUE LA PANTALLA PARA EVITAR DOBLE ENVIO DE LA INFORMACION*/$(document).ajaxStart(function () {
        $("#tab-content6").append("<div id='quecargabec'>Cargando</div>");
        $("#loading").html("");
        $("#loading").removeClass("cargando");
    });
    $(document).ajaxComplete(function () {
        $("#quecargabec").remove();
    });
    var persona = new Object();
    persona.identificacion = iden;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //        //ajax de los ayudas prestadas
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Beca',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                $("#tab-content6").append("Persona sin becas");

            } else {
                $("#tab-content6").append("Becas prestadas");
                devuelvetablabecasprestadas(persona.identificacion, data);
            }

            sessionStorage.setItem("FORMA", "ESTE ES UN EXITO");
            $("#tab-content6").append("</hr><a href='/becar.html?ID=" + persona.identificacion + "'>Desea becar a " + persona.identificacion + "</a>");

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            $("#tab-content6").append("Error al cargar, favor volver a cargar");
        }
    });
    $('#clictab6').removeAttr('onclick');
}

function cargahistorialprestamodeequipo(iden) {

    $('#tab-content4').append("<h2>Historial de prestamos</h2> </hr> <table id='tablahistorialactivosprestados' class='display'><thead><tr><th scope='col' abbr='Starter'>Fecha del prestamo</th><th scope='col' >Persona a la que se presto</th><th scope='col' >Fecha que se devolvio</th><th scope='col' >Nombre del equipo medico</th></tr></thead><tbody>");
    $('#tab-content4').append(" </tbody></table><hr/>");

    var persona = new Object();

    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.historialxpersona = true;
    persona.idpersona = iden;

    var tabla;


    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Equipomedico',
        // url: 'http://192.168.1.135//api/Listado',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {




              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById('tablahistorialactivosprestados').getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);

                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    // Append a text node to the cell
                    var newText = document.createTextNode(data[ele].FECHA_PRESTAMO);

                    newCell.appendChild(newText);

                    var newCell2 = newRow.insertCell(1);

                    //
                    var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE + " " + data[ele].IDENTIFICACION.PRIMER_APELLIDO + " " + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO);

                    newCell2.appendChild(newText2);
                    //
                    var newCell3 = newRow.insertCell(2);


                    var newText3 = document.createTextNode(data[ele].FECHA_DEVOLUCION);
                    newCell3.appendChild(newText3);
                    var newCell4 = newRow.insertCell(3);

                    var newText4 = document.createTextNode(data[ele].NUMERO_ACTIVO.DESCRIPCION);
                    newCell4.appendChild(newText4);




                    //
                    //                       
                }



                $('#tablahistorialactivosprestados').dataTable({
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

}

function cargacambiosdeestado(iden) {
    /*AL CONSUMIR UN API POR AJAX, MUESTRA UN MSG AL USUAIRO Y BLOQUE LA PANTALLA PARA EVITAR DOBLE ENVIO DE LA INFORMACION*/$(document).ajaxStart(function () {
        $("#tab-content8").append("<div id='quecargace'>Cargando</div>");
        $("#loading").html("");
        $("#loading").removeClass("cargando");
    });
    $(document).ajaxComplete(function () {
        $("#quecargabce").remove();
    });
    var persona = new Object();
    persona.id = iden;
    persona.op = 1;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //        //ajax de los ayudas prestadas
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Historial_cambioestados',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                $("#tab-content8").append("Persona sin cambio de estado");

            } else {
                $("#tab-content8").append("Historial de cambios de estado");
                devuelvetablacambioestado(persona.identificacion, data);
            }



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            $("#tab-content8").append("Error al cargar, favor volver a cargar");
        }
    });
    $('#clictab8').removeAttr('onclick');
}

function corroborareingresomut(iden) {
    var datosenviadetallemorosomut = new Object();
    datosenviadetallemorosomut.id = iden;
    datosenviadetallemorosomut.fondo = 'MUTUALIDAD';
    datosenviadetallemorosomut.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    datosenviadetallemorosomut.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    datosenviadetallemorosomut.criterio = 'esreingreso'
    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Comunes',
        type: 'POST',
        dataType: 'json',
        data: datosenviadetallemorosomut,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

            document.getElementById('alertadereingresomut').innerHTML = data;
            document.getElementById('alertadereingresomut').style.visibility = "visible";
        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });


}



function corroborareingresoaso(iden) {
    var datosenviadetallemorosomut = new Object();
    datosenviadetallemorosomut.id = iden;
    datosenviadetallemorosomut.fondo = 'ASOBISO';
    datosenviadetallemorosomut.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    datosenviadetallemorosomut.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    datosenviadetallemorosomut.criterio = 'esreingreso'
    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Comunes',
        type: 'POST',
        dataType: 'json',
        data: datosenviadetallemorosomut,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

            document.getElementById('alertadereingresoaso').innerHTML = data;
            document.getElementById('alertadereingresoaso').style.visibility = "visible";
        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });


}



function corroborareingresosol(iden) {
    var datosenviadetallemorosomut = new Object();
    datosenviadetallemorosomut.id = iden;
    datosenviadetallemorosomut.fondo = 'SOLIDARIDAD';
    datosenviadetallemorosomut.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    datosenviadetallemorosomut.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    datosenviadetallemorosomut.criterio = 'esreingreso'
    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Comunes',
        type: 'POST',
        dataType: 'json',
        data: datosenviadetallemorosomut,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

            document.getElementById('alertadereingresoaso').innerHTML = data;
            document.getElementById('alertadereingresoaso').style.visibility = "visible";
        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });


}



function devuelvetablacambioestado(uno, data) {



    $('#tab-content8').append("<table id='tablacambioestado' class='table2'><thead><tr><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Se cambio a</th><th scope='col' abbr='Starter'>Usuario responsable</th><th scope='col' abbr='Starter'>Fecha del cambio</th></tr></thead><tbody>");
    $('#tab-content8').append("</tbody></table>");

  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

        var tableRef = document.getElementById("tablacambioestado").getElementsByTagName('tbody')[0];

        // Insert a row in the table at the last row
        var newRow = tableRef.insertRow(tableRef.rows.length);

        // Insert a cell in the row at index 0
        var newCell = newRow.insertCell(0);

        // Append a text node to the cell
        var newText = document.createTextNode(data[ele].FONDO);

        newCell.appendChild(newText);
        //var personabeneficiario = new Object();
        //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
        var newCell2 = newRow.insertCell(1);


        var newText2 = document.createTextNode(data[ele].NUEVOESTADO.DESCRIPCION);
        newCell2.appendChild(newText2);

        var newCell3 = newRow.insertCell(2);


        var newText3 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
        newCell3.appendChild(newText3);


        var newCell4 = newRow.insertCell(3);


        var newText4 = document.createTextNode(dateConvert(data[ele].FECHA, "DD-MM-YYYY"));
        newCell4.appendChild(newText4);


    }


}



function cargacambiossaldo(iden) {
    /*AL CONSUMIR UN API POR AJAX, MUESTRA UN MSG AL USUAIRO Y BLOQUE LA PANTALLA PARA EVITAR DOBLE ENVIO DE LA INFORMACION*/$(document).ajaxStart(function () {
        $("#tab-content9").append("<div id='quecargacs'>Cargando</div>");
        $("#loading").html("");
        $("#loading").removeClass("cargando");
    });
    $(document).ajaxComplete(function () {
        $("#quecargacs").remove();
    });
    var persona = new Object();
    persona.id = iden;
    persona.op = 1;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //        //ajax de los ayudas prestadas
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Historial_cambiosaldos',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                $("#tab-content9").append("Persona sin cambio de saldos");

            } else {
                $("#tab-content9").append("Historial de cambios en los saldos");
                devuelvetablacambiosaldos(persona.identificacion, data);
            }



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            $("#tab-content9").append("Error al cargar, favor volver a cargar");
        }
    });
    $('#clictab9').removeAttr('onclick');
}



function devuelvetablacambiosaldos(uno, data) {



    $('#tab-content9').append("<table id='tablacambiosaldo' class='table2'><thead><tr><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Monto anterior</th><th scope='col' abbr='Starter'>Monto posterior</th><th scope='col' abbr='Starter'>Diferencia</th><th scope='col' abbr='Starter'>Usuario responsable</th><th scope='col' abbr='Starter'>Fecha del cambio</th><th scope='col' abbr='Starter'>Detalle</th></tr></thead><tbody>");
    $('#tab-content9').append("</tbody></table>");

  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

        var tableRef = document.getElementById("tablacambiosaldo").getElementsByTagName('tbody')[0];

        // Insert a row in the table at the last row
        var newRow = tableRef.insertRow(tableRef.rows.length);

        // Insert a cell in the row at index 0
        var newCell = newRow.insertCell(0);

        // Append a text node to the cell
        var newText = document.createTextNode(data[ele].FONDO);

        newCell.appendChild(newText);
        //var personabeneficiario = new Object();
        //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
        var newCell2 = newRow.insertCell(1);


        var newText2 = document.createTextNode(data[ele].SALDOANTERIOR);
        newCell2.appendChild(newText2);

        var newCell2 = newRow.insertCell(2);


        var newText2 = document.createTextNode(data[ele].SALDONUEVO);
        newCell2.appendChild(newText2);


        var newCell3 = newRow.insertCell(3);




        var newText3 = document.createTextNode(parseInt(data[ele].SALDONUEVO) - parseInt(data[ele].SALDOANTERIOR));
        newCell3.appendChild(newText3);



        var newCell3 = newRow.insertCell(4);




        var newText3 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
        newCell3.appendChild(newText3);


        var newCell4 = newRow.insertCell(5);


        var newText4 = document.createTextNode(dateConvert(data[ele].FECHA, "DD-MM-YYYY"));
        newCell4.appendChild(newText4);


        var newCell4 = newRow.insertCell(6);


        var newText4 = document.createTextNode(data[ele].DETALLE);
        newCell4.appendChild(newText4);


    }


}




function cargaresumen(iden) {

    var persona = new Object();
    persona.identificacion = iden;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    //ajax de los datos de mutualidad
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Resumenpersona',
        type: 'POST',
        dataType: 'text',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data == '') {
                $("#tab-content7").append("No hay datos sobre esta persona");
            } else {
                // alert("Persona afiliada desde: " + data.FECHA_INGRESO);
                $("#tab-content7").append(data);
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            $("#tab-content7").append("Error al cargar, favor volver a cargar");
        }
    });

}

function muestradivbn() {

    document.getElementById("benficiariospopup").setAttribute("class", "pop");
    document.getElementById("benficiariospopup").style.visibility = 'visible';
}

function muestradivhp() {

    document.getElementById("historialmutualidad").setAttribute("class", "pop");
    document.getElementById("historialmutualidad").style.visibility = 'visible';
}

function muestradivfam() {

    document.getElementById("familiarespopup").setAttribute("class", "pop");
    document.getElementById("familiarespopup").style.visibility = 'visible';
}

function muestradivhps() {

    document.getElementById("historialsolidaridad").setAttribute("class", "pop");
    document.getElementById("historialsolidaridad").style.visibility = 'visible';
}

function cerrarpopbene() {


    document.getElementById("benficiariospopup").style.visibility = 'hidden';
}

function cerrarpopfam() {


    document.getElementById("familiarespopup").style.visibility = 'hidden';
}

function cerrarpophistorial(iden) {


    document.getElementById(iden).style.visibility = 'hidden';
}

function modificafamiliar(iden, nom, ape1, ape2, estado, parentezco) {
    document.getElementById('espaciomodificafam').innerHTML = "<h1 id='idenmodificafam'>" + iden + "</h1> <input  class='form-control' placeholder='Nombre del familiar' id='nombremodificafam' value='" + nom + "'/><input  class='form-control' placeholder='primer apellido del familiar' id='pamodificafam' value='" + ape1 + "'/><input  class='form-control' placeholder='segundo apellido del familiar' id='samodificafam' value='" + ape2 + "'/><input  class='form-control' disabled placeholder='Estado del familiar' id='estadomodificafam' value='" + estado + "'/>Tipo de familiar: <select  id='ddl_lista_tipo_fam'> </select><hr><button raised id='btnmodificafam' onclick='modificarfam()'>Modificar </button> ";
    devuelvecombotipofamiliar(parentezco);


}

function modificarfam() {

    // var posicion = document.getElementById('parenfammod').options.selectedIndex; //posicion

    var persona = new Object();
    persona.idsocio = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
    persona.idfam = document.getElementById('idenmodificafam').innerHTML;
    persona.primer_apellido = document.getElementById('pamodificafam').value;
    persona.segundo_apellido = document.getElementById('samodificafam').value;
    persona.nombre = document.getElementById('nombremodificafam').value;
    persona.parentezco = document.getElementById('ddl_lista_tipo_fam').value;
    persona.tipo = "2";
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.estado = document.getElementById('estadomodificafam').value;
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
                var persona = new Object();
                persona.identificacion = document.getElementById('idenmodificafam').innerHTML;
                persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                persona.primer_apellido = document.getElementById('pamodificafam').value;
                persona.segundo_apellido = document.getElementById('samodificafam').value;
                persona.nombre = document.getElementById('nombremodificafam').value;
                persona.ope = "2";
                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'ModificaPersona',
                    type: 'POST',
                    dataType: 'json',
                    data: persona,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                        if (data.ID == 0) {
                            alert("Persona no esta afiliada ni registrada");
                        } else {


                            alert("Familiar modificado");
                            location.reload(true);
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

    // location.href = "/modificafamiliares.html";
}




function modificabeneficiario(iden, nom, ap1, ap2, pri, por, par) {

    document.getElementById('espaciomodificabene').innerHTML = "<h1 id='idenmodificabn'>" + iden + "</h1> <input  class='form-control' placeholder='Nombre del beneficiario' id='nombremodificabn' value='" + nom + "'/><input  class='form-control' placeholder='primer apellido del beneficiario' id='pamodificabn' value='" + ap1 + "'/><input  class='form-control' placeholder='segundo apellido del beneficiario' id='samodificabn' value='" + ap2 + "'/><input  class='form-control' placeholder='prioridad del beneficiario' id='prioridadmodificabn' value='" + pri + "'/><input  class='form-control' placeholder='Porcentage del beneficiario' id='porcentajemodificabn' value='" + por + "'/>Tipo de beneficiario<input type='text' value= '" + par + "' id='ddl_lista_tipo_fam'/><hr><button raised id='btnmodificaben' onclick='modificarbn()'>Modificar </button> ";
    // devuelvecombotipofamiliar();



}

function modificarbn() {


    var persona = new Object();
    persona.idsocio = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
    persona.idbene = document.getElementById('idenmodificabn').innerHTML;

    persona.porcentage = document.getElementById('porcentajemodificabn').value;
    persona.prioridad = document.getElementById('prioridadmodificabn').value;
    persona.parentezco = document.getElementById('ddl_lista_tipo_fam').value;
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.tipo = 2;
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
                var persona = new Object();
                persona.identificacion = document.getElementById('idenmodificabn').innerHTML;

                persona.primer_apellido = document.getElementById('pamodificabn').value;
                persona.segundo_apellido = document.getElementById('samodificabn').value;
                persona.nombre = document.getElementById('nombremodificabn').value;
                persona.ope = "2";
                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'ModificaPersona',
                    type: 'POST',
                    dataType: 'json',
                    data: persona,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                        if (data.ID == 0) {
                            alert("Persona no esta afiliada ni registrada");
                        } else {
                            var persona = new Object();
                            persona.identificacion = document.getElementById('idenmodificabn').innerHTML;
                            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                            persona.primer_apellido = document.getElementById('pamodificabn').value;
                            persona.segundo_apellido = document.getElementById('samodificabn').value;
                            persona.nombre = document.getElementById('nombremodificabn').value;
                            persona.ope = "2";
                            /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                                url: urllocal + 'ModificaPersona',
                                type: 'POST',
                                dataType: 'json',
                                data: persona,
                                /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                                    if (data.ID == 0) {
                                        alert("Persona no esta afiliada ni registrada");
                                    } else {

                                        alert("Beneficiario modificado correctamente");
                                        //  location.href = "/modificabeneficiarios.html";
                                        location.reload(true);
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

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

}


function devuelvecombotipofamiliar(par) {

    var persona = new Object();
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Tipo_familiar',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {


              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                    $('#ddl_lista_tipo_fam').append("<option id= '" + data[ele].ID + "' value = '" + data[ele].ID + "'>" + data[ele].DESCRIPCION + "</option>");

                }
                document.getElementById('ddl_lista_tipo_fam').value = par;


            }


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }



    });

}


function obs(id, fondo, obsactuales) {


    switch (fondo) {
        case "MUTUALIDAD": {
            obsactuales = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).OBSERVACIONES;
            break;
        }
        case "SOLIDARIDAD": {
            obsactuales = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).OBSERVACIONES;
            break;
        }
        case "ASOBISO": {
            obsactuales = JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).OBSERVACIONES;
            break;
        }
    }

    $('#cuadroagregaobs').css('visibility', 'visible');
    //          $('#cuadroagregaobs').append('<h1>Nuevas observaciones</h1>')
    //           $('#cuadroagregaobs').append('<p>Para la identificacion '+ id +' en el fondo ' + fondo +'</p>')
    //           
    $('#cuadroagregaobs').append("<h1>Nuevas observaciones</h1><p>Para la identificacion " + id + " en el fondo " + fondo + "</p>");

    $('#cuadroagregaobs').append("<textarea rows='20' cols='80' id='obstexto' onkeypress='habilitaguardar()' >" + obsactuales + "</textarea>");
    $('#cuadroagregaobs').append("<hr><paper-button raised id='btngobs' disabled onclick='ajaxagregaobs(\" " + id + " \",\" " + fondo + "\",\"\")'>Guardar</paper-button><paper-button raised onclick='cerrarajaxagregaobs()'>Salir</paper-button>");
    document.getElementById("idescogido").value = id;

    document.getElementById("fondoescogido").value = fondo;

}

function habilitaguardar() {

    document.getElementById("btngobs").enabled;

    document.getElementById("btngobs").style.background = 'green';
}

function ajaxagregaobs(uno, dos, tres) {

    switch (dos) {
        case "MUTUALIDAD": {
            tres = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).OBSERVACIONES;
            break;
        }
        case "SOLIDARIDAD": {
            tres = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).OBSERVACIONES;
            break;
        }
        case "ASOBISO": {
            tres = JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).OBSERVACIONES;
            break;
        }
    }


    var persona = new Object();


    persona.id = uno;
    persona.fondo = dos;

    persona.obs = document.getElementById("obstexto").value;
    persona.actualiza = 'Si';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Obs',
        // url: 'http://192.168.30.104//api/Obs',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else { }
        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });

    alert('Observacion insertada correctamente');
    $('#cuadroagregaobs').html("");
    $('#cuadroagregaobs').css('visibility', 'hidden');

}


function busquedaxnombre() {

    var miniprofile = document.getElementById("cuadrobusquedaxnombre");
    miniprofile.innerHTML =
        "<table id='tablabusqnombre' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre</th><th scope='col' abbr='Starter'>Primer apellido</th><th scope='col' abbr='Starter'>Segundo apellido</th><th scope='col' abbr='Starter'>Fotografia</th><th scope='col' abbr='Starter'>Buscar</th></tr></thead><tbody></table>";

    var persona = new Object();
    persona.nombre = document.getElementById('nombrebuscado').value;
    persona.primer_apellido = document.getElementById('pabuscado').value;
    persona.segundo_apellido = document.getElementById('sabuscado').value;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Persona',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {


              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById('tablabusqnombre').getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);

                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    // Append a text node to the cell
                    var newText = document.createTextNode(data[ele].IDENTIFICACION)

                    newCell.appendChild(newText);
                    //var personabeneficiario = new Object();
                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                    var newCell2 = newRow.insertCell(1);


                    var newText2 = document.createTextNode(data[ele].NOMBRE);
                    newCell2.appendChild(newText2);

                    var newCell3 = newRow.insertCell(2);


                    var newText3 = document.createTextNode(data[ele].PRIMER_APELLIDO);
                    newCell3.appendChild(newText3);
                    var newCell4 = newRow.insertCell(3);


                    var newText4 = document.createTextNode(data[ele].SEGUNDO_APELLIDO);
                    newCell4.appendChild(newText4);



                    var newCell6 = newRow.insertCell(4);
                    var imgperfil = document.createElement("img");
                    //btnmodifica.type = "button";

                    imgperfil.setAttribute("onclick", "window.location = 'inicio.html?id=" + data[ele].IDENTIFICACION + "';");
                    imgperfil.id = 'img' + data[ele].IDENTIFICACION;
                    imgperfil.src = "fotos/" + data[ele].IDENTIFICACION + ".jpg";
                    //newCell0.innerHTML= "<input type='button' id= boton" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + " value='modificar' onclick='modificabeneficiario(" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ") />'";
                    imgperfil.setAttribute("style", "width:50px;height:50px;");
                    imgperfil.setAttribute("onerror", "this.src='Imagenes/img_usuario.png'");


                    newCell6.appendChild(imgperfil);




                    var newCell0 = newRow.insertCell(5);
                    var btnmodifica = document.createElement("paper-button");
                    //btnmodifica.type = "button";
                    btnmodifica.setAttribute("raised", "");
                    btnmodifica.setAttribute("onclick", "window.location = 'inicio.html?id=" + data[ele].IDENTIFICACION + "';");
                    btnmodifica.id = 'boton' + data[ele].IDENTIFICACION;
                    btnmodifica.text = "Buscar";
                    //newCell0.innerHTML= "<input type='button' id= boton" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + " value='modificar' onclick='modificabeneficiario(" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ") />'";
                    newCell0.appendChild(btnmodifica);




                }

                $('#tablabusqnombre').dataTable({
                    "scrollY": "200px",
                    "scrollCollapse": true,
                    "paging": false
                });
            }


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

}

function calculasaldo(idtipopago, montoactual, control) {
    var lealcanza = '';
    switch (idtipopago) {
        case 'MUTUALIDAD':


            var persona = new Object();
            persona.operacion = "6";
            persona.MONTOSALDO = montoactual;
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            //ajax de los datos personales
            /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                url: urllocal + 'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {

                        //  lealcanza = ' le alcanza hasta ' + data;         // Create a text 


                        var controlint = document.getElementById(control);
                        controlint.innerHTML = data;
                    }
                }
            });


            break;
        case 'SOLIDARIDAD':

            var persona = new Object();
            persona.operacion = "5";
            persona.MONTOSALDO = montoactual;
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            //ajax de los datos personales
            /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                url: urllocal + 'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {

                        // lealcanza = ' le alcanza hasta ' + data; 
                        var controlint = document.getElementById(control);
                        controlint.innerHTML = data;
                    }
                }
            });


            break;
        default:
            return '';
            break;
    }

}




function cambiarBOLETAMUT() {
    var files = $("#inputFileboletamut").get(0).files;
    if (files.length > 0) {

        var data = new FormData();
        files[0].name = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
        for (i = 0; i < files.length; i++) {
            data.append("file" + i, files[i]);
        }
        data.append('ID', JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION + 'mut');
        data.append('TIPO', 'FOTOGRAFIABOLETA');
        data.append("usrid", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID);
        data.append("pssw", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA);

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            type: "POST",
            url: urllocal + "file",
            // datatype:'json',
            contentType: false,
            processData: false,
            data: data,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (result) {
                if (result) {
                    alert("Boleta cambiada");

                }
            }
        });
    } else {
        alert("Seleccione una fotografía primero");
    }
}



function cambiarBOLETASOL() {
    var files = $("#inputFileboletasol").get(0).files;
    if (files.length > 0) {

        var data = new FormData();
        files[0].name = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
        for (i = 0; i < files.length; i++) {
            data.append("file" + i, files[i]);
        }
        data.append('ID', JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION + 'sol');
        data.append('TIPO', 'FOTOGRAFIABOLETA');
        data.append('usrid', JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID);
        data.append('pssw', JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA);

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            type: "POST",
            url: urllocal + "file",
            // datatype:'json',
            contentType: false,
            processData: false,
            data: data,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (result) {
                if (result) {
                    alert("Boleta cambiada");

                }
            }
        });
    } else {
        alert("Seleccione una fotografia primero");
    }
}



function enviacorreoinfomut() {
    var html = "";
    var date1 = new Date(JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).FECHA_INGRESO);
    // var date1 = new Date(date1.setTime(date1.getTime() + 1 * 86400000));

    html = "<h1>El presente mensaje es únicamente dirigido al asociado con nombre: " + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.NOMBRE + " " + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.PRIMER_APELLIDO + " " + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.SEGUNDO_APELLIDO + " cuyo número de identificación es: " + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION + " </h1><h1>La siguiente es la información consignada en el sistema sobre su programa beneficio por defunción del afiliado, si su saldo es 0, quiere decir que se encuentra al día</h1> <hr /><table style='border:1px solid blue;'FRAME='BOX' RULES='ALL'CELLSPACING='12' CELLPADDING='5'><tr><td  colspan='6'>Estado Actual " + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).ESTADO.DESCRIPCION + "</td></tr><tr><td colspan='6'>Fecha de ingreso " + date1.toLocaleDateString("es-ES", options) + "</td> </tr><tr><td colspan='6'>Su saldo actual en  PBDA-Mutualidad es : " + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).MONTO + "</td></tr>";
    html = html + "<tr><td> BENEFICIARIOS</td></tr><tr><td><table  style='border:1px solid red;''FRAME='BOX' RULES='ALL'CELLSPACING='12' CELLPADDING='5'>";
    html = html + "<tr><td>Número de identificación</td><td> Nombre</td><td>Primer apellido</td><td>Segundo apellido</td><td>Parentesco</td><td>Porcentaje</td><td>Prioridad</td></tr>";

    var persona = new Object();
    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Beneficiarios',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {
              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                    html = html + "<tr><td>" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + "</td><td> " + data[ele].IDENTIFICACION_BENEFICIARIO.NOMBRE + "</td><td> " + data[ele].IDENTIFICACION_BENEFICIARIO.PRIMER_APELLIDO + "</td><td> " + data[ele].IDENTIFICACION_BENEFICIARIO.SEGUNDO_APELLIDO + " </td><td>" + data[ele].PARENTEZCO + "</td><td> " + data[ele].PORCENTAGE + " </td><td>" + data[ele].PRIORIDAD + "</td></tr>";

                }
                html = html + "</td></tr></table></table> </br> <h2>**Si algún número de identificación tiene 'TMP' al final, favor enviarnos el mismo actualizado por este medio o por medio de la página web.</br>Recuerde puede consultar su información con más detalle en nuestra página web https://asobiso.com/loginsocio.html <h2>  Este correo fue enviado por: " + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO;

                var persona = new Object();


                persona.criterio = 'msgconcomprobacion';
                persona.para = JSON.parse(localStorage.getItem("PERSONABUSCADA")).EMAIL1;

                persona.asunto = 'Su información en mutualidad';

                persona.html = html;
                persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
                persona.correodeusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL;
                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'Correo',
                    // url: 'http://192.168.30.104//api/Obs',
                    type: 'POST',
                    dataType: 'json',
                    data: persona,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                        alert(data);
                    },
                    /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                });
            }




        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });




}



function enviacorreoinfosol() {
    var date1 = new Date(JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).FECHA_INGRESO);
    // var date1 = new Date(date1.setTime(date1.getTime() + 1 * 86400000));
    var html = "";
    html = "<h1>El presente mensaje es únicamente dirigido al asociado con nombre: " + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.NOMBRE + " " + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.PRIMER_APELLIDO + " " + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.SEGUNDO_APELLIDO + " cuyo número de identificación es: " + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION + " <h1>La siguiente es la información consignada en el sistema sobre su programa beneficio por defunción de familiares, si su saldo es 0, quiere decir que se encuentra al día</h1> <hr /><table style='border:1px solid blue;'FRAME='BOX' RULES='ALL'CELLSPACING='12' CELLPADDING='5'><tr><td  colspan='6'>Estado Actual " + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).ESTADO.DESCRIPCION + "</td></tr><tr><td colspan='6'>Fecha de ingreso " + date1.toLocaleDateString("es-ES", options) + "</td> </tr><tr><td colspan='6'>Su saldo actual en PBDF-Solidaridad es: " + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).MONTO + "</td></tr>";
    html = html + "<tr><td> FAMILIARES</td></tr><tr><td><table  style='border:1px solid red;''FRAME='BOX' RULES='ALL'CELLSPACING='12' CELLPADDING='5'>";
    html = html + "<tr><td>Número de identificación</td><td> Nombre</td><td>Primer apellido</td><td>Segundo apellido</td><td>Parentesco</td><td>Estado</td></tr>";

    var persona = new Object();
    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Familiares',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {
              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                    html = html + "<tr><td>" + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION + "</td><td> " + data[ele].IDENTIFICACION_FAMILIAR.NOMBRE + "</td><td> " + data[ele].IDENTIFICACION_FAMILIAR.PRIMER_APELLIDO + "</td><td> " + data[ele].IDENTIFICACION_FAMILIAR.SEGUNDO_APELLIDO + " </td><td>" + data[ele].PARENTEZCO.DESCRIPCION + " </td><td>" + data[ele].ESTADO + "</td></tr>";

                }
                html = html + "</td></tr></table></table> </br> <h2>**Si algún número de identificación tiene 'TMP' al final, favor enviarnos el mismo actualizado por este medio o por medio de la página web.</br>Recuerde puede consultar su información con más detalle en nuestra página web https://asobiso.com/loginsocio.html <h2> Este correo fue enviado por: " + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO;

                var persona = new Object();


                persona.criterio = 'msgconcomprobacion';
                persona.para = JSON.parse(localStorage.getItem("PERSONABUSCADA")).EMAIL1;

                persona.asunto = 'Su información en solidaridad';
                persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
                persona.correodeusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL;
                persona.html = html;
                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'Correo',
                    // url: 'http://192.168.30.104//api/Obs',
                    type: 'POST',
                    dataType: 'json',
                    data: persona,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                        if (data == 0) {
                            alert("Persona no esta afiliada ni registrada");
                        } else {

                            alert("El correo ha sido enviado con exito");

                        }
                    },
                    /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                        alert(errorThrown);
                    }
                });
            }




        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });




}


function muestradivha() {
    document.getElementById("historialasobiso").setAttribute("class", "pop");
    document.getElementById("historialasobiso").style.visibility = 'visible';
}

function reingresarensol(id) {
    location.href = 'afiliacionensolidaridad.html';
}

function reingresarenmut(id) {
    location.href = 'afiliacionenmutualidad.html';
}

function generanotaexoanticipada() {
    var opcion = confirm("¿Desea generar por anticipado la nota de exoneración?");
    if (opcion == true) {
        let fechasesion = prompt('Escriba la fecha de la posible exoneración, dejar en blanco si se desea agregar a mano');
        let numerosesion = prompt('Escriba el numero de sesión de junta de la posible exoneración, dejar en blanco si se desea agregar a mano');
        var persona = new Object();
        persona.criterio = 'notaexoanticipada'
        persona.idasociado = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
        persona.fecha = fechasesion;
        persona.numsesion = numerosesion;
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        var tabla;
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Estado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                $("#infopersonal").remove();
                document.body.innerHTML += "<paper-button raised id='imprimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION + "\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + data + "'></img></div>";

            }
        });

    }
}

function cambiartipodepagoaprestamodeactivo(uno, dos) {
    var opcion = confirm("¿Desea cambiar el metodo de pago para este prestamo de equipo medico?");
    if (opcion == true) {
        var persona = new Object();
        persona.cambiametododepago = 'Si'
        persona.identificacion = dos;
        persona.idactivo = uno
        persona.nuevometodopago = document.getElementById('selectcambiatipo' + uno).value;
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        var tabla;
        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'Prestamo_activo',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                alert('Se cambio el metodo de pago del prestamo, se recargara el listado, favor corroborar que todo a transcurrido con exito')
                location.reload();
            }
        });
    }
}

function regeneraclave() {
    var personabuscada = JSON.parse(localStorage.getItem("PERSONABUSCADA"));
    if (personabuscada._EMAIL1 != "") {


        var opcion = confirm("¿Desea regenerar la clave del asociado?, esto cambiara la clave actual y presentara una pantalla con la información para que se le envié al asociado al correo");
        if (opcion == true) {


            var persona = new Object();
            persona.criterio = 'regeneraclaveasociado'
            persona.correo = personabuscada.EMAIL1;
            persona.nombre = personabuscada.NOMBRE;
            persona.sa = personabuscada.SEGUNDO_APELLIDO;
            persona.pa = personabuscada.PRIMER_APELLIDO;
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            var tabla;
            /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                url: urllocal + 'Comunes',
                type: 'POST',
                dataType: 'json',
                data: persona,
                /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                    alert('Copie el siguiente mensaje y envieselo al correo del asociado: ' + data)
                    // location.reload();
                }
            });
        }

    } else {
        alert('Asociado no tiene un correo principal asociado');
    }
}


function cerrarajaxagregaobs() {

    $('#cuadroagregaobs').html("");
    $('#cuadroagregaobs').css('visibility', 'hidden');

}
//PERFIL DE USUARIO MINI
var miniprofile = document.getElementById("people");
miniprofile.innerHTML = "<li>  <img src='/Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg' onerror='this.src = 'Imagenes/btn_menu.png'' onclick='muestraprofilegrande();' /><table><tr><td><h2>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</h2><em>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "</em> </td><td></td><td><input type=image src=\"Imagenes/list-view.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"menu.html\"'></input></td><td><input type=image src=\"Imagenes/settings.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"prefuser.html\"'></input></td><td><input type=image src=\"Imagenes/plug.png\" width=\"45\" height=\"45\" onclick = \"salirdelsistema()\"></input></td></tr></table></li>";
//FIN DEL PERFIL DE USUARIO MINI

/*CIERRA SESION Y QUITA LAS COOKIES DE MEMORIA, REDIRIGE AL INICIO DE SESION */function salirdelsistema() {

   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("USUARIOLOGUEADO", null);

    window.location.href = "Login.html";


}
document.getElementById("fotouser").style.background = "url('Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg')";

function muestraprofilegrande() {
    var capa = document.getElementById("nombreuser");
    capa.style.visibility = 'none';

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

function registradefsolidaridad(idfamiliar, tipo) {

    if (document.getElementById("fechadef" + idfamiliar).value != '' &&
        document.getElementById("montodef" + idfamiliar).value != '') {
        let text;
        if (confirm("Desea registrar la defunción de un familiar?") == true) {

            var persona = new Object();
            persona.idsocio = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
            persona.idfamiliar = idfamiliar;
            persona.fecdef = document.getElementById("fechadef" + idfamiliar).value;
            persona.monto = document.getElementById("montodef" + idfamiliar).value.replace(' ', '').replace(' ', '');
            persona.parentezco = tipo;
            persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.criterio = "insertar";
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            //ajax de los datos personales
            /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                url: urllocal + 'defsol',
                type: 'POST',
                dataType: 'json',
                data: persona,
                /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

                    alert("Proceso de defunción iniciado");
                    document.getElementById('familiarespopup').innerHTML = "";
                    //   window.location.href = "inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
                    devuelvetablafamiliares(JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION);
                },
                /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });


        } else {
            alert("No se realizo la accion");
        }
    } else {
        alert("Favor rellenar  la fecha y monto de defuncion");
    }
}
//var historialenhtml = localStorage.getItem("historialbusquedas");
//document.getElementById("ultbusq").innerHTML = 'Ultimas busquedas ' + historialenhtml;
document.getElementById("fotouser").style.backgroundSize = "contain";
/*$('#chatplace').scrollTop(1000000);*/

var capa = document.getElementById("nombreuser");
capa.innerHTML = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO;

function modificasoloidentificacion(idbene) {


    var nuevacedula = document.getElementById('nuevacedulaenvezde' + idbene).value;
    if (nuevacedula != '' && nuevacedula != idbene) {

        if (window.confirm("Desea modificar la cédula del beneficiario?")) {
            var persona = new Object();
            persona.idsocio = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
            persona.idbenevieja = idbene;
            persona.idbenenueva = nuevacedula;
            persona.tipo = 4
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            //ajax de los datos personales
            /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                url: urllocal + 'Beneficiarios',
                type: 'POST',
                dataType: 'json',
                data: persona,
                /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

                    alert("Cédula del beneficiario cambiada");
                    location.href = 'inicio.html?id=' + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;

                },
                /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
        }
    }
    else {
        alert('Debe rellenar el espacio para la nueva cedula o escribir una cedula diferente a la existente')
    }

}
function modificasolocedulafamiliar(idfam) {

    var nuevacedula = document.getElementById('nuevacedulafam' + idfam).value;
    if (nuevacedula != '' && nuevacedula != idfam) {

        if (window.confirm("Desea modificar la cédula del familiar?")) {
            var persona = new Object();
            persona.identificacionsocio = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
            persona.identificacionfamvieja = idfam;
            persona.identificacionfamnueva = nuevacedula;
            persona.tipo = 4
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            //ajax de los datos personales
            /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                url: urllocal + 'Familiares',
                type: 'POST',
                dataType: 'json',
                data: persona,
                /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

                    alert("Cédula del familiar cambiada");
                    location.href = 'inicio.html?id=' + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
                },
                /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
        }
    }
    else {
        alert('Debe rellenar el espacio para la nueva cedula o escribir una cedula diferente a la existente')
    }
}

function obtienecantidaddeprestamosmasdeunanno() {
    var persona = new Object();
    persona.cantidaddepretamosconmasdedocemeses = 'Si'
    persona.identificacion = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Prestamo_activo',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {


            try {
                document.getElementById('cantidaddeprestamosmasdeunanno').innerHTML = data;
            } catch (error) {
             
            }
           
        }
    });
}
function irallistadodeprestamosmasdeunanno() {
    window.open('ListadoPrestamosmasdeunanno.html', '_blank').focus();
}

