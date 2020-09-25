// Name: Aditya Viswanatham
// NetID: arv160730
// CS 6314.502 PW4

function fetchData() {
    $.ajax({
        url: "movies.xml",
        dataType: "xml",
        success: function(data) {
            alert("File is Loaded");
            $("table").append('<tr><th>Title</th><th>Genre</th><th>Director</th><th>Cast</th><th>Short Description</th><th>IMDB-Rating</th></tr>');

            // Reading in contents using data object.
            $(data).find('movie').each(function() {

                // Fetching table contents.
                let title = $(this).find('title').text();
                let genres = "";
                $(this).find('genre').each(function(i,value){
                    genres += $(value).text() + ', ';
                });
                genres = genres.substring(0, genres.length-2);
                let director = $(this).find('director').text();
                let cast = "";
                $(this).find('person').each(function(i, value) {
                    cast += $(value).attr("name") + ', ';
                });
                cast = cast.substring(0, cast.length-2);
                let desc = $(this).find('imdb-info').find('synopsis').text();
                let score = $(this).find('imdb-info').find('score').text();

                let result = '<tr><td>' + title + '</td><td>' + genres + '</td><td>' + director + '</td><td>' + cast + '</td><td>' + desc + '</td><td>' + score + '</td></tr>';
                $("table").append(result);
            });
        },
        error: function() { 
            alert("error loading file");  
        }
    });
}