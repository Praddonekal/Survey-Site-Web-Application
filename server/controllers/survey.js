//require modules for the controller
const { request } = require('express');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to the model
let Survey = require('../models/survey');
let SurveyAnswer = require('../models/surveyAnswer');

/* GET open surveys page. */
module.exports.displayOpenSurveys = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
                return console.error(err);
        }
        else
        {
            res.render('partials/open-survey', 
            {
            title: 'Open Surveys', 
            SurveyList: surveyList,
            displayName: req.user ? req.user.displayName : ''
        });
        }
    });
}

module.exports.displayMySurveyPage = (req, res, next) =>{
    Survey.find((err, surveyList) => {
        if(err)
        {
                return console.error(err);
        }
        else
        {
            res.render('partials/my-survey', 
            {
            title: 'My Surveys', 
            SurveyList: surveyList,
            displayName: req.user ? req.user.displayName : ''
        });
        }
    });
}

module.exports.displayTakeSurveyPage = (req, res, next) => {
    
    let id = req.params.id;
 
     Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            return  console.log(err);
            // res.end(err);
        }
        else{
           //show the edit view
            res.render('partials/take-survey', 
            {
                title: 'Take Survey', 
                survey: surveyToEdit,
                displayName: req.user ? req.user.displayName : ''
            })
        }
    });
}

module.exports.processTakeSurveyPage = (req, res, next) => {
    // res.send("finally Done........");
    // id = req.body.id;
    // res.send(id);

    let id = req.body.id;

    Survey.findById(id, (err, surveyToFill) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            if(surveyToFill){

                let fillSurvey = SurveyAnswer({
                    "surveyId": id,
                    "name": req.body.name,
                    "phone":req.body.phone,
                    "a1": req.body.a1,
                    "a2": req.body.a2,
                    "a3": req.body.a3,
                    "a4": req.body.a4,
                });

                // console.log(surveyAnswer);

                SurveyAnswer.create(fillSurvey, (err) =>{
                    if(err)
                    {
                        return console.log(err);
                        // res.end(err);
                    }
                    else
                    {
                        //refresh the survey list
                        // res.redirect('/list');
                        res.render('partials/survey-response', 
                        {
                            title: 'Survey Response', 
                            survey: surveyToFill,
                            surveyResponse: fillSurvey,
                            displayName: req.user ? req.user.displayName : '',
                        });
                    }

                });
            }
        }
    });

}

/* GET create survey page. */
module.exports.displayAddSurveyPage = (req, res, next) => {
    res.render('partials/create-survey', { 
        title: 'Create a Survey',
        displayName: req.user ? req.user.displayName : ''
     });
}

/* POST create survey page */
module.exports.processAddSurvey = (req, res, next) => {
    
    let newSurvey = Survey({
        "name": req.body.name,
        "date":req.body.date,
        "q1": req.body.q1,
        "q2":req.body.q2,
        "q3":req.body.q3,
        "q4":req.body.q4,
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            return console.log(err);
            // res.end(err);
        }
        else
        {
            //refresh the survey list
            res.redirect('/list/mysurvey');
        }
    });
}



/* GET edit survey page */
module.exports.displayEditSurveyPage = (req, res, next) => {

    // res.send('Edit Page');
 
     let id = req.params.id;
 
     Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            return  console.log(err);
            // res.end(err);
        }
         else{
            //show the edit view
            res.render('partials/edit-survey', 
            {
                title: 'Edit Survey', 
                survey: surveyToEdit,
                displayName: req.user ? req.user.displayName : ''
            })
        }
    });
}

/* POST edit survey page */
module.exports.processEditSurvey = (req, res, next) => {

    let id = req.params.id;
    
    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "date":req.body.date,
        "q1": req.body.q1,
        "q2": req.body.q2,
        "q3":req.body.q3,
        "q4":req.body.q4,
    });

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            return console.log(err);
            // res.end(err);
        }
        else
        {
            //refresh the contact list
            res.redirect('/list/mysurvey');
        }
    });
}

/* POST Delete Survey */
module.exports.deleteSurvey = (req, res, next) => {

    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            return console.log(err);
        }
        else
        {
            //refresh the survey list
            res.redirect('/list/mysurvey');
        }

    });
}