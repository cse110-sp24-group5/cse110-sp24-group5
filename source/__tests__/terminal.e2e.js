
// A suite of tests that checks the functionality of the terminal feature
describe('Terminal test suite', () => {

    // Start by visiting homepage
    beforeAll(async () => {
        // answers the dialogue asking for name
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            // name of user is rejected now
            await dialog.dismiss();
        });
        await page.goto('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/index.html');
    });

    it('should display info box when info button is clicked', async () => {
        // Click the info button and verify that the info box is displayed
        await page.click('#infoBtn');
        // Wait for the info box to be visible
        await page.waitForSelector('#infoBox', { visible: true });
        // Check if the info box is visible by evaluating its display style
        const infoBoxDisplay = await page.$eval('#infoBox', infoBox => getComputedStyle(infoBox).display);
        expect(infoBoxDisplay).not.toBe('none');
    });

    it('should close info box when close button is clicked', async () => {
        // Click the info button to display the info box
        await page.click('#infoBtn');
        // Click the close button and verify that the info box is closed
        await page.click('#closeBtn');
        // Wait for the info box to be hidden
        await page.waitForSelector('#infoBox', { hidden: true });
        // Check if the info box is hidden by evaluating its display style
        const infoBoxDisplay = await page.$eval('#infoBox', infoBox => getComputedStyle(infoBox).display);
        expect(infoBoxDisplay).toBe('none');
    });

    it('should toggle terminal visibility when Ctrl+/ is pressed', async () => {
        // Simulate pressing Ctrl+/ to toggle the terminal visibility
        await page.keyboard.down('Control');
        await page.keyboard.press('/');
        await page.keyboard.up('Control');

        // Wait for the terminal element to appear
        await page.waitForSelector('#terminal');

        // Verify that the terminal is displayed after pressing Ctrl+/
        const terminal = await page.$('#terminal');
        const terminalClass = await terminal.evaluate(el => el.className);
        console.log('Terminal class:', terminalClass); // Log the class for debugging
        expect(terminalClass.includes('hidden')).toBe(false); // Check if the terminal is not hidden
    });

    it('should close terminal when q is pressed inside the terminal', async () => {
        await page.keyboard.press('q');
    
        const terminal = await page.$('#terminal');
        const terminalClass = await terminal.evaluate(el => el.className);
        console.log('Terminal class:', terminalClass); // Log the class for debugging
        expect(terminalClass.includes('hidden')).toBe(true); // Check if the terminal is hidden
      });

    it('should cd to calendar', async () => {
        // Simulate pressing Ctrl+/ to toggle the terminal visibility
        await page.keyboard.down('Control');
        await page.keyboard.press('/');
        await page.keyboard.up('Control');

        // Wait for the terminal element to appear
        await page.waitForSelector('#terminal');
        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command 'cd calendar' and press Enter
        await page.keyboard.type('cd calendar\n');

        // Wait for calendar page to load
        await page.waitForNavigation();

        // gets the url of the page after load
        const curr_URL = await page.url();
        // checks for expected calandar url
        expect(curr_URL).toBe('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/calendar.html');
    });

    it('should choose date', async () => {

    });

    it('should choose month and year', async () => {

    });

    it('should delete task', async () => {

    });

    it('should edit task', async () => {

    });

    it('should cd back to home from calendar', async () => {
        // Simulate pressing Ctrl+/ to toggle the terminal visibility
        await page.keyboard.down('Control');
        await page.keyboard.press('/');
        await page.keyboard.up('Control');

        // Wait for the terminal element to appear
        await page.waitForSelector('#terminal');
        
        // Navigate back to the home page by typing 'cd ..' and pressing Enter
        await page.click('#terminal-input');
        await page.keyboard.type('cd ..\n');

        // answers the dialogue asking for name
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            // name of user is rejected now
            await dialog.dismiss();
        });

        // Wait for home page to load
        await page.waitForNavigation();
        // gets home url
        const return_URL = await page.url();
        // checks if returned to home url
        expect(return_URL).toBe('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/index.html');
    });

    it('should cd to dev journal', async () => {
        // Simulate pressing Ctrl+/ to toggle the terminal visibility
        await page.keyboard.down('Control');
        await page.keyboard.press('/');
        await page.keyboard.up('Control');

        // Wait for the terminal element to appear
        await page.waitForSelector('#terminal');
        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command 'cd calendar' and press Enter
        await page.keyboard.type('cd dev-journal\n');

        // Wait for calendar page to load
        await page.waitForNavigation();

        // gets the url of the page after load
        const curr_URL = await page.url();
        // checks for expected calandar url
        expect(curr_URL).toBe('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/dev-journal.html');
    });

    it('should preview the markdown', async () => {

    });

    it('should edit the markdown', async () => {

    });

    it('should write learnings', async () => {

    });

    it('should write bugs', async () => {

    });

    it('should choose debugging role', async () => {

    });

    it('should choose documentation role', async () => {

    });

    it('should choose coding role', async () => {

    });

    it('should choose communication role', async () => {

    });

    it('should cd back to home from dev journal', async () => {
        // Simulate pressing Ctrl+/ to toggle the terminal visibility
        await page.keyboard.down('Control');
        await page.keyboard.press('/');
        await page.keyboard.up('Control');

        // Wait for the terminal element to appear
        await page.waitForSelector('#terminal');
        
        // Navigate back to the home page by typing 'cd ..' and pressing Enter
        await page.click('#terminal-input');
        await page.keyboard.type('cd ..\n');

        // answers the dialogue asking for name
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            // name of user is rejected now
            await dialog.dismiss();
        });

        // Wait for home page to load
        await page.waitForNavigation();
        // gets home url
        const return_URL = await page.url();
        // checks if returned to home url
        expect(return_URL).toBe('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/index.html');
    });
});
