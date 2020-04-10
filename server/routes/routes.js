var express = require('express');
const authController = require('../controllers/auth.controller.js');
const caseController =require('../controllers/case.controller');
const internshipController =require('../controllers/internship.controller');
const timeController=require('../controllers/time.controller');
const bookController=require('../controllers/book.controller');
const rateController=require('../controllers/rate.controller');
const taskController=require('../controllers/task.controller');
const lawyerController=require('../controllers/lawyer.controller');
const notifyController=require('../controllers/notify.controller');
const applyController=require('../controllers/apply.controller');
const passport = require('passport');




//const passport = require('passport');
 
var router = express.Router();
/*---------------------- {Routes On Router Layer} --------------------------------*/
router.get('/fetch_internships/:_id?', internshipController.fetchInternships);


router.post('/sign', authController.sign );
router.post('/auth',authController.auth);
router.post('/signforbook',authController.SignForBook);


router.get('/fetch_lawyers/:spec?/:city?/:userName?',lawyerController.fetchLawyers);
router.get('/get_lawyer/:_id',lawyerController.getLawyer);
router.get('/fetch_times/:_id?',timeController.fetchTimes);
router.get('/fetch_rates/:_id', rateController.fetchRates);



router.all('*',(req ,res , next )=>{
    passport.authenticate('jwt' , {session : false}, (err , user)=>{
      if(err || !user){
        const error = new Error('You Are Not Authorized to Access This the Area');
        error.status=401;
        throw error;
      }
      req.user=user;
      return next();
    })(req,res,next);
  });
  
  /////////////////////////////////////// {Protected Routes} /////////////////////////
  router.get('/me',authController.me)

  router.post('/add_case', caseController.addCase);
  router.get('/fetch_cases/:archive?', caseController.fetchCases);
  router.delete('/delete_case/:_id', caseController.deleteCase);
  router.put('/archive_case/:_id', caseController.archiveCase);
  router.put('/update_case/:_id', caseController.updateCase);


  router.post('/add_internship', internshipController.addInternship);
  router.delete('/delete_internship/:_id', internshipController.deleteInternship);
  router.put('/update_internship/:_id', internshipController.updateInternship);

  
  router.post('/apply/:_id', applyController.apply);
  router.get('/fetch_applications', applyController.fetchApplications);
  router.delete('/delete_application/:_id', applyController.deleteApplication);
  router.put('/confirm_application/:_id', applyController.confiremApplication);
  router.get('/fetch_application_requests', applyController.fetchApplicationRequests);

  
  router.post('/add_time', timeController.addTime);
  router.delete('/delete_time/:_id', timeController.deleteTime);



  router.post('/book/:_id', bookController.book);
  router.get('/fetch_books', bookController.fetchBooks);
  router.delete('/delete_book/:_id', bookController.deleteBook);
  router.put('/confirm_book/:_id', bookController.confiremBook);
  router.get('/fetch_book_requests', bookController.fetchBookRequests);
 

  router.post('/add_rate', rateController.addRate);

  router.post('/add_task',taskController.addTask);
  router.delete('/delete_task/:_id',taskController.deleteTask)
  router.put('/update_task/:_id',taskController.updateTask);
  router.get('/fetch_tasks',taskController.fetchTasks);

  router.get('/fetch_notifications',notifyController.NotificationsCount);
  router.put('/open_notifications' , notifyController.openNotifications)

  

  

module.exports = router;
