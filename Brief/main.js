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