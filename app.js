const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskinput = document.querySelector('#task');

loadEventListeners();

//load eventListeners
function loadEventListeners() {
    //event listner for localstorage
    document.addEventListener('DOMContentLoaded',getTasksFromLS);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeItem);
    //clear all task event
    clearBtn.addEventListener('click', clearTasks);
    //filter task event
    filter.addEventListener('keyup', filterTasks);
}

//add task
function addTask(e) {
    console.log(taskList);
    e.preventDefault();
    if (taskinput.value === '') {
        alert('Add a task');
    }
    getTasksFromLS
    //create a li item
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node
    li.appendChild(document.createTextNode(taskinput.value));
    //create a new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //append the link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);

    //store data in localstorage
    storeTasksInLS(taskinput.value)
    taskinput.value = '';
}

//remove a single task
function removeItem(e) {
    console.log(e.target);
    if (e.target.parentElement.classList.contains('delete-item')) {
        console.log(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();
    }

    removeTaskFromLS(e.target.parentElement.parentElement);
}

//remove all tasks
function clearTasks() {
    //taskList.innerhtml = ' '

    //faster way
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLS();
}

//filter the task based on search
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    //this returns a node list , so we can use foreach
    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}

//store tasks in localstorage
function storeTasksInLS(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//get tasks from localstorage
function getTasksFromLS() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        //create a li item
        const li = document.createElement('li');
        li.className = 'collection-item';
        //create text node
        li.appendChild(document.createTextNode(task));
        //create a new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>'
        //append the link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
    })
}

//remove tasks from localstorage
function removeTaskFromLS(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
       if(taskItem.textContent === task){
           tasks.splice(index,1);
       }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear all tasks from localstorage
function clearTasksFromLS(){
    localStorage.clear();
}