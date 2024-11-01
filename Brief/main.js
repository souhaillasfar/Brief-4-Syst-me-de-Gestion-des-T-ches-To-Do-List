// hidden add task
let button = document.getElementById('addtask');
let section= document.getElementById('section');

button.addEventListener('click',function(){
    if(section.style.display === 'none'){
        section.style.display = 'block';
    }else{
        section.style.display = 'none';
    }
})

let btn = document.getElementById('btn');
let text = document.getElementById('text');
let description = document.getElementById('description');
let date = document.getElementById('date');
let priority = document.getElementById('priority');
let todo = document.querySelectorAll('.box');
let progres = document.querySelectorAll('.box1');
let Done = document.querySelectorAll('.box2');
let div = document.getElementById("div");

btn.onclick = function(e){
    const status = document.getElementById('status');

    e.preventDefault();

     if (status.value == "to do" ) {
        if(text.value != '' && description.value != '' && date.value != '' && priority.value != ''){
            todo[0].innerHTML += `
                <div class="border-2 border-black p-3 mt-4" id="div">
       <h2>${text.value}</h2>
       <p>${description.value}</p>
       <p>${priority.value}</p>
       <p>${date.value}</p>
      
       
        <button type="button"  onclick="this.parentElement.remove()"  class=" bg-red-700 hover:bg-red-500 text-white pl-1 pr-1  rounded-lg" >Delete</button>
        <button  class="bg-transparent hover:bg-blue-500 text-blue-700 font-mono hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded">Edit</button>
      </div>
             `
        text.value = '' 
        description.value = ''
        date.value = ''
        priority.value = ''
        
    };

     }
     else if (status.value == "in progress"){

        if(text.value != '' && description.value != '' && date.value != '' && priority.value != ''){
            progres[0].innerHTML += `
                <div class="border-2 border-black p-3 mt-4" id="div">
       <h2>${text.value}</h2>
       <p>${description.value}</p>
       <p>${priority.value}</p>
       <p>${date.value}</p>
      
       
        <button type="button"  onclick="this.parentElement.remove()"  class="bg-red-700 hover:bg-red-500 text-white pl-1 pr-1  rounded-lg" >Delete</button>
        <button  class="bg-transparent hover:bg-blue-500 text-blue-700 font-mono hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded">Edit</button>
      </div>
             `
        text.value = '' 
        description.value = ''
        date.value = ''
        priority.value = ''
        
    };

     } 
     else if (status.value == "done"){
     if(text.value != '' && description.value != '' && date.value != '' && priority.value != ''){
            Done[0].innerHTML += `
                <div class="border-2 border-black p-3 mt-4" id="div">
       <h2>${text.value}</h2>
       <p>${description.value}</p>
       <p>${priority.value}</p>
       <p>${date.value}</p>
      
       
        <button type="button"  onclick="this.parentElement.remove()"  class="bg-red-700 hover:bg-red-500 text-white pl-1 pr-1  rounded-lg delete" >Delete</button>
        <button  class="bg-transparent hover:bg-blue-500 text-blue-700 font-mono hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded">Edit</button>
      </div>
             `
        text.value = '' 
        description.value = ''
        date.value = ''
        priority.value = ''
        
    };
     }
     

}