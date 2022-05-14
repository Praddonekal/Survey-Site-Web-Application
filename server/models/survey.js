//require modules for the Survey Model
let mongoose = require('mongoose');

//create a model class
let SurveyModel = mongoose.Schema({
    name: String,
    date: String,
    q1: String,
    q2: String,
    q3: String,
    q4: String,
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', SurveyModel);