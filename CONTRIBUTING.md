# Developing for Serif.nu

## Introduction

This document is mainly intended for student developers at Northwestern University who are part of the Serif.nu development group. If you are not a student at Northwestern, or if you are a student who is not a part of the Serif.nu development group, and are interested in working on Serif.nu, please reach out to Joon to get involved.

This document assumes knowledge of JavaScript (ES6), git, [React](https://reactjs.org/), and [Redux](https://redux.js.org/). The application also uses [npm](https://www.npmjs.com/), [webpack](https://webpack.js.org/), [babel](https://babeljs.io/), [eslint](https://eslint.org/), [material-ui](https://material-ui.com/), [jest](https://jestjs.io/), and [enzyme](http://airbnb.io/enzyme/). If you have never encountered some of the tools and/or packages on this list, that's okay - most of them have great official documentation. You should start by following the quickstart guides/tutorials for the tools/packages that you are unfamiliar with.

Our current async redux action solution is redux-thunk, and we use Immutable.js for our state tree. We follow the airbnb style guide with a few custom modifications, and recommend installing an eslint plugin for your IDE of choice.

## Philosophy

The following are the three Serif.nu development core values:

### Documentation

There are two parts to this value: writing good documentation and following existing documentation.

Writing detailed comments or a comprehensive README may take a long time, but it is critically important that you do it, since it will save time for other developers (including yourself in the future). If you ever feel like you are documenting in too much detail, you're probably doing it right. This contributing document is written in this spirit.

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

Clone this repository, then

```
npm install
```

You'll need two environment variables: `API_URL_DEV` and `API_URL_PROD`. `API_URL_DEV` will be the api the app will call in dev mode, and `API_URL_PROD` is the api the app will call in prod mode. Unless you are working with a local version of Sans-Serif, you can point both of those to the production Sans-Serif URL. We recommend writing export statements for these variables in a `.env` file and sourcing the file teach time before you begin work.

`npm start` will run the development environment. See the [reference document](REFERENCE.md) for more commands.

### Development

1. Move the ticket from "Current Sprint" to "In Progress" on the Trello board.
2. Check out the `master` branch, `git pull` to make sure you are up to date, then checkout a new branch. Your branch name should follow the format of `{ticket type}/{ticket-title}` where ticket type is `f` for feature, `b` for bugfix, and `t` for tech debt. For example, `git checkout -b b/fix-overlapping-schedule-bug`
3. Make your changes, stage, and commit. Most tickets will require multiple commits. Make sure the first line of your first commit message is the ticket title.
4. Run `npm test` to lint and test your changes. Fix/add tests as necessary to ensure no linting errors, 100% code coverage, and that all tests pass. See the [reference document](REFERENCE.md) for scripts that may help.
5. If applicable, make sure you update the documentation to match your changes.
6. Push your branch: `git push -u origin b/fix-overlapping-schedule-bug`
7. Open a pull request. Using the Github power-up in the trello card, link the pull request on the ticket.
8. If asked to make changes by the reviewer(s), make the relevant changes, and push the commits on the branch.
9. Once the primary reviewer approves, rebase the branch onto master (make sure you **fully understand [the rebase command](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)**) and squash your work into one commit. Make sure the first line of the commit message is still the ticket title, and be sure to include a summary of the work done in the commit message body. If there are any conflicts, resolve them. Then (force) push one last time to your branch.
10. At this point, your work is ready to be merged and deployed! Go ahead and hit the "Rebase and merge" button.
11. Once it's merged, drag the ticket into "Completed."

## Sans-Serif

Sans-Serif is the backend service that provides the course data for Serif.nu.

## Misc

### prodMode checks

In rare cases, you'll find code/need to write code that behaves differently depending on whether you're in prod or dev mode. You can `/* istanbul ignore next */` those conditionals since those are difficult to test.