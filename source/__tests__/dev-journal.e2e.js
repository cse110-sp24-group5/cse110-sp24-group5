const URL = 'https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/dev-journal.html';
describe('Dev Journal Page', () => {

    const puppeteer = require('puppeteer');

    let browser;
    let page;

    // First, visit the website
    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();

        await page.goto(URL);
    });

    /**
     * Test if the date on the page defaults to the current date
     */
    it('Page defaults to current date', async () => {
        const titleHandle = await page.$('#title');
        const titleText = await titleHandle.evaluate(el => el.textContent);
    
        const currentDate = new Date();
    
        // Extracting date, month, and year separately
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1; // Adding 1 since months are zero-based
        const currentYear = currentDate.getFullYear();
            
        const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

        let formattedDate = `${months[currentMonth - 1]} ${currentDay}, ${currentYear}`;

        expect(titleText).toBe(formattedDate);
    }, 10000);

    /**
     * Test if the date on page changes once datepicker is clicked
     */
    it('Date change', async () => {
        const datepicker = await page.$('#datepicker');
        const newDate = '2024-01-01';
        const newDateStr = 'January 1, 2024'
        
        // Evaluate function to set the datepicker value and dispatch change event
        await page.evaluate((element, date) => {
            element.value = date;
            // sending the change event on datepicker
            element.dispatchEvent(new Event('change'));
        }, datepicker, newDate);

        
        const titleHandle = await page.$('#title');
        const titleText = await titleHandle.evaluate(el => el.textContent);

        expect(titleText).toBe(newDateStr);
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
        page.once('dialog', async dialog => {
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
    // await editorHandle.click({ clickCount: 3 }); 
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace'); // Delete all selected text

    const editorContentAfterDeletion = await page.$eval('#markdown-editor', el => el.value);
    expect(editorContentAfterDeletion).toBe("");
}, 20000);


it('Reloading Bug Tracker ', async () => {
    let datepicker = await page.$('#datepicker');
        const newDate = '2024-03-05';        
        await page.evaluate((element, date) => {
            element.value = date;
            element.dispatchEvent(new Event('change'));
        }, datepicker, newDate);

    
        // Wait for the editor to be available
        await page.waitForSelector('#bug-tracker');
        let editorHandle = await page.$('#bug-tracker');
    
        // Click on the editor to focus it
        await editorHandle.click();
    
        // Content to be typed into the editor
        const bugTrackerContent = 'End to end testing bug fixed in dev-journal-test branch';
        await page.keyboard.type(bugTrackerContent);
    
        const buttonHandle = await page.$('.save-button');
        // Click the save button
        page.once('dialog', async dialog => {
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
    

        editorHandle = await page.$('#bug-tracker');
        await editorHandle.click();
    
        // Evaluate the content of the editor to check if it matches the inserted content
        const editorContent = await page.evaluate(element => element.value, editorHandle);
    
        // Expect the editor content to be the inserted content
        expect(editorContent).toBe(bugTrackerContent); 
}, 20000);


it('Reloading Learnings', async () => {
   // set date
   let datepicker = await page.$('#datepicker');
   const newDate = '2024-07-12';        
   await page.evaluate((element, date) => {
       element.value = date;
       element.dispatchEvent(new Event('change'));
   }, datepicker, newDate);


   // Wait for the editor to be available
   await page.waitForSelector('#learnings');
   let editorHandle = await page.$('#learnings');

   // Click on the editor to focus it
   await editorHandle.click();

   // Content to be typed into the editor
   const learningsContent = 'Today I learned how to end-to-end test with puppeteer';
   await page.keyboard.type(learningsContent);

   const buttonHandle = await page.$('.save-button');
   // Click the save button
   page.once('dialog', async dialog => {
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


   editorHandle = await page.$('#learnings');
   await editorHandle.click();

   // Evaluate the content of the editor to check if it matches the inserted content
   const editorContent = await page.evaluate(element => element.value, editorHandle);

   // Expect the editor content to be the inserted content
   expect(editorContent).toBe(learningsContent); 
}, 20000);


it('Reloading Markdown ', async () => {
        // set date
        let datepicker = await page.$('#datepicker');
        const newDate = '2024-02-01';        
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
        const markdownContent = 'This is some sample content, this should be here after \nreloading';
        await page.keyboard.type(markdownContent);
    
        const buttonHandle = await page.$('.save-button');
        // Click the save button
        page.once('dialog', async dialog => {
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

it('Testing button icons color after clicking', async() => {
    let datepicker = await page.$('#datepicker');
    const newDate = '2024-09-28';        
    await page.evaluate((element, date) => {
        element.value = date;
        element.dispatchEvent(new Event('change'));
    }, datepicker, newDate);

    //get the background color before being clicked (should all be the same color, so I'm only grabbing the color from one button)
    const backgroundColorElement = await page.$('label[for="documentationCheckbox"]');
    
    const initialBGColor = await page.evaluateHandle(element => {
        // Use getComputedStyle to get the computed style
        const computedColor = window.getComputedStyle(element);
        return computedColor.backgroundColor;
      }, backgroundColorElement);

    //get all of the buttons
    const documentationButton = await page.$('label[for="documentationCheckbox"]');
    const codingButton = await page.$('label[for="codingCheckbox"]');
    const discussionButton = await page.$('label[for="discussionCheckbox"]');
    const testingButton = await page.$('label[for="debuggingCheckbox"]');

    //click all of the buttons
    await documentationButton.click();
    await codingButton.click();
    await discussionButton.click();
    await testingButton.click();

    //get the background color for the buttons after they're checked
    const documentationColor = await page.evaluateHandle(element => {
        // Use getComputedStyle to get the computed style
        const computedColor = window.getComputedStyle(element);
        return computedColor.backgroundColor;
      }, documentationButton);

    const codingColor = await page.evaluateHandle(element => {
        // Use getComputedStyle to get the computed style
        const computedColor = window.getComputedStyle(element);
        return computedColor.backgroundColor;
    }, codingButton);

    const discussionColor = await page.evaluateHandle(element => {
        // Use getComputedStyle to get the computed style
        const computedColor = window.getComputedStyle(element);
        return computedColor.backgroundColor;
    }, discussionButton);

    const testingColor = await page.evaluateHandle(element => {
        // Use getComputedStyle to get the computed style
        const computedColor = window.getComputedStyle(element);
        return computedColor.backgroundColor;
    }, testingButton);

    //Expect current bg color to be different from initial
    expect(documentationColor).not.toBe(initialBGColor);
    expect(codingColor).not.toBe(initialBGColor);
    expect(testingColor).not.toBe(initialBGColor);
    expect(discussionColor).not.toBe(initialBGColor);

}, 20000) 
});
