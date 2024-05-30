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

        // "cd .." - back to home
         switch(command) {
          case 'cd ..':
            window.location.href = 'index.html'
            break;
          default:
            terminalContent.textContent += `\nCommand not recognized`;
        }

        
    }
  
    function handleDevJournalCommands(command) {
        // Add logic for dev journal page commands
        terminalContent.textContent += `\nDev Journal Page command executed: ${command}`;

        // "cd .." - back to home
        switch(command) {
          case 'cd ..':
            window.location.href = 'index.html';
            break;
          case 'cd calendar':
            window.location.href = 'calendar.html';
            break;
          case 'p': // Preview
            showPreview();
            break;
          case 'e': // Edit
            showEditor();
            break;
          case 's': // Save
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
          case 'disc': //Check the discussion role
            toggleCheckbox('discussionCheckbox');
            break;
          case 'code': //Check the code role
            toggleCheckbox('codingCheckbox');
            break;
          case 'doc': //Check the documentation role
            toggleCheckbox('documentationCheckbox');
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
  