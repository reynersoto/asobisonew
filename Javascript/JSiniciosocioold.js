//$(document).ajaxStart(function () {
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
//$(document).ajaxStop(function () {
//    $("#loading").html("");
//    $("#loading").removeAttr("style");
//});
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
var urllocal='api/';

//TODA LA FUNCIONALIDAD DEL MODULO DEL ASOCIADO, FALTA PONER QUE A CADA LLAMADO A LA API LE PASE LA CONTRASE;A Y EL CORREO PARA VALIDAR SU USO
$(document).ready(function ()
{
    document.title = 'Datos de ' + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).SEGUNDO_APELLIDO;
});
        function iniciar()
      {
       if(JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")) == null)
                {
                    alert('Inicie sesion');
                      location.href = "/loginsocio.html";
                    
                }
           
          
       document.getElementById("titulonombreasociado").innerHTML = '<h3>' + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).IDENTIFICACION + ' - '+ JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).SEGUNDO_APELLIDO + '</h3>';
     
      document.getElementById("espaciodatospersonales").innerHTML = "</br><br/><br/></br><br/><br/></br><br/><br/></br><br/><br/>Fecha de nacimiento: " + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).FECHA_NACIMIENTO + " </br><br/>Dirección: " +   JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).DIRECCION + "</br><br/>Teléfono(s): " + 
 JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).TEL1 + " - " + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).TEL2 + " - " +
           JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).CEL + " </br><br/>Correo electrónico principal: " +
          JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).EMAIL1 + " </br><br/>Correo electrónico secundario: " +
          JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).EMAIL2 + " </br><br/>Centro funcional: " +
           JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).CENTRO_FUNCIONAL.NUMERO + ' ' + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).CENTRO_FUNCIONAL.DESCRIPCION + " </br><br/>Departamento y puesto: " +
   JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).DEPARTAMENTO + ' - ' + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).PUESTO + " </br><br/>Fecha de ingreso al ICE: " + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).FECHA_INGRESO_ICE + '<hr><p><strong> Datos facilitados por el departamento de recursos humanos del ICE</strong></p>'     
          ;
          document.getElementById("imgasociado").src= 'Fotos/' + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).IDENTIFICACION + '.jpg';
      cargamut(JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).IDENTIFICACION);
       cargaaso(JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).IDENTIFICACION);
       cargasol(JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).IDENTIFICACION);
       cargadocs();
    
      }
        
        function cargamut(iden)
        {
           
            var persona = new Object();
            persona.identificacion = iden;
            persona.usrid = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID;
            persona.pssw = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.CONTRASENA;

            //ajax de los datos de mutualidad
            $.ajax({
                url: urllocal + 'Mutualidad',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.IDENTIFICACION.IDENTIFICACION == 0) {
                        $("#espaciodatosmutualidad").append("Persona no esta afiliada a mutualidad");

                    

                        
                    } else {
                        
                         
                       // alert("Persona afiliada desde: " + data.FECHA_INGRESO);
                        $("#espaciodatosmutualidad").append("<h2>PROGRAMA BENEFICIO POR DEFUNCIÓN DEL AFILIADO (PBDA)</h2><br><img id=\"imgboletamut\" src=\"Boletas/" + data.IDENTIFICACION.IDENTIFICACION + "mut.jpg\" onerror=\"this.src=\'Imagenes/imgboletano.jpg'\"><br><p> Estado actual en el fondo: " + data.ESTADO.DESCRIPCION + " <br> Forma de pago: " + data.METODO_PAGO.DESCRIPCION + "<br> Fecha de afiliación: " + data.FECHA_INGRESO + "<br> Saldo actual: " + data.MONTO + " </spam> </strong> </p><hr><paper-button raised id='botonpopbene'  onclick='muestradivbn()'>Mostrar beneficiarios</paper-button><paper-button raised id='botonpophistorialmut' onclick=' muestradivhistorial(\"mutualidad\")'>Mostrar historial de pagos</paper-button> ");
                          devuelvetablabeneficiarios(iden);
                          devuelvetablahistorialdepagos("MUTUALIDAD", iden, "mutualidad","espaciodatosmutualidad");
                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    $("#espaciodatosmutualidad").append("Error al cargar, favor volver a cargar");
                }
            });
          
        }

  function cargaaso(iden)
        {
          
            var persona = new Object();
            persona.identificacion = iden;
            persona.usrid = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID;
            persona.pssw = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.CONTRASENA;
            //ajax de los datos de asobiso
            $.ajax({
                url: urllocal + 'Asobiso',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.IDENTIFICACION.IDENTIFICACION == 0) {
                        $("#espaciodatosasobiso").append("No afiliado a asobiso")
                    } else {
                      
                        $("#espaciodatosasobiso").append("<h2>Asobiso</h2><br><p> Estado actual en el fondo: " + data.ESTADO.DESCRIPCION + "<br> Forma de pago: " + data.METODO_PAGO.DESCRIPCION + " <br> Fecha de afiliación: " + data.FECHA_INGRESO + "<br> Saldo actual: " + data.MONTO +" </spam> </strong> </p>");
                         //  devuelvetablahistorialdepagos("ASOBISO", persona.identificacion, "tab-content3");
                    }

    
  
                },
                error: function (xhr, textStatus, errorThrown) {
                    $("#tab-content3").append("Error al cargar, favor volver a cargar");
                }
            });
          
        }

                function cargasol(iden)
        {
                   
                    var persona = new Object();
                    persona.identificacion = iden;
                    persona.usrid = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID;
                    persona.pssw = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.CONTRASENA;
                    ////ajax de los datos de solidaridad
                    $.ajax({
                        url: urllocal + 'Solidaridad',
                        type: 'POST',
                        dataType: 'json',
                        data: persona,
                        success: function (data, textStatus, xhr) {
                            if (data.IDENTIFICACION.IDENTIFICACION == 0) {
                                $("#espaciodatossolidaridad").append("Persona no esta afiliada a solidaridad");
                            
                            } else {
                                 
                                $("#espaciodatossolidaridad").append("<h2>PROGRAMA BENEFICIO POR DEFUNCIÓN DE FAMILIARES (PBDF)</h2><img id=\"imgboletasol\" src=\"Boletas/" + data.IDENTIFICACION.IDENTIFICACION + "sol.jpg\" onerror=\"this.src=\'Imagenes/imgboletano.jpg'\"><br><p> Estado actual en el fondo: " + data.ESTADO.DESCRIPCION + "<br> Forma de pago: " + data.METODO_PAGO.DESCRIPCION + " <br> Fecha de afiliación: " + data.FECHA_INGRESO + " <br> Saldo actual: " + data.MONTO + " </spam> </strong> </p><hr> <paper-button raised id='botonpopfam'  onclick='muestradivfam()'>Mostrar familiares</paper-button><paper-button raised id='botonpophistorialsol' onclick='muestradivhps(\"solidaridad\")'>Mostrar historial de pagos</paper-button> ");
                                ////$('#usuariologuado').value = formatItem(data);
                                ////location.href = "/inicio.html";
                                //document.getElementById("infopersonal").innerHTML = "<h1>" + data.IDENTIFICACION + ' ' + data.NOMBRE + ' ' + data.PRIMER_APELLIDO + ' ' + data.SEGUNDO_APELLIDO + "</h1></br> <p>nacio el " + data.FECHA_NACIMIENTO + ", ingreso a la institución el: " + data.FECHA_INGRESO_ICE + " actualmente vive es: " + data.DIRECCION + " tiene registrados los correos: " + data.EMAIL1 + " - " + data.EMAIL2 + " labora para el departamento de: " + data.DEPARTAMENTO + " tiene el puesto de " + data.PUESTO + " sus telefonos son: " + data.TEL1 + " / " + data.TEL2 + " / " + data.CEL + "</p> <strong> <spam style='font-size:small'> Ultima actualizacion por: " + data.USUARIO.NOMBRE_COMPLETO + " la fecha: " + data.FEC_ULT_ACT + " </spam> </strong> </hr>";
                                //document.getElementById("infopersonal").innerHTML += "<ul id='tabs'></ul>";
                               devuelvetablafamiliares(iden);
//                                devuelvetablahistorialdepagos("SOLIDARIDAD", persona.identificacion, "tab-content2");
                                   devuelvetablahistorialdepagos("SOLIDARIDAD", iden, "solidaridad","espaciodatossolidaridad");
                            }

                        },
                        error: function (xhr, textStatus, errorThrown) {
                            $("#espaciodatossolidaridad").append("Error al cargar, favor volver a cargar");
                        }
                    });
                 
                }
                function cargadocs()
                {
                    
                    var persona = new Object();
                    persona.criterio = 'listasocio';
                    persona.usrid = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID;
                    persona.pssw = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.CONTRASENA;

                    $.ajax({
                        url: urllocal + 'docspublicos',
                        // url: 'http://192.168.1.135//api/Listado',
                        type: 'POST',
                        dataType: 'json',
                        data: persona,
                        success: function (data, textStatus, xhr) {
                            if (data.length == 0) {
                                $('#espaciodocs').append("No hay documentos registrados");
                            } else {
                                $('#espaciodocs').append('<h2>Documentos importantes</h2>');

                                for (var ele in data) {

                                    $('#espaciodocs').append('<table><tr><td><a href=' + data[ele].replace(/ /g, "%20") + ">" + data[ele].split('/')[(data[ele].split('/')).length - 1] + "</a></td></tr></table></br>");
                                }
                               
                            }


                        },
                        error: function (xhr, textStatus, errorThrown) {
                            alert(xhr);
                        }
                    });




                }

       function devuelvetablabeneficiarios(IDE) {

                   


            var persona = new Object();
            persona.identificacion = IDE;
            persona.usrid = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID;
            persona.pssw = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.CONTRASENA;
            var tabla;
            $.ajax({
                url:urllocal + 'Beneficiarios' ,
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                       
                        var d = document.createElement('div');
                        d.setAttribute('id', 'benficiariospopup');
                                       d.setAttribute('style', 'visibility:hidden;height:10px');
//                        document.body.appendChild(d);
                        document.getElementById("espaciodatosmutualidad").appendChild(d);
                        $('#benficiariospopup').append("<h1>Beneficiarios</h1><table id='tablabeneficiarios' class='table2'><thead><tr><th scope='col' abbr='Starter'>Identificación del beneficiario</th><th scope='col' abbr='Starter'>Nombre del beneficiario</th><th scope='col' abbr='Starter'>Porcentaje</th><th scope='col' abbr='Starter'>Prioridad</th><th scope='col' abbr='Starter'>Parentesco</th></tr></thead><tbody>");
                        $('#benficiariospopup').append(" </tbody></table>");
                       
                        for (var ele in data) {
                           
                               var tableRef = document.getElementById('tablabeneficiarios').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row

                                var newRow = tableRef.insertRow(tableRef.rows.length);
                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);
                            
                        if (!/^([0-9])*$/.test(data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION))
                                 {
                                     var newText = document.createTextNode(data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ' Es posible que el numero sea incorrecto' )
                                     
                                 }
                            else
                                {
                            var newText = document.createTextNode(data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION)
                            }
                            
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


                                                   }
                       
                      $('#benficiariospopup').append("<br><strong>Si alguna identificación tiene letras, significa que no tenemos claro ese número, favor indicarnos el úumero correcto por medio de la sección \"Contacto\"</strong>");
  
                    }
                   
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });



            //return tabla.value;


        }


        function muestradivbn() {
            
            document.getElementById("benficiariospopup").setAttribute("class", "pop");
           // alert(document.getElementById("benficiariospopup").style.visibility);
            if(document.getElementById("benficiariospopup").style.visibility == 'visible')
                {document.getElementById("benficiariospopup").style.visibility = 'hidden'
                   document.getElementById('benficiariospopup').style.height = '10px';
                document.getElementById("botonpopbene").innerHTML='<paper-ripple class="style-scope paper-button"><div id="background" class="style-scope paper-ripple"></div><div id="waves" class="style-scope paper-ripple"></div></paper-ripple><paper-material animated="" class="style-scope paper-button x-scope paper-material-0" elevation="1"></paper-material><div class="content  style-scope paper-button">Mostrar Beneficiarios</div>';
                }
            else
                {
            document.getElementById("benficiariospopup").style.visibility = 'visible';
                       document.getElementById('benficiariospopup').style.height = '100%';
                    document.getElementById("botonpopbene").innerHTML='<paper-ripple class="style-scope paper-button"><div id="background" class="style-scope paper-ripple"></div><div id="waves" class="style-scope paper-ripple"></div></paper-ripple><paper-material animated="" class="style-scope paper-button x-scope paper-material-0" elevation="1"></paper-material><div class="content  style-scope paper-button">Ocultar Beneficiarios</div>';
                }
        }
      
      
      
        function muestradivhistorial(tab) {
            
            document.getElementById('historial' + tab + '').setAttribute("class", "pop");
           // alert(document.getElementById("benficiariospopup").style.visibility);
            if(document.getElementById('historial' + tab + '').style.visibility == 'visible')
                {document.getElementById('historial' + tab + '').style.visibility = 'hidden'
                document.getElementById('historial' + tab + '').style.height = '10px';
                document.getElementById("botonpophistorialmut").innerHTML='<paper-ripple class="style-scope paper-button"><div id="background" class="style-scope paper-ripple"></div><div id="waves" class="style-scope paper-ripple"></div></paper-ripple><paper-material animated="" class="style-scope paper-button x-scope paper-material-0" elevation="1"></paper-material><div class="content  style-scope paper-button">Mostrar historial</div>';
                }
            else
                {
            document.getElementById('historial' + tab + '').style.visibility = 'visible';
                         document.getElementById('historial' + tab + '').style.height = '100%';
                    document.getElementById("botonpophistorialmut").innerHTML='<paper-ripple class="style-scope paper-button"><div id="background" class="style-scope paper-ripple"></div><div id="waves" class="style-scope paper-ripple"></div></paper-ripple><paper-material animated="" class="style-scope paper-button x-scope paper-material-0" elevation="1"></paper-material><div class="content  style-scope paper-button">Ocultar historial</div>';
                }
        }
      
      
      
        function muestradivhps(tab) {
            
            document.getElementById('historial' + tab + '').setAttribute("class", "pop");
           // alert(document.getElementById("benficiariospopup").style.visibility);
            if(document.getElementById('historial' + tab + '').style.visibility == 'visible')
                {document.getElementById('historial' + tab + '').style.visibility = 'hidden'
                document.getElementById('historial' + tab + '').style.height = '10px';
                document.getElementById("botonpophistorialsol").innerHTML='<paper-ripple class="style-scope paper-button"><div id="background" class="style-scope paper-ripple"></div><div id="waves" class="style-scope paper-ripple"></div></paper-ripple><paper-material animated="" class="style-scope paper-button x-scope paper-material-0" elevation="1"></paper-material><div class="content  style-scope paper-button">Mostrar historial</div>';
                }
            else
                {
            document.getElementById('historial' + tab + '').style.visibility = 'visible';
                         document.getElementById('historial' + tab + '').style.height = '100%';
                    document.getElementById("botonpophistorialsol").innerHTML='<paper-ripple class="style-scope paper-button"><div id="background" class="style-scope paper-ripple"></div><div id="waves" class="style-scope paper-ripple"></div></paper-ripple><paper-material animated="" class="style-scope paper-button x-scope paper-material-0" elevation="1"></paper-material><div class="content  style-scope paper-button">Ocultar historial</div>';
                }
        }
      
      
      
        function devuelvetablahistorialdepagos(fondo,ide,tab,div)
        {
           
            var persona = new Object();
            persona.identificacion = ide;
            persona.fondo = fondo;
            persona.usrid = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID;
            persona.pssw = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.CONTRASENA;
            $.ajax({
                url: urllocal + 'Historial_pagos',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.length == 0) {
                        $('#' + tab).append("Sin historial en " + fondo );

                    } else {
                        var d = document.createElement('div');
                        d.setAttribute('id', 'historial' + tab + '');
                        d.setAttribute('style', 'visibility:hidden;height:10px');
                      
                      //  document.body.appendChild(d);
                      document.getElementById(div).appendChild(d);
                        $('#historial' + tab).append("<h2>Historial de pagos en " + fondo + "</h2><table id='tablahistorial" + fondo + "' class='table2'><thead><tr><th scope='col' abbr='Starter'>Quincena/Mes/Año</th><th scope='col' abbr='Starter'>ID y serie del pago</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Metodo de pago</th></tr></thead><tbody></tbody></table>");

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


                         


                            var newCell7 = newRow.insertCell(4);

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


                        }







                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });

         
        }


        function devuelvetablafamiliares(IDE) {
            var persona = new Object();
            persona.identificacion = IDE;
            persona.usrid = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID;
            persona.pssw = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.CONTRASENA;
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
                          var d = document.createElement('div');
                        d.setAttribute('id', 'familiarespopup');
                          d.setAttribute('style', 'visibility:hidden;height:10px');
                        //document.body.appendChild(d);
                             document.getElementById("espaciodatossolidaridad").appendChild(d);
                        
                         $('#familiarespopup').append("<h1>Familiares</h1><table id='tablafamiliares' class='table2'><thead><tr><th scope='col' abbr='Starter'>Identificación del familiar</th><th scope='col' abbr='Starter'>Nombre del familiar</th><th scope='col' abbr='Starter'>Estado</th><th scope='col' abbr='Starter'>Parentesco</th></tr></thead><tbody>");
                        $('#familiarespopup').append(" </tbody></table>");

                        for (var ele in data) {

                            var tableRef = document.getElementById('tablafamiliares').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                            
                             if (!/^([0-9])*$/.test(data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION))
                                 {
                                     var newText = document.createTextNode(data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION + ' Es posible que el numero sea incorrecto' )
                                     
                                 }
                            else
                                {
                            var newText = document.createTextNode(data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION)
                            }
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

                       





                        }

  $('#familiarespopup').append("<br><strong>Si alguna identificación tiene letras, significa que no tenemos claro ese número, favor indicarnos el número correcto por medio de la sección \"Contacto\"</strong>");
  

                    }
                  

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });



            //return tabla.value;


        }

        function muestradivfam() {
            
            document.getElementById("familiarespopup").setAttribute("class", "pop");
           // alert(document.getElementById("benficiariospopup").style.visibility);
            if(document.getElementById("familiarespopup").style.visibility == 'visible')
                {document.getElementById("familiarespopup").style.visibility = 'hidden'
                   document.getElementById('familiarespopup').style.height = '10px';
                document.getElementById("botonpopfam").innerHTML='<paper-ripple class="style-scope paper-button"><div id="background" class="style-scope paper-ripple"></div><div id="waves" class="style-scope paper-ripple"></div></paper-ripple><paper-material animated="" class="style-scope paper-button x-scope paper-material-0" elevation="1"></paper-material><div class="content  style-scope paper-button">Mostrar Familiares</div>';
                }
            else
                {
            document.getElementById("familiarespopup").style.visibility = 'visible';
                       document.getElementById('familiarespopup').style.height = '100%';
                    document.getElementById("botonpopfam").innerHTML='<paper-ripple class="style-scope paper-button"><div id="background" class="style-scope paper-ripple"></div><div id="waves" class="style-scope paper-ripple"></div></paper-ripple><paper-material animated="" class="style-scope paper-button x-scope paper-material-0" elevation="1"></paper-material><div class="content  style-scope paper-button">Ocultar familiares</div>';
                }
        }
      
      function cerrarsesionysalir()
      {
          localStorage.setItem("ASOCIADOLOGUEADO",null);
    location.href = "/loginsocio.html";
          
          
      }


        function muestradivconfig() {
            
            document.getElementById("configuracion").setAttribute("class", "pop");
           // alert(document.getElementById("benficiariospopup").style.visibility);
            if(document.getElementById("configuracion").style.visibility == 'visible')
                {document.getElementById("configuracion").style.visibility = 'hidden'
                   document.getElementById('configuracion').style.height = '1px';
                document.getElementById("btnconfigura").innerHTML='Configuracion';
                }
            else
                {
            document.getElementById("configuracion").style.visibility = 'visible';
                       document.getElementById('configuracion').style.height = '100%';
                    document.getElementById("btnconfigura").innerHTML='Ocultar configuracion';
                }
        }
      
        function enviacorreo()
        {
          
            if (JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")) != null)
            {
                if ((JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID == 4) || (JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID == 5) || (JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID == 11) || (JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID == 13)) {
                    
                

                    var persona = new Object();


                    persona.criterio = 'msg';
                    persona.para = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.EMAIL;

                    persona.asunto = "Comentario desde la aplicación web del afiliado: " + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).NOMBRE + " " + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).PRIMER_APELLIDO + " " + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).SEGUNDO_APELLIDO + " " + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).EMAIL1;

                    persona.html = document.getElementById("correotexto").value;
                    persona.usrid = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID;
                    persona.pssw = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.CONTRASENA;
                    $.ajax({
                        url: urllocal + 'Correo',
                 
                        type: 'POST',
                        dataType: 'json',
                        data: persona,
                        success: function (data, textStatus, xhr) {
                            if (data.ID == 0) {
                                alert("Persona no esta afiliada ni registrada");
                            } else {
                            }
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            alert(errorThrown);
                        }
                    });

                    alert('Correo enviado correctamente');
                }
                else {
                    var persona = new Object();


                    persona.criterio = 'msg';
                    persona.para = "abiensocial@ice.go.cr";

                    persona.asunto = "Comentario desde la aplicación web del afiliado: " + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).NOMBRE + " " + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).PRIMER_APELLIDO + " " + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).SEGUNDO_APELLIDO + ", " + JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).EMAIL1;

                    persona.html = document.getElementById("correotexto").value;
                    persona.usrid = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID;
                    persona.pssw = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.CONTRASENA;
                    $.ajax({
                        url: urllocal + 'Correo',

                        type: 'POST',
                        dataType: 'json',
                        data: persona,
                        success: function (data, textStatus, xhr) {
                            if (data.ID == 0) {
                                alert("Persona no esta afiliada ni registrada");
                            } else {
                            }
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            alert(errorThrown);
                        }
                    });

                    alert('Correo enviado correctamente');


                }

            }

        }

        function cambiafoto()
        {

            var files = $("#inputFile").get(0).files;
            if (files.length > 0) {

                var data = new FormData();
                files[0].name = localStorage.getItem("ASOCIADOLOGUEADO").IDENTIFICACION;
                for (i = 0; i < files.length; i++) {
                    data.append("file" + i, files[i]);
                }
                data.append('ID', JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).IDENTIFICACION);
                data.append('TIPO', 'FOTOGRAFIAPERSONA');
                data.append('usrid',JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID);
                data.append('pssw',JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.CONTRASENA);
                $.ajax({
                    type: "POST",
                    url: urllocal + "file",
                    // datatype:'json',
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function (result) {
                        if (result) {
                            alert("Fotografia cambiada");
                          
                        }
                    }
                });
            }
            else {
                alert("Seleccione una fotografia primero");
            }
        }


        function modificarcontrasenaajax()
        {
            if (document.getElementById("passnueva2").value == document.getElementById("passnueva").value) {
                var persona = new Object();
                persona.identificacion = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).IDENTIFICACION;
                persona.oldpass = document.getElementById("passactual").value;
                persona.newpass = document.getElementById("passnueva2").value;
                persona.ope = "3";
                persona.usrid = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.ID;
                persona.pssw = JSON.parse(localStorage.getItem("ASOCIADOLOGUEADO")).USUARIO.CONTRASENA;
                //ajax de los datos personales
                $.ajax({
                    url: urllocal + 'ModificaPersona',
                    type: 'POST',
                    dataType: 'json',
                    data: persona,
                    success: function (data, textStatus, xhr) {
                        alert(data);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        alert(xhr);
                    }
                });
            }
            else
            {
                alert("Los campos de nueva contrasena no coinciden");
            }
        }