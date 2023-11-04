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
        message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr><strong id = "msgdecargando">Ya casi esta listo...</strong>',
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
   /*VERIFICA SI EL ROL DEL USUARIO TIENE ACCESO A ESTA PAGINA*/  if ((JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ROL == 1) || (JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ROL == 2) || (JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ROL == 4)) { } else {
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
var correosmorosospensionados = [];
var correosmorososplanilla = [];
var correosmorososequipo = [];
var correosequipoporvencer = [];



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
    document.getElementById("infopersonal").innerHTML += "<h2>Deducciones mensuales a todos los afiliados activos, según montos por parámetros  </H2> <hr><ul class='tabs' style='max-width: 1300px;width: 1300px;' id='detalle' ></ul>";

    $("#detalle").append("<li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>Mutualidad</label><div id='tab-content0' class='tab-content animated fadeIn'></div> </li><li id='pagodos'> <input type='radio'  name='tabs' id='tab1'><label for='tab1'>Solidaridad</label><div id='tab-content1' class='tab-content animated fadeIn'></div> </li>       <li id='pagocuatro'> <input type='radio'  name='tabs' id='tab4'><label for='tab4'>Asociación</label><div id='tab-content4' class='tab-content animated fadeIn'></div> </li>            <li id='pagoequipo'> <input type='radio'  name='tabs' id='tab10'><label for='tab10'>Deducciones equipo medico</label><div id='tab-content10' class='tab-content animated fadeIn'></div> </li>       <li id='correosmorososplanillacentralypensionados'> <input type='radio'  name='tabs' id='tab6'><label for='tab6'>Correos a morosos cuotas</label><div id='tab-content6' class='tab-content animated fadeIn'></div> </li>    <li id='correosmorososprestamodeequipo'> <input type='radio'  name='tabs' id='tab7'><label for='tab7'>Correos préstamo equipo</label><div id='tab-content7' class='tab-content animated fadeIn'></div> </li>  <li id='pagouno'> <input type='radio'  name='tabs' id='tab3'><label for='tab3'>Listado de deducciones</label><div id='tab-content3' class='tab-content animated fadeIn'></div> </li>");


    var topemut = 0;
    var topesol = 0;
    var montomutp = 0;
    var montosolp = 0;
    var cuotaaso = 0;
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
                alert("Error en la contraseña");
            } else {

                topemut = data.TOPE_MUT * 2;
                topesol = data.TOPE_SOL * 2;
                topeaso = 2;
                montosolp = data.CUOTA_DEF_SOL;
                montomutp = data.CUOTA_DEF_MUT;
                cuotaaso = data.CUOTA_ASOBISO;
                document.getElementById("montosol").innerHTML = (topesol) * montosolp;

                document.getElementById("montomut").innerHTML = (topemut) * montomutp;
                document.getElementById("montoaso").innerHTML = (topeaso) * cuotaaso;
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });



    //var persona = new Object();
    //persona.criterio = 'listadoarebajar';
    ////        //ajax de los ayudas prestadas
    //persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    //persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    ///*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
    //    url: urllocal + 'defsol',
    //    type: 'POST',
    //    dataType: 'json',
    //    data: persona,
    //    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
    //        if (data.length == 0) {
    //            $("#tab-content1").append("No hay defunciones");

    //        } else {

    $('#tab-content1').append("Número de quincena<select id ='quincenasdisponibles'>  <option value=\"1\">Primera</option></select>Número de mes<select id ='mesesdisponibles'><option value=\"1\">Enero</option><option value=\"2\">Febrero</option><option value=\"3\">Marzo</option><option value=\"4\">Abril</option><option value=\"5\">Mayo</option><option value=\"6\">Junio</option><option value=\"7\">Julio</option><option value=\"8\">Agosto</option><option value=\"9\">Setiembre</option><option value=\"10\">Octubre</option><option value=\"11\">Noviembre</option><option value=\"12\">Diciembre</option></select>Número de año<select id ='annosdisponibles'></select><hr/><spam id='infoultimadedsol'></spam><br>** Estas deducciones son mensuales e incluyen las dos quincenas del mes, debe hacerse al iniciar el mes respectivo, aplicará a todos los asociados activos sin importar su método de pago<hr/><paper-button raised id='btnaplicasol' onclick='aplicarsol()'>Aplicar las deducciones de un total de <spam id='montosol'>0</spam> colones</paper-button>");

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
    //if (mes !== 12) {
    //    mes = mes + 1;
    //}
    //else {
    //    mes = 1;

    //}


    var ele = document.getElementById("mesesdisponibles");
    for (var ii = 0; ii < ele.length; ii++) {
        if (ele.options[ii].value == mes) { //Found!
            ele.options[ii].selected = true;
        }
    }




    $('#tab-content0').append("Número de quincena<select id ='quincenasdisponiblesmut'>  <option value=\"1\">Primera</option></select>Número de mes<select id ='mesesdisponiblesmut'><option value=\"1\">Enero</option><option value=\"2\">Febrero</option><option value=\"3\">Marzo</option><option value=\"4\">Abril</option><option value=\"5\">Mayo</option><option value=\"6\">Junio</option><option value=\"7\">Julio</option><option value=\"8\">Agosto</option><option value=\"9\">Setiembre</option><option value=\"10\">Octubre</option><option value=\"11\">Noviembre</option><option value=\"12\">Diciembre</option></select>Número de año<select id ='annosdisponiblesmut'></select><hr/><spam id='infoultimadedmut'></spam><br>** Estas deducciones son mensuales e incluyen las dos quincenas del mes, debe hacerse al iniciar el mes respectivo, aplicará a todos los asociados activos sin importar su método de pago<hr/><paper-button raised id='btnaplicasol' onclick='aplicarmut()'>Aplicar las deducciones de un total de <spam id='montomut'></spam> colones</paper-button>");

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



    var mes = fecha.getMonth;

    //if (mes !== 12) {
    //    mes = mes + 1;
    //}
    //else {
    //    mes = 1;

    //}


    var ele = document.getElementById("mesesdisponiblesmut");
    for (var ii = 0; ii < ele.length; ii++) {
        if (ele.options[ii].value == mes) { //Found!
            ele.options[ii].selected = true;
        }
    }




    $('#tab-content4').append("Número de quincena<select id ='quincenasdisponiblesaso'>  <option value=\"1\">Primera</option></select>Número de mes<select id ='mesesdisponiblesaso'><option value=\"1\">Enero</option><option value=\"2\">Febrero</option><option value=\"3\">Marzo</option><option value=\"4\">Abril</option><option value=\"5\">Mayo</option><option value=\"6\">Junio</option><option value=\"7\">Julio</option><option value=\"8\">Agosto</option><option value=\"9\">Setiembre</option><option value=\"10\">Octubre</option><option value=\"11\">Noviembre</option><option value=\"12\">Diciembre</option></select>Número de año<select id ='annosdisponiblesaso'></select><hr/><spam id='infoultimadedaso'></spam><br>** Estas deducciones son mensuales e incluyen las dos quincenas del mes, debe hacerse al iniciar el mes respectivo, aplicará a todos los asociados activos sin importar su método de pago<hr/><paper-button raised id='btnaplicaaso' onclick='aplicaraso()'>Aplicar las deducciones de un total de <spam id='montoaso'></spam> colones</paper-button>");


    var x = document.getElementById("annosdisponiblesaso");
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



    var mes = fecha.getMonth;

    //if (mes !== 12) {
    //    mes = mes + 1;
    //}
    //else {
    //    mes = 1;

    //}


    var ele = document.getElementById("mesesdisponiblesaso");
    for (var ii = 0; ii < ele.length; ii++) {
        if (ele.options[ii].value == mes) { //Found!
            ele.options[ii].selected = true;
        }
    }




    var persona = new Object();
    persona.criterio = 'lista';

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
                $('#tab-content3').append("<table id='tabladef' class='display' style='font-size:xx-small'><thead><tr><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Quincena - Mes - Ano</th><th scope='col' abbr='Starter'>Cantidad y monto</th><th scope='col' abbr='Starter'>Usuario y fecha</th><th scope='col' abbr='Starter'>Ver detalle</th></tr></thead><tbody>");
                $('#tab-content3').append(" </tbody></table>");
                var cont = 0;
                var ultimomesmut = 0;
                var ultimomessol = 0;
                var ultimomesaso = 0;

                var ultimoannomut = 0;
                var ultimoannosol = 0;
                var ultimoannoaso = 0;
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
                    if (data[ele].FONDO == 'MUTUALIDAD') {
                        if (document.getElementById("infoultimadedmut").innerHTML == "") {
                            document.getElementById("infoultimadedmut").innerHTML = "Última deducción aplicada: " + data[ele].QUINCENA + ' - ' + data[ele].MES + ' - ' + data[ele].ANNO + " por un monto de:" + data[ele].MONTO;

                            ultimomesmut = data[ele].MES;
                            ultimoannomut = data[ele].ANNO;
                        }


                    }
                    if (data[ele].FONDO == 'SOLIDARIDAD') {
                        if (document.getElementById("infoultimadedsol").innerHTML == "") {
                            document.getElementById("infoultimadedsol").innerHTML = "Última deducción aplicada: " + data[ele].QUINCENA + ' - ' + data[ele].MES + ' - ' + data[ele].ANNO + " por un monto de:" + data[ele].MONTO;
                            ultimomessol = data[ele].MES;
                            ultimoannosol = data[ele].ANNO;
                        }




                    }
                    if (data[ele].FONDO == 'ASOBISO') {
                        if (document.getElementById("infoultimadedaso").innerHTML == "") {
                            document.getElementById("infoultimadedaso").innerHTML = "Última deducción aplicada: " + data[ele].QUINCENA + ' - ' + data[ele].MES + ' - ' + data[ele].ANNO + " por un monto de:" + data[ele].MONTO;
                            ultimomesaso = data[ele].MES;
                            ultimoannoaso = data[ele].ANNO;
                        }


                    }
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
                console.log(ultimomesmut);
                console.log(ultimomessol);
                console.log(ultimomesaso);

                if (ultimomesmut == 12) {
                    document.getElementById("mesesdisponiblesmut").value =1;

                }
                else {
                    document.getElementById("mesesdisponiblesmut").value = ultimomesmut + 1;

                }
                if (ultimomessol == 12) {
                    document.getElementById("mesesdisponibles").value =  1;

                }
                else {
                    document.getElementById("mesesdisponibles").value = ultimomessol + 1;

                }
                if (ultimomesaso == 12) {
                    document.getElementById("mesesdisponiblesaso").value =   1;

                }
                else {
                    document.getElementById("mesesdisponiblesaso").value = ultimomesaso + 1;

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



    $('#tab-content7').append("<table><tr><td id='columnamorososequipomedico'><div id='espacioparabotonoutlookmorososequipo'></div></td><td id= 'columnaequipomedicoporvencer'><div id='espacioparabotonoutlookequipoporvencer'></div></td></tr></table>");

    var vectorvacio = [];
   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem('listadecorreosaenviarequipomedicoporvencer', JSON.stringify(vectorvacio));
   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem('listadecorreosaenviarequipomedicomoroso', JSON.stringify(vectorvacio));
   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem('listadecorreosaenviarmorosopensionado', JSON.stringify(vectorvacio));
   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem('listadecorreosaenviarmorosoplanilla', JSON.stringify(vectorvacio));

    //CARGA DE PRESTAMOS DE EQUIPO MEDICO, PARA SU RESPECTIVA DEDUCCION MENSUAL

    var persona = new Object();
    persona.todalalista = 'Si';

    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Prestamo_activo',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                $("#tab-content10").append("No hay defunciones");

            } else {
                $('#tab-content10').append("<input type='button' value= 'Aplicar las deducciones por mantenimiento a los prestamos' onclick='aplicadeduccionesmantenimiento()'/> </hr> <table id='tablaprestamosdeequipomedico' style='font-size:xx-small' class='display'><thead><tr><th scope='col' abbr='Starter'>Asociado</th><th scope='col' abbr='Starter'>Equipo medico</th><th scope='col' abbr='Starter'>Fecha del préstamo</th><th scope='col' abbr='Starter'>Fecha a devolver</th><th scope='col' abbr='Starter'>Monto actual por mantenimiento</th><th scope='col' abbr='Starter'>Método de pago</th><th scope='col' abbr='Starter'>Monto mantenimiento mensual</th></tr></thead><tbody>");
                $('#tab-content10').append(" </tbody></table>");

                $('#columnamorososequipomedico').append("<input type='button' value= 'Enviar un correo de aviso a prestamos de equipo con saldo negativo' onclick='enviodecorreoindividualequipomoroso()'/> </hr> <br> Se le enviara copia del correo de aviso a : <br><input type='text' id='email1morosoequipomedico' value='abiensocial@ice.go.cr'/> <br> <input type='text' id='email2morosoequipomedico' value='MGutierrezM@ice.go.cr'/>  <br><input type='text' id='email3morosoequipomedico' value='" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "'/>    <table id='tablaprestamosdeequipomedicomoroso' style='font-size:xx-small' class='display'><thead><tr><th scope='col' abbr='Starter'>Asociado</th><th scope='col' abbr='Starter'>Equipo medico</th><th scope='col' abbr='Starter'>Fecha del préstamo</th><th scope='col' abbr='Starter'>Fecha a devolver</th><th scope='col' abbr='Starter'>Monto actual por mantenimiento</th><th scope='col' abbr='Starter'>Método de pago</th><th scope='col' abbr='Starter'>Monto mantenimiento mensual</th></tr></thead><tbody>");
                $('#columnamorososequipomedico').append(" </tbody></table><textarea cols='20' style='width:500px' rows='20' id='correoscrudosequiposaldonegativo'></textarea>");

                $('#columnaequipomedicoporvencer').append("<input type='button' value= 'Enviar un correo de aviso a prestamos de equipo por vencer' onclick='enviodecorreoindividualequipoporvencer()'/> </hr> <br> Se le enviara copia del correo de aviso a : <br><input type='text' id='email1morosoequipoporvencer' value='abiensocial@ice.go.cr'/>  <br><input type='text' id='email2morosoequipoporvencer' value='MGutierrezM@ice.go.cr'/>  <br><input type='text' id='email3morosoequipoporvencer' value='" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "'/> <table id='tablaprestamosdeequipomedicoporvencer' style='font-size:xx-small' class='display'><thead><tr><th scope='col' abbr='Starter'>Asociado</th><th scope='col' abbr='Starter'>Equipo medico</th><th scope='col' abbr='Starter'>Fecha del préstamo</th><th scope='col' abbr='Starter'>Fecha a devolver</th><th scope='col' abbr='Starter'>Monto actual por mantenimiento</th><th scope='col' abbr='Starter'>Método de pago</th><th scope='col' abbr='Starter'>Monto mantenimiento mensual</th></tr></thead><tbody>");
                $('#columnaequipomedicoporvencer').append(" </tbody></table><textarea cols='20' style='width:500px' rows='20' id='correoscrudosequipoporvencer'></textarea>");

                //    enlaceoutlookmorososequipo += document.getElementById('email1morosoequipomedico').value + ',' + document.getElementById('email2morosoequipomedico').value + ',' + document.getElementById('email3morosoequipomedico').value + '?bcc=';
                //  enlaceoutlookequipoporvencer += document.getElementById('email1morosoequipoporvencer').value + ',' + document.getElementById('email2morosoequipoporvencer').value + ',' + document.getElementById('email3morosoequipoporvencer').value + '?bcc=';

                var cont = 0;

              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById("tablaprestamosdeequipomedico").getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);

                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    // Append a text node to the cell
                    var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + ' correo: ' + data[ele].IDENTIFICACION.EMAIL1);

                    newCell.appendChild(newText);

                    var newCell3 = newRow.insertCell(1);


                    var newText3 = document.createTextNode(data[ele].NUMERO_ACTIVO.NUMERO_ACTIVO + ' ' + data[ele].NUMERO_ACTIVO.DESCRIPCION);
                    newCell3.appendChild(newText3);


                    var newCell4 = newRow.insertCell(2);


                    var newText4 = document.createTextNode(data[ele].FECHA_PRESTAMO);
                    newCell4.appendChild(newText4);

                    var newCell10 = newRow.insertCell(3);


                    var newText10 = document.createTextNode(data[ele].FECHA_DEVOLUCION);
                    newCell10.appendChild(newText10);

                    var newCellr = newRow.insertCell(4);

                    var newText10 = document.createTextNode(data[ele].MONTO);


                    newCellr.appendChild(newText10);


                    var newCellr = newRow.insertCell(5);
                    if (data[ele].METODO_PAGO.ID == 3) {
                        var newText10 = document.createTextNode('Por saldo');
                    } else {
                        var newText10 = document.createTextNode('Por planilla');
                    }

                    newCellr.appendChild(newText10);
                    var newCellr = newRow.insertCell(6);

                    var newText10 = document.createTextNode(data[ele].NUMERO_ACTIVO.MONTO_MENSUAL);


                    newCellr.appendChild(newText10);

                    var listadecorreosaenviarequipomedicomoroso = JSON.parse(localStorage.getItem('listadecorreosaenviarequipomedicomoroso'));

                    if (data[ele].METODO_PAGO.ID == 3 && parseInt(data[ele].MONTO) < 0) {

                        if (validateEmail(data[ele].IDENTIFICACION.EMAIL1)) {
                            correosmorososequipo.push(data[ele].IDENTIFICACION.EMAIL1);
                        }
                        listadecorreosaenviarequipomedicomoroso.push(data[ele]);
                        var tableRef = document.getElementById("tablaprestamosdeequipomedicomoroso").getElementsByTagName('tbody')[0];

                        // Insert a row in the table at the last row
                        var newRow = tableRef.insertRow(tableRef.rows.length);
                        newRow.id = 'filamorosoequipomedico' + data[ele].IDENTIFICACION.IDENTIFICACION;
                        // Insert a cell in the row at index 0
                        var newCell = newRow.insertCell(0);
                        //  enlaceoutlookmorososequipo +=   String(data[ele].IDENTIFICACION.EMAIL1) + ',';

                        // Append a text node to the cell
                        var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + ' correo: ' + data[ele].IDENTIFICACION.EMAIL1);

                        newCell.appendChild(newText);

                        var newCell3 = newRow.insertCell(1);


                        var newText3 = document.createTextNode(data[ele].NUMERO_ACTIVO.NUMERO_ACTIVO + ' ' + data[ele].NUMERO_ACTIVO.DESCRIPCION);
                        newCell3.appendChild(newText3);


                        var newCell4 = newRow.insertCell(2);


                        var newText4 = document.createTextNode(data[ele].FECHA_PRESTAMO);
                        newCell4.appendChild(newText4);

                        var newCell10 = newRow.insertCell(3);


                        var newText10 = document.createTextNode(data[ele].FECHA_DEVOLUCION);
                        newCell10.appendChild(newText10);

                        var newCellr = newRow.insertCell(4);

                        var newText10 = document.createTextNode(data[ele].MONTO);


                        newCellr.appendChild(newText10);


                        var newCellr = newRow.insertCell(5);
                        if (data[ele].METODO_PAGO.ID == 3) {
                            var newText10 = document.createTextNode('Por saldo');
                        } else {
                            var newText10 = document.createTextNode('Por planilla');
                        }

                        newCellr.appendChild(newText10);
                        var newCellr = newRow.insertCell(6);

                        var newText10 = document.createTextNode(data[ele].NUMERO_ACTIVO.MONTO_MENSUAL);


                        newCellr.appendChild(newText10);




                    }
                   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem('listadecorreosaenviarequipomedicomoroso', JSON.stringify(listadecorreosaenviarequipomedicomoroso));


                    var fechafinaliza = new Date(data[ele].FECHA_DEVOLUCION);
                    var fechaactual = new Date();
                    var mesactual, mesvence, annoactual, annovence = 0;
                    mesactual = fechaactual.getMonth();
                    mesvence = fechafinaliza.getMonth();
                    annoactual = fechaactual.getFullYear();
                    annovence = fechafinaliza.getFullYear();
                    var listadecorreosaenviarequipomedicoporvencer = JSON.parse(localStorage.getItem('listadecorreosaenviarequipomedicoporvencer'));

                    if ((mesactual == mesvence && annoactual == annovence) || (annoactual > annovence) || (annoactual == annovence && mesactual > mesvence)) {


                        if (validateEmail(data[ele].IDENTIFICACION.EMAIL1)) {
                            correosequipoporvencer.push(data[ele].IDENTIFICACION.EMAIL1);
                        }
                        listadecorreosaenviarequipomedicoporvencer.push(data[ele]);
                        var tableRef = document.getElementById("tablaprestamosdeequipomedicoporvencer").getElementsByTagName('tbody')[0];
                        // enlaceoutlookequipoporvencer += String(data[ele].IDENTIFICACION.EMAIL1) + ',';
                        // Insert a row in the table at the last row
                        var newRow = tableRef.insertRow(tableRef.rows.length);
                        newRow.id = 'filaporvencerequipomedico' + data[ele].IDENTIFICACION.IDENTIFICACION;
                        // Insert a cell in the row at index 0
                        var newCell = newRow.insertCell(0);

                        // Append a text node to the cell
                        var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + ' correo: ' + data[ele].IDENTIFICACION.EMAIL1);

                        newCell.appendChild(newText);

                        var newCell3 = newRow.insertCell(1);


                        var newText3 = document.createTextNode(data[ele].NUMERO_ACTIVO.NUMERO_ACTIVO + ' ' + data[ele].NUMERO_ACTIVO.DESCRIPCION);
                        newCell3.appendChild(newText3);


                        var newCell4 = newRow.insertCell(2);


                        var newText4 = document.createTextNode(data[ele].FECHA_PRESTAMO);
                        newCell4.appendChild(newText4);

                        var newCell10 = newRow.insertCell(3);


                        var newText10 = document.createTextNode(data[ele].FECHA_DEVOLUCION);
                        newCell10.appendChild(newText10);

                        var newCellr = newRow.insertCell(4);

                        var newText10 = document.createTextNode(data[ele].MONTO);


                        newCellr.appendChild(newText10);


                        var newCellr = newRow.insertCell(5);
                        if (data[ele].METODO_PAGO.ID == 3) {
                            var newText10 = document.createTextNode('Por saldo');
                        } else {
                            var newText10 = document.createTextNode('Por planilla');
                        }

                        newCellr.appendChild(newText10);
                        var newCellr = newRow.insertCell(6);

                        var newText10 = document.createTextNode(data[ele].NUMERO_ACTIVO.MONTO_MENSUAL);


                        newCellr.appendChild(newText10);


                    }
                   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem('listadecorreosaenviarequipomedicoporvencer', JSON.stringify(listadecorreosaenviarequipomedicoporvencer));


                }


                //    enlaceoutlookmorososequipo += '&subject=Aviso de la Asociación de Bienestar Social de los Empleados del Grupo ICE&body=Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para recordale consultar en la oficina sobre su préstamo de equipo medico , por favor contáctenos a los teléfonos: 20006436,20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr rugalde@ice.go.cr, igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave, o recuperar su clave de ingreso en el enlace: http://contable.sistemcr.com/MALogin.html';
                //  enlaceoutlookequipoporvencer += '&subject=Aviso de la Asociación de Bienestar Social de los Empleados del Grupo ICE&body=Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para recordale consultar en la oficina sobre su préstamo de equipo medico , por favor contáctenos a los teléfonos: 20006436,20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr rugalde@ice.go.cr, igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave, o recuperar su clave de ingreso en el enlace: http://contable.sistemcr.com/MALogin.html';
                document.getElementById('espacioparabotonoutlookmorososequipo').innerHTML = '<input type="button" value= "Genera correo con outlook" onclick= "enviodecorreoporoutlookmorososequipo(\'\',\'\', \'\', \'' + document.getElementById('email1morosoequipomedico').value + '\', \'' + document.getElementById('email2morosoequipomedico').value + '\',\'' + document.getElementById('email3morosoequipomedico').value + '\')"/> ';



                document.getElementById('espacioparabotonoutlookequipoporvencer').innerHTML = '<input type="button" value= "Genera correo con outlook" onclick= "enviodecorreoporoutlookequipoporvencer(\'\',\'\', \'\', \'' + document.getElementById('email1morosoequipoporvencer').value + '\', \'' + document.getElementById('email2morosoequipoporvencer').value + '\',\'' + document.getElementById('email3morosoequipoporvencer').value + '\')"/> ';

                document.getElementById('correoscrudosequiposaldonegativo').value = correosmorososequipo;

                document.getElementById('correoscrudosequipoporvencer').value = correosequipoporvencer;
                $('#tablaprestamosdeequipomedico').dataTable({
                    "scrollY": "500px",
                    "scrollCollapse": true,
                    "paging": false,
                    dom: 'Bfrtip',
                    buttons: [
                        'print'
                    ]
                });


                $('#tablaprestamosdeequipomedicomoroso').dataTable({
                    "scrollY": "500px",
                    "scrollCollapse": true,
                    "paging": false,
                    dom: 'Bfrtip',
                    buttons: [
                        'print'
                    ]
                });

                $('#tablaprestamosdeequipomedicoporvencer').dataTable({
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




    // var listadecorreosaenviarmorosopensionado = JSON.parse(localStorage.setItem('listadecorreosaenviarmorosopensionado'));

    $('#tab-content6').append("<table><tr><td id='columnamorososplanilla'><div id='espacioparabotonoutlookmorososplanilla'></div></td><td id= 'columnamorosospensionados'><div id='espacioparabotonoutlookmorosospensionados'></div></td></tr></table>");

    var persona = new Object();
    persona.tipo = '67';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Listado',
        // url: 'http://192.168.30.104//api/Listado',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

           /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem('listadecorreosaenviarmorosopensionado', JSON.stringify(data));

            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {

                $('#columnamorosospensionados').append("<input type='button' value= 'Enviar un correo de aviso al listado de morosos pensionados' onclick='enviodecorreoindividualpensionadosmorosos()'/> <br> Se le enviara copia del correo aviso a : <br><input type='text' id='email1morosopensionado' value='abiensocial@ice.go.cr'/> <br> <input type='text' id='email2morosopensionado' value='MGutierrezM@ice.go.cr'/> <br> <input type='text' id='email3morosopensionado' value='" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "'/> <h3 id = 'titulo'>Listado de pensionados morosos </h3><table id='tablamorosospensionados' class='display' style='font-size:xx-small'><thead><tr><th scope='col' abbr='Starter'>Identificación y nombre</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Información en PDA</th><th scope='col' abbr='Starter'>Informaicon en PDF</th></tr></thead><tbody>");
                $('#columnamorosospensionados').append(" </tbody></table><textarea cols='20' style='width:500px' rows='20' id='correoscrudosmorosospensionados'></textarea>");

              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById('tablamorosospensionados').getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);
                    newRow.id = 'filapenmoroso' + data[ele].IdentificaciOn
                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    var newText = document.createTextNode(data[ele].IdentificaciOn + ' ' + data[ele].Nombre + ' ' + data[ele]['Primerapellido'] + ' ' + data[ele]['Segundoapellido'])

                    newCell.appendChild(newText);
                    var newCell = newRow.insertCell(1);

                    var newText = document.createTextNode(data[ele].Correo)
                    if (validateEmail(data[ele].Correo)) {
                        correosmorosospensionados.push(data[ele].Correo);
                    }
                    newCell.appendChild(newText);




                    var newCell = newRow.insertCell(2);
                    if (data[ele]["Mutualidad"] != '-1') {
                        var newText = document.createTextNode('Saldo en el programa defunción asociado directo: ' + data[ele]["Mutualidad"]);
                    } else {
                        var newText = document.createTextNode('No asociado en el programa defunción asociado directo');
                    }

                    newCell.appendChild(newText);
                    var newCell = newRow.insertCell(3);
                    if (data[ele]["Solidaridad"] != '-1') {
                        var newText = document.createTextNode('Saldo en el programa defunción de familiar del asociado: ' + data[ele]["Solidaridad"]);
                    } else {
                        var newText = document.createTextNode('No asociado en el programa defunción de familiar del asociado');
                    }
                    newCell.appendChild(newText);



                }


                document.getElementById('espacioparabotonoutlookmorosospensionados').innerHTML = '<input type="button" value= "Genera correo con outlook" onclick= "enviodecorreoporoutlookmorosospensionados(\'\',\'\', \'\', \'' + document.getElementById('email1morosopensionado').value + '\', \'' + document.getElementById('email2morosopensionado').value + '\',\'' + document.getElementById('email3morosopensionado').value + '\')"/> ';
                document.getElementById('correoscrudosmorosospensionados').value = correosmorosospensionados;
                $('#tablamorosospensionados').dataTable({
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




    var persona = new Object();
    persona.tipo = '68';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Listado',
        // url: 'http://192.168.30.104//api/Listado',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
           /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem('listadecorreosaenviarmorosoplanilla', JSON.stringify(data));
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {

                $('#columnamorososplanilla').append("<input type='button' value= 'Enviar un correo de aviso al listado morosos por planillas' onclick='enviodecorreoindividualplanillasmorosos()'/> <br> Se le enviara un copia del correo de aviso a : <input type='text' id='email1morosoplanilla' value='abiensocial@ice.go.cr'/> <br> <input type='text' id='email2morosoplanilla' value='MGutierrezM@ice.go.cr'/> <br> <input type='text' id='email3morosoplanilla' value='" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "'/>  <h3 id = 'titulo'>Listado de  morosos por planillas </h3><table id='tablamorososplanillas' class='display' style='font-size:xx-small'><thead><tr><th scope='col' abbr='Starter'>Identificación y nombre</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Informacion en PDA</th><th scope='col' abbr='Starter'>Informacion en PDF</th></tr></thead><tbody>");
                $('#columnamorososplanilla').append(" </tbody></table><textarea cols='20' style='width:500px' rows='20' id='correoscrudosmorososplanilla'></textarea>");
                // enlaceoutlookemorososporplanilla += document.getElementById('email1morosoplanilla').value + ',' + document.getElementById('email2morosoplanilla').value + ',' + document.getElementById('email3morosoplanilla').value + '?bcc=';
                var cantidad = 0;


              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    cantidad += 1;
                    var tableRef = document.getElementById('tablamorososplanillas').getElementsByTagName('tbody')[0];

                    //    enlaceoutlookemorososporplanilla += String(data[ele].Correo) + ',';

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);
                    newRow.id = 'filaplamoroso' + data[ele].IdentificaciOn
                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    var newText = document.createTextNode(data[ele].IdentificaciOn + ' ' + data[ele].Nombre + ' ' + data[ele]['Primerapellido'] + ' ' + data[ele]['Segundoapellido'])

                    newCell.appendChild(newText);
                    var newCell = newRow.insertCell(1);

                    var newText = document.createTextNode(data[ele].Correo)
                    if (validateEmail(data[ele].Correo)) {
                        correosmorososplanilla.push(data[ele].Correo);
                    }
                    newCell.appendChild(newText);




                    var newCell = newRow.insertCell(2);
                    if (data[ele]["Mutualidad"] != '-1') {
                        var newText = document.createTextNode('Saldo en el programa defunción asociado directo: ' + data[ele]["Mutualidad"]);
                    } else {
                        var newText = document.createTextNode('No asociado en el programa defunción asociado directo');
                    }

                    newCell.appendChild(newText);
                    var newCell = newRow.insertCell(3);
                    if (data[ele]["Solidaridad"] != '-1') {
                        var newText = document.createTextNode('Saldo en el programa defunción de familiar del asociado: ' + data[ele]["Solidaridad"]);
                    } else {
                        var newText = document.createTextNode('No asociado en el programa defunción de familiar del asociado');
                    }
                    newCell.appendChild(newText);



                }

                //  var cantidaddedatos = enlaceoutlookemorososporplanilla.split(',');
                //if (cantidaddedatos > 20) {

                //                    navigator.clipboard.writeText(enlaceoutlookemorososporplanilla);
                //              }
                //            enlaceoutlookemorososporplanilla += '&subject=Aviso de la Asociación de Bienestar Social de los Empleados del Grupo ICE&body=Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para hacerle saber que tiene saldos morosos.  Para evitar ser excluido del programa o programas, agradecemos realizar su consulta a los teléfonos: 20006436/20001894/20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr mmunozg@ice.go.cr.  Igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave y verificar su saldo moroso para ponerse al día.  En caso de requerir recuperar su clave de ingreso al enlace, lo puede hacer ingresando a: http://contable.sistemcr.com/MALogin.html.  Agradecemos mantenerse al día y así se evitará cualquier inconveniente.';
                document.getElementById('espacioparabotonoutlookmorososplanilla').innerHTML = '<input type="button" value= "Genera correo con outlook" onclick= "enviodecorreoporoutlookmorososplanilla(\'\',\'\', \'\', \'' + document.getElementById('email1morosoplanilla').value + '\', \'' + document.getElementById('email2morosoplanilla').value + '\',\'' + document.getElementById('email3morosoplanilla').value + '\')"/> ';
                document.getElementById('correoscrudosmorososplanilla').value = correosmorososplanilla;

                $('#tablamorososplanillas').dataTable({
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

function aplicadeduccionesmantenimiento() {



    //SE COMUNICA CON EL CONTROLADOR DE PRESTAMO DE EQUIPO MEDICO PARA APLICAR LA DEDUCCION DE LOS MONTOS POR MANTENIMIENTO, ESTO MEDIANTE EL 
    //METODO RESPECTIVO DE LA CLASE
    var z = confirm("Desea aplicar las deducciones al monto de mantenimiento de préstamo de equipo medico?");
    if (z == true) {




        var persona = new Object();
        persona.criterio = 'deduccionmantenimientomensual';

        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'dedmanuales',
            type: 'POST',
            dataType: 'json',
            data: persona,
            /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {

                alert('Se ha aplicado la deducción al saldo por mantenimiento de préstamo de equipo medico, por favor revise los saldos de los prestamos para corroborar que todo ha salido correctamente');
                location.href = 'dedmanuales.html';

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });
    }
}


function revalorarmut(uno, dos) {
    //if (uno) {
    //    document.getElementById("montomut").innerHTML = parseInt(document.getElementById("montomut").innerHTML) + parseInt(dos);

    //}
    //else {
    //    document.getElementById("montomut").innerHTML = parseInt(document.getElementById("montomut").innerHTML) - parseInt(dos);
    //}
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
                persona.cantidad = data.TOPE_SOL * 2;
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
                        if (data == 1) {
                            alert("Deducciones en FDFA del mes " + document.getElementById("mesesdisponibles").value + " aplicadas correctamente");
                            location.href = "dedmanuales.html";


                        }
                        if (data == 99) {
                            alert("Ocurrió un error aplicando las deducciones, corrobore si el periodo que está tratando de aplicar no se ha registrado ya")
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

    // regdefsol();

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
                alert("Error en la contraseña");
            } else {

                topemut = data.TOPE_MUT + 1;
                topesol = data.TOPE_SOL + 1;
                montosolp = data.CUOTA_DEF_SOL;
                montomutp = data.CUOTA_DEF_MUT;
                var persona = new Object();
                persona.criterio = 'insertarmanual';
                persona.fondo = 'MUTUALIDAD';
                // persona.cantidad = parseInt(document.getElementById("montomut").innerHTML) / montomutp;
                persona.cantidad = data.TOPE_MUT * 2;
                // persona.monto = document.getElementById("montomut").innerHTML; Cambio segun correo de Rafael Ugalde del 13 de febrero del 2019
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

                        if (data == 1) {
                            alert("Deducciones en FDA del mes " + document.getElementById("mesesdisponiblesmut").value + " aplicadas correctamente");
                            location.href = "dedmanuales.html";

                        }

                        if (data == 99) {
                            alert("Ocurrió un error aplicando las deducciones, corrobore si el periodo que está tratando de aplicar no se ha registrado ya")
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
    // regdefmut();


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

function aplicaraso() {

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
                alert("Error en la contraseña");
            } else {

                var cuotaaso = data.CUOTA_ASOBISO;
                var persona = new Object();
                persona.criterio = 'insertarmanual';
                persona.fondo = 'ASOBISO';
                // persona.cantidad = parseInt(document.getElementById("montomut").innerHTML) / montomutp;
                persona.cantidad = 2;
                // persona.monto = document.getElementById("montomut").innerHTML; Cambio segun correo de Rafael Ugalde del 13 de febrero del 2019
                persona.monto = document.getElementById("montoaso").innerHTML;
                persona.responsable = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO;
                persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.quincena = document.getElementById("quincenasdisponiblesaso").value;

                persona.mes = document.getElementById("mesesdisponiblesaso").value;

                persona.anno = document.getElementById("annosdisponiblesaso").value;
                //        //ajax de los ayudas prestadas
                persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
                    url: urllocal + 'dedmanuales',
                    type: 'POST',
                    dataType: 'json',
                    data: persona,
                    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
                        if (data == 1) {
                            alert("Deducciones en Asociacion del mes " + document.getElementById("mesesdisponiblesaso").value + " aplicadas correctamente");
                            location.href = "dedmanuales.html";

                        }
                        if (data == 99) {
                            alert("Ocurrió un error aplicando las deducciones, corrobore si el periodo que está tratando de aplicar no se ha registrado ya")
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
    // regdefmut();


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


function enviodecorreoindividualpensionadosmorosos() {

    var z = confirm("Desea enviar el correo de aviso a la lista de pensionados morosos?");
    if (z == true) {




        var lista = JSON.parse(localStorage.getItem('listadecorreosaenviarmorosopensionado'));
        var correos = '';
        if (document.getElementById('email1morosopensionado').value != '') {
            correos += document.getElementById('email1morosopensionado').value + ';'
        }
        if (document.getElementById('email2morosopensionado').value != '') {
            correos += document.getElementById('email2morosopensionado').value + ';'
        }
        if (document.getElementById('email3morosopensionado').value != '') {
            correos += document.getElementById('email3morosopensionado').value + ';'
        }
        for (var ele in lista) {


            if (lista[ele].Correo != '') {

                correos += lista[ele].Correo + ';';
                //var msg = 'Este es un mensaje dirigido a: ' + lista[ele].IdentificaciOn + ' ' + lista[ele].Nombre + ' ' + lista[ele]['Primerapellido'] + ' ' + lista[ele]['Segundoapellido'];
                //msg = msg + ' a continuación el detalle de su saldo en los programas de la Asociación de Bienestar Social de los Empleados del Grupo ICE: '

                //if (lista[ele]["Mutualidad"] != '-1') {
                //    msg = msg + ' Saldo en el programa defunción asociado directo: ' + lista[ele]["Mutualidad"];
                //}
                //else {
                //    msg = msg + ' No asociado en el programa defunción asociado directo';
                //}


                //if (lista[ele]["Solidaridad"] != '-1') {
                //    msg = msg + ', Saldo en el programa defunción de familiar del asociado: ' + lista[ele]["Solidaridad"];
                //}

                //else {
                //    msg = msg + ', No asociado en el programa defunción de familiar del asociado';
                //}


                //msg = msg + ' para cualquier consulta favor comunicarse con la oficina, a los correos: ' + document.getElementById('email1morosopensionado').value + ' ' + document.getElementById('email2morosopensionado').value + ' ' + document.getElementById('email3morosopensionado').value + ' o a los teléfonos: 20006436,20007393';




            }




        }
        var persona = new Object();
        // persona.criterio = 'deducir';

        persona.de = 'avisosapensionadossaldo@asobiso.com';
        persona.clave = 'contraasobiso@123'
        persona.para = correos;
        persona.asunto = 'Aviso de la Asociación de Bienestar Social de los Empleados del Grupo ICE';
        persona.HTML = 'Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para hacerle saber que tiene saldos morosos.  Para evitar ser excluido del programa o programas, agradecemos realizar su consulta a los teléfonos: 20006436/20001894/20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr mmunozg@ice.go.cr.  Igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave y verificar su saldo moroso para ponerse al día.  En caso de requerir recuperar su clave de ingreso al enlace, lo puede hacer ingresando a: http://contable.sistemcr.com/MALogin.html.  Agradecemos mantenerse al día y así se evitará cualquier inconveniente.' //   persona.identificacion = lista[ele].IdentificaciOn;
        //        //ajax de los ayudas prestadas
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'CorreoIndividual',
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

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });



        //     alert('Se ha enviado la totalidad de la lista para envió de correo, por favor revise si queda algun registro en la lista que tuvo algún error a la hora de enviar el mismo, si es el caso puede intentar volver a enviar co el mismo botón');

    }
}




function enviodecorreoindividualplanillasmorosos() {

    var z = confirm("Desea enviar el correo de aviso a la lista de asociados por planilla morosos?");
    if (z == true) {




        var lista = JSON.parse(localStorage.getItem('listadecorreosaenviarmorosoplanilla'));
        var correos = '';
        if (document.getElementById('email1morosoplanilla').value != '') {
            correos += document.getElementById('email1morosoplanilla').value + ';'
        }
        if (document.getElementById('email2morosoplanilla').value != '') {
            correos += document.getElementById('email2morosoplanilla').value + ';'
        }
        if (document.getElementById('email3morosoplanilla').value != '') {
            correos += document.getElementById('email3morosoplanilla').value + ';'
        }
        for (var ele in lista) {


            if (lista[ele].Correo != '') {

                correos += lista[ele].Correo + ';';
                //var msg = 'Este es un mensaje dirigido a: ' + lista[ele].IdentificaciOn + ' ' + lista[ele].Nombre + ' ' + lista[ele]['Primerapellido'] + ' ' + lista[ele]['Segundoapellido'];
                //msg = msg + ' a continuación el detalle de su saldo en los programas de la Asociación de Bienestar Social de los Empleados del Grupo ICE: '

                //if (lista[ele]["Mutualidad"] != '-1') {
                //    msg = msg + ' Saldo en el programa defunción asociado directo: ' + lista[ele]["Mutualidad"];
                //}
                //else {
                //    msg = msg + ' No asociado en el programa defunción asociado directo';
                //}


                //if (lista[ele]["Solidaridad"] != '-1') {
                //    msg = msg + ', Saldo en el programa defunción de familiar del asociado: ' + lista[ele]["Solidaridad"];
                //}

                //else {
                //    msg = msg + ', No asociado en el programa defunción de familiar del asociado';
                //}


                //msg = msg + ' para cualquier consulta favor comunicarse con la oficina, a los correos: ' + document.getElementById('email1morosopensionado').value + ' ' + document.getElementById('email2morosopensionado').value + ' ' + document.getElementById('email3morosopensionado').value + ' o a los teléfonos: 20006436,20007393';




            }




        }
        var persona = new Object();
        // persona.criterio = 'deducir';

        persona.de = 'avisosaplanillasaldo@asobiso.com';
        persona.clave = 'contraasobiso@123'
        persona.para = correos;
        persona.asunto = 'Aviso de la Asociación de Bienestar Social de los Empleados del Grupo ICE';
        persona.HTML = 'Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para hacerle saber que tiene saldos morosos.  Para evitar ser excluido del programa o programas, agradecemos realizar su consulta a los teléfonos: 20006436/20001894/20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr mmunozg@ice.go.cr.  Igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave y verificar su saldo moroso para ponerse al día.  En caso de requerir recuperar su clave de ingreso al enlace, lo puede hacer ingresando a: http://contable.sistemcr.com/MALogin.html.  Agradecemos mantenerse al día y así se evitará cualquier inconveniente.'
        //   persona.identificacion = lista[ele].IdentificaciOn;
        //        //ajax de los ayudas prestadas
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'CorreoIndividual',
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

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });



        //     alert('Se ha enviado la totalidad de la lista para envió de correo, por favor revise si queda algun registro en la lista que tuvo algún error a la hora de enviar el mismo, si es el caso puede intentar volver a enviar co el mismo botón');

    }
}



function enviodecorreoindividualequipoporvencer() {

    var z = confirm("Desea enviar el correo de aviso a la lista de asociados con prestamos de equipo por vencer?");
    if (z == true) {




        var lista = JSON.parse(localStorage.getItem('listadecorreosaenviarequipomedicoporvencer'));
        var correos = '';
        if (document.getElementById('email1morosoequipoporvencer').value != '') {
            correos += document.getElementById('email1morosoequipoporvencer').value + ';'
        }
        if (document.getElementById('email2morosoequipoporvencer').value != '') {
            correos += document.getElementById('email2morosoequipoporvencer').value + ';'
        }
        if (document.getElementById('email2morosoequipoporvencer').value != '') {
            correos += document.getElementById('email2morosoequipoporvencer').value + ';'
        }
        for (var ele in lista) {


            if (lista[ele].Correo != '') {

                correos += lista[ele].IDENTIFICACION.EMAIL1 + ';';
                //var msg = 'Este es un mensaje dirigido a: ' + lista[ele].IdentificaciOn + ' ' + lista[ele].Nombre + ' ' + lista[ele]['Primerapellido'] + ' ' + lista[ele]['Segundoapellido'];
                //msg = msg + ' a continuación el detalle de su saldo en los programas de la Asociación de Bienestar Social de los Empleados del Grupo ICE: '

                //if (lista[ele]["Mutualidad"] != '-1') {
                //    msg = msg + ' Saldo en el programa defunción asociado directo: ' + lista[ele]["Mutualidad"];
                //}
                //else {
                //    msg = msg + ' No asociado en el programa defunción asociado directo';
                //}


                //if (lista[ele]["Solidaridad"] != '-1') {
                //    msg = msg + ', Saldo en el programa defunción de familiar del asociado: ' + lista[ele]["Solidaridad"];
                //}

                //else {
                //    msg = msg + ', No asociado en el programa defunción de familiar del asociado';
                //}


                //msg = msg + ' para cualquier consulta favor comunicarse con la oficina, a los correos: ' + document.getElementById('email1morosopensionado').value + ' ' + document.getElementById('email2morosopensionado').value + ' ' + document.getElementById('email3morosopensionado').value + ' o a los teléfonos: 20006436,20007393';




            }




        }
        var persona = new Object();
        // persona.criterio = 'deducir';

        persona.de = 'avisoprestamoequipovence@asobiso.com';
        persona.clave = 'contraasobiso@123'
        persona.para = correos;
        persona.asunto = 'Aviso de la Asociación de Bienestar Social de los Empleados del Grupo ICE';
        persona.HTML = 'Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para recordale consultar en la oficina sobre su préstamo de equipo medico , por favor contáctenos a los teléfonos: 20006436,20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr rugalde@ice.go.cr, igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave, o recuperar su clave de ingreso en el enlace: http://contable.sistemcr.com/MALogin.html  ';
        //   persona.identificacion = lista[ele].IdentificaciOn;
        //        //ajax de los ayudas prestadas
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'CorreoIndividual',
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

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });



        //     alert('Se ha enviado la totalidad de la lista para envió de correo, por favor revise si queda algun registro en la lista que tuvo algún error a la hora de enviar el mismo, si es el caso puede intentar volver a enviar co el mismo botón');

    }
}




function enviodecorreoindividualequipomoroso() {

    var z = confirm("Desea enviar el correo de aviso a la lista de asociados con prestamos de equipo con saldo moroso?");
    if (z == true) {




        var lista = JSON.parse(localStorage.getItem('listadecorreosaenviarequipomedicomoroso'));
        var correos = '';
        if (document.getElementById('email1morosoequipomedico').value != '') {
            correos += document.getElementById('email1morosoequipomedico').value + ';'
        }
        if (document.getElementById('email2morosoequipomedico').value != '') {
            correos += document.getElementById('email2morosoequipomedico').value + ';'
        }
        if (document.getElementById('email3morosoequipomedico').value != '') {
            correos += document.getElementById('email3morosoequipomedico').value + ';'
        }
        for (var ele in lista) {


            if (lista[ele].Correo != '') {

                correos += lista[ele].IDENTIFICACION.EMAIL1 + ';';
                //var msg = 'Este es un mensaje dirigido a: ' + lista[ele].IdentificaciOn + ' ' + lista[ele].Nombre + ' ' + lista[ele]['Primerapellido'] + ' ' + lista[ele]['Segundoapellido'];
                //msg = msg + ' a continuación el detalle de su saldo en los programas de la Asociación de Bienestar Social de los Empleados del Grupo ICE: '

                //if (lista[ele]["Mutualidad"] != '-1') {
                //    msg = msg + ' Saldo en el programa defunción asociado directo: ' + lista[ele]["Mutualidad"];
                //}
                //else {
                //    msg = msg + ' No asociado en el programa defunción asociado directo';
                //}


                //if (lista[ele]["Solidaridad"] != '-1') {
                //    msg = msg + ', Saldo en el programa defunción de familiar del asociado: ' + lista[ele]["Solidaridad"];
                //}

                //else {
                //    msg = msg + ', No asociado en el programa defunción de familiar del asociado';
                //}


                //msg = msg + ' para cualquier consulta favor comunicarse con la oficina, a los correos: ' + document.getElementById('email1morosopensionado').value + ' ' + document.getElementById('email2morosopensionado').value + ' ' + document.getElementById('email3morosopensionado').value + ' o a los teléfonos: 20006436,20007393';




            }




        }
        var persona = new Object();
        // persona.criterio = 'deducir';

        persona.de = 'avisoequipomedicosaldo@asobiso.com';
        persona.clave = 'contraasobiso@123'
        persona.para = correos;
        persona.asunto = 'Aviso de la Asociación de Bienestar Social de los Empleados del Grupo ICE';
        persona.HTML = 'Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para recordale consultar en la oficina sobre su préstamo de equipo medico , por favor contáctenos a los teléfonos: 20006436,20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr rugalde@ice.go.cr, igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave, o recuperar su clave de ingreso en el enlace: http://contable.sistemcr.com/MALogin.html  ';
        //   persona.identificacion = lista[ele].IdentificaciOn;
        //        //ajax de los ayudas prestadas
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
            url: urllocal + 'CorreoIndividual',
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

            },
            /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {

            }
        });



        //     alert('Se ha enviado la totalidad de la lista para envió de correo, por favor revise si queda algun registro en la lista que tuvo algún error a la hora de enviar el mismo, si es el caso puede intentar volver a enviar co el mismo botón');

    }
}

function validateEmail(email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


function enviodecorreoporoutlookmorosospensionados(msg, titulo, div, correo1, correo2, correo3) {


    if (correosmorosospensionados.length > 20) {

        var correosformatomemoria = '';
        for (var ele in correosmorosospensionados) {
            if (validateEmail(correosmorosospensionados[ele])) {
                correosformatomemoria += correosmorosospensionados[ele] + ',';
            }
        }
        try {
            navigator.clipboard.writeText(correosformatomemoria);
        } catch (error) {
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
        }
        alert('Se abrira una nueva pantalla de outlook, pegue en el bcc, los correos que copie del texto debajo de la lista');
        location.href = 'mailto:' + correo1 + ',' + correo2 + ',' + correo3 + '&bcc=' + correo3 + '&subject=Aviso de la Asociación de Bienestar Social de los Empleados del Grupo ICE&body=Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para hacerle saber que tiene saldos morosos.  Para evitar ser excluido del programa o programas, agradecemos realizar su consulta a los teléfonos: 20006436/20001894/20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr mmunozg@ice.go.cr.  Igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave y verificar su saldo moroso para ponerse al día.  En caso de requerir recuperar su clave de ingreso al enlace, lo puede hacer ingresando a: http://contable.sistemcr.com/MALogin.html.  Agradecemos mantenerse al día y así se evitará cualquier inconveniente.';




    } else {
        var enlace = '';
        for (var ele in correosmorosospensionados) {
            if (validateEmail(correosmorosospensionados[ele])) {
                enlace += correosmorosospensionados[ele] + ',';
            }
        }

        location.href = 'mailto:' + correo1 + ',' + correo2 + ',' + correo3 + '&bcc=' + enlace + '&subject=Aviso de la Asociación de Bienestar Social de los Empleados del Grupo ICE&body=Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para hacerle saber que tiene saldos morosos.  Para evitar ser excluido del programa o programas, agradecemos realizar su consulta a los teléfonos: 20006436/20001894/20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr mmunozg@ice.go.cr.  Igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave y verificar su saldo moroso para ponerse al día.  En caso de requerir recuperar su clave de ingreso al enlace, lo puede hacer ingresando a: http://contable.sistemcr.com/MALogin.html.  Agradecemos mantenerse al día y así se evitará cualquier inconveniente.';

    }


}



function enviodecorreoporoutlookmorososplanilla(msg, titulo, div, correo1, correo2, correo3) {


    if (correosmorosospensionados.length > 20) {

        var correosformatomemoria = '';
        for (var ele in correosmorososplanilla) {
            if (validateEmail(correosmorososplanilla[ele])) {
                correosformatomemoria += correosmorososplanilla[ele] + ',';
            }
        }
        try {
            navigator.clipboard.writeText(correosformatomemoria);
        } catch (error) {
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
        }
        alert('Se abrira una nueva pantalla de outlook, pegue en el bcc, los correos que copie del texto debajo de la lista');
        location.href = 'mailto:' + correo1 + ',' + correo2 + ',' + correo3 + '&bcc=' + correo3 + '&subject=Aviso de la Asociación de Bienestar Social de los Empleados del Grupo ICE&body=Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para hacerle saber que tiene saldos morosos.  Para evitar ser excluido del programa o programas, agradecemos realizar su consulta a los teléfonos: 20006436/20001894/20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr mmunozg@ice.go.cr.  Igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave y verificar su saldo moroso para ponerse al día.  En caso de requerir recuperar su clave de ingreso al enlace, lo puede hacer ingresando a: http://contable.sistemcr.com/MALogin.html.  Agradecemos mantenerse al día y así se evitará cualquier inconveniente.';




    } else {
        var enlace = '';
        for (var ele in correosmorososplanilla) {
            if (validateEmail(correosmorososplanilla[ele])) {
                enlace += correosmorososplanilla[ele] + ',';
            }
        }

        location.href = 'mailto:' + correo1 + ',' + correo2 + ',' + correo3 + '&bcc=' + enlace + '&subject=Aviso de la Asociación de Bienestar Social de los Empleados del Grupo ICE&body=Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para hacerle saber que tiene saldos morosos.  Para evitar ser excluido del programa o programas, agradecemos realizar su consulta a los teléfonos: 20006436/20001894/20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr mmunozg@ice.go.cr.  Igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave y verificar su saldo moroso para ponerse al día.  En caso de requerir recuperar su clave de ingreso al enlace, lo puede hacer ingresando a: http://contable.sistemcr.com/MALogin.html.  Agradecemos mantenerse al día y así se evitará cualquier inconveniente.';

    }


}

function enviodecorreoporoutlookmorososequipo(msg, titulo, div, correo1, correo2, correo3) {


    if (correosmorososequipo.length > 20) {

        var correosformatomemoria = '';
        for (var ele in correosmorososequipo) {
            if (validateEmail(correosmorososequipo[ele])) {
                correosformatomemoria += correosmorososequipo[ele] + ',';
            }
        }
        try {
            navigator.clipboard.writeText(correosformatomemoria);
        } catch (error) {
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
        }
        alert('Se abrira una nueva pantalla de outlook, pegue en el bcc, los correos que copie del texto debajo de la lista');
        location.href = 'mailto:' + correo1 + ',' + correo2 + ',' + correo3 + '&bcc=' + correo3 + '&subject=Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para recordale consultar en la oficina sobre su préstamo de equipo medico , por favor contáctenos a los teléfonos: 20006436,20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr rugalde@ice.go.cr, igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave, o recuperar su clave de ingreso en el enlace: http://contable.sistemcr.com/MALogin.html';




    } else {
        var enlace = '';
        for (var ele in correosmorososequipo) {
            if (validateEmail(correosmorososequipo[ele])) {
                enlace += correosmorososequipo[ele] + ',';
            }
        }

        location.href = 'mailto:' + correo1 + ',' + correo2 + ',' + correo3 + '&bcc=' + enlace + '&subject=Aviso de la Asociación de Bienestar Social de los Empleados del Grupo ICE&body=Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para recordale consultar en la oficina sobre su préstamo de equipo medico , por favor contáctenos a los teléfonos: 20006436,20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr rugalde@ice.go.cr, igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave, o recuperar su clave de ingreso en el enlace: http://contable.sistemcr.com/MALogin.html';

    }


}

function enviodecorreoporoutlookequipoporvencer(msg, titulo, div, correo1, correo2, correo3) {


    if (correosequipoporvencer.length > 20) {

        var correosformatomemoria = '';
        for (var ele in correosequipoporvencer) {
            if (validateEmail(correosequipoporvencer[ele])) {
                correosformatomemoria += correosequipoporvencer[ele] + ',';
            }
        }
        try {
            navigator.clipboard.writeText(correosformatomemoria);
        } catch (error) {
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
        }
        // navigator.clipboard.writeText(correosformatomemoria);
        alert('Se abrira una nueva pantalla de outlook, pegue en el bcc, los correos que copie del texto debajo de la lista');
        location.href = 'mailto:' + correo1 + ',' + correo2 + ',' + correo3 + '&bcc=' + correo3 + '&subject=Aviso de la Asociación de Bienestar Social de los Empleados del Grupo ICE&body=Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para recordale consultar en la oficina sobre su préstamo de equipo medico , por favor contáctenos a los teléfonos: 20006436,20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr rugalde@ice.go.cr, igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave, o recuperar su clave de ingreso en el enlace: http://contable.sistemcr.com/MALogin.html';




    } else {
        var enlace = '';
        for (var ele in correosequipoporvencer) {
            if (validateEmail(correosequipoporvencer[ele])) {
                enlace += correosequipoporvencer[ele] + ',';
            }
        }

        location.href = 'mailto:' + correo1 + ',' + correo2 + ',' + correo3 + '&bcc=' + enlace + '&subject=Aviso de la Asociación de Bienestar Social de los Empleados del Grupo ICE&body=Este es un mensaje de la Asociación de Bienestar Social de los Empleados del Grupo ICE, para recordale consultar en la oficina sobre su préstamo de equipo medico , por favor contáctenos a los teléfonos: 20006436,20007393 o a los correos: abiensocial@ice.go.cr MGutierrezM@ice.go.cr rugalde@ice.go.cr, igualmente puede ingresar al sistema de asociados mediante su correo electrónico y clave, o recuperar su clave de ingreso en el enlace: http://contable.sistemcr.com/MALogin.html';

    }


}