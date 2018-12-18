$(document).ready(function() {

  $('#bottone').on('click', function() {

    var searchValue = $('#ricerca').val();
    $('.lista_film').html('');

  $.ajax( {
    url: 'https://api.themoviedb.org/3/search/movie?api_key=fb03d4cbdcf6ffcfe2c1ecbc08921e45',
    method: 'GET',
    data: {
      key: 'fb03d4cbdcf6ffcfe2c1ecbc08921e45',
      language: 'it',
      query: searchValue
    },
    success: function(data) {
      console.log(data);
      var movies = data.results;
      for (var i = 0; i < movies.length; i++) {
        var source   = document.getElementById("entry-template").innerHTML;
        var template = Handlebars.compile(source);
            var context = {
              titolo_film: movies[i].title,
              titolo_originale: movies[i].original_title,
              lingua: movies[i].original_language,
              voto: movies[i].vote_average 
            };
            var html = template(context);

            $('.lista_film').append(html);
          }
},
error: function(data){
alert("Si è verificato un'errore");
},
});
});
});
