import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import './App.css';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
// render((
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// ), document.getElementById('root'));
