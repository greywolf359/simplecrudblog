//text editor code
import React from 'react';
import redux from 'redux';

class Input extends React.Component{
	constructor(props){
		super(props);
		this.doc = props.doc;
		this.editor = null;
		this.operations = this.operations.bind(this);

	}

	/*
	onload(){
		var doc = document.getElementById("text_editor");
		console.log("doc", doc.contentDocument);

	}
	*/

	//you are building the select pulldown here
	buildSelect(options, className, cmd){
		
		return(
			<select className = {className} id = {cmd} onChange = {(event)=>{
				var element = document.getElementById(cmd);
				this.operations(cmd,false,element[element.selectedIndex].text);

			}}>
				{options.map((element,index)=>{
					return <option value={element} key={index}>{element}</option>
				})}
			</select>
			

		)
	}

	//you will need to add some sort of float class to get this to work right
	//and a class to resize any inserted images
	//youll need to target images specifically in #text_editor to accomplish this
	getImageURI(){
		var location = prompt("Enter image location:");
		if (location !== ""){
			let url = encodeURI(location);
			this.operations("insertImage", false, url);
		}
	}

	hyperlink(){

		var link = prompt("Enter a link", "http://");

		if(link !== '' || link !== "http://"){
			this.operations("createLink", false, link);

		}else{
			return null;
		}
	}

	operations(cmd, ui = false, arg = null){
		
		document.execCommand(cmd,ui,arg);
		document.getElementById("text_editor").focus();

	}

	//here you are pulling out the content to create a new post
	getContents(){

		let {getPost, changeState} = this.props;
		
		let title = document.getElementById("title").value;
		let content = document.getElementById("text_editor").innerHTML;
		//var _id = 0;

		if (content && content !== "" &&  title !== ""){
			let time = Date.now();
			
			var id = null;
			getPost(id,title,content,time); //send post data to the backend_list_parent
			changeState(false); //change the state of the modal to false to close the text editor
		}

		document.getElementById("title").value = "";
		document.getElementById("text_editor").innerHTML = "";
	}

	//first the input component keeps popping back up
	//second the edit post continues to appear if i try to create a new post

	//you are updating an existing post here
	updateContents(){
		console.log("update contents firing....");
		let title = document.getElementById("title").value;
		let post = document.getElementById("text_editor").innerHTML;
		let _id = this.props.postToUpdate._id;
		if (content && content !== "" &&  title !== ""){
			let time = Date.now(); //use current date on updated post
			this.props.updatePostAjax({_id,title,post,time}); //submit new data for updating the state and the db
			this.props.updateStatus(false); //change the state of the update button back to submit
			this.props.changeState(false); //close the text editor
		}

		document.getElementById("title").value = "";
		document.getElementById("text_editor").innerHTML = "";
	}

	//you may have to try and use an internal state here to get rid of the delay when loading the content of another post
	//maybe use componentWillREceiveNewProps
	//maybe try to get the content out of the existing dom rather than another ajax call
	InsertContentToUpdate(){
		if (typeof this.props.postToUpdate !== 'undefined'){
			return this.props.postToUpdate;
		}
		return null;
	}

	//change button depending on if new post or updating existing post
	changeButton(){
		if (this.props.updateFlag){
			return <button onClick = {()=>{this.updateContents()}} className = "btn btn-primary">Update</button>
		}
		return <button onClick = {()=>{this.getContents()}} className = "btn btn-default">Submit</button>

	}

	render(){
		
		var toolbar_img = ['bold', 'underline', 'italic', 'insertUnorderedList', 'insertOrderedList'];
		var toolbar_font = ['Arial', 'Times New Roman'];
		var toolbar_font_size = [1,2,3,4,5,6,7];
		var toolbar_font_color = ['black', 'blue', 'red','green'];
		let self = this;

		let titleBox = {
			width: '92%',
			height: '24px',	
		}

		let titleLabel = {
			paddingRight: "10px"
		}

		var contentToInsert = this.InsertContentToUpdate();
		//let $parsedContent = $.parseHTML(contenttoInsert.post, $('#text_editor'), false);


		return (
			<div className = "text_editor_container">
				<label htmlFor = "title" style = {titleLabel}>Title:</label>
				<input type = "text" id = "title" name = "title" className = "form-control" style = {titleBox} defaultValue = {!null ? contentToInsert.title : null}/>
				<div className = "toolbar">
					{/*basic commands that dont require an arg*/}
					{toolbar_img.map((el,index)=>{
							return(
							<img src = {`img//${el}.png`} id = "toolbaritem" onClick = {()=>{this.operations(el)}} key={index}/>
						)
					})}
					{/*link insertion*/}
					<img src = "img\link.png"  id = "toolbaritem" onClick = {()=>{this.hyperlink()}}/>
					<img src = "img\image.png"  id = "toolbaritem" onClick = {()=>{this.getImageURI()}}/>
					{this.buildSelect(toolbar_font, "font_options", "fontName")}
					{this.buildSelect(toolbar_font_size, "size_options", "fontSize")}
					{this.buildSelect(toolbar_font_color, "color_options", "foreColor")}


					
				</div>
				<div id = "text_editor" contentEditable = "true" suppressContentEditableWarning={true}>{contentToInsert.post}</div>
				{this.changeButton()}
			</div>
		);
	}
}

Input.propTypes = {
	getContents: React.PropTypes.func,
	changeState: React.PropTypes.func,
	updateStatus: React.PropTypes.func,
	updatePostAjax: React.PropTypes.func,
	updateFlag: React.PropTypes.bool
}

export default Input;
