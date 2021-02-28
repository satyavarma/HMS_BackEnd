import React from 'react';
import Header from '../Header/Header-Component';
import Menu from '../Menu/Menu-Component';
import SecurityLogIn from '../../Pages/SecurityLogIn/SecurityLogIn-Component';
import DoctorLogIn from '../../Pages/DoctorLogIn/DoctorLogIn-Component';
import PharmacistLogIn from '../../Pages/PharmacistLogIn/PharmacistLogIn-Component';
import AdminLogIn from '../../Pages/AdminLogIn/AdminLogIn-Component';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


class Main extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <BrowserRouter>
                    <Switch>
                        <Route exact={true} path='/security' component={SecurityLogIn} />
                        <Route exact={true} path='/doctor' component={DoctorLogIn} />
                        <Route exact={true} path='/pharmacy' component={PharmacistLogIn} />
                        <Route exact={true} path='/admin' component={AdminLogIn} />
                        <Route path='/' component={Menu} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default Main;