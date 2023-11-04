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

function devuelveactivos() {
    //PERFIL DE USUARIO MINI


    var persona = new Object();
    persona.todos = 'Si';
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



                $('#infopersonal').append("<paper-button raised onclick='nuevoactivorhtml()'>Nuevo activo</paper-button><table id='tablaactivos' class='display'><thead><tr><th scope='col' abbr='Starter'>Numero del activo</th><th scope='col' abbr='Starter'>Descripción</th><th scope='col' abbr='Starter'>Monto estimado mensual</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Tipo</th><th scope='col' abbr='Starter'>Ultima modificación</th><th scope='col' abbr='Starter'>Modificar</th><th scope='col' abbr='Starter'>Eliminar</th><th scope='col' abbr='Starter'>Forzar devolución</th></tr></thead><tbody>");
                $('#infopersonal').append(" </tbody></table>");


              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

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


                    var newText6 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + data[ele].FEC_ULT_ACT);
                    newCell6.appendChild(newText6);


                    //BOTON DE MODIFICAR
                    var btnmodifica = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnmodifica.type = "button";
                    btnmodifica.setAttribute("onclick", "modificaACTIVO('" + data[ele].NUMERO_ACTIVO + "','" + data[ele].DESCRIPCION + "','" + data[ele].MONTO_MENSUAL + "','" + data[ele].ESTADO + "','" + data[ele].PARA_PRESTAMO + "');");
                    btnmodifica.id = 'boton' + data[ele].NUMERO_ACTIVO;
                    btnmodifica.text = "Modificar";

                    var newCell7 = newRow.insertCell(6);

                    newCell7.appendChild(btnmodifica);
                    var btnelimina = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnelimina.type = "button";
                    btnelimina.setAttribute("onclick", "ELIMINAACTIVO('" + data[ele].NUMERO_ACTIVO + "','" + data[ele].DESCRIPCION + "');");
                    btnelimina.id = 'botoneli' + data[ele].NUMERO_ACTIVO;
                    btnelimina.text = "Eliminar";

                    var newCell8 = newRow.insertCell(7);
                    newCell8.appendChild(btnelimina);
                    //BOTON DE ELIMINAR



                    //BOTON DE FORZAR
                    var btnFORZAR = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnFORZAR.type = "button";
                    btnFORZAR.setAttribute("onclick", "FORZARACTIVO('" + data[ele].NUMERO_ACTIVO + "');");
                    btnFORZAR.id = 'botonf' + data[ele].NUMERO_ACTIVO;
                    btnFORZAR.text = "Eliminar";

                    var newCell9 = newRow.insertCell(8);

                    newCell9.appendChild(btnFORZAR);
                }

              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                    if (data[ele].ESTADO) {

                        document.getElementById('botoneli' + data[ele].NUMERO_ACTIVO).style.visibility = 'hidden';

                    } else {
                        document.getElementById('botonf' + data[ele].NUMERO_ACTIVO).style.visibility = 'hidden';

                    }




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




    //return tabla.value;


}

function modificaequipoajax() {
    var persona = new Object();
    persona.modificar = 'Si';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.numactivo = document.getElementById("numact").value;
    persona.descripcion = document.getElementById("nombact").value;
    persona.paraprestamo = document.getElementById("prestamoactivo").value;
    persona.montomensual = document.getElementById("precact").value;
    persona.estado = "0";
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.foto = "Activo/" + persona.numactivo + ".jpg";
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
                var files = $("#inputFilefoto").get(0).files;
                if (files.length > 0) {
                    var data = new FormData();
                    data.append("usrid", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID);
                    data.append("pssw", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA);

                    for (i = 0; i < files.length; i++) {
                        data.append("file" + i, files[i]);
                    }
                    data.append('ID', persona.numactivo);
                    data.append('TIPO', 'FOTOGRAFIAACTIVO');
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
                alert("Activo modificado correctamente");

                window.location.href = "Activos.html";
            }


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });
}

function modificaACTIVO(id, nombre, precio, estado, prestado) {

    document.getElementById('infopersonal').innerHTML = "";


    $('#infopersonal').append("<input  class='form-control' placeholder='Numero del activo' disabled id='numact' type=\"number\" value ='" + id + "' disabled/><input  class='form-control' placeholder='Nombre del activo' id='nombact' value='" + nombre + "'/><input  class='form-control' placeholder='Precio del activo' id='precact' value='" + precio + "' type=\"number\"/><br>Estado del activo<select id='estadoactivo'>  <option value='0'>Inactivo</option><option value='1'>Activo</option> </select><br>Prestamo del activo<select id='prestamoactivo'>  <option value='0'>No se presta</option><option value='1'>Para prestamo</option> </select><br>Para subir la foto:<input id=\"inputFilefoto\" type=\"file\" /><hr><hr><paper-button raised onclick='modificaequipoajax()'>Modificar</paper-button><paper-button raised onclick=' window.location.href=\"Activos.html\"'>Volver</paper-button> ");
    if (estado) {
        document.getElementById("estadoactivo").value = 1;
    } else {
        document.getElementById("estadoactivo").value = 0;
    }
    if (prestamoactivo) {
        document.getElementById("prestamoactivo").value = 1;
    } else {
        document.getElementById("prestamoactivo").value = 0;
    }




}

function ELIMINAACTIVO(id, nombre) {
    var d = document.createElement('div');
    d.setAttribute('id', 'eliminapopup');
    d.setAttribute('class', 'pop');
    document.body.appendChild(d);

    $('#eliminapopup').append("<paper-button raised onclick='eliminadiv(#eliminapopup)'>Salir</paper-button><h1>Seguro que desea eliminar el activo</h1> Avtivo : " + id + " " + nombre + "<hr><paper-button raised onclick='confirmaelimina(" + id + ")'>Eliminar</paper-button><hr> <strong> Recuerde que antes de eliminarlo debe verificar que no este prestado");

}

function confirmaelimina(id) {
    var persona = new Object();
    persona.elimina = 'Si';
    persona.identificacion = id;
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
                alert('Activo numero ' + id + ' eliminado correctamente');
                $('#popelimina').remove();
                $('#people').innerHTML = '';
                $('#infopersonal').innerHTML = '';
                devuelveactivos();
            }
        }
    });
}

function FORZARACTIVO(id) {

    var persona = new Object();
    persona.prestamoxidactivo = 'Si';
    persona.idactivo = id;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Prestamo_activo',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data == "") {
                alert("Activo no esta en préstamo");
            } else {
                window.location.href = "inicio.html?id=" + data;

            }


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

}

function eliminadiv(id) {

    $('#popelimina').remove();


}

function nuevoactivorhtml() {

    document.getElementById('infopersonal').innerHTML = "";


    $('#infopersonal').append("<input  class='form-control' placeholder='Numero del activo' id='numact' type=\"number\" /><input  class='form-control' placeholder='Nombre del activo' id='nombact' /><input  class='form-control' placeholder='Precio del activo' id='precact' type=\"number\"/><br>Estado del activo<select id='estadoactivo'>  <option value='0'>Inactivo</option><option value='1'>Activo</option> </select><br>Prestamo del activo<select id='prestamoactivo'>  <option value='0'>No se presta</option><option value='1'>Para prestamo</option> </select><br>Para subir la foto:<input id=\"inputFilefoto\" type=\"file\" /><hr><paper-button raised onclick='guardarajax()'>Guardar</paper-button><paper-button raised onclick=' window.location.href=\"Activos.html\"'>Volver</paper-button> ");

}

function guardarajax() {
    var persona = new Object();
    persona.insertar = 'Si';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.numactivo = document.getElementById("numact").value;
    persona.descripcion = document.getElementById("nombact").value;
    persona.paraprestamo = document.getElementById("prestamoactivo").value;
    persona.montomensual = document.getElementById("precact").value;
    persona.estado = "0";
    persona.idusuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.foto = "Activo/" + persona.numactivo + ".jpg";
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
                var files = $("#inputFilefoto").get(0).files;
                if (files.length > 0) {
                    var data = new FormData();
                    data.append("usrid", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID);
                    data.append("pssw", JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA);

                    for (i = 0; i < files.length; i++) {
                        data.append("file" + i, files[i]);
                    }
                    data.append('ID', persona.numactivo);
                    data.append('TIPO', 'FOTOGRAFIAACTIVO');
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
                alert("Activo guardado correctamente");

                window.location.href = "Activos.html";
            }


        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });



}