describe('Dev Journal test suite', () => {
    //Start by visiting the dev-journal part of our webapp
    beforeAll(async () => {
        await page.goto('https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/dev-journal');
    });

    //for the tests here are some of the things that we need to do

    //click on the markdown file, input some text

    //click preview, see if the text appears correctly

    //press save and check if everything is saved correctly

    //click on some of the roles fulfilled

    it('Check some of the role icons on the screen', async () => {
        //first grab two icons
        const discussionIcon = await page.$('#discussionCheckbox');
        const documentationIcon = await page.$('#documentationCheckbox');

        //now click on the two icons
        await discussionIcon.click();
        await documentationIcon.click();

        //check if they are both highlighted in the proper color
        const isHighlightedDiscussion = await page.$eval('#discussionCheckbox', (elem) => {
            return window.getComputedStyle(elem).backgroundColor;
        });
        const isHighlightedDocumentation = await page.$eval('#documentationCheckbox', (elem) => {
            return window.getComputedStyle(elem).backgroundColor;
        });
        
        expect(isHighlightedDiscussion).toBe('#ccc');
        expect(isHighlightedDocumentation).toBe('#ccc');
    });

    //enter text on the bug tracker and learnings and check if that's saved

});