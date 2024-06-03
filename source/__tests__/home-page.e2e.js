// Test the home page
describe('Test to ensure all components of main page are working', () => {
    // an example name to be used
    let exampleName = 'tester';

    // loads the home page for testing
    beforeAll(async () => {
        // answers the dialogue asking for name
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            // name of user is rejected now
            await dialog.dismiss();
        });
        await page.goto('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/index.html');
    });

    // Test home page 
    it('Home page without user input', async () => {
        // get the home url
        const home_URL = await page.url();
        // TEST checks to see if it matches the deployed page
        expect(home_URL).toBe('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/index.html');

        // TEST expected name of user after rejecting dialogue
        const nameReject = await page.$eval('#name', el => el.textContent);
        expect(nameReject).toBe('!');
    });

    // DevJournal component
    it('Ensures devjournal is reachable', async () => {
        // ~~ GOING TO JOURNAL ~~
        console.log('Going to the journal page...');
        // Gets the journal button
        const journal_Button = await page.$('#journalImage');
        // clicks the journal button and waits for load after click
        await journal_Button.click();
        await page.waitForNavigation();
        // gets the url of the page after load
        const curr_URL = await page.url();
        // checks that the current page is the journal page
        expect(curr_URL).toBe('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/dev-journal.html');

        // ~~ GOING BACK HOME ~~
        // gets back button in page
        console.log('Going back home...');
        const back_Button = await page.$('img');
        // clicks on it and waits for navigation
        await back_Button.click();
        // ADDS THE EXAMPLE NAME INTO HOME PAGE USING DIALOGUE
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            // name of user is accepted now
            await dialog.accept(exampleName);
        });
        await page.waitForNavigation();
        // gets home url again
        const return_URL = await page.url();
        // checks if returned to home url
        expect(return_URL).toBe('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/index.html');
    });

    // Home page test again 
    it('Home page with user input', async () => {
        // TEST expected name of user after answering dialogue
        const nameAccept = await page.$eval('#name', el => el.textContent);
        // case where user gave a name
        expect(nameAccept).toBe(' ' + exampleName + '!');
    });

    // Calandar section
    it('Ensures calandar is reachable', async () => {
        // ~~ GOING TO CALANDAR ~~
        console.log('Going to the calandar page...');
        // Gets the calandar button
        const calandar_Button = await page.$('#calandarImage');
        // clicks the calandar button and waits for load after click
        await calandar_Button.click();
        await page.waitForNavigation();
        // gets the url of the page after load
        const curr_URL = await page.url();
        // checks for expected calandar url
        expect(curr_URL).toBe('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/calendar.html');

        // ~~ GOING BACK HOME ~~
        // gets back button in page
        console.log('Going back home...');
        const back_Button = await page.$('img');
        // clicks on it and waits for navigation
        await back_Button.click();
        await page.waitForNavigation();
        // gets home url again
        const return_URL = await page.url();
        // checks if returned to home url
        expect(return_URL).toBe('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/index.html');
    });

    // Sentiment widget component #TODO
    /* it('Ensures interaction with sentiment widget works', async () => {
      
    }); */

    // OFFLINE TESTS
    // Test home page
    /* it('Ensures home page works OFFLINE', async () => {
        // goes offline
        await page.setOfflineMode(true);
        await page.reload();
        // get the home url
        const home_URL = await page.url();
        // checks to see if it matches the deployed page
        expect(home_URL).toBe('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/index.html');
    });

    // DevJournal component
    it('Ensures devjournal is reachable OFFLINE', async () => {
        // ~~ GOING TO JOURNAL ~~
        console.log('Going to the journal page...');
        // Gets the journal button
        const journal_Button = await page.$('#journalImage');
        // clicks the journal button and waits for load after click
        await journal_Button.click();
        await page.waitForNavigation();
        // gets the url of the page after load
        const curr_URL = await page.url();
        // checks that the current page is the journal page
        expect(curr_URL).toBe('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/dev-journal.html');

        // ~~ GOING BACK HOME ~~
        // gets back button in page
        console.log('Going back home...');
        const back_Button = await page.$('img');
        // clicks on it and waits for navigation
        await back_Button.click();
        await page.waitForNavigation();
        // gets home url again
        const return_URL = await page.url();
        // checks if returned to home url
        expect(return_URL).toBe('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/index.html');
    });

    // Calandar section
    it('Ensures calandar is reachable OFFLINE', async () => {
        // ~~ GOING TO CALANDAR ~~
        console.log('Going to the calandar page...');
        // Gets the calandar button
        const calandar_Button = await page.$('#calandarImage');
        // clicks the calandar button and waits for load after click
        await calandar_Button.click();
        await page.waitForNavigation();
        // gets the url of the page after load
        const curr_URL = await page.url();
        // checks for expected calandar url
        expect(curr_URL).toBe('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/calendar.html');

        // ~~ GOING BACK HOME ~~
        // gets back button in page
        console.log('Going back home...');
        const back_Button = await page.$('img');
        // clicks on it and waits for navigation
        await back_Button.click();
        await page.waitForNavigation();
        // gets home url again
        const return_URL = await page.url();
        // checks if returned to home url
        expect(return_URL).toBe('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/index.html');
        // Goes back online
        await page.setOfflineMode(false);
        await page.reload();
    }); */

    // Sentiment widget component #TODO
    /* it('Ensures interaction with sentiment widget works OFFLINE', async () => {

    }); */
});

