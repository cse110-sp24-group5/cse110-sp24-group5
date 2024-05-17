window.addEventListener('DOMContentLoaded', init);

function init() {
    const tasks = getTasksFromStorage();
    addTasksToList(tasks);
    const addNewTaskButton = document.querySelector('#add');
    addNewTaskButton.addEventListener('click', addNewTask);
    const closePopUpButton = document.querySelector('#closePopUp')
    closePopUpButton.addEventListener('click', togglePopUp);
}

function togglePopUp() {
    let popUp = document.querySelector('.pop-up.parent');
    popUp.classList.toggle('hidden');
}

function addNewTask() {
    togglePopUp();
    const confirmButton = document.querySelector('#confirm');
    confirmButton.addEventListener('click', createNewTask);
}

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
    const tasks = localStorage.getItem('tasks');
    if(tasks === null)
        return []
    return JSON.parse(tasks);
}

//FIX
function addTasksToList(tasks) {
    let tasks1 = getTasksFromStorage();
    for(let i = 0; i < tasks1.length; i++) {
        const titleText = tasks1[i].titleText;
        const descText = tasks1[i].descText;

        let taskList = document.querySelector('.task-list-ul');

        let emptyTask = document.createElement('li')

        taskList.append(emptyTask);

        let tasks = document.querySelectorAll('li');

        let newTask = tasks[tasks.length - 1];

        let taskObjList = getTasksFromStorage();
        newTask.innerHTML =   `<div class="placeholder-task">
                                <h3 id="task">${titleText}</h3>
                                <button id ="edit" type="submit">
                                    <img src="../img/edit_task.png">
                                </button>
                                <button id="delete" type="submit">
                                    <img src="../img/delete_task.png">
                                </button>
                            </div>
                            <p>${descText}</p>`;

                        let deleteButton1 = newTask.querySelector('#delete');
                        deleteButton1.addEventListener('click', () => {
                            saveTasksToStorage(taskObjList.filter((e) => { e !== tasks1[i];}));
                            newTask.remove();
                        });

                        const editButton = newTask.querySelector('#edit');
                        let task = newTask;
                        editButton.addEventListener('click', () => {
                        togglePopUp();
                        const confirmButton = document.querySelector('#confirm');
                        confirmButton.addEventListener('click', editExistingTask);
                        function editExistingTask() {
                        confirmButton.removeEventListener('click', editExistingTask);
                        const titleText = document.querySelector('#titleText');
                        const descText = document.querySelector('#descText');
                        let desc = task.querySelector('p');
                        desc.innerHTML = descText.value;
                        let title = task.querySelector('#task');
                        title.innerHTML = titleText.value;

                        newTaskObj.titleText = titleText;
                        newTaskObj.descText = descText;         
                        saveTasksToStorage(taskObjList);

                        togglePopUp();
                        }
                        });
    }
}

function createNewTask() {
    const confirmButton = document.querySelector('#confirm');
    confirmButton.removeEventListener('click', createNewTask);
    const titleText = document.querySelector('#titleText');
    const descText = document.querySelector('#descText');
    let taskList = document.querySelector('.task-list-ul');
    let emptyTask = document.createElement('li')
    taskList.append(emptyTask);
    let tasks = document.querySelectorAll('li');
    let newTask = tasks[tasks.length - 1];

    let taskObjList = getTasksFromStorage();
    let newTaskObj = {"id": Math.floor(Math.random() * 450000), "titleText": titleText.value, "descText": descText.value};
    taskObjList.push(newTaskObj);

    newTask.innerHTML =    `<div class="placeholder-task">
                                <h3 id="task">${titleText.value}</h3>
                                <button id ="edit" type="submit">
                                    <img src="../img/edit_task.png">
                                </button>
                                <button id="delete" type="submit">
                                    <img src="../img/delete_task.png">
                                </button>
                            </div>
                            <p>${descText.value}</p>`;
    saveTasksToStorage(taskObjList);
    const deleteButton = newTask.querySelector('#delete');
    deleteButton.addEventListener('click', () => {
        newTask.remove();
        taskObjList = taskObjList.filter(taskObj => taskObj != newTaskObj);
        saveTasksToStorage(taskObjList);
    });
    const editButton = newTask.querySelector('#edit');
    let task = newTask;
    editButton.addEventListener('click', () => {
        togglePopUp();
        const confirmButton = document.querySelector('#confirm');
        confirmButton.addEventListener('click', editExistingTask);
        function editExistingTask() {
            confirmButton.removeEventListener('click', editExistingTask);
            const titleText = document.querySelector('#titleText');
            const descText = document.querySelector('#descText');
            let desc = task.querySelector('p');
            desc.innerHTML = descText.value;
            let title = task.querySelector('#task');
            title.innerHTML = titleText.value;

            newTaskObj.titleText = titleText;
            newTaskObj.descText = descText;         
            saveTasksToStorage(taskObjList);

            togglePopUp();
        }
    });
    togglePopUp();
}