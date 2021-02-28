import React from 'react';
import Security from '../../Components/Security/Security-Component';
import {Form, Control} from 'react-redux-form';
import {Row, Label, Col, Button} from 'reactstrap';
import './SecurityLogIn-Styles.css';
import Axios from 'axios';
import NavComp from '../../Components/Nav/Nav-Component';

class SecurityLogIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLogedIn: false
        };

        this.handleSecurityLogInSubmit = this.handleSecurityLogInSubmit.bind(this);
        this.toggleLogInSuccess = this.toggleLogInSuccess.bind(this);
        this.toggleLogOut = this.toggleLogOut.bind(this);
        this.handleReload = this.handleReload.bind(this);
    }

    handleSecurityLogInSubmit(values){
        Axios.post('http://localhost:5000/security/login', {
            username: values.username.toString(),
            password: values.password.toString()
        })
        .then((response) => {
            if(response.data.success){
                this.toggleLogInSuccess();
            }
            else{
                alert(response.data.info);
            }
        })
        .catch(err => { console.log(err); });
    }

    toggleLogInSuccess(){
        this.setState({
            isLogedIn: true
        })
        
    }

    toggleLogOut(){
        this.setState({
            isLogedIn: false
        })
        this.handleReload();
    }

    handleReload(){
        window.location.reload();
    }

    render(){
        if (this.state.isLogedIn){
            return (
                <div>
                    <hr
                        style={{
                            backgroundColor:'teal',
                            height: 40
                        }}
                    />
                    <Security toggleLogOut={this.toggleLogOut}/>
                </div>
            );
        }
        else {
            return(
                <div>
                    <NavComp />
                    <div className='securityLogIn'>
                        <h3>Security LogIn</h3>
                        <hr />
                        <Form model='securitylogin' onSubmit={(values) => this.handleSecurityLogInSubmit(values)}>
                            <Row className = 'form-group'>
                                <Label htmlFor='username'>UserName</Label>
                                <Col>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="User Name"
                                        className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="Password">Password</Label>
                                <Col >
                                    <Control.password model=".password" id="password" name="password"
                                        placeholder="Password"
                                        className="form-control"/>
                                </Col>
                            </Row>
                            <Button type="submit" className='modalButton'>Log-In</Button>
                        </Form>
                    </div>
                </div>
            );
        }
    };
}

export default SecurityLogIn;