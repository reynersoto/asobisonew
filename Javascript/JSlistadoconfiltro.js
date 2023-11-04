var urllocal = 'api/';


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
//document.getElementById('infopersonal').innerHTML = '<ul class="tabs" id="detalle" ><li id="pagoenmut"> <input type="radio" checked name="tabs" id="tabpagomut"><label for="tabpagomut">Listado con filtros </label><div id="tab-contentdefmut" class="tab-content animated fadeIn"><div id="espacioparafiltro"><h2>Seleccione los filtros del listado</h2><table><tr><td><table><tr><td>Seleccione el o los programas que desea agregar al reporte<hr></td></tr><tr><td><input type="checkbox" id="filtrofondomutualidad" name="vehicle1" value="BDA"><label for="mutualidad"> BDA</label><br><input type="checkbox" id="filtrofondosolidaridad" name="vehicle1" value="BDFA"><label for="solidaridad"> BDFA</label><br><input type="checkbox" id="filtrofondoasobiso" name="vehicle1" value="ABS"><label for="asobiso"> ABS</label></td></tr></table></td><td>Seleccione el o los estados del filtro<hr><div id= "espacioparaestados"></div></td><td>Seleccione el o los métodos de pago del filtro<hr><div id= "espacioparametodosdepago"></div></td><td>Seleccione el filtro por monto <hr><select id="filtromonto"><option id ="mayorque"> > </option><option id ="menorque"> < </option><option id ="igualque"> = </option></select> <input type="number" id="filtromontonumero" /></td><td>Seleccione el filtro por fecha de ingreso <hr> <input type="date" id="fechaingresofiltro" /> </td> <td>Seleccione el filtro por fecha de nacimiento<hr> <input type="date" id= "fechanacfiltro" </td> <td><paper-button raised  onclick="generareporte()" >Generar reporte</paper-button></td>  </tr></div>  </div></div>            </li>  </ul>';




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
            document.getElementById('espacioparaestados').innerHTML += '<input type="checkbox" id="filtroestado' + dataestado[ele].ID + '" name="' + dataestado[ele].ID + '" value="' + dataestado[ele].DESCRIPCION + '">   <label for="' + dataestado[ele].ID + '"> ' + dataestado[ele].DESCRIPCION + '</label><br>';



        }
    }
});




var persona = new Object();
persona.criterio = "seleccionables";
var dataestado = new Object();
persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

//ajax de los datos personales
/*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
    url: urllocal + 'Metododepago',
    type: 'POST',
    dataType: 'json',
    data: persona,
    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (dataestado, textStatus, xhr) {
        for (var ele in dataestado) {
            document.getElementById('espacioparametodosdepago').innerHTML += '<input type="checkbox" id="filtrometododepago' + dataestado[ele].ID + '" name="' + dataestado[ele].ID + '" value="' + dataestado[ele].DESCRIPCION + '">   <label for="' + dataestado[ele].ID + '"> ' + dataestado[ele].DESCRIPCION + '</label><br>';


        }

    }
});






var persona = new Object();
persona.tipo = '74';
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
        if (data.ID == 0) {
            alert("Persona no esta afiliada ni registrada");
        } else {

              // enlaceoutlookemorososporplanilla += document.getElementById('email1morosoplanilla').value + ',' + document.getElementById('email2morosoplanilla').value + ',' + document.getElementById('email3morosoplanilla').value + '?bcc=';
            var cantidad = 0;


          /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                cantidad += 1;
                var tableRef = document.getElementById('tablamorososmovilidadlaboral').getElementsByTagName('tbody')[0];

                //    enlaceoutlookemorososporplanilla += String(data[ele].Correo) + ',';

                // Insert a row in the table at the last row
                var newRow = tableRef.insertRow(tableRef.rows.length);
                newRow.id = 'filamovlaboralmoroso' + data[ele].IdentificaciOn
                // Insert a cell in the row at index 0
                var newCell = newRow.insertCell(0);

                var newText = document.createTextNode(data[ele].IdentificaciOn + ' ' + data[ele].Nombre + ' ' + data[ele]['Primerapellido'] + ' ' + data[ele]['Segundoapellido'])

                newCell.appendChild(newText);
                var newCell = newRow.insertCell(1);

                var newText = document.createTextNode(data[ele].Correo)
               
                newCell.appendChild(newText);

                var newCell = newRow.insertCell(2);

                var newText = document.createTextNode(data[ele].tel1)

                newCell.appendChild(newText);


                var newCell = newRow.insertCell(3);

                var newText = document.createTextNode(data[ele].tel2)

                newCell.appendChild(newText);


                var newCell = newRow.insertCell(4);

                var newText = document.createTextNode(data[ele].cel)

                newCell.appendChild(newText);



                var newCell = newRow.insertCell(5);
                if (data[ele]["Mutualidad"] != '-1') {
                    var newText = document.createTextNode( data[ele]["Mutualidad"]);
                } else {
                    var newText = document.createTextNode('No asociado en el programa defunción asociado directo');
                }

                newCell.appendChild(newText);
                var newCell = newRow.insertCell(6);
                if (data[ele]["Solidaridad"] != '-1') {
                    var newText = document.createTextNode( data[ele]["Solidaridad"]);
                } else {
                    var newText = document.createTextNode('No asociado en el programa defunción de familiar del asociado');
                }
                newCell.appendChild(newText);

                var newCell = newRow.insertCell(7);
                if (data[ele]["abs"] != '-1') {
                    var newText = document.createTextNode(data[ele]["abs"]);
                } else {
                    var newText = document.createTextNode('No asociado en el programa Cuotas de asociado');
                }
                newCell.appendChild(newText);


            }

        
            $('#tablamorososmovilidadlaboral').dataTable({
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
persona.tipo = '75';
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
        if (data.ID == 0) {
            alert("Persona no esta afiliada ni registrada");
        } else {

            // enlaceoutlookemorososporplanilla += document.getElementById('email1morosoplanilla').value + ',' + document.getElementById('email2morosoplanilla').value + ',' + document.getElementById('email3morosoplanilla').value + '?bcc=';
            var cantidad = 0;


          /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                cantidad += 1;
                var tableRef = document.getElementById('tablatodoslosmorosos').getElementsByTagName('tbody')[0];

                //    enlaceoutlookemorososporplanilla += String(data[ele].Correo) + ',';

                // Insert a row in the table at the last row
                var newRow = tableRef.insertRow(tableRef.rows.length);
                newRow.id = 'filatodoslosmorosos' + data[ele].IdentificaciOn
                // Insert a cell in the row at index 0
                var newCell = newRow.insertCell(0);

                var newText = document.createTextNode(data[ele].IdentificaciOn)

                newCell.appendChild(newText);


                var newCell = newRow.insertCell(1);

                var newText = document.createTextNode( data[ele].Nombre)

                newCell.appendChild(newText);

                var newCell = newRow.insertCell(2);

                var newText = document.createTextNode( data[ele]['Primerapellido'])

                newCell.appendChild(newText);

                var newCell = newRow.insertCell(3);

                var newText = document.createTextNode(data[ele]['Segundoapellido'])

                newCell.appendChild(newText);

                var newCell = newRow.insertCell(4);
                if (data[ele]["estadoympenmut"] != '-1 - -1') {
                  
                
                        var newText = document.createTextNode(data[ele]["estadoympenmut"]);
                   
                } else {
                    var newText = document.createTextNode('0'); //AGREGA 0 EN LUGAR DE VACIO, PARA REPORTES USANDO LA FORMULA =SUMAPRODUCTO(ESTEXTO(G8:G392)*1)
                }

                newCell.appendChild(newText);
                var newCell = newRow.insertCell(5);
                if (data[ele]["estadoympensol"] != '-1 - -1') {
                  
                    var newText = document.createTextNode(data[ele]["estadoympensol"]);
                   
                } else {
                    var newText = document.createTextNode('0'); //AGREGA 0 EN LUGAR DE VACIO, PARA REPORTES USANDO LA FORMULA =SUMAPRODUCTO(ESTEXTO(G8:G392)*1)
                }
                newCell.appendChild(newText);

                var newCell = newRow.insertCell(6);

                if (data[ele]["estadoympenabs"] != '-1 - -1') {
                   
                    var newText = document.createTextNode(data[ele]["estadoympenabs"]);
                   


                } else {
                    var newText = document.createTextNode('0');//AGREGA 0 EN LUGAR DE VACIO, PARA REPORTES USANDO LA FORMULA =SUMAPRODUCTO(ESTEXTO(G8:G392)*1)
                }
                newCell.appendChild(newText);




                var newCell = newRow.insertCell(7);
                if (data[ele]["Mutualidad"] != '-1') {
                    var montomut = parseInt(data[ele]["Mutualidad"]);
                    if (montomut < 0) {
                        var newText = document.createTextNode(data[ele]["Mutualidad"]);
                    }
                    else {

                        var newText = document.createTextNode('0')
                    }
                } else {
                    var newText = document.createTextNode('');
                }

                newCell.appendChild(newText);
                var newCell = newRow.insertCell(8);
                if (data[ele]["Solidaridad"] != '-1') {
                    var montosol = parseInt(data[ele]["Solidaridad"]);
                    if (montosol < 0) {
                        var newText = document.createTextNode(data[ele]["Solidaridad"]);
                    }
                    else {
                        var newText = document.createTextNode('0')
                    }
                } else {
                    var newText = document.createTextNode('');
                }
                newCell.appendChild(newText);

                var newCell = newRow.insertCell(9);

                if (data[ele]["abs"] != '-1') {
                    var montoaso = parseInt(data[ele]["abs"]);

                    if (montoaso < 0) {
                        var newText = document.createTextNode(data[ele]["abs"]);
                    }
                    else {
                        var newText = document.createTextNode('0');
                    }


                } else {
                    var newText = document.createTextNode('');
                }
                newCell.appendChild(newText);


            }


            $('#tablatodoslosmorosos').dataTable({
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
persona.tipo = '78';
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
        if (data.ID == 0) {
            alert("Persona no esta afiliada ni registrada");
        } else {

            // enlaceoutlookemorososporplanilla += document.getElementById('email1morosoplanilla').value + ',' + document.getElementById('email2morosoplanilla').value + ',' + document.getElementById('email3morosoplanilla').value + '?bcc=';
            var cantidad = 0;


          /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                cantidad += 1;
                var tableRef = document.getElementById('tablatodoslosmorosossinemail').getElementsByTagName('tbody')[0];

                //    enlaceoutlookemorososporplanilla += String(data[ele].Correo) + ',';

                // Insert a row in the table at the last row
                var newRow = tableRef.insertRow(tableRef.rows.length);
                newRow.id = 'filatodoslosmorosossinemail' + data[ele].IdentificaciOn
                // Insert a cell in the row at index 0
                var newCell = newRow.insertCell(0);

                var newText = document.createTextNode(data[ele].IdentificaciOn)

                newCell.appendChild(newText);


                var newCell = newRow.insertCell(1);

                var newText = document.createTextNode(data[ele].Nombre)

                newCell.appendChild(newText);

                var newCell = newRow.insertCell(2);

                var newText = document.createTextNode(data[ele]['Primerapellido'])

                newCell.appendChild(newText);

                var newCell = newRow.insertCell(3);

                var newText = document.createTextNode(data[ele]['Segundoapellido'])

                newCell.appendChild(newText);

                var newCell = newRow.insertCell(4);
                if (data[ele]["estadoympenmut"] != '-1 - -1') {


                    var newText = document.createTextNode(data[ele]["estadoympenmut"]);

                } else {
                    var newText = document.createTextNode('');
                }

                newCell.appendChild(newText);
                var newCell = newRow.insertCell(5);
                if (data[ele]["estadoympensol"] != '-1 - -1') {

                    var newText = document.createTextNode(data[ele]["estadoympensol"]);

                } else {
                    var newText = document.createTextNode('');
                }
                newCell.appendChild(newText);

                var newCell = newRow.insertCell(6);

                if (data[ele]["estadoympenabs"] != '-1 - -1') {

                    var newText = document.createTextNode(data[ele]["estadoympenabs"]);



                } else {
                    var newText = document.createTextNode('');
                }
                newCell.appendChild(newText);




                var newCell = newRow.insertCell(7);
                if (data[ele]["Mutualidad"] != '-1') {
                    var montomut = parseInt(data[ele]["Mutualidad"]);
                    if (montomut < 0) {
                        var newText = document.createTextNode(data[ele]["Mutualidad"]);
                    }
                    else {

                        var newText = document.createTextNode('0')
                    }
                } else {
                    var newText = document.createTextNode('');
                }

                newCell.appendChild(newText);
                var newCell = newRow.insertCell(8);
                if (data[ele]["Solidaridad"] != '-1') {
                    var montosol = parseInt(data[ele]["Solidaridad"]);
                    if (montosol < 0) {
                        var newText = document.createTextNode(data[ele]["Solidaridad"]);
                    }
                    else {
                        var newText = document.createTextNode('0')
                    }
                } else {
                    var newText = document.createTextNode('');
                }
                newCell.appendChild(newText);

                var newCell = newRow.insertCell(9);

                if (data[ele]["abs"] != '-1') {
                    var montoaso = parseInt(data[ele]["abs"]);

                    if (montoaso < 0) {
                        var newText = document.createTextNode(data[ele]["abs"]);
                    }
                    else {
                        var newText = document.createTextNode('0');
                    }


                } else {
                    var newText = document.createTextNode('');
                }
                newCell.appendChild(newText);


            }


            $('#tablatodoslosmorosossinemail').dataTable({
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
persona.tipo = '77';
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
        if (data.ID == 0) {
            alert("Persona no esta afiliada ni registrada");
        } else {

            // enlaceoutlookemorososporplanilla += document.getElementById('email1morosoplanilla').value + ',' + document.getElementById('email2morosoplanilla').value + ',' + document.getElementById('email3morosoplanilla').value + '?bcc=';
            var cantidad = 0;


          /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                cantidad += 1;
                var tableRef = document.getElementById('tablaparaasambleasinemail').getElementsByTagName('tbody')[0];

                //    enlaceoutlookemorososporplanilla += String(data[ele].Correo) + ',';

                // Insert a row in the table at the last row
                var newRow = tableRef.insertRow(tableRef.rows.length);
                newRow.id = 'filaparaasambleasinemail' + data[ele].IdentificaciOn
                // Insert a cell in the row at index 0
                var newCell = newRow.insertCell(0);

                var newText = document.createTextNode(data[ele].IdentificaciOn)

                newCell.appendChild(newText);


                var newCell = newRow.insertCell(1);

                var newText = document.createTextNode(data[ele].Nombre)

                newCell.appendChild(newText);

                var newCell = newRow.insertCell(2);

                var newText = document.createTextNode(data[ele]['Primerapellido'])

                newCell.appendChild(newText);

                var newCell = newRow.insertCell(3);

                var newText = document.createTextNode(data[ele]['Segundoapellido'])

                newCell.appendChild(newText);


                var newCell = newRow.insertCell(4);

                var newText = document.createTextNode(data[ele]['celular'])

                newCell.appendChild(newText);

                var newCell = newRow.insertCell(5);

                var newText = document.createTextNode(data[ele]['telefonouno'])

                newCell.appendChild(newText);

                var newCell = newRow.insertCell(6);

                var newText = document.createTextNode(data[ele]['telefonodos'])

                newCell.appendChild(newText);



                var newCell = newRow.insertCell(7);

                var newText = document.createTextNode(data[ele]['pdb'])

                newCell.appendChild(newText);


                var newCell = newRow.insertCell(8);

                var newText = document.createTextNode(data[ele]['pdbf'])

                newCell.appendChild(newText);


                var newCell = newRow.insertCell(9);

                var newText = document.createTextNode(data[ele]['abs'])

                newCell.appendChild(newText);


                var newCell = newRow.insertCell(10);

                var newText = document.createTextNode(data[ele]['fec_nac'])

                newCell.appendChild(newText);


            }


            $('#tablaparaasambleasinemail').dataTable({
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
        if (data.ID == 0) {
            alert("Persona no esta afiliada ni registrada");
        } else {

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

                newCell.appendChild(newText);

                var newCell = newRow.insertCell(2);

                var newText = document.createTextNode(data[ele].tel1)

                newCell.appendChild(newText);


                var newCell = newRow.insertCell(3);

                var newText = document.createTextNode(data[ele].tel2)

                newCell.appendChild(newText);


                var newCell = newRow.insertCell(4);

                var newText = document.createTextNode(data[ele].cel)

                newCell.appendChild(newText);



                var newCell = newRow.insertCell(5);
                if (data[ele]["Mutualidad"] != '-1') {
                    var newText = document.createTextNode(data[ele]["Mutualidad"]);
                } else {
                    var newText = document.createTextNode('No asociado en el programa defunción asociado directo, renuncia o exclusión');
                }

                newCell.appendChild(newText);
                var newCell = newRow.insertCell(6);
                if (data[ele]["Solidaridad"] != '-1') {
                    var newText = document.createTextNode(data[ele]["Solidaridad"]);
                } else {
                    var newText = document.createTextNode('No asociado en el programa defunción de familiar del asociado, renuncia o exclusión');
                }
                newCell.appendChild(newText);

                var newCell = newRow.insertCell(7);
                if (data[ele]["abs"] != '-1') {
                    var newText = document.createTextNode(data[ele]["abs"]);
                } else {
                    var newText = document.createTextNode('No asociado en el programa Cuotas de asociado, renuncia o exclusión');
                }
                newCell.appendChild(newText);


            }


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

       
        if (data.ID == 0) {
            alert("Persona no esta afiliada ni registrada");
        } else {

           
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
              
                newCell.appendChild(newText);



                var newCell = newRow.insertCell(2);

                var newText = document.createTextNode(data[ele].tel1)

                newCell.appendChild(newText);


                var newCell = newRow.insertCell(3);

                var newText = document.createTextNode(data[ele].tel2)

                newCell.appendChild(newText);


                var newCell = newRow.insertCell(4);

                var newText = document.createTextNode(data[ele].cel)

                newCell.appendChild(newText);


                var newCell = newRow.insertCell(5);
                if (data[ele]["Mutualidad"] != '-1') {
                    var newText = document.createTextNode( data[ele]["Mutualidad"]);
                } else {
                    var newText = document.createTextNode('No asociado en el programa defunción asociado directo, renuncia o exclusión');
                }

                newCell.appendChild(newText);
                var newCell = newRow.insertCell(6);
                if (data[ele]["Solidaridad"] != '-1') {
                    var newText = document.createTextNode( data[ele]["Solidaridad"]);
                } else {
                    var newText = document.createTextNode('No asociado en el programa defunción de familiar del asociado, renuncia o exclusión');
                }
                newCell.appendChild(newText);



            }


     
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
persona.tipo = '71';
persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

var tabla;


/*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
    url: urllocal + 'Listado',
    // url: 'http://192.168.1.135//api/Listado',
    type: 'POST',
    dataType: 'json',
    data: persona,
    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
        if (data.ID == 0) {
            alert("Persona no esta afiliada ni registrada");
        } else {



        

          /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                var tableRef = document.getElementById('tablatres').getElementsByTagName('tbody')[0];

                // Insert a row in the table at the last row
                var newRow = tableRef.insertRow(tableRef.rows.length);

                // Insert a cell in the row at index 0
                var newCell = newRow.insertCell(0);

                // Append a text node to the cell
                var newText = document.createTextNode(data[ele].IdentificaciOn);

                newCell.appendChild(newText);

                var newCell2 = newRow.insertCell(1);

                //
                var newText2 = document.createTextNode(data[ele].Nombre + ' ' + data[ele].Primerapellido + ' ' + data[ele].Segundoapellido);
                newCell2.appendChild(newText2);
                //
                var newCell3 = newRow.insertCell(2);


                var newText3 = document.createTextNode(data[ele].PrimerCorreo);
                newCell3.appendChild(newText3);
                var newCell4 = newRow.insertCell(3);

                var newText4 = document.createTextNode(data[ele].SegundoCorreo);
                newCell4.appendChild(newText4);
                //
                //                       
                var newCell5 = newRow.insertCell(4);

                //var dater=new Date(data[ele]['Fecha de ingreso']);
                var newText5 = document.createTextNode(data[ele].celular);

                newCell5.appendChild(newText5);



                //
                //                            
                //                            
                var newCell7 = newRow.insertCell(5);
                var newText7 = document.createTextNode(data[ele].telefonouno);

                newCell7.appendChild(newText7);
                //                             //BOTON DE ELIMINAR
                //                           
                //                            
                var newCell8 = newRow.insertCell(6);
                var newText8 = document.createTextNode(data[ele].telefonodos);
                //                        
                newCell8.appendChild(newText8);
                var newCell8 = newRow.insertCell(7);
                if (data[ele].fec_nac != '1/1/1900 12:00:00 AM') {

                    var newText8 = document.createTextNode(data[ele].fec_nac);
                    //                        

                }
                else {
                    var newText8 = document.createTextNode('');
                }
                newCell8.appendChild(newText8);
                var newText9 = document.createTextNode(data[ele].pdb);



                //                            
                var newCell11 = newRow.insertCell(8);
                //                            
                newCell11.appendChild(newText9);

                var newText9 = document.createTextNode(data[ele].pdbf);



                //                            
                var newCell11 = newRow.insertCell(9);
                //                            
                newCell11.appendChild(newText9);
                var newText9 = document.createTextNode(data[ele].abs);



                //                            
                var newCell11 = newRow.insertCell(10);
                //                            
                newCell11.appendChild(newText9);

    




                //                                 }
            }


            $('#tablatres').dataTable({
                "scrollY": "400px",
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




//dt.Columns.Add("IdentificaciOn");
//dt.Columns.Add("Nombre");
//dt.Columns.Add("Primerapellido");
//dt.Columns.Add("Segundoapellido");
//dt.Columns.Add("email1");

//dt.Columns.Add("pdb");
//dt.Columns.Add("pdbf");
//dt.Columns.Add("abs");







//dt.Columns.Add("identificacion");
//dt.Columns.Add("motivo");
//dt.Columns.Add("fecharegistro");
//dt.Columns.Add("fondo");

//dt.Columns.Add("nombre");
//dt.Columns.Add("primerapellido");
//dt.Columns.Add("segundoapellido");



var persona = new Object();
persona.tipo = '73';
persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

var tabla;


/*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
    url: urllocal + 'Listado',
    // url: 'http://192.168.1.135//api/Listado',
    type: 'POST',
    dataType: 'json',
    data: persona,
    /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
        console.log(data);
        if (data.ID == 0) {
            alert("Persona no esta afiliada ni registrada");
        } else {





          /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                var tableRef = document.getElementById('tablaatresmesesdeserexcluido').getElementsByTagName('tbody')[0];

                // Insert a row in the table at the last row
                var newRow = tableRef.insertRow(tableRef.rows.length);

                // Insert a cell in the row at index 0
              

                var newCell2 = newRow.insertCell(0);

                //
                var newText2 = document.createTextNode(data[ele].IdentificaciOn + ' ' + data[ele].Nombre + ' ' + data[ele].Primerapellido + ' ' + data[ele].Segundoapellido);
                newCell2.appendChild(newText2);
                //
                var newCell3 = newRow.insertCell(1);


                var newText3 = document.createTextNode(data[ele].email1);
                newCell3.appendChild(newText3);
                //
           
                var newCell3 = newRow.insertCell(2);


                var newText3 = document.createTextNode(data[ele].pdb);
                newCell3.appendChild(newText3);
                //
                var newCell3 = newRow.insertCell(3);


                var newText3 = document.createTextNode(data[ele].pdbf);
                newCell3.appendChild(newText3);
                //

                var newCell3 = newRow.insertCell(4);


                var newText3 = document.createTextNode(data[ele].abs);
                newCell3.appendChild(newText3);
                //




                //                                 }
            }


            $('#tablaatresmesesdeserexcluido').dataTable({
                "scrollY": "400px",
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



var fechaactual = new Date();

var mesactual = fechaactual.getMonth() + 1;

var annoactual = fechaactual.getFullYear();

document.getElementById('mesexcluye').value = mesactual;
document.getElementById('annoexcluye').value = annoactual;

generareporteexcluidos();

function generareporteexcluidos() {
    $('#tablaexcluidosxmesyanno').remove();
    document.getElementById('espacioparatabladeexclucionesfiltradas').innerHTML = "<table id='tablaexcluidosxmesyanno' class='display' style='font-size:xx-small'><thead><tr><th scope='col' abbr='Starter'>Identificación y nombre</th><th scope='col' abbr='Starter'>Motivo de exclusión</th><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Fecha de exclusión</th></tr></thead><tbody></tbody></table>";

   
    var persona = new Object();
    persona.tipo = '72';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.mes = document.getElementById('mesexcluye').value;
    persona.anno = document.getElementById('annoexcluye').value;
    var tabla;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Listado',
        // url: 'http://192.168.30.104//api/Listado',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {


            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {


              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById('tablaexcluidosxmesyanno').getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);
                    newRow.id = 'filapenmoroso' + data[ele].IdentificaciOn
                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    var newText = document.createTextNode(data[ele].identificacion + ' ' + data[ele].nombre + ' ' + data[ele]['primerapellido'] + ' ' + data[ele]['segundoapellido'])

                    newCell.appendChild(newText);
                    var newCell = newRow.insertCell(1);

                    var newText = document.createTextNode(data[ele].motivo)

                    newCell.appendChild(newText);


                    var newCell = newRow.insertCell(2);

                    var newText = document.createTextNode(data[ele].fondo)

                    newCell.appendChild(newText);
                    var newCell = newRow.insertCell(3);

                    var newText = document.createTextNode(data[ele].fecharegistro)

                    newCell.appendChild(newText);




                }

                     $('#tablaexcluidosxmesyanno').dataTable({
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

function ajaxagregaobs() {
    var persona = new Object();
    persona.id = document.getElementById("idescogido").value;
    persona.fondo = document.getElementById("fondoescogido").value;
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

function cerrarajaxagregaobs() {

    $('#cuadroagregaobs').html("");
    $('#cuadroagregaobs').css('visibility', 'hidden');

}

function inicializa() {
    //PERFIL DE USUARIO MINI
    //var miniprofile = document.getElementById("people");
    //miniprofile.innerHTML = "<li>  <img src='/Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg' onerror='this.src = 'Imagenes/btn_menu.png'' onclick='muestraprofilegrande();' /><h2>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</h2><em>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "</em> </li>";
    ////FIN DE PERFIL DE USUARIO MINI


}

var programa = [];
var estado = [];
var metodosdepago = []
var monto = 0;
var filtromonto = "";
var filtrofechaingreso = ""
var filtrofechanac = "";

function revisafiltros() {

    if (document.getElementById('filtrofondomutualidad').checked == false && document.getElementById('filtrofondosolidaridad').checked == false && document.getElementById('filtrofondoasobiso').checked == false) {
        alert('Debe seleccionar al menos un programa');
    } else {

        if (document.getElementById('filtrofondomutualidad').checked) {
            programa.push('MUTUALIDAD')

        }
        if (document.getElementById('filtrofondosolidaridad').checked) {
            programa.push('SOLIDARIDAD')

        }
        if (document.getElementById('filtrofondoasobiso').checked) {
            programa.push('ASOBISO')

        }

        var ul = document.getElementById('espacioparaestados')

        // get all children
        var childern = ul.childNodes;

        // iterate over all child nodes
        childern.forEach(li => {
            if (li.checked) {
                estado.push(li.name);

            }
        });
        ul = document.getElementById('espacioparametodosdepago')

        // get all children
        childern = ul.childNodes;

        // iterate over all child nodes
        childern.forEach(li => {
            if (li.checked) {
                metodosdepago.push(li.name);

            }
        });

        if (document.getElementById('filtromontonumero').value != '') {
            monto = document.getElementById('filtromontonumero').value;
            filtromonto = document.getElementById('filtromonto').id;
        }

        if (document.getElementById('fechaingresofiltro').value != '') {
            filtrofechaingreso = document.getElementById('fechaingresofiltro').value;

        }

        if (document.getElementById('fechanacfiltro').value != '') {
            filtrofechanac = document.getElementById('fechanacfiltro').value;

        }
        nuevolistadoasociadosfiltrado();
    }




}



function generareporte() {
    revisafiltros();
}

function nuevolistadoasociadosfiltrado() {

    $('#tabla').remove();

    espacioparafiltro

    $('#infopersonal').innerHtml = '';
    $('#tabla_wrapper').remove();
    $('#titulo').remove();
    var persona = new Object();
    persona.tipo = '69';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.programa = JSON.stringify(programa);
    persona.estado = JSON.stringify(estado);
    persona.metodosdepago = JSON.stringify(metodosdepago);
    persona.monto = monto;
    persona.filtromonto = filtromonto;
    persona.filtrofechaingreso = filtrofechaingreso;
    persona.filtrofechanac = filtrofechanac;
    var tabla;


    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Listado',
        // url: 'http://192.168.1.135//api/Listado',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {



                $('#infopersonal').append("<paper-button raised  onclick=\"location.href= \"listadoconfiltro.html\";\" >Generar con otro filtro</paper-button><h1 id = 'titulo'>Asociados según filtro</h1><table id='tabla' class='display' style='font-size:xx-small'><thead><tr><th scope='col' abbr='Starter'>Identificación</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Primer correo electrónico</th><th scope='col' abbr='Starter'>Segundo correo electrónico</th><th scope='col' abbr='Starter'>Celular</th><th scope='col' abbr='Starter'>Primer teléfono</th><th scope='col' abbr='Starter'>Segundo teléfono</th><th scope='col' abbr='Starter'>Fecha nacimiento</th><th scope='col' abbr='Starter'>PDB</th><th scope='col' abbr='Starter'>PDBF</th><th scope='col' abbr='Starter'>ABS</th><th scope='col' abbr='Starter'>Buscar</th></tr></thead><tbody>");
                $('#infopersonal').append(" </tbody></table>");


              /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {

                    var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);

                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);

                    // Append a text node to the cell
                    var newText = document.createTextNode(data[ele].IdentificaciOn);

                    newCell.appendChild(newText);

                    var newCell2 = newRow.insertCell(1);

                    //
                    var newText2 = document.createTextNode(data[ele].Nombre + ' ' + data[ele].Primerapellido + ' ' + data[ele].Segundoapellido);
                    newCell2.appendChild(newText2);
                    //
                    var newCell3 = newRow.insertCell(2);


                    var newText3 = document.createTextNode(data[ele].PrimerCorreo);
                    newCell3.appendChild(newText3);
                    var newCell4 = newRow.insertCell(3);

                    var newText4 = document.createTextNode(data[ele].SegundoCorreo);
                    newCell4.appendChild(newText4);
                    //
                    //                       
                    var newCell5 = newRow.insertCell(4);

                    //var dater=new Date(data[ele]['Fecha de ingreso']);
                    var newText5 = document.createTextNode(data[ele].celular);

                    newCell5.appendChild(newText5);



                    //
                    //                            
                    //                            
                    var newCell7 = newRow.insertCell(5);
                    var newText7 = document.createTextNode(data[ele].telefonouno);

                    newCell7.appendChild(newText7);
                    //                             //BOTON DE ELIMINAR
                    //                           
                    //                            
                    var newCell8 = newRow.insertCell(6);
                    var newText8 = document.createTextNode(data[ele].telefonodos);
                    //                        
                    newCell8.appendChild(newText8);
                    var newCell8 = newRow.insertCell(7);
                    if (data[ele].fec_nac != '1/1/1900 12:00:00 AM') {

                        var newText8 = document.createTextNode(data[ele].fec_nac);
                        //                        

                    }
                    else {
                        var newText8 = document.createTextNode('');
                    }
                    newCell8.appendChild(newText8);
                    var newText9 = document.createTextNode(data[ele].pdb);



                    //                            
                    var newCell11 = newRow.insertCell(8);
                    //                            
                    newCell11.appendChild(newText9);

                    var newText9 = document.createTextNode(data[ele].pdbf);



                    //                            
                    var newCell11 = newRow.insertCell(9);
                    //                            
                    newCell11.appendChild(newText9);
                    var newText9 = document.createTextNode(data[ele].abs);



                    //                            
                    var newCell11 = newRow.insertCell(10);
                    //                            
                    newCell11.appendChild(newText9);

                    //                             //BOTON DE FORZAR
                    var btnFORZAR = document.createElement("input");
                    //btnmodifica.type = "button";
                    btnFORZAR.type = "button";
                    btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IdentificaciOn + "';");
                    btnFORZAR.id = 'boton' + data[ele].IdentificaciOn;
                    btnFORZAR.value = "Buscar";

                    var newCell10 = newRow.insertCell(11);

                    newCell10.appendChild(btnFORZAR);




                    //                                 }
                }


                $('#tabla').dataTable({
                    "scrollY": "400px",
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

    $('#espacioparafiltro').remove();


}