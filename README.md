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
- [Component Interaction](#component-interaction)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [CI/CD Pipeline](#cicd-pipeline)
- [Linting](#linting)
- [Testing](#testing)
- [Agile Concepts](#agile-concepts)
- [Team Page](#team-page)

## Introduction
In the fast-paced world of software development, productivity and mental well-being are crucial for success. Developers often find themselves juggling multiple tasks, deadlines, and responsibilities, which can lead to burnout and decreased efficiency. Our project aims to provide a comprehensive solution to address these challenges by offering a journal that not only boosts productivity throughout the development process but also helps developers keep track of their mental health.

The journal serves as a centralized hub where developers can effectively manage their tasks, document their progress, and reflect on their daily experiences. By combining powerful features such as a calendar, task management, and a markdown-enabled development journal, our application streamlines the workflow and encourages mindful practices. With the calendar feature, developers can easily navigate through different months, view task lists, and manage their tasks seamlessly. The development journal component allows developers to document their activities, thoughts, and learnings using a user-friendly markdown editor, while also selecting the roles they fulfilled on a given day. By integrating mental health considerations, our journal encourages developers to prioritize their well-being through regular reflection and journaling.

## Installation and Setup
### 1. Using it locally

To install and run the project locally, follow these steps:

1. Clone the repository to your local machine using the following command:
   
        git clone

2. Navigate to the project directory:


        cd cse110-sp24-group5

3. Install the required dependencies by running:
   
        npm install
4. Once the installation is complete, you can start the development server with:

        npm start

### 2. Using the WebApp

To use our WebApp you can use the following link: https://cse110-sp24-group5.github.io/cse110-sp24-group5/source/html/index.html

## Features

### 1. Calendar
- **Navigation**: Move through different months seamlessly using arrow buttons.
- **Task Viewing**: Click on a day to view the task list for that specific date. The number of tasks for a specific date can be viewed from the calendar page. Tasks are retrieved from localStorage.
- **Task Management**: Add, edit, and remove tasks for any given day.
- **Saving Tasks**: Click the save button to store tasks in localStorage.

### 2. Dev Journal
- **Default View**: Opens with the current date by default.
- **Date Picker**: Use the date picker to switch between dates.
- **Markdown Editor**: Write and preview your journal entries using a markdown editor.
  - **Scrolling**: If your content exceeds the viewable area, you can scroll within both the preview and the editor.
  - **Toggle View**: Switch between the editor and the preview using the provided buttons.
- **Role Selection**: Select roles that you fulfilled on a given day.
- **Saving Data**: All input data is saved to localStorage upon clicking the save button.

## Component Interaction


## Keyboard Shortcuts


## CI/CD Pipeline
Our CI/CD pipeline ensures the quality and reliability of our code through the following stages:
1. **Run Linters**: Automatically checks for code style issues and potential bugs. 
2. **Generate JSDocs**: Creates up-to-date documentation for our code. 
3. **Run Unit Tests**: Verifies that individual components of our application work correctly. 
4. **Run End-to-End Tests**: Simulates real user interactions to validate the entire workflow.

## Linting
We used various linters including ESLint, StyleLint, and HTML Linting in our application. 
1. **ESLint**: Helps detect syntax errors and code style issues in our JavaScript
    * `npx eslint "**/*.js"` to run on all JS files
2. **StyleLint**: Helps detect style issues in CSS
    * `npx stylelint "**/*.css"` to run on all CSS files in the directory
3. **HTML Linting**: Helps detect issues in our HTML
    * `npx htmhint "**/*.html"` to run on all HTML files in the directory

## Testing
1. **Unit tests**:
    * ...
2. **E2E tests**:
    * ...


## Agile Concepts

## Video Links
- **Team Video**: Watch our team video [here](https://www.youtube.com/watch?v=mqnLJw1I7lg).
- **MVP/EC Video**: Watch the MVP/EC demonstration video [here](https://youtu.be/2HepYe5-YLw).
-  **Status Video 2**: Watch the Status Video 2 demonstration video [here](https://www.youtube.com/watch?v=myacnpHmjUQ).

## Design Resources
- **Miro Board**: Explore our Miro board [here](https://miro.com/app/board/uXjVKMiOIZM=/).
- **Figma Mockup**: View our Figma design [here](https://www.figma.com/design/V6eBR6UbPtpxFRhxyXcO3T/team-5-figma-board?node-id=0%3A1&t=WDiy1Dt2cr4rP5Ny-1).

## Team Page
Learn more about our team [here](https://cse110-sp24-group5.github.io/cse110-sp24-group5/admin/team).
