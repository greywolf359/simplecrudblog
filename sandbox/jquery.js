$("document").ready(function(){
	$('#circle').on("click", onClick);
	$('#getContent').click(()=>{
		$.ajax("sometext.txt",{
			success: Success,
			type: "GET",
			dataType: "text"
		})
	})
	//$("#parent_div p:even").css("color", "orange");

	//$('#parent_div > p:nth-child(2)').css("color", "yellow");
	//$('#parent_div div').prev().css('color', "violet");
	//$('#parent_div').find('div').css("color", "red");
	/*
	$('#parent_div div p').each(function(index, element){
		$(element).css("color", "orange");
	})
	*/
	//$("#parent_div div + p").css("color", "orange");
	//$("#parent_div > p:nth-child(2)").css("color", "orange");
	//$("#parent_div div ~ p").css("color", "orange");
	//$("#parent_div > p").css("color", "orange");
	$("#parent_div div + p").css("color", "orange");

	//-----appending and prepending text
	//$("#prepend p").append("prepend this");
	//$("#prepend p").prepend("prepend this");
	//$("#prepend p:last").appendTo("#prepend p:first");
	//$("<p>new para</p>").insertAfter("#prepend p:last");
	//$("#prepend p:last").before("*****");
	//$("#prepend p").append("********");
	//$("#prepend p:last").prependTo("#prepend p:first");
	//$("#prepend p:last").detach();
	//$("#prepend").empty();
	//$("#prepend p").replaceWith("replaced");

	//$('#data > input').css("border-color", "red");



	//-------jquery's ajax practice
	$.ajax('page.html', {
		success: function(data,status,jqxhr){postData(data)},
		error: function(jqXHR, error, errorThrown){
			console.log('error: ', error, errorThrown);
		},
		dataType: 'html',

	})

	function postData(data){
		$('#container').html(data);

		var element = document.getElementById('container');
		search(element);


		//call searcch with the root


	}
		//FINDING A CERTAIN STRING WITHIN THE DOM
	function search(node){
			var childNodes = node.childNodes;
			for(var i = 0; i < childNodes.length; i++){
				if(childNodes[i].nodeType === 3  && !/\n/.test(childNodes[i].nodeValue)){
					console.log("textnode", childNodes[i].nodeValue);
					if(childNodes[i].textContent.includes("lots")){
						var newText = childNodes[i].textContent.replace(/\lots/gi, "little");
						childNodes[i].textContent = newText;
					}
					//childNodes[i].textContent = "this should replace";
				}else if(childNodes[i].nodeType === 1){
					search(childNodes[i]);
					//console.log("element: ", childNodes[i].nodeName);
				}
			}

		//get the immediate child nodes, if any

		//determine if the child node is text
		//if it is, then console it
		//if its an element call search again


	}

		/*NODE ITERATOR
	var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT,
		function(node){
			//console.log("node iterator", node.nodeType)
			if(node.nodeType === ""){
				return NodeFilter.FILTER_REJECT;
			}
			return NodeFilter.FILTER_ACCEPT;
		}
	)
		var currentNode = iterator.nextNode();
		var fuck = [];

	while(currentNode = iterator.nextNode()){
		if(!/\n/.test(currentNode.nodeValue)){
		    fuck.push(currentNode.nodeValue.trim());
		    //console.log(currentNode.nodeValue.trim(), currentNode.nodeType);
		}
	}
	*/
})

function Success(data, status, jqxhr){
	$('#content').text(data);
}

function onClick(){
	$('#circle').animate({width: 400}, 300)
	.animate({height: 300}, 400)
	.animate({top: "20px"}, 500)
	.animate({borderWidth: "5px"}, "slow");
}
console.log($('p'));