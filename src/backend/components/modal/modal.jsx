import React from 'react';
//the parent of the modal will control whether or not to render it based on a boolean value

class Modal extends React.Component{

	render(){
		
		if (this.props.isOpen === false){
			return null;
		}

		let modalStyle = {
			width: '50%',
			position: 'absolute',
			top: '120px',
			left: '25%',
			overflow: "hidden",
			zIndex: '9999',
			background: '#ccffdd',
			border: "1px solid black",
			borderRadius: '10px',
			padding: '5px'
			
		}

		let backDrop = {
			position: 'absolute',
			top: '0',
			left: '0',
			width: '100%',
			height: '100%',
			zIndex: '9998',
			background: 'rgba(0,0,0,0.8)'
		}

		return(
			<div>
			<div style = {modalStyle}>
				{this.props.children}
			</div>
			<div style = {backDrop}>
			</div>

			</div>
			)
	}
}


//marginTop: '-150px',
//marginLeft: '150px',
export default Modal;