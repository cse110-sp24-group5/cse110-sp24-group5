# PR, Branching, Testing:

## Context and Problem Statement

How can we maintain code quality and consistency across multiple PRs and iterations?
What strategies can we implement to enforce strict branch management policies?
What testing libraries can we use that works well with other parts of the project?

## Decision Drivers

* Consistency and Clarity
* Quality Assurance
* Collaboration and Communication
* Testing Library Compatibility

## Decision Outcome

Decided on a template for creating pull requests that includes: description + changes made + instructions for testing + screenshots + policy checklist + review guidelines.
Decided to enforce detailed naming, branch protection and old repo pruning as a part of our branch management.
Decided to use Jest as our unit testing library.

## Decision Specifics

### Strict Policy on PRs:

This template is a standard format for creating a pull request (PR) description on a software development project. It aims to provide a structured way of communicating the changes made in the PR, along with testing instructions, screenshots (if applicable), and a checklist for ensuring code quality and adherence to project standards. The template helps maintain consistency and clarity in PR descriptions, facilitating code reviews and collaboration among team members.

#### Template:-

> Description

[Describe the changes made by this PR and the problem it solves]

> Changes Made

- [List the specific changes made in bullet points]

> Testing

[Provide step-by-step instructions for testing the changes introduced by this PR]

> Screenshots (if applicable)


> Checklist

Strict PR Policy:

- [ ] All automated tests pass locally.
- [ ] Manual testing has been performed according to the provided instructions.
- [ ] Code follows the project's coding conventions and standards.
- [ ] Documentation has been updated to reflect any relevant changes.
- [ ] This PR has been reviewed by at least 2 of the team members.
- [ ] It passes all the appropriate Linters.
- [ ] Make sure it passes CodeClimate quality checks.

> Additional Notes (if any)


#### Reviewing Guidelines:
The template suggests that at least 2 team members should review the PR before it can be merged.
All automated tests should pass locally.
The code should follow the project's coding conventions and standards.
It should pass all appropriate linters and CodeClimate quality checks.
Reviewers should focus on the following aspects:
- Code Quality: Ensure that the code follows the project's coding conventions and standards, and adheres to best practices for maintainability, readability, and performance.
- Functionality: Verify that the changes introduced by the PR work as intended and do not break existing functionality.
- Testing: Review the provided testing instructions and ensure that they cover all the relevant scenarios and edge cases.
- Documentation: Check if the documentation has been updated to reflect the changes made in the PR.
- Security: If applicable, assess the changes for potential security vulnerabilities or areas of concern.

---

### Branch Management:

- Make sure each branch is given an appropriate/descriptive name.
- Enforce branch protection to ensure that direct pushes to main are not made, review all PRs manually and carefully.

Pruning Old Feature Branches:
Cleanup repo branches from time to time, delete branches that have already been merged, abandoned, or have been inactive.
Enforce occasional team reviews of branches so team members can discuss which branches to remove or merge.
Ensure communication between team members when editing the repo’s branches, one person’s decision to remove branches should not be a surprise to anyone.

---

### Unit Testing Library:
We decided to go with Jest.
Firstly, our project is built using HTML, CSS, and JavaScript, and Jest is well-suited for testing JavaScript codebases. Its comprehensive testing capabilities, including unit testing, integration testing, and snapshot testing, ensure that we can thoroughly test our JavaScript code and catch any potential issues or regressions.
Secondly, we have implemented linting and code quality checks using CodeClimate, and Jest seamlessly integrates with such tools. This integration allows us to enforce code quality standards and catch potential issues or violations during the testing process, ensuring that our codebase adheres to best practices and maintains a high level of quality.
Another factor that influenced my decision was Jest's zero-configuration setup. Getting started with testing can be a daunting task, but Jest's zero-configuration approach made it easy for us to start writing tests right away without spending time on complex configurations. This was particularly beneficial for our team, as we had a tight timeline and limited experience with testing frameworks.

---

### Consequences

#### PR Structure

1. Good, because it ensures all changes are clearly communicated and tested before merging.
2. Good, because it provides a standardized format for PR descriptions, making it easier for reviewers to understand the changes.
3. Good, because it includes a checklist that ensures code quality and adherence to project standards.
4. Bad, because it may add overhead in creating PRs, especially for smaller changes.

#### Branch Management Enforcement

1. Good, because it ensures branches are appropriately named, making it easier to understand their purpose.
2. Good, because it prevents accidental changes to the main branch and promotes careful review of PRs.
3. Good, because it reduces clutter and maintains a clean repository.
4. Bad, because it occasional team reviews of branches may be time-consuming and may not always result in consensus.
5. Bad, because it communication lapses may lead to confusion or disagreements when pruning branches.

#### Jest

1. Good, because it is well-suited for testing JavaScript codebases, which is the primary technology stack of the project.
2. Good, because it integrates seamlessly with linting and code quality tools like CodeClimate, ensuring code quality standards are enforced during testing.
3. Good, because it zero-configuration setup reduces the initial setup overhead, enabling the team to start writing tests quickly.
4. Good, because it has less of a learning curve since we use it in our labs.
5. Bad, because it's zero-configuration approach may limit customization options for advanced testing scenarios.

### Confirmation

Discussed with the team during today's zoom meeting.

## More Information
The team maintained its stance on making a website and using an API (The Service Workers) in order to have local-first properties.
