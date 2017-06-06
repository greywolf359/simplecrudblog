import React, {Component} from 'react';
import {connect} from 'react-redux';
import Post from './post';

//do you want to make list a container, wire up using connect

class List extends Component{
	/*
	constructor(props){
		super(props);
	}
	*/

	render(){
		console.log("props.posts: ", this.props.posts)
		var {posts} = this.props;
		return (
			<div>
			List component
				<Post posts = {posts}/>
			</div>
		)
	}
}



function mapStateToProps(state){
	return state;
}

//list component should get an array of objects
List.propTypes = {
	posts: React.PropTypes.array
}

List.defaultProps = {
	posts: [1,2,3]
	
}

export default connect(mapStateToProps)(List);