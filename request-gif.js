// the-ajaxson-5 requirements:
// 1. Define var searchQuery that gets the input text from the DOM (e.g. "dance")
// 2. Configure the tag property of the params object (e.g. "jackson 5 dance")
// 3. Configure the URL property of the ajax object (i.e. "where should this request be sent?")
// 4  Still inside the ajax object, and within the success fx, 
// 		a) set the source attribute of our image to the image_url of the GIF
// 		b) hide the feedback message and display the image
// 5. Give the user a "Loading..." message while they wait
// 6. Part 2: Validation
// 		a) Add a 2nd field to the form with an input for user to prove that she's not a robot.
// 		b) If user inputs correct answer, load gif, else, display message: "No gifs for you!!"
// 7. Part 3: Beauty - Use CSS/Bootstrap to make page pretty and responsive.
	
$(document).ready(function() {
    // register validate function as the "callback" to be triggered by the form's submission event
//     $("#form-gif-request").submit(fetchAndDisplayGif); 
    $("#form-gif-request").submit(validate); 
});

/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the 
 * user's search term (along with "jackson 5")
 * 
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {
    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();
    // get the user's input text from the DOM
    var searchQuery = $('#searchQuery').val(); // TODO should be e.g. "dance
	console.log("My searchQuery is:", searchQuery);
    // configure a few parameters to attach to our request
    var params = {
        api_key: "dc6zaTOxFJmzC", 
//      tag : "jackson, 5" // TODO should be e.g. "jackson 5 dance"
        tag : "jackson 5 " + searchQuery // TODO should be e.g. "jackson 5 dance"
    };
    
    // make an ajax request for a random GIF
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random", // TODO where should this request be sent?
        data: params, // attach those extra parameters onto the request
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.
            
            // jQuery passes us the `response` variable, a regular javascript object 
//             created from the JSON the server gave us
//             console.log("we received a response!");
            console.log(response);
            
            // TODO 1. set the source attribute of our image to the image_url of the GIF
            $("#gif").attr("src", response.data.image_url);
            // 2. hide the feedback message and display the image
            setGifLoadedStatus(true);            
        },
        error: function() {           
            // give the user an error message
            $("#feedback").text("Sorry, could not load GIF. Try again!");
        }
    });
    
    // TODO: give the user a "Loading..." message while they wait
            $("#feedback").attr("hidden", false);
            $("#feedback").text("loading...");
			setGifLoadedStatus(false); 
}
/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}

function validate(event){
	event.preventDefault();
	var robotQuery = $('#robotQuery').val();
	setGifLoadedStatus(true);
	if (robotQuery == 5 || robotQuery.toLowerCase() == "five") {
		$("#feedback").text(fetchAndDisplayGif(event));
	} else {
		$("#feedback").text("No gifs for you!!");
		setGifLoadedStatus(false);
	}
}
