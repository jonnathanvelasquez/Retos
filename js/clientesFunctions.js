let URL_SERVICE= "https://gbe747cb57d24af-bdinstanciaapexg6.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/open-api-catalog/car/"

function addclient() 
{
    let mydata= { id: $("#id").val() ,
            brand: $("#name").val() , 
            model: $("#email").val() , 
            category_id: $("#age").val(),
           };
   
   let mydatatosend = JSON.stringify(mydata);

  $.ajax(
   {
       url: URL_SERVICE,
       type: "POST" ,
       data: mydatatosend,
       contentType:"application/JSON",
       success:function(respuesta){
           alert("Si ha guardado");
           clearScreen();
       },
       error: function(XMLHttpRequest, textStatus, errorThrown){
           alert("Status: " + textStatus); alert("Error: " + errorThrown); 
       }
   }
  );
}

function listclient(){

   $.ajax(
       {
           url: URL_SERVICE,
           type: "GET" ,
           datatype:"JSON",
           success:function(respuesta){
               clearScreen();
               drawTable(respuesta.items);
           },
           error: function(XMLHttpRequest,textStatus,errorThrown){
               alert("Status:" + textStatus); alert("Error" + errorThrown);
           }
       }
      );

}


function drawTable(items){
   let myTable = "<table border=1>"
       myTable = myTable + "<thead>"

       myTable = myTable + "<td>" + "id"          +   "</td>"
       myTable = myTable + "<td>" + "name"       +   "</td>"
       myTable = myTable + "<td>" + "email"       +   "</td>"
       myTable = myTable + "<td>" + "age"  +   "</td>"
       myTable = myTable + "<td>" + "Opciones"  +   "</td>"
       myTable = myTable + "</thead>"

   for (cnt=0 ; cnt< items.length; cnt++){
       myTable = myTable + "<tr>"

       myTable = myTable + "<td>" + items[cnt].id            +   "</td>"
       myTable = myTable + "<td>" + items[cnt].name          +   "</td>"
       myTable = myTable + "<td>" + items[cnt].email         +   "</td>"
       myTable = myTable + "<td>" + items[cnt].age           +   "</td>"
       myTable+="<td> <button onclick='delclient("+items[cnt].id+")'>Borrar</button>";
       myTable+="<td> <button onclick='getOneClient("+items[cnt].id+")'>Editar</button>";        
       myTable = myTable + "</tr>"

   }

   myTable = myTable + "</table>"
   $("#resultado").append(myTable);


}

function clearScreen(){
 
   $("#id").val("") ;
   $("#name").val("") ;
   $("#email").val("") ; 
   $("#age").val("");
   $("#resultado").empty();
}

function updclient(){
   
   mydata= { id: $("#id").val() ,
            brand: $("#name").val() , 
            model: $("#email").val() , 
            category_id: $("#age").val(),
           };


    let  mydatatosend= JSON.stringify(mydata);        

  $.ajax(
   {
       url: URL_SERVICE,
       type: "PUT" ,
       data: mydatatosend, 
       contentType:"application/JSON",
       success:function(respuesta){
           alert("Si ha modificado");
           clearScreen();
       },
       error: function(XMLHttpRequest, textStatus, errorThrown){
           alert("Status:" + textStatus); alert("Error" + errorThrown);
       }
   }
  );

}

function delclient(idaBorrar){

    let  mydata= { id: idaBorrar};

   let  mydatatosend= JSON.stringify(mydata);
   
  $.ajax(
   {
       url: URL_SERVICE,
       type: "DELETE" ,
       data: mydatatosend,
       contentType:"application/JSON",
       success:function(respuesta){
           alert("Si ha Eliminado");
       },
       error: function(XMLHttpRequest,textStatus,errorThrown){
           alert("Status:" + textStatus); alert("Error" + errorThrown);
       }
   }
  );
}

function getOneClient(idaConsultar){
   
   $.ajax(
       {
           url: URL_SERVICE + "/" + idaConsultar,
           type: "GET" ,
           datatype:"JSON",
           success:function(respuesta){
               screentoModify(respuesta.items);
           },
           error: function(XMLHttpRequest,textStatus,errorThrown){
               alert("Status:" + textStatus); alert("Error" + errorThrown);
           }
       }
      );

}

function screentoModify(items) {
   $("#id").val(items[0].id) ;
   $("#name").val(items[0].name) ;
   $("#email").val(items[0].email) ; 
   $("#age").val(items[0].age);
} 