/* marked */

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
function setFields() {
    
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
        loadData();
    });
}

/**
 * Sets up the inner HTML of the preview to be the parsed version of markdown
 * and displays the preview <div>
 */
function showPreview(){
    console.log("show preview")
    const input = document.querySelector('.editor');
    // eslint-disable-next-line no-undef
    const html = marked.parse(input.value);

    // show the preview
    const markdownPreview = document.getElementById('markdown-preview');
    markdownPreview.innerHTML = html;
    markdownPreview.style.display = 'block' // what to put here
}

/**
 * Hides the <div> for the preview which should be on top of the editor.
 */
function showEditor(){
    // hide the preview
    console.log('in show editor')
    const markdownPreview = document.getElementById('markdown-preview');
    markdownPreview.style.display = 'none';
}

/**
 * Saves data to local storage in the following format
 * 
 * date1 : {    
        "markdownEditor": "Markdown content for date",
        "roleFulfilled": {
            "documentation": true/false,
            "coding": true/false,
            "discussion": true/false,
            "debugging": true/false
        },
        "bugTracker": "Bug tracker content for date1",
        "reflections": "Reflections content for date1"
    }

    The date1 is of form YYYY-MM-DD
 */
function saveData() {
    const currentDate = document.getElementById('datepicker').value;
    const markdownEditor = document.getElementById('markdown-editor').value;
    const roleFulfilled = {
        documentation: document.getElementById('documentationCheckbox').checked,
        coding: document.getElementById('codingCheckbox').checked,
        discussion: document.getElementById('discussionCheckbox').checked,
        debugging: document.getElementById('debuggingCheckbox').checked
    };
    const bugTracker = document.getElementById('bug-tracker').value;
    const reflections = document.getElementById('learnings').value;

    // Create an object to store the data
    const data = {
        markdownEditor: markdownEditor,
        roleFulfilled: roleFulfilled,
        bugTracker: bugTracker,
        reflections: reflections
    };

    // Convert the data object to JSON
    const jsonData = JSON.stringify(data);

    // Save the JSON data to local storage with the current date as the key
    if (localStorage) {
        localStorage.setItem(currentDate, jsonData);
        alert("Data saved successfully!");
    } else {
        alert("Local storage is not supported on this browser. Can not save data!");
    }
}

/**
 * Loads data from local storage and pre-fills pages on the dev journal based on that
 */
function loadData() {
    const currentDate = document.getElementById('datepicker').value;

    if (!localStorage) {
        alert("Local storage is not supported on this browser. Data cannot be loaded.");
    }

    const jsonData = localStorage.getItem(currentDate);

    if (!jsonData) {
        // set to default - empty strings and unselected
        document.getElementById('markdown-editor').value = '';
        document.getElementById('documentationCheckbox').checked = false;
        document.getElementById('codingCheckbox').checked = false;
        document.getElementById('discussionCheckbox').checked = false;
        document.getElementById('debuggingCheckbox').checked = false;
        document.getElementById('bug-tracker').value = '';
        document.getElementById('learnings').value = '';
        return;
    }
    const data = JSON.parse(jsonData);

    // Set values from data object to corresponding elements
    document.getElementById('markdown-editor').value = data.markdownEditor;
    document.getElementById('documentationCheckbox').checked = data.roleFulfilled.documentation;
    document.getElementById('codingCheckbox').checked = data.roleFulfilled.coding;
    document.getElementById('discussionCheckbox').checked = data.roleFulfilled.discussion;
    document.getElementById('debuggingCheckbox').checked = data.roleFulfilled.debugging;
    document.getElementById('bug-tracker').value = data.bugTracker;
    document.getElementById('learnings').value = data.reflections;

}

/**
 * Fields are set, saved data is loaded in when upon DOMContentLoaded
 */
function load(){
    // set the title and other input fields to contents of localStorage
    setFields();
    loadData();

    // show or hide preview based on button clicks
    const editorButton = document.querySelector('.editor-button');
    const previewButton = document.querySelector('.preview-button');
    editorButton.addEventListener('click', showEditor);
    previewButton.addEventListener('click', showPreview);

    const saveButton = document.querySelector('.save-button');
    saveButton.addEventListener('click', saveData);
}



document.addEventListener("DOMContentLoaded", load);



/**
 * Open the Small Terminal using crtl + /
 */
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === '/') {
        toggleTerminal();
    }
});

function toggleTerminal() {
    const terminal = document.getElementById('terminal');
    if (terminal.style.display === 'none' || terminal.style.display === '') {
        terminal.style.display = 'flex';
        document.getElementById('terminal-input').focus();
    } else {
        terminal.style.display = 'none';
    }
}