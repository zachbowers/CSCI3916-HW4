var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

var MovieSchema = new Schema({
    Title: String,
    ReleaseYear: Number,
    Genre: String,
    FirstActor:Array,
    FirstActorChar:Array,
    SecondActor: Array,
    SecondActorChar: Array,
    ThirdActor: Array,
    ThirdActorChar: Array,
});

