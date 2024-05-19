window.addEventListener('DOMContentLoaded', init);

function init () {
    const popUp = document.querySelector('.pop-up.parent');
    const closePopUp = document.getElementById('closePopUp');
    const addTaskButton = document.getElementById('add'); // Add task button
    const confirmButton = document.getElementById('confirm'); // Confirm button
    const titleInput = document.getElementById('titleText'); // Title text input
    const descriptionInput = document.getElementById('descText'); // Description text
    let editMode = false;
    let editedTaskId;
    let deletedTaskId;

    // Function to generate a unique ID for tasks
    function generateUniqueId() {
        // Generate a random number and convert it to a string
        return Math.floor(Math.random() * 1000000).toString();
    }

    function loadTasksFromStorage() {
        const tasksJSON = localStorage.getItem('tasks');
        return tasksJSON ? JSON.parse(tasksJSON) : [];
    }
    
    function getTasksForDate(date) {
        const allTasks = loadTasksFromStorage();
        return allTasks.filter(task => task.date === date);
    }

    function saveTasksToStorage(tasks) {
        const tasksJSON = JSON.stringify(tasks);
        localStorage.setItem('tasks', tasksJSON);
        console.log(tasks);
    }
    
    // Function to show the pop-up
    function showPopUp() {
        popUp.classList.remove('hidden');
    }

    // Function to hide the pop-up
    function hidePopUp() {
        popUp.classList.add('hidden');
    }

    // Event listener for the "Add Task" button
    addTaskButton.addEventListener('click', () => {
        showPopUp();
    });

    // Event listener for the "Close" button in the pop-up
    closePopUp.addEventListener('click', hidePopUp);

    // Event listener for the "Confirm" button in the pop-up
    confirmButton.addEventListener('click', handleConfirmButtonClick);

    // Function to handle the "Confirm" button click event
    function handleConfirmButtonClick() {
        const dateElement = document.getElementById('date');
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        // Construct a unique key for localStorage based on the selected date
        const dateText = dateElement.textContent;

        // Check if a title is provided
        if (!title) {
            alert("Please provide a title.");
            return; // Stop further execution
        }

        if (editMode) {
            // Get existing tasks from localStorage
            const tasks = loadTasksFromStorage();

            // Find the task to edit by its ID
            const editedTaskIndex = tasks.findIndex(task => task.id === editedTaskId);

            if (editedTaskIndex !== -1) {
                // Update the title and description of the edited task
                tasks[editedTaskIndex].titleText = title;
                tasks[editedTaskIndex].descText = description;

                // Save the updated tasks array back to localStorage
                saveTasksToStorage(tasks);

                // Update the display for the edited task
                addTaskForDate(dateText);
            }
            // Reset edit mode and editedTaskId
            editMode = false;
            editedTaskId = null;
        } else {
            // Get existing tasks from localStorage or initialize as an empty array
            const tasks = loadTasksFromStorage();

            // Create a new task object
            const newTask = { id: generateUniqueId(), titleText: title, descText: description, date: dateText };

            // Add the new task to the existing tasks array
            tasks.push(newTask);

            // Save the updated tasks array back to localStorage
            saveTasksToStorage(tasks);

            // adds task for the specified date
            addTaskForDate(dateText);
        }
        
        // Hide the pop-up
        hidePopUp();

        // Clear the inputs for the next task
        titleInput.value = '';
        descriptionInput.value = '';
    }

    // Function to add task for a given date
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
            dailyTasks.forEach((task, index) => {
                // Create list item for each task
                const taskItem = document.createElement('li');
    
                // Create div for task content
                const taskContent = document.createElement('div');
                taskContent.classList.add('placeholder-task');
    
                // Create h3 element for task title
                const taskTitle = document.createElement('h3');
                taskTitle.textContent = task.titleText; // Set task title
    
                // Create edit button
                const editButton = document.createElement('button');
                editButton.id = `edit_${index}`; // Set unique id for edit button
                editButton.type = 'submit';
                editButton.addEventListener('click', () => handleEditButtonClick(task));
                const editIcon = document.createElement('img');
                editIcon.src = '../img/edit_task.png';
                editButton.appendChild(editIcon);
    
                // Create delete button
                const deleteButton = document.createElement('button');
                deleteButton.id = `delete_${index}`; // Set unique id for delete button
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

    function handleEditButtonClick(task) {
        // Set edit mode to true
        editMode = true;
        editedTaskId = task.id;

        // Populate title and description inputs with task data
        titleInput.value = task.titleText;
        descriptionInput.value = task.descText;

        // Show the pop-up
        showPopUp();
    }

    function handleDeleteButtonClick(task) {
        const dateElement = document.getElementById('date');
        // Construct a unique key for localStorage based on the selected date
        const dateText = dateElement.textContent;

        deletedTaskId = task.id
        let tasks = loadTasksFromStorage();

        // Use filter to remove the task with the given id
        tasks = tasks.filter(task => task.id !== deletedTaskId);

        saveTasksToStorage(tasks);
        addTaskForDate(dateText);
    }

    const days = document.querySelectorAll('.days li');
    days.forEach(day => {
        day.addEventListener('click', () => {
            dateElement = document.getElementById('date');
            // Construct a unique key for localStorage based on the selected date
            const dateText = dateElement.textContent;
            addTaskForDate(dateText);
        });
    });
};