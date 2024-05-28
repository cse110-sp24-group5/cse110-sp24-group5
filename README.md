# CSE110 SP24 Group 5

![HTML](https://img.shields.io/badge/HTML-5E5C5C?style=for-the-badge&logo=html5)
![CSS](https://img.shields.io/badge/CSS-5E5C5C?style=for-the-badge&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-5E5C5C?style=for-the-badge&logo=javascript)
![JSDoc](https://img.shields.io/badge/JSDoc-5E5C5C?style=for-the-badge&logo=jsdoc)
![Super Linter](https://img.shields.io/badge/Super%20Linter-5E5C5C?style=for-the-badge&logo=github-actions)

Welcome to the repository for CSE110 SP24 Group 5's project! This document will guide you through the various features of our application, provide links to essential resources, and outline our project’s current status.

## Deployed Website

Check out our deployed website [here](https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/index.html).

## Features

### Calendar
- **Navigation**: Move through different months seamlessly.
- **Task Viewing**: Click on a day to view the task list for that specific date. Tasks are retrieved from localStorage.
- **Task Management**: Add, edit, and remove tasks for any given day.
- **Saving Tasks**: Click the save button to store tasks in localStorage.

### Dev Journal
- **Default View**: Opens with the current date by default.
- **Date Picker**: Use the date picker to switch between dates.
- **Markdown Editor**: Write and preview your journal entries using a markdown editor.
  - **Scrolling**: If your content exceeds the viewable area, you can scroll within both the preview and the editor.
  - **Toggle View**: Switch between the editor and the preview using the provided buttons.
- **Role Selection**: Select roles that you fulfilled on a given day.
- **Saving Data**: All input data is saved to localStorage upon clicking the save button.

## Team Page

Learn more about our team [here](https://cse110-sp24-group5.github.io/cse110-sp24-group5/admin/team).

## Video Links

- **Team Video**: Watch our team video [here](https://www.youtube.com/watch?v=mqnLJw1I7lg).
- **MVP/EC Video**: Watch the MVP/EC demonstration video [here](https://youtu.be/2HepYe5-YLw).
-  **Status Video 2**: Watch the Status Video 2 demonstration video [here](https://www.youtube.com/watch?v=myacnpHmjUQ).


## Design Resources

- **Miro Board**: Explore our Miro board [here](https://miro.com/app/board/uXjVKMiOIZM=/).
- **Figma Mockup**: View our Figma design [here](https://www.figma.com/design/V6eBR6UbPtpxFRhxyXcO3T/team-5-figma-board?node-id=0%3A1&t=WDiy1Dt2cr4rP5Ny-1).

## CI/CD Pipeline

Our CI/CD pipeline ensures the quality and reliability of our code through the following stages:

1. **Run Linters**: Automatically checks for code style issues and potential bugs. 
2. **Generate JSDocs**: Creates up-to-date documentation for our code. 
3. **Run Unit Tests**: Verifies that individual components of our application work correctly. 
4. **Run End-to-End Tests**: Simulates real user interactions to validate the entire workflow. 
