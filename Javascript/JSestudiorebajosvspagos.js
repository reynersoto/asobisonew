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



function exportaaexcel() {



    $("#tablahistorial").table2excel({
        exclude: ".excludeThisClass",
        name: "Worksheet Name",
        filename: "SomeFile.xls", // do include extension
        preserveColors: false // set to true if you want background colors and font colors preserved
    });
}

function cargahtml() {


    var persona = new Object();
    persona.id = getUrlVars()["id"];
    persona.fondo = getUrlVars()["fondo"];
    persona.tipo = '1';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    $('#infopersonal').append("<h1>Estudio de rebajos contra pagos en " + getUrlVars()["fondo"] + " del afiliado: " + JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO + "</h1> <h2>Datos actualizados desde 2018</h2> <button id='exporttable' class='btn btn - primary' onclick='exportaaexcel()'>Exportar a excel</button> <table id='tablahistorial' class='table table-bordered'><thead><tr><th scope='col' >Tipo</th><th scope='col'>Monto</th><th scope='col' >Identificador</th><th scope='col' >Mes</th><th scope='col' >Año</th><th scope='col' >Saldo</th></tr></thead><tbody></tbody></table>");
    var essoloplanillacentral = true;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'estudiorebajosvspagos',
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
                    var newText = document.createTextNode(data[ele].tipo);

                    newCell.appendChild(newText);
                    //var personabeneficiario = new Object();
                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                    var newCell2 = newRow.insertCell(1);


                    var newText2 = document.createTextNode(data[ele].monto);
                    newCell2.appendChild(newText2);

                    var newCell3 = newRow.insertCell(2);


                    var newText3 = document.createTextNode(data[ele].idpago);
                    newCell3.appendChild(newText3);


                    var newCell4 = newRow.insertCell(3);


                    var newText4 = document.createTextNode(data[ele].mes);
                    newCell4.appendChild(newText4);


                    var newCell5 = newRow.insertCell(4);

                    var newText4 = document.createTextNode(data[ele].anno);
                    newCell5.appendChild(newText4);



                    var newCell7 = newRow.insertCell(5);

                    var newText7 = document.createTextNode(data[ele].saldo);
                    newCell7.appendChild(newText7);




                }


            }
            //$('#tablahistorial').dataTable({
            //    "scrollY": "400px",

            //    "scrollCollapse": true,
            //    "paging": false,
            //    dom: 'Bfrtip',
            //    buttons: [
            //        'print',
            //        'copyHtml5',
            //        'excelHtml5',
            //        'csvHtml5',
            //        'pdfHtml5'
            //    ]
            //});

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });



}