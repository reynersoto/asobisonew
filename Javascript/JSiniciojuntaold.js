//$(document).ajaxStart(function () {
//    $("#loading").html("<div id='contenedor_caja'><H1>HOLA, ESTAMOS CARGANDO LA APLICACION, GRACIAS POR SU PACIENCIA</H1></div>");
//    // $("#carga").addClass("loading");
//    document.getElementById('loading').style.width = screen.width + 'px';
//    document.getElementById('loading').style.height = screen.height + 'px';
//    document.getElementById('loading').style.backgroundColor = "white";
//    document.getElementById('loading').style.zIndex = '20';
//    //document.getElementById('loading').style.opacity = '0.9';
//    $('#contenedor_caja').css({
//        width: ($(window).width() * 80) / 100,
//        position: 'absolute',
//        left: (($(window).width() * 20) / 100),

//        top: ($(window).height() - ($('#contenedor_caja').outerHeight() * 2)) / 2
//    });
//    document.getElementById("espaciotrabajo").style.visibility = "collapse";
//});
//$(document).ajaxStop(function () {
//    $("#loading").html("");
//    $("#loading").removeAttr("style");
//    document.getElementById("espaciotrabajo").style.visibility = "visible";
//});

var urllocal = 'api/';

if (JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")) == null)
                {
                    alert("No estas autorizado para ingresar aun");
                    location.href = "/loginjunta.html";

                }
                else
                {

                } 
function inicia()
{
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
    if (JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")) == null)
                {
                    alert("No estas autorizado para ingresar aun");
                    location.href = "/loginjunta.html";

                }
                else
                {
                   // alert(JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO);
                } 
   document.getElementById('espaciotrabajo').innerHTML ='<h2> Bienvenido ' +  
    JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).NOMBRE_COMPLETO + '</h2> <p> puede utilizar el menú a la izquierda de su pantalla para navegar entre las opciones del moduló gerencial, al finalizar, puede presionar el boton salir en el mismo menú para cerrar su sesión.';
    $("#imagenperfil").src = 'Imagenes/' + JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID + '.jpg';
    var persona = new Object();

    persona.id = '';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;
    //ajax de los datos personales
    $.ajax({
        url: urllocal + 'Estadistica',
        type: 'POST',
        dataType: 'json',
        data: persona,
        success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {
                
                $("#espaciotrabajo").append("<h1>Estadisticas actuales del sistema</h1>" + data);
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });
}

function carganotificacionespendientes() {
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
    if ((JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ROL == 6) || (JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ROL == 4) || (JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ROL == 1))
    {
             var persona = new Object();
            persona.ope='1';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

    $.ajax({
        url: urllocal + 'Notificacion',
        type: 'POST',
        dataType: 'json',
        data: persona,
        success: function (data, textStatus, xhr) {
                    
            if (data.ID == 0) {
                alert("Error en la contraseña");
            } else {
                document.getElementById('espaciotrabajo').innerHTML = '<table><tr><td>Cantidad de ayudas pendientes:</td><td> <a href=# id=\"notayudas\" onclick=pendienteayuda()>' + data.AYUDAS + '</a>' + '</td></tr><tr><td>Cantidad de becas pendientes:</td><td> <a href=# id=\"notbecas\" onclick=pendientebeca()>' + data.BECAS + '</a>' + '</td></tr><tr><td>Cantidad de afiliaciones pendientes:</td><td> <a href=# id=\"notaprobarnuevas\" onclick=paraaprobar()>' + data.AFILIACIONES + '</a>' + '</td></tr><tr><td>Cantidad de cambios de estado pendientes:</td><td> <a href=# id=\"notce\" onclick=\"pendientecambioestado()\">' + data.CAMBIOSESTADO + '</a>' + '</td></tr><tr><td>Cantidad de defunciones en el fondo pero defunción del asociado pendientes:</td><td> <a href=# id=\"notdefmut\" onclick=\"pendientedefmut()\">' + data.DEFMUT + '</a>' + '</td></tr><tr><td>Cantidad de defunciones en el fondo pero defunción del familiar pendientes:</td><td> <a href=# id=\"notdefsol\" onclick=\"pendientedefsol()\">' + data.DEFSOL + '</a>' + '</td></tr><tr><td>Cantidad de prestamo de equipo pendientes:</td><td> <a href=# id=\"notayudas\" onclick = \"pendienteprestamoequipo()\">' + data.ACTIVOS + '</a></td></tr></table>';
                // alert(data.AYUDAS);
                    
            }
                  
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

    } else{
        document.getElementById('espaciotrabajo').innerHTML = "No hay notificaciones visibles";
    }
        }

function salir()
{
    
     localStorage.setItem("USUARIOJUNTALOGUEADO",null);

                    
                  
                        //$('#usuariologuado').value = formatItem(data);
                        location.href = "/loginjunta.html";
    
}

function htmlbuscaxcf()
{
    
     document.getElementById('espaciotrabajo').innerHTML ='<h1>Búsqueda por número o nombre de centro funcional</h1>Seleccione o digite el centro funcional <select id=\"cfs\"></select><paper-button raised id=\"btnbuscaxcf\" onclick=\"busquedaxcf()\">Buscar</paper-button>';
    
    
    
        var persona = new Object();
        persona.identificacion = '0';
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

        var tabla;
        $.ajax({
            url: urllocal+'centrofuncional',
            type: 'POST',
            dataType: 'json',
            data: persona,
            success: function (data, textStatus, xhr) {
                if (data.NUMERO == 0) {
                    alert("Persona no esta afiliada ni registrada");
                } else {
                    for (var ele in data) {
                        var x = document.getElementById("cfs");
                        var option = document.createElement("option");
                        option.text = data[ele].NUMERO + ' ' +  data[ele].DESCRIPCION;
                        option.value = data[ele].NUMERO;
                        option.id = data[ele].NUMERO;
                    //   option.id=
                        x.add(option);

                    }
                }
              
            },
            error: function (xhr, textStatus, errorThrown) {
                alert(xhr);
            }
        });
                  // alert(data.AYUDAS);
                    
    
    
}
//
function busquedaxcf()
{
    var objeto = new Object();
     var ele = document.getElementById("cfs");
     objeto.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
     objeto.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

   objeto.criterio= ele.options[ele.selectedIndex].value;
    
     $('#tabla_wrapper').remove();
     $('#tabla').remove();
     $('#titulo').remove();
           $('#imprimebuscaxcf').remove();
       $.ajax({
            url: urllocal+'centrofuncional',
            type: 'POST',
            dataType: 'json',
            data: objeto,
            success: function (data, textStatus, xhr) {
                if (data.NUMERO == 0) {
                    alert("Persona no esta afiliada ni registrada");
                } else {
     
                    
                    $('#espaciotrabajo').append("<h1 id = 'titulo'>Listado de colaboradores en " + objeto.criterio + "</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificación</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Fondo pero defunción del asociado</th><th scope='col' abbr='Starter'>Fondo pero defunción del familiar</th><th scope='col' abbr='Starter'>Asobiso</th></tr></thead><tbody>");
                          $('#espaciotrabajo').append(" </tbody></table>");

                        
                        for (var ele in data) {

                            var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                            var newText = document.createTextNode(data[ele].Identificación)

                            newCell.appendChild(newText);
                        
                            var newCell2 = newRow.insertCell(1);

//
                          var newText2 = document.createTextNode(data[ele].Nombre + ' ' + data[ele]['Primer apellido'] + ' ' + data[ele]['Segundo apellido']);
                            newCell2.appendChild(newText2);
//
                            var newCell3 = newRow.insertCell(2);


                            var newText3 = document.createTextNode(data[ele].Mutualidad);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

      var newText4 = document.createTextNode(data[ele].Solidaridad);
                            newCell4.appendChild(newText4);
//
//                       
  var newCell5 = newRow.insertCell(4);
 var newText5 = document.createTextNode(data[ele].Asobiso);
                       newCell5.appendChild(newText5);  
                        }
                        
                   $('#tabla').dataTable({
        "scrollY":        "500px",
        "scrollCollapse": true,
        "paging":         false,
                       dom: 'Bfrtip',
        buttons: [
            'print'
        ]
    });
                    
                
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                alert(xhr);
            }
        });
               
                    
    
    
}
//
//
function htmlbuscapersona()
{
    
     document.getElementById('espaciotrabajo').innerHTML ="<h1>Búsqueda de persona</h1>Digite el número de identificación <input  class='form-control' placeholder=\'Identificación\' id=\'idtext\' /><br> o realice la búsqueda por nombre <input  class='form-control' placeholder=\'Nombre\' id=\'nombretext\' /> <input  class='form-control' placeholder=\'Primer apellido\' id=\'patext\' /> <input  class='form-control' placeholder=\'Segundo apellido\' id=\'satext\' /><paper-button raised id=\'btnbuscapersona\' onclick=\'busquedapersona()\'>Buscar </paper-button>" ;
       
}
//
function busquedapersona()
{
   
                    //document.body.innerHTML += '<div id="infopersonal" class="alcentro"></div>';
    if (document.getElementById("idtext").value != "") {
        htmlbusquedapersona(document.getElementById("idtext").value);
    }
    else {
        if ((document.getElementById("nombretext").value != "") || (document.getElementById("patext").value != "") || (document.getElementById("satext").value != ""))
        {
            var persona = new Object();
            persona.nombre = document.getElementById('nombretext').value;
            persona.primer_apellido = document.getElementById('patext').value;
            persona.segundo_apellido = document.getElementById('satext').value;
            var miniprofile = document.getElementById("espaciotrabajo");
            miniprofile.innerHTML =
 "<table id='tablabusqnombre' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificación</th><th scope='col' abbr='Starter'>Nombre</th><th scope='col' abbr='Starter'>Primer apellido</th><th scope='col' abbr='Starter'>Segundo apellido</th><th scope='col' abbr='Starter'>Fotografía</th><th scope='col' abbr='Starter'>Buscar</th></tr></thead><tbody></table>";
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

           
            var tabla;
            $.ajax({
                url: urllocal + 'Persona',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.IDENTIFICACION == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {


                        for (var ele in data) {

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

                            //imgperfil.setAttribute("onclick", "window.location = 'inicio.html?id=" + data[ele].IDENTIFICACION + "';");
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
                            btnmodifica.setAttribute("onclick", "htmlbusquedapersona('" + data[ele].IDENTIFICACION + "')");
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
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });

        }
        else {
            alert("Debe digitar la identificación o el nombre en la búsqueda");
        }

    }
    
    
}

function htmlbusquedapersona(uno)
{
    var persona = new Object();
    persona.identificacion = uno;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;


    //ajax de los datos personales
    $.ajax({
        url: urllocal + 'Persona',
        type: 'POST',
        dataType: 'json',
        data: persona,
        success: function (data, textStatus, xhr) {
            if (data.IDENTIFICACION == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {

                document.getElementById("espaciotrabajo").innerHTML = " <h1><img class='round' src='/Fotos/" + data.IDENTIFICACION + ".jpg' alt='" + data.NOMBRE + ' ' + data.PRIMER_APELLIDO + ' ' + data.SEGUNDO_APELLIDO + "' onerror=this.src='Imagenes/img_usuario.png' width='50px' heigth='50px' />" + data.IDENTIFICACION + ' ' + data.NOMBRE + ' ' + data.PRIMER_APELLIDO + ' ' + data.SEGUNDO_APELLIDO + "</h1><p>nacio el " + data.FECHA_NACIMIENTO + ", ingreso a la institución el: " + data.FECHA_INGRESO_ICE + " actualmente vive es: " + data.DIRECCION + " tiene registrados los correos: " + data.EMAIL1 + " - " + data.EMAIL2 + " labora para el departamento de: " + data.DEPARTAMENTO + " tiene el puesto de " + data.PUESTO + " sus telefonos son: " + data.TEL1 + " / " + data.TEL2 + " / " + data.CEL + "</p> <strong> <spam style='font-size:small'> Ultima actualizacion por: " + data.USUARIO.NOMBRE_COMPLETO + " la fecha: " + data.FEC_ULT_ACT + " </spam> </strong> </hr><paper-button raised id=\'btndetalleasobiso\' onclick=\'cargaaso(" + uno + ")\'>Ver detalle asobiso </paper-button><paper-button raised id=\'btndetallemutualidad\' onclick=\'cargamut(" + uno + ")\'>Ver detalle del fondo por defunción del asociado </paper-button><paper-button raised id=\'btndetalleasolidaridad\' onclick=\'cargasol(" + uno + ")\'>Ver detalle del fondo por defunción del familiar </paper-button>";

                cargaresumen(persona.identificacion);
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });


}
//
function cargaaso(iden)
        {
            $(document).ajaxStart(function () {
                //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


                $.blockUI({
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
            $(document).ajaxStop(function () {
                $.unblockUI();

            });
             $("#espaciodetalle").remove();
             $("#espaciotrabajo").append('<div id=\'espaciodetalle\'></div>');
                           
            var persona = new Object();
            persona.identificacion = iden
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            //ajax de los datos de asobiso
            $.ajax({
                url: urllocal + 'Asobiso',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.IDENTIFICACION.IDENTIFICACION == 0) {
                        $("#espaciodetalle").append("No afiliado a asobiso")
                       
                    } else {
                         
                       // alert("Persona afiliada desde: " + data.FECHA_INGRESO);
                        $("#espaciodetalle").append("<hr><h2>Asobiso</h2><p> Estado actual en el fondo: " + data.ESTADO.DESCRIPCION + " forma de pago: " + data.METODO_PAGO.DESCRIPCION + " fecha de afiliación: " + data.FECHA_INGRESO + " saldo actual: " + data.MONTO + " Observaciones: " + data.OBSERVACIONES + "<br/> <strong> <spam style='font-size:small'> Ultima actualización por: " + data.USUARIO.NOMBRE_COMPLETO + " la fecha: " + data.FEC_ULT_ACT + " </spam> </strong> </p><paper-button raised id='botonpophistorialmut' onclick=\"devuelvetablahistorialdepagos('Asociacion',"+persona.identificacion+")\">Mostrar historial</paper-button> ");
                           //devuelvetablahistorialdepagos("ASOBISO", persona.identificacion, "tab-content3");
                    }

    
  
                },
                error: function (xhr, textStatus, errorThrown) {
                    $("#espaciodetalle").append("Error al cargar, favor volver a cargar");
                }
            });
            //$('#clictab3').removeAttr('onclick');
        }


function cargamut(iden)
        {
            $(document).ajaxStart(function () {
                //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


                $.blockUI({
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
            $(document).ajaxStop(function () {
                $.unblockUI();

            });
            $("#espaciodetalle").remove();
             $("#espaciotrabajo").append('<div id=\'espaciodetalle\'></div>');
            
            var persona = new Object();
            persona.identificacion = iden;
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            //ajax de los datos de mutualidad
            $.ajax({
                url: urllocal + 'Mutualidad',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.IDENTIFICACION.IDENTIFICACION == 0) {
                        $("#espaciodetalle").append("Persona no esta afiliada a mutualidad");

                       
                        
                    } else {
                        
                        
                        $("#espaciodetalle").append("<h2>Fondo por defunción del asociado</h2><p> Estado actual en el fondo: " + data.ESTADO.DESCRIPCION + " forma de pago: " + data.METODO_PAGO.DESCRIPCION + " fecha de afiliación: " + data.FECHA_INGRESO + " saldo actual: " + data.MONTO + " Observaciones: " + data.OBSERVACIONES + " </br> <strong> <spam style='font-size:small'> Ultima actualización por: " + data.USUARIO.NOMBRE_COMPLETO + " la fecha: " + data.FEC_ULT_ACT + " </spam> </strong> </p><br><img id=\"imgboletamut\" src=\"Boletas/" + data.IDENTIFICACION.IDENTIFICACION + "mut.jpg\" onerror=\"this.src=\'Imagenes/imgboletano.jpg'\"> <hr><paper-button raised id='botonpopbene'  onclick='devuelvetablabeneficiarios(" + persona.identificacion + ")'>Mostrar beneficiarios</paper-button><paper-button raised id='botonpophistorialmut' onclick=\"devuelvetablahistorialdepagos('Mutualidad'," + persona.identificacion + ")\">Mostrar historial</paper-button> ");
                          // devuelvetablabeneficiarios(persona.identificacion);
                           //devuelvetablahistorialdepagos("MUTUALIDAD", persona.identificacion, "mutualidad");
                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    $("#espaciodetalle").append("Error al cargar, favor volver a cargar");
                }
            });
          

        }


function cargasol(iden)
        {
                    $(document).ajaxStart(function () {
                        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


                        $.blockUI({
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
                    $(document).ajaxStop(function () {
                        $.unblockUI();

                    });
                   $("#espaciodetalle").remove();
             $("#espaciotrabajo").append('<div id=\'espaciodetalle\'></div>');
           
                    var persona = new Object();
                    persona.identificacion = iden;
                    persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
                    persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

                    ////ajax de los datos de solidaridad
                    $.ajax({
                        url: urllocal + 'Solidaridad',
                        type: 'POST',
                        dataType: 'json',
                        data: persona,
                        success: function (data, textStatus, xhr) {
                            if (data.IDENTIFICACION.IDENTIFICACION == 0) {
                                $("#espaciodetalle").append("Persona no esta afiliada a solidaridad");
                               
                            } else {
                              
                                $("#espaciodetalle").append("<h2>Fondo por defunción del familiar</h2><p> Estado actual en el fondo: " + data.ESTADO.DESCRIPCION + " forma de pago: " + data.METODO_PAGO.DESCRIPCION + " fecha de afiliación: " + data.FECHA_INGRESO + " saldo actual: " + data.MONTO + " Observaciones: " + data.OBSERVACIONES + "<br/> <strong> <spam style='font-size:small'> Ultima actualización por: " + data.USUARIO.NOMBRE_COMPLETO + " la fecha: " + data.FEC_ULT_ACT + " </spam> </strong> </p><br><img id=\"imgboletasol\" src=\"Boletas/" + data.IDENTIFICACION.IDENTIFICACION + "sol.jpg\" onerror=\"this.src=\'Imagenes/imgboletano.jpg'\"><br><hr><paper-button raised id='botonpopbene'  onclick='devuelvetablafamiliares(" + persona.identificacion + ")'>Mostrar familiares</paper-button><paper-button raised id='botonpophistorialmut' onclick=\"devuelvetablahistorialdepagos('Solidaridad'," + persona.identificacion + ")\">Mostrar historial</paper-button> ");
                                
                                //devuelvetablafamiliares(persona.identificacion);
                                //devuelvetablahistorialdepagos("SOLIDARIDAD", persona.identificacion, "tab-content2");
                            }

                        },
                        error: function (xhr, textStatus, errorThrown) {
                            $("#espaciodetalle").append("Error al cargar, favor volver a cargar");
                        }
                    });
              
                }
 
function devuelvetablabeneficiarios(IDE) 

{

                   $("#espaciodetalle").remove();
             $("#espaciotrabajo").append('<div id=\'espaciodetalle\'></div>');
            


            var persona = new Object();
            persona.identificacion = IDE;
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal + 'Beneficiarios',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                       
                     
                        $('#espaciodetalle').append("<h1>Beneficiarios</h1> <table id='tablabeneficiarios' class='table2'><thead><tr><th scope='col' abbr='Starter'>Identificación del beneficiario</th><th scope='col' abbr='Starter'>Nombre del beneficiario</th><th scope='col' abbr='Starter'>Porcentaje</th><th scope='col' abbr='Starter'>Prioridad</th><th scope='col' abbr='Starter'>Parentezco</th><th scope='col' abbr='Starter'>Ultima modificación</th></tr></thead><tbody>");
                        $('#espaciodetalle').append(" </tbody></table>");
                       
                        for (var ele in data) {
                           
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


                            var newText2 = document.createTextNode(data[ele].IDENTIFICACION_BENEFICIARIO.NOMBRE + ' ' + data[ele].IDENTIFICACION_BENEFICIARIO.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION_BENEFICIARIO.SEGUNDO_APELLIDO);
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

                            var newCell6 = newRow.insertCell(5);

                            var dater = new Date(data[ele].FEC_ULT_ACT);
                            var newText6 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(dater, "YYYY-MM-DD"));
                            newCell6.appendChild(newText6);




                                                   }
                       
                    
  
                    }
                   

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });



            //return tabla.value;


        }

function devuelvetablafamiliares(IDE) {
            
                   $("#espaciodetalle").remove();
             $("#espaciotrabajo").append('<div id=\'espaciodetalle\'></div>');
            
            var persona = new Object();
            persona.identificacion = IDE;
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal + 'Familiares',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                        
                         $('#espaciodetalle').append("<h1>Familiares</h1> <table id='tablafamiliares' class='table2'><thead><tr><th scope='col' abbr='Starter'>Identificación del familiar</th><th scope='col' abbr='Starter'>Nombre del familiar</th><th scope='col' abbr='Starter'>Estado</th><th scope='col' abbr='Starter'>Parentezco</th><th scope='col' abbr='Starter'>Ultima modificación</th></tr></thead><tbody>");
                        $('#espaciodetalle').append(" </tbody></table>");

                        for (var ele in data) {

                            var tableRef = document.getElementById('tablafamiliares').getElementsByTagName('tbody')[0];

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

                            var newCell3 = newRow.insertCell(2);


                            var newText3 = document.createTextNode(data[ele].ESTADO);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);


                            var newText4 = document.createTextNode(data[ele].PARENTEZCO.DESCRIPCION);
                            newCell4.appendChild(newText4);

                       

                            var newCell6 = newRow.insertCell(4);

                            var dater = new Date(data[ele].FEC_ULT_ACT);
                            var newText6 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(dater, "YYYY-MM-DD"));
                            newCell6.appendChild(newText6);



                        }



                    }
                   

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });



            //return tabla.value;


        }
//
        function devuelvetablahistorialdepagos(fondo,ide)
        {
                $("#espaciodetalle").remove();
             $("#espaciotrabajo").append('<div id=\'espaciodetalle\'></div>');
          
            var persona = new Object();
            persona.identificacion = ide;
            persona.fondo = fondo;
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            $.ajax({
                url: urllocal + 'Historial_pagos',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.length == 0) {
                        $('espaciodetalle').append("Sin historial en " + fondo );

                    } else {
                      
                     
                        $('#espaciodetalle').append("<h1>Historial de pagos en " + fondo+ "</h1>  <table id='tablahistorial" + fondo + "' class='table2'><thead><tr><th scope='col' abbr='Starter'>Quincena/Mes/Año</th><th scope='col' abbr='Starter'>ID y serie del pago</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Fecha</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Usuario</th></tr></thead><tbody></tbody></table>");

                        for (var ele in data) {

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

                            var dater = new Date(data[ele].FEC_ULT_ACT);
                            var newText5 = document.createTextNode(dateConvert(dater, "YYYY-MM-DD"));
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





                        }







                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });

         
        }


                function cargaresumen(iden) {
                   
                    var persona = new Object();
                    persona.identificacion = iden;
                    persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
                    persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

                    //ajax de los datos de mutualidad
                $.ajax({
                    url: urllocal + 'Resumenpersona',
                    type: 'POST',
                    dataType: 'text',
                    data: persona,
                    success: function (data, textStatus, xhr) {
                        if (data == '') {
                            $("#espaciotrabajo").append("No hay mas datos sobre esta persona");
                        } else {
                            // alert("Persona afiliada desde: " + data.FECHA_INGRESO);
                            $("#espaciotrabajo").append('<div id=\'espaciodetalle\'></div>');
                            $("#espaciodetalle").append(data);
                            
                        }

                    },
                    error: function (xhr, textStatus, errorThrown) {
                        $("#espaciotrabajo").append("Error al cargar, favor volver a cargar");
                    }
                });
                   
               }

function paraaprobar(){
    
    
      var persona = new Object();
            persona.tipo = '13';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal+ 'Listado',
                // url: 'http://192.168.1.135//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                       
                        
                         document.getElementById('espaciotrabajo').innerHTML ="<h1 id = 'titulo'>Listado de nuevas afiliaciones</h1><paper-button raised id='botonapruebatodasafil' onclick=\"aprobartodasafil()\">Aprobar todas</paper-button><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificación</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Centro funcional</th><th scope='col' abbr='Starter'>Paga afiliación</th><th scope='col' abbr='Starter'>Puesto</th><th scope='col' abbr='Starter'>Departamento</th><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Usuario responsable</th><th scope='col' abbr='Starter'>Aprobar</th></tr></thead><tbody>";
                        $('#espaciotrabajo').append(" </tbody></table>");

                        
                        for (var ele in data) {

                            var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                            var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION)

                            newCell.appendChild(newText);
                        
                            var newCell2 = newRow.insertCell(1);

//
                            var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE +' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO );
                            newCell2.appendChild(newText2);
//
                            var newCell3 = newRow.insertCell(2);


                            var newText3 = document.createTextNode(data[ele].IDENTIFICACION.CENTRO_FUNCIONAL.DESCRIPCION);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);
                            var tipodepago = "";
if(data[ele].AFILIACION.TIPO =="P")
    {
        tipodepago="Por planillas en cuotas de: " + data[ele].AFILIACION.CUOTA;
      var newText4 = document.createTextNode(tipodepago);
    }
                            else
                                {
                                    tipodepago= "En efectivo";
                                  var newText4 = document.createTextNode(tipodepago);   
                                }
                            newCell4.appendChild(newText4);
//
//                       
  var newCell5 = newRow.insertCell(4);
 var newText5 = document.createTextNode(data[ele].IDENTIFICACION.PUESTO);
                       newCell5.appendChild(newText5);  

                        

//
//                            
//                            
                            var newCell7 = newRow.insertCell(5);
                              var newText7 = document.createTextNode(data[ele].IDENTIFICACION.DEPARTAMENTO);
                        
                              newCell7.appendChild(newText7);
//                             //BOTON DE ELIMINAR
//                           
//                            
                            var newCell8 = newRow.insertCell(6);
                              var newText8 = document.createTextNode('Solidaridad');
//                        
                              newCell8.appendChild(newText8);
                            
                             var newCell9 = newRow.insertCell(7);
                             var newText9 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                        
                            newCell9.appendChild(newText9);
                            
                            
                            
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                               btncorreo.setAttribute("onclick", "apruebanuevosol('"+ data[ele].IDENTIFICACION.IDENTIFICACION +"','"+ tipodepago +"','Solidaridad');");
                               btncorreo.id = 'botonapruebanuevosol' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Aprobar";
                            
                            var newCell11 = newRow.insertCell(8);
                            
                              newCell11.appendChild(btncorreo);
                               
//                                 }
                        }
                        
                          var persona = new Object();
            persona.tipo = '14';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal+ 'Listado',
                // url: 'http://192.168.1.135//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {

                        for (var ele in data) {

                            var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                            var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION)

                            newCell.appendChild(newText);
                        
                            var newCell2 = newRow.insertCell(1);

//
                            var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE +' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO );
                            newCell2.appendChild(newText2);
//
                            var newCell3 = newRow.insertCell(2);


                            var newText3 = document.createTextNode(data[ele].IDENTIFICACION.CENTRO_FUNCIONAL.DESCRIPCION);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

   var tipodepago = "";
if(data[ele].AFILIACION.TIPO =="P")
    {
        tipodepago="Por planillas en cuotas de: " + data[ele].AFILIACION.CUOTA;
      var newText4 = document.createTextNode(tipodepago);
    }
                            else
                                {
                                    tipodepago= "En efectivo";
                                  var newText4 = document.createTextNode(tipodepago);   
                                }
                            newCell4.appendChild(newText4);
//
//                       
  var newCell5 = newRow.insertCell(4);
 var newText5 = document.createTextNode(data[ele].IDENTIFICACION.PUESTO);
                       newCell5.appendChild(newText5);  

                        

//
//                            
//                            
                            var newCell7 = newRow.insertCell(5);
                              var newText7 = document.createTextNode(data[ele].IDENTIFICACION.DEPARTAMENTO);
                        
                              newCell7.appendChild(newText7);
//                             //BOTON DE ELIMINAR
//                           
//                            
                            var newCell8 = newRow.insertCell(6);
                              var newText8 = document.createTextNode('Mutualidad');
//                        
                              newCell8.appendChild(newText8);
                            
                             var newCell9 = newRow.insertCell(7);
                             var newText9 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                        
                            newCell9.appendChild(newText9);
                            
                            
                            
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                             btncorreo.setAttribute("onclick", "apruebanuevomut('"+ data[ele].IDENTIFICACION.IDENTIFICACION +"','"+ tipodepago +"','Mutualidad');");
                               btncorreo.id = 'botonapruebanuevomut' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Aprobar";
                            
                            var newCell11 = newRow.insertCell(8);
                            
                              newCell11.appendChild(btncorreo);
                               
//                                 }
                        }
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                   
                    }
                  
$('#tabla').dataTable({
        "scrollY":        "500px",
        "scrollCollapse": true,
        "paging":         false
    });
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
    
                        
                        
                        
                        
                        
                        
                        
                        
         
                    }
                            

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
    
    
}
function pendientecambioestado(){
    
    
      var persona = new Object();
            persona.tipo = '17';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal+ 'Listado',
                // url: 'http://192.168.1.135//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                       
                        
                         document.getElementById('espaciotrabajo').innerHTML ="<h1 id = 'titulo'>Listado de cambios de estado</h1><paper-button raised id='botonapruebatodascambio' onclick=\"aprobartodascambio()\">Aprobar todas</paper-button><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificación</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Nuevo estado</th><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Anotaciones</th><th scope='col' abbr='Starter'>Usuario responsable y fecha del cambio</th><th scope='col' abbr='Starter'>Aprobar</th></tr></thead><tbody>";
                        $('#espaciotrabajo').append(" </tbody></table>");

                        
                        for (var ele in data) {

                            var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                            var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION)

                            newCell.appendChild(newText);
                        
                            var newCell2 = newRow.insertCell(1);

//
                            var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE +' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO );
                            newCell2.appendChild(newText2);
//
                            var newCell3 = newRow.insertCell(2);


                            var newText3 = document.createTextNode(data[ele].ESTADO.DESCRIPCION);
                            newCell3.appendChild(newText3);
                             var newCell3 = newRow.insertCell(3);


                            var newText3 = document.createTextNode('Solidaridad');
                            newCell3.appendChild(newText3);
                            
                            
                            var newCell3 = newRow.insertCell(4);


                            var newText3 = document.createTextNode(data[ele].OBSERVACIONES);
                            newCell3.appendChild(newText3);
                            var dater = new Date(data[ele].FEC_ULT_ACT);
                             var newCell9 = newRow.insertCell(5);
                             var newText9 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(dater, "YYYY-MM-DD"));
                        
                            newCell9.appendChild(newText9);
                            
                            
                            
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                               btncorreo.setAttribute("onclick", "apruebacambiosol('"+ data[ele].IDENTIFICACION.IDENTIFICACION +"','"+ data[ele].ESTADO.ID +"','Solidaridad');");
                               btncorreo.id = 'botonapruebacambiosol' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Aprobar";
                            
                            var newCell11 = newRow.insertCell(6);
                            
                              newCell11.appendChild(btncorreo);
                               
//                                 }
                        }
                        
                        var persona = new Object();
            persona.tipo = '18';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal+ 'Listado',
                // url: 'http://192.168.1.135//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                       
                        
                        for (var ele in data) {

                            var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                            var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION)

                            newCell.appendChild(newText);
                        
                            var newCell2 = newRow.insertCell(1);

//
                            var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE +' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO );
                            newCell2.appendChild(newText2);
//
                            var newCell3 = newRow.insertCell(2);


                            var newText3 = document.createTextNode(data[ele].ESTADO.DESCRIPCION);
                            newCell3.appendChild(newText3);
                             var newCell3 = newRow.insertCell(3);


                            var newText3 = document.createTextNode('Mutualidad');
                            newCell3.appendChild(newText3);
                             var newCell3 = newRow.insertCell(4);


                            var newText3 = document.createTextNode(data[ele].OBSERVACIONES);
                            newCell3.appendChild(newText3);
                            var dater = new Date(data[ele].FEC_ULT_ACT);
                             var newCell9 = newRow.insertCell(5);
                             var newText9 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(dater, "YYYY-MM-DD"));
                        
                            newCell9.appendChild(newText9);
                            
                            
                            
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                            btncorreo.setAttribute("onclick", "apruebacambiomut('"+ data[ele].IDENTIFICACION.IDENTIFICACION +"','"+ data[ele].ESTADO.ID +"','Mutualidad');");
                               btncorreo.id = 'botonapruebacambiosol' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Aprobar";
                            
                            var newCell11 = newRow.insertCell(6);
                                 newCell11.appendChild(btncorreo);
//                                 }
                        }
                        
                       
                        
                        
                        
                                  var persona = new Object();
            persona.tipo = '19';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal+ 'Listado',
                // url: 'http://192.168.1.135//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                       
                        
                        for (var ele in data) {

                            var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                            var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION)

                            newCell.appendChild(newText);
                        
                            var newCell2 = newRow.insertCell(1);

//
                            var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE +' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO );
                            newCell2.appendChild(newText2);
//
                            var newCell3 = newRow.insertCell(2);


                            var newText3 = document.createTextNode(data[ele].ESTADO.DESCRIPCION);
                            newCell3.appendChild(newText3);
                             var newCell3 = newRow.insertCell(3);


                            var newText3 = document.createTextNode('Asobiso');
                            newCell3.appendChild(newText3);
                             var newCell3 = newRow.insertCell(4);


                            var newText3 = document.createTextNode(data[ele].OBSERVACIONES);
                            newCell3.appendChild(newText3);
                            var dater = new Date(data[ele].FEC_ULT_ACT);
                             var newCell9 = newRow.insertCell(5);
                             var newText9 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(dater, "YYYY-MM-DD"));
                        
                            newCell9.appendChild(newText9);
                            
                            
                            
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                               btncorreo.setAttribute("onclick", "apruebacambioaso('"+ data[ele].IDENTIFICACION.IDENTIFICACION +"','"+ data[ele].ESTADO.ID +"','Asociacion');");
                               btncorreo.id = 'botonapruebacambiosol' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Aprobar";
                            
                            var newCell11 = newRow.insertCell(6);
                                 newCell11.appendChild(btncorreo);
//                                 }
                        }
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                   $('#tabla').dataTable({
        "scrollY":        "500px",
        "scrollCollapse": true,
        "paging":         false
    });
                    }
                  

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
                    }
                  

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
                        
                        
                        
                        
                        
                        
                        
                        
         
                    }
                  

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
    
    
}

//
//
function configuracionhtml(){
    
    
      document.getElementById('espaciotrabajo').innerHTML =  "<h2>Configuración de cuenta</h2>Para cambiar la contraseña actual:<input  class='form-control' placeholder='Contraseña actual' id='passactual' type='password'/><input  class='form-control' placeholder='Nueva contraseña' id='passnueva' type='password'/><input  class='form-control' placeholder='Nueva contraseña, corrobora' id='passnueva2' onkeyup=\"calculaigualdad()\" type='password'/><paper-button raised id='btncambiacontra' onclick='cambiarcontra()'  disabled>Guardar</paper-button><hr>Para cambiar la fotografía:<input id='inputFilefoto' type='file' /><paper-button raised id='botonpophistorialmut' onclick='cambiarfoto()'>Cambiar la fotografia</paper-button>";
      
}
//
//
function busquedaxmesyannohtml(){
    
    document.getElementById('espaciotrabajo').innerHTML = "<h2>Búsqueda de afiliados, por mes y año</h2>Digite el número de mes:<input  class='form-control' placeholder='Mes' id='mes' type='number'/>Digite el número de año<input  class='form-control' placeholder='Año' id='anno' type='number'/><paper-button raised id='botonpophistorialmut' onclick='busquedaxmesyanno()'>Buscar</paper-button>";
    
    
}
//
function busquedaxmesyanno()
{
    
    if((document.getElementById('anno').value != '') & (document.getElementById('mes').value != ''))
    {
     $("#espaciodetalle").remove();
             $("#espaciotrabajo").append('<div id=\'espaciodetalle\'></div>');
            


            var persona = new Object();
             persona.tipo = '26';
persona.anno = document.getElementById('anno').value;
persona.mes = document.getElementById('mes').value;
persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal + 'Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                       
                     
                    
                          $('#espaciodetalle').append("<h1 id = 'titulo'>Listado de afiliaciones según mes y ano</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificación</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Estado</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Fecha de ingreso</th><th scope='col' abbr='Starter'>Observaciones</th><th scope='col' abbr='Starter'>Usuario</th><th scope='col' abbr='Starter'>Fondo</th></tr></thead><tbody>");
                        $('#espaciodetalle').append("</tbody></table>");

                        
                        for (var ele in data) {

                            var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                            var newText = document.createTextNode(data[ele].Identificación)

                            newCell.appendChild(newText);
//                        
                            var newCell2 = newRow.insertCell(1);

//
                            var newText2 = document.createTextNode(data[ele].Nombre + ' ' + data[ele]['Primer apellido'] + ' ' + data[ele]['Segundo apellido']);
                            newCell2.appendChild(newText2);
////
                            var newCell3 = newRow.insertCell(2);


                            var newText3 = document.createTextNode(data[ele].Estado);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

      var newText4 = document.createTextNode(data[ele]['Metodo de pago']);
                            newCell4.appendChild(newText4);
////
////                       
  var newCell5 = newRow.insertCell(4);
 var newText5 = document.createTextNode(data[ele]['Fecha de ingreso']);
                       newCell5.appendChild(newText5);  
//                            
                              var newCell6 = newRow.insertCell(5);
 var newText6 = document.createTextNode(data[ele].Observaciones);
                       newCell6.appendChild(newText6);  
                                var newCell7 = newRow.insertCell(6);
 var newText7 = document.createTextNode(data[ele].Usuario);
                       newCell7.appendChild(newText7);  
//                            
                              var newCell8 = newRow.insertCell(7);
 var newText8 = document.createTextNode(data[ele].Fondo);
                       newCell8.appendChild(newText8);  
//                            
                            
                        }
                        
                   $('#tabla').dataTable({
        "scrollY":        "500px",
        "scrollCollapse": true,
        "paging":         false,
                       dom: 'Bfrtip',
        buttons: [
            'print'
        ]
    });
                    
                
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                alert(xhr);
            }
        });
               
                    

            //return tabla.value;

    }else
        {
            alert("Rellene ambos campos");
            
        }
    
    
}

function pendienteprestamoequipo(){
    
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
      var persona = new Object();
            persona.tipo = '28';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal+ 'Listado',
                // url: 'http://192.168.1.135//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                       
                        
                         document.getElementById('espaciotrabajo').innerHTML ="<h1 id = 'titulo'>Listado de Equipos a prestar</h1><paper-button raised id='botonapruebatodasequipo' onclick=\"aprobartodasequipo()\">Aprobar todas</paper-button><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificación</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Activo(Equipo)</th><th scope='col' abbr='Starter'>Plazo</th><th scope='col' abbr='Starter'>Fecha del prestamo</th><th scope='col' abbr='Starter'>Usuario responsable y fecha del cambio</th><th scope='col' abbr='Starter'>Aprobar</th></tr></thead><tbody>";
                        $('#espaciotrabajo').append(" </tbody></table>");

                        
                        for (var ele in data) {

                            var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                            var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION)

                            newCell.appendChild(newText);
                        
                            var newCell2 = newRow.insertCell(1);

//
                            var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE +' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO );
                            newCell2.appendChild(newText2);
//
                            var newCell3 = newRow.insertCell(2);


                            var newText3 = document.createTextNode(data[ele].NUMERO_ACTIVO.DESCRIPCION);
                            newCell3.appendChild(newText3);
                             var newCell3 = newRow.insertCell(3);


                            var newText3 = document.createTextNode(data[ele].PLAZO_INICIAL_MESES);
                            newCell3.appendChild(newText3);
                            
                            
                            var dater = new Date(data[ele].FEC_ULT_ACT);
                             var newCell9 = newRow.insertCell(4);
                             var newText9 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(dater, "YYYY-MM-DD"));
                        
                            newCell9.appendChild(newText9);
                            var dater = new Date(data[ele].FECHA_PRESTAMO);
                              var newCell9 = newRow.insertCell(5);
                              var newText9 = document.createTextNode(dateConvert(dater, "YYYY-MM-DD"));
                        
                            newCell9.appendChild(newText9);
                            
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                               btncorreo.setAttribute("onclick", "apruebaprestamoequipo('"+ data[ele].IDENTIFICACION.IDENTIFICACION +"','"+ data[ele].NUMERO_ACTIVO.NUMERO_ACTIVO +"','"+ data[ele].FECHA_PRESTAMO +"');");
                               btncorreo.id = 'botonapruebaprestamoequipo' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Aprobar";
                            
                            var newCell11 = newRow.insertCell(6);
                            
                              newCell11.appendChild(btncorreo);
                               
//                                 }
                        }
                        
                 
                        
                        
                        
                        
                        
                        
                                   $('#tabla').dataTable({
        "scrollY":        "500px",
        "scrollCollapse": true,
        "paging":         false
    });
                        
         
                    }
                  

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
    
    
}

function pendienteayuda()
{
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
    
      var persona = new Object();
            persona.tipo = '29';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal+ 'Listado',
                // url: 'http://192.168.1.135//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                       
                        
                         document.getElementById('espaciotrabajo').innerHTML ="<h1 id = 'titulo'>Listado de Ayudas pendientes</h1><paper-button raised id='botonapruebatodasayudas' onclick=\"aprobartodasayudas()\">Aprobar todas</paper-button><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificación</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Descripción</th><th scope='col' abbr='Starter'>Monto total</th><th scope='col' abbr='Starter'>Cuotas y monto</th><th scope='col' abbr='Starter'>Consecutivo</th><th scope='col' abbr='Starter'>Usuario responsable y fecha del cambio</th><th scope='col' abbr='Starter'>Aprobar</th></tr></thead><tbody>";
                        $('#espaciotrabajo').append(" </tbody></table>");

                        
                        for (var ele in data) {

                            var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                            var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION)

                            newCell.appendChild(newText);
                        
                            var newCell2 = newRow.insertCell(1);

//
                            var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE +' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO );
                            newCell2.appendChild(newText2);
//
                            var newCell3 = newRow.insertCell(2);


                            var newText3 = document.createTextNode(data[ele].DESCRIPCION_AYUDA);
                            newCell3.appendChild(newText3);
                             var newCell3 = newRow.insertCell(3);


                            var newText3 = document.createTextNode(data[ele].MONTO_TOTAL);
                            newCell3.appendChild(newText3);
                            
                            
                            
                             var newCell9 = newRow.insertCell(4);
                             var newText9 = document.createTextNode(data[ele].PERIOCIDAD + ' ' + data[ele].CUOTA_POR_PERIODO);
                        
                            newCell9.appendChild(newText9);
                            
                              var newCell9 = newRow.insertCell(5);
                             var newText9 = document.createTextNode(data[ele].CONSECUTIVO_AYUDA);
                        
                            newCell9.appendChild(newText9);
                            var dater = new Date(data[ele].FEC_ULT_ACT);
                             var newCell9 = newRow.insertCell(6);
                             var newText9 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(dater, "YYYY-MM-DD"));
                        
                            newCell9.appendChild(newText9);
                            
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                               btncorreo.setAttribute("onclick", "apruebaayuda('"+ data[ele].CONSECUTIVO_AYUDA +"');");
                               btncorreo.id = 'botonapruebaayuda' + data[ele].CONSECUTIVO_AYUDA;
                               btncorreo.value="Aprobar";
                            
                            var newCell11 = newRow.insertCell(7);
                            
                              newCell11.appendChild(btncorreo);
                               

                        }

                        
                                   $('#tabla').dataTable({
        "scrollY":        "500px",
        "scrollCollapse": true,
        "paging":         false
    });
                        
         
                    }
                  
                
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
    
    
}


function pendientedefsol()
{
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
    
      var persona = new Object();
            persona.tipo = '31';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal+ 'Listado',
                // url: 'http://192.168.1.135//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                       
                        
                         document.getElementById('espaciotrabajo').innerHTML ="<h1 id = 'titulo'>Listado de defunciones de solidaridad pendientes</h1><paper-button raised id='botonapruebatodasayudas' onclick=\"aprobartodasdefsol()\">Aprobar todas</paper-button><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificación y nombre del afiliado</th><th scope='col' abbr='Starter'>Identificación y nombre del fallecido</th><th scope='col' abbr='Starter'>Fecha defunción</th><th scope='col' abbr='Starter'>Parentezco</th><th scope='col' abbr='Starter'>Usuario responsable y fecha del cambio</th><th scope='col' abbr='Starter'>Aprobar</th></tr></thead><tbody>";
                        $('#espaciotrabajo').append(" </tbody></table>");

                        
                        for (var ele in data) {

                            var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                             var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION.IDENTIFICACION.NOMBRE+ ' ' + data[ele].IDENTIFICACION.IDENTIFICACION.PRIMER_APELLIDO+ ' ' + data[ele].IDENTIFICACION.IDENTIFICACION.SEGUNDO_APELLIDO);


                            newCell.appendChild(newText);
                        
                            var newCell2 = newRow.insertCell(1);

//
                                 var newText2 = document.createTextNode(data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.NOMBRE+ ' ' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.PRIMER_APELLIDO+ ' ' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.SEGUNDO_APELLIDO);
                            newCell2.appendChild(newText2);
//
                            var newCell3 = newRow.insertCell(2);

                            var dater = new Date(data[ele].FECHA_DEFUNCION);
                            var newText3 = document.createTextNode(dateConvert(dater, "YYYY-MM-DD"));
                            newCell3.appendChild(newText3);
                             var newCell3 = newRow.insertCell(3);


                            var newText3 = document.createTextNode(data[ele].IDENTIFICACION_FAMILIAR.PARENTEZCO.DESCRIPCION);
                            newCell3.appendChild(newText3);
                            
                            
                            var newCell3 = newRow.insertCell(4);

                            var dater = new Date(data[ele].FEC_ULT_ACT);
                            var newText3 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' +dateConvert(dater, "YYYY-MM-DD"));
                            newCell3.appendChild(newText3);
                             
                            
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                               btncorreo.setAttribute("onclick", "apruebadefsol('"+ data[ele].IDENTIFICACION.IDENTIFICACION.IDENTIFICACION +"','"+ data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.IDENTIFICACION +"');");
                               btncorreo.id = 'botonapruebadefsol' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.IDENTIFICACION;
                               btncorreo.value="Aprobar";
                            
                            var newCell11 = newRow.insertCell(5);
                            
                              newCell11.appendChild(btncorreo);
                               

                        }

                        
                                   $('#tabla').dataTable({
        "scrollY":        "500px",
        "scrollCollapse": true,
        "paging":         false
    });
                        
         
                    }
                  
                
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
    
    
}




function pendientedefmut()
{
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
    
      var persona = new Object();
            persona.tipo = '32';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal+ 'Listado',
                // url: 'http://192.168.1.135//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                       
                        
                        document.getElementById('espaciotrabajo').innerHTML = "<h1 id = 'titulo'>Listado de defunciones de mutualidad pendientes</h1><paper-button raised id='botonapruebatodasdefmut' onclick=\"aprobartodasdefmut()\">Aprobar todas</paper-button><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificación y nombre del afiliado</th><th scope='col' abbr='Starter'>Fecha defunción</th><th scope='col' abbr='Starter'>Beneficiario(s)</th><th scope='col' abbr='Starter'>Usuario responsable y fecha del cambio</th><th scope='col' abbr='Starter'>Aprobar</th></tr></thead><tbody>";
                        $('#espaciotrabajo').append(" </tbody></table>");

                        
                        for (var ele in data) {

                            var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                             var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION + ' ' + data[ele].IDENTIFICACION.NOMBRE+ ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO+ ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO);



                         
                            newCell.appendChild(newText);
//
                            var newCell3 = newRow.insertCell(1);

                            var dater = new Date(data[ele].FECHA_DEFUNCION);
                            var newText3 = document.createTextNode(dateConvert(dater, "YYYY-MM-DD"));
                            newCell3.appendChild(newText3);
                             var newCell3 = newRow.insertCell(2);


                            var newText3 = document.createTextNode(data[ele].BENEFICIARIOS);
                            newCell3.appendChild(newText3);
                            
                            var newCell3 = newRow.insertCell(3);

                            var dater = new Date(data[ele].FEC_ULT_ACT);
                            var newText3 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(dater, "YYYY-MM-DD"));
                            newCell3.appendChild(newText3);
                            
                             
                            
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                               btncorreo.setAttribute("onclick", "apruebadefmut('"+ data[ele].IDENTIFICACION.IDENTIFICACION  +"');");
                               btncorreo.id = 'botonapruebadefmut' + data[ele].IDENTIFICACION.IDENTIFICACION ;
                               btncorreo.value="Aprobar";
                            
                            var newCell11 = newRow.insertCell(4);
                            
                              newCell11.appendChild(btncorreo);
                               

                        }

                        
                                   $('#tabla').dataTable({
        "scrollY":        "500px",
        "scrollCollapse": true,
        "paging":         false
    });
                        
         
                    }
                  
                
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
    
    
}


function pendientebeca()
{
    
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
      var persona = new Object();
            persona.tipo = '30';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal+ 'Listado',
                // url: 'http://192.168.1.135//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                       
                        
                         document.getElementById('espaciotrabajo').innerHTML ="<h1 id = 'titulo'>Listado de Becas pendientes</h1><paper-button raised id='botonapruebatodasbecas' onclick=\"aprobartodasbecas()\">Aprobar todas</paper-button><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificación</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Descripción</th><th scope='col' abbr='Starter'>Monto total</th><th scope='col' abbr='Starter'>Cuotas y monto</th><th scope='col' abbr='Starter'>Consecutivo</th><th scope='col' abbr='Starter'>Usuario responsable y fecha del cambio</th><th scope='col' abbr='Starter'>Aprobar</th></tr></thead><tbody>";
                        $('#espaciotrabajo').append(" </tbody></table>");

                        
                        for (var ele in data) {

                            var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                            var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION)

                            newCell.appendChild(newText);
                        
                            var newCell2 = newRow.insertCell(1);

//
                            var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE +' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO );
                            newCell2.appendChild(newText2);
//
                            var newCell3 = newRow.insertCell(2);


                            var newText3 = document.createTextNode(data[ele].DESCRIPCION_BECA);
                            newCell3.appendChild(newText3);
                             var newCell3 = newRow.insertCell(3);


                            var newText3 = document.createTextNode(data[ele].MONTO_TOTAL);
                            newCell3.appendChild(newText3);
                            
                            
                            
                             var newCell9 = newRow.insertCell(4);
                             var newText9 = document.createTextNode(data[ele].PERIOCIDAD + ' ' + data[ele].CUOTA_POR_PERIODO);
                        
                            newCell9.appendChild(newText9);
                            
                              var newCell9 = newRow.insertCell(5);
                             var newText9 = document.createTextNode(data[ele].CONSECUTIVO_BECA);
                        
                            newCell9.appendChild(newText9);
                            
                             var newCell9 = newRow.insertCell(6);
                             var newText9 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + data[ele].FEC_ULT_ACT);
                        
                            newCell9.appendChild(newText9);
                            
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                               btncorreo.setAttribute("onclick", "apruebaayuda('"+ data[ele].CONSECUTIVO_BECA +"');");
                               btncorreo.id = 'botonapruebaayuda' + data[ele].CONSECUTIVO_BECA;
                               btncorreo.value="Aprobar";
                            
                            var newCell11 = newRow.insertCell(7);
                            
                              newCell11.appendChild(btncorreo);
                               

                        }

                        
                                   $('#tabla').dataTable({
        "scrollY":        "500px",
        "scrollCollapse": true,
        "paging":         false
    });
                        
         
                    }
                  
                
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
    
    
}





function calculaigualdad()
{
    if(document.getElementById("passnueva").value != "")
        {
    if(document.getElementById("passnueva").value == document.getElementById("passnueva2").value)
        {
              $('#btncambiacontra').removeAttr("disabled");
        }
            else{
                $('#btncambiacontra').disabled = true;
                }
    
        }
    else
        {
             document.getElementById("passnueva2").value='';
            alert("Rellene el primer campo de la nueva contraseña");
        }
}


function cambiarfoto() {
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
            var files = $("#inputFilefoto").get(0).files;
            if (files.length > 0) {

                var data = new FormData();
                files[0].name = localStorage.getItem("USUARIOJUNTALOGUEADO").IDENTIFICACION;
                data.append("usrid", JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID);
                data.append("pssw", JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA);

                for (i = 0; i < files.length; i++) {
                    data.append("file" + i, files[i]);
                }
                data.append('ID', JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).IDENTIFICACION);
                data.append('TIPO', 'FOTOGRAFIAPERSONA');
                $.ajax({
                    type: "POST",
                    url: urllocal+ "file",
                    // datatype:'json',
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function (result) {
                        if (result) {
alert("Fotografía cambiada");
    window.location.href="iniciojunta.html";                        
                        }
                    }
                });
            }
       else
           {alert("Seleccione una fotografía primero");
           }
        }


function cambiarcontra()
{
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
    if((document.getElementById("passactual").value != '') & (document.getElementById("passnueva").value != '') & (document.getElementById("passnueva2").value != ''))
        {
   
            
             var persona = new Object();
            persona.login = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).LOGIN;
            persona.id = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.nuevacontra = document.getElementById("passnueva2").value;
            persona.contrasena = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;
persona.cambiacontrasena="1";
        //ajax de los datos de mutualidad
persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            $.ajax({
                url: urllocal + 'Usuario',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                   alert("Contraseña cambiada, debera volver a ingresar con la nueva contraseña");
 localStorage.setItem("USUARIOJUNTALOGUEADO",null);
    
    window.location.href="Loginjunta.html";
                },
                error: function (xhr, textStatus, errorThrown) {
                   
                }
            });
            
     
        }
    else
        {
            alert('Debe rellenar todos los campos');
            
        }
}

function imprimir(aimprimir){
  var objeto=document.getElementById(aimprimir);  //obtenemos el objeto a imprimir
  var ventana=window.open('','_blank');  //abrimos una ventana vacía nueva
  ventana.document.write(objeto.innerHTML);  //imprimimos el HTML del objeto en la nueva ventana
  ventana.document.close();  //cerramos el documento
  ventana.print();  //imprimimos la ventana
  ventana.close();  //cerramos la ventana
}

function apruebanuevosol(uno,dos,tres)
{
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
     var persona = new Object();
            persona.fondo = tres;
persona.idasociado=uno;
    persona.tipor=dos;
    persona.tipo = "7";
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal + 'Apruebajunta',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                    
                    } else {
                        alert("Afiliado aprobado");
                        paraaprobar();
                    }}});
    
}
function apruebanuevomut(uno,dos,tres)
{
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
     var persona = new Object();
            persona.fondo = tres;
persona.idasociado=uno;
    persona.tipor=dos;
    persona.tipo = "7";
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal + 'Apruebajunta',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                    
                    } else {
                        alert("Afiliado aprobado");
                        paraaprobar();
                    }}});
    
}

function aprobartodasafil()
{
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
    var persona = new Object();
            persona.tipo = '13';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal+ 'Listado',
                // url: 'http://192.168.1.135//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                       
                        
                          for (var ele in data) {
                              
                              var persona = new Object();
                              persona.fondo = "Solidaridad";
persona.idasociado=data[ele].IDENTIFICACION.IDENTIFICACION;
                              
                               var tipodepago = "";
if(data[ele].AFILIACION.TIPO =="P")
    {
        tipodepago="Por planillas en cuotas de: " + data[ele].AFILIACION.CUOTA;

    }
                            else
                                {
                                    tipodepago= "En efectivo";
                              
                                }
    persona.tipor=tipodepago;
    persona.tipo = "7";
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal + 'Apruebajunta',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                    
                    } else {
                      
                       
                    }}});
                          }
                         
    
    
                        
         
                    }
                            

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
    
            var persona = new Object();
            persona.tipo = '14';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal + 'Listado',
                // url: 'http://192.168.1.135//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {



                        for (var ele in data) {

                            var persona = new Object();
                            persona.fondo = "Mutualidad";
                            persona.idasociado = data[ele].IDENTIFICACION.IDENTIFICACION;

                            var tipodepago = "";
                            if (data[ele].AFILIACION.TIPO == "P") {
                                tipodepago = "Por planillas en cuotas de: " + data[ele].AFILIACION.CUOTA;

                            }
                            else {
                                tipodepago = "En efectivo";

                            }
                            persona.tipor = tipodepago;
                            persona.tipo = "7";
                            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
                            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

                            var tabla;
                            $.ajax({
                                url: urllocal + 'Apruebajunta',
                                type: 'POST',
                                dataType: 'json',
                                data: persona,
                                success: function (data, textStatus, xhr) {
                                    if (data.ID == 0) {

                                    } else {


                                    }
                                }
                            });
                        }

                        alert("Todas las afiliaciones fueron aprobadas, tardara un poco en actualizarce el listado, favor recargar el mismo si desea verificar");
                        paraaprobar();
                    }


                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
    
    
}
function apruebacambioaso(uno,dos,tres)
{
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
    var persona = new Object();
            persona.fondo = tres;
persona.idsocio=uno;
    persona.estado=dos;
    persona.tipo = "3";
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal + 'Apruebajunta',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                    
                    } else {
                        alert("Cambio aprobado");
                        pendientecambioestado();
                    }}});
    
}
function apruebacambiosol(uno,dos,tres)
{
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
    var persona = new Object();
            persona.fondo = tres;
persona.idsocio=uno;
    persona.estado=dos;
    persona.tipo = "3";
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal + 'Apruebajunta',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                    
                    } else {
                        alert("Cambio aprobado");
                        pendientecambioestado();
                    }}});
    
}
function apruebacambiomut(uno,dos,tres)
{
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
    var persona = new Object();
            persona.fondo = tres;
persona.idsocio=uno;
    persona.estado=dos;
    persona.tipo = "3";
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal + 'Apruebajunta',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                    
                    } else {
                        alert("Cambio aprobado");
                        pendientecambioestado();
                    }}});
    
}

function aprobartodascambio()
{
    $(document).ajaxStart(function () {
        //$.blockUI({ message: '<img width="100px" heigth ="100px" src="imagenes/cargando5.gif" /><hr>Un segundo..., talvez dos...' });


        $.blockUI({
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
    $(document).ajaxStop(function () {
        $.unblockUI();

    });
     var persona = new Object();
            persona.tipo = '17';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal+ 'Listado',
                // url: 'http://192.168.1.135//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                              for (var ele in data) {
                                  
                                  var persona = new Object();
                                  persona.fondo = "Fondo pero defunción del familiar";
persona.idsocio=data[ele].IDENTIFICACION.IDENTIFICACION;
    persona.estado=data[ele].ESTADO.ID;
    persona.tipo = "3";
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal + 'Apruebajunta',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                    
                    } else {
                     
                       
                    }}});
                              }
                        
                        var persona = new Object();
            persona.tipo = '18';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal+ 'Listado',
                // url: 'http://192.168.1.135//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                              for (var ele in data) {
                                  
                                  var persona = new Object();
                                  persona.fondo = "Fondo pero defunción del asociado";
persona.idsocio=data[ele].IDENTIFICACION.IDENTIFICACION;
    persona.estado=data[ele].ESTADO.ID;
    persona.tipo = "3";
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOJUNTALOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal + 'Apruebajunta',
        	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ��:vsK"����