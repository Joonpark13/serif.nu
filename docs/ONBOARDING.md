# Onboarding

This is a document designed to get you up to speed in Serif.nu's development stack & tooling. I will start with the very basics and work my way down the list of main concepts that a developer working on Serif.nu would need to know. Give the *Basics* and *Modern Web Development* sections a read (probably don't need to worry about *Advanced* yet unless you are interested), then jump into the *Tutorials*. After completing the tutorials and gaining a basic understanding of the technologies, follow the *Practice Ticket* section to gain a sense of our workflow. Take a look at the [CONTRIBUTING](CONTRIBUTING.md) document as you do the practice ticket, and give that whole document a good read after you're done.

Don't be overwhelmed! I know there's a lot on this document but you'll pick them up as you go. You don't need to be an expert in any of these to start working on Serif.nu.

## Basics

These are absolutely foundational concepts to web development that are core to every single web application. You should make yourself well versed in the following concepts.

For those who learn best by doing, I highly recommend [CodeCademy](https://www.codecademy.com/)'s tutorials. They guide you along in an interactive manner and help you help yourself reinforce new concepts.

### HTML

HyperText Markup Language is the backbone of every web page. There are an ocean of resources out there to help you learn HTML - try Googling and take your pick.

### CSS

Cascading Style Sheets allow web pages to be styled with various colors, layouts, and more. This is what allows website to look and function nicely. Similar to HTML, feel free to find the tutorial that best suits you.

### JavaScript

JavaScript is _the_ language of the web. This language is what allows website to become dynamic web applciations and is the language in which most of your development time will be spent. The [Mozilla Developer Network (better known as MDN Web Docs)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is considered one of the go-to sources of all things JavaScript and is a great place to start.

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

### ESlint

[ESlint](https://eslint.org/) is _the_ linting tool for JavaScript. We use a slightly modified version of the [Airbnb Style Guide](https://github.com/airbnb/javascript) linting rules.

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

*I highly recommend that you read over [CONTRIBUTING.md](CONTRIBUTING.md) as you follow along. I'll also assume that you're using a bash terminal (native to mac, if you're on windows you'll either have to use git bash, the windows subsystem for linux, or a VM).*

During our sprint meeting, we'll have groomed a practice ticket for you on the Trello board. Drag that ticket from the "Current Sprint" column to the "In Progress" column.

Let's pull down the repository. In the command line, navigate to the folder in which you want to put the serif.nu code, and do
```
git clone https://github.com/Joonpark13/serif.nu.git
```
This will make a `serif.nu` directory and place the serif.nu repository inside it. (Alternatively you can use the Github GUI desktop application)

Let's install all of our dependencies by doing
```
npm install
```

The first thing we want to do before we start working is to make a branch.
```
git checkout -b your-name-practice-ticket
```
will create a new branch named `your-name-practice-ticket`.

Now, open up your favorite IDE and open up the code that we just cloned. Let's go ahead and make some changes. Obviously these changes aren't something we'd really want to make on the app, but it'll help us pratice the workflow and some key concepts like unit testing.

Delete all of the contents of the `index.js` file and replace it with
```
import React from 'react';
import ReactDOM from 'react-dom';
import MyApp from './MyApp';

function Index() {
  return <MyApp />;
}

ReactDOM.render(
  <Index />,
  document.getElementById('root'),
);
```
and save the file. Then, create a `MyApp.js` file in the same directory and write
```
import React from 'react';

function MyApp() {
  return <div>My first Serif.nu ticket</div>;
}

export default MyApp;
```

Since you've either done the React tutorial by now or are familiar with React already, you'll notice that we've just replaced our entire application with a simple component that just renders a single `<div>` with some trivial content. It's good enough for learning purposes. Go to your command line and do
```
npm start
```
You should now see a tab open on your browser with the application running - and you should see the change that you just made.

I actually changed my mind. Let's change the content from `My first Serif.nu ticket` to `I love web development`. Go ahead and make that change to `MyApp.js` and save the file - you'll notice the page reloaded itself with the new content. This will be your normal development flow: write some code, see/try it in the browser, make some changes, repeat.

Any good piece of software should have automated test coverage, so let's write a unit test for the component that we've just written. Create a file named `MyApp.test.js` in the same directory. In it, write:
```
import React from 'react';
import { shallow } from 'enzyme';
import MyApp from './MyApp';

describe('MyApp', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<MyApp />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
```

There's a lot about unit testing that you'll learn as you contribute more to the codebase, but this is your very basic unit test file. For this tutorial we'll fly by at an extremely high level and leave out much of the details, but you'll pick up the rest as you go. You import your component that you want to test, and then you *describe* its expected behavior through a set of specifications or "specs" (in our case, we have one: 'it renders correctly').

Inside this spec, we are [shallow rendering](https://airbnb.io/enzyme/docs/api/shallow.html) our component, then taking a "snapshot" of it. When we run it the first time around, jest, our test runner, will know to create a new snapshot for us. In the future, when you or someone else runs this test again, jest will compare the component's render to the snapshot, and warn you if something changed. This allows us to catch unintended changes to the component.

So let's run the test! From your command line do
```
npm test
```
and you should see all of the unit tests in the repo run. You should be able to find towards the end of the test output that the test for the component (MyComponent) passed. You'll also notice that a new `__snapshots__` directory showed up in the directory where your test is. Inside this snapshots directory you'll find your brand new component snapshot. These snapshots should be considered part of our tests and should be committed to version control alongside our test files.

Speaking of which... let's commit our changes. You can use a Github desktop GUI, or from the command line do
```
git status
```
This will show you all of the files you have changed, added, or deleted. You should be able to do
```
git add src/index.js src/MyApp.js src/MyApp.test.js src/__snapshots__
```
to stage all of your changes & newly created files. You then do another `git status` to confirm that those files were staged.

We can then do
```
git commit -m "My first practice ticket"
```
to commit our changes. The message we write after the `-m` flag should be a succinct description of the changes we've made.

If you now do a `git log`, you'll see that we've made our first commit to our branch!

Let's now push our local branch to the remote repository (Github).
```
git push -u origin your-name-practice-ticket
```

Now, navigate to the [Serif.nu GitHub repo](https://github.com/Joonpark13/serif.nu) and click the "Pull Requests" tab. You should see a yellow bar containing your branch name, with a green button on the right. This allows you to create a Pull Request.

A Pull Request is just a way of asking others to review the changes that you've made. When you and the reviewers agree that the changes you've made are good to go, you can then merge the changes into the `master` branch, which completes your ticket.

Fill out the Pull Request form with a succinct title and description of your changes. Create the Pull Request, and request review from Joon (right sidebar).

For a normal ticket, at this point your reviewer would review your code, make some comments, and you'll go back and likely make more changes to your code. You'll stage, commit, and push up those new changes to your branch until you and your reviewer are satisfied and all reviewers approve the Pull Request. But since this is a practice ticket, this is as far as you'll go. Drag the Trello ticket into "Completed" - you're now ready to dive right into the Serif.nu codebase!
