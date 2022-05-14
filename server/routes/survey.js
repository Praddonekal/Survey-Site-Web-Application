let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Survey = require('../models/survey');

// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

// create surveys controller reference
let surveyController = require('../controllers/survey');

/* GET open surveys page. */
router.get('/', surveyController.displayOpenSurveys);

/* GET create survey page. */
router.get('/add', requireAuth, surveyController.displayAddSurveyPage);

/* POST create survey page */
router.post('/add', requireAuth, surveyController.processAddSurvey);

/* GET create survey page. */
router.get('/mysurvey', requireAuth, surveyController.displayMySurveyPage);

/* GET Take survey page. */
router.get('/take/:id', surveyController.displayTakeSurveyPage);

/* GET Take survey page. */
router.post('/take/:id', surveyController.processTakeSurveyPage);


//edit the survey
router.get('/edit/:id', requireAuth, surveyController.displayEditSurveyPage);

//update the survey 
router.post('/edit/:id', requireAuth, surveyController.processEditSurvey);


//delete the survey
router.get('/delete/:id', requireAuth, surveyController.deleteSurvey);

module.exports = router;