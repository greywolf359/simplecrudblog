webpackJsonp([1],{

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(36);

var _backend_list = __webpack_require__(222);

var _backend_list2 = _interopRequireDefault(_backend_list);

var _modal = __webpack_require__(224);

var _modal2 = _interopRequireDefault(_modal);

var _input = __webpack_require__(61);

var _input2 = _interopRequireDefault(_input);

var _reactRedux = __webpack_require__(22);

var _actions = __webpack_require__(219);

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //container component will have accesss to store
//import List from backend_list


//var store = require('../../store.js');

var data = [{
	title: "this is a title",
	body: "this is a paragraph",
	date: "10/24/2017"
}, {
	title: "this is a very long title",
	body: "i hope i can get this",
	date: "1/5/2117"
}, {
	title: "another title",
	body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	date: "1/5/2117"
}];

var Backend_List_Parent = function (_React$Component) {
	_inherits(Backend_List_Parent, _React$Component);

	//i dont know what the state C: 'none' is for but if this fucks up after you delete it,
	//here it is C: "none"
	function Backend_List_Parent(props) {
		_classCallCheck(this, Backend_List_Parent);

		var _this = _possibleConstructorReturn(this, (Backend_List_Parent.__proto__ || Object.getPrototypeOf(Backend_List_Parent)).call(this, props));

		_this.state = { isOpen: false, refresh: true, updateFlag: false };
		_this.getPostContent = _this.getPostContent.bind(_this);
		_this.changeState = _this.changeState.bind(_this);
		_this.removePost = _this.removePost.bind(_this);
		_this.editPost = _this.editPost.bind(_this);
		_this.changeUpdateState = _this.changeUpdateState.bind(_this);
		_this.updatePostAjax = _this.updatePostAjax.bind(_this);
		return _this;
	}

	_createClass(Backend_List_Parent, [{
		key: 'changeState',
		value: function changeState(status) {
			this.setState({ isOpen: status });
		}
	}, {
		key: 'changeUpdateState',
		value: function changeUpdateState(status) {
			this.setState({ updateFlag: status });
		}

		//this gets the contents from the text editor and passes it to the create action

	}, {
		key: 'getPostContent',
		value: function getPostContent() {
			var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

			var title = arguments[1];
			var content = arguments[2];
			var time = arguments[3];

			//actions.create(content);
			//let post_id = id + 1; 
			this.props.dispatch(_actions2.default.create(_id, title, content, time));
			//actions.create(id,title,content,time)
		}

		//populate the list with whatever is in the database

	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			$.ajax({
				url: '/initialize',
				method: 'get',
				success: function success(data) {
					//you received an array of objects here
					_this2.props.dispatch(_actions2.default.read(data.reverse()));
				},
				error: function error(_error) {
					console.log("backend_list_parent encountered an error in componentDidMount()....", _error);
				}
			});
		}

		//editPost only needs to load the desired post object from the store
		//you should not do an ajax call here

	}, {
		key: 'editPost',
		value: function editPost(postObj) {
			//you need to find a way to trigger the Input component here
			this.props.dispatch(_actions2.default.update(postObj));
			this.setState({ updateFlag: true });
			this.changeState(true);
		}

		//this needs to be referenced in input component so the updated post can be passed to db

	}, {
		key: 'updatePostAjax',
		value: function updatePostAjax(postObj) {
			var _this3 = this;

			$.ajax({
				url: '/update',
				method: 'post',
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify(postObj),
				success: function success(data) {
					_this3.props.dispatch(_actions2.default.update(postObj));
				},
				error: function error(xhr, status, _error2) {
					console.log("editPost encountered an error while doing ajax operation. ", _error2);
				}
			});
		}
	}, {
		key: 'removePost',
		value: function removePost(_id) {
			this.props.dispatch(_actions2.default.remove(_id));
			//this.setState({refresh: true})
		}

		//had to do this in order to update the backend_list after a new post submission in order to get 
		//mongos _id into the redux store.

	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			var _this4 = this;

			if (prevState !== this.state) {
				$.ajax({
					url: '/initialize',
					method: 'get',
					success: function success(data) {
						//you received an array of objects here
						_this4.props.dispatch(_actions2.default.read(data.reverse()));
					},
					error: function error(_error3) {
						"backend_list_parent encountered an error in componentDidMount()....", _error3;
					}
				});
				//this.setState({refresh: false})
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			var postToUpdate = this.props.updatePost;
			var title = {
				backgroundColor: "#ccffdd",
				color: "white",
				fontFamily: "Arial",
				fontWeight: "bold",
				fontSize: '25px',
				padding: '10px 10px 10px 5px',
				borderRadiusTopLeft: '10px',
				borderRadiusTopRight: '10px'
			};

			var btn_close = {
				marginTop: '5px',
				float: 'right',
				padding: '1px 5px 1px 5px'
			};

			/*
   	<List/> - is the list of posts 
   	<button> is 'create new post' underneath
   	<Modal> is the parent of the <Input/> component or the text editor
   	what you need to to is find a way to get the selected post into the <Input/> component
   */

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_backend_list2.default, { data: this.props.post, deleteItem: this.removePost, editItem: this.editPost }),
				_react2.default.createElement(
					'button',
					{ onClick: function onClick() {
							_this5.changeState(true);
						}, className: 'btn btn-default' },
					'Create New Post'
				),
				_react2.default.createElement(
					_modal2.default,
					{ isOpen: this.state.isOpen, setState: this.changeState },
					_react2.default.createElement(
						'div',
						{ style: title },
						'New Post',
						_react2.default.createElement(
							'button',
							{ onClick: function onClick() {
									_this5.changeState(false);_this5.changeUpdateState(false);
								}, className: 'btn btn-success', style: btn_close },
							'X'
						)
					),
					_react2.default.createElement(_input2.default, {
						getPost: this.getPostContent,
						changeState: this.changeState,
						postToUpdate: postToUpdate,
						updateFlag: this.state.updateFlag,
						updateStatus: this.changeUpdateState,
						updatePostAjax: this.updatePostAjax
					})
				)
			);
		}
	}]);

	return Backend_List_Parent;
}(_react2.default.Component);

/*
function mapDispatchToProps(dispatch){
	
	//return dispatch({type: 'TEST', payload: 'ok here is post'});
	return bindActionCreators(actions, dispatch);

}
*/

function mapStateToProps(state) {
	return state;
}
exports.default = (0, _reactRedux.connect)(mapStateToProps)(Backend_List_Parent);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var remove = function remove(_id) {
	return function (dispatch) {
		$.ajax({
			url: '/remove',
			data: { id: _id },
			dataType: 'json',
			method: 'get',
			success: function success(data) {
				dispatch({
					type: "REMOVE",
					_id: _id
				});
			},
			error: function error(jqXHR, textStatus, _error) {
				console.log('your delete action has failed...', _error, textStatus);
			}
		});
	};
};

module.exports = remove;

/*
		
		*/
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});


var actions = {
	create: __webpack_require__(62),
	remove: __webpack_require__(218),
	update: __webpack_require__(221),
	read: __webpack_require__(220)
};

exports.default = actions;

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var read = function read(data) {

	return {
		type: "READ",
		payload: data
	};
};

module.exports = read;

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//changing _id arg to take entire post obj from list_item component
var update = function update(postObj) {
	return {
		type: 'UPDATE',
		postObj: postObj
	};
};

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

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _list_item = __webpack_require__(223);

var _list_item2 = _interopRequireDefault(_list_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //this will be the list


var List = function (_React$Component) {
	_inherits(List, _React$Component);

	function List() {
		_classCallCheck(this, List);

		return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
	}

	_createClass(List, [{
		key: 'dataCheck',
		value: function dataCheck() {
			var _this2 = this;

			if (!this.props.data) {
				return _react2.default.createElement(
					'p',
					null,
					'Nothing to display'
				);
			}

			return this.props.data.map(function (data, index) {

				if (index % 2 === 0) {
					return _react2.default.createElement(_list_item2.default, { data: data, deleteItem: _this2.props.deleteItem, editItem: _this2.props.editItem, key: index, id: index, color: '#e6ffe6' });
				} else {
					return _react2.default.createElement(_list_item2.default, { data: data, deleteItem: _this2.props.deleteItem, editItem: _this2.props.editItem, key: index, id: index, color: '#ccffcc' });
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var data = this.props.data;

			return _react2.default.createElement(
				'div',
				null,
				this.dataCheck()
			);
		}
	}]);

	return List;
}(_react2.default.Component);

List.propTypes = {
	deleteItem: _react2.default.PropTypes.func.isRequired,
	editItem: _react2.default.PropTypes.func.isRequired
};

exports.default = List;

/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //this will be the presentational component for each item


var Item = function (_React$Component) {
	_inherits(Item, _React$Component);

	function Item(props) {
		_classCallCheck(this, Item);

		var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

		_this.state = { altFlag: true };
		return _this;
	}

	_createClass(Item, [{
		key: 'expand',
		value: function expand(id) {

			var classname = document.getElementsByClassName("accordian");
			var $span = $('#title_' + id);

			$($span).toggleClass('active');

			$('#' + id).slideToggle("slow");
		}
	}, {
		key: 'delete_post',
		value: function delete_post(_id, event) {
			event.stopPropagation();
			this.props.deleteItem(_id);
		}

		//changing _id arg to accept whole post object

	}, {
		key: 'edit',
		value: function edit(postObj, event) {
			event.stopPropagation();
			this.props.editItem(postObj);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props$data = this.props.data,
			    _id = _props$data._id,
			    title = _props$data.title,
			    post = _props$data.post,
			    time = _props$data.time;

			var bg_color = this.props.color;
			var d = new Date(time);
			var date = d.toString();
			var dateStr = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
			return _react2.default.createElement(
				'div',
				{ className: 'accordian_container' },
				_react2.default.createElement(
					'div',
					{ className: 'accordian', id: 'title_' + _id, onClick: function onClick() {
							_this2.expand(_id);
						}, style: { backgroundColor: bg_color } },
					_react2.default.createElement(
						'p',
						{ className: 'title' },
						title
					),
					_react2.default.createElement(
						'p',
						{ className: 'date' },
						dateStr
					),
					_react2.default.createElement(
						'button',
						{ className: 'btn btn-success edit', onClick: function onClick(e) {
								_this2.edit(_this2.props.data, e);
							} },
						'Edit'
					),
					_react2.default.createElement(
						'button',
						{ className: 'btn btn-danger delete', onClick: function onClick(e) {
								_this2.delete_post(_id, e);
							} },
						'Delete'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'panel', id: _id },
					post
				)
			);
		}
	}]);

	return Item;
}(_react2.default.Component);
//onClick = {(e)=>{this.edit(_id,e)}}


Item.propTypes = {
	deleteItem: _react2.default.PropTypes.func.isRequired,
	editItem: _react2.default.PropTypes.func.isRequired
};

exports.default = Item;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//the parent of the modal will control whether or not to render it based on a boolean value

var Modal = function (_React$Component) {
	_inherits(Modal, _React$Component);

	function Modal() {
		_classCallCheck(this, Modal);

		return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
	}

	_createClass(Modal, [{
		key: 'render',
		value: function render() {

			if (this.props.isOpen === false) {
				return null;
			}

			var modalStyle = {
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

			};

			var backDrop = {
				position: 'absolute',
				top: '0',
				left: '0',
				width: '100%',
				height: '100%',
				zIndex: '9998',
				background: 'rgba(0,0,0,0.8)'
			};

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ style: modalStyle },
					this.props.children
				),
				_react2.default.createElement('div', { style: backDrop })
			);
		}
	}]);

	return Modal;
}(_react2.default.Component);

//marginTop: '-150px',
//marginLeft: '150px',


exports.default = Modal;

/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //entry 2 for webpack
//backend/index.jsx

//import db from '../database/connect';


var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(23);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _input = __webpack_require__(61);

var _input2 = _interopRequireDefault(_input);

var _backend_list_parent = __webpack_require__(215);

var _backend_list_parent2 = _interopRequireDefault(_backend_list_parent);

var _store = __webpack_require__(37);

var _store2 = _interopRequireDefault(_store);

var _reactRedux = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("Input@entry:", typeof _input2.default === 'undefined' ? 'undefined' : _typeof(_input2.default));
//Input will get rendered to dom in the root element
_reactDom2.default.render(_react2.default.createElement(
	_reactRedux.Provider,
	{ store: _store2.default },
	_react2.default.createElement(_backend_list_parent2.default, null)
), document.getElementById("root"));

//<Input doc = {document}/>

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(36);

var _redux2 = _interopRequireDefault(_redux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //text editor code


var Input = function (_React$Component) {
	_inherits(Input, _React$Component);

	function Input(props) {
		_classCallCheck(this, Input);

		var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

		_this.doc = props.doc;
		_this.editor = null;
		_this.operations = _this.operations.bind(_this);

		return _this;
	}

	/*
 onload(){
 	var doc = document.getElementById("text_editor");
 	console.log("doc", doc.contentDocument);
 
 }
 */

	//you are building the select pulldown here


	_createClass(Input, [{
		key: 'buildSelect',
		value: function buildSelect(options, className, cmd) {
			var _this2 = this;

			return _react2.default.createElement(
				'select',
				{ className: className, id: cmd, onChange: function onChange(event) {
						var element = document.getElementById(cmd);
						_this2.operations(cmd, false, element[element.selectedIndex].text);
					} },
				options.map(function (element, index) {
					return _react2.default.createElement(
						'option',
						{ value: element, key: index },
						element
					);
				})
			);
		}

		//you will need to add some sort of float class to get this to work right
		//and a class to resize any inserted images
		//youll need to target images specifically in #text_editor to accomplish this

	}, {
		key: 'getImageURI',
		value: function getImageURI() {
			var location = prompt("Enter image location:");
			if (location !== "") {
				var url = encodeURI(location);
				this.operations("insertImage", false, url);
			}
		}
	}, {
		key: 'hyperlink',
		value: function hyperlink() {

			var link = prompt("Enter a link", "http://");

			if (link !== '' || link !== "http://") {
				this.operations("createLink", false, link);
			} else {
				return null;
			}
		}
	}, {
		key: 'operations',
		value: function operations(cmd) {
			var ui = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			var arg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


			document.execCommand(cmd, ui, arg);
			document.getElementById("text_editor").focus();
		}

		//here you are pulling out the content to create a new post

	}, {
		key: 'getContents',
		value: function getContents() {
			var _props = this.props,
			    getPost = _props.getPost,
			    changeState = _props.changeState;


			var title = document.getElementById("title").value;
			var content = document.getElementById("text_editor").innerHTML;
			//var _id = 0;

			if (content && content !== "" && title !== "") {
				var time = Date.now();

				var id = null;
				getPost(id, title, content, time); //send post data to the backend_list_parent
				changeState(false); //change the state of the modal to false to close the text editor
			}

			document.getElementById("title").value = "";
			document.getElementById("text_editor").innerHTML = "";
		}

		//first the input component keeps popping back up
		//second the edit post continues to appear if i try to create a new post

		//you are updating an existing post here

	}, {
		key: 'updateContents',
		value: function updateContents() {
			console.log("update contents firing....");
			var title = document.getElementById("title").value;
			var post = document.getElementById("text_editor").innerHTML;
			var _id = this.props.postToUpdate._id;
			if (content && content !== "" && title !== "") {
				var time = Date.now(); //use current date on updated post
				this.props.updatePostAjax({ _id: _id, title: title, post: post, time: time }); //submit new data for updating the state and the db
				this.props.updateStatus(false); //change the state of the update button back to submit
				this.props.changeState(false); //close the text editor
			}

			document.getElementById("title").value = "";
			document.getElementById("text_editor").innerHTML = "";
		}

		//you may have to try and use an internal state here to get rid of the delay when loading the content of another post
		//maybe use componentWillREceiveNewProps
		//maybe try to get the content out of the existing dom rather than another ajax call

	}, {
		key: 'InsertContentToUpdate',
		value: function InsertContentToUpdate() {
			if (typeof this.props.postToUpdate !== 'undefined') {
				return this.props.postToUpdate;
			}
			return null;
		}

		//change button depending on if new post or updating existing post

	}, {
		key: 'changeButton',
		value: function changeButton() {
			var _this3 = this;

			if (this.props.updateFlag) {
				return _react2.default.createElement(
					'button',
					{ onClick: function onClick() {
							_this3.updateContents();
						}, className: 'btn btn-primary' },
					'Update'
				);
			}
			return _react2.default.createElement(
				'button',
				{ onClick: function onClick() {
						_this3.getContents();
					}, className: 'btn btn-default' },
				'Submit'
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var toolbar_img = ['bold', 'underline', 'italic', 'insertUnorderedList', 'insertOrderedList'];
			var toolbar_font = ['Arial', 'Times New Roman'];
			var toolbar_font_size = [1, 2, 3, 4, 5, 6, 7];
			var toolbar_font_color = ['black', 'blue', 'red', 'green'];
			var self = this;

			var titleBox = {
				width: '92%',
				height: '24px'
			};

			var titleLabel = {
				paddingRight: "10px"
			};

			var contentToInsert = this.InsertContentToUpdate();
			//let $parsedContent = $.parseHTML(contenttoInsert.post, $('#text_editor'), false);


			return _react2.default.createElement(
				'div',
				{ className: 'text_editor_container' },
				_react2.default.createElement(
					'label',
					{ htmlFor: 'title', style: titleLabel },
					'Title:'
				),
				_react2.default.createElement('input', { type: 'text', id: 'title', name: 'title', className: 'form-control', style: titleBox, defaultValue: !null ? contentToInsert.title : null }),
				_react2.default.createElement(
					'div',
					{ className: 'toolbar' },
					toolbar_img.map(function (el, index) {
						return _react2.default.createElement('img', { src: 'img//' + el + '.png', id: 'toolbaritem', onClick: function onClick() {
								_this4.operations(el);
							}, key: index });
					}),
					_react2.default.createElement('img', { src: 'img\\link.png', id: 'toolbaritem', onClick: function onClick() {
							_this4.hyperlink();
						} }),
					_react2.default.createElement('img', { src: 'img\\image.png', id: 'toolbaritem', onClick: function onClick() {
							_this4.getImageURI();
						} }),
					this.buildSelect(toolbar_font, "font_options", "fontName"),
					this.buildSelect(toolbar_font_size, "size_options", "fontSize"),
					this.buildSelect(toolbar_font_color, "color_options", "foreColor")
				),
				_react2.default.createElement(
					'div',
					{ id: 'text_editor', contentEditable: 'true', suppressContentEditableWarning: true },
					contentToInsert.post
				),
				this.changeButton()
			);
		}
	}]);

	return Input;
}(_react2.default.Component);

Input.propTypes = {
	getContents: _react2.default.PropTypes.func,
	changeState: _react2.default.PropTypes.func,
	updateStatus: _react2.default.PropTypes.func,
	updatePostAjax: _react2.default.PropTypes.func,
	updateFlag: _react2.default.PropTypes.bool
};

exports.default = Input;

/***/ })

},[365]);