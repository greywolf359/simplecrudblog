//entry 2 for webpack
//backend/index.jsx
import React from 'react';
import reactDOM from 'react-dom';
import Input from './components/input.jsx';
import Backend_List_Parent from './components/backend_list_parent.jsx';
import store from '../store.js';
//import db from '../database/connect';
import {Provider} from 'react-redux';

console.log("Input@entry:", typeof Input);
//Input will get rendered to dom in the root element
reactDOM.render(
	<Provider store = {store}>
	<Backend_List_Parent/>
	</Provider>, 
	document.getElementById("root"));

//<Input doc = {document}/>