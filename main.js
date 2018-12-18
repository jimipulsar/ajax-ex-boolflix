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

      var movies = data.results;
      for (var i = 0; i < movies.length; i++) {
        var source = document.getElementById("entry-template").innerHTML;
        var template = Handlebars.compile(source);
        var voto_effettivo = Math.ceil(movies[i].vote_average / 2);
            var context = {
              titolo_film: movies[i].title,
              titolo_originale: movies[i].original_title,
              lingua: movies[i].original_language,
              voto: stars(voto_effettivo)
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
function stars(voto){
    var star = '';
    for (var k = 0; k < voto; k++) {
      star += '<i class="fas fa-star"></i>';
    }
    return star;
  }
});
