$(document).ready(function(){
	let checkbox = document.getElementsByTagName('input');
	checkbox[0].addEventListener("change", onChange);
	checkbox[1].addEventListener("change", onChange);
	checkbox[2].addEventListener("change", onChange);

	var elements = document.getElementById("data").childNodes;
	console.log("length",elements.length);
		console.log(elements);
	for (var i = 0; i < elements.length; i++){

		if (elements[i].nodeType === 1){
			console.log("running...")
			let data = elements[i].dataset.type;
			console.log(data);
			let link = "somelink" + data;
			$(elements[i]).wrap(`<a href = somelink?cat=${data}></a>`);
		}
	}



})

function onChange(id, event){
			switch(this.id){
				case "vitamins":
					console.log("vitamins");
					$('p[data-type=vitamins]').toggleClass('hide');
					break;
				case "drinks":
					console.log("drinks");
					$('p[data-type=drinks]').toggleClass('hide');
					break;
				case "bars":
					console.log("bars");
					$('p[data-type=bars]').toggleClass('hide');
					break;
				default: break;
			}
}
