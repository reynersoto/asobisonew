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
if (JSON.parse(localStorage.getItem("USUARIOLOGUEADO")) == undefined) {
    alert("No estas autorizado para ingresar aun");
    location.href = "/login.html";

} else {
    //  alert(JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO);
}

function subir() {
    var objeto = new Object();
    objeto.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;

    objeto.usuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;

    objeto.observaciones = document.getElementById("obs").value;
    objeto.esnuevo = "1";
    objeto.cuota = localStorage.getItem("formadepago");
    //ajax de los datos de mutualidad
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Mutualidad',
        type: 'POST',
        dataType: 'json',
        data: objeto,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            alert("bueno");
        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert("malo");
        }
    });



    var persona = new Object();
    persona.identificacion = JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION;
    persona.nombre = document.getElementById("nombre").value;
    persona.primer_apellido = document.getElementById("ap1").value;
    persona.segundo_apellido = document.getElementById("ap2").value;

    var ele = document.getElementById("cfs");
    for (var ii = 0; ii < ele.length; ii++)
        if (ele.options[ii].selected = true) { //Found!
            persona.nuemrocf = ele.options[ii].value;
            break;
        }

    persona.direccion = document.getElementById("direccion").value;
    persona.email1 = document.getElementById("email").value;
    persona.email2 = document.getElementById("email2").value;
    persona.tel1 = document.getElementById("tel1").value;
    persona.tel2 = document.getElementById("tel2").value;
    persona.cel = document.getElementById("cel").value;
    persona.fec_nac = document.getElementById("fecha_nac").value;
    persona.fec_ing_ICE = document.getElementById("fecha_ing_ICE").value;

    persona.usuario = JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).ID;
    persona.esnuevo = "1";

    //ajax de los datos personales
    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Persona',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {

            } else {
               /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("PERSONABUSCADA", JSON.stringify(data));
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });




    var files = $("#inputFile").get(0).files;
    if (files.length > 0) {
        var data = new FormData();
        files[0].name = localStorage.getItem("PERSONABUSCADA").IDENTIFICACION;
        for (i = 0; i < files.length; i++) {
            data.append("file" + i, files[i]);
        }
        data.append('ID', JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION);
        data.append('TIPO', 'FOTOGRAFIAPERSONA');
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
    subirboleta();
}

function subirboleta() {
    var files = $("#inputFileboleta").get(0).files;
    if (files.length > 0) {

        var data = new FormData();
        files[0].name = localStorage.getItem("PERSONABUSCADA").IDENTIFICACION;
        for (i = 0; i < files.length; i++) {
            data.append("file" + i, files[i]);
        }
        data.append('ID', JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION);
        data.append('TIPO', 'FOTOGRAFIABOLETA');
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
}

function ocultacuotas() {

    document.getElementById("cuotasporplanilla").style.visibility = "hidden";
   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("formadepago", 'efectivo');


}

function cuotapor1000() {

   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("formadepago", '1000');


}

function cuotapor1500() {

   /*GUARDADO EN MEMORIA LOCAL, COOKIE EL DATO*/ localStorage.setItem("formadepago", '1500');


}

function cuotapor3000() {

    localStorage.getItem("formadepago") = '3000';


}


function manejacuotas() {

    //var divcuotas = document.getElementById("cuotasporplanilla");
    document.getElementById("cuotasporplanilla").style.visibility = "visible";



}

function encuentracf() {
    var ele = document.getElementById("cfs");
    for (var ii = 0; ii < ele.length; ii++)
        if (ele.options[ii].value == JSON.parse(localStorage.getItem("PERSONABUSCADA")).CENTRO_FUNCIONAL.NUMERO) { //Found!
            ele.options[ii].selected = true;
        }
}

var capa = document.getElementById("people");
capa.innerHTML = "<li>   <a href='userconfig.html?ID=" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + "'><img src='/Fotos/" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).IDENTIFICACION + ".jpg' onerror='this.src = 'Imagenes/btn_menu.png'' /></a><h2>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).NOMBRE_COMPLETO + "</h2><em>" + JSON.parse(localStorage.getItem("USUARIOLOGUEADO")).EMAIL + "</em> <a href='login.html'>Salir del sistema</a></li>";




var parrafo = document.createElement("p");
parrafo.innerHTML = "Nueva a filiación en mutualidad para: " + JSON.parse(localStorage.getItem("PERSONABUSCADA")).IDENTIFICACION + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE + ' ' + JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO + JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO;

document.getElementById("datainfo").appendChild(parrafo);
document.getElementById("nombre").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).NOMBRE;
document.getElementById("ap1").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).PRIMER_APELLIDO;
document.getElementById("ap2").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).SEGUNDO_APELLIDO;

document.getElementById("email").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).EMAIL1;
document.getElementById("email2").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).EMAIL2;
document.getElementById("tel1").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).TEL1;
document.getElementById("tel2").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).TEL2;
document.getElementById("cel").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).CEL;
document.getElementById("direccion").value = JSON.parse(localStorage.getItem("PERSONABUSCADA")).DIRECCION;
document.getElementById("fecha_nac").valueAsDate = JSON.parse(localStorage.getItem("PERSONABUSCADA")).FECHA_NACIMIENTO;
document.getElementById("fecha_ing_ICE").valueAsDate = JSON.parse(localStorage.getItem("PERSONABUSCADA")).FECHA_INGRESO_ICE;


var persona = new Object();
persona.identificacion = '0';

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
          /*ITERAMOS EL VECTOR DE DATOS RECUPERADO DESDE EL SERVIDOR*/  for (var ele in data) {
                var x = document.getElementById("cfs");
                var option = document.createElement("option");
                option.text = data[ele].NUMERO + ' ' + data[ele].DESCRIPCION;
                option.value = data[ele].NUMERO;
                option.id = data[ele].NUMERO;
                //   option.id=
                x.add(option);

            }
        }

    },
    /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
        alert(xhr);
    }
});

var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //activate next step on progressbar using the index of next_fs
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
        opacity: 0
    }, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')'
            });
            next_fs.css({
                'left': left,
                'opacity': opacity
            });
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".previous").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
        opacity: 0
    }, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
                'left': left
            });
            previous_fs.css({
                'transform': 'scale(' + scale + ')',
                'opacity': opacity
            });
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".submit").click(function () {
    return false;
})

function generaidtmp() {
    var persona = new Object();
    persona.criterio = "idtmp";


    /*LAS PETICIONES AJAX DEL SISTEMA SE REALIZAN A LOS CONTROLADORES DE LA CARPETA CONTROLLERS, SIEMPRE UTILIZANDO EL VERBO POST, SE UTILIZA JQUERY PARA EL USO DE AJAX*/$.ajax({
        url: urllocal + 'Comunes',
        type: 'POST',
        dataType: 'json',
        data: persona,
        /*CUANDO EL ERVIDOR ENVIA UNA RESPUESTA AFIRMATIVA*/success: function (data, textStatus, xhr) {
            if (data.ID == 0) {
                alert("Persona no esta afiliada ni registrada");
            } else {

                document.getElementById("idbn").value = data;

                $('#nombn').removeAttr("disabled");
                $('#pabn').removeAttr("disabled");
                $('#sabn').removeAttr("disabled");
                $('#btningresaben').removeAttr("disabled");
            }

        },
        /*CUALQUIER ERROR DE COMUNICACION CON EL API*/error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
        }
    });



}