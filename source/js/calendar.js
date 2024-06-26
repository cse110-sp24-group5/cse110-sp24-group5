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
}
 
window.addEventListener('DOMContentLoaded', init);
 
function init() {
    const prevMonthButton = document.querySelector('.prev-month'); // Left arrow button
    const nextMonthButton = document.querySelector('.next-month'); // Right arrow button
 
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

    day.addEventListener('click', () => {
        const selectedDay = document.querySelector('.selected'); // Find the currently selected day
        if (selectedDay) {
            selectedDay.classList.remove('selected'); // Remove 'selected' class from previously selected day
        }

        if (daySpan !== null) {
            daySpan.classList.add('selected'); // Add 'selected' class to the clicked day number span
        }
    })

    // Add event listener for 'Enter' key press
    day.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const selectedDay = document.querySelector('.selected'); // Find the currently selected day
            if (selectedDay) {
                selectedDay.classList.remove('selected'); // Remove 'selected' class from previously selected day
            }
    
            if (daySpan !== null) {
                daySpan.classList.add('selected'); // Add 'selected' class to the clicked day number span
            }
        }
    });

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
    //for every single day in the month, construct the date string
        dateString = month + " " + dayNumber + ", " + year;
        //get the tasks for the day using the task string
        const tasksForDate = getTasksForDate(dateString);
        //If the number of tasks for a date are greater than one, then display them
        if(tasksForDate.length > 0) {
        //Create the element that will contain the task count string
        const tasksCountForDate = document.createElement('span');
        //If there is only one task, then you need to have the string read "1 task"
        if(tasksForDate.length == 1) {
            tasksCountForDate.textContent = `${tasksForDate.length} task`;
        }
        else {
            //Else, you have many tasks, so use "x tasks"
            tasksCountForDate.textContent = `${tasksForDate.length} tasks`; // Display the count with text
        }
            //add this new element and append to the day
                tasksCountForDate.classList.add('tasks-count');
                day.appendChild(tasksCountForDate);
        }
    
    daysContainer.appendChild(day); // Append the day element to the container
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