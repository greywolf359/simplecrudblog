import React, {Component} from 'react';
import Header from './header';
import List from './list';
import Footer from './footer';

//wire up provider around root component
class App extends Component{
	constructor(props){
		super(props);
		this.posts = [];
		this.state = {posts: []};
	}

	componentDidMount(){
		
		$.ajax({
			url: '/initialize',
			method: 'get',
			success: (data)=>{
				//it is necessary to use state in order for the child components to update
				//if you do not, the child will render before the ajax call finishes thus 
				//giving you a component with no data
				this.setState({posts: data});
				
			},
			error: (e)=>{
				console.log("there was an error with retreival",e);
			}
		})
	}

	render(){
		
		return(
			<div>
				<Header/>
				<List posts = {this.state.posts}/>
				<Footer/>
			</div>
		)
	}
}

export default App;

//the only way i can see to do this is to make an ajax call in componentdidmount() and render the data that way
//in future projects you will havve to find a different way to load data.  you can try that or go the template route and
//create a views folder