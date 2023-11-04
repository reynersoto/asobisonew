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

}
else {
    // alert(JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO);
}



function listadecentrosfuncionales() {

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


                $('#infopersonal').append("<paper-button raised onclick='nuevocfhtml()'>Nuevo Centro funcional</paper-button> <table id='tabla' ><thead><tr><th scope='col' abbr='Starter'>Identificacion del Centro funcional</th><th scope='col' abbr='Starter'>Nombre del Centro funcional</th><th scope='col' abbr='Starter'>Modificar</th></tr></thead><tbody>");
                $('#infopersonal').append(" </tbody></table>");

              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);

                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    // Append a text node to the cell
                    var newText = document.createTextNode(data[ele].NUMERO)

                    newCell.appendChild(newText);
                    //var personabeneficiario = new Object();
                    //personabeneficiario.identificacion = data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION;
                    var newCell2 = newRow.insertCell(1);


                    var newText2 = document.createTextNode(data[ele].DESCRIPCION);
                    newCell2.appendChild(newText2);



                    var newCellm = newRow.insertCell(2);
                    var btnmodifica = document.createElement("paper-button");
                    //btnmodifica.type = "button";
                    btnmodifica.setAttribute("raised", "");
                    btnmodifica.setAttribute("onclick", "modificaCF('" + data[ele].NUMERO + "','" + data[ele].DESCRIPCION + "');");
                    btnmodifica.id = 'botonm' + data[ele].NUMERO;
                    btnmodifica.text = "Modificar";
                    //newCell0.innerHTML= "<input type='button' id= boton" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + " value='modificar' onclick='modificabeneficiario(" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ") />'";
                    newCellm.appendChild(btnmodifica);






                }

                $('#tabla').dataTable({
                    "scrollY": "500px",
                    "scrollCollapse": true,
                    "paging": false
                });
            }

        }
        ,
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }

    });




}

function nuevocfhtml() {


    document.getElementById('infopersonal').innerHTML = "";


    $('#infopersonal').append("<input  class='form-control' placeholder='Numero del centro funcional' id='numcf' type=\"text\"/ maxlength='5'><input  class='form-control' placeholder='Descripcion del centro funcional' id='desccf'/><paper-button raised onclick='guardarnuevocf()'>Guardar nuevo centro funcional</paper-button><paper-button raised onclick='volver()'>Salir</paper-button> ");



}
function volver() {

    document.getElementById('infopersonal').innerHTML = "";

    listadecentrosfuncionales();


}
function modificaCF(uno, dos) {


    document.getElementById('infopersonal').innerHTML = "";


    $('#infopersonal').append("<input  class='form-control' placeholder='Numero del centro funcional' id='numcf' type=\"number\" value = " + uno + " disabled/><input  class='form-control' placeholder='Descripcion del centro funcional' id='desccf' value = '" + dos + "'/><paper-button raised onclick='modificarcfenbd()'>Modificar centro funcional</paper-button><paper-button raised onclick='volver()'>Salir</paper-button> ");




}

function guardarnuevocf() {

    var persona = new Object();
    persona.criterio = 'insertar';
    persona.numero = document.getElementById('numcf').value;
    persona.desc = document.getElementById('desccf').value;
    //   alert(persona.numero);
    //    alert(persona.desc);
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'centrofuncional',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data != 1) {
                alert("Ocurrio un error, parece que el centro funcional que esta intentando ingresar ya existe");
            } else {

                alert('Nuevo centro funcional guardado')

                document.getElementById('infopersonal').innerHTML = "";

                listadecentrosfuncionales();

            }


        }


        ,
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }

    });




}


function modificarcfenbd() {

    var persona = new Object();
    persona.criterio = 'modificar';
    persona.numero = document.getElementById('numcf').value;
    persona.desc = document.getElementById('desccf').value;
    //   alert(persona.numero);
    //    alert(persona.desc);
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'centrofuncional',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data != "1") {
                alert("Ocurrio un error");
            } else {

                alert('Centro funcional modificado correctamente')

                document.getElementById('infopersonal').innerHTML = "";

                listadecentrosfuncionales();

            }


        }


        ,
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }

    });




}