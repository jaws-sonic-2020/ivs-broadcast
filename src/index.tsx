import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
// @ts-ignore
import JavascriptTimeAgo from 'javascript-time-ago'
// @ts-ignore
import en from 'javascript-time-ago/locale/en'
// @ts-ignore
import ja from 'javascript-time-ago/locale/ja'

JavascriptTimeAgo.addLocale(en)
JavascriptTimeAgo.addLocale(ja)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
