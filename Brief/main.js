const taskList = [];
const taskCountElement = document.getElementById('taskCount');
const modal = document.getElementById('modal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const taskForm = document.getElementById('taskForm');
const searchBar = document.getElementById('searchBar');

let currentEditIndex = null;

openModalButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
    clearForm();
});

closeModalButton.addEventListener('click', () => {
    modal.classList.add('hidden');
    clearForm();
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const priority = document.getElementById('taskPriority').value;
    const status = document.getElementById('taskStatus').value;

    // Vérification de la date d'échéance
    const today = new Date();
    const selectedDate = new Date(dueDate);

    if (selectedDate < today) {
        alert("La date d'échéance ne peut pas être une date passée.");
        return;
    }

    const task = { title, description, dueDate, priority, status };

    if (currentEditIndex !== null) {
        taskList[currentEditIndex] = task;
        currentEditIndex = null;
    } else {
        taskList.push(task);
    }

    updateTaskLists();
    updateStats();
    closeModalButton.click();
});

// Événement de recherche
searchBar.addEventListener('input', () => {
    updateTaskLists();
});

function updateTaskLists() {
    const toDoListElement = document.getElementById('toDoList');
    const doingListElement = document.getElementById('doingList');
    const doneListElement = document.getElementById('doneList');

    toDoListElement.innerHTML = '';
    doingListElement.innerHTML = '';
    doneListElement.innerHTML = '';

    const searchTerm = searchBar.value.toLowerCase();
    const filteredTasks = taskList.filter(task => task.title.toLowerCase().includes(searchTerm));

    const sortedTasks = filteredTasks.sort((a, b) => {
        const priorityOrder = { 'P1': 1, 'P2': 2, 'P3': 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    sortedTasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        const priorityColor = task.priority === 'P1' ? 'bg-red-500' : task.priority === 'P2' ? 'bg-yellow-500' : 'bg-green-500';
        taskElement.className = `${priorityColor} text-white rounded-lg p-4 shadow mb-2 transition transform hover:scale-105`;
        taskElement.innerHTML = `
            <h3 class="font-bold text-lg">${task.title}</h3>
            <p class="text-white">${task.description}</p>
            <p class="text-white">Échéance: ${task.dueDate}</p>
            <p class="text-white font-bold">Priorité: ${task.priority}</p>
            <div class="mt-2">
                <button class="bg-teal-500 px-2 py-1 rounded" onclick="editTask(${index})">Edit</button>
                <button class="bg-blue-500 px-2 py-1 rounded" onclick="changeStatus(${index})">Change Status</button>
                <button class="bg-red-700 px-2 py-1 rounded" onclick="deleteTask(${index})">delete</button>
            </div>
        `;

        if (task.status === 'to do') {
            toDoListElement.appendChild(taskElement);
        } else if (task.status === 'doing') {
            doingListElement.appendChild(taskElement);
        } else {
            doneListElement.appendChild(taskElement);
        }
    });

    updateTaskCounts();
}

function updateTaskCounts() {
    const toDoCount = taskList.filter(task => task.status === 'to do').length;
    const doingCount = taskList.filter(task => task.status === 'doing').length;
    const doneCount = taskList.filter(task => task.status === 'done').length;

    document.getElementById('toDoCount').innerText = `(${toDoCount})`;
    document.getElementById('doingCount').innerText = `(${doingCount})`;
    document.getElementById('doneCount').innerText = `(${doneCount})`;
    taskCountElement.innerText = toDoCount + doingCount + doneCount;
}

function clearForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskDueDate').value = '';
    document.getElementById('taskPriority').value = 'P1';
    document.getElementById('taskStatus').value = 'to do';
}

function editTask(index) {
    const task = taskList[index];
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('taskDueDate').value = task.dueDate;
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('taskStatus').value = task.status; // Récupère le status

    currentEditIndex = index;
    openModalButton.click();
}

function changeStatus(index) {
    if (taskList[index].status === 'to do') {
        taskList[index].status = 'doing';
    } else if (taskList[index].status === 'doing') {
        taskList[index].status = 'done';
    } else {
        taskList[index].status = 'to do';
    }

    updateTaskLists();
    updateStats();
}

function deleteTask(index) {
    if (confirm("Are you sure ?!!!")) {
        taskList.splice(index, 1);
        updateTaskLists();
        updateStats();
    }
}

function updateStats() {
    updateTaskCounts();
}
