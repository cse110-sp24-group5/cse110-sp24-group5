// calendar.js

/**
* Render the calendar for the given date.
* @param {Date} date - The date for which to render the calendar.
*/
function renderCalendar(date) {
    const monthYearText = document.querySelector('.month-year'); // Current month and year header text
    const daysContainer = document.querySelector('.days'); // Container to store days
   
    updateMonthYearText(date, monthYearText); // Update the month and year text content within the header
    clearPreviousDays(daysContainer); // Clear any previous calendar days
    const { firstDayOfMonth, daysInMonth, lastDayOfMonth } = getMonthDetails(date); // Get month details
    insertBlankSpacesAtStart(firstDayOfMonth, daysContainer); // Insert blank spaces at the beginning to align days properly
    createCalendarDays(date, daysInMonth, daysContainer); // Create calendar days
    insertBlankSpacesAtEnd(lastDayOfMonth, daysContainer); // Insert blank spaces at the end to fill out the month
    settingRowNumber(); // Set the row number for grid in CSS to dynamically change by year
    addDayClickEvents(); // Add click events to each calendar day
 }
 
 window.addEventListener('DOMContentLoaded', init);
 
 function init() {
    const prevMonthButton = document.querySelector('.prev-month'); // Left arrow button
    const nextMonthButton = document.querySelector('.next-month'); // Right arrow button
    const closeTaskList = document.getElementById('close-task-list'); // Close button for the task list pop-up
 
    let currentDate = new Date(); // Define to be the first day of the month initially
    currentDate.setDate(1);
 
    // Render the calendar for the current date
    renderCalendar(currentDate);
 
    // On click of the previous month button, set the date to be the prior month and call render calendar again
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });
 
    // On click of the next month button, set the date to be the next month and call render calendar again
    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
 
    const overlay = createOverlay(); // Create overlay for the task list pop-up
    document.body.appendChild(overlay); // Append the overlay to the body
 
    closeTaskList.addEventListener('click', hideTaskListPopUp); // Close the task list pop-up when the close button is clicked
 
    let terminalState = localStorage.getItem('terminalState');
    // Checks if terminal was previously opened on another page and if so it toggles it on
    if (terminalState == 'open') {
        toggleTerminal(true);
    }
 }
 
 /**
 * Update the month and year text content
 * @param {Date} date - The current date.
 * @param {HTMLElement} monthYearText - Element to display month and year.
 */
 function updateMonthYearText(date, monthYearText) {
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    monthYearText.textContent = `${month} ${year}`; // Set the month and year text
 }
 
 /**
 * Clear any previous calendar days
 * @param {HTMLElement} daysContainer - Element to contain the days.
 */
 function clearPreviousDays(daysContainer) {
    daysContainer.innerHTML = ''; // Clear previous days
 }
 
 /**
 * Get details of the current month
 * @param {Date} date - The current date.
 * @returns {Object} - Object containing first day of the month, days in month, and last day of the month.
 */
function getMonthDetails(date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // First day of the month (0-6, Sun-Sat)
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // Total number of days in the month
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay(); // Last day of the month (0-6, Sun-Sat)
    return { firstDayOfMonth, daysInMonth, lastDayOfMonth };
 }
 
 /**
 * Insert blank spaces at the beginning to align days properly
 * @param {number} firstDayOfMonth - The first day of the month.
 * @param {HTMLElement} daysContainer - Element to contain the days.
 */
 function insertBlankSpacesAtStart(firstDayOfMonth, daysContainer) {
    for (let i = 0; i < firstDayOfMonth; i++) {
        createBlankDay(daysContainer); // Create and append a blank day element
    }
 }

/**
 * Create calendar days
 * @param {Date} date - The current date.
 * @param {number} daysInMonth - Total number of days in the month.
 * @param {HTMLElement} daysContainer - Element to contain the days.
 */
function createCalendarDays(date, daysInMonth, daysContainer) {
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    for (let i = 1; i <= daysInMonth; i++) {
        createCalendarDay(i, month, year, daysContainer, date); // Create and append a calendar day element
    }
}
  
 /**
 * Insert blank spaces at the end to fill out the month
 * @param {number} lastDayOfMonth - The last day of the month.
 * @param {HTMLElement} daysContainer - Element to contain the days.
 */
 function insertBlankSpacesAtEnd(lastDayOfMonth, daysContainer) {
    const daysToFill = (7 - (lastDayOfMonth + 1)) % 7; // Calculate the number of blank spaces needed at the end
    for (let i = 0; i < daysToFill; i++) {
        createBlankDay(daysContainer); // Create and append a blank day element
    }
 }
 
 /**
 * Create a blank day element
 * @param {HTMLElement} daysContainer - Element to contain the days.
 */
 function createBlankDay(daysContainer) {
    const emptyDay = document.createElement('li'); // Create a list item element for the blank day
    emptyDay.textContent = ''; // No text content for blank days
    emptyDay.classList.add('blank-day'); // Add class to style blank days
    daysContainer.appendChild(emptyDay); // Append the blank day element to the container
 }
 
/**
 * Creates a calendar day element and appends it to the days container.
 * @param {number} dayNumber - The day number.
 * @param {string} month - The month name.
 * @param {number} year - The year.
 * @param {HTMLElement} daysContainer - The container to append the day element to.
 * @param {Date} currentDate - The current date for localStorage checks.
 */
function createCalendarDay(dayNumber, month, year, daysContainer, currentDate) {
    const day = document.createElement('li'); // Create a list item element for the day
    const daySpan = document.createElement('span'); // Create a span for the day number
    daySpan.textContent = dayNumber < 10 ? '0' + dayNumber : dayNumber; // Format single digit days with a leading zero
    day.appendChild(daySpan); // Append the span to the list item
    day.setAttribute('tabindex', '0'); // Add tabindex attribute so that we can tab through calendar days

    day.addEventListener('click', () => showTaskListPopUp(`${month} ${dayNumber}, ${year}`)); // Show task list pop-up on day click

    // Display user's chosen sentiment on the current day in the calendar
    const monthNum = currentDate.getMonth() + 1;
    let renderedFormattedDate = `${year}-${monthNum < 10 ? '0' + monthNum : monthNum}-${dayNumber < 10 ? '0' + dayNumber : dayNumber}`;
    let currentImgSrc = localStorage.getItem(renderedFormattedDate);

    // If there exists an img in localStorage for the current date being rendered, the user's sentiment will be displayed
    if (currentImgSrc) {
        let img = document.createElement('img');
        img.src = currentImgSrc;
        img.alt = `${renderedFormattedDate}`;
        img.classList.add('calendar-sentiment'); // Add class name 'calendar-sentiment' to the added emoji
        day.appendChild(img);
    }

    daysContainer.appendChild(day); // Append the day element to the container
}
 
 /**
 * Add click events to each calendar day
 */
 function addDayClickEvents() {
    const calendarDays = document.querySelectorAll('.days li'); // Select all list items within the days container
    calendarDays.forEach(day => {
        day.addEventListener('click', event => {
            const selectedDay = document.querySelector('.selected'); // Find the currently selected day
            if (selectedDay) {
                selectedDay.classList.remove('selected'); // Remove 'selected' class from previously selected day
            }

            // Toggle the 'selected' class to show/hide the pink overlay
            const dayNumber = event.currentTarget.querySelector('span'); // Get the day number span
            dayNumber.classList.add('selected'); // Add 'selected' class to the clicked day number span
        });
        day.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const selectedDay = document.querySelector('.selected');
                if (selectedDay) {
                    selectedDay.classList.remove('selected');
                }

                // Toggle the 'selected' class to show/hide the pink overlay
                const dayNumber = event.currentTarget.querySelector('span'); // Get the day number span
                if (dayNumber !== null) {
                    dayNumber.classList.add('selected'); // Add 'selected' class to the clicked day number span
                }
            }
        });
    });
 }
 
 /**
 * Create the overlay element
 * @returns {HTMLElement} - The overlay element.
 */
 function createOverlay() {
    const overlayDiv = document.createElement('div'); // Create a div element for the overlay
    overlayDiv.classList.add('overlay'); // Add class to style the overlay
    return overlayDiv;
 }
 
 /**
 * Show the task list pop-up
 * @param {string} date - The selected date.
 */
 function showTaskListPopUp(date) {
    showOverlay(); // Show the overlay
    const dateElement = document.getElementById('date'); // Find the date element
    dateElement.textContent = date; // Set the date element text content
    const taskList = document.querySelector('.task-list.parent'); // Find the task list container
    taskList.classList.remove('hidden'); // Show the task list pop-up
    const closeTaskList = document.getElementById('close-task-list'); // Close button for the task list pop-up
    closeTaskList.focus(); // Set focus on close task-list button
 }
 
 /**
 * Hide the task list pop-up
 */
 function hideTaskListPopUp() {
    hideOverlay(); // Hide the overlay
    const taskList = document.querySelector('.task-list.parent'); // Find the task list container
    taskList.classList.add('hidden'); // Hide the task list pop-up
 }
 
 /**
 * Show the overlay
 */
 function showOverlay() {
    const overlay = document.querySelector('.overlay'); // Find the overlay element
    overlay.classList.add('active'); // Add 'active' class to show the overlay
 }
 
 /**
 * Hide the overlay
 */
 function hideOverlay() {
    const overlay = document.querySelector('.overlay'); // Find the overlay element
    overlay.classList.remove('active'); // Remove 'active' class to hide the overlay
 }
 
 /**
  * Set the number of rows needed for blank days for grid in CSS
  */
 function settingRowNumber() {
     /* handling edges cases for where different months need different row numbers */
     const blankDays = document.querySelectorAll('.blank-day');
     if (blankDays.length > 7) {
         document.documentElement.style.setProperty('--number-of-rows', 6); /* handles cases where months had thin extra row */
     } else if (blankDays.length == 0) {
         document.documentElement.style.setProperty('--number-of-rows', 4); /* fixes February bug with extra blank row */
     } else {
         document.documentElement.style.setProperty('--number-of-rows', 5) /* default case for row number within a month */
     }
 }