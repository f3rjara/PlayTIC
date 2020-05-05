// INICIALIZA EL TOOLTIP DE BOOSTRAP
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

// GENERA LA ACCION DE BOTON REGRESAR DE CADA HERRAMIENTA
$('#returnBtn').click(function() {    
    location.href="../index.html";
});

// **************** FUNCIONES GENERALES PARA EL PROYECTO  *****************//

// FUNCIÓN QUE ME GENERA UN NÚMERO ALEATORIO ENTERO AMBOS INCLUSIVOS
function getNumRand(min, max) {       
    return Math.round(Math.random()*(max-min)+parseInt(min));
}

// FUNCIÓN QUE ME GENERA UN NÚMERO ALEATORIO SIN REPETIRSE ENTERO AMBOS INCLUSIVOS
function getNumRandUnique(min, max, arrayHistory) {      
    var NumAleatorio =  getNumRand(min, max);

    if(! arrayHistory.includes( NumAleatorio )){  
        arrayHistory.push(NumAleatorio);
        return NumAleatorio;
    }  
    else{
        getNumRandUnique(min, max, arrayHistory)
    }  
}

// FUNCIÓN QUE ME PERMITE SOLO RECIBIR NÚMEROS EN UN INPUT
function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode;       
    return ((key >= 48 && key <= 57) || (key==8) || (key==45));
}
