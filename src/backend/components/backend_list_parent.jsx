//container component will have accesss to store
//import List from backend_list
import React from 'react';
import {bindActionCreators} from 'redux';
import List from './backend_list.jsx';
import Modal from './modal/modal.jsx';
import Input from './input.jsx';
import {connect} from 'react-redux';
import actions from '../../actions';
//var store = require('../../store.js');

var data = [
	{
		title: "this is a title",
		body: "this is a paragraph",
		date: "10/24/2017"
	},
	{
		title: "this is a very long title",
		body: "i hope i can get this",
		date: "1/5/2117"
	},
	{
		title: "another title",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		date: "1/5/2117"
	}

]

class Backend_List_Parent extends React.Component{


	//i dont know what the state C: 'none' is for but if this fucks up after you delete it,
	//here it is C: "none"
	constructor(props){
		super(props);
		this.state = {isOpen: false, refresh: true, updateFlag: false};
		this.getPostContent = this.getPostContent.bind(this);
		this.changeState = this.changeState.bind(this);
		this.removePost = this.removePost.bind(this);
		this.editPost = this.editPost.bind(this);
		this.changeUpdateState = this.changeUpdateState.bind(this);
		this.updatePostAjax = this.updatePostAjax.bind(this);
	}

	changeState(status){
		this.setState({isOpen: status});
		
	}

	changeUpdateState(status){
		this.setState({updateFlag: status});
	}

	//this gets the contents from the text editor and passes it to the create action
	getPostContent(_id = 1000, title,content,time){
		//actions.create(content);
		//let post_id = id + 1; 
		this.props.dispatch(actions.create(_id,title,content,time));
		//actions.create(id,title,content,time)
	}

	//populate the list with whatever is in the database
	componentDidMount() {
		$.ajax({
			url: '/initialize',
			method: 'get',
			success: (data)=>{
				//you received an array of objects here
				this.props.dispatch(actions.read(data.reverse()));
			},
			error: (error)=>{console.log("backend_list_parent encountered an error in componentDidMount()....", error)}
		});
		
	}

	//editPost only needs to load the desired post object from the store
	//you should not do an ajax call here
	editPost(postObj){
		//you need to find a way to trigger the Input component here
		this.props.dispatch(actions.update(postObj));
		this.setState({updateFlag: true});
		this.changeState(true);
	}	

	//this needs to be referenced in input component so the updated post can be passed to db
	updatePostAjax(postObj){
		$.ajax({
			url: '/update',
			method: 'post',
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify(postObj),
			success: (data)=>{
				this.props.dispatch(actions.update(postObj));
				
			},
			error: (xhr, status, error)=>{
				console.log("editPost encountered an error while doing ajax operation. ", error)
			}
		})
	}

	removePost(_id){
		this.props.dispatch(actions.remove(_id));
		//this.setState({refresh: true})
	}

	//had to do this in order to update the backend_list after a new post submission in order to get 
	//mongos _id into the redux store.
	componentDidUpdate(prevProps, prevState){
		if(prevState !== this.state){
			$.ajax({
				url: '/initialize',
				method: 'get',
					success: (data)=>{
					//you received an array of objects here
					this.props.dispatch(actions.read(data.reverse()));
				},
				error: (error)=>{"backend_list_parent encountered an error in componentDidMount()....", error}
			})	
			//this.setState({refresh: false})
		}
	}

	render(){
		let postToUpdate = this.props.updatePost;
		let title = {
			backgroundColor: "#ccffdd",
			color: "white",
			fontFamily: "Arial",
			fontWeight: "bold",
			fontSize: '25px',
			padding: '10px 10px 10px 5px',
			borderRadiusTopLeft: '10px',
			borderRadiusTopRight: '10px'
		}

		let btn_close = {
			marginTop: '5px',
			float: 'right',
			padding: '1px 5px 1px 5px'
		}

		/*
			<List/> - is the list of posts 
			<button> is 'create new post' underneath
			<Modal> is the parent of the <Input/> component or the text editor
			what you need to to is find a way to get the selected post into the <Input/> component
		*/



		return (

			<div>
				<List data = {this.props.post} deleteItem={this.removePost} editItem = {this.editPost}/>
				<button onClick = {()=>{this.changeState(true)}} className = "btn btn-default">Create New Post</button>

				
				<Modal isOpen = {this.state.isOpen} setState = {this.changeState}>
					<div style = {title}>New Post
						<button onClick = {()=>{this.changeState(false);this.changeUpdateState(false)}} className = "btn btn-success"  style = {btn_close}>X</button>
					</div>
					<Input 
						getPost = {this.getPostContent} 
						changeState = {this.changeState} 
						postToUpdate = {postToUpdate} 
						updateFlag = {this.state.updateFlag} 
						updateStatus = {this.changeUpdateState}
						updatePostAjax = {this.updatePostAjax}
					/>
					</Modal>
			</div>
		)
	}
}

/*
function mapDispatchToProps(dispatch){
	
	//return dispatch({type: 'TEST', payload: 'ok here is post'});
	return bindActionCreators(actions, dispatch);

}
*/

function mapStateToProps(state){
	return state;
}
export default connect(mapStateToProps)(Backend_List_Parent);