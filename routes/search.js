/**
 * @author : Aina Nary
 */

var express = require('express');
var router = express.Router();
var connectedUsers = {};
// declaration des variables qui contiennent la route vers mongodb et lurl pour ma connexion
var MongoClient = require('mongodb').MongoClient,
  url = "mongodb://localhost:27017/cinebamo";
// declaration de ObjectId qui appartient a mongodb donc le signaler ainsi a nodejs
var ObjectId = require('mongodb').ObjectId,
  url = "mongodb://localhost:27017/cinebamo";

MongoClient.connect(url,
  { useNewUrlParser: true },
  function (err, client) {
    if (err) throw err;

    var DB = client.db('cinebamo');

    console.log('je suis connecté (module search.js)');

    // Chercher par titre/actor seulement
    router.get('/', function (req, res, next) {

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
            category: req.query.category
          }).toArray(function (err, movies) {
            if (err) throw err;
            //si pas de resultat (length == 0), chercher avec l'acteur
            if (movies.length == 0) {
              DB.collection('movies').find({
                actors: new RegExp(req.query.title_actor),
                category: req.query.category
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
          DB.collection('movies').find({ category: req.query.category }).toArray(function (err, movies) {
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

    router.get('/last', function (req, res, next) {
      var n = parseInt(req.query.n_movie,10); //converti string en Integer base 10, plus propre pour la?
      // Chercher par titre
      DB.collection('movies').find({}).sort({ "date": -1 }).limit(n)
        .toArray(function (err, movies) {
          if (err) throw err;
          res.json(movies);
        })
    })
  });

module.exports = function (users) {
  connectedUsers = users;
  return router;
}