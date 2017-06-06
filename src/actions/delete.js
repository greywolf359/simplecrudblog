var remove = (_id)=>{ 
		return (dispatch)=>{
			$.ajax({
			url: '/remove',
			data: {id: _id},
			dataType: 'json',
			method: 'get',
			success: (data)=>{
				dispatch({
				type: "REMOVE",
				_id: _id
				})
			},
			error: (jqXHR, textStatus, error)=>{console.log('your delete action has failed...', error, textStatus)}
		})
		

	}
}

module.exports = remove;

/*
		
		*/

	