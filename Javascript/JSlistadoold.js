﻿var urllocal='api/';

$(document).ajaxStart(function () {
    $("#loading").html("<div id='contenedor_caja'><H1>HOLA, ESTAMOS CARGANDO LA APLICACION, GRACIAS POR SU PACIENCIA</H1></div>");
    // $("#carga").addClass("loading");
    document.getElementById('loading').style.width = screen.width + 'px';
    document.getElementById('loading').style.height = screen.height + 'px';
    document.getElementById('loading').style.backgroundColor = "white";
    document.getElementById('loading').style.zIndex = '20';
    document.getElementById('loading').style.opacity = '0.9';
    $('#contenedor_caja').css({
        width: ($(window).width() * 80) / 100,
        position: 'absolute',
        left: (($(window).width() * 20) / 100),

        top: ($(window).height() - ($('#contenedor_caja').outerHeight() * 2)) / 2
    });
});
$(document).ajaxStop(function () {
    $("#loading").html("");
    $("#loading").removeAttr("style");
});


if (JSON.parse(localStorage.getItem("USUARIOLOGUEADO")) == null)
                {
                    alert("No estas autorizado para ingresar aun");
                    location.href = "/login.html";

                }
                else
                {
                   // alert(JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO);
                } 

var miniprofile = document.getElementById("people");
                miniprofile.innerHTML = "<li>  <img src='/Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg' onerror='this.src = 'Imagenes/btn_menu.png'' onclick='muestraprofilegrande();' /><table><tr><td><h2>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</h2><em>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "</em> </td><td></td><td><input type=image src=\"Imagenes/list-view.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"menu.html\"'></input></td><td><input type=image src=\"Imagenes/settings.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"prefuser.html\"'></input></td><td><input type=image src=\"Imagenes/plug.png\" width=\"45\" height=\"45\" onclick = \"salirdelsistema()\"></input></td></tr></table></li>";
                //FIN DEL PERFIL DE USUARIO MINI
                
                function salirdelsistema()
{
    
     localStorage.setItem("USUARIOLOGUEADO",null);
    
    window.location.href="Login.html";
    
    
}



function ajaxagregaobs(){
       var persona = new Object();
    
   
    persona.id =  document.getElementById("idescogido").value;
persona.fondo =  document.getElementById("fondoescogido").value;

    persona.obs = document.getElementById("obstexto").value;
    persona.actualiza = 'Si';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
                url: urllocal + 'Obs',
                // url: 'http://192.168.30.104//api/Obs',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                    } },
                error: function (xhr, textStatus, errorThrown) {
                    alert(errorThrown);
                }
            });

    alert('Observacion insertada correctamente');
       $('#cuadroagregaobs').html("");
      $('#cuadroagregaobs').css('visibility','hidden');
    
}
        
        function cerrarajaxagregaobs(){
      
       $('#cuadroagregaobs').html("");
      $('#cuadroagregaobs').css('visibility','hidden');
    
}
    function inicializa()
        {
        //PERFIL DE USUARIO MINI
//var miniprofile = document.getElementById("people");
//miniprofile.innerHTML = "<li>  <img src='/Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg' onerror='this.src = 'Imagenes/btn_menu.png'' onclick='muestraprofilegrande();' /><h2>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</h2><em>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "</em> </li>";
////FIN DE PERFIL DE USUARIO MINI
                
            
    }







    function devuelvemorosospensionadosambosfondos() {
  //      $('#tabla').remove();
  //      $('#infopersonal').innerHtml = '';
  //      $('#tabla_wrapper').remove();
  //      $('#titulo').remove();
  //      var persona = new Object();
  //      persona.tipo = '5';
  //      persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
  //      persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

  //      var tabla;
  //      $.ajax({
  //          url: urllocal + 'Listado',
  //          // url: 'http://192.168.1.135//api/Listado',
  //          type: 'POST',
  //          dataType: 'json',
  //          data: persona,
  //          success: function (data, textStatus, xhr) {
  //              if (data.ID == 0) {
  //                  alert("Persona no esta afiliada ni registrada");
  //              } else {



  //                  $('#infopersonal').append("<h1 id = 'titulo'>Listado de morosos pensionados</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Fecha de ingreso</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Telefono(s)</th><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Observaciones</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
  //                  $('#infopersonal').append(" </tbody></table>");


  //                  for (var ele in data) {

  //                      var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

  //                      // Insert a row in the table at the last row
  //                      var newRow = tableRef.insertRow(tableRef.rows.length);

  //                      // Insert a cell in the row at index 0
  //                      var newCell = newRow.insertCell(0);

  //                      // Append a text node to the cell
  //                      var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION)

  //                      newCell.appendChild(newText);

  //                      var newCell2 = newRow.insertCell(1);

  //                      //
  //                      var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO);
  //                      newCell2.appendChild(newText2);
  //                      //
  //                      var newCell3 = newRow.insertCell(2);


  //                      var newText3 = document.createTextNode(data[ele].MONTO);
  //                      newCell3.appendChild(newText3);
  //                      var newCell4 = newRow.insertCell(3);

  //                      var newText4 = document.createTextNode(data[ele].ESTADO.DESCRIPCION);
  //                      newCell4.appendChild(newText4);
  //                      //
  //                      //                       
  //                      var newCell5 = newRow.insertCell(4);

  //                      var newText5 = document.createTextNode(dateConvert(data[ele].FECHA_INGRESO, "DD-MM-YYYY"));


  //                      newCell5.appendChild(newText5);



  //                      //
  //                      //                            
  //                      //                            
  //                      var newCell7 = newRow.insertCell(5);
  //                      var newText7 = document.createTextNode(data[ele].IDENTIFICACION.EMAIL1);

  //                      newCell7.appendChild(newText7);
  //                      //                             //BOTON DE ELIMINAR
  //                      //                           
  //                      //                            
  //                      var newCell8 = newRow.insertCell(6);
  //                      var newText8 = document.createTextNode(data[ele].IDENTIFICACION.TEL1 + '/' + data[ele].IDENTIFICACION.TEL2 + '/' + data[ele].IDENTIFICACION.CEL);
  //                      //                        
  //                      newCell8.appendChild(newText8);






  //                      var newCell8 = newRow.insertCell(7);
  //                      var newText8 = document.createTextNode("Mutualidad");
  //                      //                        
  //                      newCell8.appendChild(newText8);
  //                      var newText9 = document.createTextNode(data[ele].OBSERVACIONES);

  //                      var btnobs = document.createElement("input");
  //                      //btnmodifica.type = "button";
  //                      btnobs.type = "button";
  //                      btnobs.setAttribute("onclick", "obs('" + data[ele].IDENTIFICACION.IDENTIFICACION + "','MUTUALIDAD','" + data[ele].OBSERVACIONES + "');");
  //                      btnobs.id = 'botono' + data[ele].IDENTIFICACION.IDENTIFICACION;
  //                      btnobs.value = "Agregar Observacion";

  //                      //                            
  //                      var newCell11 = newRow.insertCell(8);
  //                      //                            
  //                      newCell11.appendChild(newText9);
  //                      newCell11.appendChild(btnobs);



  //                      //                             //BOTON DE FORZAR
  //                      var btnFORZAR = document.createElement("input");
  //                      //btnmodifica.type = "button";
  //                      btnFORZAR.type = "button";
  //                      btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
  //                      btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
  //                      btnFORZAR.value = "Buscar";

  //                      var newCell10 = newRow.insertCell(9);

  //                      newCell10.appendChild(btnFORZAR);

  //                      if (data[ele].IDENTIFICACION.EMAIL1 != '') {
  //                          var btncorreo = document.createElement("input");
  //                          //btnmodifica.type = "button";
  //                          btncorreo.type = "button";
  //                          btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
  //                          btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
  //                          btncorreo.value = "Correo";

  //                          var newCell11 = newRow.insertCell(10);

  //                          newCell11.appendChild(btncorreo);
  //                      } else {
  //                          var newCell11 = newRow.insertCell(10);
  //                          var newTextx = document.createTextNode('');

  //                          newCell11.appendChild(newTextx);
  //                      }
  //                      //                                 }
  //                  }
  //                  var persona = new Object();
  //                  persona.tipo = '6';
  //                  persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
  //                  persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

  //                  var tabla;
  //                  $.ajax({
  //                      url: urllocal + 'Listado',
  //                      // url: 'http://192.168.1.135//api/Listado',
  //                      type: 'POST',
  //                      dataType: 'json',
  //                      data: persona,
  //                      success: function (data, textStatus, xhr) {
  //                          if (data.ID == 0) {
  //                              alert("Persona no esta afiliada ni registrada");
  //                          } else {


  //for (var ele in data) {

  //                                  var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

  //                                  // Insert a row in the table at the last row
  //                                  var newRow = tableRef.insertRow(tableRef.rows.length);

  //                                  // Insert a cell in the row at index 0
  //                                  var newCell = newRow.insertCell(0);

  //                                  // Append a text node to the cell
  //                                  var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION)

  //                                  newCell.appendChild(newText);

  //                                  var newCell2 = newRow.insertCell(1);

  //                                  //
  //                                  var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO);
  //                                  newCell2.appendChild(newText2);
  //                                  //
  //                                  var newCell3 = newRow.insertCell(2);


  //                                  var newText3 = document.createTextNode(data[ele].MONTO);
  //                                  newCell3.appendChild(newText3);
  //                                  var newCell4 = newRow.insertCell(3);

  //                                  var newText4 = document.createTextNode(data[ele].ESTADO.DESCRIPCION);
  //                                  newCell4.appendChild(newText4);
  //                                  //
  //                                  //                       
  //                                  var newCell5 = newRow.insertCell(4);
  //                                  var dater = new Date(data[ele].FECHA_INGRESO);
  //                                  var newText5 = document.createTextNode(dateConvert(data[ele].FECHA_INGRESO, "DD-MM-YYYY"));


  //                                  newCell5.appendChild(newText5);



  //                                  //
  //                                  //                            
  //                                  //                            
  //                                  var newCell7 = newRow.insertCell(5);
  //                                  var newText7 = document.createTextNode(data[ele].IDENTIFICACION.EMAIL1);

  //                                  newCell7.appendChild(newText7);
  //                                  //                             //BOTON DE ELIMINAR
  //                                  //                           
  //                                  //                            
  //                                  var newCell8 = newRow.insertCell(6);
  //                                  var newText8 = document.createTextNode(data[ele].IDENTIFICACION.TEL1 + '/' + data[ele].IDENTIFICACION.TEL2 + '/' + data[ele].IDENTIFICACION.CEL);
  //                                  //                        
  //                                  newCell8.appendChild(newText8);


  //                                  var newCell8 = newRow.insertCell(7);
  //                                  var newText8 = document.createTextNode("Solidaridad");
  //    //                        
  //                                  newCell8.appendChild(newText8);




  //                                  var newText9 = document.createTextNode(data[ele].OBSERVACIONES);

  //                                  var btnobs = document.createElement("input");
  //                                  //btnmodifica.type = "button";
  //                                  btnobs.type = "button";
  //                                  btnobs.setAttribute("onclick", "obs('" + data[ele].IDENTIFICACION.IDENTIFICACION + "','MUTUALIDAD','" + data[ele].OBSERVACIONES + "');");
  //                                  btnobs.id = 'botono' + data[ele].IDENTIFICACION.IDENTIFICACION;
  //                                  btnobs.value = "Agregar Observacion";

  //                                  //                            
  //                                  var newCell11 = newRow.insertCell(8);
  //                                  //                            
  //                                  newCell11.appendChild(newText9);
  //                                  newCell11.appendChild(btnobs);



  //                                  //                             //BOTON DE FORZAR
  //                                  var btnFORZAR = document.createElement("input");
  //                                  //btnmodifica.type = "button";
  //                                  btnFORZAR.type = "button";
  //                                  btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
  //                                  btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
  //                                  btnFORZAR.value = "Buscar";

  //                                  var newCell10 = newRow.insertCell(9);

  //                                  newCell10.appendChild(btnFORZAR);

  //                                  if (data[ele].IDENTIFICACION.EMAIL1 != '') {
  //                                      var btncorreo = document.createElement("input");
  //                                      //btnmodifica.type = "button";
  //                                      btncorreo.type = "button";
  //                                      btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
  //                                      btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
  //                                      btncorreo.value = "Correo";

  //                                      var newCell11 = newRow.insertCell(10);

  //                                      newCell11.appendChild(btncorreo);
  //                                  } else {
  //                                      var newCell11 = newRow.insertCell(10);
  //                                      var newTextx = document.createTextNode('');

  //                                      newCell11.appendChild(newTextx);
  //                                  }
  //                                  //                                 }
  //                              }
                              
  //                          }


  //                      },
  //                      error: function (xhr, textStatus, errorThrown) {
  //                          alert(xhr);
  //                      }
  //                  });

  //                  $('#tabla').dataTable({
  //                      "scrollY": "200px",
  //                      "scrollCollapse": true,
  //                      "paging": false,
  //                      dom: 'Bfrtip',
  //                      buttons: [
  //                          'print'
  //                      ]
  //                  });
  //              }


  //          },
  //          error: function (xhr, textStatus, errorThrown) {
  //              alert(xhr);
  //          }
  //      });




        //return tabla.value;
        $('#tabla').remove();
        $('#infopersonal').innerHtml = '';
        $('#tabla_wrapper').remove();
        $('#titulo').remove();
        var persona = new Object();
        persona.tipo = '34';
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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



                    $('#infopersonal').append("<h1 id = 'titulo'>Morosos ambos fondos</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Fecha de ingreso</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Telefono(s)</th><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th><th scope='col' abbr='Starter'>Insertar nueva observaci�n</th></tr></thead><tbody>");
                    $('#infopersonal').append(" </tbody></table>");


                    for (var ele in data) {

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


                        var newText3 = document.createTextNode(data[ele].Saldo);
                        newCell3.appendChild(newText3);
                        var newCell4 = newRow.insertCell(3);

                        var newText4 = document.createTextNode(data[ele].Estado);
                        newCell4.appendChild(newText4);
                        //
                        //                       
                        var newCell5 = newRow.insertCell(4);

                        //var dater=new Date(data[ele]['Fecha de ingreso']);
                        var newText5 = document.createTextNode(data[ele]['Fecha de ingreso']);

                        newCell5.appendChild(newText5);



                        //
                        //                            
                        //                            
                        var newCell7 = newRow.insertCell(5);
                        var newText7 = document.createTextNode(data[ele].Correo);

                        newCell7.appendChild(newText7);
                        //                             //BOTON DE ELIMINAR
                        //                           
                        //                            
                        var newCell8 = newRow.insertCell(6);
                        var newText8 = document.createTextNode(data[ele].Telefonos);
                        //                        
                        newCell8.appendChild(newText8);

                        var newText9 = document.createTextNode(data[ele].Fondo);



                        //                            
                        var newCell11 = newRow.insertCell(7);
                        //                            
                        newCell11.appendChild(newText9);




                        //                             //BOTON DE FORZAR
                        var btnFORZAR = document.createElement("input");
                        //btnmodifica.type = "button";
                        btnFORZAR.type = "button";
                        btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IdentificaciOn + "';");
                        btnFORZAR.id = 'boton' + data[ele].IdentificaciOn;
                        btnFORZAR.value = "Buscar";

                        var newCell10 = newRow.insertCell(8);

                        newCell10.appendChild(btnFORZAR);

                        if (data[ele].Correo != '') {
                            var btncorreo = document.createElement("input");
                            //btnmodifica.type = "button";
                            btncorreo.type = "button";
                            btncorreo.setAttribute("onclick", "correo('" + data[ele].Correo + "','" + data[ele].Nombre + ' ' + data[ele].Primerapellido + ' ' + data[ele].Segundoapellido + "');");
                            btncorreo.id = 'botonc' + data[ele].IdentificaciOn;
                            btncorreo.value = "Correo";

                            var newCell11 = newRow.insertCell(9);

                            newCell11.appendChild(btncorreo);
                        } else {
                            var newCell11 = newRow.insertCell(9);
                            var newTextx = document.createTextNode('');

                            newCell11.appendChild(newTextx);
                        }


                        var newText9 = document.createTextNode(data[ele].Observaciones);

                        var btnobs = document.createElement("input");
                        //btnmodifica.type = "button";
                        btnobs.type = "button";
                        btnobs.setAttribute("onclick", "obs('" + data[ele].IdentificaciOn + "','SOLIDARIDAD','" + data[ele].Observaciones + "');");
                        btnobs.id = 'botono' + data[ele].IdentificaciOn;
                        btnobs.value = "Agregar Observaci�n";

                        //                            
                        var newCell11 = newRow.insertCell(10);
                        //                            
                        newCell11.appendChild(newText9);
                        newCell11.appendChild(btnobs);






                        //                                 }
                    }


                    $('#tabla').dataTable({
                        "scrollY": "200px",
                        "scrollCollapse": true,
                        "paging": false,
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

    function pendientecambioestado() {


        var persona = new Object();
        persona.tipo = '17';
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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



                    document.getElementById('infopersonal').innerHTML = "<h1 id = 'titulo'>Listado de cambios de estado</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Nuevo estado</th><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Anotaciones</th><th scope='col' abbr='Starter'>Usuario responsable y fecha del cambio</th></tr></thead><tbody>";
                    $('#infopersonal').append(" </tbody></table>");


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
                        var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO);
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
                        var newText9 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(data[ele].FEC_ULT_ACT, "DD-MM-YYYY"));

                        newCell9.appendChild(newText9);




                        //                                 }
                    }

                    var persona = new Object();
                    persona.tipo = '18';
                    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                                    var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO);
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
                                    var newText9 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(data[ele].FEC_ULT_ACT, "DD-MM-YYYY"));

                                    newCell9.appendChild(newText9);



                                    //                                 }
                                }





                                var persona = new Object();
                                persona.tipo = '19';
                                persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                                persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                                                var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO);
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
                                                var newText9 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO + ' ' + dateConvert(data[ele].FEC_ULT_ACT, "DD-MM-YYYY"));

                                                newCell9.appendChild(newText9);



                                             
                                                //                                 }
                                            }










                                            $('#tabla').dataTable({
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


    function sinpagoafiliacion()
    {

      

        
        $('#tabla').remove();
        $('#infopersonal').innerHtml='';
        $('#tabla_wrapper').remove();
        $('#titulo').remove();
        var persona = new Object();
        persona.tipo = '25';
        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

        var tabla;
        $.ajax({
            url: urllocal+ 'Listado',
            // url: 'http://192.168.30.104//api/Listado',
            type: 'POST',
            dataType: 'json',
            data: persona,
            success: function (data, textStatus, xhr) {
                if (data.ID == 0) {
                    alert("Persona no esta afiliada ni registrada");
                } else {
                     
                    $('#infopersonal').append("<h1 id = 'titulo'>Listado de afiliaciones sin pago de afiliacion</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Estado</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Fecha de ingreso</th><th scope='col' abbr='Starter'>Telefono(s)</th><th scope='col' abbr='Starter'>Observaciones</th><th scope='col' abbr='Starter'>Usuario responsable</th><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
                    $('#infopersonal').append(" </tbody></table>");

                    for (var ele in data) {

                        var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                        // Insert a row in the table at the last row
                        var newRow = tableRef.insertRow(tableRef.rows.length);

                        // Insert a cell in the row at index 0
                        var newCell = newRow.insertCell(0);

                        var newText = document.createTextNode(data[ele].Identificaci�n)

                        newCell.appendChild(newText);
                        var newCell = newRow.insertCell(1);

                        var newText = document.createTextNode(data[ele].Nombre + ' ' + data[ele]['Primer apellido'] + ' ' + data[ele]['Segundo apellido'])

                        newCell.appendChild(newText);

                        var newCell = newRow.insertCell(2);

                        var newText = document.createTextNode(data[ele].Estado);

                        newCell.appendChild(newText);


                        var newCell = newRow.insertCell(3);

                        var newText = document.createTextNode(data[ele]["Metodo de pago"]);

                        newCell.appendChild(newText);
                        var newCell = newRow.insertCell(4);

                        var newText = document.createTextNode(data[ele]["Fecha de ingreso"]);

                        newCell.appendChild(newText);


                        var newCell = newRow.insertCell(5);

                        var newText = document.createTextNode(data[ele]["Tel�fonos"]);

                        newCell.appendChild(newText);
                        var newCell = newRow.insertCell(6);

                        var newText = document.createTextNode(data[ele]["Observaciones"]);

                        newCell.appendChild(newText);
                        var newCell = newRow.insertCell(7);

                        var newText = document.createTextNode(data[ele]["Usuario"]);

                        newCell.appendChild(newText);
                        var newCell = newRow.insertCell(8);

                        var newText = document.createTextNode(data[ele]["Fondo"]);

                        newCell.appendChild(newText);

                        //BOTON DE FORZAR
                        var btnFORZAR = document.createElement("input");
                        //btnmodifica.type = "button";
                        btnFORZAR.type = "button";
                        btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].Identificaci�n + "';");
                        btnFORZAR.id = 'boton' + data[ele].Identificaci�n;
                        btnFORZAR.value = "Buscar";

                        var newCell10 = newRow.insertCell(9);

                        newCell10.appendChild(btnFORZAR);
                        if (data[ele].IDENTIFICACION.EMAIL1 != '') {
                            var btncorreo = document.createElement("input");
                            //btnmodifica.type = "button";
                            btncorreo.type = "button";
                            btncorreo.setAttribute("onclick", "correo('" + data[ele].Correos + "','" + data[ele].Nombre + ' ' + data[ele]["Primer apellido"] + ' ' + data[ele]["Segundo apellido"] + "');");
                            btncorreo.id = 'botonc' + data[ele].Identificaci�n;
                            btncorreo.value = "Correo";

                            var newCell11 = newRow.insertCell(10);

                            newCell11.appendChild(btncorreo);
                        } else {
                            var newCell11 = newRow.insertCell(10);
                            var newTextx = document.createTextNode('');

                            newCell11.appendChild(newTextx);
                        }
                    }

                    $('#tabla').dataTable({
                        "scrollY": "200px",
                        "scrollCollapse": true,
                        "paging": false,
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







     function devuelvemorosospensionadossolidaridad() {
 
            $('#tabla').remove();
         $('#infopersonal').innerHtml='';
          $('#tabla_wrapper').remove();
           $('#titulo').remove();
            var persona = new Object();
            persona.tipo = '1';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            var tabla;
            $.ajax({
              url: urllocal+ 'Listado',
                // url: 'http://192.168.30.104//api/Listado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                       
                        
                         $('#infopersonal').append("<h1 id = 'titulo'>Listado de morosos pensionados en solidaridad</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Fecha de ingreso</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Telefono(s)</th><th scope='col' abbr='Starter'>Observaciones</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
                        $('#infopersonal').append(" </tbody></table>");

                        
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


                            var newText3 = document.createTextNode(data[ele].MONTO);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

      var newText4 = document.createTextNode(data[ele].ESTADO.DESCRIPCION);
                            newCell4.appendChild(newText4);
//
//                       
  var newCell5 = newRow.insertCell(4);
                             var dater=new Date(data[ele].FECHA_INGRESO);
 var newText5 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                         
       
       newCell5.appendChild(newText5);  

                        

//
//                            
//                            
                            var newCell7 = newRow.insertCell(5);
                              var newText7 = document.createTextNode(data[ele].IDENTIFICACION.EMAIL1);
                        
                              newCell7.appendChild(newText7);
//                             //BOTON DE ELIMINAR
//                           
//                            
                            var newCell8 = newRow.insertCell(6);
                              var newText8 = document.createTextNode(data[ele].IDENTIFICACION.TEL1 + '/'+ data[ele].IDENTIFICACION.TEL2 + '/'+ data[ele].IDENTIFICACION.CEL );
//                        
                              newCell8.appendChild(newText8);
                            
                             var newText9 = document.createTextNode(data[ele].OBSERVACIONES);
                        
                           var btnobs = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnobs.type="button";
                               btnobs.setAttribute("onclick", "obs('"+ data[ele].IDENTIFICACION.IDENTIFICACION +"','SOLIDARIDAD','"+data[ele].OBSERVACIONES +"');");
                               btnobs.id = 'botono' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnobs.value="Agregar Observacion";
                            
//                            
                               var newCell11 = newRow.insertCell(7);
//                            
                              newCell11.appendChild(newText9);
                            newCell11.appendChild(btnobs);
                            
                            
                            
//                             //BOTON DE FORZAR
                            var btnFORZAR = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnFORZAR.type="button";
                             btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
                               btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnFORZAR.value="Buscar";
                            
                            var newCell10 = newRow.insertCell(8);
                            
                              newCell10.appendChild(btnFORZAR);
                            if(data[ele].IDENTIFICACION.EMAIL1 != '')
                                {
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                             btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
                               btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Correo";
                            
                            var newCell11 = newRow.insertCell(9);
                            
                              newCell11.appendChild(btncorreo);
                                }else
                                    {
                                         var newCell11 = newRow.insertCell(9);
                             var newTextx = document.createTextNode('');
                        
                              newCell11.appendChild(newTextx);
                                    }
//                                 
                        }
                    $('#tabla').dataTable({
        "scrollY":        "200px",
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
 

        }
        
     function devuelvemorosospensionadosmutualidad() {
  $('#tabla').remove();
           $('#infopersonal').innerHtml='';
             $('#tabla_wrapper').remove();
          $('#titulo').remove();
            var persona = new Object();
            persona.tipo = '2';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                        
                       
                        
                         $('#infopersonal').append("<h1 id = 'titulo'>Listado de morosos pensionados en mutualidad</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Fecha de ingreso</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Telefono(s)</th><th scope='col' abbr='Starter'>Observaciones</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
                        $('#infopersonal').append(" </tbody></table>");

                        
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


                            var newText3 = document.createTextNode(data[ele].MONTO);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

      var newText4 = document.createTextNode(data[ele].ESTADO.DESCRIPCION);
                            newCell4.appendChild(newText4);
//
//                       
  var newCell5 = newRow.insertCell(4);
                             var dater=new Date(data[ele].FECHA_INGRESO);
 var newText5 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                         
 
                       newCell5.appendChild(newText5);  

                        

//
//                            
//                            
                            var newCell7 = newRow.insertCell(5);
                              var newText7 = document.createTextNode(data[ele].IDENTIFICACION.EMAIL1);
                        
                              newCell7.appendChild(newText7);
//                             //BOTON DE ELIMINAR
//                           
//                            
                            var newCell8 = newRow.insertCell(6);
                              var newText8 = document.createTextNode(data[ele].IDENTIFICACION.TEL1 + '/'+ data[ele].IDENTIFICACION.TEL2 + '/'+ data[ele].IDENTIFICACION.CEL );
//                        
                              newCell8.appendChild(newText8);
                            
                             var newText9 = document.createTextNode(data[ele].OBSERVACIONES);
                        
                           var btnobs = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnobs.type="button";
                               btnobs.setAttribute("onclick", "obs('"+ data[ele].IDENTIFICACION.IDENTIFICACION +"','MUTUALIDAD','"+data[ele].OBSERVACIONES +"');");
                               btnobs.id = 'botono' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnobs.value="Agregar Observacion";
                            
//                            
                               var newCell11 = newRow.insertCell(7);
//                            
                              newCell11.appendChild(newText9);
                            newCell11.appendChild(btnobs);
                            
                            
                            
//                             //BOTON DE FORZAR
                            var btnFORZAR = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnFORZAR.type="button";
                             btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
                               btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnFORZAR.value="Buscar";
                            
                            var newCell10 = newRow.insertCell(8);
                            
                              newCell10.appendChild(btnFORZAR);
                            
                                if(data[ele].IDENTIFICACION.EMAIL1 != '')
                                {
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                             btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
                               btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Correo";
                            
                            var newCell11 = newRow.insertCell(9);
                            
                              newCell11.appendChild(btncorreo);
                                }else
                                    {
                                         var newCell11 = newRow.insertCell(9);
                             var newTextx = document.createTextNode('');
                        
                              newCell11.appendChild(newTextx);
                                    }
//                                 }
                        }
                   $('#tabla').dataTable({
        "scrollY":        "200px",
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
 

        }
 
     function devuelvemorosospensionadosasobiso() {
  $('#tabla').remove();
           $('#infopersonal').innerHtml='';
             $('#tabla_wrapper').remove();
          $('#titulo').remove();
            var persona = new Object();
            persona.tipo = '3';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                        
                       
                        
                         $('#infopersonal').append("<h1 id = 'titulo'>Listado de morosos pensionados en asobiso</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Fecha de ingreso</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Telefono(s)</th><th scope='col' abbr='Starter'>Observaciones</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
                        $('#infopersonal').append(" </tbody></table>");

                        
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


                            var newText3 = document.createTextNode(data[ele].MONTO);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

      var newText4 = document.createTextNode(data[ele].ESTADO.DESCRIPCION);
                            newCell4.appendChild(newText4);
//
//                       
  var newCell5 = newRow.insertCell(4);
 var dater=new Date(data[ele].FECHA_INGRESO);
 var newText5 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                         
                       newCell5.appendChild(newText5);  

                        

//
//                            
//                            
                            var newCell7 = newRow.insertCell(5);
                              var newText7 = document.createTextNode(data[ele].IDENTIFICACION.EMAIL1);
                        
                              newCell7.appendChild(newText7);
//                             //BOTON DE ELIMINAR
//                           
//                            
                            var newCell8 = newRow.insertCell(6);
                              var newText8 = document.createTextNode(data[ele].IDENTIFICACION.TEL1 + '/'+ data[ele].IDENTIFICACION.TEL2 + '/'+ data[ele].IDENTIFICACION.CEL );
//                        
                              newCell8.appendChild(newText8);
                            
                             var newText9 = document.createTextNode(data[ele].OBSERVACIONES);
                        
                           var btnobs = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnobs.type="button";
                               btnobs.setAttribute("onclick", "obs('"+ data[ele].IDENTIFICACION.IDENTIFICACION +"','ASOBISO','"+data[ele].OBSERVACIONES +"');");
                               btnobs.id = 'botono' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnobs.value="Agregar Observacion";
                            
//                            
                               var newCell11 = newRow.insertCell(7);
//                            
                              newCell11.appendChild(newText9);
                            newCell11.appendChild(btnobs);
                            
                            
                            
//                             //BOTON DE FORZAR
                            var btnFORZAR = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnFORZAR.type="button";
                             btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
                               btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnFORZAR.value="Buscar";
                            
                            var newCell10 = newRow.insertCell(8);
                            
                              newCell10.appendChild(btnFORZAR);
                            
                                if(data[ele].IDENTIFICACION.EMAIL1 != '')
                                {
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                             btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
                               btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Correo";
                            
                            var newCell11 = newRow.insertCell(9);
                            
                              newCell11.appendChild(btncorreo);
                                }else
                                    {
                                         var newCell11 = newRow.insertCell(9);
                             var newTextx = document.createTextNode('');
                        
                              newCell11.appendChild(newTextx);
                                    }
//                                 }
                        }
                   $('#tabla').dataTable({
        "scrollY":        "200px",
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
 

        }
 
     function devuelveexoneradostodos() {
  $('#tabla').remove();
           $('#infopersonal').innerHtml='';
             $('#tabla_wrapper').remove();
          $('#titulo').remove();
            var persona = new Object();
            persona.tipo = '7';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                        
                       
                        
                         $('#infopersonal').append("<h1 id = 'titulo'>Exonerados</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Fecha de ingreso</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Telefono(s)</th><th scope='col' abbr='Starter'>Edad</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
                        $('#infopersonal').append(" </tbody></table>");

                        
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


                            var newText3 = document.createTextNode(data[ele].MONTO);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

      var newText4 = document.createTextNode(data[ele].ESTADO.DESCRIPCION);
                            newCell4.appendChild(newText4);
//
//                       
  var newCell5 = newRow.insertCell(4);
  var dater=new Date(data[ele].FECHA_INGRESO);
 var newText5 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                         
                       newCell5.appendChild(newText5);  

                        

//
//                            
//                            
                            var newCell7 = newRow.insertCell(5);
                              var newText7 = document.createTextNode(data[ele].IDENTIFICACION.EMAIL1);
                        
                              newCell7.appendChild(newText7);
//                             //BOTON DE ELIMINAR
//                           
//                            
                            var newCell8 = newRow.insertCell(6);
                              var newText8 = document.createTextNode(data[ele].IDENTIFICACION.TEL1 + '/'+ data[ele].IDENTIFICACION.TEL2 + '/'+ data[ele].IDENTIFICACION.CEL );
//                        
                              newCell8.appendChild(newText8);
                            
                             var newText9 = document.createTextNode(calcularEdad(data[ele].IDENTIFICACION.FECHA_NACIMIENTO));
                        
                          
                            
//                            
                               var newCell11 = newRow.insertCell(7);
//                            
                              newCell11.appendChild(newText9);
                           
                            
                            
                            
//                             //BOTON DE FORZAR
                            var btnFORZAR = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnFORZAR.type="button";
                             btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
                               btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnFORZAR.value="Buscar";
                            
                            var newCell10 = newRow.insertCell(8);
                            
                              newCell10.appendChild(btnFORZAR);
                            
                                if(data[ele].IDENTIFICACION.EMAIL1 != '')
                                {
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                             btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
                               btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Correo";
                            
                            var newCell11 = newRow.insertCell(9);
                            
                              newCell11.appendChild(btncorreo);
                                }else
                                    {
                                         var newCell11 = newRow.insertCell(9);
                             var newTextx = document.createTextNode('');
                        
                              newCell11.appendChild(newTextx);
                                    }
//                                 }
                        }
                   $('#tabla').dataTable({
        "scrollY":        "200px",
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
 

        }
     
     function devuelveaexonerar() {
  $('#tabla').remove();
           $('#infopersonal').innerHtml='';
             $('#tabla_wrapper').remove();
          $('#titulo').remove();
            var persona = new Object();
            persona.tipo = '8';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                        
                       
                        
                         $('#infopersonal').append("<h1 id = 'titulo'>A Exonerar</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Fecha de ingreso</th><th scope='col' abbr='Starter'>Tiempo en el fondo</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Telefono(s)</th><th scope='col' abbr='Starter'>Edad</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
                        $('#infopersonal').append(" </tbody></table>");

                        
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


                            var newText3 = document.createTextNode(data[ele].MONTO);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

      var newText4 = document.createTextNode(data[ele].ESTADO.DESCRIPCION);
                            newCell4.appendChild(newText4);             
                            
                             var newCell5 = newRow.insertCell(4);
 var newText5 = document.createTextNode(data[ele].FECHA_INGRESO);
                       newCell5.appendChild(newText5);  
                             var newCell5 = newRow.insertCell(5);
 var dater=new Date(data[ele].FECHA_INGRESO);
 var newText5 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                         
                       newCell5.appendChild(newText5); 
                            
                            var newCell7 = newRow.insertCell(6);
                              var newText7 = document.createTextNode(data[ele].IDENTIFICACION.EMAIL1);
                        
                              newCell7.appendChild(newText7);
//                             //BOTON DE ELIMINAR
//                           
//                            
                            var newCell8 = newRow.insertCell(7);
                              var newText8 = document.createTextNode(data[ele].IDENTIFICACION.TEL1 + '/'+ data[ele].IDENTIFICACION.TEL2 + '/'+ data[ele].IDENTIFICACION.CEL );
//                        
                              newCell8.appendChild(newText8);
                            
                             var newText9 = document.createTextNode(calcularEdad(data[ele].IDENTIFICACION.FECHA_NACIMIENTO));
                        
                          
                            
//                            
                               var newCell11 = newRow.insertCell(8);
//                            
                              newCell11.appendChild(newText9);
                           
                            
                            
                            
//                             //BOTON DE FORZAR
                            var btnFORZAR = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnFORZAR.type="button";
                             btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
                               btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnFORZAR.value="Buscar";
                            
                            var newCell10 = newRow.insertCell(9);
                            
                              newCell10.appendChild(btnFORZAR);
                            
                                if(data[ele].IDENTIFICACION.EMAIL1 != '')
                                {
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                             btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
                               btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Correo";
                            
                            var newCell11 = newRow.insertCell(10);
                            
                              newCell11.appendChild(btncorreo);
                                }else
                                    {
                                         var newCell11 = newRow.insertCell(10);
                             var newTextx = document.createTextNode('');
                        
                              newCell11.appendChild(newTextx);
                                    }
//                                 }
                        }
                   $('#tabla').dataTable({
        "scrollY":        "200px",
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
 

        }

           function devuelveplanilladossolidaridad() {
  $('#tabla').remove();
           $('#infopersonal').innerHtml='';
             $('#tabla_wrapper').remove();
          $('#titulo').remove();
            var persona = new Object();
            persona.tipo = '9';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                        
                       
                        
                         $('#infopersonal').append("<h1 id = 'titulo'>Listado de afiliados a solidaridad por planilla</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Fecha de ingreso</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Telefono(s)</th><th scope='col' abbr='Starter'>Observaciones</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
                        $('#infopersonal').append(" </tbody></table>");

                        
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


                            var newText3 = document.createTextNode(data[ele].MONTO);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

      var newText4 = document.createTextNode(data[ele].ESTADO.DESCRIPCION);
                            newCell4.appendChild(newText4);
//
//                       
  var newCell5 = newRow.insertCell(4);
 var dater=new Date(data[ele].FECHA_INGRESO);
 var newText5 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                         
                       newCell5.appendChild(newText5);  

                        

//
//                            
//                            
                            var newCell7 = newRow.insertCell(5);
                              var newText7 = document.createTextNode(data[ele].IDENTIFICACION.EMAIL1);
                        
                              newCell7.appendChild(newText7);
//                             //BOTON DE ELIMINAR
//                           
//                            
                            var newCell8 = newRow.insertCell(6);
                              var newText8 = document.createTextNode(data[ele].IDENTIFICACION.TEL1 + '/'+ data[ele].IDENTIFICACION.TEL2 + '/'+ data[ele].IDENTIFICACION.CEL );
//                        
                              newCell8.appendChild(newText8);
                              if (data[ele].OBSERVACIONES != null) {
                                  var newText9 = document.createTextNode(data[ele].OBSERVACIONES);
                              }
                              else
                              {
                                  var newText9 = document.createTextNode("");

                              }
                           var btnobs = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnobs.type="button";
                               btnobs.setAttribute("onclick", "obs('"+ data[ele].IDENTIFICACION.IDENTIFICACION +"','SOLIDARIDAD','"+data[ele].OBSERVACIONES +"');");
                               btnobs.id = 'botono' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnobs.value="Agregar Observacion";
                            
//                            
                               var newCell11 = newRow.insertCell(7);
//                            
                              newCell11.appendChild(newText9);
                            newCell11.appendChild(btnobs);
                            
                            
                            
//                             //BOTON DE FORZAR
                            var btnFORZAR = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnFORZAR.type="button";
                             btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
                               btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnFORZAR.value="Buscar";
                            
                            var newCell10 = newRow.insertCell(8);
                            
                              newCell10.appendChild(btnFORZAR);
                            
                                if(data[ele].IDENTIFICACION.EMAIL1 != '')
                                {
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                             btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
                               btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Correo";
                            
                            var newCell11 = newRow.insertCell(9);
                            
                              newCell11.appendChild(btncorreo);
                                }else
                                    {
                                         var newCell11 = newRow.insertCell(9);
                             var newTextx = document.createTextNode('');
                        
                              newCell11.appendChild(newTextx);
                                    }
//                                 }
                        }
                   $('#tabla').dataTable({
        "scrollY":        "200px",
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
 

        }
 
           function devuelveplanilladosmutualidad() {
  $('#tabla').remove();
           $('#infopersonal').innerHtml='';
             $('#tabla_wrapper').remove();
          $('#titulo').remove();
            var persona = new Object();
            persona.tipo = '11';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                        
                       
                        
                         $('#infopersonal').append("<h1 id = 'titulo'>Listado de afiliados a mutualidad por planilla</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Fecha de ingreso</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Telefono(s)</th><th scope='col' abbr='Starter'>Observaciones</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
                        $('#infopersonal').append(" </tbody></table>");

                        
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


                            var newText3 = document.createTextNode(data[ele].MONTO);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

      var newText4 = document.createTextNode(data[ele].ESTADO.DESCRIPCION);
                            newCell4.appendChild(newText4);
//
//                       
  var newCell5 = newRow.insertCell(4);
 var dater=new Date(data[ele].FECHA_INGRESO);
 var newText5 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                         
                       newCell5.appendChild(newText5);  

                        

//
//                            
//                            
                            var newCell7 = newRow.insertCell(5);
                              var newText7 = document.createTextNode(data[ele].IDENTIFICACION.EMAIL1);
                        
                              newCell7.appendChild(newText7);
//                             //BOTON DE ELIMINAR
//                           
//                            
                            var newCell8 = newRow.insertCell(6);
                              var newText8 = document.createTextNode(data[ele].IDENTIFICACION.TEL1 + '/'+ data[ele].IDENTIFICACION.TEL2 + '/'+ data[ele].IDENTIFICACION.CEL );
//                        
                              newCell8.appendChild(newText8);
                            
                             var newText9 = document.createTextNode(data[ele].OBSERVACIONES);
                        
                           var btnobs = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnobs.type="button";
                               btnobs.setAttribute("onclick", "obs('"+ data[ele].IDENTIFICACION.IDENTIFICACION +"','MUTUALIDAD','"+data[ele].OBSERVACIONES +"');");
                               btnobs.id = 'botono' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnobs.value="Agregar Observacion";
                            
//                            
                               var newCell11 = newRow.insertCell(7);
//                            
                              newCell11.appendChild(newText9);
                            newCell11.appendChild(btnobs);
                            
                            
                            
//                             //BOTON DE FORZAR
                            var btnFORZAR = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnFORZAR.type="button";
                             btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
                               btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnFORZAR.value="Buscar";
                            
                            var newCell10 = newRow.insertCell(8);
                            
                              newCell10.appendChild(btnFORZAR);
                            
                                if(data[ele].IDENTIFICACION.EMAIL1 != '')
                                {
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                             btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
                               btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Correo";
                            
                            var newCell11 = newRow.insertCell(9);
                            
                              newCell11.appendChild(btncorreo);
                                }else
                                    {
                                         var newCell11 = newRow.insertCell(9);
                             var newTextx = document.createTextNode('');
                        
                              newCell11.appendChild(newTextx);
                                    }
//                                 }
                        }
                   $('#tabla').dataTable({
        "scrollY":        "200px",
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
 

        }

           function devuelvepensionadosmutualidad() {
  $('#tabla').remove();
           $('#infopersonal').innerHtml='';
             $('#tabla_wrapper').remove();
          $('#titulo').remove();
            var persona = new Object();
            persona.tipo = '12';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                        
                       
                        
                         $('#infopersonal').append("<h1 id = 'titulo'>Listado de afiliados a mutualidad pensionados</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Fecha de ingreso</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Telefono(s)</th><th scope='col' abbr='Starter'>Observaciones</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
                        $('#infopersonal').append(" </tbody></table>");

                        
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


                            var newText3 = document.createTextNode(data[ele].MONTO);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

      var newText4 = document.createTextNode(data[ele].ESTADO.DESCRIPCION);
                            newCell4.appendChild(newText4);
//
//                       
  var newCell5 = newRow.insertCell(4);
  var dater=new Date(data[ele].FECHA_INGRESO);
 var newText5 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                         
                       newCell5.appendChild(newText5);  

                        

//
//                            
//                            
                            var newCell7 = newRow.insertCell(5);
                              var newText7 = document.createTextNode(data[ele].IDENTIFICACION.EMAIL1);
                        
                              newCell7.appendChild(newText7);
//                             //BOTON DE ELIMINAR
//                           
//                            
                            var newCell8 = newRow.insertCell(6);
                              var newText8 = document.createTextNode(data[ele].IDENTIFICACION.TEL1 + '/'+ data[ele].IDENTIFICACION.TEL2 + '/'+ data[ele].IDENTIFICACION.CEL );
//                        
                              newCell8.appendChild(newText8);
                            
                             var newText9 = document.createTextNode(data[ele].OBSERVACIONES);
                        
                           var btnobs = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnobs.type="button";
                               btnobs.setAttribute("onclick", "obs('"+ data[ele].IDENTIFICACION.IDENTIFICACION +"','MUTUTALIDAD','"+data[ele].OBSERVACIONES +"');");
                               btnobs.id = 'botono' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnobs.value="Agregar Observacion";
                            
//                            
                               var newCell11 = newRow.insertCell(7);
//                            
                              newCell11.appendChild(newText9);
                            newCell11.appendChild(btnobs);
                            
                            
                            
//                             //BOTON DE FORZAR
                            var btnFORZAR = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnFORZAR.type="button";
                             btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
                               btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnFORZAR.value="Buscar";
                            
                            var newCell10 = newRow.insertCell(8);
                            
                              newCell10.appendChild(btnFORZAR);
                            
                                if(data[ele].IDENTIFICACION.EMAIL1 != '')
                                {
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                             btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
                               btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Correo";
                            
                            var newCell11 = newRow.insertCell(9);
                            
                              newCell11.appendChild(btncorreo);
                                }else
                                    {
                                         var newCell11 = newRow.insertCell(9);
                             var newTextx = document.createTextNode('');
                        
                              newCell11.appendChild(newTextx);
                                    }
//                                 }
                        }
                   $('#tabla').dataTable({
        "scrollY":        "200px",
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
 

        }

           function devuelvepensionadossolidaridad() {
  $('#tabla').remove();
           $('#infopersonal').innerHtml='';
             $('#tabla_wrapper').remove();
          $('#titulo').remove();
            var persona = new Object();
            persona.tipo = '10';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                        
                       
                        
                         $('#infopersonal').append("<h1 id = 'titulo'>Listado de afiliados a solidaridad pensionados</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Fecha de ingreso</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Telefono(s)</th><th scope='col' abbr='Starter'>Observaciones</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
                        $('#infopersonal').append(" </tbody></table>");

                        
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


                            var newText3 = document.createTextNode(data[ele].MONTO);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

      var newText4 = document.createTextNode(data[ele].ESTADO.DESCRIPCION);
                            newCell4.appendChild(newText4);
//
//                       
  var newCell5 = newRow.insertCell(4);
 var dater=new Date(data[ele].FECHA_INGRESO);
 var newText5 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                         
                       newCell5.appendChild(newText5);  

                        

//
//                            
//                            
                            var newCell7 = newRow.insertCell(5);
                              var newText7 = document.createTextNode(data[ele].IDENTIFICACION.EMAIL1);
                        
                              newCell7.appendChild(newText7);
//                             //BOTON DE ELIMINAR
//                           
//                            
                            var newCell8 = newRow.insertCell(6);
                              var newText8 = document.createTextNode(data[ele].IDENTIFICACION.TEL1 + '/'+ data[ele].IDENTIFICACION.TEL2 + '/'+ data[ele].IDENTIFICACION.CEL );
//                        
                              newCell8.appendChild(newText8);
                            
                             var newText9 = document.createTextNode(data[ele].OBSERVACIONES);
                        
                           var btnobs = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnobs.type="button";
                               btnobs.setAttribute("onclick", "obs('"+ data[ele].IDENTIFICACION.IDENTIFICACION +"','SOLIDARIDAD','"+data[ele].OBSERVACIONES +"');");
                               btnobs.id = 'botono' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnobs.value="Agregar Observacion";
                            
//                            
                               var newCell11 = newRow.insertCell(7);
//                            
                              newCell11.appendChild(newText9);
                            newCell11.appendChild(btnobs);
                            
                            
                            
//                             //BOTON DE FORZAR
                            var btnFORZAR = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnFORZAR.type="button";
                             btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
                               btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnFORZAR.value="Buscar";
                            
                            var newCell10 = newRow.insertCell(8);
                            
                              newCell10.appendChild(btnFORZAR);
                            
                                if(data[ele].IDENTIFICACION.EMAIL1 != '')
                                {
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                             btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
                               btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Correo";
                            
                            var newCell11 = newRow.insertCell(9);
                            
                              newCell11.appendChild(btncorreo);
                                }else
                                    {
                                         var newCell11 = newRow.insertCell(9);
                             var newTextx = document.createTextNode('');
                        
                              newCell11.appendChild(newTextx);
                                    }
//                                 }
                        }
                   $('#tabla').dataTable({
        "scrollY":        "200px",
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
 

        }
 
           function devuelveafiliacionesnuevas() {
  $('#tabla').remove();
           $('#infopersonal').innerHtml='';
             $('#tabla_wrapper').remove();
          $('#titulo').remove();
          var persona = new Object();
          persona.tipo = '13';
          persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
          persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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



                      $('#infopersonal').append("<h1 id = 'titulo'>Afiliaciones pendientes de aprobar por junta</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Centro funcional</th><th scope='col' abbr='Starter'>Paga afiliacion</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Puesto</th><th scope='col' abbr='Starter'>Departamento</th><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Usuario responsable</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
                      $('#infopersonal').append(" </tbody></table>");


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
                          var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO);
                          newCell2.appendChild(newText2);
                          //
                          var newCell3 = newRow.insertCell(2);


                          var newText3 = document.createTextNode(data[ele].IDENTIFICACION.CENTRO_FUNCIONAL.DESCRIPCION);
                          newCell3.appendChild(newText3);
                          var newCell4 = newRow.insertCell(3);

                          var newText4 = document.createTextNode(data[ele].AFILIACION.CUOTA);
                          newCell4.appendChild(newText4);
                          //
                          //
                          var newCell5 = newRow.insertCell(4);
                          var newText5 = document.createTextNode(data[ele].IDENTIFICACION.EMAIL1 + ' - ' + data[ele].IDENTIFICACION.EMAIL2);
                          newCell5.appendChild(newText5);




                          var newCell5 = newRow.insertCell(5);
                          var newText5 = document.createTextNode(data[ele].IDENTIFICACION.PUESTO);
                          newCell5.appendChild(newText5);



                          //
                          //
                          //
                          var newCell7 = newRow.insertCell(6);
                          var newText7 = document.createTextNode(data[ele].IDENTIFICACION.DEPARTAMENTO);

                          newCell7.appendChild(newText7);
                          //                             //BOTON DE ELIMINAR
                          //
                          //
                          var newCell8 = newRow.insertCell(7);
                          var newText8 = document.createTextNode('Solidaridad');
                          //
                          newCell8.appendChild(newText8);

                          var newCell8 = newRow.insertCell(8);
                          var newText9 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                          newCell8.appendChild(newText9);




                          //                             //BOTON DE FORZAR
                          var btnFORZAR = document.createElement("input");
                          //btnmodifica.type = "button";
                          btnFORZAR.type = "button";
                          btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
                          btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                          btnFORZAR.value = "Buscar";

                          var newCell10 = newRow.insertCell(9);

                          newCell10.appendChild(btnFORZAR);

                          if (data[ele].IDENTIFICACION.EMAIL1 != '') {
                              var btncorreo = document.createElement("input");
                              //btnmodifica.type = "button";
                              btncorreo.type = "button";
                              btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
                              btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
                              btncorreo.value = "Correo";

                              var newCell11 = newRow.insertCell(10);

                              newCell11.appendChild(btncorreo);
                          } else {
                              var newCell11 = newRow.insertCell(10);
                              var newTextx = document.createTextNode('sin correo');

                              newCell11.appendChild(newTextx);
                          }
                          //                                 }
                      }

                      persona.tipo = '14';

                      persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                      persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                                      var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO);
                                      newCell2.appendChild(newText2);
                                      //
                                      var newCell3 = newRow.insertCell(2);


                                      var newText3 = document.createTextNode(data[ele].IDENTIFICACION.CENTRO_FUNCIONAL.DESCRIPCION);
                                      newCell3.appendChild(newText3);
                                      var newCell4 = newRow.insertCell(3);

                                      var newText4 = document.createTextNode(data[ele].AFILIACION.CUOTA);
                                      newCell4.appendChild(newText4);
                                      //
                                      //
                                      var newCell5 = newRow.insertCell(4);
                                      var newText5 = document.createTextNode(data[ele].IDENTIFICACION.EMAIL1 + ' - ' + data[ele].IDENTIFICACION.EMAIL2);
                                      newCell5.appendChild(newText5);




                                      var newCell5 = newRow.insertCell(5);
                                      var newText5 = document.createTextNode(data[ele].IDENTIFICACION.PUESTO);
                                      newCell5.appendChild(newText5);



                                      //
                                      //
                                      //
                                      var newCell7 = newRow.insertCell(6);
                                      var newText7 = document.createTextNode(data[ele].IDENTIFICACION.DEPARTAMENTO);

                                      newCell7.appendChild(newText7);
                                      //                             //BOTON DE ELIMINAR
                                      //
                                      //
                                      var newCell8 = newRow.insertCell(7);
                                      var newText8 = document.createTextNode('Mutualidad');
                                      //
                                      newCell8.appendChild(newText8);

                                      var newCell8 = newRow.insertCell(8);
                                      var newText9 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                                      newCell8.appendChild(newText9);




                                      //                             //BOTON DE FORZAR
                                      var btnFORZAR = document.createElement("input");
                                      //btnmodifica.type = "button";
                                      btnFORZAR.type = "button";
                                      btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id="+ data[ele].IDENTIFICACION.IDENTIFICACION+"';");
                                      btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                                      btnFORZAR.value = "Buscar";

                                      var newCell10 = newRow.insertCell(9);

                                      newCell10.appendChild(btnFORZAR);

                                      if (data[ele].IDENTIFICACION.EMAIL1 != '') {
                                          var btncorreo = document.createElement("input");
                                          //btnmodifica.type = "button";
                                          btncorreo.type = "button";
                                          btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
                                          btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
                                          btncorreo.value = "Correo";

                                          var newCell11 = newRow.insertCell(10);

                                          newCell11.appendChild(btncorreo);
                                      } else {
                                          var newCell11 = newRow.insertCell(10);
                                          var newTextx = document.createTextNode('sin correo');

                                          newCell11.appendChild(newTextx);
                                      }
                                      //                                 }
                                  }













                              }


                          },
                          error: function (xhr, textStatus, errorThrown) {
                              alert(xhr);
                          }
                      });








                      $('#tabla').dataTable({
                          "scrollY": "200px",
                          "scrollCollapse": true,
                          "paging": false,
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
 

        }
      
         function devuelveequipoprestado() {
 
            $('#tabla').remove();
         $('#infopersonal').innerHtml='';
          $('#tabla_wrapper').remove();
           $('#titulo').remove();
            var persona = new Object();
            persona.tipo = '15';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                        $('#infopersonal').append("<h1 id = 'titulo'>Equipo prestado</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Equipo</th><th scope='col' abbr='Starter'>Fecha del prestamo</th><th scope='col' abbr='Starter'>Fecha devolucion (estimada)</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Usuario</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
                        $('#infopersonal').append(" </tbody></table>");

                        
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
                            var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE +' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO);
                            newCell2.appendChild(newText2);
//
                            var newCell3 = newRow.insertCell(2);


                            var newText3 = document.createTextNode(data[ele].NUMERO_ACTIVO.DESCRIPCION);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

   var dater=new Date(data[ele].FECHA_PRESTAMO);
 var newText4 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                         
                            newCell4.appendChild(newText4);             
                            
                             var newCell5 = newRow.insertCell(4);
 var dater=new Date(data[ele].FECHA_DEVOLUCION);
 var newText5 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                         





 newCell5.appendChild(newText5);


 var newCell3 = newRow.insertCell(5);


 var newText3 = document.createTextNode(data[ele].METODO_PAGO.DESCRIPCION);
 newCell3.appendChild(newText3);

 var newCell3 = newRow.insertCell(6);


 var newText3 = document.createTextNode(data[ele].MONTO);
 newCell3.appendChild(newText3);




                             var newCell5 = newRow.insertCell(7);
 var newText5 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                       newCell5.appendChild(newText5); 
                            
                          
                            
                            
//                             //BOTON DE FORZAR
                            var btnFORZAR = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnFORZAR.type="button";
                             btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
                               btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnFORZAR.value="Buscar";
                            
                            var newCell10 = newRow.insertCell(8);
                            
                              newCell10.appendChild(btnFORZAR);
                            
                                if(data[ele].IDENTIFICACION.EMAIL1 != '')
                                {
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                             btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
                               btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Correo";
                            
                            var newCell11 = newRow.insertCell(9);
                            
                              newCell11.appendChild(btncorreo);
                                }else
                                    {
                                         var newCell11 = newRow.insertCell(9);
                             var newTextx = document.createTextNode('');
                        
                              newCell11.appendChild(newTextx);
                                    }
//                                 }
                        }
                  
                        
                        
                        $('#tabla').dataTable({
        "scrollY":        "200px",
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
 

        }
    
         function devuelvedefmutualidad() {
 
            $('#tabla').remove();
         $('#infopersonal').innerHtml='';
          $('#tabla_wrapper').remove();
           $('#titulo').remove();
            var persona = new Object();
            persona.tipo = '20';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                        $('#infopersonal').append("<h1 id = 'titulo'>Defunciones en mutualidad</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Fecha defuncion</th><th scope='col' abbr='Starter'>Fecha deduccion</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Beneficiarios</th><th scope='col' abbr='Starter'>Usuairio responsable</th><th scope='col' abbr='Starter'>Buscar</th></tr></thead><tbody>");
                        $('#infopersonal').append(" </tbody></table>");

                        
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
                            var newText2 = document.createTextNode(data[ele].IDENTIFICACION.NOMBRE +' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO);
                            newCell2.appendChild(newText2);
//
                            var newCell3 = newRow.insertCell(2);


                          
                             var dater=new Date(data[ele].FECHA_DEFUNCION);
 var newText3 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                         
                            
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

     
                            
                                var dater=new Date(data[ele].FECHA_DEDUCCION);
 var newText4 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                            newCell4.appendChild(newText4);             
                            
                             var newCell5 = newRow.insertCell(4);
 var newText5 = document.createTextNode(data[ele].MONTO_SUBSIDIO);
                       newCell5.appendChild(newText5);  
                            
                            var newCell5 = newRow.insertCell(5);
 var newText5 = document.createTextNode(data[ele].BENEFICIARIOS);
                       newCell5.appendChild(newText5); 
                            
                             var newCell5 = newRow.insertCell(6);
 var newText5 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                       newCell5.appendChild(newText5); 
                            
                          
                            
                            
//                             //BOTON DE FORZAR
                            var btnFORZAR = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnFORZAR.type="button";
                             btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
                               btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnFORZAR.value="Buscar";
                            
                            var newCell10 = newRow.insertCell(7);
                            
                              newCell10.appendChild(btnFORZAR);
                            
                               
//                                 }
                        }
                  
                        
                        
                        $('#tabla').dataTable({
        "scrollY":        "200px",
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
 

        }
    
//        
         function devuelvedefSOLIDARIDAD() {
 
            $('#tabla').remove();
         $('#infopersonal').innerHtml='';
          $('#tabla_wrapper').remove();
           $('#titulo').remove();
            var persona = new Object();
            persona.tipo = '21';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                        $('#infopersonal').append("<h1 id = 'titulo'>Defunciones en solidaridad</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Fecha defuncion</th><th scope='col' abbr='Starter'>Fecha deduccion</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>FALLECIDO</th><th scope='col' abbr='Starter'>Usuairio responsable</th><th scope='col' abbr='Starter'>Buscar</th></tr></thead><tbody>");
                        $('#infopersonal').append(" </tbody></table>");

                        
                        for (var ele in data) {

                            var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                            var newText = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION.IDENTIFICACION)

                            newCell.appendChild(newText);
                        
                            var newCell2 = newRow.insertCell(1);

//
                            var newText2 = document.createTextNode(data[ele].IDENTIFICACION.IDENTIFICACION.NOMBRE +' ' + data[ele].IDENTIFICACION.IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.IDENTIFICACION.SEGUNDO_APELLIDO);
                            newCell2.appendChild(newText2);
//
                            var newCell3 = newRow.insertCell(2);


                          
                             var dater=new Date(data[ele].FECHA_DEFUNCION);
 var newText3 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                         
                          
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

   
                             var dater=new Date(data[ele].FECHA_DEDUCCION);
 var newText4 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                         
                            newCell4.appendChild(newText4);             
                            
                             var newCell5 = newRow.insertCell(4);
 var newText5 = document.createTextNode(data[ele].MONTO_SUBSIDIO);
                       newCell5.appendChild(newText5);  
//                            var iteme = data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.NOMBRE + ' ' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION_FAMILIAR.IDENTIFICACION_FAMILIAR.SEGUNDO_APELLIDO;
                            var newCell6 = newRow.insertCell(5);
 var newText6 = document.createTextNode('Fallecido');
                       newCell6.appendChild(newText6); 
                            
                             var newCell7 = newRow.insertCell(6);
 var newText7 = document.createTextNode(data[ele].USUARIO.NOMBRE_COMPLETO);
                       newCell7.appendChild(newText7); 
                            
                          
                            
                            
//                             //BOTON DE FORZAR
                            var btnFORZAR = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnFORZAR.type="button";
                             btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
                               btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnFORZAR.value="Buscar";
                            
                            var newCell10 = newRow.insertCell(7);
                            
                              newCell10.appendChild(btnFORZAR);
                            
                               
//                                 }
                        }
                  
                        
                        
                        $('#tabla').dataTable({
        "scrollY":        "200px",
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
 

        }
    
//              
     function devuelverecienaprobados() {
  $('#tabla').remove();
           $('#infopersonal').innerHtml='';
             $('#tabla_wrapper').remove();
          $('#titulo').remove();
            var persona = new Object();
            persona.tipo = '33';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                        
                       
                        
                         $('#infopersonal').append("<h1 id = 'titulo'>Recien aprobados</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Estado actual</th><th scope='col' abbr='Starter'>Fecha de ingreso</th><th scope='col' abbr='Starter'>Correo</th><th scope='col' abbr='Starter'>Telefono(s)</th><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
                        $('#infopersonal').append(" </tbody></table>");

                        
                        for (var ele in data) {

                            var tableRef = document.getElementById('tabla').getElementsByTagName('tbody')[0];

                            // Insert a row in the table at the last row
                            var newRow = tableRef.insertRow(tableRef.rows.length);

                            // Insert a cell in the row at index 0
                            var newCell = newRow.insertCell(0);

                            // Append a text node to the cell
                            var newText = document.createTextNode(data[ele].Identificacion);

                            newCell.appendChild(newText);
                        
                            var newCell2 = newRow.insertCell(1);

//
                            var newText2 = document.createTextNode(data[ele].Nombre + ' ' + data[ele]['Primer apellido'] + ' ' + data[ele]['Segundo apellido']);
                            newCell2.appendChild(newText2);
//
                            var newCell3 = newRow.insertCell(2);


                            var newText3 = document.createTextNode(data[ele].Saldo);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

      var newText4 = document.createTextNode(data[ele].Estado);
                            newCell4.appendChild(newText4);
//
//                       
  var newCell5 = newRow.insertCell(4);

  //var dater=new Date(data[ele]['Fecha de ingreso']);
  var newText5 = document.createTextNode(data[ele]['Fecha de ingreso']);
                         
                       newCell5.appendChild(newText5);  

                        

//
//                            
//                            
                            var newCell7 = newRow.insertCell(5);
                              var newText7 = document.createTextNode(data[ele].Correo);
                        
                              newCell7.appendChild(newText7);
//                             //BOTON DE ELIMINAR
//                           
//                            
                            var newCell8 = newRow.insertCell(6);
                            var newText8 = document.createTextNode(data[ele].Telefonos);
//                        
                              newCell8.appendChild(newText8);
                            
                              var newText9 = document.createTextNode(data[ele].Fondo);
                        
                          
                            
//                            
                               var newCell11 = newRow.insertCell(7);
//                            
                              newCell11.appendChild(newText9);
                           
                            
                            
                            
//                             //BOTON DE FORZAR
                            var btnFORZAR = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnFORZAR.type="button";
                             btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].Identificaci�n + "';");
                               btnFORZAR.id = 'boton' + data[ele].Identificaci�n;
                               btnFORZAR.value="Buscar";
                            
                            var newCell10 = newRow.insertCell(8);
                            
                              newCell10.appendChild(btnFORZAR);
                            
                                if(data[ele].Correo != '')
                                {
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                             btncorreo.setAttribute("onclick", "correo('" + data[ele].Correo + "','" + data[ele].Nombre + ' ' + data[ele]['Primer apellido'] + ' ' + data[ele]['Segundo apellido'] + "');");
                               btncorreo.id = 'botonc' + data[ele].Identificaci�n;
                               btncorreo.value="Correo";
                            
                            var newCell11 = newRow.insertCell(9);
                            
                              newCell11.appendChild(btncorreo);
                                }else
                                    {
                                         var newCell11 = newRow.insertCell(9);
                             var newTextx = document.createTextNode('');
                        
                              newCell11.appendChild(newTextx);
                                    }
//                                 }
                        }


                   $('#tabla').dataTable({
        "scrollY":        "200px",
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
 

        }
      
//           
     function devuelveexcluidosporsistema() {
  $('#tabla').remove();
           $('#infopersonal').innerHtml='';
             $('#tabla_wrapper').remove();
          $('#titulo').remove();
            var persona = new Object();
            persona.tipo = '24';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

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
                        
                       
                        
                         $('#infopersonal').append("<h1 id = 'titulo'>Exclucion por sistema</h1><table id='tabla' class='display'><thead><tr><th scope='col' abbr='Starter'>Identificacion</th><th scope='col' abbr='Starter'>Nombre y apellidos</th><th scope='col' abbr='Starter'>Motivo</th><th scope='col' abbr='Starter'>Fecha</th><th scope='col' abbr='Starter'>Fondo</th><th scope='col' abbr='Starter'>Buscar</th><th scope='col' abbr='Starter'>Enviar correo personalizado</th></tr></thead><tbody>");
                        $('#infopersonal').append(" </tbody></table>");

                        
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


                            var newText3 = document.createTextNode(data[ele].MOTIVO);
                            newCell3.appendChild(newText3);
                            var newCell4 = newRow.insertCell(3);

     
                            
                             var dater=new Date(data[ele].FECHA_EFECTIVA);
 var newText4 = document.createTextNode(dateConvert(dater,"DD-MM-YYYY"));
                           
                            newCell4.appendChild(newText4);             
                            
                             var newCell5 = newRow.insertCell(4);
 var newText5 = document.createTextNode(data[ele].FONDO);
                       newCell5.appendChild(newText5);  
                            
                            
                            
//                             //BOTON DE FORZAR
                            var btnFORZAR = document.createElement("input");
                               //btnmodifica.type = "button";
                             btnFORZAR.type="button";
                             btnFORZAR.setAttribute("onclick", "window.location='inicio.html?id=" + data[ele].IDENTIFICACION.IDENTIFICACION + "';");
                               btnFORZAR.id = 'boton' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btnFORZAR.value="Buscar";
                            
                            var newCell10 = newRow.insertCell(5);
                            
                              newCell10.appendChild(btnFORZAR);
                            
                                if(data[ele].IDENTIFICACION.EMAIL1 != '')
                                {
                                 var btncorreo = document.createElement("input");
                               //btnmodifica.type = "button";
                             btncorreo.type="button";
                             btncorreo.setAttribute("onclick", "correo('" + data[ele].IDENTIFICACION.EMAIL1 + "','" + data[ele].IDENTIFICACION.NOMBRE + ' ' + data[ele].IDENTIFICACION.PRIMER_APELLIDO + ' ' + data[ele].IDENTIFICACION.SEGUNDO_APELLIDO + "');");
                               btncorreo.id = 'botonc' + data[ele].IDENTIFICACION.IDENTIFICACION;
                               btncorreo.value="Correo";
                            
                            var newCell11 = newRow.insertCell(6);
                            
                              newCell11.appendChild(btncorreo);
                                }else
                                    {
                                         var newCell11 = newRow.insertCell(6);
                             var newTextx = document.createTextNode('');
                        
                              newCell11.appendChild(newTextx);
                                    }
//                                 }
                        }
                   $('#tabla').dataTable({
        "scrollY":        "200px",
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
 

        }
     function correo(destinatario,nombrecompleto)
     {
         $('#cuadroenviacorreo').css('visibility', 'visible');
         //          $('#cuadroagregaobs').append('<h1>Nuevas observaciones</h1>')
         //           $('#cuadroagregaobs').append('<p>Para la identificacion '+ id +' en el fondo ' + fondo +'</p>')
         //           
         $('#cuadroenviacorreo').append("<h1>Nuevo correo </h1><p id='asuntocorreo'>Mensage dirigido a " + nombrecompleto + " por parte de la Asociacion de Bienestar Social de los Empleados del ICE</p>");

         $('#cuadroenviacorreo').append("<paper-input flex label='Emisor' id='emisorcorreo' value='Info@asobiso.com' disabled></paper-input><paper-input flex label='Destinatario' id='detcorreo' value='" + destinatario + "' disabled></paper-input><textarea rows='20' cols='80' id='obstexto' onkeypress='habilitaenviocorreo()' placeholder='Escriba su correo aqui' ></textarea>");
         $('#cuadroenviacorreo').append("<hr><paper-button raised id='btnenviacorreo' onclick='ajaxenviacorreo()' disabled>Enviar </paper-button><paper-button raised' onclick='cerrarajaxcorreo()'>Salir</paper-button>");
        

     }

     function cerrarajaxcorreo() {

         $('#cuadroenviacorreo').html("");
         $('#cuadroenviacorreo').css('visibility', 'hidden');

     }
     function ajaxenviacorreo()
     {
         var persona = new Object();


         persona.criterio = 'msg';
         persona.para = document.getElementById("detcorreo").value;

         persona.asunto = document.getElementById("asuntocorreo").value;
        
         persona.html = document.getElementById("obstexto").value;
         persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
         persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

         $.ajax({
             url: urllocal + 'Correo',
             // url: 'http://192.168.30.104//api/Obs',
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
         $('#cuadroenviacorreo').html("");
         $('#cuadroenviacorreo').css('visibility', 'hidden');

     }

     function habilitaenviocorreo() {

         document.getElementById("btnenviacorreo").disabled = false;

         document.getElementById("btnenviacorreo").style.background = 'green';
     }
    function obs(id,fondo,obsactuales)
        {
            
             $('#cuadroagregaobs').css('visibility','visible');
//          $('#cuadroagregaobs').append('<h1>Nuevas observaciones</h1>')
//           $('#cuadroagregaobs').append('<p>Para la identificacion '+ id +' en el fondo ' + fondo +'</p>')
//           
         $('#cuadroagregaobs').append("<h1>Nuevas observaciones</h1><p>Para la identificacion "+ id +" en el fondo " + fondo +"</p>" );
            
              $('#cuadroagregaobs').append("<textarea rows='20' cols='80' id='obstexto' onkeypress='habilitaguardar()' >"+ obsactuales +"</textarea>");
              $('#cuadroagregaobs').append("<hr><paper-button raised id='btngobs' onclick='ajaxagregaobs()' disabled>Modificar observaciones </paper-button><paper-button raised'onclick='cerrarajaxagregaobs()'>Salir</paper-button>");
            document.getElementById("idescogido").value= id;
            
            document.getElementById("fondoescogido").value = fondo;
           
        }
      function habilitaguardar()
        {
            
             document.getElementById("btngobs").disabled = false;
            
             document.getElementById("btngobs").style.background='green';
        }
        

$(document).ready(function() {
   
});
             
  function calcularEdad(fecha)
{

    
        // Si la fecha es correcta, calculamos la edad
        var values=fecha.split("-");
        var dia = values[2];
        var mes = values[1];
        var ano = values[0];
 
        // cogemos los valores actuales
        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getYear();
        var ahora_mes = fecha_hoy.getMonth()+1;
        var ahora_dia = fecha_hoy.getDate();
 
        // realizamos el calculo
        var edad = (ahora_ano + 1900) - ano;
        if ( ahora_mes < mes )
        {
            edad--;
        }
        if ((mes == ahora_mes) && (ahora_dia < dia))
        {
            edad--;
        }
        if (edad > 1900)
        {
            edad -= 1900;
        }
 
        // calculamos los meses
        var meses=0;
        if(ahora_mes>mes)
            meses=ahora_mes-mes;
        if(ahora_mes<mes)
            meses=12-(mes-ahora_mes);
        if(ahora_mes==mes && dia>ahora_dia)
            meses=11;
 
        // calculamos los dias
        var dias=0;
        if(ahora_dia>dia)
            dias=ahora_dia-dia;
        if(ahora_dia<dia)
        {
            ultimoDiaMes=new Date(ahora_ano, ahora_mes, 0);
            dias=ultimoDiaMes.getDate()-(dia-ahora_dia);
        }
 return edad;
   
}



//function ajaxagregaobs(uno, dos, tres) {
//    var persona = new Object();


//    persona.id = uno;
//    persona.fondo = dos;

//    persona.obs = tres;
//    persona.actualiza = 'Si';
//    var tabla;
//    $.ajax({
//        url: urllocal + 'Obs',
//        // url: 'http://192.168.30.104//api/Obs',
//        type: 'POST',
//        dataType: 'json',
//        data: persona,
//        success: function (data, textStatus, xhr) {
//            if (data.ID == 0) {
//                alert("Persona no esta afiliada ni registrada");
//            } else {
//            }
//        },
//        error: function (xhr, textStatus, errorThrown) {
//            alert(errorThrown);
//        }
//    });

//    alert('Observacion insertada correctamente');
//    $('#cuadroagregaobs').html("");
//    $('#cuadroagregaobs').css('visibility', 'hidden');

//}
