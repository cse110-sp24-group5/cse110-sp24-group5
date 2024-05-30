# Keyboard Shortcut and Terminal Final Decisions (Sprint 2)

## Context and Problem Statement

How can we make the entire application more accessible (can be utilized entirely via the keyboard).

## Decision Drivers

* Dev-focused feature
* Promotes accessibility for end users
* Improves navigation

## Considered Options

1. Implementing tabbing through calendar days using tab indices
2. Add a translucent terminal on the bottom of each page that can be triggered with `Ctrl + /`
3. Can change pages using `cd <pagename>`
4. Typing in a number `1`-`31` will open the corresponding day on the currently rendered month
5. Typing in `MM/DD/YYYY` will navigate to the specific day of the specific month and year
6. Typing in `MM/YYYY` will navigate and render the month and year, but not select a day
7. Use `p`, `e`, and `s` to preview, edit, and save in the dev journal
8. For task list `task-name d`. `task-name e`, and `task-name a` to delete edit and add tasks
9. Don't implement a terminal and completely navigate via tabs

## Decision Outcome

Chosen options: "1, 2, 3, 4, 6, 7, 8. Tabbing, terminal, changing pages, navigating calendar, changing tasks", because it is more accessible and aligns closely with the needs of developers for navigating the app effectively.

### Consequences

Good, because these choices promote accessibility for a whole new set of users supporting the concept of -ilities driving development.<br>
Good, because a terminal and the ability to tab offer multiple options which can typically be seen as positive by end users.<br>
Good, because incorporating these shortcuts allows for an opportunity to rethink and refactor some of our code from Sprint 1.<br>
Neutral, because it might not have commands a developer is familiar with.<br>
Bad, because it may be overwhelming or confuse users Ex: Subtlety between us choosing `MM/YYYY` over `MM/DD/YYYY`.<br>

### Confirmation

Approved by the keyboard shortcut team and the leads via Slack.

## Pros and Cons of the Other Options

### 5, 9

1. Good, because it may make our development process faster.
3. Neutral, because it may be a feature people overlook.
4. Bad, because it is not promoting inclusivity and accessibility.
5. Bad, because it would be redundant to have 2 ways to navigate to days, so we can rather have a way to navigate days and a way to navigate the months and years.

## More Information
Plan on making the terminal access and pull up seamlessly between pages.
