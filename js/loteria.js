var CardGeneradas = [];
var img = "";


if(CardGeneradas.length == 0){
    $("#imgLoteria").hide();
    $('#CardGenerated').html('Genere una carta para comenzar');
    db.ref('loteria/generator').set({
        CardGenerated: 0,
        RoutImage: "../img/loteria/back.png"                
    });
}

function mostrarHistory(array){
    var string = "";
   
    var col = array.length;
    array = array.reverse();
    
    string+= "<b>Tarjetas generadas: <button class='btn btn-success btn-sm'>"+col+"</button><div class='row container'> ";
           
    for (let i = 0; i < col; i++) {
        if(col == 1){
            string+= '<div class="col col-sm-12 "><img width="100%" src="../img/loteria/'+array[i]+'.png"></div>';
        }
        else if(col == 2){
            string+= '<div class="col col-sm-6 "><img width="100%" onclick="imgClic(e)" src="../img/loteria/'+array[i]+'.png"></div>';
        }
        else if(col == 3){
            string+= '<div class="col col-sm-4 "><img width="100%" onclick="imgClic(e)" src="../img/loteria/'+array[i]+'.png"></div>';
        }
        else{
            string+= '<div class="col col-sm-3 "><img width="100%" onclick="imgClic(e)" src="../img/loteria/'+array[i]+'.png"></div>';
        }
                  
    }        
 
    string+= "</div>";
        
    return string;

}

function GenerarCard(){
    
    if(CardGeneradas.length < 54)    
    {
        
        var num = getNumRand(0, 54);
       
        if(!CardGeneradas.includes( num )){            
            CardGeneradas.push(num);

            var ruta = "../img/loteria/"+num+".png";            
            var img = mostrarHistory(CardGeneradas);            

            db.ref('loteria/generator').set({
                CardGenerated: num,
                RoutImage: ruta,
                HistoryCard: CardGeneradas                
            });

            $("#imgLoteria").show();
            $('#TurnoCard').html(CardGeneradas.length);                   
            $("#imgLoteria").attr("src",ruta);            
            $('#CardsHistoy').html(img);
        }   
        else{
            GenerarCard()
        }
            
    }
    else{
        $("#imgLoteria").hide();
        $('#CardGenerated').removeClass().addClass('btn btn-danger');  
        $('#CardGenerated').html('SE TERMINARON LAS CARTAS');  
        
    }

    
}

var UserWinner = db.ref('loteria/win');
UserWinner.on('value', function(snapshot) {
    var tablero = snapshot.val().tablero;
    var user = snapshot.val().user;
    var win = snapshot.val().win;

    if(CardGeneradas.length < 4){
        firebase.database().ref('loteria/validateWin').set({
            win: false
        });
    }    
    if(win === true){

        Swal.fire({
            position: 'top-end',
            title: 'GRITARON LOTERIA!',
            icon: 'success',
            html: `<h1><b>${user} Grito loteria! </b></h1><br> Verificando cartas ...`,
            showConfirmButton: false,
            timer: 2500
        })

        

        var CardsNoFound = [];
        var conincidencias = 0;
        tablero.forEach(item => {
            if(CardGeneradas.includes(item)){
                conincidencias++
            }
            else{
                CardsNoFound.push(item);
            }
        });

        function VerCardSend(ArraySend){
            var images = "";
            ArraySend.forEach(item => {
                images+= "<img src='../img/loteria/"+item+".png' class='ml-2' height='290' width='200'></img>";
            });
            return images;
        }
       



        if(CardGeneradas.length > 0){            
            if(conincidencias < 4){
                db.ref('loteria/win').set({
                    tablero: tablero,
                    user: user,
                    win: false                
                });

                db.ref('loteria/RespondValidateWin').set({
                    win: false,
                    CardsNoFound: CardsNoFound,
                    user: user,
                    mesage: 'ha enviado cartas que no han sido reveladas'
                });
                


                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    width: 900,
                    html: `${user} ha enviado cartas que no han sido revelada <br>` + `${VerCardSend(CardsNoFound)}`                                       
                }) ;
                
            }
            if(conincidencias == 4){
                db.ref('loteria/validateWin').set({
                    win: true,
                    tablero: tablero,
                    user: user
                });

                db.ref('loteria/RespondValidateWin').set({
                    win: true,
                    CardsNoFound: tablero,
                    user: user,
                    mesage:`ha ganado con estas cartas `
                });

                Swal.fire({
                    icon: 'success',
                    title: 'GANADOR...!',
                    width: 900,
                    html: `<h1>${user}</h1>`+`  <br>` + `${VerCardSend(CardsNoFound)}`                                       
                });
            }            
        }
        else {
                      
            db.ref('loteria/win').set({
                tablero: tablero,
                user: user,
                win: false                
            });

            db.ref('loteria/RespondValidateWin').set({
                win: false,
                CardsNoFound: CardsNoFound,
                user: user,
                mesage: 'Aún no se han generado suficientes cartas para ganar'
            });

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                width: 900,
                html: `${user} ha enviado cartas, Aún no se han generado suficientes cartas para ganar <br>` + `${VerCardSend(CardsNoFound)}`                                       
            }) ;



        }
        
        


    }
});

