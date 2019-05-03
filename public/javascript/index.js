
/**
 * @author : Aina Nary
 */
//fichier a part pour l'acceuil
function clonageCard_last(id, imgPoster, title, summary, score, laDate) {

  //Rejeter le clonage si on n'a pas au moins la date et le titre, ainsi qu'une date valide
  var clonageOk = true;
  if ((typeof title === 'undefined') || (typeof laDate === 'undefined')) {
    clonageOk = false;
  }
  if (laDate.match(/^[0-9]+$/) == null) {
    clonageOk = false;
  }

  if (clonageOk) {
    //Info en reponse
    var cardID = 'card_' + id
    var cardIDselector = '#' + cardID
    //Recuperer la carte exemple "cardModel"
    var cardClone = $("#card_original").clone().attr('id', cardID);
    //$(cardClone).find("h5").text("exemple");
    $("#cardRow").append(cardClone)


    //Charger le contenu dans la carte clonee
    var selectorTitle = cardIDselector + " h3"
    var selectorText = cardIDselector + " p"
    //changer la visibilite en initial (la carte original est en "display:none")
    $(cardIDselector).css('display', 'initial');
    // Le titre
    $(selectorTitle).text(title)
    // Le resume 

    if (typeof summary === 'undefined') {
      summary = "Aucun résumé"
    }
    $(cardIDselector + " img").attr('src',imgPoster);
    $(selectorText).text(summary)
    // Le bouton "voir"
    $(cardIDselector + " button:first").click(function () {
      window.location.href = '/film/' + id;
    })
    // Mettre le lien dans le href du titre
    $(cardIDselector + " a").attr("href", 'film/' + id)
    var note = parseFloat(score)
    for (var i = 0; i < 10; i++) {
      if (i < note) {
        $(cardIDselector + " .Div_cardScore").append('<i class="fas fa-star goodStar"></i>')
      }
      else {
        $(cardIDselector + " .Div_cardScore").append('<i class="fas fa-star"></i>')
      }
    }

    //var textDate = laDate.getDate() + '/'+ laDate.getMonth() + '/' + laDate.getFullYear()
    var dateDate = new Date(laDate)
    var dateYear = dateDate.getFullYear()
    if (isNaN(dateYear)) {

      dateYear = '-'
    }
    $(cardIDselector + " small").text(dateYear)
  }
}

//Pour charger les films sorti recamment  
$(document).ready(function () {
  // Charger les n premiers films
  var n = 6;

  $.get({
    url: "search/last",
    data: {
      n_movie: n
    },
    success: function (reponse) {


      $("#cardRow > div:not(:first) ").remove()
      reponse.forEach(function (film) {
        clonageCard_last(film['_id'], film['posterLink'], film['title'], film['summary'], film['score'], film['date'])
      });
    },
    dataType: "json"
  })
})
