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
var fecha = new Date();
var mes = fecha.getMonth() + 1;
var anno = fecha.getFullYear();
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

/*VERIFICA LA COOKIE DE ACCESO AL SISTEMA*/if (JSON.parse(localStorage.getItem("USUARIOLOGUEADO")) == null) {
    alert("No estas autorizado para ingresar aun");
    location.href = "/login.html";

} else {
    alert(JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO);
}



var miniprofile = document.getElementById("people");
miniprofile.innerHTML = "<li>  <img src='/Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg' onerror='this.src = 'Imagenes/btn_menu.png'' onclick='muestraprofilegrande();' /><table><tr><td><h2>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</h2><em>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "</em> </td><td></td><td><input type=image src=\"Imagenes/list-view.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"menu.html\"'></input></td><td><input type=image src=\"Imagenes/settings.png\" width=\"45\" height=\"45\" onClick='window.location.href=\"prefuser.html\"'></input></td><td><input type=image src=\"Imagenes/plug.png\" width=\"45\" height=\"45\" onclick = \"salirdelsistema()\"></input></td></tr></table></li>";
//FIN DEL PERFIL DE USUARIO MINI

/*CIERRA SESION Y QUITA LAS COOKIES DE MEMORIA, REDIRIGE AL INICIO DE SESION */function salirdelsistema() {

   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("USUARIOLOGUEADO", null);

    window.location.href = "Login.html";


}


function cargatabs() {



    document.getElementById("infopersonal").innerHTML = "<h2>Texto para enviar a planilla  </H2><paper-button raised id='btndesctodos' onclick='descargatodos()'>Descargar todos los archivos</paper-button><hr> Seleccione el mes <select id='messel'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option><option value='11'>11</option><option value='12'>12</option></select> Escriba el año <input type='number' value=0 id='annosel'/> <paper-button raised id='btncarga' onclick='cargar()'>Cargar los archivos</paper-button> <ul class='tabs' id='detalle' style='max-width:1800px;width:1800px;'></ul>";



    //PESTA;A DE ASOBISO
    // $("#detalle").append("<li id='pagoenmut'> <input type='radio' checked name='tabs' id='tabpagomut'><label for='tabpagomut'>Cuotas PDB todos los asociados </label><div id='tab-contentdefmut' class='tab-content animated fadeIn'><select size=\"4\" name=\"selectdefmut\" multiple=\"multiple\" id=\"selectdefmut\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>Nuevas afiliaciones en PDF mes actual</label><div id='tab-content0' class='tab-content animated fadeIn'><a href='' onclick='descargarasodeduccionesafilsol()'>Descargar el contenido</a><select size=\"4\" name=\"selectafilsol\" multiple=\"multiple\" id=\"selectafilsol\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagodos'> <input type='radio' checked name='tabs' id='tab1'><label for='tab1'>Nuevas afiliaciones en PDB mes actual</label><div id='tab-content1' class='tab-content animated fadeIn'><a href='' onclick='descargarasodeduccionesafilmut()'>Descargar el contenido</a><select size=\"4\" name=\"selectafilmut\" multiple=\"multiple\" id=\"selectafilmut\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab3'><label for='tab3'>Cuotas PDF todos los asociados</label><div id='tab-content3' class='tab-content animated fadeIn'><a href='' onclick='descargarasodeduccionessol()'>Descargar el contenido</a><select size=\"4\" name=\"selectsol\" multiple=\"multiple\" id=\"selectsol\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab4'><label for='tab4'>Cuotas ABS todos los asociados</label><div id='tab-content4' class='tab-content animated fadeIn'><a href='' onclick ='descargarasodeduccionesaso()'>Descargar el contenido</a><select size=\"4\" name=\"selectaso\" multiple=\"multiple\" id=\"selectaso\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab5'><label for='tab5'>Nuevos asociados ABS mes actual</label><div id='tab-content5' class='tab-content animated fadeIn'><a href='' onclick='descargarasodeduccionesmut()'>Descargar el contenido</a><select size=\"4\" name=\"selectmut\" multiple=\"multiple\" id=\"selectnuevosaso\" style=\"height:500px;width:100%;\" disabled></select</div> </li>");
    //  $("#detalle").append("<li id='pagoenmut'> <input type='radio' checked name='tabs' id='tabpagomut'><label for='tabpagomut'>Cuotas PDB todos los asociados </label><div id='tab-contentdefmut' class='tab-content animated fadeIn'><select size=\"4\" name=\"selectdefmut\" multiple=\"multiple\" id=\"selectdefmut\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>2500</label><div id='tab-content0' class='tab-content animated fadeIn'><table><tr><td><h3>Nuevas afiliaciones mes actual</h3><a href='' onclick='descargarasodeduccionesafilsol()'>Descargar el contenido</a><select size=\"4\" name=\"selectafilsol\" multiple=\"multiple\" id=\"selectafilsol\" style=\"height:500px;width:100%;\" disabled></select></td><td><h3>Exclusiones y renuncias mes actual</h3><a href='' onclick='descargarexlusionessolidaridad()'>Descargar el contenido</a><select size=\"4\" name=\"selectexcsol\" multiple=\"multiple\" id=\"selectexcsol\" style=\"height:500px;width:100%;\" disabled></select></td></tr></table></div> </li><li id='pagodos'> <input type='radio' checked name='tabs' id='tab1'><label for='tab1'>2503</label><div id='tab-content1' class='tab-content animated fadeIn'><table><tr><td><h3>Nuevas afiliaciones mes actual</h3><a href='' onclick='descargarasodeduccionesafilmut()'>Descargar el contenido</a><select size=\"4\" name=\"selectafilmut\" multiple=\"multiple\" id=\"selectafilmut\" style=\"height:500px;width:100%;\" disabled></select></td><td><h3>Exclusiones y renuncias mes actual</h3><a href='' onclick='descargarexclusionesmut()'>Descargar el contenido</a><select size=\"4\" name=\"selectexcmut\" multiple=\"multiple\" id=\"selectexcmut\" style=\"height:500px;width:100%;\" disabled></select></td></tr></table></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab3'><label for='tab3'>Cuotas PDF todos los asociados</label><div id='tab-content3' class='tab-content animated fadeIn'><a href='' onclick='descargarasodeduccionessol()'>Descargar el contenido</a><select size=\"4\" name=\"selectsol\" multiple=\"multiple\" id=\"selectsol\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab4'><label for='tab4'>Cuotas ABS todos los asociados</label><div id='tab-content4' class='tab-content animated fadeIn'><a href='' onclick ='descargarasodeduccionesaso()'>Descargar el contenido</a><select size=\"4\" name=\"selectaso\" multiple=\"multiple\" id=\"selectaso\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab5'><label for='tab5'>2504</label><div id='tab-content5' class='tab-content animated fadeIn'><table><tr><td><a href='' onclick='descargarnuevasafiliacionesaso()'>Descargar el contenido</a><select size=\"4\" name=\"selectmut\" multiple=\"multiple\" id=\"selectnuevosaso\" style=\"height:500px;width:100%;\" disabled></select></td><td><a href='' onclick='descargarexclusionesaso()'>Descargar el contenido</a><select size=\"4\" name=\"selectmut\" multiple=\"multiple\" id=\"selectexcaso\" style=\"height:500px;width:100%;\" disabled></select></td></tr></table></div> </li>");
    $("#detalle").append("<li id='pagoenmut'> <input type='radio' checked name='tabs' id='tabpagomut'><label for='tabpagomut'>Cuotas PDB todos los asociados </label><div id='tab-contentdefmut' class='tab-content animated fadeIn'><select size=\"4\" name=\"selectdefmut\" multiple=\"multiple\" id=\"selectdefmut\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>2500</label><div id='tab-content0' class='tab-content animated fadeIn'><h3>Nuevas afiliaciones, exclusiones y renuncias mes actual</h3><a href='' onclick='descargarasodeduccionesmensualessol()'>Descargar el contenido</a><select size=\"4\" name=\"selectafilsol\" multiple=\"multiple\" id=\"selectafilsol\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagodos'> <input type='radio' checked name='tabs' id='tab1'><label for='tab1'>2503</label><div id='tab-content1' class='tab-content animated fadeIn'><h3>Nuevas afiliaciones, exclusiones y renuncias mes actual</h3><a href='' onclick='descargarasodeduccionesmensualesmut()'>Descargar el contenido</a><select size=\"4\" name=\"selectafilmut\" multiple=\"multiple\" id=\"selectafilmut\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab3'><label for='tab3'>Cuotas PDF todos los asociados</label><div id='tab-content3' class='tab-content animated fadeIn'><a href='' onclick='descargarasodeduccionessol()'>Descargar el contenido</a><select size=\"4\" name=\"selectsol\" multiple=\"multiple\" id=\"selectsol\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab4'><label for='tab4'>Cuotas ABS todos los asociados</label><div id='tab-content4' class='tab-content animated fadeIn'><a href='' onclick ='descargarasodeduccionesaso()'>Descargar el contenido</a><select size=\"4\" name=\"selectaso\" multiple=\"multiple\" id=\"selectaso\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab5'><label for='tab5'>2504</label><div id='tab-content5' class='tab-content animated fadeIn'><h2> Nuevas afiliaciones, exclusiones, renuncias y variaciones en monto por préstamo de equipo medico ABS</h2 ><a href='' onclick='descargardeduccionesmensualabs()'>Descargar el contenido</a><select size=\"4\" name=\"selectmut\" multiple=\"multiple\" id=\"selectnuevosaso\" style=\"height:500px;width:100%;\" disabled></select></div>      </li>  <li id='pago2499'> <input type='radio' checked name='tabs' id='tab2499'><label for='tab2499'>2499</label><div id='tab-content2499' class='tab-content animated fadeIn'><h2> Cuotas de afiliación solidaridad, mes actual y modificación de mes anterior</h2 ><a href='' onclick='descargar2499()'>Descargar el contenido</a><select size=\"4\" name=\"selectmut\" multiple=\"multiple\" id=\"select2499\" style=\"height:500px;width:100%;\" disabled></select></div>      </li>          <li id='pago2502'> <input type='radio' checked name='tabs' id='tab2502'><label for='tab2502'>2502</label><div id='tab-content2502' class='tab-content animated fadeIn'><h2> Cuotas de afiliación mutualidad, mes actual y modificación de mes anterior</h2 ><a href='' onclick='descargar2502()'>Descargar el contenido</a><select size=\"4\" name=\"selectmut\" multiple=\"multiple\" id=\"select2502\" style=\"height:500px;width:100%;\" disabled></select></div>      </li>");

    document.getElementById('messel').value = mes;

    document.getElementById('annosel').value = anno;




    cargar();




}


function cargar() {



    // document.getElementById("infopersonal").innerHTML = "<h2>Texto para enviar a planilla  </H2> <paper-button raised id='btnlimpiaafil' onclick='limpiar()'>Eliminar deducciones de afiliaciones</paper-button><paper-button raised id='btndesctodos' onclick='descargatodos()'>Descargar todos los archivos</paper-button><hr> Seleccione el mes <select id='messel'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option><option value='11'>11</option><option value='12'>12</option></select> Escriba el anno <input type='number' value=0 id='annosel'/> <paper-button raised id='btncarga' onclick='cargar()'>Cargar los archivos</paper-button> <ul class='tabs' id='detalle' style='max-width:1500px;width:1500px;'></ul>";

    document.getElementById('detalle').innerHTML = '';

    //PESTA;A DE ASOBISO
    //  $("#detalle").append("<li id='pagoenmut'> <input type='radio' checked name='tabs' id='tabpagomut'><label for='tabpagomut'>Cuotas PDB todos los asociados </label><div id='tab-contentdefmut' class='tab-content animated fadeIn'><select size=\"4\" name=\"selectdefmut\" multiple=\"multiple\" id=\"selectdefmut\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>2500</label><div id='tab-content0' class='tab-content animated fadeIn'><h3>Nuevas afiliaciones, exclusiones y renuncias mes actual</h3><a href='' onclick='descargarasodeduccionesmensualessol()'>Descargar el contenido</a><select size=\"4\" name=\"selectafilsol\" multiple=\"multiple\" id=\"selectafilsol\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagodos'> <input type='radio' checked name='tabs' id='tab1'><label for='tab1'>2503</label><div id='tab-content1' class='tab-content animated fadeIn'><h3>Nuevas afiliaciones, exclusiones y renuncias mes actual</h3><a href='' onclick='descargarasodeduccionesmensualesmut()'>Descargar el contenido</a><select size=\"4\" name=\"selectafilmut\" multiple=\"multiple\" id=\"selectafilmut\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab3'><label for='tab3'>Cuotas PDF todos los asociados</label><div id='tab-content3' class='tab-content animated fadeIn'><a href='' onclick='descargarasodeduccionessol()'>Descargar el contenido</a><select size=\"4\" name=\"selectsol\" multiple=\"multiple\" id=\"selectsol\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab4'><label for='tab4'>Cuotas ABS todos los asociados</label><div id='tab-content4' class='tab-content animated fadeIn'><a href='' onclick ='descargarasodeduccionesaso()'>Descargar el contenido</a><select size=\"4\" name=\"selectaso\" multiple=\"multiple\" id=\"selectaso\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab5'><label for='tab5'>2504</label><div id='tab-content5' class='tab-content animated fadeIn'><h2> Nuevas afiliaciones, exclusiones, renuncias y variaciones en monto por préstamo de equipo medico ABS</h2 ><a href='' onclick='descargardeduccionesmensualabs()'>Descargar el contenido</a><select size=\"4\" name=\"selectmut\" multiple=\"multiple\" id=\"selectnuevosaso\" style=\"height:500px;width:100%;\" disabled></select></div> </li>");

    // $("#detalle").append("<li id='pagoenmut'> <input type='radio' checked name='tabs' id='tabpagomut'><label for='tabpagomut'>Cuotas PDB todos los asociados </label><div id='tab-contentdefmut' class='tab-content animated fadeIn'><select size=\"4\" name=\"selectdefmut\" multiple=\"multiple\" id=\"selectdefmut\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>2500</label><div id='tab-content0' class='tab-content animated fadeIn'><h3>Nuevas afiliaciones, exclusiones y renuncias mes actual</h3><a href='' onclick='descargarasodeduccionesmensualessol()'>Descargar el contenido</a><select size=\"4\" name=\"selectafilsol\" multiple=\"multiple\" id=\"selectafilsol\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagodos'> <input type='radio' checked name='tabs' id='tab1'><label for='tab1'>2503</label><div id='tab-content1' class='tab-content animated fadeIn'><h3>Nuevas afiliaciones, exclusiones y renuncias mes actual</h3><a href='' onclick='descargarasodeduccionesmensualesmut()'>Descargar el contenido</a><select size=\"4\" name=\"selectafilmut\" multiple=\"multiple\" id=\"selectafilmut\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab3'><label for='tab3'>Cuotas PDF todos los asociados</label><div id='tab-content3' class='tab-content animated fadeIn'><a href='' onclick='descargarasodeduccionessol()'>Descargar el contenido</a><select size=\"4\" name=\"selectsol\" multiple=\"multiple\" id=\"selectsol\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab4'><label for='tab4'>Cuotas ABS todos los asociados</label><div id='tab-content4' class='tab-content animated fadeIn'><a href='' onclick ='descargarasodeduccionesaso()'>Descargar el contenido</a><select size=\"4\" name=\"selectaso\" multiple=\"multiple\" id=\"selectaso\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab5'><label for='tab5'>2504</label><div id='tab-content5' class='tab-content animated fadeIn'><h2> Nuevas afiliaciones, exclusiones, renuncias y variaciones en monto por préstamo de equipo medico ABS</h2 ><a href='' onclick='descargardeduccionesmensualabs()'>Descargar el contenido</a><select size=\"4\" name=\"selectmut\" multiple=\"multiple\" id=\"selectnuevosaso\" style=\"height:500px;width:100%;\" disabled></select></div>      </li>  <li id='pago2499'> <input type='radio' checked name='tabs' id='tab2499'><label for='tab2499'>2499</label><div id='tab-content2499' class='tab-content animated fadeIn'><h2> Cuotas de afiliación solidaridad, mes actual y modificación de mes anterior</h2 ><a href='' onclick='descargar2499()'>Descargar el contenido</a><select size=\"4\" name=\"selectmut\" multiple=\"multiple\" id=\"select2499\" style=\"height:500px;width:100%;\" disabled></select></div>      </li>");
    //pestanna cambiada
    $("#detalle").append("<li id='pagoenmut'> <input type='radio' checked name='tabs' id='tabpagomut'><label for='tabpagomut'>Cuotas PDB todos los asociados </label><div id='tab-contentdefmut' class='tab-content animated fadeIn'><select size=\"4\" name=\"selectdefmut\" multiple=\"multiple\" id=\"selectdefmut\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab0'><label for='tab0'>2500</label><div id='tab-content0' class='tab-content animated fadeIn'><h3>Nuevas afiliaciones, exclusiones y renuncias mes actual</h3><a href='' onclick='descargarasodeduccionesmensualessol()'>Descargar el contenido</a><select size=\"4\" name=\"selectafilsol\" multiple=\"multiple\" id=\"selectafilsol\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagodos'> <input type='radio' checked name='tabs' id='tab1'><label for='tab1'>2503</label><div id='tab-content1' class='tab-content animated fadeIn'><h3>Nuevas afiliaciones, exclusiones y renuncias mes actual</h3><a href='' onclick='descargarasodeduccionesmensualesmut()'>Descargar el contenido</a><select size=\"4\" name=\"selectafilmut\" multiple=\"multiple\" id=\"selectafilmut\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab3'><label for='tab3'>Cuotas PDF todos los asociados</label><div id='tab-content3' class='tab-content animated fadeIn'><a href='' onclick='descargarasodeduccionessol()'>Descargar el contenido</a><select size=\"4\" name=\"selectsol\" multiple=\"multiple\" id=\"selectsol\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab4'><label for='tab4'>Cuotas ABS todos los asociados</label><div id='tab-content4' class='tab-content animated fadeIn'><a href='' onclick ='descargarasodeduccionesaso()'>Descargar el contenido</a><select size=\"4\" name=\"selectaso\" multiple=\"multiple\" id=\"selectaso\" style=\"height:500px;width:100%;\" disabled></select></div> </li><li id='pagouno'> <input type='radio' checked name='tabs' id='tab5'><label for='tab5'>2504</label><div id='tab-content5' class='tab-content animated fadeIn'><h2> Nuevas afiliaciones, exclusiones, renuncias y variaciones en monto por préstamo de equipo medico ABS</h2 ><a href='' onclick='descargardeduccionesmensualabs()'>Descargar el contenido</a><select size=\"4\" name=\"selectmut\" multiple=\"multiple\" id=\"selectnuevosaso\" style=\"height:500px;width:100%;\" disabled></select></div>      </li>  <li id='pago2499'> <input type='radio' checked name='tabs' id='tab2499'><label for='tab2499'>2499</label><div id='tab-content2499' class='tab-content animated fadeIn'><h2> Cuotas de afiliación solidaridad, mes actual y modificación de mes anterior</h2 ><a href='' onclick='descargar2499()'>Descargar el contenido</a><select size=\"4\" name=\"selectmut\" multiple=\"multiple\" id=\"select2499\" style=\"height:500px;width:100%;\" disabled></select></div>      </li>          <li id='pago2502'> <input type='radio' checked name='tabs' id='tab2502'><label for='tab2502'>2502</label><div id='tab-content2502' class='tab-content animated fadeIn'><h2> Cuotas de afiliación mutualidad, mes actual y modificación de mes anterior</h2 ><a href='' onclick='descargar2502()'>Descargar el contenido</a><select size=\"4\" name=\"selectmut\" multiple=\"multiple\" id=\"select2502\" style=\"height:500px;width:100%;\" disabled></select></div>      </li>");



    var persona = new Object();
    persona.ope = '14';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.mes = document.getElementById('messel').value;
    persona.anno = document.getElementById('annosel').value;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Deducciones',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                var x = document.getElementById("select2502");
                var option = document.createElement("option");
                option.text = 'No hay deducciones';
                option.value = 'No hay deducciones';
                option.id = 1;

                x.add(option);
            } else {

                $("#select2502").append(data);
                var sel = document.getElementById('select2502');
                var texto = "";
                for (var i = 0; i < sel.length; i++) {
                    var opt = sel[i];
                    texto = texto + opt.value + '\n';
                }

                //  document.getElementById('linkas').href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(texto);

            }



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });




    var persona = new Object();
    persona.ope = '13';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.mes = document.getElementById('messel').value;
    persona.anno = document.getElementById('annosel').value;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Deducciones',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                var x = document.getElementById("select2499");
                var option = document.createElement("option");
                option.text = 'No hay deducciones';
                option.value = 'No hay deducciones';
                option.id = 1;

                x.add(option);
            } else {

                $("#select2499").append(data);
                var sel = document.getElementById('select2499');
                var texto = "";
                for (var i = 0; i < sel.length; i++) {
                    var opt = sel[i];
                    texto = texto + opt.value + '\n';
                }

                //  document.getElementById('linkas').href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(texto);

            }



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });
    var persona = new Object();
    persona.ope = '1';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.mes = document.getElementById('messel').value;
    persona.anno = document.getElementById('annosel').value;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Deducciones',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                var x = document.getElementById("selectafilsol");
                var option = document.createElement("option");
                option.text = 'No hay deducciones';
                option.value = 'No hay deducciones';
                option.id = 1;

                x.add(option);
            } else {

                $("#selectafilsol").append(data);
                var sel = document.getElementById('selectafilsol');
                var texto = "";
                for (var i = 0; i < sel.length; i++) {
                    var opt = sel[i];
                    texto = texto + opt.value + '\n';
                }

                //  document.getElementById('linkas').href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(texto);

            }



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });




    var persona = new Object();
    persona.ope = '12';

    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.mes = document.getElementById('messel').value;
    persona.anno = document.getElementById('annosel').value;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Deducciones',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                var x = document.getElementById("selectnuevosaso");
                var option = document.createElement("option");
                option.text = 'No hay datos';
                option.value = 'No hay datos';
                option.id = 1;

                x.add(option);
            } else {
                //                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                //                        var x = document.getElementById("cfs");
                //                        var option = document.createElement("option");
                //                        option.text = data[ele].NUMERO + ' ' +  data[ele].DESCRIPCION;
                //                        option.value = data[ele].NUMERO;
                //                        option.id = data[ele].NUMERO;
                //
                //                        x.add(option);
                $("#selectnuevosaso").append(data);
                var sel = document.getElementById('selectnuevosaso');
                var texto = "";
                for (var i = 0; i < sel.length; i++) {
                    var opt = sel[i];
                    texto = texto + opt.value + '\n';
                }

                //  document.getElementById('linkam').href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(texto);

            }



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

    var persona = new Object();
    persona.ope = '10';

    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.mes = document.getElementById('messel').value;
    persona.anno = document.getElementById('annosel').value;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Deducciones',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                var x = document.getElementById("selectafilsol");
                var option = document.createElement("option");
                option.text = 'No hay datos';
                option.value = 'No hay datos';
                option.id = 1;

                x.add(option);
            } else {
                //                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                //                        var x = document.getElementById("cfs");
                //                        var option = document.createElement("option");
                //                        option.text = data[ele].NUMERO + ' ' +  data[ele].DESCRIPCION;
                //                        option.value = data[ele].NUMERO;
                //                        option.id = data[ele].NUMERO;
                //
                //                        x.add(option);
                $("#selectafilsol").append(data);
                var sel = document.getElementById('selectafilsol');
                var texto = "";
                for (var i = 0; i < sel.length; i++) {
                    var opt = sel[i];
                    texto = texto + opt.value + '\n';
                }

                //  document.getElementById('linkam').href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(texto);

            }



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

    var persona = new Object();
    persona.ope = '11';

    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.mes = document.getElementById('messel').value;
    persona.anno = document.getElementById('annosel').value;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Deducciones',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                var x = document.getElementById("selectafilmut");
                var option = document.createElement("option");
                option.text = 'No hay datos';
                option.value = 'No hay datos';
                option.id = 1;

                x.add(option);
            } else {
                //                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                //                        var x = document.getElementById("cfs");
                //                        var option = document.createElement("option");
                //                        option.text = data[ele].NUMERO + ' ' +  data[ele].DESCRIPCION;
                //                        option.value = data[ele].NUMERO;
                //                        option.id = data[ele].NUMERO;
                //
                //                        x.add(option);
                $("#selectafilmut").append(data);
                var sel = document.getElementById('selectafilmut');
                var texto = "";
                for (var i = 0; i < sel.length; i++) {
                    var opt = sel[i];
                    texto = texto + opt.value + '\n';
                }

                //  document.getElementById('linkam').href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(texto);

            }



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

    var persona = new Object();
    persona.ope = '2';

    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.mes = document.getElementById('messel').value;
    persona.anno = document.getElementById('annosel').value;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Deducciones',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                var x = document.getElementById("selectafilmut");
                var option = document.createElement("option");
                option.text = 'No hay deducciones';
                option.value = 'No hay deducciones';
                option.id = 1;

                x.add(option);
            } else {
                //                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                //                        var x = document.getElementById("cfs");
                //                        var option = document.createElement("option");
                //                        option.text = data[ele].NUMERO + ' ' +  data[ele].DESCRIPCION;
                //                        option.value = data[ele].NUMERO;
                //                        option.id = data[ele].NUMERO;
                //
                //                        x.add(option);
                $("#selectafilmut").append(data);
                var sel = document.getElementById('selectafilmut');
                var texto = "";
                for (var i = 0; i < sel.length; i++) {
                    var opt = sel[i];
                    texto = texto + opt.value + '\n';
                }

                //  document.getElementById('linkam').href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(texto);

            }



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

    var persona = new Object();
    persona.ope = '3';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.mes = document.getElementById('messel').value;
    persona.anno = document.getElementById('annosel').value;

    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Deducciones',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                var x = document.getElementById("selectsol");
                var option = document.createElement("option");
                option.text = 'No hay deducciones';
                option.value = 'No hay deducciones';
                option.id = 1;

                x.add(option);
            } else {
                //                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                //                        var x = document.getElementById("cfs");
                //                        var option = document.createElement("option");
                //                        option.text = data[ele].NUMERO + ' ' +  data[ele].DESCRIPCION;
                //                        option.value = data[ele].NUMERO;
                //                        option.id = data[ele].NUMERO;
                //
                //                        x.add(option);
                $("#selectsol").append(data);
                var sel = document.getElementById('selectsol');
                var texto = "";
                for (var i = 0; i < sel.length; i++) {
                    var opt = sel[i];
                    texto = texto + opt.value + '\n';
                }

                //  document.getElementById('links').href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(texto);

            }



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });
    var persona = new Object();
    persona.ope = '4';

    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.mes = document.getElementById('messel').value;
    persona.anno = document.getElementById('annosel').value;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Deducciones',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                var x = document.getElementById("selectaso");
                var option = document.createElement("option");
                option.text = 'No hay deducciones';
                option.value = 'No hay deducciones';
                option.id = 1;

                x.add(option);
            } else {
                //                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                //                        var x = document.getElementById("cfs");
                //                        var option = document.createElement("option");
                //                        option.text = data[ele].NUMERO + ' ' +  data[ele].DESCRIPCION;
                //                        option.value = data[ele].NUMERO;
                //                        option.id = data[ele].NUMERO;
                //
                //                        x.add(option);
                $("#selectaso").append(data);

                var sel = document.getElementById('selectaso');
                var texto = "";
                for (var i = 0; i < sel.length; i++) {
                    var opt = sel[i];
                    texto = texto + opt.value + '\n';
                }

                // document.getElementById('linkaso').href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(texto);

            }



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });



    var persona = new Object();
    persona.ope = '9';

    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.mes = document.getElementById('messel').value;
    persona.anno = document.getElementById('annosel').value;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Deducciones',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                var x = document.getElementById("selectnuevosaso");
                var option = document.createElement("option");
                option.text = 'No hay deducciones';
                option.value = 'No hay deducciones';
                option.id = 1;

                x.add(option);
            } else {
                //                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                //                        var x = document.getElementById("cfs");
                //                        var option = document.createElement("option");
                //                        option.text = data[ele].NUMERO + ' ' +  data[ele].DESCRIPCION;
                //                        option.value = data[ele].NUMERO;
                //                        option.id = data[ele].NUMERO;
                //
                //                        x.add(option);
                $("#selectnuevosaso").append(data);

                var sel = document.getElementById('selectnuevosaso');
                var texto = "";
                for (var i = 0; i < sel.length; i++) {
                    var opt = sel[i];
                    texto = texto + opt.value + '\n';
                }

                // document.getElementById('linkaso').href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(texto);

            }



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });



    var persona = new Object();
    persona.ope = '8';

    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;
    persona.mes = document.getElementById('messel').value;
    persona.anno = document.getElementById('annosel').value;
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Deducciones',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.length == 0) {
                var x = document.getElementById("selectdefmut");
                var option = document.createElement("option");
                option.text = 'No hay deducciones';
                option.value = 'No hay deducciones';
                option.id = 1;

                x.add(option);
            } else {
                //                  /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                //                        var x = document.getElementById("cfs");
                //                        var option = document.createElement("option");
                //                        option.text = data[ele].NUMERO + ' ' +  data[ele].DESCRIPCION;
                //                        option.value = data[ele].NUMERO;
                //                        option.id = data[ele].NUMERO;
                //
                //                        x.add(option);
                $("#selectdefmut").append(data);

                var sel = document.getElementById('selectdefmut');
                var texto = "";
                for (var i = 0; i < sel.length; i++) {
                    var opt = sel[i];
                    texto = texto + opt.value + '\n';
                }

                // document.getElementById('linkaso').href = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(texto);

            }



        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });
}

function limpiar() {

    var persona = new Object();
    persona.ope = '7';
    persona.usrid = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.pssw = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).CONTRASENA;


    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Deducciones',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            alert("Deducciones eliminadas");
            window.location.href = "dedplanillas.html";

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });

}



function generarTextoasoexclusiones() {
    var texto = [];
    var tmsel = document.getElementById('selectexcaso').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('selectexcaso').options[z].value;
        texto.push(t + '\r\n');
    }



    return new Blob(texto, {
        type: 'text/plain'
    });
}

function generarTextomutexclusiones() {
    var texto = [];
    var tmsel = document.getElementById('selectexcmut').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('selectexcmut').options[z].value;
        texto.push(t + '\r\n');
    }



    return new Blob(texto, {
        type: 'text/plain'
    });
}

function generarTextosolexclusiones() {
    var texto = [];
    var tmsel = document.getElementById('selectexcsol').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('selectexcsol').options[z].value;
        texto.push(t + '\r\n');
    }



    return new Blob(texto, {
        type: 'text/plain'
    });
}



function generarTextoaso() {
    var texto = [];
    var tmsel = document.getElementById('selectaso').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('selectaso').options[z].value;
        texto.push(t + '\r\n');
    }



    return new Blob(texto, {
        type: 'text/plain'
    });
}

function generarTextosol() {
    var texto = [];
    var tmsel = document.getElementById('selectsol').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('selectsol').options[z].value;
        texto.push(t + '\r\n');
    }



    return new Blob(texto, {
        type: 'text/plain'
    });
}

function generarTextoafilsol() {
    var texto = [];
    var tmsel = document.getElementById('selectafilsol').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('selectafilsol').options[z].value;
        texto.push(t + '\r\n');
    }



    return new Blob(texto, {
        type: 'text/plain'
    });
}

function generarTextoafilmut() {
    var texto = [];
    var tmsel = document.getElementById('selectafilmut').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('selectafilmut').options[z].value;
        texto.push(t + '\r\n');
    }



    return new Blob(texto, {
        type: 'text/plain'
    });
}

function generarTextomut() {
    var texto = [];
    var tmsel = document.getElementById('selectmut').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('selectmut').options[z].value;
        texto.push(t + '\r\n');
    }
    return new Blob(texto, {
        type: 'text/plain'
    });
}


function generarTextoafilaso() {
    var texto = [];
    var tmsel = document.getElementById('selectnuevosaso').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('selectnuevosaso').options[z].value;
        texto.push(t + '\r\n');
    }
    return new Blob(texto, {
        type: 'text/plain'
    });
}

function generarTextocuotasmut() {
    var texto = [];
    var tmsel = document.getElementById('selectdefmut').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('selectdefmut').options[z].value;
        texto.push(t + '\r\n');
    }



    return new Blob(texto, {
        type: 'text/plain'
    });
}


function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};

function descargatodos() {

    mes = document.getElementById('messel').value;

    anno = document.getElementById('annosel').value;

    //descargarArchivo(generarTextoaso(), '2504.txt');
    //descargarArchivo(generarTextosol(), '2500.txt');
    //descargarArchivo(generarTextoafilsol(), 'nuevosBDFA'+ mes +'_'+ anno+ '.txt');
    //descargarArchivo(generarTextoafilmut(), 'nuevosBDA' + mes + '_' + anno + '.txt');
    //descargarArchivo(generarTextoafilaso(), 'nuevosABS' + mes + '_' + anno + '.txt');
    //descargarArchivo(generarTextocuotasmut(), '2503.txt');
    //descargarArchivo(generarTextoasoexclusiones(), 'exclusionesyrenunciasasobiso' + mes + '_' + anno + '.txt');
    //descargarArchivo(generarTextomutexclusiones(), 'exclusionesyrenunciasmutualidad' + mes + '_' + anno + '.txt');
    //descargarArchivo(generarTextosolexclusiones(), 'exclusionesyrenunciassolidaridad' + mes + '_' + anno + '.txt');


    descargarArchivo(generarTextocuotasmensualessol(), 'CuotasMensuales_2500_' + mes + '_' + anno + '.txt');




    descargarArchivo(generarTextocuotasmensualesmut(), 'CuotasMensuales_2503_' + mes + '_' + anno + '.txt');



    descargarArchivo(generarTextocuotasmensualesaso(), 'CuotasMensuales_2504_' + mes + '_' + anno + '.txt');


    descargarArchivo(generarTextocuotasmensualesafilsol(), 'CuotasMensuales_2499_' + mes + '_' + anno + '.txt');


    descargarArchivo(generarTextocuotasmensualesafilsol(), 'CuotasMensuales_2502_' + mes + '_' + anno + '.txt');




}

function descargarexclusionesaso() {
    descargarArchivo(generarTextoasoexclusiones(), 'exclusionesyrenunciasasobiso' + mes + '_' + anno + '.txt');
}

function descargarexclusionesmut() {
    descargarArchivo(generarTextomutexclusiones(), 'exclusionesyrenunciasmutualidad' + mes + '_' + anno + '.txt');
}

function descargarexlusionessolidaridad() {
    descargarArchivo(generarTextosolexclusiones(), 'exclusionesyrenunciassolidaridad' + mes + '_' + anno + '.txt');
}

function descargarasodeduccionesaso() {
    descargarArchivo(generarTextoaso(), '2504.txt');

}

function descargarasodeduccionessol() {
    descargarArchivo(generarTextosol(), '2500.txt');

}

function descargarasodeduccionesafilsol() {
    descargarArchivo(generarTextoafilsol(), 'nuevosBDFA.txt');

}

function descargarasodeduccionesafilmut() {
    descargarArchivo(generarTextoafilmut(), 'nuevosBDA.txt');

}

function descargarasodeduccionesmut() {
    descargarArchivo(generarTextomut(), 'Nuevosmutualidad.txt');

}

function descargarnuevasafiliacionesaso() {
    descargarArchivo(generarTextoafilaso(), 'nuevosABS' + mes + '_' + anno + '.txt');
}

function generarTextocuotasmensualessol() {
    var texto = [];
    var tmsel = document.getElementById('selectafilsol').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('selectafilsol').options[z].value;
        texto.push(t + '\r\n');
    }



    return new Blob(texto, {
        type: 'text/plain'
    });
}

function generarTextocuotasmensualesmut() {
    var texto = [];
    var tmsel = document.getElementById('selectafilmut').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('selectafilmut').options[z].value;
        texto.push(t + '\r\n');
    }



    return new Blob(texto, {
        type: 'text/plain'
    });
}


function generarTextocuotasmensualesaso() {
    var texto = [];
    var tmsel = document.getElementById('selectnuevosaso').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('selectnuevosaso').options[z].value;
        texto.push(t + '\r\n');
    }



    return new Blob(texto, {
        type: 'text/plain'
    });
}

function generarTextocuotasmensualesafilsol() {
    var texto = [];
    var tmsel = document.getElementById('select2499').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('select2499').options[z].value;
        texto.push(t + '\r\n');
    }



    return new Blob(texto, {
        type: 'text/plain'
    });
}

function generarTextocuotasmensualesafilmut() {
    var texto = [];
    var tmsel = document.getElementById('select2502').length;
    var t;

    for (var z = 0; z < tmsel; z++) {
        t = document.getElementById('select2502').options[z].value;
        texto.push(t + '\r\n');
    }



    return new Blob(texto, {
        type: 'text/plain'
    });
}

function descargarasodeduccionesmensualessol() {
    descargarArchivo(generarTextocuotasmensualessol(), 'CuotasMensuales_2500_' + mes + '_' + anno + '.txt');

}

function descargarasodeduccionesmensualesmut() {

    descargarArchivo(generarTextocuotasmensualesmut(), 'CuotasMensuales_2503_' + mes + '_' + anno + '.txt');
}

function descargardeduccionesmensualabs() {
    descargarArchivo(generarTextocuotasmensualesaso(), 'CuotasMensuales_2504_' + mes + '_' + anno + '.txt');
}

function descargar2499() {
    descargarArchivo(generarTextocuotasmensualesafilsol(), 'CuotasMensuales_2499_' + mes + '_' + anno + '.txt');
}

function descargar2502() {
    descargarArchivo(generarTextocuotasmensualesafilsol(), 'CuotasMensuales_2502_' + mes + '_' + anno + '.txt');
}