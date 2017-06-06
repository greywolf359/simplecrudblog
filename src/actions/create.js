//package data from input component into an object with a type before dispatch send it to the reducers

/*
var create = (id,title,post,time)=>{
	
	return {
		type: "CREATE",
		payload: {id: id, title: title, post: post, time: time}
	}
}
JSON.stringify({id: id,title: title,post:post,time:time})
*/

var create = function(_id = null, title, post, time){

	//i dont think this is relevant
	if (_id === null){
		_id = 1001;
	}

	return (dispatch)=>{
		
		$.ajax({
			method: 'post',
			url: '/backend',
			contentType: 'application/json',
			dataType: 'json',
			xhrFields: {withCreditionals: false},
			data: JSON.stringify({title, post, time}),
			error: (jqXHR, status, error)=>{console.log("jquery ajax returns an error: ", error, 'STATUS: ', status)},
			success: (data,textStatus,jqXHR)=>{
				console.log("jquery was successful", data, textStatus);
				//you need to trigger an update from the db here somehow
				dispatch({
					type: "CREATE",
					payload: {_id: _id, title: title, post: post, time: time}
				})
			}
		})
	}
}
module.exports = create;

//you need to sommehow get the contents from input component and get it to the server so mongoose
//can update the database

//so you want to first update mongo before updating the store, so you havfe to use redux-thunk to delay
//the update, depending on what mongo returns


/*
function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch` 
      dispatch(increment());
    }, 1000);
  };
}

unction myThunkActionCreator(someValue) {
    return (dispatch, getState) => {
        dispatch({type : "REQUEST_STARTED"});
        
        myAjaxLib.post("/someEndpoint", {data : someValue})
            .then(response => dispatch({type : "REQUEST_SUCCEEDED", payload : response})
            .catch(error => dispatch({type : "REQUEST_FAILED", error : error});    
    };
}

*/