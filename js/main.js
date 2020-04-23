$('#returnBtn').click(function() {    
    location.href="../index.html";
});

//FUNCION ME PERMITE SOLO DIGITAR NÚMEROS

function soloNumeros(e){
    var key = window.Event ? e.which : e.keyCode;
    return ( ( key >= 48 && key <= 57 ) || (key == 8));
}


// Retorna un entero aleatorio entre min (incluido) y max (excluido)
function getNumRand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
