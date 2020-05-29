import React , {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/framwork_defauit.css';
import './style/framwork_responsive.css';
import './style/framework_rtl.css';
import {Route , BrowserRouter  } from 'react-router-dom';

//import NavBar from './components/general_components/nav/nav.com.js';
import NavBar from './components/general_components/nav/navBar.FnCom.js';

import Auth from './components/general_components/auth/auth.com.js';
import UserSignUp from './components/general_components/signup/signup.user.com.js';
import LawyerSignUp from './components/general_components/signup/signup.lawyer.com.js';
import StudentSignUp from './components/general_components/signup/singup.student.com.js';
import Footer from './components/general_components/footer/footer.com';
import Home from './components/general_components/home/home.com.js';
import CasesList from './components/lawyer_components/cases/cases.com.js';
import CasePage from './components/lawyer_components/cases/casePage.com.js';
import Internalships from './components/lawyer_components/internalships/internalships.com.js';
import Times from './components/lawyer_components/times/times.com.js';
import Profile from './components/general_components/profile/profile.com';
import ImgUpload from './components/general_components/profile/imgUpload.fnCom';
import LawyerList from './components/general_components/list_lawyers/lawyerList.com.js';
import LawyerPage from './components/general_components/lawyer_page/lawyerPage.com.js';
//import LawyerPage from './components/general_components/lawyer_page/lawyerPage.funCom.js';

import DirectBookWithLogin from './components/general_components/lawyer_page/directBookWithLogin.com';
import DirectBookWithSign from './components/general_components/lawyer_page/directBookWithSign.com';
import MyBooks from './components/user_components/my_books/myBook.com.js';
import BookRequests from './components/lawyer_components/requests/book_requests.com.js';
import AppRequests from './components/lawyer_components/requests/app_requests.com.js';
import Agenda from './components/lawyer_components/agenda/agenda.com.js';
import Message from './components/general_components/message_com/message.com';

import Internships from './components/student_components/internships_list/internshipsList.com.js';
import MyApp from './components/student_components/my_applications/myApplications.com.js';
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
            

            </div>
          );
        }else if(type===2){
          return(
            <div>
              
              <Route exact path='/' component={CasesList} />
              <Route exact path='/internalships' component={Internalships} />
              <Route exact path='/times' component={Times} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/img' component={ImgUpload} />
              <Route exact path='/book_requests' component={BookRequests} />
              <Route exact path='/app_requests' component={AppRequests} />
              <Route exact path='/internship_requests' component={BookRequests} />
              <Route exact path='/agenda' component={Agenda} />
              <Route exact path='/casepage/:id' component={CasePage}/>
            </div>
          );
        }else if(type===3){
          return(
            <div>
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/' component={Internships} />
              <Route exact path='/my_app' component={MyApp} />
            </div>
          );
        }
    }else{
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
           
        </div>
      )
    }

 }
  render(){
    return(
        <BrowserRouter>
          <div className="App">
            <NavBar />
            <Message />
            {this.renderLayout()}
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
