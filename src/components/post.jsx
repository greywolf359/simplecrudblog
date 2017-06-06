import React, {Component} from 'react';
import moment from 'moment';

//post should be a presentation component so should receive data
//passed down via props
class Post extends Component{


	renderPosts(post){
		var date = moment(post.time).format('MM DD YYYY')
		
		return (
			
			<div className = "panel panel-default">
			<div className = "panel-heading post-title">
				<h2 className="strip-top-margin strip-bottom-margin">{post.title}</h2>
				<h5 className="strip-top-margin add-bottom-margin">{date}</h5>
			</div>
			<div className = "panel-body post-body">
			<p>{post.post}</p>
				
			</div>
			</div>
		)
		
	}
	

	render(){
		var {posts} = this.props;
		return(
			<div>
				{
					posts.map((post)=>{
						
						return this.renderPosts(post);
					})
				}
			post component
			</div>
		)
	}
}


Post.propTypes = {
	posts: React.PropTypes.array
}

export default Post;