window.addEventListener('DOMContentLoaded', init);

function init () {
    const prevMonthButton = document.querySelector('.prev-month'); // Left arrow button
    const nextMonthButton = document.querySelector('.next-month'); // Right arrow button
    const monthYearText = document.querySelector('.month-year'); // Current month and year header text
    const daysContainer = document.querySelector('.days'); // Container to store days
    const taskList = document.querySelector('.task-list.parent');
    const closeTaskList = document.getElementById('close-task-list');

    let currentDate = new Date(); // Define today's current timestamp
    
    /**
     * Render the calendar for the specified date
     * @param {Date} date - The date to render the calendar for.
     */
    function renderCalendar(date) {
        // Obtain the month (and convert month to string) and year from the date passed in
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        
        // Update month and year text content within the header
        monthYearText.textContent = `${month} ${year}`;

        // Clear any previous calendar days
        daysContainer.innerHTML = '';
        
        // Get day of the week for the first day of the month
        const firstDayOfMonth = new Date(year, date.getMonth(), 1).getDay();
        // Get the total number of days inside a given month
        const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();
        // Get day of the week for the last day of the month
        const lastDayOfMonth = new Date(year, date.getMonth() + 1, 0).getDay();
        
        // Insert blank spaces at the beginning to align days properly
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('li');
            emptyDay.textContent = '';
            emptyDay.classList.add('blank-day'); // Add class to empty days
            daysContainer.appendChild(emptyDay);
        }
        
        // Create calendar days
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('li');
            const dayNumber = document.createElement('span'); // Create a span for the day number to access when highlighting selected day
            if (i >= 1 && i <= 9) { // Need to add a space in front of single digits so background when clicking is circular and not an oval
                dayNumber.textContent = '0' + i;
            } else {
                dayNumber.textContent = i;
            }
            day.appendChild(dayNumber); // Append the span to the list item so it is contained within it

            day.addEventListener('click', () => {
                showTaskListPopUp(`${month} ${i}, ${year}`);
            });

            // will display user's chosen sentiment on current day in the calendar
            const monthNum = currentDate.getMonth() + 1;
            let renderedFormattedDate = `${year}-${monthNum < 10 ? '0' + monthNum : monthNum}-${i < 10 ? '0' + i : i}`;
            let currentImgSrc = localStorage.getItem(renderedFormattedDate);
  
            // if there exists an img in localStorage for the current date being rendered the user's sentiment will be displayed
            if(currentImgSrc ){
                let img = document.createElement('img');
                img.src = currentImgSrc;
                img.alt = `${renderedFormattedDate}`;
                img.classList.add('calendar-sentiment'); // gives the class name calendar-sentiment to the added emoji
                day.appendChild(img);
                
            }
            daysContainer.appendChild(day);
        }

        // Insert blank spaces at the end to fill out the month
        const daysToFill = (7 - (lastDayOfMonth + 1)) % 7;
        for (let i = 0; i <  daysToFill; i++) {
            const emptyDay = document.createElement('li'); // gives the class name calendar-sentiment to the added emoji
            emptyDay.textContent = '';
            emptyDay.classList.add('blank-day'); // Add class to empty days
            daysContainer.appendChild(emptyDay);
        }

        // Add event listener to each calendar day
        const calendarDays = document.querySelectorAll('li');
        for (let i = 0; i < calendarDays.length; i++) {
            let day = calendarDays[i];
            day.addEventListener('click', (event) => {
                // Remove 'selected' class from previously selected day
                const selectedDay = document.querySelector('.selected');
                if (selectedDay) {
                    selectedDay.classList.remove('selected');
                }
                // Toggle the selected class to show/hide the pink border on the newly selected day
                const dayNumber = event.currentTarget.querySelector('span');
                dayNumber.classList.add('selected');
               
            });
        }
    }

//finished adding over here//
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    // Function to show the overlay
    function showOverlay() {
        overlay.classList.add('active');
    }

    // Function to hide the overlay
    function hideOverlay() {
        overlay.classList.remove('active');
    }

    function showTaskListPopUp(date) {
        showOverlay();
        const dateElement = document.getElementById('date');
        dateElement.textContent = date;
        taskList.classList.remove('hidden');
    }

    function hideTaskListPopUp() {
        hideOverlay();
        taskList.classList.add('hidden');
    }

    closeTaskList.addEventListener('click', hideTaskListPopUp);

    // Render the calendar for a the specified date
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

};