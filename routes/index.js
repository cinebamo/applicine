var express = require('express');
var router = express.Router();
var connectedUsers = {} ;


// declaration des variables qui contiennent la route vers mongodb et lurl pour ma connexion
var MongoClient = require('mongodb').MongoClient,
  url= "mongodb://localhost:27017/cinebamo",
  ObjectId = require('mongodb').ObjectId;// declaration de ObjectId qui appartient a mongodb donc le signaler ainsi a nodejs



  MongoClient.connect(url,
    {useNewUrlParser:true},
    function(err, client){
      if(err) throw err;

      var DB = client.db('cinebamo');

      console.log('je suis connecté');
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cinebamo' });
});

/**
 * @author Mathias
 */
/* Mathias ===> cinebat.dev/home en GET */
router.get('/home', function(req, res, next) {
  DB.collection('categories').find({}).toArray(function(err,category){
    if(err) throw err;
    // res.json({result: "ok"});
    res.render('home', {});
  });
});

/**
 * @author Mathias
 */
/* ===> cinebat.dev/movies/$id en GET */
router.get('/movies/:id', function(req, res, movie) {
  DB.collection('movies').findOne({_id: ObjectId(req.params.id)},function(err, user){
    if(err) throw err;
    // Apres obtention de l'API, changez avec id !
    res.json({result: "ok"});
    // res.render('film', {});
  });
});

/**
*@author isa et éric
*/
/* users  login account  >>cinebat.dev/login */
router.post('/login', function(req, res, next) {

  var requiredProps = ['email','password'];
  for(var i in requiredProps[i]) {
    if(typeof req.body[requiredProps[i]] == 'undefined'){
      return res.send(requiredProps[i] + 'empty');
    }
  }
  DB.collection('users').findOne(req.body, function(err, user){

    if(err) throw err;

    

    if(user && user._id) {

    var token = user._id.toString();
    console.log('token', token);
    res.cookie('token', token);
    connectedUsers.set(token, user);


      // set cookie avec uniqValue
     //connectedUsers.set(user._id.toString(), user) ;
      res.json({
        result : 'ok',
        message : 'connection reussie',
        user
      });
    } else {
      res.json({
        result : 'nok',
        message : 'connection ratée'
      });
    }

  });


});


/* GET CGU page. */
router.get('/cgu', function(req, res, next) {
  res.render('cgu', {});
});

/* GET accueil page. */
// router.get('/home', function(req, res, next) {
//   res.render('home', {});
// });
/* GET film page. */
router.get('/film/search', function (req, res, next) {

  var requiredProps = ['title_actor', 'category'];
  //Recherche utilisant le titre, la categorie et/ou acteur

  console.log('title_actor :' + req.query.title_actor);
  console.log('category :' + req.query.category);
  console.log('title_actor taille :' + req.query.title_actor.length);
  console.log('category taille:' + req.query.category.length);

  if ((req.query.title_actor.length == 0) &&
    (req.query.category.length == 0)) {
    console.log('Empty search');
    return res.send('Error : empty search');
  }

  // Search si category
  if ((req.query.category.length > 0) && (typeof req.query.category != 'undefined')) {
    console.log("recherche avec category");
    //si on a un titre/acteur
    if ((typeof req.query.title_actor != 'undefined') && (req.query.title_actor.length > 0)) {
      // Chercher par titre
      DB.collection('movies').find({
        title: new RegExp(req.query.title_actor),
        category: new RegExp(req.query.category)
      }).toArray(function (err, movies) {
        if (err) throw err;
        //si pas de resultat (length == 0), chercher avec l'acteur
        if (movies.length == 0) {
          DB.collection('movies').find({
            actors: new RegExp(req.query.title_actor),
            category: new RegExp(req.query.category)
          }).toArray(function (err, movies) {
            if (err) throw err;
            res.json(movies);
          });

        } else { // Recherche avec category seulement
          var search = req.query.title_actor;
          console.log("titre trouve avec category seulement");
          res.json(movies);
        }
      });

      // Si pas de titre/acteur, on recherche seulement avec la category
    } else {
      DB.collection('movies').find({ category: new RegExp(req.query.category) }).toArray(function (err, movies) {
        if (err) throw err;
        res.json(movies);
      });
    }

    // Search sans category  
  } else {
    console.log("recherche sans category");
    // Chercher par titre
    DB.collection('movies').find({ title: new RegExp(req.query.title_actor) }).toArray(function (err, movies) {
      if (err) throw err;

      //si pas de resultat, chercher avec l'acteur
      if (movies.length == 0) {
        DB.collection('movies').find({ actors: new RegExp(req.query.title_actor) }).toArray(function (err, movies) {
          if (err) throw err;
          //console.log("acteur trouve sans category");
          res.json(movies);
        });
      } else { //reponse avec le titre
        //console.log("titre trouve sans category");
        res.json(movies);
      }
    });
  }
});

router.get('/film', function(req, res, next) {
  res.render('film', {});
});
/**
 * @author Aina
 */

// Ajout pour page film recuperer par search
router.get('/film/:id', function(req, res, movie) {
  DB.collection('movies').findOne({_id: req.params.id},function(err, m){
    if(err) throw err;
    console.log(req.params.id)
    
    // Apres obtention de l'API, changez avec id !
    //res.json({result: "ok"});
    res.render('film', {title : m.title, 
                      summary : m.summary,
                       poster : m.posterLink,
                     noteFilm : m.score,
                     Actors   : m.actors.join(', '),
                     category : m.category
                    });

  });
});
});
module.exports = function(users) {
  connectedUsers = users ;
  return router;
}
