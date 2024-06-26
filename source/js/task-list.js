// task-list.js

window.addEventListener('DOMContentLoaded', init);

function init() {
    const taskList = document.querySelector('.task-list.parent'); // Find the task list container
    const closeTaskList = document.getElementById('close-task-list'); // Close button for the task list pop-up
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

    const overlay = createOverlay(); // Create overlay for the task list pop-up
    document.body.appendChild(overlay); // Append the overlay to the body

    let prevMonthButton = document.querySelector('.prev-month');
    let nextMonthButton = document.querySelector('.next-month');

    /**
     * Handles clicking the add task button by blurring the screen via showPopUp and clearing previous input from the pop-up!
     */
    function handleAddTaskButtonClick(){
        showPopUp(popUp);
        // Reset text input values
        clearInputs(titleInput, descriptionInput);
        // Set focus on task title text input
        titleInput.focus();
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
                hidePopUp(popUp);
                clearInputs(titleInput, descriptionInput);       
                isSaved = false;
            }
        } else {
            hidePopUp(popUp);
        }
    });

    /**
     * function to handle when task list is closed
     */
    function handleCloseTaskList() {      
        hideTaskList(taskList); // Close the task list pop-up when the close button is clicked
        const clickedDateText = getDateTextFromDate();
        const newSelectedDay = new Date(clickedDateText);
        renderCalendar(newSelectedDay);  
        trackDays();
    }

    // Event listener for the "Close" button in the task-list
    closeTaskList.addEventListener('click', handleCloseTaskList);

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

            // Stop further execution
            return;
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
            hidePopUp(popUp);
            
            // Clear the inputs for the next task
            clearInputs(titleInput, descriptionInput);
            
            // Reset editMode and editedTaskId
            editMode = false;
            editedTaskTitle = null;         
        }

       // Reset isDuplicate
        isDuplicate = false;
        isSaved = false;
    }

    // Event listener for the "Confirm" button in the pop-up
    confirmButton.addEventListener('click', handleConfirmButtonClick);

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
        showPopUp(popUp);

        // Set focus on task title text input
        titleInput.focus();
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

        saveTasksToStorage(dateText, tasks);
        addTaskForDate(dateText);

        const tasksObj = loadTasksFromStorage();
        if (tasks.length == 0) { // Check if the tasks array is empty for the given day after deletion
            delete tasksObj[dateText]; // Remove the corresponding date key from the tasks object
            localStorage.setItem('tasks', JSON.stringify(tasksObj)); // Update the localStorage
        }
    }

    trackDays();

    // Ensures that unique keys are constructed for localStorage across different months
    prevMonthButton.addEventListener('click', trackDays);
    nextMonthButton.addEventListener('click', trackDays);

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
 * Function to add event listeners to each day element in the calendar.
 */
function trackDays() {
    const taskList = document.querySelector('.task-list.parent'); // Find the task list container
    const days = document.querySelectorAll('.days li');
    days.forEach((day) => {
        day.addEventListener('click', () => {
            const clickedDateText = getDateTextFromDate();
            // Construct a unique key for localStorage based on the selected date
            addTaskForDate(clickedDateText);
            showTaskList(clickedDateText, taskList);
        });
        day.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const clickedDateText = getDateTextFromDate();
                // Construct a unique key for localStorage based on the selected date
                addTaskForDate(clickedDateText);
                showTaskList(clickedDateText, taskList);
            }
        });
    });
}

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

/**
 * Function to save tasks to localStorage
 * @param {string} date - The date for which tasks are being saved
 * @param {Array} tasks - The array of tasks to save
 */
 function saveTasksToStorage(date, tasks) {
    const tasksObj = loadTasksFromStorage();
    tasksObj[date] = tasks;
    localStorage.setItem('tasks', JSON.stringify(tasksObj));
    console.log(tasksObj);
}

/**
 * Function to clear input fields
 * @param {HTMLElement} titleInput - HTMLElement representing the pop-up title textarea
 * @param {HTMLElement} descriptionInput - HTMLElement representing the pop-up description textarea
 */
function clearInputs(titleInput, descriptionInput) {
        titleInput.value = '';
        descriptionInput.value = '';
}

/**
     * Function to populate task-list with tasks for a given date
     * @param {string} clickedDateText - The date for which to populate tasks for
     */
function addTaskForDate(clickedDateText) {

    // Get the task list ul element
    const taskList = document.querySelector('.task-list-ul');

    // Clear existing tasks in the task list
    taskList.innerHTML = '';

    // Get tasks for the specified date
    const dailyTasks = getTasksForDate(clickedDateText);

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
            //editIcon.alt = 'edit button';
            editButton.appendChild(editIcon);

            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.id = 'delete'; // Set unique id for delete button
            deleteButton.type = 'submit';
            deleteButton.addEventListener('click', () => handleDeleteButtonClick(task));
            const deleteIcon = document.createElement('img');
            deleteIcon.src = '../img/delete_task.png';
            //deleteIcon.alt = 'delete button';
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
 * Function to show the overlay
 */
 function showPopUpOverlay() {
    const overlay = document.querySelector('.overlay'); // Find the overlay element
    overlay.style.zIndex = '2'; //set the z index to be on the same level as the task-list so that the task-list is blurred and inaccessible when editing/adding a task
}

/**
 * Function to hide the overlay
 */
 function hidePopUpOverlay() {
    const overlay = document.querySelector('.overlay'); // Find the overlay element
    overlay.style.zIndex = '1'; //set the z index to be on the same level as the calendar so that the calendar is blurred and inaccessible when viewing the task-list
}

/**
 * Function to show the pop-up
 * @param {HTMLElement} popUp - HTMLElement referencing the pop-up window
 */
function showPopUp(popUp) {
    showPopUpOverlay();
    popUp.classList.remove('hidden');
}

/**
 * Function to hide the pop-up
 * @param {HTMLElement} popUp - HTMLElement referencing the pop-up window
 */
function hidePopUp(popUp) {
    hidePopUpOverlay();
    popUp.classList.add('hidden');
}
 
/**
* Show the task list pop-up
* @param {HTMLElement} taskList - HTMLElement referencing the task-list window
* @param {string} clickedDateText - Date of the clicked day in string format
*/
function showTaskList(clickedDateText, taskList) {
    showTaskListOverlay(); // Show the overlay
    taskList.classList.remove('hidden'); // Show the task list pop-up
    const dateElement = document.getElementById('date');
    dateElement.textContent = clickedDateText;
}
 
/**
* Hide the task list pop-up
* @param {HTMLElement} taskList - HTMLElement referencing the task-list window
*/
function hideTaskList(taskList) {
    hideTaskListOverlay(); // Hide the overlay
    taskList.classList.add('hidden'); // Hide the task list pop-up
}
 
/**
* Show the overlay
*/
function showTaskListOverlay() {
    const overlay = document.querySelector('.overlay'); // Find the overlay element
    overlay.classList.add('active'); // Add 'active' class to show the overlay
}
 
/**
* Hide the overlay
*/
function hideTaskListOverlay() {
    const overlay = document.querySelector('.overlay'); // Find the overlay element
    overlay.classList.remove('active'); // Remove 'active' class to hide the overlay
}

/**
* Create the overlay element
* @returns {HTMLElement} - The overlay element.
*/
function createOverlay() {
   const overlayDiv = document.createElement('div'); // Create a div element for the overlay
   overlayDiv.classList.add('overlay'); // Add class to style the overlay
   return overlayDiv;
}

/**
* Gets the 
* @param {Element} day - triggered day element in the calendar days array
* @returns {string} - The string representation of the date of the clicked day
*/
function getDateTextFromDate() {
    const monthYearText = document.querySelector('.month-year').textContent; // Current month and year header text
    let selectedDay = document.querySelector('.selected').textContent.trim(); // Day clicked text
    if (selectedDay.startsWith('0')) {
        selectedDay = selectedDay.substring(1); // Remove the leading zero if single digit
    }
    const monthDayYearText = `${monthYearText.split(' ')[0]} ${selectedDay}, ${monthYearText.split(' ')[1]}`; // Extract month and year separately and rearrange them
    return monthDayYearText;
}