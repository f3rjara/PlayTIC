document.querySelector("#LanDado").addEventListener('click', lanzador);

var suma = 0;
var historial = [];

function lanzador(){    
    var dado1 = parseInt(getNumRand(1, 7));
    var dado2 = parseInt(getNumRand(1, 7));   
    var $d1 = $('#d1');
    var $d2 = $('#d2');

    $({ deg: 0 }).animate({ deg: 360 }, {
        duration: 600,
        step: function (now) {
            var scale = (1 * now / 360);
            $d1.css({
                transform: 'rotate(' + now + 'deg) scale(' + scale + ')'
            });
            $d2.css({
                transform: 'rotate(' + now + 'deg) scale(' + scale + ')'
            });
        }
    }); 



    $("#d1").attr("src","../img/"+dado1+".png");
    $("#d2").attr("src","../img/"+dado2+".png");

    suma = dado1 + dado2;

    historial.push(suma);
    $('#puntos').html(suma);

    if(historial.length > 1){
        $('#EndSum').html(historial[historial.length-2]);
    }
    
    

}
/*

d2


*/