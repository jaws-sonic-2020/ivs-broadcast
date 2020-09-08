import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ja from 'javascript-time-ago/locale/ja'
import 'moment/locale/ja'

JavascriptTimeAgo.addLocale(en)
JavascriptTimeAgo.addLocale(ja)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('ivs-player')
)
