//this will be the list
import React from 'react';
import Item from './list_item.jsx';

class List extends React.Component{

	dataCheck(){
		
		if (!this.props.data){
			return <p>Nothing to display</p>
		}
		
		return this.props.data.map((data, index)=>{

			if(index % 2 === 0){
				return <Item data = {data} deleteItem = {this.props.deleteItem} editItem = {this.props.editItem} key = {index} id={index} color = "#e6ffe6"/>
			}else{
				return <Item data = {data} deleteItem = {this.props.deleteItem} editItem = {this.props.editItem} key = {index} id={index} color = "#ccffcc"/>
			}
		})
		
	}


	render (){
		var {data} = this.props;
		return (
			<div>
			{this.dataCheck()}
			</div>
		)
	}
}

List.propTypes = {
	deleteItem: React.PropTypes.func.isRequired,
	editItem: React.PropTypes.func.isRequired
}

export default List;
