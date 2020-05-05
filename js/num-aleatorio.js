var historialSinRepetir = [];
var historialRepetido = [];

// BORRA EL HISTORIAL Y RESTAURA LOS ARRAYS
function reset(){
    historialSinRepetir = [];
    historialRepetido = [];    
    $('#HistoialNum').html('-');
    $('#NumGen').html('-'); 
    $('#CantHistory').html('0');    

    $('#historial').html('Sin números por mostrar.');
    MostrarNumerosGenerados(historialSinRepetir);

    Toast.fire({
        icon: 'success',
        title: 'Se ha borrado con exito el historial'
    }); 


}

// MUESTRA LOS NÚMEROS GENERADOS Y EL ANTERIOR NÚMERO
function MostrarNumerosGenerados(ArraySend){
    
    if(ArraySend.length  < 1){
        $('#NumGen').html('-');        
    }
    else if(ArraySend.length == 1){
        $('#NumGen').html(ArraySend[ArraySend.length - 1]);
        $('#HistoialNum').html('-');
    }
    else{
        $('#NumGen').html(ArraySend[ArraySend.length - 1]);
        $('#HistoialNum').html(ArraySend[ArraySend.length - 2]);
    };    
}

// MUESTRA EL HISTORIAL DE TODOS LOS NÚMEROS GENERADOS
function MostrarHistorial(ArraySend){
    // SE LIMPIAN LOS CAMPOS
    $('#historial').html(' ');
    $('#CantHistory').html('0');

    // SE CREA LA VARIBALE QUE GUARDARÁ TODOS LOS NÚMEROS 
    var StringHistorial = ""; 

    var contador = 0;

    ArraySend.forEach(element => {        
        contador ++;
        if(contador == ArraySend.length){
            StringHistorial += `<button class="btn btn-success btn-sm mr-2 mb-2">
                                ${element}
                            </button>`;
        }
        else{
            StringHistorial += `<button class="btn btn-dark btn-sm mr-2 mb-2">
                                ${element}
                            </button>`;
        }
    });    

    $('#historial').html(StringHistorial);
    $('#CantHistory').html(ArraySend.length);
}

// BOTON GENERAR NÚMERO,
$('#FormAleatorio').bind("submit", function(){
    // SE PREVIENE LA RECARGA DE LA PÁGINA
    event.preventDefault();

    // SE OBTIENE LAS VARIBALES
    var NumMin = parseInt($('#MinInput').val());
    var NumMax = parseInt($('#MaxInput').val());
    // SE OBTIENE VERDADERO O FALSO SI DESEA REPETIDOS
    var SinRepetir = $('#SinRepetir').prop('checked'); 
    

    // SE VERIFICA SI LOS INPUT TIENEN ALGÚN VALOR
    if(isNaN(NumMin) || isNaN(NumMax)){        
        // ESTE CASO ES GENERAR UN NÚMERO ALEATORIO POR DEFECTO 1 A 100
        // SE IGUALA LAS VARIABLES A LOS DATOS POR DEFECTO        
        NumMin = 1;
        NumMax = 100;  

        // EL USUARIO QUIERE NÚMEOS SIN REPETIRSE
        if(SinRepetir === true){     
            var diferencia = (NumMax - NumMin);

            if(historialSinRepetir.length <= diferencia){            
                // SE OBTIENE EL NÚMERO ALEATORIO ENTRE 1 Y 100 SIN REPETICIÓN
                getNumRandUnique(NumMin, NumMax, historialSinRepetir); 

                 // SE MUESTRA EL NÚMERO GENRADO
                MostrarNumerosGenerados(historialSinRepetir);

                Toast.fire({
                    icon: 'success',
                    title: 'Número generado por defecto.',
                    html:  '<button class="btn bt-sm btn-success"><b>Sin repetirse!</b> </button>'
                });
            }      
            else{               
                $('#NumGen').html('-'); 
                $('#HistoialNum').html(historialSinRepetir[historialSinRepetir.length - 1]);
                Toast.fire({
                    icon: 'error',
                    title: 'No hay más números.'
                });               
            }

             // SE MUESTRA EL HISTORIAL DE TODOS LOS NÚMEROS GENERADOS
            MostrarHistorial(historialSinRepetir);
        }
        // LOS NÚMEROS GENERADOS CON REPETICIÓN
        else{   
            // SE OBTIENE EL NÚMERO ALEATORIO ENTRE 1 Y 100
            var NumGenerado = getNumRand(NumMin, NumMax);
            // SE GUARDA EL NÚMERO EN EL HISTORIAL REPETIDO            
            historialRepetido.push(NumGenerado);

            // SE MUESTRA EL NÚMERO GENRADO
            MostrarNumerosGenerados(historialRepetido);

            // SE MUESTRA EL HISTORIAL DE TODOS LOS NÚMEROS GENERADOS
            MostrarHistorial(historialRepetido);

            Toast.fire({
                icon:  'warning',
                title: 'Número generado por defecto.',
                html:  '<button class="btn bt-sm btn-warning"><b>Pueden repetirse!</b> </button>'
            });            
        }       
    }
    else {        
        //ESTE CASO ES GENERAR NUMERO ALEATORIO POR VALORES DADOS      
               
        // SE VERIFICA SI DESEA REPETIDOS O NO 
        if(SinRepetir === true){     
            var diferencia = (NumMax - NumMin);
            
            // SE VERIFICA CUANTOS NÚMEROS HAN SALIDO
            if(historialSinRepetir.length <= diferencia){    
               
                // SE OBTIENE EL NÚMERO ALEATORIO ENTRE Min Y Max SIN REPETICIÓN
                getNumRandUnique(NumMin, NumMax, historialSinRepetir); 

                 // SE MUESTRA EL NÚMERO GENRADO
                MostrarNumerosGenerados(historialSinRepetir);
    
                // MENSAJE PARA EL USUARIO
                Toast.fire({
                    icon: 'success',
                    title: 'Número generado con sus datos.',
                    html:  '<button class="btn bt-sm btn-success"><b>Sin repetirse!</b> </button>'
                });
            }      
            else{         

                // SE IMPRIME EN PANTALLA EL ULTIMO NÚMERO OBTENIDO
                $('#NumGen').html('-'); 
                $('#HistoialNum').html(historialSinRepetir[historialSinRepetir.length - 1]);
                
                // MENSAJE PARA EL USUARIO
                Toast.fire({
                    icon: 'error',
                    title: 'No hay más números.'
                });               
            }

             // SE MUESTRA EL HISTORIAL DE TODOS LOS NÚMEROS GENERADOS
            MostrarHistorial(historialSinRepetir);
        }
        // LOS NÚMEROS PUEDES REPETIRSE
        else{   
            
            // SE OBTIENE EL NÚMERO ALEATORIO ENTRE 1 Y 100
            var NumGenerado = getNumRand(NumMin, NumMax);

            // SE GUARDA EL NÚMERO EN EL HISTORIAL REPETIDO            
            historialRepetido.push(NumGenerado);

            // SE MUESTRA EL NÚMERO GENRADO
            MostrarNumerosGenerados(historialRepetido);

            // SE MUESTRA EL HISTORIAL DE TODOS LOS NÚMEROS GENERADOS
            MostrarHistorial(historialRepetido);

            // MENSAJE PARA EL USUARIO
            Toast.fire({
                icon: 'warning',
                title: 'Número generado con sus datos.',
                html:  '<button class="btn bt-sm btn-warning"><b>Pueden repetirse!</b> </button>'
            });
        }   
    }
    
})