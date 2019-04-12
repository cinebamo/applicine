/**
 * @author : Aina Nary
 */

var express = require('express');
var router = express.Router();
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

      // /!\ Les recherches actuels sont par titre exact /!\
      var param_ok = false;

      console.log('title_actor :' + req.query.title_actor);
      console.log('category :' + req.query.category);

      if ((typeof req.query.title_actor == 'undefined') && (typeof req.query.category == 'undefined')) {
        console.log('Empty search');
        return res.send('Error : empty search');
      }

      // Search si category
      if (typeof req.query.category != 'undefined') {

        //si on a un titre/acteur
        if (typeof req.query.title_actor != 'undefined') {
          // Chercher par titre
          DB.collection('movies').find({ title: req.params.title_actor }).toArray(function (err, movies) {
            if (err) throw err;
            //si pas de resultat, chercher avec l'acteur
            if (movies.length == 0) { // tester contain ?
              DB.collection('movies').find({ actors: req.params.title_actor }).toArray(function (err, movies) {
                if (err) throw err;
                res.json(movies);
              });
            } else {
              res.json(movies);
            }
          });
          // Sans titre/acteur, on recherche seulement avec la category
        } else {
          DB.collection('movies').find({ category: req.query.category }).toArray(function (err, movies) {
            if (err) throw err;

            //tester la longueur de la reponse
            res.json(movies);
          });
        }

      // Search sans category
      } else {

        // Chercher par titre
        DB.collection('movies').find({ title: req.params.title_actor }).toArray(function (err, movies) {
          if (err) throw err;
          // console.log(movies);
          // console.log((movies.length))

          //si pas de resultat, chercher avec l'acteur
          if (movies.length == 0) { // tester si contain ?
            DB.collection('movies').find({ actors: req.params.title_actor }).toArray(function (err, movies) {
              if (err) throw err;
              res.json(movies);
            });
          } else {
            res.json(movies);
          }
        });
      }
    });

  });

module.exports = router;