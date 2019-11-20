# Unit Testing

Unit testing is an important part of our development workflow. Many new developers struggle with the concept of testing - what it is, why we do it, how to do it correctly, etc. Hopefully this document can answer some of those questions for you and set you on the right path.

Unit tests are simply code that runs our application code in some specific way and tells us if we get the result that we expect. In the most basic sense, if we were to write a unit test for the following `myFunc` function:

```javascript
function myFunc(myInput) {
    return myInput + 1;
}
```

the test would look like this:

```javascript
function myFuncTest() {
    const result = myFunc(1);
    expect(result).toBe(2);
}
```

All we've done is taken some piece of app functionality (in this case `myFunc`) and asserted that it returns the value we expect. This is what unit tests are.

You might have noticed some syntax you haven't seen before. The `expect` function and the `toBe` methods are from the JavaScript testing framework we use called [jest](https://jestjs.io/). When we run it, it prints some helpful output to the console and tells us if the result isn't what we expected.

Having these unit tests in our codebase helps us with many things:

- When we make changes to existing code, it helps us make sure existing functionality didn't break (some people call this regression testing).
- It helps us be confident that a given piece of functionality works as intended without having to rely on manually testing many different application states.
- When we encounter bugs, it helps us quickly pinpoint where in the code something went wrong.
- Sometimes people even like to write the tests before the functionality itself, helping us design our actual application code in a strategic way (this is called Test Driven Development).
- And the benefits go on and on...

## Setup

Let's dive into writing a real test - but we'll have to do some setup first. Open up your terminal and navigate to a directory in which you'd like your practice app to live. Then do

```
npx create-react-app my-app
```

This should make the `my-app` directory and in it you'll find the contents of a ready-to-go React app. (If you don't have npx you'll have to install npm). You'll also have to install some dependencies. Do

```
npm install --save enzyme enzyme-adapter-react-16 react-test-renderer
```

from the `my-app` directory. Enzyme is a popular React unit testing library that helps us "shallowly" render our components (we'll get to that), and the other two packages are just things we need for enzyme to work.

Now open up the `my-app` directory in your favorite IDE and make a `setupTests.js` file under the `src` directory. In it, write

```javascript
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

Create React App knows to run this special `setupTests.js` file before running our tests, so that Enzyme works correctly.

## Your First React Component Test

Now let's get testing. Open up `src/App.js` and have the component just return a simple `<div>Hello World!</div>` instead of all the stuff that's currently there. So your component should look like

```javascript
import React from 'react';

function App() {
  return <div>Hello World!</div>;
}

export default App;
```

Now open up `src/App.test.js` and delete all the contents. Replace it with the following:

```javascript
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shalllow(<App />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
```

We've just written our first test. Let's go through this line by line.

The `describe` function is just a way for us to organize our tests into what are called "suites". In our case, the describe block will contain a suite of tests that all test various functionalities of our `App` component.

The `it` function allows us to write out what we expect the component to do during this test, in plain English.

The content of the test resides within the callback function provided as the second parameter of the `it` function. First, we shallowly render our `App` component. This means that we don't render any of the component's children - we only render one level deep. This is a way we keep the unit tests encapsulated so that if there are issues with components further down the tree, those issues don't affect the component we are currently testing.

Enzyme's `shallow` function returns a wrapper. This wrapper is super helpful to us in many ways, but for now we'll just use its most basic method: `.get(0)`. Doing `wrapper.get(0)` just returns the rendered component itself, which we ask jest to snapshot.

`expect(...).toMatchSnapshot();` just asks jest to take a snapshot of whatever's inside the `expect()` and save that to a file. Then, every subsequent time you run this test, jest will know to compare the result to this snapshot file and alert you if anything has changed.

Let's run the test. Go to the `my-app` directory in your terminal and run `npm test`. This should bring up the jest interactive test runner and automatically run your tests. If it doesn't auto-run, just press "a" to run all tests.

You should see "1 snapshot written." in green. Since this is the first time we ran this test, jest has written a new snapshot file for us. You'll notice in your IDE that a `__snapshots__` directory has been created for us under the `src` directory. Open up the `App.test.js.snap` file that's inside it.

This is a snapshot file - this is what jest compares your component to, every time you run this test. These snapshot files should be treated like source code - they should be reviewed in PRs, and committed alongside your changes in git.

## Making Changes

Now let's make some changes. Go back to `App.js` and change "Hello World!" to "Hi World!". Save the file. If you left your jest interactive test runner on, you should see that the tests automatically re-ran for you, and now you have a failure. (If you didn't leave it on, just run `npm test` again) And the jest output so helpfully shows you in green and red what was expected, and what was found instead.

This is the power of unit testing - if we made a change that our tests didn't expect, the tests fail, alerting us to our changes.

In normal development, you could have made this change for a few different reasons. Maybe you didn't meant to write "Hi" and you made a mistake. in which case, you'd see that the test failed and you would go and put the "Hello" back. Maybe you actually meant to change the "Hello" to "Hi", in which case you want to update the snapshot.

In our case, we'll pretend that we actually wanted to make this change and let's go ahead and update the snapshot. In the jest interactive test runner, press "u". This should go and update the snapshot.

**NOTE**: During actual development, be *very* careful when updating snapshots. Never EVER run all the tests in a repository all at once and update all the snapshots. Failing snapshots should be inspected one by one to make sure you intended to make the change before you update it. This will help you catch those cases when you *didn't* mean to make a change.

## Testing Functionality

Our App component is currently very boring - it doesn't do anything. Let's make it do something. Replace your App component with the following:

```javascript
import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('Not Clicked');

  return (
    <button onClick={() => setText('Clicked')}>
      {text}
    </button>
  );
}

export default App;
```

As you've probably gathered, this first renders a button with the text "Not Clicked". Then when you click the button, the text changes to "Clicked".

Let's test this. We'll first leave the test as-is, and re run it (`npm test`). The test should be complaining about snapshots not matching up. Since we intended to make this change, go ahead and press "u" to update the snapshot. Then go to `App.test.js` and write

```javascript
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shalllow(<App />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('displays "Clicked" after user clicks', () => {{
    const wrapper = shallow(<App />);
    wrapper.find('button').simulate('click');
    expect(wraper.find('button').text()).toBe('Clicked');
  }});
});
```

We didn't touch the first test, we just added a second one into our suite. The first line of this new test is the same as the test we wrote before - we just create a shallowly rendered wrapper using Enzyme. The second line is where things get interesting.

The enzyme shallow wrapper has methods to allow us to interact with the component we just rendered. In this case, we want to `.find()` the `button` element and `.simulate()` a user click.

After doing this, we can now make our assertion on the third and last line of this test: we `expect()` the `.text()` inside our `button` element `.toBe('Clicked')`.

Almost every single test you write for any component will have this three part format. You set up the test:

```javascript
const wrapper = shallow(<App />);
```

then you act upon the component:

```javascript
wrapper.find('button').simulate('click');
```

then you assert that your action resulted in an output that you expected:

```javascript
expect(wraper.find('button').text()).toBe('Clicked');
```

[Enzyme's Shallow Rendering API](https://airbnb.io/enzyme/docs/api/shallow.html) contains many helpful methods other than `.find()` or `.simulate()`.

## Important Aside

Many people ask at this point, why didn't we just simulate the click and then snapshot the new state of the component?

It's true that doing that will work. It will give you a passing test and if you change the "Clicked" text to something different like "I was clicked!", the test will fail, which is what you want. But this is bad because if you change a different part of the component, this test will also fail. That should not happen.

A single unit test should test one thing and one thing only. It should only fail if that one thing changed, and otherwise should keep passing. If we snapshotted the result of our click, then someone changing some other part of the snapshot might make our click test fail, but our click test should only fail if someone changes the click result. So it is much better to write a much more specific assertion by specifically finding the text inside the button and asserting on that.

## Props and Mocking

Now let's take this one step further. Create a file called `MyComponent.js` in the same directory as `App.js`. In it, write:

```javascript
import React from 'react';

export default function MyComponent({ displayText, onBtnClick }) {
  return (
    <button onClick={onBtnClick}>{displayText}</button>
  );
}
```

Then change the contents of your `App` component to look like

```javascript
import React, { useState } from 'react';
import MyComponent from './MyComponent';

function App() {
  const [text, setText] = useState('Not Clicked');

  return (
    <MyComponent displayText={text} onBtnClick={() => setText('Clicked')} />
  );
}

export default App;
```

You'll notice all we've done is just move the same functionality down into a child component. When rendered all together as an application, we'll still see a button that changes from "Not Clicked" to "Clicked" when a user clicks it. But now, our tests will look a little different.

First, let's fix our existing tests. Your `App.test.js` should now look like:

```javascript
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
```

You might now say, "wait, that looks exactly the same as before adding the button." That's correct. Our `App` component's responsibility has once again become "just render this one thing." Except unlike before, "this one thing" is now a new component called `MyComponent` instead of the `<div>Hello World!</div>`. Run npm test and press u to update the snapshot again.

Now make a `MyComponent.test.js` file in the same directory as `MyComponent.js`. In it, write:

```javascript
import React from 'react';
import { shallow } from 'enzyme';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders without crashing', () => {
    const wrapper = shalllow(
      <MyComponent displayText="test text" onBtnClick={() => {}} />
    );
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('calls onBtnClick when user clicks', () => {
    const onBtnClickMock = jest.fn();
    const wrapper = shallow(
      <MyComponent displayText="test text" onBtnClick={onBtnClickMock} />
    );

    wrapper.find('button').simulate('click');

    expect(onBtnClickMock).toHaveBeenCalled();
  });
});
```

The first test in the suite should make sense to you at this point - we're just snapshotting the default rendered state of `MyComponent`. Since we don't interact with the `onBtnClick` prop function when we render the component, it can be an empty function (`() => {}`).

The second test involves a bit more setup. We first create what is called a mock function, or commonly just called a "mock." Jest allows us to create these easily by just calling `jest.fn()`. This is now for all intents and purposes a function that remembers when it was called and how it was called. This is useful to us because if we provide this mock to our component as a prop, we can later assert on whether it was called.

We shallowly render `MyComponent`, but this time since `MyComponent` expects some props, we provide them. As previously mentioned, we'll provide the mock we created as the `onBtnClick` prop.

Then we simulate a user click just as we did before.

But now, we don't assert that the button contains the text we expect. The action of switching the text isn't `MyComponent`'s job anymore - it's `App`'s. `MyComponent`'s job is to simply call the provided `onBtnClick` prop function when the user clicks the button. So, we make sure that this is what happened by asserting on the mock we provided as a prop:

```javascript
expect(onBtnClickMock).toHaveBeenCalled();
```

This is for the most part how you will test the interaction of child components with their parent - by providing props when setting up your test, and asserting on any mocks that you may have created.

## Philosophy

*(See [CONTRIBUTING.md](CONTRIBUTING.md) for more details)*

An important concept to understand is that tests should provide some input, then assert on the output. That is a test's only job. The test should not care how the thing being tested performs its work - it only cares that given A, it outputs B.

This means that when testing a pure function, we should only assert on its return value (or the mocks that we provide to it as inputs). For React components, this means that we should only assert on its render (which is a React component's return value) using Enzyme (or the mocks that we provide to it as props).

Why is this important? Because of [this very simple idea](https://twitter.com/kentcdodds/status/977018512689455106?lang=en):

> The more your tests resemble the way your software is used, the more confidence they can give you.

A React component can only be "used" in two ways - either a user interacts with it, or it's given some props by a parent component. So a unit test should only ever simulate user interaction or provide props. A React component can only ever output some render, so we should only ever assert on what it's rendered. This means if you find yourself making assertions on component state, you're writing a bad unit test.

## Guidelines

- A component's test file should really only have one snapshot test. The rest of the component's functionality should be tested by simulating user input or passing in props.
- Whenever you write a new functionality that allows the user to interact (a button that does something on click, a text input, etc), you should write a test that goes with that functionality.
- Whenever you have some logic (anywhere in the codebase) that is complicated and should be broken out into its own function, test that function in isolation (give it its own 'describe' block).
- **NEVER EVER** assert on a component's state. State is internal to the component and should never be exposed to a unit test.
- Reducers should just be tested as normal functions, since that's all they are - pure functions.
