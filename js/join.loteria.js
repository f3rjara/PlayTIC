
var tarjeton = [];
var cuentaCards = 0;
var DataUser = [];

$('#ResetuserLogin').click(function(){
    localStorage.removeItem('LoteriaUser');
    location.reload();
})

function VerCardSend(ArraySend){
    var images = "";
    ArraySend.forEach(item => {
        images+= "<img src='../img/loteria/"+item+".png' class='ml-2' height='290' width='200'></img>";
    });
    return images;
}


async function ValidarUsuario(cardBoard, cuentaCards){
    
    var user = localStorage.getItem('LoteriaUser');
    
    if(user === null){

        const { value: name } = await Swal.fire({
            title: 'Queremos saber quien eres',
            input: 'text',
            inputPlaceholder: 'Digita tu nombre'
          })
          
          if (name) {
            Swal.fire(`Bienvenid@ : ${name}`);
            DataUser = [
                {
                    name: 'LoteriaUser',
                    user: name,
                    tarjeton: cardBoard,
                    cuentaCards: cuentaCards                    
                }
            ];            
            localStorage.setItem('LoteriaUser',JSON.stringify(DataUser));
            $('#UserOnLine').html(`Usuario: &nbsp; ${name}`);
          }  
    }else{
        let datosUser = JSON.parse(localStorage.getItem('LoteriaUser'));
        user = datosUser[0]['user'];
        DataUser = [
            {
                name: 'LoteriaUser',
                user: user,
                tarjeton: tarjeton,
                cuentaCards: cuentaCards                    
            }
        ];        
        localStorage.setItem('LoteriaUser',JSON.stringify(DataUser));
        $('#UserOnLine').html(`Usuario: &nbsp; ${name}`);

    }
}


for (let index = 0; index < 4; index++) {
    var num = getNumRand(0, 54);   
    if(!tarjeton.includes( num )){  
        tarjeton.push( num );
    }else{
        index --;
    }
}

$( "#img_1" ).attr("src","../img/loteria/"+tarjeton[0]+".png"); 
$( "#img_2" ).attr("src","../img/loteria/"+tarjeton[1]+".png"); 
$( "#img_3" ).attr("src","../img/loteria/"+tarjeton[2]+".png"); 
$( "#img_4" ).attr("src","../img/loteria/"+tarjeton[3]+".png"); 

$("#img_1").data("card-value",tarjeton[0]);
$("#img_2").data("card-value",tarjeton[1]);
$("#img_3").data("card-value",tarjeton[2]);
$("#img_4").data("card-value",tarjeton[3]);



function gritarLoteria(tarjeton, user){    
    Swal.fire({
        icon: 'success',
        title: 'Debes gritar loteria...',
        confirmButtonText: 'GRITAR LOTERIA!',        
        preConfirm: () => {     
            confirmarWin(tarjeton, user);
        }
      })
}

function confirmarWin(tarjeton, user) {
    Swal.fire(`Los datos enviados son de ${user} y las tarejtas enviadas son ${tarjeton}`);
    db.ref('loteria/win').set({
        tablero: tarjeton,
        user: user,
        win: true                
    });
}

var UserWinDB = db.ref('loteria/win');
UserWinDB.on('value', function(snapshot) {
    
    var tablero = snapshot.val().tablero;
    var user = snapshot.val().user;
    var win = snapshot.val().win;

    if(win === true){
        let timerInterval
        Swal.fire({
        title: `${user} Grito LOTERIA!`,
        html: 'Estamos comprobando el tarjeton; <br> resultados en: <b></br> milliseconds.',
        timer: 9000,
        timerProgressBar: true,
        allowEscapeKey:false,
        allowEnterKey:false,
        allowOutsideClick:false,
        onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
                const b = content.querySelector('b')
                if (b) {
                b.textContent = Swal.getTimerLeft()
                }
            }
            }, 100)
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {

                var ValidateWinner = db.ref('loteria/RespondValidateWin');
                ValidateWinner.on('value', function(snapshot) {
                    var CardsNoFound = snapshot.val().CardsNoFound;
                    var mesage = snapshot.val().mesage;
                    var user = snapshot.val().user;
                    var win = snapshot.val().win; 

                    var UserLogin = JSON.parse(localStorage.getItem('LoteriaUser'));
                    
                    if(win === false){
                        if((UserLogin[0].user) == user){     
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                width: 900,
                                html: `${user} ${mesage} <br>` + `${VerCardSend(CardsNoFound)}`,
                                preConfirm: () => {                                      
                                    var Mitablero = [
                                        $("#img_1").data("card-value"),
                                        $("#img_2").data("card-value"),
                                        $("#img_3").data("card-value"),
                                        $("#img_4").data("card-value")
                                    ];
                                    var IdRutaImg = 0;                                    
                                    Mitablero.forEach(item => {
                                        IdRutaImg ++;                                        
                                        if(CardsNoFound.includes(item)){
                                            cuentaCards --;
                                            $("#img_"+IdRutaImg).removeClass('select-img');
                                            $('#NumCards').html(`${cuentaCards} of 4 `);
                                        }
                                    });
                                   


                                }                   
                            }) ;       
                                                        
                        }
                        else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Aún Sigue el juego...!',
                                width: 900,
                                html: `${user} aún no ha ganado; ${mesage} <br>`                   
                            }) ; 
                        }
                    }
                    else{

                        Swal.fire({
                            title: 'HAY GANADOR...!',
                            html: `Felicita a ${user} por ganar esta partida`,
                            width: 600,
                            padding: '3em',
                            background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
                            backdrop: `
                              rgba(0,0,123,0.4)
                              url("https://sweetalert2.github.io/images/nyan-cat.gif")
                              left top
                              no-repeat
                            `
                          }).then((result) => {
                            if (result.value) {
                              Swal.fire(
                                'info!',
                                'Espere a que el administrador genere un nuevo juego',
                                'success'
                              )
                            }
                          });

                          $("#img_1").prop("onclick", null).off("click");
                          $("#img_2").prop("onclick", null).off("click");
                          $("#img_3").prop("onclick", null).off("click");
                          $("#img_4").prop("onclick", null).off("click");                            


                    }

                    


                })


            }
        })
    }
});



function selectCar(id){   
    let datosUser = JSON.parse(localStorage.getItem('LoteriaUser'));
    user = datosUser[0]['user'];   

    if($(id).hasClass("select-img")){
        $(id).removeClass('select-img');
        cuentaCards --;
        $('#NumCards').html(`${cuentaCards} of 4 `);
    }else{
        $(id).addClass('select-img');
        cuentaCards ++;
        $('#NumCards').html(`${cuentaCards} of 4 `);
        if(cuentaCards == 4){
            gritarLoteria(tarjeton, user);
            console.log("LOTERIA");
        };
    }  
    DataUser = [
        {
            name: 'LoteriaUser',
            user: user,
            tarjeton: tarjeton,
            cuentaCards: cuentaCards                    
        }
    ];  
    localStorage.setItem('LoteriaUser',JSON.stringify(DataUser));
    
}

$('#NewCards').click(function(){
    location.reload();
})

$('#modoJoin').click(function() {   

    if($('body').hasClass("bg-light")){
        $('body').removeClass("bg-light text-black").addClass("bg-dark text-white");
        $('#NumCards').removeClass('btn-warning').addClass('bg-light');
        $('#ContTarjetaRand').removeClass('bg-light').addClass('bg-dark');

        $('#modoJoin').html("VER MODO CLARO");
    }else{
        $('body').removeClass("bg-dark text-white").addClass("bg-light text-black");        
        $('#NumCards').removeClass('bg-light').addClass('btn-warning');
        $('#ContTarjetaRand').removeClass('bg-dark').addClass('bg-light');
        

        $('#modoJoin').html("VER MODO OSCURO");

    } 

});

function resetWinner(tarjeton, user){
    firebase.database().ref('loteria/win').set({
        win: false,
        user: user,
        tablero : tarjeton
    });
}


var cardCountgenerated = db.ref('loteria/generator');
cardCountgenerated.on('value', function(snapshot) {
    var CardGenertaed = snapshot.val().CardGenerated;
    var RouteInage = snapshot.val().RoutImage;
    
    $('#recivedImage').attr("src",RouteInage)
    if(CardGenertaed == 0){
        Swal.fire({
            icon: 'success',
            title: 'Nuevo juego...',
            text: 'El administrador aún no ha comenzado el juego!'            
        });
        setTimeout(ValidarUsuario(tarjeton,cuentaCards),1400);
        let datosUser = JSON.parse(localStorage.getItem('LoteriaUser'));
                 
        if(datosUser != null){
            user = datosUser[0]['user'];
            NumCards = datosUser[0]['cuentaCards'];
            
            if(NumCards > 0 ){
                setTimeout(location.reload(),1400);
            }     
            resetWinner(tarjeton, user); 
            $('#UserOnLine').html(`Usuario: &nbsp; ${user}`);
        }
       
        
        
    }
    else{  
        var NumCards =  snapshot.val().HistoryCard;     
        $('#NoCardGen').html(`${NumCards.length} of 54`);

        if(NumCards.length == 54) {
            window.setTimeout(function(){
                $('#recivedImage').attr("src","../img/loteria/null.png");
                $("html, body").animate({
                    scrollTop:$("body").offset().top
                }, 700); 
                $(".audio2")[0].play();
                Toast.fire({
                    icon: 'success',
                    title: 'Se terminaron las cartas'
                })
            }, 5000);            
        }

        $("html, body").animate({
            scrollTop:$("body").offset().top
        }, 700); 
        $(".audio")[0].play();
        Toast.fire({
            icon: 'success',
            title: 'Hay una nueva carta'
        })

            
        
            
            
        
        
    }

  //recivedImage
});



