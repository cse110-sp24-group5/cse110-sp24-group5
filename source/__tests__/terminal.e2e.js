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

    // clear local storage after tests
    afterAll(async () => {
        await page.evaluate(() => {
            localStorage.clear();
        });
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
        // Simulate pressing Ctrl+/ to toggle the terminal visibility
        await page.keyboard.down('Control');
        await page.keyboard.press('/');
        await page.keyboard.up('Control');

        // Wait for the terminal element to appear
        await page.waitForSelector('#terminal');
        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command 'md p' and press Enter
        await page.keyboard.type('md p\n');

        // Verify that the markdown preview is displayed
        const markdownPreviewVisible = await page.evaluate(() => {
            const previewElement = document.querySelector('#markdown-preview');
            return previewElement && getComputedStyle(previewElement).display !== 'none';
        });
        expect(markdownPreviewVisible).toBe(true);

        // Verify that the markdown editor is not displayed
        const markdownEditorVisible = await page.evaluate(() => {
            const editorElement = document.querySelector('#markdown-editor');
            return editorElement && getComputedStyle(editorElement).display !== 'none';
        });
        expect(markdownEditorVisible).toBe(false);
    });

    it('should edit the markdown', async () => {
        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command 'md e' and press Enter
        await page.keyboard.type('md e\n');

        // Verify that the markdown editor is displayed
        const markdownEditorVisible = await page.evaluate(() => {
            const editorElement = document.querySelector('#markdown-editor');
            return editorElement && getComputedStyle(editorElement).display !== 'none';
        });
        expect(markdownEditorVisible).toBe(true);

        // Verify that the markdown preview is not displayed
        const markdownPreviewVisible = await page.evaluate(() => {
            const previewElement = document.querySelector('#markdown-preview');
            return previewElement && getComputedStyle(previewElement).display !== 'none';
        });
        expect(markdownPreviewVisible).toBe(false);
    });

    it('should select learnings textbox', async () => {
        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command 'l' and press Enter
        await page.keyboard.type('l\n');

        // Verify that the learnings textbox is focused
        const learningFocused = await page.evaluate(() => {
            const learningTextbox = document.getElementById('learnings');
            return document.activeElement === learningTextbox;
        });
        expect(learningFocused).toBe(true);
    });

    it('should select bugs textbox', async () => {
        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command 'l' and press Enter
        await page.keyboard.type('b\n');

        // Verify that the learnings textbox is focused
        const bugFocused = await page.evaluate(() => {
            const bugTextbox = document.getElementById('bug-tracker');
            return document.activeElement === bugTextbox;
        });
        expect(bugFocused).toBe(true);
    });

    it('should choose debugging role', async () => {
        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command 'bug' and press Enter
        await page.keyboard.type('bug\n');

        // Verify that the debugging role is selected
        let roleSelected = await page.evaluate(() => {
            const selectedRole = document.querySelector('#debuggingCheckbox');
            return selectedRole.checked;
        });
        expect(roleSelected).toBe(true);

        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command 'bug' and press Enter
        await page.keyboard.type('bug\n');

        // Verify that the debugging role not is selected
        roleSelected = await page.evaluate(() => {
            const selectedRole = document.querySelector('#debuggingCheckbox');
            return selectedRole.checked;
        });
        expect(roleSelected).toBe(false);
    });

    it('should choose documentation role', async () => {
        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command 'doc' and press Enter
        await page.keyboard.type('doc\n');

        // Verify that the documentation role is selected
        let roleSelected = await page.evaluate(() => {
            const selectedRole = document.querySelector('#documentationCheckbox');
            return selectedRole.checked;
        });
        expect(roleSelected).toBe(true);

        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command 'doc' and press Enter
        await page.keyboard.type('doc\n');

        // Verify that the documentation role is not selected
        roleSelected = await page.evaluate(() => {
            const selectedRole = document.querySelector('#documentationCheckbox');
            return selectedRole.checked;
        });
        expect(roleSelected).toBe(false);
    });

    it('should choose coding role', async () => {
        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command 'code' and press Enter
        await page.keyboard.type('code\n');

        // Verify that the coding role is selected
        let roleSelected = await page.evaluate(() => {
            const selectedRole = document.querySelector('#codingCheckbox');
            return selectedRole.checked;
        });
        expect(roleSelected).toBe(true);

        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command 'code' and press Enter
        await page.keyboard.type('code\n');

        // Verify that the coding role is not selected
        roleSelected = await page.evaluate(() => {
            const selectedRole = document.querySelector('#codingCheckbox');
            return selectedRole.checked;
        });
        expect(roleSelected).toBe(false);
    });

    it('should choose communication role', async () => {
        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command 'com' and press Enter
        await page.keyboard.type('com\n');

        // Verify that the communication role is selected
        let roleSelected = await page.evaluate(() => {
            const selectedRole = document.querySelector('#discussionCheckbox');
            return selectedRole.checked;
        });
        expect(roleSelected).toBe(true);

        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command 'com' and press Enter
        await page.keyboard.type('com\n');

        // Verify that the communication role is selected
        roleSelected = await page.evaluate(() => {
            const selectedRole = document.querySelector('#discussionCheckbox');
            return selectedRole.checked;
        });
        expect(roleSelected).toBe(false);
    });

    it('should cd back to home from dev journal', async () => {

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
        // Simulate pressing Ctrl+/ to toggle the terminal visibility
        await page.keyboard.down('Control');
        await page.keyboard.press('/');
        await page.keyboard.up('Control');

        // Wait for the terminal element to appear
        await page.waitForSelector('#terminal');
        // Click on the terminal input to focus it
        await page.click('#terminal-input');
        // Type a command '1' and press Enter
        await page.keyboard.type('1\n');

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
        
        // find and click on the close task list button (x)
        const closeTaskList = await page.$('#close-task-list');
        await closeTaskList.click();
    });

    it('should choose month and year', async () => {
        // Terminal still open so no need for reopening
        // Click on the terminal input to focus it
        await page.click('#terminal-input');

        // Type the command '05/2024' and press Enter
        await page.keyboard.type('05/2024\n');

        // Wait for the month-year header to update
        await page.waitForFunction(() => {
            const header = document.querySelector('.month-year');
            return header.textContent.trim() === 'May 2024';
        });

        // Get the updated month-year header text
        const monthYearHeaderText = await page.evaluate(() => {
            const header = document.querySelector('.month-year');
            return header.textContent.trim();
        });

        // Assert that the header text is 'May 2024'
        expect(monthYearHeaderText).toBe('May 2024');
    });
});
