function lanzardados() {
    let dado1 =  getNumRand(1, 6);
    let dado2 =  getNumRand(1, 6);
    let suma = dado1 + dado2;

    $({ deg: 0 }).animate({ deg: 360 }, {
        duration: 600,
        step: function (now) {
            var scale = (1 * now / 360);
            $('#ImgDado1').css({
                transform: 'rotate(' + now + 'deg) scale(' + scale + ')'
            });
            $('#ImgDado2').css({
                transform: 'rotate(' + now + 'deg) scale(' + scale + ')'
            });
        }
    }); 


    document.getElementById("ImgDado1").src="../img/dados/"+dado1+".svg";
    document.getElementById("ImgDado2").src="../img/dados/"+dado2+".svg";    
    document.getElementById("SumaDados").innerHTML = suma;
    
    //$('#ImgDado1').attr("src", "../img/dados/"+dado1+".svg");
    //$('#SumaDados').html(suma);
    
}