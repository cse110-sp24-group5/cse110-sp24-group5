# CSE110 SP24 Group 5

![HTML](https://img.shields.io/badge/HTML-5E5C5C?style=for-the-badge&logo=html5)
![CSS](https://img.shields.io/badge/CSS-5E5C5C?style=for-the-badge&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-5E5C5C?style=for-the-badge&logo=javascript)
![JSDoc](https://img.shields.io/badge/JSDoc-5E5C5C?style=for-the-badge&logo=jsdoc)
![Super Linter](https://img.shields.io/badge/Super%20Linter-5E5C5C?style=for-the-badge&logo=github-actions)

Welcome to the repository for CSE110 SP24 Group 5's project! This document will guide you through the various features of our application, provide links to essential resources, and outline our project’s current status. <br>

Check out our deployed website [here](https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/index.html).

## Table of Contents
- [Introduction](#introduction)
- [Installation and Setup](#installation-and-setup)
- [Features](#features)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [CI/CD Pipeline](#cicd-pipeline)
- [Linting](#linting)
- [Testing](#testing)
- [Agile Concepts](#agile-concepts)
- [Application of the -ilities](#application-of-the-ilities)
- [Resources](#resources)
- [Team Members](#team-members)

## Introduction
In the fast-paced world of software development, productivity and mental well-being are crucial for success. Developers often find themselves juggling multiple tasks, deadlines, and responsibilities, which can lead to burnout and decreased efficiency. Our project aims to provide a comprehensive solution to address these challenges by offering a journal that not only boosts productivity throughout the development process but also helps developers keep track of their mental health.

The journal serves as a centralized hub where developers can effectively manage their tasks, document their progress, and reflect on their daily experiences. By combining powerful features such as a calendar, task management, and a markdown-enabled development journal, our application streamlines the workflow and encourages mindful practices. With the calendar feature, developers can easily navigate through different months, view task lists, and manage their tasks seamlessly. The development journal component allows developers to document their activities, thoughts, and learnings using a user-friendly markdown editor, while also selecting the roles they fulfilled on a given day. By integrating mental health considerations, our journal encourages developers to prioritize their well-being through regular reflection and journaling.

## Installation and Setup
### 1. Using it locally

To install and run the project locally, follow these steps:

1. Clone the repository to your local machine using the following command:
   
        git clone https://github.com/cse110-sp24-group5/cse110-sp24-group5.git

2. Navigate to the project directory:

        cd cse110-sp24-group5

3. Install the required dependencies by running:
   
        npm install
   
5. Once the installation is complete, you can start the development server with:

        npm start

### 2. Using the WebApp

To use our WebApp you can use the following link: https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/index.html

### 3. Using the Progressive Web App (PWA)



## Features

### 1. Dashboard

- **Navigation**: Users can seamlessly move through different months using intuitive buttons for the calendar and Dev Journal, ensuring easy access to past and future dates.

- **Sentiment Analysis**: For a quick way to keep track of the moods of our users and help them in their self-care journey as software engineers. We have a mood tracker where you can rate your mode based on a slider which is then converted into a corresponding emoji stored in the calendar for that day!

- **Terminal Commands**: In the top left corner, once clicked, a shortcut of all possible terminal commands are given so that users can easily navigate within features.


### 2. Calendar

The calendar feature provides a comprehensive view of tasks and events, allowing developers to efficiently manage their schedules and stay organized.

- **Task Viewing**: By clicking on a specific day, users can view the task list associated with that date. The number of tasks for a given date is visually displayed on the calendar page, providing an at-a-glance overview of workload distribution. Tasks are retrieved from localStorage, ensuring data persistence across sessions.

- **Task Management**: Users can add, edit, and remove tasks for any given day directly from the calendar interface. This streamlined workflow promotes efficient task organization and management.

- **Saving Tasks**: To ensure data integrity, users can click the save button to store their tasks in localStorage, enabling seamless access to their task lists across multiple sessions or devices.

### 3. Dev Journal

The Dev Journal feature provides a dedicated space for developers to document their daily activities, thoughts, and learnings, fostering personal growth and reflection.

![dev-journal-demo.gif](source/img/developer-journal-demo.gif)

- **Default View**: Upon opening the Dev Journal, users are presented with the current date by default, ensuring a smooth and intuitive start to their journaling experience.

- **Date Picker**: A user-friendly date picker allows users to easily switch between dates, enabling them to access and update journal entries for any specific day.

- **Markdown Editor**: Leveraging the power of Markdown, the Dev Journal offers a rich and versatile editing experience. Users can write and preview their journal entries using a fully-featured markdown editor, supporting formatting, code snippets, and other advanced features.

- **Scrolling**: If the content exceeds the viewable area, users can seamlessly scroll within both the preview and the editor panes, ensuring a comfortable and uninterrupted writing experience.
  
- **Toggle View**: With the click of a button, users can toggle between the editor and the preview views, allowing for efficient switching between writing and reviewing modes.

- **Role Selection**: To provide context and clarity, users can select the roles they fulfilled on a given day, such as working on code, documentation, debugging and communication.  This feature enhances the journaling experience by
  encompassing the different roles a software engineer fulfils.

- **Bug Tracker**: To help Software Engineers keep track of unique Bugs they encounter and their solutions, we have a space to track bugs. This can also be a metaphor to bugs or problems they encounter in their lives as a Software Engineer and not just Bugs related to Code.

- **Learnings**: To help our user keep track of thier daily learning we have dedicated a space to this.
  
- **Saving Data**: All input data, including journal entries and selected roles, is automatically saved to localStorage upon clicking the save button, ensuring data persistence and enabling users to pick up where they left off seamlessly.

## Keyboard Shortcuts


## CI/CD Pipeline
Our CI/CD pipeline ensures the quality and reliability of our code through the following stages:
1. **Run Linters**: Automatically checks for code style issues and potential bugs. 
2. **Generate JSDocs**: Creates up-to-date documentation for our code. 
3. **Run Unit Tests**: Verifies that individual components of our application work correctly. 
4. **Run End-to-End Tests**: Simulates real user interactions to validate the entire workflow.

## Linting
Linting is a crucial practice that helps ensure code quality, consistency, and maintainability across the entire codebase. In this project, linting has been set up for HTML, CSS, and JavaScript to adhere to industry-standard best practices and coding conventions. HTML linting checks for proper markup structure, CSS linting maintains consistent stylesheet styles, and JavaScript linting catches syntax errors, potential bugs, and performance issues in the application's logic and functionality.

We have implemented automated linting checks performed on every push or pull request to make sure potential issues are caught early in the development process, and make sure that our coding standard is met. When you push changes, on GitHub you will be able to see a tick or cross next to it based on whether it passes that check. You can click on the same to view details. Along with this you can also run the linter locally.
 
1. **ESLint**: Helps detect syntax errors and code style issues in our JavaScript
    * `npx eslint "**/*.js"` to run on all JS files
2. **StyleLint**: Helps detect style issues in CSS
    * `npx stylelint "**/*.css"` to run on all CSS files in the directory
3. **HTML Linting**: Helps detect issues in our HTML
    * `npx htmhint "**/*.html"` to run on all HTML files in the directory
4. **Fixing local linter issues**: Run all commands with `-fix` tag

## Testing
1. **Codacy tests**:
    * ...
      
2. **Unit tests**: 
    * ...
      
3. **E2E tests**: We created a variety of E2E tests for our developer journal and calendar features. Our comprehensive tests ensure that there are no issues or bugs in our application following any possible action a user could take.
    * Run all E2E tests in the directory using: 
        * `npm run e2eTests`
     
    * Run a specific E2E test file in the directory using:
        * `npm run e2eTests -- <path to file>`

<!-- not sure if Agile should be included or not (we can include links to documents if we decide to -->
## Agile Concepts

1. User stories
2. Sprint
3. Sprint Review
4. Retrospective

## Application of the -ilities

1. Functional Suitability
   
2. Performance Efficiency

3. Compatibility

4. Usability
   
5. Reliability
   
6. Security
    
7. Maintainability
    
8. Portability
    

## Resources

1. Video links:
    * **Team Video**: Watch our team video [here](https://www.youtube.com/watch?v=mqnLJw1I7lg).
    * **MVP/EC Video**: Watch the MVP/EC demonstration video [here](https://youtu.be/2HepYe5-YLw).
    * **Status Video 2**: Watch the Status Video 2 demonstration video [here](https://www.youtube.com/watch?v=myacnpHmjUQ).

2. Design resources:
    * **Miro Board**: Explore our Miro board [here](https://miro.com/app/board/uXjVKMiOIZM=/).
    * **Figma Mockup**: View our Figma design [here](https://www.figma.com/design/V6eBR6UbPtpxFRhxyXcO3T/team-5-figma-board?node-id=0%3A1&t=WDiy1Dt2cr4rP5Ny-1).

## Team Members

- Drishti Regmi
- Haley Nguyen
- Vishaal Gaddipati
- Nicholas Cheah
- Angel Ren
- Hugo D Souza
- Stephen Tong
- Maasilan Kumaraguru
- Xavier Navarro
- Arnav Modi (Team Lead)
- Mishka Jethwani (Team Lead)
  
Learn more about our team [here](https://cse110-sp24-group5.github.io/cse110-sp24-group5/admin/team).
