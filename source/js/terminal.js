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

    // Will handle all possible calendar commands
    function handleCalendarCommands(command) {
      terminalContent.textContent += `\nCalendar Page command executed: ${command}`;
      
      let currentDate = new Date(); 
      const input = command.trim(); 
      const dateRegex = /^(\d{2})\/(\d{4})$/;

      // Checks whether terminal input is in MM/YYYY or DD format or something else
      if (dateRegex.test(input)) {
        monthYearFormat(input);
      } else if (parseInt(command) >= 1 && parseInt(command) <= 31) {
        dayFormat(command);
      } else {
        handleOtherCommands();
      }

      // Given MM/YYYY format, exceutes neccessary commands
      function monthYearFormat(input) {
        const [, month, year] = input.match(dateRegex).map(Number);
        const newDate = new Date(year, month - 1); 
        if (!isNaN(newDate.getTime())) {
          // Update currentDate to the new date
          currentDate = newDate; 
          // Render the calendar for the new month and year
          renderCalendar(currentDate); 
        }
      }

      // Given DD format, executes neccessary commands
      function dayFormat(command) {
        const dayNumber = parseInt(command);
        if (dayNumber >= 1 && dayNumber <= 31) {
          const dayElements = document.querySelectorAll('.days li span'); 
          // new Date(year, month + 1, 0) gets the last day of the current month
          const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
          if (dayElements.length > 0 && dayNumber <= daysInMonth) {
            // Simulate a click on the day element (subtract 1 due to zero indexing)
            dayElements[dayNumber - 1].click(); 
          }
        }
      }

      // Handles cd or taskList commands
      function handleOtherCommands(){
        const regexCD = /cd \.\./i;
        const regexTaskList = /.* [dea]$/;

        // Checks whether user wants to go back to homepage or edit taskList
        if (regexCD.test(command)) {
          window.location.href = 'index.html';
        } else if (regexTaskList.test(command)) {
          goToTaskList(command);
        } else {
          terminalContent.textContent += `\nCommand not recognized: ${command}`;
        }
      }

      // Excecutes when given a taskList command
      function goToTaskList(command) {
        // Check if the last char is a d, e, or a
        const lastChar = command.charAt(command.length - 1);
        const taskName = command.substring(0, command.length - 2);
        // Get specified date
        const dateElement = document.getElementById('date');
        const dateText = dateElement.textContent;
        // Get all the tasks for the specified date
        const tasksForDate = getTasksForDate(dateText);
        // Will execute given taskList command on the specified taskName
        findTask(tasksForDate, taskName, lastChar);
      }

      // Finds specific task given date and will execute the delete or edit command
      function findTask(tasksForDate, taskName, lastChar){
        const allTasks = tasksForDate.find(task => task.titleText == taskName);
        if(allTasks){
          if (lastChar == 'd') {
            handleDeleteShortcut(task);
          } else if (lastChar == 'e') {
            handleEditShortcut(task);
          }
        }
      }

      // If 'taskname e' is inputted, these commands will execute
      function handleEditShortcut(task) {
        const dateElement = document.getElementById('date');
        const dateText = dateElement.textContent;
        const tasksForDate = getTasksForDate(dateText);

        if (tasksForDate.length > 0) {
          handleEditButtonClick(task);
        }
      }

      // If 'taskname d' is inputted, these commands will execute
      function handleDeleteShortcut(task) {
        const dateElement = document.getElementById('date');
        const dateText = dateElement.textContent;
        const tasksForDate = getTasksForDate(dateText);

        if (tasksForDate.length > 0) {
          handleDeleteButtonClick(task);
        }
      }
    }

      /*
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
              if (lastChar == 'd') {
                handleDeleteShortcut(task);
              } else if (lastChar == 'e') {
                handleEditShortcut(task);
              }
            }
          }
        } else {
          terminalContent.textContent += `\nCommand not recognized: ${command}`;
        }
      } */

    // Locate what markdown command is in commandList and executes corresponding function
    function markdownExecute(command, commandList) {
      if (command === commandList.get('showPreview')) {
        showPreview();
      } else if (command === commandList.get('showEditor')) {
        showEditor();
      } else if (command === commandList.get('saveData')) {
        saveData();
      } else if (command === commandList.get('showBug')) {
        showBug();
      } else if (command === commandList.get('showLearnings')) {
        showLearnings();
      } 
    }

    // Locate what devJournal command is in commandList and executes corresponding function
    function devJournalExecute(command, commandList) {
      if (commandList.get('regexCD').test(command)) {
        window.location.href = 'index.html';
      } else if (commandList.get('regexBug').test(command)) {
        toggleCheckbox('debuggingCheckbox');
      } else if (commandList.get('regexDisc').test(command)) {
        toggleCheckbox('discussionCheckbox');
      } else if (commandList.get('regexCode').test(command)) {
        toggleCheckbox('codingCheckbox');
      } else if (commandList.get('regexDoc').test(command)) {
        toggleCheckbox('documentationCheckbox');
      } else if (commandList.get('regexClear').test(command)) {
        terminalContent.textContent = '';
      }
    }

    // Checks to see if map contains the value
    function hasValue(map, value) {
      for (let val of map.values()) {
        // handles the case of regular expression
        if (val instanceof RegExp) {
          if (val.test(value)) {
            return true;
          }
        } 
        // handles the case of strings
        else if (val === value) {
          return true;
        }
      }
      return false;
    }

    // Add logic for dev journal page commands
    function handleDevJournalCommands(command) {
      terminalContent.textContent += `\nDev Journal Page command executed: ${command}`;
      
      // Defining all regular expressions for the devjournal here
      const devJournalCommands = new Map ([
        ['regexCD', /cd \.\./i],
        ['regexBug', /bug/i],
        ['regexDisc', /com/i],
        ['regexCode', /code/i],
        ['regexDoc', /doc/i],
        ['regexClear', /clear/i]
      ]);

      // Defining all regular commmands for markdown here
      const markdownCommands = new Map ([
        ['showPreview', 'md p'],
        ['showEditor', 'md e'],
        ['saveData', 's'],
        ['showBug', 'b'],
        ['showLearnings','l'],
      ]);
      
      const lowerCaseCommand = command.toLowerCase();
      // the command is for markdown
      if (hasValue(markdownCommands, lowerCaseCommand)) {
        markdownExecute(lowerCaseCommand, markdownCommands);
        terminalContent.textContent += `\nenter mdcmd ${command}`;
        
      }
      // The command is for devJournal
      if (hasValue(devJournalCommands, command)) {
        devJournalExecute(command, devJournalCommands);
        terminalContent.textContent += `\nenter dvcmd ${command}`;
      }
      // The command does not exist
      if (!hasValue(devJournalCommands,lowerCaseCommand) && !hasValue(markdownCommands, lowerCaseCommand)) {
        terminalContent.textContent += `\nCommand not recognized`;
      }
    }

    /* Broke this function into three different functions */
    /* function handleDevJournalCommands(command) {
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
    } */
  }
});