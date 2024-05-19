window.addEventListener('DOMContentLoaded', init);

/**
 * initializes the page by setting up event listeners for all the dates, and 
 * sets up event listeners for moving between months
 */
function init() {
    const days = document.querySelectorAll('.days li');
    //set up event listeners for all the dates so that when a date is clicked, the date's associated task list pops up
    for(let day of days)
        day.addEventListener('click', refreshTaskList);
    //Since days are created dynamically whenever the month changes, this function needs to be re-triggered whenever the month is changed. Otherwise, ...
    //... the newly created dates won't have event listeners attached to them
    const prevMonthButton = document.querySelector('.prev-month');
    const nextMonthButton = document.querySelector('.next-month');
    prevMonthButton.addEventListener('click', init);
    nextMonthButton.addEventListener('click', init);
}

/**
 * Populates the task list with tasks from the selected date
 * and sets up an event listener for the add task button
 */
function refreshTaskList() {
    addTasksToPage();
    addButton = document.querySelector('#add');
    //Remove any previous event listeners for the add task button
    addButton.removeEventListener('click', addTaskButton);
    addButton.addEventListener('click', addTaskButton);
}

/**
 * Removes previously created tasks (they may belong to a different date) 
 * and populates the task list with the selected date's tasks
 */
function addTasksToPage() {
    //get previously created tasks
    const createdTasks = document.querySelectorAll('.task-list-ul li');
    //loop through previously created tasks and remove them
    for(let task of createdTasks)
        task.remove();
    //get the selected date's tasks
    const taskObjs = getTasksFromStorage();
    //populate the task list with the selected date's tasks
    for(const taskObj of taskObjs)
        createTask(taskObj);
}

/**
 * Returns an array of task objects for the specified date
 * @returns {Array<Object>} An array of task objects for the specfied date
 */
function getTasksFromStorage() {
    //get the date selected on the calendar
    const date = document.getElementById('date').textContent;
    //get an object containing all tasks from localStorage
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    //return an array containing all tasks for a specified day
    return (allTasks[`${date}`] || []);
}


/**
 * Creates a task by creating the task's associated HTML and adding the 
 * task's associated task object to the task object array in localStorage. The function pulls the 
 * new task's data from taskObj, the task object passed to the function. Additionally, the function 
 * creates the event listeners for the buttons associated with the task (i.e. the function creates an 
 * event listener for the edit button and the delete button).
 * @param {Object} taskObj task object associated with a task that needs to be created
 */
function createTask(taskObj) {
    let taskList = document.querySelector('.task-list-ul');
    let newTask = document.createElement('li');
    newTask.innerHTML =    `<div class="placeholder-task">
                                <h3 id="task">${taskObj.title}</h3>
                                <button id ="edit" type="submit">
                                    <img src="../img/edit_task.png">
                                </button>
                                <button id="delete" type="submit">
                                    <img src="../img/delete_task.png">
                                </button>
                            </div>
                            <p>${taskObj.desc}</p>`;
    taskList.append(newTask);
    let editButton = newTask.querySelector('#edit');
    editButton.addEventListener('click', () => {editTaskButton(newTask, taskObj);});
    let deleteButton = newTask.querySelector('#delete');
    deleteButton.addEventListener('click', () => {deleteTaskButton(newTask, taskObj);});
}

/**
 * Opens the pop up for editing a task and sets up the pop up's associated 
 * event listeners (i.e. an event listener for the confirm button and 
 * an event listener for the x button). 
 * @param {HTMLElement} task HTMLElement of the task that may be updated
 * @param {Object} taskObj task object associated with the task that may be updated
 */
function editTaskButton(task, taskObj) {
    openPopUp();
    const confirmButton = document.querySelector('#confirm');
    /*If the confirm button is pressed, get the data from the pop up's form. Use this
    data to edit the specified task (i.e. update the task in the array of tasks in 
    localStorage and update the task on the page) and then close the pop up*/
    confirmButton.addEventListener('click', () => {
        updateTask(task, taskObj);
        closePopUp();
    }, {once: true});
    const closePopUpButton = document.querySelector('#closePopUp');
    //If the x button is pressed, close the pop up
    closePopUpButton.addEventListener('click', () => {closePopUp();}, {once: true});
}

/**
 * Updates a task by updating the task's associated HTML and updating the 
 * task's associated task object in localStorage. The function pulls the 
 * task's new data from the pop up editing form "confirmed" by the user.
 * @param {HTMLElement} task HTMLElement of the task that needs to be updated
 * @param {Object} taskObj task object associated with the task that needs to be updated
 */
function updateTask(task, taskObj) {
    let updatedTaskObj = getFormData();
    updatedTaskObj.id = taskObj.id;
    updateTaskInStorage(updatedTaskObj);
    let taskTitle = task.querySelector('#task');
    let taskDesc = task.querySelector('p');
    taskTitle.innerHTML = updatedTaskObj.title;
    taskDesc.innerHTML = updatedTaskObj.desc;
}

/**
 * Updates a specifed task object's assciated task object in localStorage. 
 * In other words, if a task is edited, the task object in localStorage representing that task 
 * is updated via this function.
 * @param {Object} taskObj A task object that needs to have its 
 * associated task object in localStorage updated
 */
function updateTaskInStorage(taskObj) {
    let taskObjs = getTasksFromStorage();
    for(let el of taskObjs) {
        if(el.id === taskObj.id) {
            el.title = taskObj.title;
            el.desc = taskObj.desc;
        }
    }
    saveTasksToStorage(taskObjs);
}

/**
 * Opens the pop up for adding a task and sets up the pop up's associated 
 * event listeners (i.e. an event listener for the confirm button and 
 * an event listener for the x button). 
 */
function addTaskButton() {
    openPopUp();
    const confirmButton = document.querySelector('#confirm');
    /*If the confirm button is pressed, get the data from the pop up's form. Use this
    data to create a new task (i.e. add the task to the array of tasks in 
    localStorage and create the task on the page) and then close the pop up*/
    confirmButton.addEventListener('click', () => {
        const taskObj = getFormData();
        createTask(taskObj);
        addTaskToStorage(taskObj);
        closePopUp();
    }, {once: true});
    const closePopUpButton = document.querySelector('#closePopUp');
    //If the x button is pressed, close the pop up
    closePopUpButton.addEventListener('click', () => {closePopUp();}, {once: true});
}

/**
 * Toggles the pop up form for creating/editing a task on and off 
 * ("on" being visible and "off" being invisible)
 */
function togglePopUp() {
    let popUp = document.querySelector('.pop-up.parent');
    popUp.classList.toggle('hidden');
}

/**
 * Rename togglePopUp for readibility in other functions. Use this 
 * function when you intend the pop up to be visible to the user.
 */
const openPopUp = togglePopUp;

/**
 * Use this function when you intend the pop up to be hidden from the user. 
 * This function also removes event listeners associated with the pop up for adding/removing a 
 * task; since new event listeners for the pop up window are created every time the pop up window is opened, 
 * these event listeners also need to be removed every time the pop up window is closed.
 */
function closePopUp() {
    togglePopUp();
    const confirmButton = document.querySelector('#confirm');
    confirmButton.removeEventListener('click', () => {
        const taskObj = getFormData();
        createTask(taskObj);
        addTaskToStorage(taskObj);
        closePopUp();
    }, {once: true});
    const closePopUpButton = document.querySelector('#closePopUp');
    closePopUpButton.removeEventListener('click', () => {closePopUp();}, {once: true});
    //getFormData also flushes any user input, so use it here to reset the form (This isn't the most elegant way to do this, but it works... Feel free to modify)
    const trashTaskObj = getFormData()
}

/**
 * Removes a task from both localStorage and the page by removing 
 * the task's associated task object from the array of task objects in 
 * localStorage and removing the task's associated HTMLElement from the 
 * page
 * @param {HTMLElement} task A HTMLElement representing a task that 
 * needs to be removed from the page
 * @param {Object} taskObj A task object that needs to be removed from 
 * the array of task objects in localStorage
 */
function deleteTaskButton(task, taskObj) {
    deleteTaskInStorage(taskObj);
    task.remove();
}

/**
 * Adds a specified task object to the array of task objects in 
 * localStorage
 * @param {Object} taskObj A task object that needs to be added to 
 * the array of task objects in localStorage
 */
function addTaskToStorage(taskObj) {
    let taskObjs = getTasksFromStorage();
    taskObjs.push(taskObj);
    saveTasksToStorage(taskObjs);
}

/**
 * Saves a specified array of task objects to localStorage
 * @param {Array<Object>} taskObjs An array of task objects that need to be 
 * saved to localStorage
 */
function saveTasksToStorage(taskObjs) {
    //gets all tasks from localStorage
    let allTasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    //gets the date that was selected on the calendar
    const date = document.getElementById('date').textContent;
    //modifies the tasks for the selected date in the object containing all tasks
    allTasks[`${date}`] = taskObjs;
    //store the object containing all tasks to localStorage under the key 'tasks'
    localStorage.setItem('tasks', JSON.stringify(allTasks));
}

/**
 * Removes a specified task object from localStorage
 * @param {Object} taskObj An object representing a task that needs to 
 * be removed from localStorage
 */
function deleteTaskInStorage(taskObj) {
    let taskObjs = getTasksFromStorage();
    saveTasksToStorage(taskObjs.filter((el) => el.id !== taskObj.id));
}

/**
 * Reads user input from the pop up form and creates an object 
 * representing a task from it
 * @returns {Object} Returns an object representing a task
 */
function getFormData() {
    const taskObjPrototype = {
        "id": Math.floor(Math.random() * 1000000),
        "title": document.querySelector('#titleText').value,
        "desc": document.querySelector('#descText').value
    };
    //flush any user input, so that the form is empty when it's opened again
    document.querySelector('#titleText').value = "";
    document.querySelector('#descText').value = "";
    return taskObjPrototype;
}