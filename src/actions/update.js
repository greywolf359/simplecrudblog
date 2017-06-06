//changing _id arg to take entire post obj from list_item component
var update = (postObj)=>{
	return {
		type: 'UPDATE',
		postObj: postObj
	}
	
}

module.exports = update;

//you need to first load the post object
//second you need to do the ajax call
//you need to do the ajax call to update someplace else

/*
	return(dispatch)=>{
		//ajax is suppose to send the _id to server.js and return the desired post object
		$.ajax({
			url: '/update',
			method: 'get',
			data: postObj,
			success: (data)=>{
				console.log("update action is firing...data returned--->", data)
				dispatch({
					type: 'UPDATE',
					postObj: data
				})
			},
			error: (xhr, status, error)=>{
				console.log("update action encountered an error while doing ajax operation. ", error)
			}
		})
	}
	*/