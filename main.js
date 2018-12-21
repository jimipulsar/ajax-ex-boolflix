var paesiSupportati = ["it", "en", "fr", "ja", "es", "de"];

$(document).ready(function() {

  $('#bottone').on('click', function() {

    var searchfilm = $('#ricerca').val();
    $('.lista_film').html('');

  $.ajax( {
    url: 'https://api.themoviedb.org/3/search/tv?api_key=fb03d4cbdcf6ffcfe2c1ecbc08921e45&language=it-IT&page=1&include_adult=false&include_image_language=it-IT',
    method: 'GET',
    data: {
      key: 'fb03d4cbdcf6ffcfe2c1ecbc08921e45',
      language: 'it',
      query: searchfilm
    },
    success: function(data) {
      console.log(data);
      var movies = data.results;
      for (var i = 0; i < movies.length; i++) {
        var source = document.getElementById("entry-template").innerHTML;
        var template = Handlebars.compile(source);
        var lang = movies[i].original_language;
        var image = "https://image.tmdb.org/t/p/w185/" + movies[i].poster_path;
        var voto_effettivo = Math.ceil(movies[i].vote_average / 2);
            var context = {
              Copertina: image,
              titolo_film: movies[i].name,
              titolo_originale: movies[i].original_name,
              lingua: gestisciLingua(lang),
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

$(document).ready(function() {

  $('#bottone').on('click', function() {

    var searchValue = $('#ricerca').val();
    $('.lista_film').html('');

  $.ajax( {
    url: 'https://api.themoviedb.org/3/search/movie?api_key=fb03d4cbdcf6ffcfe2c1ecbc08921e45&language=it-IT&page=1&include_adult=false&include_image_language=it-IT',
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
        var source = document.getElementById("entry-template").innerHTML;
        var template = Handlebars.compile(source);
        var voto_effettivo = Math.ceil(movies[i].vote_average / 2);
        var lang = movies[i].original_language;
        var image = "https://image.tmdb.org/t/p/w185/" + movies[i].poster_path;
            var context = {
              Copertina: image,
              titolo_film: movies[i].title,
              titolo_originale: movies[i].original_name,
              lingua: gestisciLingua(lang),
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

function gestisciLingua(lingua) {
    var htmlOutput = '';

    if (paesiSupportati.includes(lingua)) {

      htmlOutput =  lingua + '.png';
    } else {
      console.log();
    }

    return htmlOutput;

}
function stars(voto){
    var star = '';
    for (var k = 0; k < voto; k++) {
      star += '<i class="fas fa-star"></i>';
    }
    return star;

}

});



// Funzione di ricerca dinamica mentre scrivi
 // $("#ricerca").bind('keypress',function(){
 //   $("#entry-template").find("li").each(function(){
 //     if($("#ricerca").val().length >= 2 ){
 //         if( $(this).is(":contains('"+ $("#ricerca").val() + "')") )
 //           $(this).css('display','');
 //         else
 //           $(this).css('display','none');
 //       }else{
 //         $(this).css('display','');
 //       }
 //     });
