import React from 'react';
import Main from './Components/Main/Main-Component'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {combineForms} from 'react-redux-form';

const initialSecurityLogIn = {
  username:"",
  password:""
}

const initialDoctorLogIn = {
  username:"",
  password:""
}

const initialPharmacistLogIn={
  username:"",
  password:""
}

const initialAdminLogIn={
  username:"",
  password:""
}

const initialSecurityEntry={
  id:"",
  action:""
}

const initialPharmacySearch = {
  id:"",
}

const initialDoctorPrescription = {
  id:"",
  prescription:"",
}

const initialSecurityAdd = {
  username:"",
  password:""
}

const initialDoctorAdd = {
  username:"",
  password:""
}

const initialPharmacistAdd = {
  username:"",
  password:""
}

const initialSecurityRemove = {
  username:""
}

const initialDoctorRemove = {
  username:""
}

const initialPharmacistRemove = {
  username:""
}

const initialDone ={

}

const store = createStore(combineForms(
  {
    securitylogin : initialSecurityLogIn,
    doctorlogin : initialDoctorLogIn,
    pharmacistlogin : initialPharmacistLogIn,
    adminlogin: initialAdminLogIn,
    securityentry: initialSecurityEntry,
    pharmacysearch: initialPharmacySearch,
    doctorprescription: initialDoctorPrescription,
    securityaddsettings: initialSecurityAdd,
    doctoraddsettings: initialDoctorAdd,
    pharmacistaddsettings: initialPharmacistAdd,
    pharmaicstremovesettings: initialPharmacistRemove,
    doctorremovesettings: initialDoctorRemove,
    securityremovesettings: initialSecurityRemove,
    done: initialDone
  }
));

class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <div>
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
