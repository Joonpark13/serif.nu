import React from 'react';
import ReactDOM from 'react-dom';
import MyApp from './MyApp';

function Index() {
  return <MyApp />;
}

ReactDOM.render(
  <Index />, document.getElementById('root'),
);
