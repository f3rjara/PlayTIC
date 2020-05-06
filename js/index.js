var firebaseConfig = {
    apiKey: "AIzaSyCNLQBq6YR1soU-kCqJdzZwtMih9-Nqj1g",
    authDomain: "herramientic-aabaf.firebaseapp.com",
    databaseURL: "https://herramientic-aabaf.firebaseio.com/",
    projectId: "herramientic-aabaf",
    storageBucket: "herramientic-aabaf.appspot.com",
    messagingSenderId: "620237486592",
    appId: "1:620237486592:web:deea947c70dcfe2aabb6e5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


document.querySelector("#VerActividades").addEventListener('click', MostrarDatos);
document.querySelector("#RandActividad").addEventListener('click', RandAct);

let id = 0;

function ControlarId(){   
    let IdMayor = [];
    var mayor = 0;

    var tareas = firebase.database().ref("task/");
    tareas.on("child_added", function(data){     
        var taskValue = data.val();   
        IdMayor.push(taskValue.id);
         
        for(i = 0; i < IdMayor.length; i++){
            if (IdMayor[i] > mayor)   { mayor = IdMayor[i];}
        }        
        id = mayor + 1;
    });  
   

}

function MostrarDatos(){  
    let res  = document.querySelector("#res_json");
    res.innerHTML = "";
    let contador = 0;            
    var tareas = firebase.database().ref("task/");
    tareas.on("child_added", function(data){
        var taskValue = data.val();       
        contador ++;
        res.innerHTML += `
            <tr>
                <th scope="row">${contador}</th>
                <td>${taskValue.actividad}</td>
                <td>${taskValue.tiempo} Min.</td>
                <td><i class="text-primary fas fa-edit size-fa" onclick="editTask(${taskValue.id})"></i></td>
                <td><i class="text-danger fas fa-trash-alt size-fa" onclick="deleteTask(${taskValue.id})"></i></td>
            </tr>
        `;  
    });           
}


$(document).ready(function() {
    MostrarDatos();
    ControlarId();
});

function RandAct(){  
    let actRand  = document.querySelector("#actRand");
    let timeRand  = document.querySelector("#timeRand");
    actRand.innerHTML = "";          
    timeRand.innerHTML = "";  

    let ActividadRand = [];

    if(id > 0){
        

        var tareas = firebase.database().ref("task/");        
        tareas.on("child_added", function(data){         
           taskValue = data.val();           
           ActividadRand.push({
               id:taskValue.id,
               actividad:taskValue.actividad,
               tiempo: taskValue.tiempo
            });
            
           tareaRand = parseInt(getNumRand(0, ActividadRand.length));
           console.log();
           
            actRand.innerHTML = ActividadRand[tareaRand].actividad;          
            timeRand.innerHTML = ActividadRand[tareaRand].tiempo+ ' Minutos';                 
            
            Toast.fire({
                icon: 'success',
                title: 'Se genero la actividad aleatoria'
                });
           
        });   

        

    }
    else{
        actRand.innerHTML = ' - ';          
        timeRand.innerHTML = '- Minutos'; 

        Toast.fire({
            icon: 'error',
            title: 'No hay actividades guardadas'
            });
    }
           
   
}

function arrayJSON(id,actividad, tiempo){
    var data = {
        id: id,
        actividad: actividad,
        tiempo: tiempo
    }

    return data;
}

function editTask(id_send){
    $('#ModalEdit').modal('show');

    $('#id_actividad-text').val("");
    $('#edit_actividad-text').val("");
    $('#edit_time-act').val("");

    var tareas = firebase.database().ref("task/");        
    tareas.on("child_added", function(data){         
        taskValue = data.val();              
        if(taskValue.id == id_send){
            $('#edit_id-act').val(parseInt(taskValue.id));
            $('#edit_actividad-text').val(taskValue.actividad);  
            $('#edit_time-act').val(parseInt(taskValue.tiempo)); 

       }  
    });   

}

function deleteTask(id_send){    
    var tareas = firebase.database().ref("task/"+id_send);       
    tareas.remove();

    Toast.fire({
        icon: 'warning',
        title: 'La actividad fue eliminada con exito'
    });
    MostrarDatos();
    ControlarId();
}

$("#Form_Edit_Activity").bind("submit",function(){
    event.preventDefault();   

    var idac = $('#edit_id-act').val();
    var activty = $('#edit_actividad-text').val();
    var time = $('#edit_time-act').val();     
    
    var ArrayData =  arrayJSON(idac, activty, time);  

    var Tareas = firebase.database().ref("task/" + idac);
    Tareas.set(ArrayData);
    
    $('#id_actividad-text').val("");
    $('#edit_actividad-text').val("");
    $('#edit_time-act').val("");
    $('#ModalEdit').modal('hide');

    Toast.fire({
        icon: 'warning',
        title: 'La actividad fue actualizada con exito'
    });
    MostrarDatos();
    ControlarId();
});

$("#Form_New_Activity").bind("submit",function(){
    event.preventDefault();   

    var activty = $('#actividad-text').val();
    var time = $('#time-act').val();     
    
    
    var ArrayData =  arrayJSON(parseInt(id), activty, time);  
    var Tareas = firebase.database().ref("task/" + id);
    Tareas.set(ArrayData);


    $('#actividad-text').val("");
    $('#time-act').val("");
    $('#ModalAdd').modal('hide');

    Toast.fire({
        icon: 'success',
        title: 'La actividad fue guardada'
    });
    MostrarDatos();
    ControlarId();
});
