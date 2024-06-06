/**
 * Adds event listeners once the DOM content is loaded.
 * Handles commands for the terminal.
 */
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
  /**
  * Visibility of the terminal is handled here.
  */ 
  if (terminal && terminalInput && terminalContent && terminalClose) {
    function toggleTerminal() {
      terminal.classList.toggle('hidden');
      if (!terminal.classList.contains('hidden')) {
        terminalInput.focus();
      }
    }
    /*
    * Brings up the terminal on Cntrl + /
    */
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
    /*
    * Executes commands based on the current page
    */
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

    /**
     * Handles commands specific to the home page.
     * @param {string} command - The command entered by the user.
     */
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

    /**
     * Handles all possible calendar commands.
     * @param {string} command - The command entered by the user.
     */
    function handleCalendarCommands(command) {
      terminalContent.textContent += `\nCalendar Page command executed: ${command}`;
      const input = command.trim(); 
      const dateRegex = /^(\d{2})\/(\d{4})$/;

      // Checks whether terminal input is in MM/YYYY or DD format or something else
      if (dateRegex.test(input)) {
        monthYearFormat(input, dateRegex);
      } else if (parseInt(command) >= 1 && parseInt(command) <= 31) {
        dayFormat(command);
      } else {
        handleOtherCommands(command);
      }
    }

    /**
     * Executes necessary commands for the given MM/YYYY format.
     * @param {string} input - The trimmed command entered by the user.
     * @param {RegExp} dateRegex - A regular expression for the date
     */
    function monthYearFormat(input, dateRegex) {
      let currentDate = new Date();
      const [, month, year] = input.match(dateRegex).map(Number);
      const newDate = new Date(year, month - 1); 
        if (!isNaN(newDate.getTime())) {
          // Update currentDate to the new date
          currentDate = newDate; 
          // Render the calendar for the new month and year
          renderCalendar(currentDate); 
        }
    }

    /**
     * Executes necessary commands for the given DD format.
     * @param {string} command - The command entered by the user.
     */
    function dayFormat(command) {
      let currentDate = new Date();
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

    /**
     * Handles commands related to cd in the terminal.
    */
    function handleOtherCommands(command){
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

    /**
     * Handles navigation to the task list based on the given command.
     * Handles commands related to adding, deleting and editing a task
     * @param {string} command - The command entered by the user.
    */
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

    /**
      * Finds a specific task given the date and executes the delete or edit command.
      * @param {Array} tasksForDate - The array of tasks for the specified date.
      * @param {string} taskName - The name of the task to find.
      * @param {string} lastChar - The last character of the command indicating the action (delete or edit).
      */
    function findTask(tasksForDate, taskName, lastChar){
      const task = tasksForDate.find(task => task.titleText == taskName);
      if(task){
        if (lastChar == 'd') {
          handleDeleteShortcut(task);
        } else if (lastChar == 'e') {
          handleEditShortcut(task);
        }
      }
    }

    /**
    * Executes the edit command for the specified task.
    * @param {Object} task - The task to be edited.
    */
    function handleEditShortcut(task) {
      const dateElement = document.getElementById('date');
      const dateText = dateElement.textContent;
      const tasksForDate = getTasksForDate(dateText);
      if (tasksForDate.length > 0) {
        handleEditButtonClick(task);
      }
    }

    /**
      * Executes the delete command for the specified task.
      * @param {Object} task - The task to be edited.
    */
    function handleDeleteShortcut(task) {
      const dateElement = document.getElementById('date');
      const dateText = dateElement.textContent;
      const tasksForDate = getTasksForDate(dateText);
      if (tasksForDate.length > 0) {
        handleDeleteButtonClick(task);
      }
    }

    /*
      * Executes the corresponding markdown command and the commands for the bug and learnings boxes.
      * @param {string} command - The command entered by the user.
      * @param {Map} commandList - The map containing markdown commands and their corresponding functions.
    */
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

    /**
      * Handles commands specific to the roles box.
      * @param {string} command - The command entered by the user.
    */
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

    /**
     * Checks if a given value exists in the values of a Map.
     * @param {Map} map - The Map to search through.
     * @param {RegExp} value - The value to search for in the Map.
     * @returns {boolean} - Returns true if the value is found, otherwise false.
     */
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

    /**
      * Handles commands specific to the dev journal page.
      * @param {string} command - The command entered by the user.
    */
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
  }
});