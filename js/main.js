$('#returnBtn').click(function() {    
    location.href="../index.html";
});

function getNumRand(min, max) {
    return parseInt((Math.random() * (max - min) + min))+1;
}
