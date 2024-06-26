// dev-journal.js

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

//Flag to catch if there is any change in the Dev-Journal
let isChanged = false;

/* This function is to check if the user made any changes in the Dev-Journal or not */
function markChanged() {
    // Check if any text boxes are non-empty
    const markdownEditor = document.getElementById('markdown-editor');
    const bugTracker = document.getElementById('bug-tracker');
    const learnings = document.getElementById('learnings');
    
    const isTextChanged = markdownEditor.value.trim() !== '' ||
                          bugTracker.value.trim() !== '' ||
                          learnings.value.trim() !== '';

    // Check if any checkboxes are selected
    const documentationCheckbox = document.getElementById('documentationCheckbox');
    const codingCheckbox = document.getElementById('codingCheckbox');
    const discussionCheckbox = document.getElementById('discussionCheckbox');
    const debuggingCheckbox = document.getElementById('debuggingCheckbox');
    
    const isCheckboxChanged = documentationCheckbox.checked ||
                              codingCheckbox.checked ||
                              discussionCheckbox.checked ||
                              debuggingCheckbox.checked;

    // Set isChanged to true only if there are changes
    if (isTextChanged || isCheckboxChanged) {
        isChanged = true;
    } else {
        isChanged = false;
    }
}

function setupUnsavedChangesWarning() {
    // Mark fields as changed when content is modified
    document.getElementById('markdown-editor').addEventListener('input', markChanged);
    document.getElementById('bug-tracker').addEventListener('input', markChanged);
    document.getElementById('learnings').addEventListener('input', markChanged);
    document.getElementById('documentationCheckbox').addEventListener('change', markChanged);
    document.getElementById('codingCheckbox').addEventListener('change', markChanged);
    document.getElementById('discussionCheckbox').addEventListener('change', markChanged);
    document.getElementById('debuggingCheckbox').addEventListener('change', markChanged);

    // Handle the beforeunload event(load the page)
    window.addEventListener('beforeunload', function(event) {
        if (isChanged) {
            event.preventDefault(); // Prevents the default action
            event.returnValue = ''; // Necessary for modern browsers to display the prompt
        }
    });

    // Mark changes as saved using the save button
    const saveButton = document.querySelector('.save-button');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            console.log('Save button clicked. Setting isChanged to false.');
            isChanged = false;
        });
    }

    // Mark changes as saved using the terminal
    document.addEventListener('saveFromTerminal', function() {
        isChanged = false;
    });
}

// Initialize the setup function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    setupUnsavedChangesWarning();
});


/**
 * Convert a date string from YYYY-MM-DD format to words without suffix.
 *
 * @param {string} dateStr - The date string in YYYY-MM-DD format.
 * @returns {string} The date in words without suffix.
 */
function convertDateToWords(dateStr) {
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

    const [year, month, day] = dateStr.split('-').map(Number);
    return `${months[month - 1]} ${day}, ${year}`;
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
    title.innerText = convertDateToWords(formattedDate);

    // Event listener to update title when date changes
    datepicker.addEventListener('change', function() {
        let dateValue = new Date(datepicker.value);
        let formattedDate = dateValue.toISOString().split('T')[0];

        title.innerText = convertDateToWords(formattedDate);
        loadData();
    });
}

/**
 * Upon call of the function, the preview of the Markdown will be shown (similar to GitHub functionality)
 */
function showPreview(){
    console.log("show preview")
    const input = document.querySelector('.editor');
    // eslint-disable-next-line no-undef
    const html = marked.parse(input.value);

    // show the preview
    const markdownPreview = document.getElementById('markdown-preview');
    markdownPreview.innerHTML = html;
    markdownPreview.style.display = 'block' 
    const markdownEditor = document.getElementById('markdown-editor');
    markdownEditor.style.display = 'none';
}

/**
 * Hides the <div> for the preview which should be on top of the editor.
 */
function showEditor(){
    // hide the preview
    console.log('in show editor')
    const markdownPreview = document.getElementById('markdown-preview');
    markdownPreview.style.display = 'none';
    const markdownEditor = document.getElementById('markdown-editor');
    markdownEditor.style.display = 'block';
}

/* Put the cursor in the bug editor */
function showBug(){
    // Focus on the bug editor
    const bugTracker = document.getElementById('bug-tracker');
    bugTracker.focus();
}

/* Put the cursor in the learnings editor */
function showLearnings(){
    // Focus on the learnings editor
    const learningsTracker = document.getElementById('learnings');
    learningsTracker.focus();
}

/* Mark the Checkbox of the Roles */
function toggleCheckbox(checkboxId) {
    const checkbox = document.getElementById(checkboxId);
    checkbox.checked = !checkbox.checked;
}

/**
 * Get item from local storage and parse in order to return an object containg the parsed data for all the dates.
 * @returns {Object} Object containing journal objects (specified in the header for the saveData function) associated with dates for which the user has entered data
 */
function getFromLocalStorage() {
    if (!localStorage) {
        alert("Local storage is not supported on this browser. Data cannot be loaded.");
    }

    const jsonData = localStorage.getItem('dev-journal');
    let data = JSON.parse(jsonData);

    if (!data) {
        data = {};
    }

    return data;
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

    let jsonData = getFromLocalStorage();

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

    jsonData[currentDate] = data;

    // Save the JSON data to local storage with the current date as the key
    if (localStorage) {
        localStorage.setItem('dev-journal', JSON.stringify(jsonData));
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

    let data = getFromLocalStorage();

    if (!(currentDate in data)) {
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

    data = data[currentDate];

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
function init() {
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

    let terminalState = localStorage.getItem('terminalState');
        // checks if terminal was previously opened on another page and if so it toggles it on
        if(terminalState == 'open') {
            toggleTerminal(true);
        }
}

document.addEventListener("DOMContentLoaded", init);