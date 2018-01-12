console.log("script connected");
// Grab the news articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});

// Delete
$(document).on("click", "#deletecomment", function() {
    // Empty the comments from the comment section
    $("#notes").empty();

})

//  Whenever someone clicks a p tag
$(document).on("click", "p", function() {
    // Empty the comments from the comment section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the news article
    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        // With that done, add the comments information to the page
        .done(function(data) {
            console.log(data);
            // The title of the News article
            $("#notes").append("<h3>" + data.title + "</h3>");
            // A textarea to add a new comment body
            $("#notes").append("<textarea id='bodyinput' name='body' id='comment'></textarea><br>");
            // container for comments to pop up after being submitted
            $("#notes").append("<container id='comments' name='CommentBody'></container><br>");
            // A button to submit a new comment, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");
            // A button to delete comment, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='deletecomment'>Delete Comment </button>");


            // If there's a comment in the article
            if (data.comment) {
                // Place the title of the comment in the title input
                $("#titleinput").val(data.comment.title);
                // Place the body of the comment in the body textarea
                $("#bodyinput").val(data.comment.body);
            }
        });
});

// savecomment button
$(document).on("click", "#savecomment", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the comment, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from the comments textarea
                body: $("#bodyinput").val()
            }
        })
        // With that done
        .done(function(data) {
            // Log the response
            console.log(data);
            // Empty the comments section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for comment entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});
