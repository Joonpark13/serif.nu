# Onboarding

This is a document designed to get you up to speed in Serif.nu's development stack & tooling. I will start with the very basics and work my way down the list of main concepts that a developer working on Serif.nu would need to know. Give the *Basics* and *Modern Web Development* sections a read (probably don't need to worry about *Advanced* yet unless you are interested), then jump into the *Tutorials*. After completing the tutorials and gaining a basic understanding of the technologies, follow the *Practice Ticket* section to gain a sense of our workflow. Take a look at the [CONTRIBUTING](CONTRIBUTING.md) document as you do the practice ticket, and give that whole document a good read after you're done.

Don't be overwhelmed! I know there's a lot on this document but you'll pick them up as you go. You don't need to be an expert in any of these to start working on Serif.nu.

## Basics

These are absolutely foundational concepts to web development that are core to every single web application. You should make yourself well versed in the following concepts.

For those who learn best by doing, I highly recommend [CodeCademy](https://www.codecademy.com/)'s tutorials. They guide you along in an interactive manner and help you help yourself reinforce new concepts.

### HTML

Hyper Text Markup Language is the backbone of every web page. There are an ocean of resources out there to help you learn HTML - try googling and take your pick.

### CSS

Cascading Style Sheets allow web pages to be styled with various colors, layouts, and more. This is what allows website to look and function nicely. Similar to HTML, feel free to find the tutorial that best suits you.

### JavaScript

Javascript is _the_ language of the web. This language is what allows website to become dynamic web applciations and is the language in which most of your development time will be spent. The [Mozilla Developer Network (better known as MDN Web Docs)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is considered one of the go-to sources of all things JavaScript and is a great place to start.

### Git

While git is not a tool specific to web development, it is the version management tool of choice for a large percentage of modern software developers. Git can be daunting at first with this vast variety of commands, but as with anything, start simple with the commands you need to know. Focus first on the basic git workflow of making changes, staging, and commiting. Then familiarize yourself with branches and merging. Finally, learn rebasing.

Git is a rare case where the official documentation isn't the most beginner friendly. CodeCademy has a git tutorial, so I would still point there as a good place to start, especially for those who are interactive learners. [Atlassian](https://www.atlassian.com/git/tutorials) also has a good tutorial.

I often find that many git concepts, especially ones such as branching or rebasing, make a lot more sense when visually drawn out. Try to find tutorials with graphs and figures.

## Modern Web Development

### React

React is one of the most popular JavaScript frameworks out there today. This is the framework that powers Serif.nu. As a contributer to Serif.nu, most of your work will be done inside of React components. The [official React documentation](https://reactjs.org/) is the best place to start.

### Redux

[Redux](https://redux.js.org/) is one of the most popular state management tools for React. While the concepts can be a bit tricky to grasp at first, once it clicks, it's an incredible simple set of concepts that allow powerful applications to manage their state in a clean and organized fashion. Note that we use [Immutable.js](https://immutable-js.github.io/immutable-js/) for our actual redux state tree.

### Jest

[Jest](https://jestjs.io/) is the JavaScript unit testing framework that we use. Together with [Enzyme](https://airbnb.io/enzyme/), this framework allows us to test our React components and maintain coverage so that we can iterate with confidence.

### Eslint

[Eslint](https://eslint.org/) is _the_ linting tool for JavaScript. We use a slightly modified version of the [Airbnb Style Guide](https://github.com/airbnb/javascript) linting rules.

## Advanced

You probably don't need to master these concepts before starting to contribute to Serif.nu. However, we do use these tools and if you continue you to contribute, you will probably run into these sooner or later, so it would be good to be at least familiar with them.

### Redux Loop

[Redux Loop](https://redux-loop.js.org/) is our method of choice for managing side effects in Redux. It integrates side effects into the reducer in a conceptually simple way (using loops) and makes reducers easy to test.

### Cypress

[Cypress](https://www.cypress.io/) is our method of choice for end to end testing. This is one of the cleanest and easiest to use testing tools currently out there and allows us to release and iterate with confidence in our features.

### Webpack

[Webpack](https://webpack.js.org/) is one of the most popular web toolchain packages out there. Together with the [Babel](https://babeljs.io/) transpiler, it allows us to write React code in a way that makes the most sense to the developer, while still allowing us to deploy compiled code that makese the most sense to the browser.


## Tutorials

1. If you're not comfortable with JavaScript, start with [the Codecademy JS tutorial](https://www.codecademy.com/learn/introduction-to-javascript). Complete sections 1 through 8. If you're a CS student or are already familiar with a different programming language, you'll probably fly through this stuff.

2. If you have worked with JavaScript before but haven't used React, start with [the official React guide](https://reactjs.org/docs/hello-world.html). Read through those "Main Concepts", then follow through the [official tutorial](https://reactjs.org/tutorial/tutorial.html). You should actually write the code as you follow, using the provided starter code. No need to do the final section ("Adding time travel").

3. At this point, if you feel a bit shaky or still confused, you should touch base with Joon and go through a simple example React app together. If you're ready to move on...

4. You should make sure you are familiar with git in some way. If you use a github GUI, that's fine - or maybe you've done basic git on the command line before. If you're unfamiliar with git, I *highly* recommend that you go through this [git tutorial](https://www.codecademy.com/learn/learn-git).

5. If you feel good about all that, you can move on to the practice ticket below.

6. At some point later down the line, you should come back and do the [Redux tutorial](https://redux.js.org/basics/basic-tutorial). Redux is our state management solution and it's a core part of how our app functions. It's a bit difficult of a concept to grasp at first, but you should try to understand it after you've gotten a bit of a look into the codebase.

## Practice Ticket

Coming soon...
