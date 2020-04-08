var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var authJwtController = require('./auth_jwt');
var User = require('./Users');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var Movie = require('./Movies');
var Review = require('./Review');
var app = express();
app.use(cors());


module.exports = app; // for testing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var router = express.Router();

function getJSONObject(req, message, status) {
    var json = {
        status: status,
        message: message,
        headers : "No Headers",
        env: process.env.UNIQUE_KEY,
        body : "No Body"
    };

    if (req.body != null) {
        json.body = req.body;
    }
    if (req.headers != null) {
        json.headers = req.headers;
    }

    return json;
}

router.route('/postjwt')
    .post(authJwtController.isAuthenticated, function (req, res) {
            console.log(req.body);
            res = res.status(200);
            if (req.get('Content-Type')) {
                console.log("Content-Type: " + req.get('Content-Type'));
                res = res.type(req.get('Content-Type'));
            }
            res.send(req.body);
        }
    );

router.route('/users/:userId')
    .get(authJwtController.isAuthenticated, function (req, res) {
        var id = req.params.userId;
        User.findById(id, function(err, user) {
            if (err) res.send(err);

            var userJson = JSON.stringify(user);
            // return that user
            res.json(user);
        });
    });

router.route('/users')
    .get(authJwtController.isAuthenticated, function (req, res) {
        User.find(function (err, users) {
            if (err) res.send(err);
            // return the users
            res.json(users);
        });
    });



router.route('/Movies')
    .get(authJwtController.isAuthenticated, function (req, res) {
        Movie.find(function(err,movies){
            if (err) res.send(err);

            res.json(movies);
        });


    });


router.route('/Movies')
    .post(authJwtController.isAuthenticated, function (req, res) {

        //create a new instance of movie
        var movie = new Movie();

            movie.Title = req.body.movietitle;
            movie.ReleaseYear = req.body.releaseyear;
            movie.Genre = req.body.genre;
            movie.FirstActor= req.body.firstactor;
            movie.FirstActorChar = req.body.firstactorchar;
            movie.SecondActor = req.body.secondactor;
            movie.SecondActorChar = req.body.secondactorchar;
            movie.ThirdActor= req.body.thirdactor;
            movie.ThirdActorChar = req.body.thirdactorchar;




            movie.save(function(err){
                if (err){
                    //duplicate entry
                    if(err.code == 11000)
                        return res.json({sucess: false, message: 'A Movie with that title already exitst'});
                    else
                        return res.send(err);
                }
                    res.json({message: 'Movie Created!'});
            });

    });


router.route('/Movies')
    .put(authJwtController.isAuthenticated, function (req, res) {

        Movie.findById(req.body.movie_id, function(err, movie){

                if (err) res.send(err);

                //update the movie info only if it is new
                if(req.body.movietitle) movie.Title = req.body.movietitle;
                if(req.body.releaseyear) movie.ReleaseYear = req.body.releaseyear;
                if(req.body.genre) movie.Genre = req.body.genre;
                if(req.body.firstactor) movie.FirstActor = req.body.firstactor;
                if(req.body.firstactorchar) movie.FirstActorChar = req.body.firstactorchar;
                if(req.body.secondactor) movie.SecondActor = req.body.secondactor;
                if(req.body.secondactorchar) movie.SecondActorChar = req.body.secondactorchar;
                if(req.body.thirdactor) movie.ThirdActor = req.body.thirdactor;
                if(req.body.thirdactorchar) movie.ThirdActorChar = req.body.thirdactorchar;
                if(req.body.moviereview) movie.MovieReview = req.body.moviereview;
                if(req.body.reviewername) movie.ReviewerName = req.body.reviewername;

                //save the movie
                movie.save(function(err){
                    if (err) res.send(err);

                    res.json({message: 'Movie Updated !'});
                });


        });


    });


router.route('/Movies')
    .delete(authJwtController.isAuthenticated, function (req, res) {
        Movie.remove({
            _id:req.body.movie_id
        }, function(err,movies){
            if (err) return res.send(err);

            res.json({message: "Sucessfully Deleted"});
        });
    });



router.route('/Review')
    .get(authJwtController.isAuthenticated, function (req, res) {
        Review.find(function(err,reviews){
            if (err) res.send(err);

            res.json(reviews);
        });


    });

router.route('/Review')
    .post(authJwtController.isAuthenticated, function (req, res) {

        //create a new instance of movie
        var review = new Review();

        review.Title = req.body.movietitle;
        review.MovieReview = req.body.moviereview;
        review.ReviewerName = req.body.reviewername;
        review.Rating= req.body.rating;





        review.save(function(err){
            if (err){
                //duplicate entry
               // if(err.code == 11000)
                   // return res.json({sucess: false, message: 'A Review with that title already exitst'});
               // else
                return res.send(err);
            }
            res.json({message: 'Review Created!'});
        });

    });

router.route('/Review')
    .put(authJwtController.isAuthenticated, function (req, res) {

        Review.findById(req.body.review_id, function(err, review){

            if (err) res.send(err);

            //update the movie info only if it is new
            if(req.body.movietitle) review.Title = req.body.movietitle;
            if(req.body.moviereview) review.MovieReview = req.body.moviereview;
            if(req.body.reviewername)review.ReviewerName = req.body.reviewername;
            if(req.body.rating) review.Rating= req.body.rating;


            //save the review
            review.save(function(err){
                if (err) res.send(err);

                res.json({message: 'Review Updated !'});
            });


        });


    });



router.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, message: 'Please pass username and password.'});
    }
    else {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        // save the user
        user.save(function(err) {
            if (err) {
                // duplicate entry
                if (err.code == 11000)
                    return res.json({ success: false, message: 'A user with that username already exists. '});
                else
                    return res.send(err);
            }

            res.json({ success: true, message: 'User created!' });
        });
    }
});

router.post('/signin', function(req, res) {
    var userNew = new User();
    userNew.name = req.body.name;
    userNew.username = req.body.username;
    userNew.password = req.body.password;

    User.findOne({ username: userNew.username }).select('name username password').exec(function(err, user) {
        if (err) res.send(err);

        user.comparePassword(userNew.password, function(isMatch){
            if (isMatch) {
                var userToken = {id: user._id, username: user.username};
                var token = jwt.sign(userToken, process.env.SECRET_KEY);
                res.json({success: true, token: 'JWT ' + token});
            }
            else {
                res.status(401).send({success: false, message: 'Authentication failed.'});
            }
        });


    });
});

app.use('/', router);
app.listen(process.env.PORT || 8080);
