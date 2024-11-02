const tasklist = [];
const taskcountelement = document.getElementById('taskcount');
const formul = document.getElementById('formul');
const openlistbutton = document.getElementById('openlist');
const closelistbutton = document.getElementById('closelist');
const taskform = document.getElementById('taskform');
const searchbar = document.getElementById('searchbar');

let currentEditIndex = null;

openlistbutton.addEventListener('click',() =>{
    formul.classList.remove('hidden');
    clearForm();
});

closelistbutton.addEventListener('click',() =>{
    formul.classList.add('hidden');
    clearForm();
});

taskform.addEventListener('submit',(e) =>{
    e.preventDefault();

    const title = document.getElementById('tasktitle').value;
    const description = document.getElementById('taskdescription').value;
    const duedate = document.getElementById('taskdate').value;
    const priority = document.getElementById('taskpriority').value;
    const status = document.getElementById('taskstatus').value;

    // verifier la date choisie par utilisateur
    const today = new Date();
    const selectedDate = new Date(duedate);

    if (selectedDate < today) {
        alert("The due date can't be a past date");
        return;
    }
    const task ={ title, description, duedate, priority, status};

    if (currentEditIndex !== null){
        tasklist[currentEditIndex]=task;
        currentEditIndex = null;
    } else {
        tasklist.push(task)
    }
    updateTasklists();
    updateStats();
    closelistbutton.click();

});

// ajoutement de la bar de recherche
searchbar.addEventListener('input',() => {
    updateTasklists();
}) ;

function updateTasklists(){
    const todoListElement = document.getElementById('todolist');
    const doingListElement = document.getElementById('doinglist');
    const doneListElement = document.getElementById('donelist');

    todoListElement.innerHTML = '';
    doingListElement.innerHTML = '';
    doneListElement.innerHTML = '';

    const searchTit = searchbar.value.toLowerCase();
    const filteredtasks = tasklist.filter(task => task.title.toLowerCase().includes(searchTit));

    const sortedtasks = filteredtasks.sort((a,b) => {
        const priorityOrder = {'P1':1, 'P2':2, 'P3':3};
        return priorityOrder[a.priority] - priority[b.priority];
    });

    sortedtasks.forEach((task, index) => {
        const taskElement = Document.createElement('div');
    })
}