$('#categs').on('change', function (evt) {

  document.getElementById('movies').innerHTML = '';
  $.ajax({
    url: '/search/?category=' + $('#categs').val(),
    method: 'GET'
  }).done(function (res) {
    console.log(res);
    $('.page').hide();
    $('#movies').show();
    res.forEach(function (movie) {
      $('#movies').append('<div><div class="title">' + movie.title + '</div></div>')
    })
  });
});


/**
 * @author Aina, Georges
 */
function clonageCard(id, imgPoster, title, summary, score) {

  //Info en reponse
  var cardID = 'card_' + id
  var cardIDselector = '#' + cardID
  //Recuperer la carte exemple "cardModel"
  var cardClone = $("#card_original").clone().attr('id', cardID);
  //$(cardClone).find("h5").text("exemple");
  $("#cardRow").append(cardClone)

  //Charger le contenu dans la carte clone
  var selectorTitle = cardIDselector + " h3"
  var selectorText = cardIDselector + " p"
  $(selectorTitle).text(title)
  $(selectorText).text(summary)
  $(cardIDselector + " img").attr('src',imgPoster);
  $(cardIDselector + " button:first").click(function () {
    window.location.href = 'film/' + id;
  })
  $(cardIDselector).css('display', 'initial');
  var note = parseFloat(score)
  // Note sous forme d'etoile Jaune/noire pour note sur 10
  for (var i = 0; i < 10; i++) {
    if (i < note) { //etoile jaune
      $(cardIDselector + " .Div_cardScore").append('<i class="fas fa-star goodStar"></i>')
    }
    else { //etoile noire
      $(cardIDselector + " .Div_cardScore").append('<i class="fas fa-star"></i>')
    }
  }

}

// "searchForm" est l'ID du form
// "Search_title_actor" est l'ID du input
// "categs" est l'ID du select
$("#searchForm").submit(function (evt) {
  evt.stopPropagation()
  evt.preventDefault()

  $.get({
    url: "search/",
    data: {
      title_actor: $("#Search_title_actor").val(),
      category: $("#categs").val()
    },
    success: function (reponse) {

      //Traiter chaque carte

      $("#cardRow > div:not(:first) ").remove()
      reponse.forEach(function (film) {
        clonageCard(film['_id'], film['posterLink'], film['title'], film['summary'], film['score'])
      });
    },
    dataType: "json"
  })
});



/**
 * @author Maxime & Mathias
 */
$(document).ready(function()
{


// Boucle de vérification si le user est connecté ou non
//if (req.user) {
  // logged in
//} else {
  //alert('Authentification nécessaire pour la publication d un commentaire')
//}

    // Poster le commentaire dans la base de donnée avec ajax
    $('#postcomment').on('submit', function(evt){
      evt.stopPropagation()
      evt.preventDefault()
      var data = {idUser:$('#profileForm').attr('action'), idFilm:recup, content:$("#comment").val()}

      //récupération url film
      var urlfilm = window.location.pathname
      var strs = urlfilm.split('/');
      var recup = strs[2];

      //Affichage du commentaire
      var commentval = $("#comment").val();
      JSON.stringify(commentval),
      $( "#lescomms" ).prepend( "<div class=card-comm>"+commentval+"</div>" );


      $.ajax({
        url: 'comments/',
        method: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
      }).done(function (reponse){



      });

// Boucle de vérification si le user est connecté ou non 
// if (req.user) { 
  // alert('Authentification nécessaire pour la publication d un commentaire')
// } else { 
   // } 
  
   // Poster le commentaire dans la base de donnée avec ajax
   $('#postcomment').on('submit', function(evt){ 
   
    evt.stopPropagation()
    evt.preventDefault()
    var data = {idUser:$('#profileForm').attr('action'), idFilm:$("#idFilm").val(), content:$("#comment").val()}
    
    //récupération url film
   
   
    //Affichage du commentaire
    var commentval = $("#comment").val();
    
    $( "#lescomms" ).prepend( "<div class=card-comm>"+commentval+"</div>" );
    
    
    $.ajax({
      url: '/comments/', 
      method: 'POST',
      data: JSON.stringify(data), 
      dataType: "json",
    }).done(function (reponse){
      
      
      
    });   
  })
})
});
 /**
 * @author Mathias
 */
$(document).ready(function(){
       $.ajax({
         url: '/comments',
         method: 'GET'
       }).done(function(res){
         var x=0;
           res.forEach(function(comment) {
             var caseID =  comment._id;
             var caseIDselector = '#' + caseID;
             $("#title"+x).attr('id', caseID + '-titre');
             $("#comm"+x).attr('id', caseID + '-comm');
             for (var i = 0; i <= 5; i++) {
               $("#etoile"+x+'-'+i).attr('id', caseID + '-etoile'+i);
             }
             $("#signaler"+x).attr('id', caseID + '-signal');
             $("#update"+x).attr('id', caseID + '-update');
             $("#delete"+x).attr('id', caseID + '-delete');
             $(caseIDselector + '-titre').text(comment.title);
             var modu = comment.score%1;
             var nbreEtoile = comment.score - modu;
             $(caseIDselector + '-comm').text(comment.content);
             for(var y = 1; y<=nbreEtoile; y++){
               $(caseIDselector + '-etoile'+y).attr('src', "../images/EtoilePleine.png");
             }
             if(modu==0.5){
                $(caseIDselector + '-etoile'+y).attr('src', "../images/Etoile moitié.png");
                for(var y = nbreEtoile+2; y<=6; y++){
                  $(caseIDselector + '-etoile'+y).attr('src', "../images/Etoile vide.png");
                }
             }
             else{
               for(var y = nbreEtoile+1; y<=6; y++){
                 $(caseIDselector + '-etoile'+y).attr('src', "../images/Etoile vide.png");
               }
             }
             x++;
           });
       });

      });
      dataType: "json"


/**
* @author éric et isa
*/
$(document).ready(function () {

  // au click du bouton s'inscrire fait apparaitre le formulaire d'inscription
  $('#btnSubscribe').on('click', function () {

    cleanform();
    $('#loginSection').hide();
    $('#subscribSection').show();
    $('body').css('background', 'rgba(255,255,255,0.9)');
  });

  // au click du bouton login fait apparaitre le formulaire de connexion
  $('#btnLogin').on('click', function () {

    $('#subscribSection').hide();
    $('#loginSection').show();
    $('body').css('background', 'rgba(255,255,255,0.9)');
  });

  // au click m'inscrire après remplissage du formulaire  d'inscription je cache le formulaire et affiche le login
  $('#subscribe').on('click', function (event) {

    event.preventDefault();
    var data = {};
    $('#suscribForm [name]').map(function (i, x) {
      data[x.name] = x.value
    });
    $.ajax({
      url: '/users',
      method: 'POST',
      dataType: 'json',
      headers: { "content-type": "application/json" },
      data: JSON.stringify(data)
    }).done(function (res) {

      $('#subscribSection').hide();
      $('#loginSection').show().prepend('<h3>Votre compte à bien été créé, veuillez vous connecter afin de bénéficier de tous les avantages des membres');
    });

  });

  // au click me connecter après remplissage des inputs user/password

  $('#loginForm').on('submit', function (event) {
    console.log('là login');
    event.preventDefault();
    var data = {};
    $('#loginForm [name]').map(function (i, x) {
      data[x.name] = x.value
    });
    console.log(data);
    $.ajax({
      url: '/login',
      method: 'POST',
      dataType: 'json',
      headers: { "content-type": "application/json" },
      data: JSON.stringify(data)
    }).done(function (res, user) {

      $('#loginSection').hide();
      $('#userLog').show();
      $('#HomePage_Welcome').html('Bienvenue ' + res.user.firstname);
      $('#connect').html('Vous êtes connecté !');
      $('#inputName').val(res.user.name);
      $('#inputFirstname').val(res.user.firstname);
      $('#inputAge').val(res.user.age);
      $('#inputEmail4').val(res.user.email);
      $('#inputPassword4').val(res.user.password);
      $('#profileForm').attr('action', '/users/' + res.user._id);
    });
  });

  // pour afficher le profil depuis l'icone user du menu
  $('#userProfil').on('click', function () {

    $('#profil').show();

  });

  // pour fermer les modal/formulaire d'inscription/login
  $('.close').on('click', function () {

    $('#profil').hide();
    $('#loginSection').hide();
    $('#subscribSection').hide();

  });

  //Modification du profil

  $('#btnModify').on('click', function (event) {

    event.preventDefault();
    var data = {};
    $('#profileForm [name]').map(function (i, x) {
      data[x.name] = x.value
    });
    console.log(data);
    $.ajax({
      url: $('#profileForm').attr('action'),
      method: 'PUT',
      dataType: 'json',
      headers: { "content-type": "application/json" },
      data: JSON.stringify(data)
    }).done(function (res) {
      $('#profil').hide();
      $('#HomePage_Welcome').html('Bienvenue ' + data.firstname);
      $('#connect').html('Vous êtes connecté !');
      $('#inputName').val(data.name);
      $('#inputFirstname').val(data.firstname);
      $('#inputAge').val(data.age);
      $('#inputEmail4').val(data.email);
      $('#inputPassword4').val(data.password);
    });
  })

  // Suppression du profil
  $('#btnDelete').on('click', function (event) {
    event.stopPropagation();
    event.preventDefault();

    $.ajax({
      url: $('#profileForm').attr('action'),
      method: 'DELETE',
      dataType: 'json',
      headers: { "content-type": "application/json" }
      //data: JSON.stringify(data)
    }).always(function (res) {
      $('#profil').hide();
      $('#HomePage_Welcome').html('Au revoir, triste de votre départ ...');
      $('#connect').html('Votre compte a bien été supprimé.');
    });
  })

  // pour nettoyer les formulaires
  function cleanform() {

    $('input').val(null);
    $('textarea').val(null);
  }


  var allCookies = document.cookie.split(';');

  var cookies = {};
  for (var i in allCookies) {
    var str = allCookies[i];
    var strs = str.split('=');
  }

  if (strs[0] === "token") {

    // si on a cookie
    //var token = ;
    token = strs[1]
    $.ajax({
      url: '/users/' + token,
      method: 'GET',
      dataType: 'json',
      headers: { "content-type": "application/json" },
    }).done(function (res, user) {

      $('#loginSection').hide();
      $('#userLog').show();
      $('#HomePage_Welcome').html('Bienvenue ' + res.firstname);
      $('#inputName').val(res.name);
      $('#inputFirstname').val(res.firstname);
      $('#inputAge').val(res.age);
      $('#inputEmail4').val(res.email);
      $('#inputPassword4').val(res.password);
      $('#profileForm').attr('action', '/users/' + res._id);
    });

  };


  /**
  * @author Aina
  */
  function delete_cookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  //fonction pour se deconnecter via "Me deconnecter"
  $('#userDisconect').on('click', function () {
    $('#userLog').hide();
    delete_cookie('token'); //le cookie s'appelle actuelement 'token'
    // Je prefere vider aussi els informations dans el formulaire au cas ou ca reste ...
    $('#inputName').val('');
    $('#inputFirstname').val('');
    $('#inputAge').val('');
    $('#inputEmail4').val('');
    $('#inputPassword4').val('');
    //changer le titre de "bienvenue -user-" en simple "Bienvenue"
    $('#HomePage_Welcome').html("Bienvenue ");
    // changer le paragraphe de "connecté" à "texte d'accueil"
    $('#connect').html('Inscrivez-vous ou connectez-vous pour laisser vos commentaires et notations.');
  })

  /**
  * @author Isa & Eric
  */
  // Update d'un commentaire

  $('.signal>input:eq(1)').on('click', function (event) {
    event.preventDefault();
//iduser à définir
// debugger;
    //if ($('#profileForm').attr('action') == (iduser)) {

      $('#comment').val(null);
      $(this).parents('.card-comm').append($('#postcomment'));
    // }else{
    //   alert("Vous n'êtes pas l'auteur de ce commentaire, vous ne pouvez pas le modifier");
    // }
  })


  $('#postcomment').on('submit', function (event) {
    event.preventDefault();
    var data = $('#comment').val();
    $.ajax({
      url: $('comments/:id').attr('action'),
      method: 'PUT',
      dataType: 'json',
      data: JSON.stringify(data),
    }).done(function (res) {

      $(this).parent().parent().parent().closest('p').html(res.content);
      $('#card-comm').removeChild($('#postcomment'));
    });
  })

   /**
  * @author Isa & Eric
  */
  // Delete d'un commentaire

  $('.signal>input:eq(2)').on('click', function (event) {
    event.preventDefault();

    if ($('#profileForm').attr('action') === (iduser)) {

          $.ajax({
          url: $('comments/:id').attr('action'),
          method: 'DELETE',
          dataType: 'json'
          }).always(function(){
            $('#lescomms').removeChild(this.parentsUntil('#lescomms'));
          })
    }

});
});
