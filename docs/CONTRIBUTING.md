# Developing for Serif.nu

Production: [https://serif.nu](https://serif.nu)

Preproduction: [https://master--hungry-poitras-beebdb.netlify.com/](https://master--hungry-poitras-beebdb.netlify.com/)

## Introduction

This document is mainly intended for student developers at Northwestern University who are part of the Serif.nu development group. If you are not a student at Northwestern, or if you are a student who is not a part of the Serif.nu development group, and are interested in working on Serif.nu, please reach out to Joon to get involved.

This document assumes knowledge of JavaScript (ES6), git, [React](https://reactjs.org/), and [Redux](https://redux.js.org/). The application also uses [npm](https://www.npmjs.com/), [webpack](https://webpack.js.org/), [babel](https://babeljs.io/), [eslint](https://eslint.org/), [material-ui](https://material-ui.com/), [jest](https://jestjs.io/), and [enzyme](http://airbnb.io/enzyme/). If you have never encountered some of the tools and/or packages on this list, that's okay - most of them have great official documentation. You should start by following the quickstart guides/tutorials for the tools/packages that you are unfamiliar with.

Our current async redux action solution is [redux-loop](https://redux-loop.js.org/), and we use [Immutable.js](https://immutable-js.github.io/immutable-js/) for our redux state. We follow [the airbnb style guide](https://github.com/airbnb/javascript) with a few custom modifications, and recommend installing an eslint plugin for your IDE of choice.

_For newcomers we recommend starting with the [onboarding document](ONBOARDING.md)._

## Philosophy

The following are the three Serif.nu development core values:

### Documentation

There are two parts to this value: writing good documentation and following existing documentation.

Writing detailed pull request descriptions or a comprehensive README may take a long time, but it is critically important that you do it, since it will save time for other developers (including yourself in the future). If you ever feel like you are documenting in too much detail, you're probably doing it right. This contributing document is written in this spirit.

Following existing documentation such as internal documentation (this doc), style guides, official package documentation, and community standards is crucial, since it'll provide a standardized answer to many of the questions you may have and save you a ton of time.

### Robustness & Longevity

We want this piece of software to stand the test of time. We aren't aiming to build something that lasts a year or even four years (that was what Serif.nu 1.0 and 2.0 were for). We aim to create *and maintain* software that can be passed down to future Northwestern developers so that Serif.nu can serve students for many generations to come.

This means thinking long term while making your decisions - never skimp on something now if you know it'll benefit developers in the future (including yourself), even if it takes a bit more time. It means unit and end to end testing, with good code coverage. It means continuous integration. It means good version control practices. And most of all it means good documentation.

### Simplicity

Serif.nu was created to address a very simple problem: Northwestern students need an easy way to visualize their course schedules before registration. Serif.nu will always be a webapp to address this single problem in the best way possible - no more, no less. Every single feature and design decision should be made with this simplicity and clarity in mind.

### Other values:

#### Design is not an afterthought.

At this point in time, Serif.nu does not have designers. Each developer is responsible for designing their features in a way that is simple, intuitive, and clean. We try to adhere to [Material Design](https://material.io/) as much as possible.

#### Collaboration is a must.

Nobody has the answers to all the problems. Other developers will catch things that you did not. Always take the opportunity to update others on your work and review the work of others.

## Workflow

### Installation and Setup

Clone this repository, then run

```
npm install
```

`npm start` will run the development environment. See the [reference document](REFERENCE.md) for more commands.

### Development

1. Move the ticket from "Current Sprint" to "In Progress" on the Trello board.
2. Check out the `master` branch, `git pull` to make sure you are up to date, then checkout a new branch. Your branch name should follow the format of `{ticket type}/{ticket-title}` where ticket type is `f` for feature, `b` for bugfix, `t` for tech debt, `o` for toolchain, and `d` for documentation. For example, `git checkout -b b/fix-overlapping-schedule-bug`
3. Make your changes, stage, and commit. Most tickets will require multiple commits. Make sure the first line of your first commit message is the ticket title.
4. Run `npm test` to lint and test your changes. Fix/add tests as necessary to ensure no linting errors, 100% code coverage, and that all tests pass. See the [reference document](REFERENCE.md) for scripts that may help. Running `npm test` generates a code coverage report, viewable by opening `/coverage/index.html`. To run specific test files, do `jest {path-to-file}` and to update a snapshot do `jest {path-to-file} -u` (you'll need jest installed globally). Make sure you read [the philosophy](#unit-testing) on snapshot testing.
5. If applicable, make sure you update the documentation to match your changes.
6. Push your branch: `git push -u origin b/fix-overlapping-schedule-bug`
7. Open a pull request. Using the GitHub power-up in the Trello card, link the pull request on the ticket. If the ticket contains a visual change, include a screenshot of the change on the PR.
8. If asked to make changes by the reviewer(s), make the relevant changes, and push the commits on the branch.
9. Once the primary reviewer approves, rebase the branch onto master (make sure you **fully understand [the rebase command](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase), as it rewrites history**) and squash your work into one commit. The preferred method is `git rebase -i master` (interactive rebase, which will allow you to fixup and/or squash your commits into one). Make sure the first line of the commit message is still the ticket title, and be sure to include a summary of the work done in the commit message body. If there are any conflicts, resolve them. Then (force) push one last time to your branch.
10. At this point, your work is ready to be merged and deployed! Go ahead and hit the "Rebase and merge" button.
11. Once it's merged, drag the ticket into "Completed."

## Glossary

- Sans-Serif: The backend for Serif.nu, consisting of a Cloud Firestore database and Python scripts that update the data.
- Class: any section or its associated class
- Schedule: a combination of sections and their associated classes
- Term: quarters, does include summer
- School: various colleges of NU that offer courses, nested under term
- Subject: loosely corresponds to depts
- Course: a course offering, ex. EECS 101-0
- Section: a specific section for a course, ex. Section 20 of PHYSICS 135-1. For some more independent study-like courses or seminars, sections can be entirely different offerings, ex. EECS 395
- Associated Class: a discussion section, a lab, or anything along those lines that are always associated with a certain section of a course.

## Guidelines

### Unit Testing

We enforce 100% unit test coverage. We believe that unit testing should test every piece of code at its lowest atomic level (meaning every React component, every helper function, every selector, etc), and each piece of functionality being tested should be tested in isoluation (meaning each dependency should be mocked).

There are some notable exceptions in the codebase to 100% coverage. We do not test some utils (since they are trivial or hard to test) and action creators (all they do are return objects). We also do not test effects since most of them are simply calling third party functions.

When writing new test files, we recommend writing tests for leaf components first, then working upwards. This makes certain that seeing 100% test coverage actually means 100% of the atomic units of code are tested.

We use snapshot testing. This can be dangerous if a developer blindly updates the snapshots after any and every change. The design and functionality of the component should always be manually tested and confirmed before handling any of the snapshots. The existing snapshots should always be manually compared with the changes made to confirm that the differences are as expected before updating the snapshot. This way, we gain the speed benefits of snapshot testing as well as the bug-catching benefits.

When testing styled components, we use shallow rendering with Enzyme. 

```javascript
import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from './SearchBox';

describe('SearchBox', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SearchBox />);
    // The rest of the test...
  });

  // More tests...
});
```

### End to End Testing

We use End to End (E2E) testing to replicate user interaction. While it is never feasible to test all possible user interactions, E2Es should cover at the very least all happy paths of core functionality as well as previously discovered app-breaking bugs (regression testing). They should be written to be as stable as possible so that they can be run reliably before every merge to master. E2Es are what allows us to iterate quickly with confidence.

### Styling

We use JSS for styling our components. This allows for no unintended style collisions and allows us to use values from component props to generate dynamic styles (Ex. using a class's length to generate the height of the class card on the calendar).

See [the Material-UI docs](https://material-ui.com/css-in-js/basics/) for details. We now use the Hooks API, not the higher component API. 

### Component Design

We use [Material-UI](https://material-ui.com/) as our component library and adhere as closely as possible to Google's [Material Design](https://material.io/). If a component exists in the Material-UI library, we should make every effort to use that component instead of creating/designing a custom component ourselves.

### State Management

We use Immutable.js for state management as it prevents many bugs arising from state mutation. Absolutely no part of the redux state should be vanilla JS objects.

Many codebases that use redux write reducers using handlers, meaning every action simply calls a handler for that specific action, with the state and action passed in as parameters to the handler function. The standard for this codebase is to directly return the state right inside the switch statement of the reducer itself as long as you're only returning state or a loop (see [redux-loop](https://redux-loop.js.org/)). Any time you are doing more than that, you should use write a handler.

### Data Structure

For the data structure of the course data from our cloud firestore that we use, see [the Sans-Serif documentation](https://github.com/Joonpark13/sans-serif).

### Configuration vs. Initialization

Code that "configures" or "sets up" the app (what you'd consider to be 'settings') should live in `index.js`. Code that "initializes" data or other parts of the application on first load should live in `components/App.js`, most likely in its `componentDidMount`.

## Sans-Serif

Sans-Serif is the backend service that provides the course data for Serif.nu. See [the Sans-Serif documentation](https://github.com/Joonpark13/sans-serif) for more information.

## Misc

### prodMode checks

In rare cases, you'll find code/need to write code that behaves differently depending on whether you're in prod or dev mode. You can `/* istanbul ignore next */` those conditionals since those are difficult to test.
