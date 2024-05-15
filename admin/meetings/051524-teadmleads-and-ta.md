# Meeting Information
**Team Number and Name**: 5 Panda Coding Express

**Type of Meeting**: TA Weekly Check In

 **Meeting Date and Location**: 05/15/24 Zoom

**Meeting Purpose**: Weekly updates to the TA

---
### Updates
- Worked on the Figma Designs for the website
    - Created layouts for the home screen, calendar, and dev journal
    - Created relevant layouts for the phone screen as well
 
- CI/CD pipeline
  - Transferred over the CI/CD pipeline from the warmup project to the main project
  - The pipline includes: lining using HTMLLint, CSSLint, and ESLint. After that, we the unit tests and the end to end tests. A separate workflow generates the javascript documentation.
 
- Development
  - Home page: finished and merged into the main branch
  - Calendar: the CSS needs to be fixed but you can traverse across months
  - Task list associated with the calendar: UI seems is almost done and the logic for add/delete/edit tasks as well as `localStorage` usage can be borrowed over from our warmup exercise
  - Dev Journal: yet to be done
The goal is to have all these pages functional by Thurday/Friday so that we can have an MVP by Friday/Saturday.

- **Planning to do another round of Sprint Review + Retropective end of this week**
---
### Feedback from TA

Q) At the moment we have branches for different components in our website. Given that we want to have an MVP soon, should we also write appropriate unit tests and E2E tests for each of those components before merging into main or can that come later?

A) 

`main` branch is the production branch
`dev` branch where we can deploy the MVP
Merge all the features into here and deploy on main only when all testing is done!

- Github Project - nice to have a kanban board. Good way to keep a track of all the tasks and the TA. Maybe columns for left to do, in progress, done

- Put the github website like in the README.md

- Verify if babel is needed think about what exactly needs it.

- Remove chai, mocha, etc.
