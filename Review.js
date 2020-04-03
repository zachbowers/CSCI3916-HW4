var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

var ReviewSchema = new Schema({
    Title: {type: String, required: true, },
    MovieReview: {type: String, required: true},
    ReviewerName:{type: String, required:true},
    Rating:{type: String, required:true}
});

module.exports = mongoose.model('Review', ReviewSchema);
