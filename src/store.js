

//did not like import redux for some reason
var redux = require('redux');
var post = require('./reducers/index');
var create = require('./actions/create');
import thunk from 'redux-thunk';

//console.log("action:", typeof actions, actions)
//console.log("post:", typeof post, post);
var reducer = redux.combineReducers({
	post: post.post,
	updatePost: post.update
})


var composeInhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
var initialState = {
	post:[
		{
		id: 1001,
		title: "initialTitle",
		post: "post body",
		time: 1234
	}]
}
const store = redux.createStore(reducer, 
	initialState, 
	composeInhancers(redux.applyMiddleware(thunk)));


//store.dispatch(actions());

/*
store.subscribe(()=>{
	console.log("***CURRENT STORE STATE***", store.getState());
})
*/
export default store;

