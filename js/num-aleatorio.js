var historial = [];

$('#FormAleatorio').bind("submit", function(){
    event.preventDefault();

    var NumMin = parseInt($('#MinInput').val());
    var NumMax = parseInt($('#MaxInput').val());

    if(isNaN(NumMin) || isNaN(NumMax)){
        //ESTE CASO ES GENERAR NUMERO ALEATORIO POR DEFECTO 1 A 100
        NumMin = 1;
        NumMax = 100 + 1;
        var NumGenerado = getNumRand(NumMin, NumMax);

        historial.push(NumGenerado);
        if(historial.length == 1){
            $('#HistoialNum').html('-');
        }else{
            $('#HistoialNum').html(historial[historial.length-2]);
        }


        $('#NumGen').html(NumGenerado);

        Toast.fire({
            icon: 'warning',
            title: 'Número generado por defecto'
          })
                
    }
    else{
        //ESTE CASO ES GENERAR NUMERO ALEATORIO POR VALORES DADOS       
        var NumGenerado = getNumRand(NumMin, NumMax + 1);       
        
        historial.push(NumGenerado);
        if(historial.length == 1){
            $('#HistoialNum').html('-');
        }else{
            $('#HistoialNum').html(historial[historial.length-2]);
        }

        $('#NumGen').html(NumGenerado);

        Toast.fire({
            icon: 'success',
            title: 'Número generado con sus datos'
          })
    }
    
})