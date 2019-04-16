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
 * @author Aina, Georges
 */
function clonageCard(id, video, title, summary, score) {

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

  /////////////////////////////////
  // Todo : les notes et la video
  //
  //
  //Enlever le display none
  // $(cardIDselector).removeClass("d-none")
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
        clonageCard(film['_id'], film['video'], film['title'], film['summary'], film['score'])
      });
    },
    dataType: "json"
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
             $('#title'+x).text(comment.title);
             var modu = comment.score%1;
             var nbreEtoile = comment.score - modu;
             $('#commen'+x).text(comment.content);
             for(var y = 1; y<=nbreEtoile; y++){
               $('#etoile'+x+'-'+y).attr('src', "../images/EtoilePleine.png");
             }
             if(modu==0.5){
                $('#etoile'+x+'-'+y).attr('src', "../images/Etoile moitié.png");
                for(var y = nbreEtoile+2; y<=6; y++){
                  $('#etoile'+x+'-'+y).attr('src', "../images/Etoile vide.png");
                }
             }
             else{
               for(var y = nbreEtoile+1; y<=6; y++){
                 $('#etoile'+x+'-'+y).attr('src', "../images/Etoile vide.png");
               }
             }
             x++;
           });
       });
      });
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

  $('#loginForm').on('submit', function(event){
    console.log('là login');
    event.preventDefault();
    var data = {} ;
    $('#loginForm [name]').map(function(i, x){
      data[x.name] = x.value
    });
    console.log(data);
      $.ajax({
        url: '/login',
        method: 'POST',
        dataType: 'json',
        headers : {"content-type" : "application/json"},
        data: JSON.stringify(data)
      }).done(function(res, user){

        $('#loginSection').hide();
        $('#userLog').show();
        $('.jumbotron-heading').append(res.user.firstname);
        $('#inputName').val(res.user.name);
        $('#inputFirstname').val(res.user.firstname);
        $('#inputAge').val(res.user.age);
        $('#inputEmail4').val(res.user.email);
        $('#inputPassword4').val(res.user.password);
      });
  });

  $('#userProfil').on('click', function(){

    $('#profil').show();

  });

  $('.close').on('click', function(){

    $('#profil').hide();

  })
});
