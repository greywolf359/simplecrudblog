//this will be the presentational component for each item
import React from 'react';

class Item extends React.Component{

	constructor(props){
	super(props);
	this.state = {altFlag: true};
	}

	expand(id){
		
		var classname = document.getElementsByClassName("accordian");
		var $span = $(`#title_${id}`);

		$($span).toggleClass('active');

		$(`#${id}`).slideToggle("slow");	
	}

	delete_post(_id,event){
		event.stopPropagation();
		this.props.deleteItem(_id);
	}

	//changing _id arg to accept whole post object
	edit(postObj,event){
		event.stopPropagation();
		this.props.editItem(postObj);
	}

	render(){
		let {_id, title, post, time} = this.props.data;
		let bg_color = this.props.color;
		let d = new Date(time);
		let date = d.toString();
		let dateStr = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
		return (
			<div className = "accordian_container">
				<div className = "accordian" id = {`title_${_id}`} onClick={()=>{this.expand(_id)}} style = {{backgroundColor: bg_color}}>
					<p className = "title">
						{title}
					</p>
					
					<p className = "date">{dateStr}</p>
					
					<button  className = "btn btn-success edit" onClick = {(e)=>{this.edit(this.props.data,e)}}>Edit</button>
					<button  className = "btn btn-danger delete" onClick = {(e)=>{this.delete_post(_id,e)}}>Delete</button>
				</div>
				<div className = "panel" id = {_id}>{post}</div>
			</div>
		)
	}
}
//onClick = {(e)=>{this.edit(_id,e)}}


Item.propTypes = {
	deleteItem: React.PropTypes.func.isRequired,
	editItem: React.PropTypes.func.isRequired
}

export default Item;

