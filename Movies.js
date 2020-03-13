var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

var MovieSchema = new Schema({
    Title: {type: String, required: true, },
    ReleaseYear: {type: Number, required: true},
    Genre: {type: String, required: true},
    FirstActor:{type: Array, required: true},
    FirstActorChar: {type: Array, required: true},
    SecondActor: {type: Array, required: true},
    SecondActorChar: {type: Array, required: true},
    ThirdActor: {type: Array, required: true},
    ThirdActorChar: {type: Array, required :true},
});

module.exports = mongoose.model('Movie', MovieSchema);

