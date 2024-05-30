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
            window.location.href = 'index.html'
            break;
          /*case 'p':
            showPreview();
            break;
          case 'e':
            showEditor();
            break;
          case 's':
            saveData();
            break;
          case 'b':
            showBug();
            break;
          case 'l':
            showLearnings();*/
          default:
            terminalContent.textContent += `\nCommand not recognized`;
        }
        // other commands for page
    }
  });
  