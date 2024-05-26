const URL = 'https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/dev-journal.html';
describe('Dev Journal Page', () => {

    // First, visit the website
    beforeAll(async () => {
        await page.goto(URL);
    });

    /**
     * Test if the date on the page defaults to the current date
     */
    it('Page defaults to current date', async () => {
        const titleHandle = await page.$('#title');
        const titleText = await titleHandle.evaluate(el => el.textContent);

        const currentDate = new Date();
        // converts to yyyy-mm-dd
        const formattedDate = currentDate.toISOString();
        // only select the date - discard the time
        const date = formattedDate.split('T')[0];

        expect(titleText).toBe(date);
    }, 10000);

    /**
     * Test if the date on page changes once datepicker is clicked
     */
    it('Date change', async () => {
        const datepicker = await page.$('#datepicker');
        const newDate = '2024-01-01';
        
        // Evaluate function to set the datepicker value and dispatch change event
        await page.evaluate((element, date) => {
            element.value = date;
            // sending the change event on datepicker
            element.dispatchEvent(new Event('change'));
        }, datepicker, newDate);

        
        const titleHandle = await page.$('#title');
        const titleText = await titleHandle.evaluate(el => el.textContent);

        expect(titleText).toBe(newDate);
    }, 10000);

    // writing in the markdown editor
    it('Writing in markdown editor and saving', async () => {
        
        // set date
        let datepicker = await page.$('#datepicker');
        const newDate = '2024-01-01';        
        await page.evaluate((element, date) => {
            element.value = date;
            element.dispatchEvent(new Event('change'));
        }, datepicker, newDate);

    
        // Wait for the editor to be available
        await page.waitForSelector('#markdown-editor');
        let editorHandle = await page.$('#markdown-editor');
    
        // Click on the editor to focus it
        await editorHandle.click();
    
        // Content to be typed into the editor
        const markdownContent = '#Hello World\nThis is some sample content';
        await page.keyboard.type(markdownContent);
    
        const buttonHandle = await page.$('.save-button');
        // Click the save button
        page.on('dialog', async dialog => {
            await dialog.accept(); // Press the "OK" button on the dialog
        });
        await buttonHandle.click();
    
        // Wait for a short while to ensure the save operation completes
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Reload the page
        await page.reload();
    
        // Wait for the editor to be available again after reload
        datepicker = await page.$('#datepicker');
        await page.evaluate((element, date) => {
            element.value = date;
            element.dispatchEvent(new Event('change'));
        }, datepicker, newDate);
    

        editorHandle = await page.$('#markdown-editor');
        await editorHandle.click();
    
        // Evaluate the content of the editor to check if it matches the inserted content
        const editorContent = await page.evaluate(element => element.value, editorHandle);
    
        // Expect the editor content to be the inserted content
        expect(editorContent).toBe(markdownContent); 
    }, 20000);

/**
 * Test Switching Between Editor and Preview
 */
it('Switching between editor and preview', async () => {
    const newDate = '2024-01-11';
    
    // set date
    const datepicker = await page.$('#datepicker');
    await page.evaluate((element, date) => {
        element.value = date;
        element.dispatchEvent(new Event('change'));
    }, datepicker, newDate);
    
    // Enter markdown content
    const markdownContent = '# Switching Test /n Test for **switching** between preview and editor.';
    await page.type('#markdown-editor', markdownContent);

    // Click on the preview button
    const previewButton = await page.$('.preview-button');
    await previewButton.click();
    
    // Wait for the preview to render
    await page.waitForSelector('#markdown-preview');
    
    // Click on the editor button
    const editorButton = await page.$('.editor-button');
    await editorButton.click();
    
    // Verify the editor content
    const editorContent = await page.$eval('#markdown-editor', el => el.value);
    console.log(editorContent);
    
    expect(editorContent).toBe(markdownContent);
}, 20000);

it('Deleting All Text from Markdown Editor', async () => {
    // Wait for the editor to be available
    await page.waitForSelector('#markdown-editor');
    let editorHandle = await page.$('#markdown-editor');

    // Click on the editor to focus it
    await editorHandle.click();

    // Simulate selecting all text
    await editorHandle.click({ clickCount: 3 }); 
    await page.keyboard.press('Backspace'); // Delete all selected text

    const editorContentAfterDeletion = await page.$eval('#markdown-editor', el => el.value);
    expect(editorContentAfterDeletion).toBe("");
}, 20000);

it('Reloading Bug Tracker ', async () => {
    await page.waitForSelector('#bug-tracker');
    const bugTrackerTextArea = await page.$('#bug-tracker');

    const inputText = 'Test bug description for persistence';
    await bugTrackerTextArea.type(inputText);

    const saveButton = await page.$('.save-button');
    await saveButton.click();

    await page.reload();

    await page.waitForSelector('#bug-tracker');
    const bugTrackerTextAreaAfterReload = await page.$('#bug-tracker');

    const textAfterReload = await page.evaluate(element => element.value, bugTrackerTextAreaAfterReload);

    expect(textAfterReload).toBe(inputText);
}, 20000);

it('Reloading Learnings', async () => {
    await page.waitForSelector('#learnings');
    const learningsTextArea = await page.$('#learnings');

    const inputText = 'Test learnings description for persistence';
    await learningsTextArea.type(inputText);

    const saveButton = await page.$('.save-button');
    await saveButton.click();

    await page.reload();

    await page.waitForSelector('#learnings');
    const textAreaAfterReload = await page.$('#learnings');

    const enteredTextAfterReload = await page.evaluate(element => element.value, textAreaAfterReload);
    //const Output = "";

    expect(enteredTextAfterReload).toBe(inputText);
}, 20000);

it('Reloading Markdown ', async () => {
    await page.waitForSelector('#markdown-editor');
    const markdownEditorTextArea = await page.$('#markdown-editor');

    const markdownContent = '# Test Markdown Content\nThis is a test for Markdown .';
    await markdownEditorTextArea.type(markdownContent);

    const saveButton = await page.$('.save-button');
    await saveButton.click();

    await page.reload();

    await page.waitForSelector('#markdown-editor');
    const markdownEditorTextAreaAfterReload = await page.$('#markdown-editor');

    const enteredMarkdownContentAfterReload = await page.evaluate(element => element.value, markdownEditorTextAreaAfterReload);

    expect(enteredMarkdownContentAfterReload).toBe(markdownContent);
}, 20000);






    
});
