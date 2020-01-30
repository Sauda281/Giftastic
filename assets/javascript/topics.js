var topics = ["Lion", "Elephant", "Tiger","Hyena", "Leopard", "Giraffe", "Snake", "Gorilla", "Chimpanzee","Toad", "Lynx", "Iguana", "Turtle",
"Tortoise", "Zebra", "Aardvark", "Llama", "Hippo", "Rhino", "Eagle",];
var numberOfGifs = 10;
var Rating = "PG";

function renderButtons(){
	for(var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("animal-button");
		newButton.text(topics[i]);
		$("#button-container").append(newButton);
	}
	$(".animal-button").unbind("click");

	$(".animal-button").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		$("#gif-container").removeClass("solid-border");
		populateGIFContainer($(this).text());
	});

}

function addButton(show){
	if(topics.indexOf(show) === -1) {
		topics.push(show);
		$("#button-container").empty();
		renderButtons();
	}
}

function populateGIFContainer(show){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + show +
		"&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&rating=" + Rating + "&limit=" + numberOfGifs,
		method: "GET"

	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("data-still", element.images.fixed_height_still.url);
			newImage.attr("data-animate", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});

		$("#gif-container").addClass("solid-border");
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animate");
				$(this).attr("src", $(this).attr("data-animate"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("data-still"));
			}
		});
	});
}

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#animal").val().trim());
		$("#animal").val("");
	});
});
