var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

// /* GET my survey page. */
// router.get('/mysurvey', function(req, res, next) {
//   res.render('index', { title: 'My Surveys' });
// });

/* Get Route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login page*/
router.post('/login', indexController.processLoginPage);

/* Get Route for displaying the Register page */
router.get('/signup', indexController.displayRegisterPage);

/* POST Route for processing the Register page*/
router.post('/signup', indexController.processRegisterPage);

/* Get Route to perform User logout */
router.get('/logout', indexController.performLogout);

// router.get('/create', function(req, res, next) {
//   console.log('[routes.index.create] rendering create survey page');
//   res.render('partials/create-survey', { title: 'Create a Survey' });
// });

// router.get('/edit', function(req, res, next) {
//   console.log('[routes.index.edit] rendering edit survey page');
//   res.render('partials/edit-survey', { title: 'Edit a Survey' });
// });

// router.get('/take', function(req, res, next) {
//   res.render('partials/take-survey', { title: 'Take a Survey' });
// });

module.exports = router;
