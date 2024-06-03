// A suite of tests that checks the functionality of the calendar's task list feature
describe('Task list test suite', () => {
    // Start by visiting the calendar part of our webapp
    beforeAll(async () => {
        //await page.goto('http://127.0.0.1:5500/cse110-sp24-group5/source/html/calendar.html'); // test locally
        await page.goto('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/calendar.html');
    });
    // Add new task functionality
    it('Check "add new task" functionality on the first day of the current month', async () => {
        console.log('Check "add new task" functionality on the first day of the current month');
        // find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
        // check placeholder text if no tasks are found
        const noTasksMessage = await page.evaluate(() => {
            const taskList = document.querySelector('.task-list-ul');
            return taskList.querySelector('li').textContent;
        });
        expect(noTasksMessage).toBe('No tasks for this date.');
        // find and click on the add new task (+) button
        const addNewTaskButton = await page.$('#add');
        await addNewTaskButton.click();
        // find and click on the confirm button
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Please provide a title.');
            await dialog.accept();
        });          
        const confirmButton = await page.$('#confirm');
        await confirmButton.click();
        // find, click on, and type "This is a test task title" into the task title text entry box
        const taskTitleText = await page.$('#title-text');
        await taskTitleText.click();
        await page.keyboard.type('This is a test task title');
        // find, click on, and type "This is a test task description" into the task description text entry box
        const taskDescText = await page.$('#desc-text');
        await taskDescText.click();
        await page.keyboard.type('This is a test task description');
        // click on the confirm button again
        await confirmButton.click();
        // Get the newly added task's title from the task list
        const displayedTaskTitle = await page.$('.task-container>#task');
        const displayedTaskTitleVal = await displayedTaskTitle.getProperty('innerText');
        const displayedTaskTitleText = await displayedTaskTitleVal.jsonValue();
        // Get the newly added task's description from the task list
        const displayedTaskDesc = await page.$('.task-container+p');
        const displayedTaskDescVal = await displayedTaskDesc.getProperty('innerText');
        const displayedTaskDescText = await displayedTaskDescVal.jsonValue();
        // Confirm whether or not the newly added task's title and description from the task list match the title and description specified for the task
        expect(displayedTaskTitleText).toBe('This is a test task title');
        expect(displayedTaskDescText).toBe('This is a test task description');
    });

    // Tasks are saved locally (tasks are still there after refreshing page) - add
    it('Locally saved new tasks', async () => {
        // count initial number of tasks
        const taskInitCount = await page.evaluate(() => {
            const tasksObj = JSON.parse(localStorage.getItem('tasks'));
            let sum = 0;
            for (const date in tasksObj) {
                sum = sum + tasksObj[date].length;
            }
            return sum;
        });
        // Get the newly added task's title from the task list
        const displayedTaskTitleInit = await page.$('.task-container>#task');
        const displayedTaskTitleValInit = await displayedTaskTitleInit.getProperty('innerText');
        const displayedTaskTitleTextInit = await displayedTaskTitleValInit.jsonValue();
        // Get the newly added task's description from the task list
        const displayedTaskDescInit = await page.$('.task-container+p');
        const displayedTaskDescValInit = await displayedTaskDescInit.getProperty('innerText');
        const displayedTaskDescTextInit = await displayedTaskDescValInit.jsonValue();

        await page.reload();

        // find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
        // count final number of tasks
        const taskFinCount = await page.evaluate(() => {
            const tasksObj = JSON.parse(localStorage.getItem('tasks'));
            let sum = 0;
            for (const date in tasksObj) {
                sum = sum + tasksObj[date].length;
            }
            return sum;
        });
        // Get the newly added task's title from the task list
        const displayedTaskTitleFin = await page.$('.task-container>#task');
        const displayedTaskTitleValFin = await displayedTaskTitleFin.getProperty('innerText');
        const displayedTaskTitleTextFin = await displayedTaskTitleValFin.jsonValue();
        // Get the newly added task's description from the task list
        const displayedTaskDescFin = await page.$('.task-container+p');
        const displayedTaskDescValFin = await displayedTaskDescFin.getProperty('innerText');
        const displayedTaskDescTextFin = await displayedTaskDescValFin.jsonValue();

        expect(taskFinCount).toBe(taskInitCount);
        expect(taskFinCount).toBe(1);
        expect(displayedTaskTitleTextFin).toBe(displayedTaskTitleTextInit);
        expect(displayedTaskDescTextFin).toBe(displayedTaskDescTextInit);
    }, 10000);

    // Edit task functionality
    it('Check "edit task" functionality on the first task on the first day of the current month', async () => {
        console.log('Check "edit task" functionality on a task on the first day of the current month');
        // find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
        // find and click on the edit task icon
        const editTaskButton = await page.$('.task-list-ul li #edit');
        await editTaskButton.click();
        // find, click on, and type "This is a test task title" into the task title text entry box
        const taskTitleText = await page.$('#title-text');
        await taskTitleText.click();
        await page.keyboard.press('End');
        await page.keyboard.type(' that has been edited');
        // find, click on, and type "This is a test task description" into the task description text entry box
        const taskDescText = await page.$('#desc-text');
        await taskDescText.click();
        await page.keyboard.press('End');
        await page.keyboard.type(' that has also been edited');
        // find and click on the confirm button
        const confirmButton = await page.$('#confirm');
        await confirmButton.click();
        // Get the edited task's title from the task list
        const displayedTaskTitle = await page.$('.task-container>#task');
        const displayedTaskTitleVal = await displayedTaskTitle.getProperty('innerText');
        const displayedTaskTitleText = await displayedTaskTitleVal.jsonValue();
        // Get the edited task's description from the task list
        const displayedTaskDesc = await page.$('.task-container+p');
        const displayedTaskDescVal = await displayedTaskDesc.getProperty('innerText');
        const displayedTaskDescText = await displayedTaskDescVal.jsonValue();
        // Confirm whether or not the edit task's title and description from the task list match the title and description specified for the task
        expect(displayedTaskTitleText).toBe('This is a test task title that has been edited');
        expect(displayedTaskDescText).toBe('This is a test task description that has also been edited');
    });

    // Tasks are saved locally (tasks are still there after refreshing page) - edit
    it('Locally saved edited tasks', async () => {
        // count initial number of tasks
        const taskInitCount = await page.evaluate(() => {
            const tasksObj = JSON.parse(localStorage.getItem('tasks'));
            let sum = 0;
            for (const date in tasksObj) {
                sum = sum + tasksObj[date].length;
            }
            return sum;
        });
        // Get the newly added task's title from the task list
        const displayedTaskTitleInit = await page.$('.task-container>#task');
        const displayedTaskTitleValInit = await displayedTaskTitleInit.getProperty('innerText');
        const displayedTaskTitleTextInit = await displayedTaskTitleValInit.jsonValue();
        // Get the newly added task's description from the task list
        const displayedTaskDescInit = await page.$('.task-container+p');
        const displayedTaskDescValInit = await displayedTaskDescInit.getProperty('innerText');
        const displayedTaskDescTextInit = await displayedTaskDescValInit.jsonValue();

        await page.reload();

        // find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
        // count final number of tasks
        const taskFinCount = await page.evaluate(() => {
            const tasksObj = JSON.parse(localStorage.getItem('tasks'));
            let sum = 0;
            for (const date in tasksObj) {
                sum = sum + tasksObj[date].length;
            }
            return sum;
        });
        // Get the newly added task's title from the task list
        const displayedTaskTitleFin = await page.$('.task-container>#task');
        const displayedTaskTitleValFin = await displayedTaskTitleFin.getProperty('innerText');
        const displayedTaskTitleTextFin = await displayedTaskTitleValFin.jsonValue();
        // Get the newly added task's description from the task list
        const displayedTaskDescFin = await page.$('.task-container+p');
        const displayedTaskDescValFin = await displayedTaskDescFin.getProperty('innerText');
        const displayedTaskDescTextFin = await displayedTaskDescValFin.jsonValue();

        expect(taskFinCount).toBe(taskInitCount);
        expect(taskFinCount).toBe(1);
        expect(displayedTaskTitleTextFin).toBe(displayedTaskTitleTextInit);
        expect(displayedTaskDescTextFin).toBe(displayedTaskDescTextInit);
    }, 10000);

    // Delete task functionality
    it('Check "delete task" functionality on the first task on the first day of the current month', async () => {
        console.log('Check "delete task" functionality on the first task on the first day of the current month');
        // find and click on the delete task icon
        const deleteTaskButton = await page.$('.task-list-ul li #delete');
        await deleteTaskButton.click();
        // check placeholder text if no tasks are found
        const noTasksMessage = await page.evaluate(() => {
            const taskList = document.querySelector('.task-list-ul');
            return taskList.querySelector('li').textContent;
        });
        expect(noTasksMessage).toBe('No tasks for this date.');
    });

    // Tasks are saved locally (tasks are still there after refreshing page) - delete
    it('Locally saved deleted tasks', async () => {
        // count initial number of tasks
        const taskInitCount = await page.evaluate(() => { // note: started replacing all `await page.$$eval('.task-list-ul li', (tasks) => tasks.length);` with direct localStorage checks as expected length for empty array was 1.
            const tasksObj = JSON.parse(localStorage.getItem('tasks'));
            let sum = 0;
            for (const date in tasksObj) {
                sum = sum + tasksObj[date].length;
            }
            return sum;
        });

        await page.reload();

        // find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
        // count final number of tasks
        const taskFinCount = await page.evaluate(() => {
            const tasksObj = JSON.parse(localStorage.getItem('tasks'));
            let sum = 0;
            for (const date in tasksObj) {
                sum = sum + tasksObj[date].length;
            }
            return sum;
        });

        expect(taskFinCount).toBe(taskInitCount);
        expect(taskFinCount).toBe(0);
    }, 10000);

    // Add many new tasks functionality
    it('Check adding 50 tasks on the first day of the current month', async () => {
        console.log('Check adding 50 tasks on the first day of the current month');
        // find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
        // iterate for 50 tasks
        for (let i = 0; i < 50; i++) {
            // find and click on the add new task (+) button
            const addNewTaskButton = await page.$('#add');
            await addNewTaskButton.click();
            // find, click on, and type the task number into the task title text entry box
            const taskTitleText = await page.$('#title-text');
            await taskTitleText.click();
            await page.keyboard.type(`Task ${i + 1}`);
            // find, click on, and type the description for the task number into the task description text entry box
            const taskDescText = await page.$('#desc-text');
            await taskDescText.click();
            await page.keyboard.type(`Description for task ${i + 1}`);
            // find and click on the confirm button
            const confirmButton = await page.$('#confirm');
            await confirmButton.click();
        }

        // verify that 50 tasks have been added
        const taskCount = await page.evaluate(() => {
            const tasksObj = JSON.parse(localStorage.getItem('tasks'));
            let sum = 0;
            for (const date in tasksObj) {
                sum = sum + tasksObj[date].length;
            }
            return sum;
        });
        expect(taskCount).toBe(50);

        // validate each task's title and description
        for (let i = 0; i < 50; i++) {
            // Get the edited task's title from the task list
            const displayedTaskTitles = await page.$$('.task-container>#task');
            const displayedTaskTitleVal = await displayedTaskTitles[i].getProperty('innerText');
            const displayedTaskTitleText = await displayedTaskTitleVal.jsonValue();
            // Get the edited task's description from the task list
            const displayedTaskDescs = await page.$$('.task-container+p');
            const displayedTaskDescVal = await displayedTaskDescs[i].getProperty('innerText');
            const displayedTaskDescText = await displayedTaskDescVal.jsonValue();
            // Confirm whether or not the edit task's title and description from the task list match the title and description specified for the task
            expect(displayedTaskTitleText).toBe(`Task ${i + 1}`);
            expect(displayedTaskDescText).toBe(`Description for task ${i + 1}`);
        }
    }, 100000); // extended timeout for adding 50 tasks

    // Edit many tasks functionality
    it('Check editing 50 tasks on the first day of the current month', async () => {
        console.log('Check editing 50 tasks on the first day of the current month');
        // find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
    
        // iterate for 50 tasks
        for (let i = 0; i < 50; i++) {
            // find and click on the edit task icon for the i-th task
            const editTaskButtons = await page.$$('.task-list-ul li #edit');
            await editTaskButtons[i].click();
            // find, click on, and type additional text into the task title text entry box
            const taskTitleText = await page.$('#title-text');
            await taskTitleText.click();
            await page.keyboard.press('End');
            await page.keyboard.type(' edited');
            // find, click on, and type additional text into the task description text entry box
            const taskDescText = await page.$('#desc-text');
            await taskDescText.click();
            await page.keyboard.press('End');
            await page.keyboard.type(' edited');
            // find and click on the confirm button
            const confirmButton = await page.$('#confirm');
            await confirmButton.click();
        }

        // validate each task's title and description
        for (let i = 0; i < 50; i++) {
            // Get the edited task's title from the task list
            const displayedTaskTitles = await page.$$('.task-container>#task');
            const displayedTaskTitleVal = await displayedTaskTitles[i].getProperty('innerText');
            const displayedTaskTitleText = await displayedTaskTitleVal.jsonValue();
            // Get the edited task's description from the task list
            const displayedTaskDescs = await page.$$('.task-container+p');
            const displayedTaskDescVal = await displayedTaskDescs[i].getProperty('innerText');
            const displayedTaskDescText = await displayedTaskDescVal.jsonValue();
            // Confirm whether or not the edit task's title and description from the task list match the title and description specified for the task
            expect(displayedTaskTitleText).toBe(`Task ${i + 1} edited`);
            expect(displayedTaskDescText).toBe(`Description for task ${i + 1} edited`);
        }
    }, 100000);

    // Delete many tasks functionality
    it('Check deleting 50 tasks on the first day of the current month', async() => {
        console.log('Check deleting 50 tasks on the first day of the current month');
        // find and click on the first day of the current month
        const firstOfMonth = await page.$('.days:not(.blank-day)');
        await firstOfMonth.click();
        // iterate over 50 tasks to delete
        for(let i = 0; i < 50; i++){
            // find and click on the delete task icon
            const deleteTask = await page.$('.task-list-ul li #delete');
            await deleteTask.click();
        }
        // check to make sure there are no more tasks on the first day of the current month
        const tasksNotPresent = await page.evaluate(() => {
            const taskList = document.querySelector('.task-list-ul');
            return taskList.querySelector('li').textContent;
        });
        // expect no tasks to be present
        expect(tasksNotPresent).toBe('No tasks for this date.');
    }, 100000);

    // Tasks are independent of each other (eg. they don't match if the days are in the same position in the calendar)
    /*it('Check tasks are independent and vary based on date and position in calendar', async() => {
        console.log('Check that tasks are independent on the 1st of May and the 5th of June');
        // find and click on first Saturday of the current month 
        await page.evaluate(() => { // note: const fourthOfMay = await page.$('.days:not(.blank-day):nth-child(4)'); had unexpected behavior
            // Select the 7th element of the calendar month
            const firstSatOfMay = document.querySelectorAll('.days li')[6];
            firstSatOfMay.click();
        });
        let date = await page.$eval('#date', element => element.textContent);
        expect(date).toBe('May 4, 2024');
        // find and click on add task button 
        const addMayTask = await page.$('#add');
        await addMayTask.click();
        // find, click on, and type 'Title for 4th of May'
        const mayTitleText = await page.$('#title-text');
        await mayTitleText.click();
        await page.keyboard.type('Title for 4th of May');
        // find, click on, and type 'Task for 4th of May' into the task description text entry box
        const mayDescText = await page.$('#desc-text');
        await mayDescText.click();
        await page.keyboard.type('Task for 4th of May');
        // find and click on the confirm button
        const mayConfirm = await page.$('#confirm');
        await mayConfirm.click();
        // get task title from 4th of May
        const mayTitleDisplay = await page.$('.task-container>#task');
        const mayTitleDisplayVal = await mayTitleDisplay.getProperty('innerText');
        const mayTitleDisplayText = await mayTitleDisplayVal.jsonValue();
        // get the May's task's description from the task list
        const mayDisplayTaskDesc = await page.$('.task-container+p');
        const mayDisplayVal = await mayDisplayTaskDesc.getProperty('innerText');
        const mayDisplayDescText = await mayDisplayVal.jsonValue();
        // close the task-list pop-up
        const closeTaskList = await page.$('#close-task-list');
        await closeTaskList.click();

        // move to prev month (April)
        const prevMonth = await page.$('.prev-month');
        await prevMonth.click();
        // find and click on first Saturday of April
        await page.evaluate(() => {
            // Select the 7th element of the calendar month
            const firstSatOfApr = document.querySelectorAll('.days li')[6];
            firstSatOfApr.click();
        });
        date = await page.$eval('#date', element => element.textContent);
        expect(date).toBe('April 6, 2024');
        await closeTaskList.click();
    
        // move to next month (June)
        const nextMonth = await page.$('.next-month');
        await nextMonth.click();
        await nextMonth.click();
        // find and click on the first Saturday of June
        await page.evaluate(() => {
            // Select the 7th element of the calendar month
            const firstSatOfJun = document.querySelectorAll('.days li')[6];
            firstSatOfJun.click();
        });
        date = await page.$eval('#date', element => element.textContent);
        expect(date).toBe('June 1, 2024');
        // find and click on add task button 
        const addJuneTask = await page.$('#add');
        await addJuneTask.click();
        // find, click on, and type 'Title for 1st of June'
        const juneTitleText = await page.$('#title-text');
        await juneTitleText.click();
        await page.keyboard.type('Title for 1st of June');
        // find, click on, and type 'Task for 1st of June' into the task description text entry box
        const juneDescText = await page.$('#desc-text');
        await juneDescText.click();
        await page.keyboard.type('Task for 1st of June');
        // find and click on the confirm button
        const juneConfirm = await page.$('#confirm');
        await juneConfirm.click();
        // get task title and task description from 1st of June
        const juneTitleDisplay = await page.$('.task-container>#task');
        const juneTitleDisplayVal = await juneTitleDisplay.getProperty('innerText');
        const juneTitleDisplayText = await juneTitleDisplayVal.jsonValue();
        // get June's added task's description from the task list
        const juneDisplayTaskDesc = await page.$('.task-container+p');
        const juneDisplayVal = await juneDisplayTaskDesc.getProperty('innerText');
        const juneDisplayDescText = await juneDisplayVal.jsonValue();
        
        // expect May and June task titles to be different
        expect(mayTitleDisplayText).toBe('Title for 4th of May');
        expect(juneTitleDisplayText).toBe('Title for 1st of June');
        // expect May and June task descriptions to be different
        expect(mayDisplayDescText).toBe('Task for 4th of May');
        expect(juneDisplayDescText).toBe('Task for 1st of June');
        await closeTaskList.click();
    }, 10000);*/

    // Close add pop-up functionality
    it('Check "close add pop-up" functionality on the first day of the current month', async () => { // note: current month is now June after the independent task test
        console.log('Check "close add pop-up" functionality on the first day of the current month');
        // find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
        // find and click on the add new task (+) button
        const addNewTaskButton = await page.$('#add');
        await addNewTaskButton.click();
        // Confirm whether or not the hidden class is applied to pop-up (it shouldn't be applied since the pop-up should be visible)
        const popUpParentBeforeClose = await page.$$('section.pop-up.parent.hidden');
        expect(popUpParentBeforeClose.length).toBe(0);
        // find and click on the close add pop-up button (x)
        const closePopUpButton = await page.$('#close-pop-up');
        await closePopUpButton.click();
        // Confirm whether or not the hidden class is applied to the pop-up (it should be applied since the pop-up shouldn't be visible)
        const popUpParentAfterClose = await page.$$('section.pop-up.parent.hidden');
        expect(popUpParentAfterClose.length).toBe(1);
    });
    
    // Close edit pop-up functionality
    it('Check "close edit pop-up" functionality on the first day of the current month', async () => { // note: current month is now June after the independent task test
        console.log('Check "close edit pop-up" functionality on the first day of the current month');
        // find and click on the add new task (+) button
        const addNewTaskButton = await page.$('#add');
        await addNewTaskButton.click();
        // find, click on, and type "This is a test task title" into the task title text entry box
        const taskTitleText = await page.$('#title-text');
        await taskTitleText.click();
        await page.keyboard.type('This is a test task title');
        // find, click on, and type "This is a test task description" into the task description text entry box
        const taskDescText = await page.$('#desc-text');
        await taskDescText.click();
        await page.keyboard.type('This is a test task description');
        // click on the confirm button
        const confirmButton = await page.$('#confirm');
        await confirmButton.click();
        // find and click on the edit task button for the first task in the tasklist
        const firstTaskEditButton = await page.$('.task-container>#edit');
        await firstTaskEditButton.click();
        // Confirm whether or not the hidden class is applied to pop-up (it shouldn't be applied since the pop-up should be visible)
        const popUpParentBeforeClose = await page.$$('section.pop-up.parent.hidden');
        expect(popUpParentBeforeClose.length).toBe(0);
        // find and click on the close add pop-up button (x)
        const closePopUpButton = await page.$('#close-pop-up');
        await closePopUpButton.click();
        // Confirm whether or not the hidden class is applied to the pop-up (it should be applied since the pop-up shouldn't be visible)
        const popUpParentAfterClose = await page.$$('section.pop-up.parent.hidden');
        expect(popUpParentAfterClose.length).toBe(1);
    });
    
    // Close task-list functionality
    it('Check "close tasklist" functionlity on the first day of the current month', async () => { // note: current month is now June after the independent task test
        console.log('Check "close tasklist" functionlity on the first day of the current month');
        // Confirm whether or not the hidden class is applied to tasklist (it shouldn't be applied since the tasklist should be visible)
        const taskListParentBeforeClose = await page.$$('section.task-list.parent.hidden');
        expect(taskListParentBeforeClose.length).toBe(0);
        // find and click on the close tasklist button (x)
        const closeTaskListButton = await page.$('#close-task-list');
        await closeTaskListButton.click();
        // Confirm whether or not the hidden class is apllied to the tasklist (it should be applied since the tasklist shouldn't be visible)
        const taskListParentAfterClose = await page.$$('section.task-list.parent.hidden');
        expect(taskListParentAfterClose.length).toBe(1);
        console.log('Check "add new task" functionality on the first day of the current month');
    });

});
