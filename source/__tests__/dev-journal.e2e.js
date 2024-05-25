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
        const datepicker = await page.$('#datepicker');
        const newDate = '2024-01-01';        
        await page.evaluate((element, date) => {
            element.value = date;
            element.dispatchEvent(new Event('change'));
        }, datepicker, newDate);

    
        // Wait for the editor to be available
        await page.waitForSelector('#markdown-editor');
        const editorHandle = await page.$('#markdown-editor');
    
        // Click on the editor to focus it
        await editorHandle.click();
    
        // Content to be typed into the editor
        const markdownContent = '#Hello World\nThis is some sample content';
        await page.keyboard.type(markdownContent);
    
        const buttonHandle = await page.$('.save-button');
        console.log(buttonHandle);
        // Click the save button
        page.on('dialog', async dialog => {
            await dialog.accept(); // Press the "OK" button on the dialog
        });
        await buttonHandle.click();

        // Wait for a short while to ensure the save operation completes
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const localStorageContent = await page.evaluate(() => {return localStorage.getItem("2024-01-01");})

        // Expect the editor content to be the inserted content
        expect(JSON.parse(localStorageContent).markdownEditor).toBe(markdownContent); 
    }, 20000);
});
