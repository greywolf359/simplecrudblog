function Person(first,last){
	console.log("Person", arguments[0]);
	this.first = first;
	this.last = last;
}


//using arrow functions on the prototype will cause
//the this keyword to reference the global window object
Person.prototype.greet = function(){
	console.log("hello there " + this.first + " " + this.last);
}


//an object that uses a another object via the call method
//will not access the prototype chain.  You have to explicitly tell
//the object's prototype to acess the other objects prototype
Teacher.prototype = Person.prototype;
function Teacher(first, last, subject){
	console.log("teacher ", first, last)
	Person.call(this, first, last);
	this.subject = subject;
}