$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})



$('#returnBtn').click(function() {    
    location.href="../index.html";
});

function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode;       
    return ((key >= 48 && key <= 57) || (key==8) || (key==45));
}


function getNumRand(min, max) {
    return parseInt((Math.random() * (max - min) + min))+1;
}


