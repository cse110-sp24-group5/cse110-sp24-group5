window.addEventListener('DOMContentLoaded', init);

function init () {
    const prevMonthButton = document.querySelector('.prev-month'); // Left arrow button
    const nextMonthButton = document.querySelector('.next-month'); // Right arrow button
    const monthYearText = document.querySelector('.month-year'); // Current month and year header text
    const daysContainer = document.querySelector('.days'); // Container to store days

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
        monthYearText.textContent = `${month.toUpperCase()} ${year}`;
        
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
            daysContainer.appendChild(emptyDay);
        }
        
        // Create calendar days
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('li');
            day.textContent = i;
            daysContainer.appendChild(day);
        }

        // Insert blank spaces at the end to fill out the month
        const daysToFill = (7 - (lastDayOfMonth + 1)) % 7;
        for (let i = 0; i <  daysToFill; i++) {
            const emptyDay = document.createElement('li');
            emptyDay.textContent = '';
            daysContainer.appendChild(emptyDay);
        }
    }

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