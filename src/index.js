//entry for webpack
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import store from './store';
//import db from '../database';
//the base file that is rendered to dom
//provider would have to go here so the containers can access the store







ReactDOM.render(<Provider store = {store}><App/></Provider>, document.getElementById('root'));