/**
 * Format the date to be of the form YYYY-MM-DD
 * 
 * @param {Date} dateObject - The Date object
 * @returns {string} The formatted date string in YYYY-MM-DD format
 */
function formatDate(dateObject) {
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1);
    const day = String(dateObject.getDate());
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

/**
 * Set the datepicker and title to the current Date when the page is loaded.
 * When the date on the datepicker changes, the same should be reflected in the title.
 */
function setTitleDate() {
    
    const datepicker = document.getElementById('datepicker');
    const title = document.getElementById('title');

    // Set the title based on the date selected in the datepicker
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    datepicker.value = formattedDate;
    title.innerText = formattedDate;

    // Event listener to update title when date changes
    datepicker.addEventListener('change', function() {
        title.innerText = datepicker.value;
    });
}

function showPreview(markdown_string){
    console.log('in show preview')
    const input = document.querySelector('.editor');
    const html = marked.parse(input.value);

    // show the preview
    const markdownPreview = document.getElementById('markdown-preview');
    markdownPreview.innerHTML = html;
    markdownPreview.style.display = 'block';
}

function showEditor(){
    // hide the preview
    console.log('in show editor')
    const markdownPreview = document.getElementById('markdown-preview');
    markdownPreview.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", setTitleDate());

const editorButton = document.querySelector('.editor-button');
const previewButton = document.querySelector('.preview-button');

editorButton.addEventListener('click', showEditor);
previewButton.addEventListener('click', showPreview);