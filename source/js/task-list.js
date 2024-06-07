// task-list.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    const popUp = document.querySelector('.pop-up.parent'); // Pop-up element
    const closePopUp = document.getElementById('close-pop-up'); // Close pop-up button
    const addTaskButton = document.getElementById('add'); // Add task button
    const confirmButton = document.getElementById('confirm'); // Confirm button
    const titleInput = document.getElementById('title-text'); // Title text input
    const descriptionInput = document.getElementById('desc-text'); // Description text input
    let isDuplicate = false; // Variable to track whether there exists a duplicate entry
    let editMode = false; // Variable to track whether the pop-up is in edit mode
    let editedTaskTitle; // Stores the title of the task being edited
    let deletedTaskTitle; // Stores the title of the task being deleted
    let isSaved = false; // Flag to track if there are unsaved changes

    /**
     * Function to save tasks to localStorage
     * @param {string} date - The date for which tasks are being saved
     * @param {Array} tasks - The array of tasks to save
     */
    function saveTasksToStorage(date, tasks) {
        const tasksObj = loadTasksFromStorage();
        tasksObj[date] = tasks;
        localStorage.setItem('tasks', JSON.stringify(tasksObj));
    }

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    
    /**
     * Function to show the overlay
     */
    function showOverlay() {
        overlay.classList.add('active');
    }

    /**
     * Function to hide the overlay
     */
    function hideOverlay() {
        overlay.classList.remove('active');
    }
    
    /**
     * Function to hide the pop-up
     */
    function hidePopUp() {
        hideOverlay();
        popUp.classList.add('hidden');
    }

    /** 
     * Function to show the pop-up
     */
    function showPopUp() {
        showOverlay();
        popUp.classList.remove('hidden');
    }

    function handleAddTaskButtonClick(){
        showPopUp();
        // Reset text input values
        titleInput.value = '';
        descriptionInput.value = '';
    }

    // Event listener for the "Add Task" button
    addTaskButton.addEventListener('click', () => {
        handleAddTaskButtonClick();
    });

    // Event listener for the "Close" button in the pop-up
    closePopUp.addEventListener('click', () => {
        if (isSaved) {
            const confirmClose = confirm("You have unsaved changes. Are you sure you want to close?");
            if (confirmClose) {
                hidePopUp();
                clearInputs();
                isSaved = false;
            }
        } else {
            hidePopUp();
        }
    });

    // Event listener for the "Confirm" button in the pop-up
    confirmButton.addEventListener('click', handleConfirmButtonClick);
    confirmButton.addEventListener('click', ()=> {
        const dateElement = document.getElementById('date');
        const day = document.querySelector('li');
        const dateText = dateElement.textContent;
        const totalUpdatedTaskNum = getTasksForDate(dateText);
        const tasksCountForDate = document.querySelector('span');
        const daysContainer = document.querySelector('.days');
        console.log(daysContainer);
        if(totalUpdatedTaskNum.length >= 1) {
            if(totalUpdatedTaskNum.length == 1) {
                tasksCountForDate.textContent = `${totalUpdatedTaskNum.length} task`;
                /*let displayTask = document.getElementById("tasks-count");
                displayTask.innerHTML = '<p> tasksCountForDate.textContent</p>'; */
                tasksCountForDate.classList.add('tasks-count');
                day.appendChild(tasksCountForDate);
                daysContainer.appendChild(day);
            }
            else {
                //Else, you have many tasks, so use "x tasks"
                tasksCountForDate.textContent = `${totalUpdatedTaskNum.length} tasks`; // Display the count with text
                /*let displayTask = document.getElementById("tasks-count");*/
                /*displayTask.innerHTML = '<p> tasksCountForDate.textContent</p>'; */
                tasksCountForDate.classList.add('tasks-count');
                day.appendChild(tasksCountForDate);
                daysContainer.appendChild(day);

            }
            
                //add this new element and append to the day
                   /* tasksCountForDate.classList.add('tasks-count');
                    day.appendChild(tasksCountForDate);*/
            }
        });


    // Event listener for input changes to set isSaved flag
    [titleInput, descriptionInput].forEach(input => {
        input.addEventListener('input', () => {
            isSaved = titleInput.value.trim() !== '' || descriptionInput.value.trim() !== '';
        });
    });

    /**
     * Function to handle the "Confirm" button click event
     */
    function handleConfirmButtonClick() {
        const dateElement = document.getElementById('date');
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        // Construct a unique key for localStorage based on the selected date
        const dateText = dateElement.textContent;

        // Check if a title is provided
        if (!title) {
            alert('Please provide a title.');
            return; // Stop further execution
        }

        //Get existing tasks from localStorage
        const tasks = getTasksForDate(dateText);

        if (editMode) {
            //Find the task to edit by its title
            const editedTaskIndex = tasks.findIndex(task => task.titleText === editedTaskTitle);

            if (editedTaskIndex !== -1) {
                // Check for any other entries with the same new title
                tasks.forEach((task) => {
                    if (title !== tasks[editedTaskIndex].titleText && title === task.titleText) {
                        alert('No duplicate entries allowed. Change your title.');
                        isDuplicate = true;
                    }
                });

                if (!isDuplicate) {
                    // Update the title and description of the edited task
                    tasks[editedTaskIndex].titleText = title;
                    tasks[editedTaskIndex].descText = description;

                    // Save the updated tasks array back to localStorage
                    saveTasksToStorage(dateText, tasks);

                    // Update the display for the edited task
                    addTaskForDate(dateText);
                }
            }
        } else {
            // Check for any entries with the same title as the one entered
            tasks.forEach((task) => {
                if (title === task.titleText) {
                    alert('No duplicate entries allowed. Change your title.');
                    isDuplicate = true;
                }
            });

            if (!isDuplicate) {
                // Create a new task object
                const newTask = { titleText: title, descText: description };

                // Add the new task to the existing tasks array
                tasks.push(newTask);

                // Save the updated tasks array back to localStorage
                saveTasksToStorage(dateText, tasks);

                // adds task for the specified date
                addTaskForDate(dateText);
            }
        }
        
        if (!isDuplicate) {
            // Hide the pop-up
            hidePopUp();

            // Clear the inputs for the next task
            titleInput.value = '';
            descriptionInput.value = '';
            // Reset editMode and editedTaskId
            editMode = false;
            editedTaskTitle = null;         
        }

       // Reset isDuplicate
        isDuplicate = false;
        isSaved = false;
    }

    // Function to clear input fields
    function clearInputs() {
        titleInput.value = '';
        descriptionInput.value = '';
    }

    /**
     * Function to add task for a given date
     * @param {string} dateText - The date for which to add tasks
     */
    function addTaskForDate(dateText) {

        // Get the task list ul element
        const taskList = document.querySelector('.task-list-ul');

        // Clear existing tasks in the task list
        taskList.innerHTML = '';

        // Get tasks for the specified date
        const dailyTasks = getTasksForDate(dateText);

        // Check if tasks exist for the date
        if (dailyTasks && dailyTasks.length > 0) {
            // Loop through the tasks and create HTML elements
            dailyTasks.forEach((task) => {
                // Create list item for each task
                const taskItem = document.createElement('li');

                // Create div for task content
                const taskContent = document.createElement('div');
                taskContent.classList.add('task-container');

                // Create h3 element for task title
                const taskTitle = document.createElement('h3');
                taskTitle.id = 'task';
                taskTitle.textContent = task.titleText; // Set task title

                // Create edit button
                const editButton = document.createElement('button');
                editButton.id = 'edit'; // Set unique id for edit button
                editButton.type = 'submit';
                editButton.addEventListener('click', () => handleEditButtonClick(task));
                const editIcon = document.createElement('img');
                editIcon.src = '../img/edit_task.png';
                editButton.appendChild(editIcon);

                // Create delete button
                const deleteButton = document.createElement('button');
                deleteButton.id = 'delete'; // Set unique id for delete button
                deleteButton.type = 'submit';
                deleteButton.addEventListener('click', () => handleDeleteButtonClick(task));
                const deleteIcon = document.createElement('img');
                deleteIcon.src = '../img/delete_task.png';
                deleteButton.appendChild(deleteIcon);

                // Append title, edit button, and delete button to task content
                taskContent.appendChild(taskTitle);
                taskContent.appendChild(editButton);
                taskContent.appendChild(deleteButton);

                // Create p element for task description
                const taskDescription = document.createElement('p');
                taskDescription.textContent = task.descText; // Set task description

                // Append task content and description to list item
                taskItem.appendChild(taskContent);
                taskItem.appendChild(taskDescription);

                // Append list item to task list
                taskList.appendChild(taskItem);
            });
        } else {
            // If no tasks exist for the date, display a message
            const noTasksMessage = document.createElement('li');
            noTasksMessage.textContent = 'No tasks for this date.';
            taskList.appendChild(noTasksMessage);
        }
    }

    /**
     * Function to handle the edit button click event
     * @param {Array} task - The task to be edited
     */
    function handleEditButtonClick(task) {
        // Set edit mode to true
        editMode = true;
        editedTaskTitle = task.titleText;

        // Populate title and description inputs with task data
        titleInput.value = task.titleText;
        descriptionInput.value = task.descText;

        // Show the pop-up
        showPopUp();
    }

    /**
     * Function to handle the delete icon click event
     * @param {Array} task - The task to be deleted
     */
    function handleDeleteButtonClick(task) {
        const dateElement = document.getElementById('date');
        // Construct a unique key for localStorage based on the selected date
        const dateText = dateElement.textContent;

        deletedTaskTitle = task.titleText;
        let tasks = getTasksForDate(dateText);

        // Use filter to remove the task with the given id
        tasks = tasks.filter(taskFilter => taskFilter.titleText !== deletedTaskTitle);

        saveTasksToStorage(tasks);
        addTaskForDate(dateText);

        const tasksObj = loadTasksFromStorage();
        if (tasks.length == 0) { // Check if the tasks array is empty for the given day after deletion
            delete tasksObj[dateText]; // Remove the corresponding date key from the tasks object
            localStorage.setItem('tasks', JSON.stringify(tasksObj)); // Update the localStorage
        }
    }

    /**
     * Function to add event listeners to each day element in the calendar.
     */
    function track_days() {
        const days = document.querySelectorAll('.days li');
        days.forEach(day => {
            day.addEventListener('click', () => {
                const dateElement = document.getElementById('date');
                // Construct a unique key for localStorage based on the selected date
                const dateText = dateElement.textContent;
                addTaskForDate(dateText);
            });
        });
    }

    track_days();

    // Ensures that unique keys are constructed for localStorage across different months
    const prevMonthButton = document.querySelector('.prev-month');
    const nextMonthButton = document.querySelector('.next-month');
    prevMonthButton.addEventListener('click', track_days);
    nextMonthButton.addEventListener('click', track_days);

    // Warn the user if they attempt to leave the page with unsaved changes
    window.addEventListener('beforeunload', (event) => {
        console.log(isSaved)
        if (isSaved) {
            event.preventDefault();
            event.returnValue = '';
        }
    });

    // make functions available globally
    window.handleEditButtonClick = handleEditButtonClick;
    window.handleDeleteButtonClick = handleDeleteButtonClick;
    window.getTasksForDate = getTasksForDate;
    window.handleAddTaskButtonClick = handleAddTaskButtonClick;
};

/**
 * Function to retrieve tasks from localStorage or returns an empty array if no tasks are found
 * @returns {Object} - Object consisting of date keys with an array of that date's tasks as a value
 * 
 * return object format
 * 
 * {
 *  date: [{
 *      titleText: 
 *      descText: 
 *  }, ...]
 *  date: [{
 *      titleText: 
 *      descText: 
 *  }, ...]
 *  date: [{
 *      titleText: 
 *      descText: 
 *  }, ...]
 *  ...
 * }
 */
function loadTasksFromStorage() {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : {};
}
    
/**
 * Gets the tasks for a specified date
 * @param {string} date - Representation of a date
 * @returns {Array} - Array of tasks for the specified date
 */
function getTasksForDate(date) {
    const tasksObj = loadTasksFromStorage();
    return tasksObj[date] || [];
}
