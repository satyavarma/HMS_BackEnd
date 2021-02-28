import React from 'react';
import Doctor from '../../Components/Doctor/Doctor-Component';
import {Form, Control} from 'react-redux-form';
import {Row, Label, Col, Button} from 'reactstrap';
import './DoctorLogIn-Styles.css';
import Axios from 'axios';
import NavComp from '../../Components/Nav/Nav-Component'


class DoctorLogIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLogedIn: false,
            username : ""
        };
        this.handleDoctorLogInSubmit = this.handleDoctorLogInSubmit.bind(this);
        this.toggleLogInSuccess = this.toggleLogInSuccess.bind(this);
        this.toggleLogOut = this.toggleLogOut.bind(this);
        this.handleReload = this.handleReload.bind(this);
    }

    handleDoctorLogInSubmit(values){
        Axios.post('http://localhost:5000/doctor/login', {
            username: values.username.toString(),
            password: values.password.toString()
        })
        .then((response) => {
            if(response.data.success){
                this.setState({
                    username : values.username
                })
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
                    <Doctor toggleLogOut={this.toggleLogOut} treatedBy={this.state.username} />
                </div>
            );
        }
        else {
            return(
                <div>                  
                    <NavComp />
                    <div className='doctorLogIn'>
                        <h3>Doctors LogIn</h3>
                        <hr />
                        <Form model='doctorlogin' onSubmit={(values) => this.handleDoctorLogInSubmit(values)}>
                            <Row className = 'form-group'>
                                <Label htmlFor='username' >UserName</Label>
                                <Col>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="User Name"
                                        className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="Password">Password</Label>
                                <Col>
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

export default DoctorLogIn;