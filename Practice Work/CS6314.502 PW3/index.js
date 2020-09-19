// Name: Aditya Viswanatham
// NetID: arv160730
// CS 6314.502 PW3

$(document).ready(function() {

    $("#input-div").hide();

    $("#add").click(function() {
        $("#input-div").fadeToggle("medium");
    });

    $("#new").keypress(function(event) {
        if (event.which == 13 && $("#new").val() != "") {
            $("ol").append("<li>" + $("#new").val() + "</li>");
            $("#new").val('');
        }
    });

    $("ol").on("click", "li", function() {
        $(this).toggleClass("done");
    });

    $("ol").on("mouseenter", "li", function() {
        $(this).prepend("<button id=\"delete\" type=\"button\" class=\"btn btn-danger\"><i class=\"fa fa-trash\"></i></button>");
        $("#delete").on("click", function() {
            $(this).parent().remove();
        })
    });

    $("ol").on("mouseleave", "li", function() {
        $(this).children().remove();
    });

});