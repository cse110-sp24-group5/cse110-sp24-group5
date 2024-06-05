document.addEventListener('DOMContentLoaded', function () {
  // Ensure infoBtn, infoBox, and closeBtn exist before adding event listeners
  var infoBtn = document.getElementById('infoBtn');
  var infoBox = document.getElementById('infoBox');
  var closeBtn = document.getElementById('closeBtn');

  if (infoBtn && infoBox && closeBtn) {
    infoBtn.addEventListener('click', function () {
      infoBox.style.display = 'block';
    });
    closeBtn.addEventListener('click', function () {
      infoBox.style.display = 'none';
    });
    // Close the info box if the user clicks outside of it
    window.onclick = function (event) {
      if (event.target != infoBox && event.target != infoBtn && event.target != closeBtn) {
        infoBox.style.display = 'none';
      }
    };
  }
  // Ensure terminal elements exist before adding event listeners
  const terminal = document.getElementById('terminal');
  const terminalInput = document.getElementById('terminal-input');
  const terminalContent = document.getElementById('terminal-content');
  const terminalClose = document.getElementById('terminal-close');

  if (terminal && terminalInput && terminalContent && terminalClose) {
    function toggleTerminal() {
      terminal.classList.toggle('hidden');
      if (!terminal.classList.contains('hidden')) {
        terminalInput.focus();
      }
    }

    document.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.key === '/') {
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
      // regexes for commands
      const regexCalendarCD = /cd calendar/i;
      const regexDevJournal = /dev-journal/i;
      if (regexCalendarCD.test(command)) {
        window.location.href = 'calendar.html';
      } else if (regexDevJournal.test(command)) {
        window.location.href = 'dev-journal.html';
      } else {
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
        

        // Regex for changing the directory (going back to the homepage)
        const regexCD = /cd \.\./i;
        // Regex for the tasklist commands
        const regexTaskList = /.* [dea]$/;
        if (regexCD.test(command)) {
          // "cd .." - back to home, case insensitive
          window.location.href = 'index.html';
        } else if (regexTaskList.test(command)) {
          // Check if the last char is a d, e, or a
          const lastChar = command.charAt(command.length - 1);
          const taskName = command.substring(0, command.length - 2);
          const dateElement = document.getElementById('date');
          const dateText = dateElement.textContent;
          // Get all the tasks for the specified date
          const tasksForDate = getTasksForDate(dateText);

          // Then loop through all of the tasks for that specific date
          for (const task of tasksForDate) {
            if (task.titleText == taskName) {
              if (lastChar == 'd' || lastChar == 'D') {
                handleDeleteShortcut(task);
              } else if (lastChar == 'e' || lastChar == 'E') {
                handleEditShortcut(task);
              }
            }
          }
        } else if (command.trim() == 'a' || command.trim() == 'A'){
          // Add task
          handleAddShortcut();
        } else {
          terminalContent.textContent += `\nCommand not recognized: ${command}`;
        }
      }

      function handleEditShortcut(task) {
        const daySelectionHidden = document.querySelector('.task-list.parent.hidden');
        if (daySelectionHidden){
          terminalContent.textContent += `\nSelect a day to add/edit/delete!`;
          return;
        }

        const dateElement = document.getElementById('date');
        const dateText = dateElement.textContent;
        const tasksForDate = getTasksForDate(dateText);
   
        if (tasksForDate.length > 0) {
          handleEditButtonClick(task);
        }
      }
  
      function handleDeleteShortcut(task) {

        const daySelectionHidden = document.querySelector('.task-list.parent.hidden');
        if (daySelectionHidden){
          terminalContent.textContent += `\nSelect a day to add/edit/delete!`;
          return;
        }

        const dateElement = document.getElementById('date');
        const dateText = dateElement.textContent;
        const tasksForDate = getTasksForDate(dateText);  

        if (tasksForDate.length > 0) {
          handleDeleteButtonClick(task);
        }
      }
      
      function handleAddShortcut(){
        const daySelectionHidden = document.querySelector('.task-list.parent.hidden');
        if (daySelectionHidden){
          terminalContent.textContent += `\nSelect a day to add/edit/delete!`;
          return;
        }
        handleAddTaskButtonClick();
      }
    }
    function handleDevJournalCommands(command) {
      // Add logic for dev journal page commands
      terminalContent.textContent += `\nDev Journal Page command executed: ${command}`;
      // Defining all regular expressions here
      const regexCD = /cd \.\./i;
      const regexBug = /bug/i;
      const regexDisc = /com/i;
      const regexCode = /code/i;
      const regexDoc = /doc/i;
      const regexClear = /clear/i;
      if (regexCD.test(command)) {
        window.location.href = 'index.html';
      } else if (regexBug.test(command)) {
        toggleCheckbox('debuggingCheckbox');
      } else if (regexDisc.test(command)) {
        toggleCheckbox('discussionCheckbox');
      } else if (regexCode.test(command)) {
        toggleCheckbox('codingCheckbox');
      } else if (regexDoc.test(command)) {
        toggleCheckbox('documentationCheckbox');
      } else if (regexClear.test(command)) {
        terminalContent.textContent = '';
      } else if (command === 'md p' || command === 'MD P') {
        showPreview();
      } else if (command === 'md e' || command === 'MD E') {
        showEditor();
      } else if (command === 's' || command === 'S') {
        saveData();
      } else if (command === 'b' || command === 'B') {
        showBug();
      } else if (command === 'l' || command === 'L') {
        showLearnings();
      } else {
        terminalContent.textContent += `\nCommand not recognized`;
      }
    }

  }
});