$('#categs').on('change',function(evt){
  
  document.getElementById('movies').innerHTML = '';
      $.ajax({
        url: '/search/?category='+$('#categs').val(),
        method: 'GET'
      }).done(function(res){
        console.log(res);
        $('.page').hide() ;
        $('#movies').show() ;
        res.forEach(function(movie) {
          $('#movies').append('<div><div class="title">'+movie.title+'</div></div>')
        })
      });   
});


/**
 * @author
 */






 /**
 * @author
 */


 





 /**
 * @author éric et isa
 */
$(document).ready(function(){

// au click du bouton s'inscrire fait apparaitre le formulaire d'inscription
  $('#btnSubscribe').on('click', function(){

    $('#subscribSection').show();
    $('body').css('background','rgba(255,255,255,0.9)');
  });

// au click du bouton login fait apparaitre le formulaire de connexion
$('#btnLogin').on('click', function(){

  $('#loginSection').show();
  $('body').css('background','rgba(255,255,255,0.9)');
});

// au click m'inscrire après remplissage du formulaire  d'inscription
  $('#subscribe').on('click', function(){

    $('#subscribSection').hide();
    $('#loginSection').show().prepend('<h3>Votre compte à bien été crée, veuillez vous connecter afin de bénéficier de tous les avantages des membres');

  });

// au click me connecter après remplissage des inputs user/password

  $('#login').on('click', function(){

   
      $.ajax({
        url: '/login',
        method: 'POST',
        data: $('#loginForm').serialize()
      }).done(function(res, user){
        console.log(res);
        $('#loginSection').hide();
        $('#userLog').show();
        $('.jumbotron-heading').append(res.user.firstname);

      });
  });   

    // $('#loginSection').hide();
    // $('#userLog').show();
    // $('.jumbotron-heading').append(res.body.name);
  // })

});
