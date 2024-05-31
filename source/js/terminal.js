// terminal.js
document.addEventListener('DOMContentLoaded', function () {
    const terminal = document.getElementById('terminal');
    const terminalInput = document.getElementById('terminal-input');
    const terminalContent = document.getElementById('terminal-content');
    const terminalClose = document.getElementById('terminal-close');
  
    function toggleTerminal() {
      terminal.classList.toggle('hidden');
      if (!terminal.classList.contains('hidden')) {
        terminalInput.focus();
      }
    }
  
    document.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.key === '/') {
        console.log('toggle terminal')
        event.preventDefault();
        toggleTerminal();
      }
      if (!terminal.classList.contains('hidden') && event.key === 'q') {
        terminal.classList.add('hidden');
      }
    });
  
    terminalClose.addEventListener('click', function () {
      terminal.classList.add('hidden');
    });
  
    terminalInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        const command = terminalInput.value;
        terminalInput.value = '';
        terminalContent.textContent += `\n$ ${command}`;
        terminalContent.scrollTop = terminalContent.scrollHeight;
  
        // Execute different commands based on the current page
        const currentPage = document.body.getAttribute('data-page');
        switch (currentPage) {
          case 'home':
            handleHomeCommands(command);
            break;
          case 'calendar':
            handleCalendarCommands(command);
            break;
          case 'dev-journal':
            handleDevJournalCommands(command);
            break;
          default:
            terminalContent.textContent += `\nUnknown page`;
        }
      }
    });
  
    // Functions to handle commands for different pages
    function handleHomeCommands(command) {
      // Add logic for home page commands
      terminalContent.textContent += `\nHome Page command executed: ${command}`;

      // "cd calendar
      switch(command) {
        case 'cd calendar':
          window.location.href = 'calendar.html'
          break;
        case 'cd dev-journal':
          window.location.href = 'dev-journal.html'
          break;
        default:
          terminalContent.textContent += `\nCommand not recognized`;
      }

    }
  
    function handleCalendarCommands(command) {
        // Add logic for calendar page commands
        terminalContent.textContent += `\nCalendar Page command executed: ${command}`;

        // Terminal for day number followed by Enter key
        let currentDate = new Date(); // Define today's current timestamp
        // Check if the input is in the format MM/YYYY
        const input = command.trim(); // Trim input to remove any extra spaces
        const dateRegex = /^(\d{2})\/(\d{4})$/;
        if (dateRegex.test(input)) {
            const [, month, year] = input.match(dateRegex).map(Number);
            const newDate = new Date(year, month - 1); // Create a new date object for the specified month and year

            // Validate the new date
            if (!isNaN(newDate.getTime())) {
                currentDate = newDate; // Update currentDate to the new date
                renderCalendar(currentDate); // Render the calendar for the new month and year
            }
        } else if (parseInt(command) >= 1 && parseInt(command) <= 31) { // Otherwise, the date is just an integer so we can use 1-31 to select the day

            // Check if the input is a single day number (e.g., 1-31)
            const dayNumber = parseInt(command); // Getting the integer value from the terminal input
            if (dayNumber >= 1 && dayNumber <= 31) {
                const dayElements = document.querySelectorAll('.days li span'); // Select all day elements (spans inside list items) in the calendar
                
                // Get the total number of days in the current month
                // new Date(year, month + 1, 0) gets the last day of the current month
                const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

                // Check if there are day elements and if the day number is within the range of days in the month
                if (dayElements.length > 0 && dayNumber <= daysInMonth) {
                    dayElements[dayNumber - 1].click(); // Simulate a click on the day element (subtract 1 due to zero indexing)
                }
            }
        } else {

        // "cd .." - back to home
         switch(command) {
          case 'cd ..' || 'cd dashboard':
            window.location.href = 'index.html'
            break;
          case 'clear': //Clear the terminal
            terminalContent.textContent = '';
            break;
          default:
            terminalContent.textContent += `\nCommand not recognized`;
        }
      }

        
    }
  
    function handleDevJournalCommands(command) {
        // Add logic for dev journal page commands
        terminalContent.textContent += `\nDev Journal Page command executed: ${command}`;

        // "cd .." - back to home
        switch(command) {
          case 'cd ..' || 'cd dashboard':
            window.location.href = 'index.html';
            break;
          case 'cd calendar':
            window.location.href = 'calendar.html';
            break;
          case 'md p': // Preview
            showPreview();
            break;
          case 'md e': // Edit
            showEditor();
            break;
          case 'md s': // Save
            saveData(); 
            break;
          case 'b': //Bug
            showBug(); 
            break;
          case 'l': // Learnings  
            showLearnings();
            break;
          case 'bug': //Check the bug role
            toggleCheckbox('debuggingCheckbox');
            break;
          case 'com': //Check the communication role
            toggleCheckbox('discussionCheckbox');
            break;
          case 'code': //Check the code role
            toggleCheckbox('codingCheckbox');
            break;
          case 'doc': //Check the documentation role
            toggleCheckbox('documentationCheckbox');
            break;
          case 'debug':
            toggleCheckbox('debuggingCheckbox');
            break;
          case 'clear': //Clear the terminal
            terminalContent.textContent = '';
            break;
          default:
            terminalContent.textContent += `\nCommand not recognized`;
        }
        // other commands for page
    }
  });
  