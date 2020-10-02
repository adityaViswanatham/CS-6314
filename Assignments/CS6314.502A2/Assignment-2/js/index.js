// Name: Aditya Viswanatham.
// NetID: arv160730.
// CS 6314.502 A2

$(document).ready(function() {
   $.getJSON("js/data.json", function(data) {

        // Appending images to li element.
        $.each(data, function(i, value) {
            $("ul.gallery > li").append("<img src=images/square/" + value.path + " alt=\"" + value.title + "\"></img>");
        });

        // mouseenter.
        $("img").mouseenter(function(e) {
            $(this).addClass('gray');
            var alt = $(this).attr("alt");
            var retObj = jQuery.grep(data, function(obj) {
                return obj.title === alt;
            });
            $("body").append("<div id='preview'><img src=images/medium/" + retObj[0].path + "></img><p>" + alt + ", " + retObj[0].city + "." + "<br>" + retObj[0].taken + "</p></div>");
            $("#preview").css("z-index", 100).css('left', e.pageX+10).css('top', e.pageY+10).fadeIn(1000);
        });

        // mouseleave
        $("img").mouseleave(function(e) {
            $(this).removeClass('gray');
            $("#preview").remove();
        });

        // mousemove
        $("img").mousemove(function(e) {
            $("#preview").css("z-index", 100).css('left', e.pageX+10).css('top', e.pageY+10).fadeIn(1000);
        })
   })
});