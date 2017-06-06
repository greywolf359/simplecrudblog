(function(window){
	const alpha = {
		print: ()=>{
			console.log('alpha printing');
		}
	}

	function initAlpha(){
		return alpha;
	}

	if(!window.alpha){
		window.alpha = initAlpha();
	}
})(window)

