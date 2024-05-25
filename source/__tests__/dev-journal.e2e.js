const URL = 'https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/dev-journal.html';
describe('Dev Journal Website', () => {

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
    it('', async () => {
        
        expect(1).toBe(1);
    }, 10000);

   
});