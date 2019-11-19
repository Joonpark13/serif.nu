# Practice Ticket

*I'll also assume that you're using a bash terminal (native to mac, if you're on windows you'll either have to use git bash, the windows subsystem for linux, or a VM).*

## Setup

During our sprint meeting, we'll have groomed a practice ticket for you on the Trello board. Drag that ticket from the "Current Sprint" column to the "In Progress" column.

Let's pull down the repository. In the command line, navigate to the folder in which you want to put the serif.nu codebase, and do
```
git clone https://github.com/Joonpark13/serif.nu.git
```
This will make a `serif.nu` directory and place the serif.nu codebase inside it. (Alternatively you can use the Github GUI desktop application)

Navigate into the directory we just cloned by doing

```
cd serif.nu
```

Let's install all of our dependencies:

```
npm install
```

`npm` is the package manager that allows us to pull down all the different packages our app needs to run. It's kind of like `pip` from Python, if you've used that before.

The first thing we want to do before we start working is to make a branch.

```
git checkout -b your-name-practice-ticket
```

will create a new branch named `your-name-practice-ticket`.

## Code Changes

Now, open up your favorite IDE and open up the code that we just cloned (if you don't have one, we recommend VS Code). Let's go ahead and make some changes. Obviously these changes aren't something we'd really want to make on the app, but it'll help us pratice the workflow and some key concepts like unit testing.

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

## Dev Tools

If you haven't already, install the chrome extension "React Devtools." This is a must-have for any React developer. Then, go to your locally running Serif.nu app in your browser and open up Chrome Devtools (Mac: Cmd + Option + I, Windows: F12), then click on the "Components" tab. This works kind of like the built-in inspector in your Chrome Devtools, except it shows you the React Component tree. Click the cursor icon on the top left hand corner and then click the "I love web development" text on the screen. This should expand your Components view to your `MyApp` component that you just wrote. If this component had props and state, you would see those on the right hand side as well.

## Unit Testing

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

## Version Control

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

Normally, over the course of a ticket, you'll make anywhere between 1 to 5 commits, depending on the size of the ticket. Try to group commits into logical chunks of work instead of every little change you make. For example, a ticket where you are making a new modal for a class, this would be a **bad** way to commit to your branch:

- make component file
- modal header
- modal title
- change modal title
- modal onOpen function
- modal onClose function
- fix bug with modal onOpen
- modal content

It should look much closer to something like this:

- Add ClassModal component
- Add ClassModal open/close logic

This will make your commit history much cleaner while you're working on your branch and it will make your life much easier if you have to rebase. Also notice how the commit messages are written in the imperative tense - that's the industry standard for a commit message. It encourages you think of commits as a series of *actions* that can be performed on the code.

Let's now push our local branch to the remote repository (Github).
```
git push -u origin your-name-practice-ticket
```

Now, navigate to the [Serif.nu Github repo](https://github.com/Joonpark13/serif.nu) and click the "Pull Requests" tab. You should see a yellow bar containing your branch name, with a green button on the right. This allows you to create a Pull Request.

## Pull Request (PR)

A Pull Request is just a way of asking others to review the changes that you've made. When you and the reviewers agree that the changes you've made are good to go, you can then merge the changes into the `master` branch, which completes your ticket.

Fill out the Pull Request form with a succinct title and description of your changes. Create the Pull Request, and request review from your student lead (right sidebar).

For a normal ticket, at this point your reviewer would review your code, make some comments, and you'll go back and likely make more changes to your code. You'll stage, commit, and push up those new changes to your branch until you and your reviewer are satisfied and all reviewers approve the Pull Request. But since this is a practice ticket, this is as far as you'll go. Drag the trello ticket into "Completed" - you're now ready to dive right into the Serif.nu codebase!

---

If you feel inclined, you can read over [CONTRIBUTING.md](CONTRIBUTING.md). It's a more philosophical view of our development process, and it has a condensed version of what we just went through. For most people I would recommend coming back to CONTRIBUTING.md much later after you've gotten a feel for working on Serif.nu.