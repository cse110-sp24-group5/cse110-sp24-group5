//A suite of tests that checks the functionality of the calendar's task list feature
describe('Task list test suite', () => {
    //Start by visiting the calendar part of our webapp
    beforeAll(async () => {
        await page.goto('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/calendar');
    });
    it('Check "add new task" functionality on the first day of the current month', async () => {
        console.log('Check "add new task" functionality on the first day of the current month');
        //find and click on the first day of the current month
        const firstOfTheMonth = await page.$('.days:not(.blank-day)');
        await firstOfTheMonth.click();
        //find and click on the add new task (+) button
        const addNewTaskButton = await page.$('#add');
        await addNewTaskButton.click();
        //find, click on, and type "This is a test task title" into the task title text entry box
        const taskTitleText = await page.$('#title-text');
        await taskTitleText.click();
        await page.keyboard.type('This is a test task title');
        //find, click on, and type "This is a test task description" into the task description text entry box
        const taskDescText = await page.$('#desc-text');
        await taskDescText.click();
        await page.keyboard.type('This is a test task description');
        //find and click on the confirm button
        const confirmButton = await page.$('#confirm');
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
});