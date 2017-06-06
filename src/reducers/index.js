//thing to remember when building reducers
/*
reducers will give your state a shape
all of the state is stored in a single object
try to refrain from nesting

*/


//action.payload isnt getting to reducer...why?
function post(state = {}, action){
	
	switch(action.type){
		case 'CREATE':
			return [action.payload, ...state];
		case 'READ':
			return action.payload;
		case 'REMOVE':
			//console.log("THIS IS IN THE REDUCER REMOVE CASE", state);
			var result = state.filter((obj)=>{return obj._id !== action._id});
			return result;
		default: return state;
	}
}

function update(state = {}, action){
	switch(action.type){
		case 'UPDATE':
			return action.postObj;
		default: return state;
	}
}

module.exports = {post, update};

//post: [{_id: 1111, title: "title", post: "", time: 123}, {}, {}]
//post[0]._id

