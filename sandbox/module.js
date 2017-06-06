(function (window){
	var zulu = {};

	function zuluInit(){
		return zulu;
	}

	zulu.print = function(argument = "defaulted"){
		console.log('zulu printing', argument);
	}

	zulu.setColor = function(element, colorVal){

		if (colorVal === undefined){
			console.log("color is undefined")
			return;
		}
		const elements = document.getElementsByTagName(element);
		elements[0].value = "red";
		console.log("length", elements);
		for(i = 0; i < elements.length; i++){
			elements[i].style.color = colorVal;

		}

	}

	if (window.zulu === undefined){
		window.zulu = zuluInit();
	}
})(window);