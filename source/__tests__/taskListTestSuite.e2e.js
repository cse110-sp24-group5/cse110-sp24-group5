//A suite of tests that checks the functionality of the calendar's task list feature
describe('Task list test suite', () => {
    //Start by visiting the calendar part of our webapp
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5501/source/html/calendar.html'); //https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/calendar
    });
    it('Check "add new task" functionality on the first day of the current month', async () => {
        console.log('Check "add new task" functionality on the first day of the current month');
        //find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
        //check placeholder text if no tasks are found
        const noTasksMessage = await page.evaluate(() => {
            const taskList = document.querySelector('.task-list-ul');
            return taskList.querySelector('li').textContent;
        });
        expect(noTasksMessage).toBe('No tasks for this date.');
        //find and click on the add new task (+) button
        const addNewTaskButton = await page.$('#add');
        await addNewTaskButton.click();
        //find and click on the confirm button
        page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Please provide a title.');
            await dialog.accept();
        });          
        const confirmButton = await page.$('#confirm');
        await confirmButton.click();
        //find, click on, and type "This is a test task title" into the task title text entry box
        const taskTitleText = await page.$('#title-text');
        await taskTitleText.click();
        await page.keyboard.type('This is a test task title');
        //find, click on, and type "This is a test task description" into the task description text entry box
        const taskDescText = await page.$('#desc-text');
        await taskDescText.click();
        await page.keyboard.type('This is a test task description');
        //click on the confirm button again
        await confirmButton.click();
        //Get the newly added task's title from the task list
        const displayedTaskTitle = await page.$('.task-container>#task');
        const displayedTaskTitleVal = await displayedTaskTitle.getProperty('innerText');
        const displayedTaskTitleText = await displayedTaskTitleVal.jsonValue();
        //Get the newly added task's description from the task list
        const displayedTaskDesc = await page.$('.task-container+p');
        const displayedTaskDescVal = await displayedTaskDesc.getProperty('innerText');
        const displayedTaskDescText = await displayedTaskDescVal.jsonValue();
        //Confirm whether or not the newly added task's title and description from the task list match the title and description specified for the task
        expect(displayedTaskTitleText).toBe('This is a test task title');
        expect(displayedTaskDescText).toBe('This is a test task description');
    });

    // Tasks are saved locally (tasks are still there after refreshing page) - add
    it('Locally saved new tasks', async () => {
        //count initial number of tasks
        const taskInitCount = await page.evaluate(() => {
            return JSON.parse(localStorage.getItem('tasks')).length;
        });
        //Get the newly added task's title from the task list
        const displayedTaskTitleInit = await page.$('.task-container>#task');
        const displayedTaskTitleValInit = await displayedTaskTitleInit.getProperty('innerText');
        const displayedTaskTitleTextInit = await displayedTaskTitleValInit.jsonValue();
        //Get the newly added task's description from the task list
        const displayedTaskDescInit = await page.$('.task-container+p');
        const displayedTaskDescValInit = await displayedTaskDescInit.getProperty('innerText');
        const displayedTaskDescTextInit = await displayedTaskDescValInit.jsonValue();

        await page.reload();

        //find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
        //count final number of tasks
        const taskFinCount = await page.evaluate(() => {
            return JSON.parse(localStorage.getItem('tasks')).length;
        });
        //Get the newly added task's title from the task list
        const displayedTaskTitleFin = await page.$('.task-container>#task');
        const displayedTaskTitleValFin = await displayedTaskTitleFin.getProperty('innerText');
        const displayedTaskTitleTextFin = await displayedTaskTitleValFin.jsonValue();
        //Get the newly added task's description from the task list
        const displayedTaskDescFin = await page.$('.task-container+p');
        const displayedTaskDescValFin = await displayedTaskDescFin.getProperty('innerText');
        const displayedTaskDescTextFin = await displayedTaskDescValFin.jsonValue();

        expect(taskFinCount).toBe(taskInitCount);
        expect(taskFinCount).toBe(1);
        expect(displayedTaskTitleTextFin).toBe(displayedTaskTitleTextInit);
        expect(displayedTaskDescTextFin).toBe(displayedTaskDescTextInit);
    }, 10000);


    it('Check "edit task" functionality on the first task on the first day of the current month', async () => {
        console.log('Check "edit task" functionality on a task on the first day of the current month');
        //find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
        //find and click on the edit task icon
        const editTaskButton = await page.$('.task-list-ul li #edit');
        await editTaskButton.click();
        //find, click on, and type "This is a test task title" into the task title text entry box
        const taskTitleText = await page.$('#title-text');
        await taskTitleText.click();
        await page.keyboard.type(' that has been edited');
        //find, click on, and type "This is a test task description" into the task description text entry box
        const taskDescText = await page.$('#desc-text');
        await taskDescText.click();
        await page.keyboard.type(' that has also been edited');
        //find and click on the confirm button
        const confirmButton = await page.$('#confirm');
        await confirmButton.click();
        //Get the edited task's title from the task list
        const displayedTaskTitle = await page.$('.task-container>#task');
        const displayedTaskTitleVal = await displayedTaskTitle.getProperty('innerText');
        const displayedTaskTitleText = await displayedTaskTitleVal.jsonValue();
        //Get the edited task's description from the task list
        const displayedTaskDesc = await page.$('.task-container+p');
        const displayedTaskDescVal = await displayedTaskDesc.getProperty('innerText');
        const displayedTaskDescText = await displayedTaskDescVal.jsonValue();
        //Confirm whether or not the edit task's title and description from the task list match the title and description specified for the task
        expect(displayedTaskTitleText).toBe('This is a test task title that has been edited');
        expect(displayedTaskDescText).toBe('This is a test task description that has also been edited');
    });

    // Tasks are saved locally (tasks are still there after refreshing page) - edit
    it('Locally saved edited tasks', async () => {
        // count initial number of tasks
        const taskInitCount = await page.evaluate(() => {
            return JSON.parse(localStorage.getItem('tasks')).length;
        });
        //Get the newly added task's title from the task list
        const displayedTaskTitleInit = await page.$('.task-container>#task');
        const displayedTaskTitleValInit = await displayedTaskTitleInit.getProperty('innerText');
        const displayedTaskTitleTextInit = await displayedTaskTitleValInit.jsonValue();
        //Get the newly added task's description from the task list
        const displayedTaskDescInit = await page.$('.task-container+p');
        const displayedTaskDescValInit = await displayedTaskDescInit.getProperty('innerText');
        const displayedTaskDescTextInit = await displayedTaskDescValInit.jsonValue();

        await page.reload();

        //find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
        //count final number of tasks
        const taskFinCount = await page.evaluate(() => {
            return JSON.parse(localStorage.getItem('tasks')).length;
        });
        //Get the newly added task's title from the task list
        const displayedTaskTitleFin = await page.$('.task-container>#task');
        const displayedTaskTitleValFin = await displayedTaskTitleFin.getProperty('innerText');
        const displayedTaskTitleTextFin = await displayedTaskTitleValFin.jsonValue();
        //Get the newly added task's description from the task list
        const displayedTaskDescFin = await page.$('.task-container+p');
        const displayedTaskDescValFin = await displayedTaskDescFin.getProperty('innerText');
        const displayedTaskDescTextFin = await displayedTaskDescValFin.jsonValue();

        expect(taskFinCount).toBe(taskInitCount);
        expect(taskFinCount).toBe(1);
        expect(displayedTaskTitleTextFin).toBe(displayedTaskTitleTextInit);
        expect(displayedTaskDescTextFin).toBe(displayedTaskDescTextInit);
    }, 10000);

    it('Check "delete task" functionality on the first task on the first day of the current month', async () => {
        console.log('Check "delete task" functionality on the first task on the first day of the current month');
        //find and click on the delete task icon
        const deleteTaskButton = await page.$('.task-list-ul li #delete');
        await deleteTaskButton.click();
        //check placeholder text if no tasks are found
        const noTasksMessage = await page.evaluate(() => {
            const taskList = document.querySelector('.task-list-ul');
            return taskList.querySelector('li').textContent;
        });
        expect(noTasksMessage).toBe('No tasks for this date.');
    });

    // Tasks are saved locally (tasks are still there after refreshing page) - delete
    it('Locally saved deleted tasks', async () => {
        //count initial number of tasks
        const taskInitCount = await page.evaluate(() => { //note: started replacing all `await page.$$eval('.task-list-ul li', (tasks) => tasks.length);` with direct localStorage checks as expected length for empty array was 1.
            return JSON.parse(localStorage.getItem('tasks')).length;
        });

        await page.reload();

        //find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
        // count final number of tasks
        const taskFinCount = await page.evaluate(() => {
            return JSON.parse(localStorage.getItem('tasks')).length;
        });

        expect(taskFinCount).toBe(taskInitCount);
        expect(taskFinCount).toBe(0);
    }, 10000);

    it('Check adding 50 tasks on the first day of the current month', async () => {
        console.log('Check adding 50 tasks on the first day of the current month');
        //find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
        //iterate for 50 tasks
        for (let i = 0; i < 50; i++) {
            //find and click on the add new task (+) button
            const addNewTaskButton = await page.$('#add');
            await addNewTaskButton.click();
            //find, click on, and type the task number into the task title text entry box
            const taskTitleText = await page.$('#title-text');
            await taskTitleText.click();
            await page.keyboard.type(`Task ${i + 1}`);
            //find, click on, and type the description for the task number into the task description text entry box
            const taskDescText = await page.$('#desc-text');
            await taskDescText.click();
            await page.keyboard.type(`Description for task ${i + 1}`);
            //find and click on the confirm button
            const confirmButton = await page.$('#confirm');
            await confirmButton.click();
        }

        //verify that 50 tasks have been added
        const taskCount = await page.evaluate(() => {
            return JSON.parse(localStorage.getItem('tasks')).length;
        });
        expect(taskCount).toBe(50);

        //validate each task's title and description
        for (let i = 0; i < 50; i++) {
            //Get the edited task's title from the task list
            const displayedTaskTitles = await page.$$('.task-container>#task');
            const displayedTaskTitleVal = await displayedTaskTitles[i].getProperty('innerText');
            const displayedTaskTitleText = await displayedTaskTitleVal.jsonValue();
            //Get the edited task's description from the task list
            const displayedTaskDescs = await page.$$('.task-container+p');
            const displayedTaskDescVal = await displayedTaskDescs[i].getProperty('innerText');
            const displayedTaskDescText = await displayedTaskDescVal.jsonValue();
            //Confirm whether or not the edit task's title and description from the task list match the title and description specified for the task
            expect(displayedTaskTitleText).toBe(`Task ${i + 1}`);
            expect(displayedTaskDescText).toBe(`Description for task ${i + 1}`);
        }
    }, 100000); //extended timeout for adding 50 tasks
});