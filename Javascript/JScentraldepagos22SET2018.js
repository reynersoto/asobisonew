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
//    document.getElementById("infopersonal").style.visibility = "hidden";
//});
//$(document).ajaxStop(function () {
//    $("#loading").html("");
//    $("#loading").removeAttr("style");
//    document.getElementById("infopersonal").style.visibility = "visible";
//});


var hoy = new Date();

var urllocal = 'api/';

if (JSON.parse(localStorage.getItem("USUARIOLOGUEADO")) == null)
                {
                    alert("No estas autorizado para ingresar aun");
                    location.href = "/login.html";

                }
                else
                {
                    alert(JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO);
                } 



var miniprofile = document.getElementById("people");
                miniprofile.innerHTML = "<li>  <img src='/Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg' onerror='this.src = 'Imagenes/btn_menu.png'' onclick='muestraprofilegrande();' /><table><tr><td><h2>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</h2><em>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "</em> </td><td></td><td><input type=image src=\"Imagenes/list-view.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"menu.html\"'></input></td><td><input type=image src=\"Imagenes/settings.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"prefuser.html\"'></input></td><td><input type=image src=\"Imagenes/plug.png\" width=\"45\" height=\"45\" onclick = \"salirdelsistema()\"></input></td></tr></table></li>";
                //FIN DEL PERFIL DE USUARIO MINI
                
                function salirdelsistema()
{
    
     localStorage.setItem("USUARIOLOGUEADO",null);
    
    window.location.href="Login.html";
    
    
}

                var options = { year: 'numeric', month: 'long', day: 'numeric' };

function cargatabs()
{
      document.getElementById("infopersonal").innerHTML += "<h2>Centro de pagos de "+ JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION+ ' ' +  JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO + "  </H2> <ul class='tabs' id='detalle' ></ul>";
    
    
    //CARGA ESTE TAB SI ESTA AFILIADO CON CUALQUIER ESTADO MENOS FALLECIDO A MUTUALIDAD, SE HACE LA DIFERENCIA SI ES POR AFILIACION OCUOTA
if(JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")) != null)
                   {
                   if  (JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).ESTADO.ID != 13)
                      
                       {
                  if  (JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).ESTADO.ID == 5)
                      {
                          
                        
                      $("#detalle").append("<li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>Pago de afiliación de mutualidad</label><div id='tab-content0' class='tab-content animated fadeIn'><H3> Saldo actual: " + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).MONTO + " Estado " + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).ESTADO.DESCRIPCION + " </H3> <paper-button raised id='cambioformadepagobtn' onclick='cambiofpafilmut()'>Por deposito bancario</paper-button><paper-input flex label='Identificacion del deposito' id='idpagoafilmutbanc' style='display:none;'></paper-input> <paper-input flex label='Identificacion del pago' id='idpagoafilmut' disabled></paper-input> <paper-input flex label='Serie del pago' id='seriepagoafilmut' value = 'B'></paper-input><paper-input flex label='Fecha del pago' id='fechapagoafilmut' type='date' value='" + hoy.format("yyyy-mm-dd") + "'> </paper-input> <paper-input flex label='Monto del pago' id='montopagoafilmut'></paper-input> <hr><paper-button raised id='pagoafilmut' onclick='pagaafilmut()'>Pagar</paper-button></div> </li>");
                                         var persona = new Object();
            persona.operacion = "1";
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

           persona.fondo = "MUTUALIDAD";
            //ajax de los datos personales
            $.ajax({
                url: urllocal+'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                         document.getElementById("idpagoafilmut").value = parseInt(data) +1 ;
                        
                    }
                }
            });  
                      }
                           else
                  {
                  
                      $("#detalle").append("<li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>Pago de cuotas mutualidad</label><div id='tab-content0' class='tab-content animated fadeIn'><H3 id='titulomut'> Saldo actual: "+ JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).MONTO  +" Estado "+ JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).ESTADO.DESCRIPCION +" </H3><paper-button raised id='cambioformadepagobtn' onclick='cambiofpmut()'>Por deposito bancario</paper-button><paper-input flex label='Identificacion del deposito' id='idpagomutbanc' style='display:none;'></paper-input><paper-input flex label='Identificacion del pago' id='idpagomut' disabled ></paper-input> <paper-input flex label='Serie del pago' id='seriepagomut'  value = 'B'></paper-input><paper-input flex label='Fecha del pago' id='fechapagomut' type='date' value='" + hoy.format("yyyy-mm-dd")+"'> </paper-input> <paper-input flex label='Monto del pago' id='montopagomut' onkeyup=\"calculasaldo('MUTUALIDAD')\"></paper-input><hr><paper-button raised id='pagomut' onclick='pagamut()'>Pagar</paper-button></div> </li>");
                                   var persona = new Object();
            persona.operacion = "1";
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

           persona.fondo = "MUTUALIDAD";
            //ajax de los datos personales
            $.ajax({
                url: urllocal+'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                         document.getElementById("idpagomut").value =  parseInt(data) +1;
                        
                    }
                }
            });  
                               }
                           
                          
                            var persona = new Object();
            persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
            persona.fondo = 'MUTUALIDAD';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            $.ajax({
                url: urllocal + 'Historial_pagos',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.length == 0) {
                      

                    } else {
                        var d = document.createElement('div');
                        d.setAttribute('id', 'historialmut');
                           d.setAttribute('style', 'height:200px;overflow-y: scroll');
                   document.getElementById("tab-content0").appendChild(d);
                     
                     
                        $('#historialmut').append("<h1>Historial de pagos en Mutualidad</h1><table id='tablahistorialmutualidad' class='table2'><thead><tr><th scope='col' abbr='Starter'>Quincena/Mes/Año</th><th scope='col' abbr='Starter'>ID y serie del pago</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Fecha</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Usuario</th><th scope='col' abbr='Starter'>Operacion</th><th scope='col' abbr='Starter'>Anular</th></tr></thead><tbody></tbody></table>");

                        for (var ele in data) {

                            var tableRef = document.getElementById("tablahistorialmutualidad").getElementsByTagName('tbody')[0];

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


                            var fecha1 = new Date(data[ele].FEC_ULT_ACT);
                            var fecha1 = new Date(fecha1.setTime(fecha1.getTime() + 1 * 86400000));
                            var newText5 = document.createTextNode(fecha1.toLocaleDateString("es-ES", options));
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

   var newCell0 = newRow.insertCell(7);
                               var btnmodifica = document.createElement("paper-button");
                               //btnmodifica.type = "button";
                            btnmodifica.setAttribute("raised","");
                               btnmodifica.setAttribute("onclick", "operacionpagomut('"+ data[ele].IDENTIFICACION_PAGO +"','"+ data[ele].SERIE_DEL_PAGO +"','"+ data[ele].MONTO +"','"+ data[ele].SALDO +"','"+ data[ele].FEC_ULT_ACT +"','"+ data[ele].METODO_PAGO +"','"+ data[ele].USUARIO.ID +"',\"MUTUALIDAD\");");
                               btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO;
                             
                            
                                 newCell0.appendChild(btnmodifica);
                            switch (data[ele].METODO_PAGO) {
                             
                                case 2:
                                  document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO).value='Imprimir comprobante';
                                    break;
                                case 3:
                                     document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO).value='Imprimir comprobante';
                                    break;
                                default:
                                     document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO).value='Reimprimir recibo';
                            }
                               //newCell0.innerHTML= "<input type='button' id= boton" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + " value='modificar' onclick='modificabeneficiario(" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ") />'";
                          


                            
                            
                            var newCellanula = newRow.insertCell(8);
                               var btnmodifica = document.createElement("paper-button");
                               //btnmodifica.type = "button";
                            btnmodifica.setAttribute("raised","");
                            if((data[ele].SERIE_DEL_PAGO != '') & (data[ele].IDENTIFICACION_PAGO != '') )
                                {
                                btnmodifica.setAttribute("onclick", "anulapago('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" +JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION + "',\"MUTUALIDAD\");");
                            }
                               btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO;
                             
                            
                                 newCellanula.appendChild(btnmodifica);
                            
                            

                        }







                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
                           
                           
                           
                       }
                       else
                           {
                               alert('Afiliado reportado como fallecido');
                               
                           }
                }

   
    //CARGA ESTE TAB SI ESTA AFILIADO CON CUALQUIER ESTADO MENOS FALLECIDO A SOLIDARIDAD, SE HACE LA DIFERENCIA SI ES POR AFILIACION OCUOTA
if(JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")) != null)
                   {
                       
                   if  (JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).ESTADO.ID  != 13)
                      
                       {
                  if  (JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).ESTADO.ID  == 5)
                      {
                          
                        
                      $("#detalle").append("<li id='pagodos'> <input type='radio' checked name='tabs' id='tab1'><label for='tab1'>Pago de afiliación en solidaridad</label><div id='tab-content1' class='tab-content animated fadeIn'><H3> Saldo actual: " + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).MONTO + "  Estado " + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).ESTADO.DESCRIPCION + " </H3><paper-button raised id='cambioformadepagobtnsol' onclick='cambiofpafilsol()'>Por deposito bancario</paper-button><paper-input flex label='Identificacion del deposito' id='idpagoafilsolbanc' style='display:none;'></paper-input> <paper-input flex label='Identificacion del pago' id='idpagoafilsol' disabled></paper-input> <paper-input flex label='Serie del pago' id='seriepagoafilsol'  value = 'A'></paper-input><paper-input flex label='Fecha del pago' id='fechapagoafilsol' type='date' value='" + hoy.format("yyyy-mm-dd") + "'> </paper-input> <paper-input flex label='Monto del pago' id='montopagoafilsol'></paper-input> <hr><paper-button raised id='pagoafilsol'  onclick='pagaafilsol()'>Pagar</paper-button></div> </li>");
                        var persona = new Object();
            persona.operacion = "1";
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

           persona.fondo = "SOLIDARIDAD";
            //ajax de los datos personales
            $.ajax({
                url: urllocal+'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                         document.getElementById("idpagoafilsol").value =  parseInt(data) +1;
                        
                    }
                }
            });  
                      }
                           else
                               {
                      $("#detalle").append("<li id='pagodos'> <input type='radio' checked name='tabs' id='tab1'><label for='tab1'>Pago de cuotas solidaridad</label><div id='tab-content1' class='tab-content animated fadeIn'><H3 id='titulosol'> Saldo actual: " + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).MONTO + "  Estado " + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).ESTADO.DESCRIPCION + " </H3><paper-button raised id='cambioformadepagobtnsol' onclick='cambiofpsol()'>Por deposito bancario</paper-button><paper-input flex label='Identificacion del deposito' id='idpagosolbanc' style='display:none;'></paper-input> <paper-input flex label='Identificacion del pago' id='idpagosol' disabled></paper-input> <paper-input flex label='Serie del pago' id='seriepagosol'  value = 'A'></paper-input><paper-input flex label='Fecha del pago' id='fechapagosol' type='date' value='" + hoy.format("yyyy-mm-dd") + "'> </paper-input> <paper-input flex label='Monto del pago' id='montopagosol' onkeyup=\"calculasaldo('SOLIDARIDAD')\"></paper-input><hr><paper-button raised id='pagosol'  onclick='pagasol()'>Pagar</paper-button></div> </li>");
                            var persona = new Object();
            persona.operacion = "1";
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

           persona.fondo = "SOLIDARIDAD";
            //ajax de los datos personales
            $.ajax({
                url: urllocal+'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                         document.getElementById("idpagosol").value =  parseInt(data) +1;
                        
                    }
                }
            });         
                               }
                           
                           
                            var persona = new Object();
            persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
            persona.fondo = 'SOLIDARIDAD';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            $.ajax({
                url: urllocal + 'Historial_pagos',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.length == 0) {
                      

                    } else {
                        var d = document.createElement('div');
                        d.setAttribute('id', 'historialsol');
                        d.setAttribute('style', 'height:200px;overflow-y: scroll');
                        document.getElementById("tab-content1").appendChild(d);
                     
                     
                        $('#historialsol').append("<h1>Historial de pagos en Solidaridad</h1><table id='tablahistorialsolidaridad' class='table2'><thead><tr><th scope='col' abbr='Starter'>Quincena/Mes/Año</th><th scope='col' abbr='Starter'>ID y serie del pago</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Fecha</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Usuario</th><th scope='col' abbr='Starter'>Operacion</th><th scope='col' abbr='Starter'>Anular</th></tr></thead><tbody></tbody></table>");

                        for (var ele in data) {

                            var tableRef = document.getElementById("tablahistorialsolidaridad").getElementsByTagName('tbody')[0];

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


                            var fecha1 = new Date(data[ele].FEC_ULT_ACT);
                            var fecha1 = new Date(fecha1.setTime(fecha1.getTime() + 1 * 86400000));
                            var newText5 = document.createTextNode(fecha1.toLocaleDateString("es-ES", options));
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

                            var newCell0 = newRow.insertCell(7);
                            var btnmodifica = document.createElement("paper-button");
                            //btnmodifica.type = "button";
                            btnmodifica.setAttribute("raised","");
                            btnmodifica.setAttribute("onclick", "operacionpagomut('"+ data[ele].IDENTIFICACION_PAGO +"','"+ data[ele].SERIE_DEL_PAGO +"','"+ data[ele].MONTO +"','"+ data[ele].SALDO +"','"+ data[ele].FEC_ULT_ACT +"','"+ data[ele].METODO_PAGO +"','"+ data[ele].USUARIO.ID +"',\"SOLIDARIDAD\");");
                            btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'sol';
                             
                            
                            newCell0.appendChild(btnmodifica);
                            switch (data[ele].METODO_PAGO) {
                             
                                case 2:
                                    document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'sol').value='Imprimir comprobante';
                                    break;
                                case 3:
                                    document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'sol').value='Imprimir comprobante';
                                    break;
                                default:
                                    document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'sol').value='Reimprimir recibo';
                            }
                            //newCell0.innerHTML= "<input type='button' id= boton" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + " value='modificar' onclick='modificabeneficiario(" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ") />'";
                          

                            
                            var newCellanula = newRow.insertCell(8);
                            var btnmodifica = document.createElement("paper-button");
                            //btnmodifica.type = "button";
                            btnmodifica.setAttribute("raised","");
                            if((data[ele].SERIE_DEL_PAGO != '') & (data[ele].IDENTIFICACION_PAGO != '') )
                            {
                                btnmodifica.setAttribute("onclick", "anulapago('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" +JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION+ "',\"SOLIDARIDAD\");");
                                btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO;
                             
                            
                                newCellanula.appendChild(btnmodifica);    
                            


                            }







                        }

                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
                           
                           
                           
                       }
                       else
                           {
                               alert('Afiliado reportado como fallecido');
                               
                           }
                }

   
    //CARGA ESTE TAB SI ESTA AFILIADO CON CUALQUIER ESTADO MENOS FALLECIDO A ASOBISO
if(JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")) != null)
                   {
                       
                   if  (JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).ESTADO != 13)
                      
                       {
              
                          
                        
                       $("#detalle").append("<li id='pagotres'> <input type='radio' checked name='tabs' id='tab2'><label for='tab2'>Pago de cuotas en asobiso</label><div id='tab-content2' class='tab-content animated fadeIn'><H3> Saldo actual: " + JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).MONTO + " Estado " + JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).ESTADO.DESCRIPCION + " </H3><paper-button raised id='cambioformadepagobtnaso' onclick='cambiofpaso()'>Por deposito bancario</paper-button><paper-input flex label='Identificacion del deposito' id='idpagoasobanc' style='display:none;'></paper-input> <paper-input flex label='Identificacion del pago' id='idpagoaso'></paper-input> <paper-input flex label='Serie del pago' id='seriepagoaso' value='S'></paper-input><paper-input flex label='Fecha del pago' id='fechapagoaso' type='date' value='" + hoy.format("yyyy-mm-dd") + "'> </paper-input> <paper-input flex label='Monto del pago' id='montopagoaso'></paper-input> <hr><paper-button raised id='pagoaso' onclick='pagaaso()'>Pagar</paper-button></div> </li>");
                        
                  var persona = new Object();
            persona.operacion = "1";
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

           persona.fondo = "ASOCIACION";
            //ajax de los datos personales
            $.ajax({
                url: urllocal+'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                         document.getElementById("idpagoaso").value =  parseInt(data) +1;
                        
                    }
                }
            });  
                           
                           
                            var persona = new Object();
            persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).IDENTIFICACION.IDENTIFICACION;
            persona.fondo = 'ASOCIACION';
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            $.ajax({
                url: urllocal + 'Historial_pagos',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.length == 0) {


                    } else {
                        var d = document.createElement('div');
                        d.setAttribute('id', 'historialaso');
                        d.setAttribute('style', 'height:200px;overflow-y: scroll');
                        document.getElementById("tab-content2").appendChild(d);


                        $('#historialaso').append("<h1>Historial de pagos en Asobiso</h1><table id='tablahistorialasobiso' class='table2'><thead><tr><th scope='col' abbr='Starter'>Quincena/Mes/Año</th><th scope='col' abbr='Starter'>ID y serie del pago</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Fecha</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Usuario</th><th scope='col' abbr='Starter'>Operacion</th><th scope='col' abbr='Starter'>Anular</th></tr></thead><tbody></tbody></table>");

                        for (var ele in data) {

                            var tableRef = document.getElementById("tablahistorialasobiso").getElementsByTagName('tbody')[0];

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


                            var fecha1 = new Date(data[ele].FEC_ULT_ACT);
                            var fecha1 = new Date(fecha1.setTime(fecha1.getTime() + 1 * 86400000));
                            var newText5 = document.createTextNode(fecha1.toLocaleDateString("es-ES", options));
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

                            var newCell0 = newRow.insertCell(7);
                            var btnmodifica = document.createElement("paper-button");
                            //btnmodifica.type = "button";
                            btnmodifica.setAttribute("raised", "");
                            btnmodifica.setAttribute("onclick", "operacionpagomut('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" + data[ele].SALDO + "','" + data[ele].FEC_ULT_ACT + "','" + data[ele].METODO_PAGO + "','" + data[ele].USUARIO.ID + "',\"ASOBISO\");");
                            btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'aso';


                            newCell0.appendChild(btnmodifica);
                            switch (data[ele].METODO_PAGO) {

                                case 2:
                                    document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'aso').value = 'Imprimir comprobante';
                                    break;
                                case 3:
                                    document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'aso').value = 'Imprimir comprobante';
                                    break;
                                default:
                                    document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'aso').value = 'Reimprimir recibo';
                            }
                            //newCell0.innerHTML= "<input type='button' id= boton" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + " value='modificar' onclick='modificabeneficiario(" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ") />'";


                            var newCellanula = newRow.insertCell(8);
                            var btnmodifica = document.createElement("paper-button");
                            //btnmodifica.type = "button";
                            btnmodifica.setAttribute("raised", "");
                            if ((data[ele].SERIE_DEL_PAGO != '') & (data[ele].IDENTIFICACION_PAGO != '')) {
                                btnmodifica.setAttribute("onclick", "anulapago('" + data[ele].IDENTIFICACION_PAGO + "','" + data[ele].SERIE_DEL_PAGO + "','" + data[ele].MONTO + "','" + JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).IDENTIFICACION.IDENTIFICACION + "',\"ASOCIACION\");");
                                btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO;


                                newCellanula.appendChild(btnmodifica);

                            }







                        }

                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
                           
                           
                           
                       }
                       else
                           {
                               alert('Afiliado reportado como fallecido');
                               
                           }
                }


    //CARGA ESTE TAB APAR PAGOS EXTRAORDINARIOS CONOCIDOS COMO "OTROS"

                       
               
              
                   if(JSON.parse(localStorage.getItem("PERSONABUSCADA")) != null)
                       {
                        
                       $("#detalle").append("<li id='pagotres'> <input type='radio' checked name='tabs' id='tab3'><label for='tab3'>Pago de cuotas extraordinarias</label><div id='tab-content3' class='tab-content animated fadeIn'><paper-button raised id='cambioformadepagobtnotro' onclick='cambiofpotro()'>Por deposito bancario</paper-button><paper-input flex label='Identificacion del deposito' id='idpagootrobanc' style='display:none;'></paper-input> <paper-input flex label='Identificacion del pago' id='idpagootro'></paper-input> <paper-input flex label='Serie del pago' id='seriepagootro' value = 'O'></paper-input><paper-input flex label='Fecha del pago' id='fechapagootro' type='date' value='" + hoy.format("yyyy-mm-dd") + "'> </paper-input> <paper-input flex label='Monto del pago' id='montopagootro'></paper-input> <paper-input flex label='Observaciones(detalle del pago)' id='obsotro' rows=\"5\"></paper-input> <hr><paper-button raised id='pagoafilotro' onclick='pagaotro()'>Pagar</paper-button></div> </li>");
                        
                  
                            var persona = new Object();
            persona.operacion = "1";
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

           persona.fondo = "OTRO";
            //ajax de los datos personales
            $.ajax({
                url: urllocal+'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.ID == 0) {
                        alert("Persona no esta afiliada ni registrada");
                    } else {
                        
                         document.getElementById("idpagootro").value =  parseInt(data) +1;
                        
                    }
                }
            });       
                           
                            var persona = new Object();
            persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            persona.fondo = 'OTRO';
            $.ajax({
                url: urllocal + 'Historial_pagos',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.length == 0) {
                      

                    } else {
                        var d = document.createElement('div');
                        d.setAttribute('id', 'historialotros');
                           d.setAttribute('style', 'height:200px;overflow-y: scroll');
                   document.getElementById("tab-content3").appendChild(d);
                     
                     
                        $('#historialotros').append("<h1>Historial de pagos otros</h1><table id='tablahistorialotros' class='table2'><thead><tr><th scope='col' abbr='Starter'>Quincena/Mes/Año</th><th scope='col' abbr='Starter'>ID y serie del pago</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Fecha</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Usuario</th><th scope='col' abbr='Starter'>Operacion</th></tr></thead><tbody></tbody></table>");

                        for (var ele in data) {

                            var tableRef = document.getElementById("tablahistorialotros").getElementsByTagName('tbody')[0];

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


                            var fecha1 = new Date(data[ele].FEC_ULT_ACT);
                            var fecha1 = new Date(fecha1.setTime(fecha1.getTime() + 1 * 86400000));
                            var newText5 = document.createTextNode(fecha1.toLocaleDateString("es-ES", options));
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

   var newCell0 = newRow.insertCell(7);
                               var btnmodifica = document.createElement("paper-button");
                               //btnmodifica.type = "button";
                            btnmodifica.setAttribute("raised","");
                               btnmodifica.setAttribute("onclick", "operacionpagomut('"+ data[ele].IDENTIFICACION_PAGO +"','"+ data[ele].SERIE_DEL_PAGO +"','"+ data[ele].MONTO +"','"+ data[ele].SALDO +"','"+ data[ele].FEC_ULT_ACT +"','"+ data[ele].METODO_PAGO +"','"+ data[ele].USUARIO.ID +"',\"OTRO\");");
                               btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'otro';
                             
                            
                                 newCell0.appendChild(btnmodifica);
                            switch (data[ele].METODO_PAGO) {
                             
                                case 2:
                                  document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'otro').value='Imprimir comprobante';
                                    break;
                                case 3:
                                     document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'otro').value='Imprimir comprobante';
                                    break;
                                default:
                                     document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'otro').value='Reimprimir recibo';
                            }
                               //newCell0.innerHTML= "<input type='button' id= boton" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + " value='modificar' onclick='modificabeneficiario(" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ") />'";
                          



                        }







                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
                           
                       }
                           
                     
         
    //CARGA ESTE TAB PARA PAGO DE EQUIPO ORTOPEDICO, SI TIENE ALGUN PRESTAMO DEL MISMO

                       
               
              
                   if(JSON.parse(localStorage.getItem("ACTIVOSPRESTADOS")) != null)
                       {
                        
                        $("#detalle").append("<li id='pagocuatro'> <input type='radio' checked name='tabs' id='tab4'><label for='tab4'>Pago de cuotas equipo ortopedico</label><div id='tab-content4' class='tab-content animated fadeIn'>  <paper-button raised id='irapagosequipo' onclick=\"window.location = 'alquilerdeequipo.html'\">Ir a pagar un equipo</paper-button> </div> </li>");
                        
                  
                             
                           
                            var persona = new Object();
            persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            persona.fondo = 'EQUIPO';
            $.ajax({
                url: urllocal + 'Historial_pagos',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.length == 0) {
                      

                    } else {
                        var d = document.createElement('div');
                        d.setAttribute('id', 'historialequipo');
                           d.setAttribute('style', 'height:200px;overflow-y: scroll');
                   document.getElementById("tab-content4").appendChild(d);
                     
                     
                        $('#historialequipo').append("<h1>Historial de pagos de Equipo</h1><table id='tablahistorialequipo' class='table2'><thead><tr><th scope='col' abbr='Starter'>Quincena/Mes/Año</th><th scope='col' abbr='Starter'>ID y serie del pago</th><th scope='col' abbr='Starter'>Monto</th><th scope='col' abbr='Starter'>Saldo</th><th scope='col' abbr='Starter'>Fecha</th><th scope='col' abbr='Starter'>Metodo de pago</th><th scope='col' abbr='Starter'>Usuario</th><th scope='col' abbr='Starter'>Operacion</th></tr></thead><tbody></tbody></table>");

                        for (var ele in data) {

                            var tableRef = document.getElementById("tablahistorialequipo").getElementsByTagName('tbody')[0];

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


                            var fecha1 = new Date(data[ele].FEC_ULT_ACT);
                            var fecha1 = new Date(fecha1.setTime(fecha1.getTime() + 1 * 86400000));
                            var newText5 = document.createTextNode(fecha1.toLocaleDateString("es-ES", options));
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

   var newCell0 = newRow.insertCell(7);
                               var btnmodifica = document.createElement("paper-button");
                               //btnmodifica.type = "button";
                            btnmodifica.setAttribute("raised","");
                               btnmodifica.setAttribute("onclick", "operacionpagomut('"+ data[ele].IDENTIFICACION_PAGO +"','"+ data[ele].SERIE_DEL_PAGO +"','"+ data[ele].MONTO +"','"+ data[ele].SALDO +"','"+ data[ele].FEC_ULT_ACT +"','"+ data[ele].METODO_PAGO +"','"+ data[ele].USUARIO.ID +"',\"EQUIPO\");");
                               btnmodifica.id = 'boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'equipo';
                             
                            
                                 newCell0.appendChild(btnmodifica);
                            switch (data[ele].METODO_PAGO) {
                             
                                case 2:
                                  document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'equipo').value='Imprimir comprobante';
                                    break;
                                case 3:
                                     document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'equipo').value='Imprimir comprobante';
                                    break;
                                default:
                                     document.getElementById('boton' + data[ele].IDENTIFICACION_PAGO + ' - ' + data[ele].SERIE_DEL_PAGO + 'equipo').value='Reimprimir recibo';
                            }
                               //newCell0.innerHTML= "<input type='button' id= boton" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + " value='modificar' onclick='modificabeneficiario(" + data[ele].IDENTIFICACION_BENEFICIARIO.IDENTIFICACION + ") />'";
                          



                        }







                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });
                           
                           
//                            for (var ele in JSON.parse(localStorage.getItem("ACTIVOSPRESTADOS"))) {
//
//
//                       var x = document.getElementById("equiposddl");
//                        var option = document.createElement("option");
//                        option.text = data[ele].NUMERO_ACTIVO.NUMERO_ACTIVO  + ' ' +  data[ele].NUMERO_ACTIVO.DESCRIPCION ;
//                        option.value = data[ele].NUMERO_ACTIVO.NUMERO_ACTIVO ;
//                        option.id = data[ele].NUMERO_ACTIVO.NUMERO_ACTIVO ;
//                    //   option.id=
//                        x.add(option);
//
//            }
                
                           
                           
                       }
                           
                     
                 


}


  function calculasaldo(idtipopago)
        {
            switch(idtipopago) 
            {
                case 'MUTUALIDAD':
                    if (document.getElementById("montopagomut").value != "") {
                        var montoactual = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).MONTO;
                        var montoapagar = document.getElementById("montopagomut").value;
                        var montosaldo = parseInt(montoactual) + parseInt(montoapagar);
                        $("#saldoactualizadomut").remove();


                        var persona = new Object();
                        persona.operacion = "6";
                        persona.MONTOSALDO = montosaldo;
                        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                        //ajax de los datos personales
                        $.ajax({
                            url: urllocal + 'Pagoasociado',
                            type: 'POST',
                            dataType: 'json',
                            data: persona,
                            success: function (data, textStatus, xhr) {
                                if (data.ID == 0) {
                                    alert("Persona no esta afiliada ni registrada");
                                } else {


                                    //                var node1 = document.createElement("p"); 
                                    //                               node1.setAttribute('style', 'font size="small"');
                                    //                               node1.id = 'saldoactualizadomut';
                                    //// Create a <li> node
                                    //var textnode = document.createTextNode('Su nuevo saldo seria de: ¢' + montosaldo + ' le alcanza hasta ' + data);         // Create a text node
                                    //node1.appendChild(textnode);                              // Append the text to <li>
                                    //document.getElementById("titulomut").appendChild(node1);
                                    $("#saldoactualizadomut").remove();

                                    $("#titulomut").append("<p id ='saldoactualizadomut' style='font size=\"small\";'>Su nuevo saldo seria de: ¢" + montosaldo + " le alcanza hasta " + data + "</p>");


                                }
                            }
                        });

                        if (document.getElementById("montopagomut").value == '') {
                            $("#saldoactualizadomut").remove();

                        }
                    }
        break;
                case 'SOLIDARIDAD':
                    if (document.getElementById("montopagosol").value != "") {
                        var montoactual = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).MONTO;
                        var montoapagar = document.getElementById("montopagosol").value;
                        var montosaldo = parseInt(montoactual) + parseInt(montoapagar);
                        $("#saldoactualizadosol").remove();


                        var persona = new Object();
                        persona.operacion = "5";
                        persona.MONTOSALDO = montosaldo;
                        persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                        persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                        //ajax de los datos personales
                        $.ajax({
                            url: urllocal + 'Pagoasociado',
                            type: 'POST',
                            dataType: 'json',
                            data: persona,
                            success: function (data, textStatus, xhr) {
                                if (data.ID == 0) {
                                    alert("Persona no esta afiliada ni registrada");
                                } else {


                                    //                var node1 = document.createElement("p"); 
                                    //                   node1.setAttribute('style', 'font size="small"');
                                    // node1.id='saldoactualizadosol';           
                                    //// Create a <li> node
                                    //var textnode = document.createTextNode('Su nuevo saldo seria de: ¢ ' + montosaldo + ' le alcanza hasta ' + data);         // Create a text node
                                    //node1.appendChild(textnode);                              // Append the text to <li>
                                    //document.getElementById("titulosol").appendChild(node1);
                                    $("#saldoactualizadosol").remove();
                                    $("#titulosol").append("<p id ='saldoactualizadosol' style='font size=\"small\";'>Su nuevo saldo seria de: ¢" + montosaldo + " le alcanza hasta " + data + "</p>");

                                }
                            }
                        });

                        
                    }
                    else {
                        $("#saldoactualizadosol").remove();
                    }
        break;
    default:
        break;
}
            
            }



  function pagaafilmut()
  {
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
          document.getElementById("infopersonal").style.visibility = "hidden";
      });
      $(document).ajaxStop(function () {
          $("#loading").html("");
          $("#loading").removeAttr("style");
          document.getElementById("infopersonal").style.visibility = "visible";
      });
       var persona = new Object();   
         persona.operacion = "3";
         persona.IDPERSONA = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
         var tipopago = 0;
     if( document.getElementById('seriepagoafilmut').style.display != 'none')
    {
    persona.IDPAGO = document.getElementById("idpagoafilmut").value;
    persona.SERIEPAGO= document.getElementById("seriepagoafilmut").value;
    persona.TIPO = "MUTUALIDAD AFILIACION";
    persona.METODOPAGO = "1";
    tipopago = 1;
    }
    else{
     persona.IDPAGO = document.getElementById("idpagoafilmutbanc").value;
    persona.SERIEPAGO= 'B';
    persona.TIPO = "MUTUALIDAD AFILIACION";
    persona.METODOPAGO="2";    
    tipopago = 2;
    }
    persona.MONTO=document.getElementById("montopagoafilmut").value;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    persona.FECHAPAGO= document.getElementById("fechapagoafilmut").value;
       persona.IDUSUARIO = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
       $.ajax({
                url: urllocal+'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    var persona = new Object();
                    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
                    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                    //ajax de los datos de mutualidad
                    $.ajax({
                        url: urllocal + 'Mutualidad',
                        type: 'POST',
                        dataType: 'json',
                        data: persona,
                        success: function (data, textStatus, xhr) {
                            if (data.IDENTIFICACION.IDENTIFICACION == 0) {


                            } else {

                                localStorage.setItem("PERSONABUSCADAENMUTUALIDAD", JSON.stringify(data));

                            }

                        },
                        error: function (xhr, textStatus, errorThrown) {

                        }
                    });



                    if (document.getElementById('seriepagoafilmut').style.display == 'none') {
                        alert("Deposito registrado, correctamente");
                        location.href = "/inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
                    } else {
                        $("#infopersonal").remove();
                        document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"centraldepagos.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + data + "'></img><br><br><img src='data:image/bmp;base64," + data + "'></img></div>";
                    }
                    
                }
            });
    
     
}
            

     
  function pagaafilsol()
  {
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
          document.getElementById("infopersonal").style.visibility = "hidden";
      });
      $(document).ajaxStop(function () {
          $("#loading").html("");
          $("#loading").removeAttr("style");
          document.getElementById("infopersonal").style.visibility = "visible";
      });
       var persona = new Object();   
         persona.operacion = "3";
         persona.IDPERSONA = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
         var tipopago = 0;
     if( document.getElementById('seriepagoafilsol').style.display != 'none')
    {
    persona.IDPAGO = document.getElementById("idpagoafilsol").value;
    persona.SERIEPAGO= document.getElementById("seriepagoafilsol").value;
    persona.TIPO = "SOLIDARIDAD AFILIACION";
    persona.METODOPAGO = "1";
    tipopago = 1;
    }
    else
        {
            persona.IDPAGO = document.getElementById("idpagoafilsolbanc").value;
    persona.SERIEPAGO= 'A';
    persona.TIPO = "SOLIDARIDAD AFILIACION";
    persona.METODOPAGO="2"; 
    tipopago = 2;
        }
    persona.MONTO=document.getElementById("montopagoafilsol").value;
         
    persona.FECHAPAGO= document.getElementById("fechapagoafilsol").value;
       persona.IDUSUARIO = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
       persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
       persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

       $.ajax({
                url: urllocal+'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {

                    var persona = new Object();
                    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
                    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                    //ajax de los datos de mutualidad
                    $.ajax({
                        url: urllocal + 'Mutualidad',
                        type: 'POST',
                        dataType: 'json',
                        data: persona,
                        success: function (data, textStatus, xhr) {
                            if (data.IDENTIFICACION.IDENTIFICACION == 0) {


                            } else {

                                localStorage.setItem("PERSONABUSCADAENMUTUALIDAD", JSON.stringify(data));

                            }

                        },
                        error: function (xhr, textStatus, errorThrown) {

                        }
                    });
                    if (document.getElementById('seriepagoafilsol').style.display == 'none') {
                        alert("Deposito registrado, correctamente");
                        location.href = "/inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
                    } else {
                        $("#infopersonal").remove();
                        document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"centraldepagos.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + data + "'></img><br><br><img src='data:image/bmp;base64," + data + "'></img></div>";
                    }
                    
                }
            });
    
      
}
            
    
        function pagamut()
  {

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
                document.getElementById("infopersonal").style.visibility = "hidden";
            });
            $(document).ajaxStop(function () {
                $("#loading").html("");
                $("#loading").removeAttr("style");
                document.getElementById("infopersonal").style.visibility = "visible";
            });

       var persona = new Object();   
         persona.operacion = "3";
         persona.IDPERSONA = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
         var tipopago = 0;
    if( document.getElementById('seriepagomut').style.display != 'none')
    {
    persona.IDPAGO = document.getElementById("idpagomut").value;
    persona.SERIEPAGO= document.getElementById("seriepagomut").value;
    persona.TIPO = "MUTUALIDAD";
    persona.METODOPAGO = "1";
    tipopago = 1;
    }
    else{
         persona.IDPAGO = document.getElementById("idpagomutbanc").value;
        persona.SERIEPAGO= 'B';
    persona.TIPO = "MUTUALIDAD";
    persona.METODOPAGO = "2";
    tipopago = 2;
    }
    persona.MONTO=document.getElementById("montopagomut").value;
            var montoactual = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).MONTO
        var montoapagar = document.getElementById("montopagomut").value;
    persona.MONTOSALDO = parseInt(montoactual) + parseInt(montoapagar);
    persona.FECHAPAGO= document.getElementById("fechapagomut").value;
       persona.IDUSUARIO = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
       persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
       persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

       $.ajax({
                url: urllocal+'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    var persona = new Object();
                    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
                    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                    //ajax de los datos de mutualidad
                    $.ajax({
                        url: urllocal + 'Mutualidad',
                        type: 'POST',
                        dataType: 'json',
                        data: persona,
                        success: function (data, textStatus, xhr) {
                            if (data.IDENTIFICACION.IDENTIFICACION == 0) {


                            } else {

                                localStorage.setItem("PERSONABUSCADAENMUTUALIDAD", JSON.stringify(data));

                            }
                           
                        },
                        error: function (xhr, textStatus, errorThrown) {

                        }
                    });
                    //if (document.getElementById('seriepagomut').style.display == 'none') {
                    //    alert("Deposito registrado, correctamente");
                    //    location.href = "/inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
                    //} else {
                    //    $("#infopersonal").remove();
                    //    document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"centraldepagos.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + data + "'></img><br><br><img src='data:image/bmp;base64," + data + "'></img></div>";
                    //}
                    if (document.getElementById('seriepagomut').style.display == 'none') {
                        var res = data.split(",");
                        if (res[0] == 'pagoyaregistrado') {
                            $("#infopersonal").remove();
                            document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"centraldepagos.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + res[1] + "'></img><br><br><img src='data:image/bmp;base64," + res[1] + "'></img></div>";

                        }
                        else {
                            alert("Deposito registrado, correctamente");
                            location.href = "/inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
                        }
                    } else {

                        $("#infopersonal").remove();
                        document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"centraldepagos.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + data + "'></img><br><br><img src='data:image/bmp;base64," + data + "'></img></div>";
                    }
                }
            });
    
     
}
            

  
        function pagasol()
        {
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
                document.getElementById("infopersonal").style.visibility = "hidden";
            });
            $(document).ajaxStop(function () {
                $("#loading").html("");
                $("#loading").removeAttr("style");
                document.getElementById("infopersonal").style.visibility = "visible";
            });
       var persona = new Object();   
         persona.operacion = "3";
         persona.IDPERSONA = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
         persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
         persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
         var tipopago = 0;
         if (document.getElementById('seriepagosol').style.display != 'none') {
             persona.IDPAGO = document.getElementById("idpagosol").value;
             persona.SERIEPAGO = document.getElementById("seriepagosol").value;
             persona.TIPO = "SOLIDARIDAD";
             persona.METODOPAGO = "1";
             tipopago = 1;
         }
         else {
             persona.IDPAGO = document.getElementById("idpagosolbanc").value;
             persona.SERIEPAGO = 'A';
             persona.TIPO = "SOLIDARIDAD";
             persona.METODOPAGO = "2";
             tipopago = 2;
         }
  
    persona.MONTO=document.getElementById("montopagosol").value;
            var montoactual = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).MONTO
        var montoapagar = document.getElementById("montopagosol").value;
    persona.MONTOSALDO = parseInt(montoactual) + parseInt(montoapagar);
    persona.FECHAPAGO= document.getElementById("fechapagosol").value;
    
      persona.IDUSUARIO = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    
    
    
       $.ajax({
                url: urllocal+'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    var persona = new Object();
                    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
                    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

                    ////ajax de los datos de solidaridad
                    $.ajax({
                        url: urllocal + 'Solidaridad',
                        type: 'POST',
                        dataType: 'json',
                        data: persona,
                        success: function (data, textStatus, xhr) {
                            if (data.IDENTIFICACION.IDENTIFICACION == 0) {

                            } else {
                                localStorage.setItem("PERSONABUSCADAENSOLIDARIDAD", JSON.stringify(data));

                            }

                        },
                        error: function (xhr, textStatus, errorThrown) {

                        }
                    });
                    if (document.getElementById('seriepagosol').style.display == 'none') {
                        var res = data.split(",");
                        if (res[0] == 'pagoyaregistrado') {
                            $("#infopersonal").remove();
                            document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"centraldepagos.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + res[1] + "'></img><br><br><img src='data:image/bmp;base64," + res[1] + "'></img></div>";

                        }
                        else {
                            alert("Deposito registrado, correctamente");
                            location.href = "/inicio.html?id=" + JSON.parse(localStorage.getItem("PERSONABUSCADAENSOLIDARIDAD")).IDENTIFICACION.IDENTIFICACION;
                        }
                    } else {
                       
                        $("#infopersonal").remove();
                        document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"centraldepagos.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + data + "'></img><br><br><img src='data:image/bmp;base64," + data + "'></img></div>";
                    }
                }
            });
    
    
}

function operacionpagomut(UNO,DOS,TRES,CUATRO,CINCO,SEIS,SIETE,OCHO)
{
      
       var persona = new Object();   
         persona.operacion = "7";
         persona.IDPERSONA = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
    persona.IDPAGO = UNO;
    persona.SERIEPAGO= DOS;
    persona.TIPO = OCHO;
    persona.METODOPAGO=SEIS;
    persona.MONTO=TRES;    
    persona.MONTOSALDO = CUATRO;
    persona.FECHAPAGO= CINCO;
    persona.IDUSUARIO = SIETE;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

       $.ajax({
                url: urllocal+'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
////                 
//                      var d = document.createElement('div');
//                        d.setAttribute('id', 'popimprime');
//                        d.setAttribute('class', 'popobs');
//                        document.body.appendChild(d);
//                      $('#infopersonal').append(
//                   $(""));
//                   
//                    alert(data);
                      $("#infopersonal").remove();
                                 document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"centraldepagos.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + data + "'></img><br><br><img src='data:image/bmp;base64," + data + "'></img></div>";
                  
                    
                     
                }
            });
    
    
}

function imprimir(){
  var objeto=document.getElementById('imprimeme');  //obtenemos el objeto a imprimir
  var ventana=window.open('','_blank');  //abrimos una ventana vacía nueva
  ventana.document.write(objeto.innerHTML);  //imprimimos el HTML del objeto en la nueva ventana
  ventana.document.close();  //cerramos el documento
  ventana.print();  //imprimimos la ventana
  ventana.close();  //cerramos la ventana
}




  
  function pagaotro()
{
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
          document.getElementById("infopersonal").style.visibility = "hidden";
      });
      $(document).ajaxStop(function () {
          $("#loading").html("");
          $("#loading").removeAttr("style");
          document.getElementById("infopersonal").style.visibility = "visible";
      });
       var persona = new Object();   
         persona.operacion = "3";
         persona.IDPERSONA = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
    persona.IDPAGO = document.getElementById("idpagootro").value;
    persona.SERIEPAGO= document.getElementById("seriepagootro").value;
    persona.TIPO = "OTRO";
    persona.METODOPAGO="1";
    persona.MONTO=document.getElementById("montopagootro").value;
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    persona.FECHAPAGO= document.getElementById("fechapagootro").value;
    persona.OBS = document.getElementById("obsotro").value;
       persona.IDUSUARIO = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
       $.ajax({
                url: urllocal+'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {

                         $("#infopersonal").remove();
                         document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"centraldepagos.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + data + "'></img><br><br><img src='data:image/bmp;base64," + data + "'></img></div>";
                    
                    
                }
            });
    
      
}




        function pagaaso()
  {
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
                document.getElementById("infopersonal").style.visibility = "hidden";
            });
            $(document).ajaxStop(function () {
                $("#loading").html("");
                $("#loading").removeAttr("style");
                document.getElementById("infopersonal").style.visibility = "visible";
            });
       var persona = new Object();   
         persona.operacion = "3";
         persona.IDPERSONA = JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).IDENTIFICACION.IDENTIFICACION;
    persona.IDPAGO = document.getElementById("idpagoaso").value;
    persona.SERIEPAGO= document.getElementById("seriepagoaso").value;
    persona.TIPO = "ASOCIACION";
    persona.METODOPAGO="1";
    persona.MONTO=document.getElementById("montopagoaso").value;
            var montoactual = JSON.parse(localStorage.getItem("PERSONABUSCADAENASOBISO")).MONTO
        var montoapagar = document.getElementById("montopagoaso").value;
    persona.MONTOSALDO = parseInt(montoactual) + parseInt(montoapagar);
    persona.FECHAPAGO= document.getElementById("fechapagoaso").value;
       persona.IDUSUARIO = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
       persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
       persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

       $.ajax({
                url: urllocal+'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
////                 
//                      var d = document.createElement('div');
//                        d.setAttribute('id', 'popimprime');
//                        d.setAttribute('class', 'popobs');
//                        document.body.appendChild(d);
//                      $('#infopersonal').append(
//                   $(""));
//                   
//                    alert(data);
                         $("#infopersonal").remove();
                         document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"centraldepagos.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + data + "'></img><br><br><img src='data:image/bmp;base64," + data + "'></img></div>";
                    
                    
                }
            });
    
      var persona = new Object();
            persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADAENMUTUALIDAD")).IDENTIFICACION.IDENTIFICACION;
            persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
            persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            //ajax de los datos de mutualidad
            $.ajax({
                url: urllocal + 'Mutualidad',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.IDENTIFICACION.IDENTIFICACION == 0) {
                   
                        
                    } else {
                        
                           localStorage.setItem("PERSONABUSCADAENMUTUALIDAD", JSON.stringify(data));
                       
                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                
                }
            });
}
            

  
        function pagaequipo()
        {
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
                document.getElementById("infopersonal").style.visibility = "hidden";
            });
            $(document).ajaxStop(function () {
                $("#loading").html("");
                $("#loading").removeAttr("style");
                document.getElementById("infopersonal").style.visibility = "visible";
            });
       var persona = new Object();   
         persona.operacion = "3";
         persona.IDPERSONA = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
    persona.IDPAGO = document.getElementById("idpagoequipo").value;
    persona.SERIEPAGO= document.getElementById("seriepagoequipo").value;
    persona.TIPO = "EQUIPO";
    persona.METODOPAGO="1";
    persona.MONTO=document.getElementById("montopagoequipo").value;
            persona.MONTOSALDO = document.getElementById("montopagoequipo").value;
    persona.FECHAPAGO= document.getElementById("fechapagoequipo").value;
       persona.IDUSUARIO = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
       persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
       persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

    persona.IDEQUIPO = "1";
       $.ajax({
                url: urllocal+'Pagoasociado',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
////                 
//                      var d = document.createElement('div');
//                        d.setAttribute('id', 'popimprime');
//                        d.setAttribute('class', 'popobs');
//                        document.body.appendChild(d);
//                      $('#infopersonal').append(
//                   $(""));
//                   
//                    alert(data);
                         $("#infopersonal").remove();
                         document.body.innerHTML += "<paper-button raised id='imrimir' onclick=\"imprimir();\">Imprimir</paper-button><paper-button raised id='vuelte' onclick='window.location.href=\"centraldepagos.html\"'>Volver</paper-button><hr><div id=\"imprimeme\"><img src='data:image/bmp;base64," + data + "'></img><br><br><img src='data:image/bmp;base64," + data + "'></img></div>";
                    
                    
                }
            });
    

}
  
function cambiofpmut()
{
    
    if( document.getElementById('seriepagomut').style.display != 'none')
    {
     document.getElementById("cambioformadepagobtn").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Pago en efectivo</div>";
            
            document.getElementById('seriepagomut').style.display = 'none';
         document.getElementById('idpagomut').style.display = 'none';
          document.getElementById('idpagomutbanc').style.display = 'block';
    }
    else{
        
        document.getElementById("cambioformadepagobtn").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Pago por deposito bancario</div>";
            
            document.getElementById('seriepagomut').style.display = 'block';
         document.getElementById('idpagomut').style.display = 'block'; 
          document.getElementById('idpagomutbanc').style.display = 'none';
    }

 
}

function cambiofpsol()
{
    
    if( document.getElementById('seriepagosol').style.display != 'none')
    {
     document.getElementById("cambioformadepagobtnsol").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Pago en efectivo</div>";
            
            document.getElementById('seriepagosol').style.display = 'none';
         document.getElementById('idpagosol').style.display = 'none';
                document.getElementById('idpagosolbanc').style.display = 'block';
    
    }
    else{
        
        document.getElementById("cambioformadepagobtnsol").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Pago por deposito bancario</div>";
            
            document.getElementById('seriepagosol').style.display = 'block';
         document.getElementById('idpagosol').style.display = 'block'; 
                document.getElementById('idpagosolbanc').style.display = 'none';
    }

 
}

function cambiofpotro()
{
    
    if( document.getElementById('seriepagootro').style.display != 'none')
    {
     document.getElementById("cambioformadepagobtnotro").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Pago en efectivo</div>";
            
            document.getElementById('seriepagootro').style.display = 'none';
         document.getElementById('idpagootro').style.display = 'none';
                document.getElementById('idpagootrobanc').style.display = 'block';
    
    }
    else{
        
        document.getElementById("cambioformadepagobtnotro").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Pago por deposito bancario</div>";
            
            document.getElementById('seriepagootro').style.display = 'block';
         document.getElementById('idpagootro').style.display = 'block'; 
         document.getElementById('idpagootrobanc').style.display = 'none';
    }

 
}


function cambiofpaso()
{
    
    if( document.getElementById('seriepagoaso').style.display != 'none')
    {
     document.getElementById("cambioformadepagobtnaso").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Pago en efectivo</div>";
            
            document.getElementById('seriepagoaso').style.display = 'none';
         document.getElementById('idpagoaso').style.display = 'none';
         document.getElementById('idpagoasobanc').style.display = 'block';
    
    }
    else{
        
        document.getElementById("cambioformadepagobtnaso").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Pago por deposito bancario</div>";
            
            document.getElementById('seriepagoaso').style.display = 'block';
         document.getElementById('idpagoaso').style.display = 'block';
         document.getElementById('idpagoasobanc').style.display = 'none';
    }

 
}

function cambiofpafilmut()
{
    
    if( document.getElementById('seriepagoafilmut').style.display != 'none')
    {
     document.getElementById("cambioformadepagobtn").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Pago en efectivo</div>";
            
            document.getElementById('seriepagoafilmut').style.display = 'none';
         document.getElementById('idpagoafilmut').style.display = 'none';
         document.getElementById('idpagoafilmutbanc').style.display = 'block';
    
    }
    else{
        
        document.getElementById("cambioformadepagobtn").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Pago por deposito bancario</div>";
            
            document.getElementById('seriepagoafilmut').style.display = 'block';
         document.getElementById('idpagoafilmut').style.display = 'block'; 
                 document.getElementById('idpagoafilmutbanc').style.display = 'none';
    }

 
}

function cambiofpafilsol()
{
    
    if( document.getElementById('seriepagoafilsol').style.display != 'none')
    {
     document.getElementById("cambioformadepagobtnsol").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Pago en efectivo</div>";
            
            document.getElementById('seriepagoafilsol').style.display = 'none';
         document.getElementById('idpagoafilsol').style.display = 'none';
                 document.getElementById('idpagoafilsolbanc').style.display = 'block';
    
    }
    else{
        
        document.getElementById("cambioformadepagobtnsol").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Pago por deposito bancario</div>";
            
            document.getElementById('seriepagoafilsol').style.display = 'block';
         document.getElementById('idpagoafilsol').style.display = 'block'; 
           document.getElementById('idpagoafilsolbanc').style.display = 'none';
    }

 
}

function cambiofpequipo()
{
    
    if( document.getElementById('seriepagoequipo').style.display != 'none')
    {
     document.getElementById("cambioformadepagobtnequipo").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Pago en efectivo</div>";
            
            document.getElementById('seriepagoequipo').style.display = 'none';
         document.getElementById('idpagoequipo').style.display = 'none';
          document.getElementById('idpagoequipobanc').style.display = 'block';
    }
    else{
        
        document.getElementById("cambioformadepagobtnequipo").innerHTML = " <paper-ripple class=\"style-scope paper-button\"><div id=\"background\" class=\"style-scope paper-ripple\"></div><div id=\"waves\" class=\"style-scope paper-ripple\"></div></paper-ripple><paper-material animated=\"\" class=\"style-scope paper-button x-scope paper-material-0\" elevation=\"1\"></paper-material><div class=\"content  style-scope paper-button\">Pago por deposito bancario</div>";
            
            document.getElementById('seriepagoequipo').style.display = 'block';
         document.getElementById('idpagoequipo').style.display = 'block'; 
          document.getElementById('idpagoequipobanc').style.display = 'none';
    }

 
}

function anulapago(uno,dos,tres,cuatro,cinco)
                    {
                        
                    var persona = new Object();
            persona.op = '3';
    persona.idusuario=JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                   persona.idpago=uno;
                   persona.seriepago = dos;
                   persona.idsocio = cuatro;
                   persona.monto = tres;
                   persona.fondo = cinco;
                   persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
                   persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;

            $.ajax({
                url: urllocal + 'Historial_pagos',
                type: 'POST',
                dataType: 'json',
                data: persona,
                success: function (data, textStatus, xhr) {
                    if (data.length == 0) {
                      

                    } else {
                      


                    }
                    alert("Pago anulado, relice la busqueda nuevamente, corrobore todos los montos y datos");
                    window.location.href = "inicio.html";

                },
                error: function (xhr, textStatus, errorThrown) {
                    alert(xhr);
                }
            });     
                        
                        
}



var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};
