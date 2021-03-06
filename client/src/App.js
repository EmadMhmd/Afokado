import React , {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/framwork_defauit.css';
import './style/framwork_responsive.css';
import './style/framework_rtl.css';
import {Route , BrowserRouter ,Redirect } from 'react-router-dom';

//import NavBar from './components/general_components/nav/nav.com.js';
import NavBar from './components/general_components/nav/navBar.FnCom.js';

import Auth from './components/general_components/auth/auth.com.js';
import ResetPassword from './components/general_components/auth/resetPassword.com.js';
import UserSignUp from './components/general_components/signup/signup.user.com.js';
import LawyerSignUp from './components/general_components/signup/signup.lawyer.com.js';
import StudentSignUp from './components/general_components/signup/singup.student.com.js';
import Footer from './components/general_components/footer/footer.com';
import About from './components/general_components/footer/about.com';
import Contact from './components/general_components/footer/contact.com';
import OurTeam from './components/general_components/footer/ourTeam.com';
import Home from './components/general_components/home/home.com.js';
import CasesList from './components/lawyer_components/cases/cases.com.js';
import CasePage from './components/lawyer_components/cases/casePage.com.js';
import Internalships from './components/lawyer_components/internalships/internalships.com.js';
import Jobs from './components/lawyer_components/jobs/jobs.com.js';
import JobsList from './components/lawyer_components/jobs_list/jobsList.com.js';
import Times from './components/lawyer_components/times/times.com.js';
import Office from './components/lawyer_components/office/office.com';
import Profile from './components/general_components/profile/profile.com';
import LawyerList from './components/general_components/list_lawyers/lawyerList.com.js';
import LawyerPage from './components/general_components/lawyer_page/lawyerPage.com.js';
//import LawyerPage from './components/general_components/lawyer_page/lawyerPage.funCom.js';

import DirectBookWithLogin from './components/general_components/lawyer_page/directBookWithLogin.com';
import DirectBookWithSign from './components/general_components/lawyer_page/directBookWithSign.com';
import MyBooks from './components/user_components/my_books/myBook.com.js';
import UserCases from './components/user_components/user_cases/userCases.com';
import BookRequests from './components/lawyer_components/requests/book_requests.com.js';
import AppRequests from './components/lawyer_components/requests/appRequests.com.js';
import Applications from './components/lawyer_components/requests/applications.com.js';
import Agenda from './components/lawyer_components/agenda/agenda.com.js';
import Message from './components/general_components/message_com/message.com';

import Internships from './components/student_components/internships_list/internshipsList.com.js';
import MyApp from './components/student_components/my_applications/myApplications.com.js';
import MyOffice from './components/student_components/my_office/myOffice.com.js';
import MyTasks from './components/student_components/my_tasks/myTasks.com';
import {connect} from 'react-redux';

class App extends Component {

  renderLayout(){
    const {isAuth} = this.props;
    const {profile :{type}} = this.props;
    if(isAuth){

        if(type ===1){
          return(
            <div>
              <Route exact path='/' component={Home} />
              <Route exact path='/my_books' component={MyBooks} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/list' component={LawyerList} />
              <Route exact path='/lawyerpage/:id' component={LawyerPage} />
              <Route exact path='/casepage/:id' component={CasePage}/>
              <Route exact path='/user_cases' component={UserCases}/>
            </div>
          );
        }else if(type===2){
          return(
            <div>
              
              <Route exact path='/' component={CasesList} />
              <Route exact path='/internalships' component={Internalships} />
              <Route exact path='/offer' component={Jobs} />
              <Route exact path='/jobs_list' component={JobsList} />
              <Route exact path='/office' component={Office} />
              <Route exact path='/times' component={Times} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/book_requests' component={BookRequests} />
              <Route exact path='/app_requests' component={AppRequests} />
              <Route exact path='/applications/:id' component={Applications} />
              <Route exact path='/agenda' component={Agenda} />
              <Route exact path='/my_tasks' component={MyTasks} />
              <Route exact path='/casepage/:id' component={CasePage}/>
              <Route exact path='/my_app' component={MyApp} />
              <Route exact path='/intern_list' component={Internships} />
            </div>
          );
        }else if(type===3){
          return(
            <div>
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/' component={Internships} />
              <Route exact path='/intern_list' component={Internships} />
              <Route exact path='/my_app' component={MyApp} />
              <Route exact path='/my_office' component={MyOffice} />
              <Route exact path='/my_tasks' component={MyTasks} />
              <Route exact path='/jobs_list' component={JobsList} />
            </div>
          );
        }
    }else{
      /*console.log('path :',window.location.pathname , "location :" ,window.location)
      const paths=['/' , '/auth' , '/user_signup' , '/lawyer_signup' , '/student_signup' , '/list' , '/lawyerpage/:id' , '/book_sign' , '/book_login/:time_id' , '/reset_password/:token']
      if(paths.includes(window.location.pathname) paths.indexOf(window.location.pathname) > -1){ */
      return(
        <div>
          
            <Route exact path='/' component={Home} />
            <Route exact path='/auth' component={Auth} />
            <Route exact path='/user_signup' component={UserSignUp} />
            <Route exact path='/lawyer_signup' component={LawyerSignUp} />
            <Route exact path='/student_signup' component={StudentSignUp} />
            <Route exact path='/list' component={LawyerList} />
            <Route exact path='/lawyerpage/:id' component={LawyerPage} />
            <Route exact path='/book_sign' component={DirectBookWithSign} />
            <Route exact path='/book_login/:time_id' component={DirectBookWithLogin} />
            <Route exact path='/reset_password/:token' component={ResetPassword} />
            <Redirect to='/auth'/>
        </div>
      )/*} else{
        return (
          <div>
            <Redirect to='/'/>
          </div>
        )
         
      }*/
    }

 }
  render(){
    return(
        <BrowserRouter>
          <div className="App">
            <NavBar />
            <Message />
            {this.renderLayout()}
            <Route exact path='/about' component={About} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/our_team' component={OurTeam} />
            <Footer />
          </div>
        </BrowserRouter>
    )
  }
}

const mapStateToProps=({auth})=>{
  return{
      profile :auth.profile,
      isAuth :auth.isAuth
  }
}

export default connect(mapStateToProps)(App);
