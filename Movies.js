var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

var MovieSchema = new Schema({
    Title: {type: String, required: true, },
    ReleaseYear: {type: Number, required: true},
    Genre: {type: String, required: true},
    FirstActor:{type: String, required: true},
    FirstActorChar: {type: String, required: true},
    SecondActor: {type: String, required: true},
    SecondActorChar: {type: String, required: true},
    ThirdActor: {type: String, required: true},
    ThirdActorChar: {type: String, required :true},
    imageUrl: {type: String, required: false}
   });

module.exports = mongoose.model('Movie', MovieSchema);


