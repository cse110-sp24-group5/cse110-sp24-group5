# Minimize number of features

## Context and Problem Statement

Is it possible for us to include all our proposed features of the web application within 5 weeks?
Should we prioritize the CI/CD pipelines and UI for multiple devices instead?
What should the maximum number of features included in our web application be?

## Decision Drivers

* Short deadline
* Grading heavily emphasizes CI/CD pipelines, device compatibility and web application accessibility (local-first/offline acess)
* TA Akshay's recommendation
* Desire for less complexity and smaller workload

## Considered Options

1. Homepage, Calendar (with sentiment) and Notes + keyboard shortcuts
2. Homepage, Calendar (without sentiment) and Notes + keyboard shortcuts
3. Homepage, Calendar (with sentiment and habits) and Notes + keyboard shortcuts
4. Homepage, Calendar, Notes and Timer + keyboard shortcuts
5. Homepage, Calendar, Notes, Timer, Habit Tracker and Analytics (original pitch idea) + keyboard shortcuts

## Decision Outcome

Chosen option: "1. Homepage, Calendar (with sentiment) and Notes + keyboard shortcuts", because it aligns with the project constraints and prioritizes essential features for grading.

### Consequences

* Good, because it focuses on key features that address project requirements and TA recommendations.
* Good, because it ensures timely completion of the project within the given deadline.
* Good, because it allows for a manageable workload and efficient utilization of resources for other parts of the project.
* Bad, because it may limit the variety of features and functionality available to users.
* Bad, because it may not set our web application apart from other groups.

### Confirmation

Discussed with the team during today's zoom meeting.

## Pros and Cons of the Options

### Other options

Good, because it offers a comprehensive set of features catering to various user needs.
Good, because it enhances user experience and engagement.
Neutral, because it may test the team's ability to produce quality designs, code, and tests under a short amount of time.
Bad, because it risks overloading the project with features, leading to a higher risk of delays or incomplete implementation if not properly managed.
Bad, because it prioritizes quantity over quality, potentially diluting the user experience.

## More Information

The team also discussed another big architectural decision about changing the web application to a desktop application or browser extension. We concluded that we should all first research about how we 
might implement an offline web application (maybe look into electron?) before the next meeting and decide on this matter after sharing our findings with each other.
