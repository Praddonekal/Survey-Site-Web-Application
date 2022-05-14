//require modules for the Survey Model
let mongoose = require('mongoose');

//create a model class
let SurveyAnswerModel = mongoose.Schema({
    surveyId: String,
    name: String,
    phone: String,
    a1: String,
    a2: String,
    a3: String,
    a4: String,
},
{
    collection: "surveyAnswers"
});

module.exports = mongoose.model('SurveyAnswer', SurveyAnswerModel);