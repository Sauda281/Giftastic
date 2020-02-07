var stocks = ["Apple", "Facebook", "Twitter","Amazon", "Bank of America", "Target", "Microsoft", "Walmart","Air Bnb", "lyft",];
var StockValue = 10;
// var currentValue = 0;


function renderButtons(){
	for(var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("stock-button");
		newButton.text(topics[i]);
		$("#button-container").append(newButton);
	}
	$(".stock-button").unbind("click");

	$(".stock-button").on("click", function(){
		$(".stock-image").unbind("click");
		$("#stock-container").empty();
		$("#stock-container").removeClass("solid-border");
		populateSTOCKContainer($(this).text());
	});

}

function addButton(show){
	if(topics.indexOf(show) === -1) {
		topics.push(show);
		$("#button-container").empty();
		renderButtons();
	}
}


function populateSTOCKContainer(show){
	$.ajax({
		url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary"+ show +
		"&api_key=85a202be1dmshce40df6d3fad567p138d9bjsn93a139462256=",
		method: "GET"

	
	});
}

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#stock").val().trim());
		$("#stock").val("");
	});
});
