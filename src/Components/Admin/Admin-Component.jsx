import React from 'react';
import './Admin-Styles.css';
import {Form, Control} from 'react-redux-form';
import {Row, Label, Col, Button} from 'reactstrap';
import Axios from 'axios';

class Administration extends React.Component {
    constructor(props){
        super(props);

        this.handleSecAdd = this.handleSecAdd.bind(this);
        this.handleSecRemove = this.handleSecRemove.bind(this);
        this.handleDocAdd = this.handleDocAdd.bind(this);
        this.handleDocRemove = this.handleDocRemove.bind(this);
        this.handlePharAdd = this.handlePharAdd.bind(this);
        this.handlePharRemove = this.handlePharRemove.bind(this);
    }

    handleSecAdd(values){
        Axios.post('http://localhost:5000/admin/securityadd', {
            username: values.username.toString(),
            password: values.password.toString()
        })
        .then((response) => {
            if(response.data.success){
                alert(response.data.info);
            }
            else{
                alert(response.data.info);
            }
        })
        .catch(err => { 
            alert(err)
            console.log(err);
         });
    }

    handleSecRemove(values){
        Axios.post('http://localhost:5000/admin/securityremove', {
            username: values.username.toString()
        })
        .then((response) => {
            if(response.data.success){
                alert(response.data.info);
            }
            else{
                alert(response.data.info);
            }
        })
        .catch(err => { 
            alert(err)
            console.log(err);
         });    
    }

    handleDocAdd(values){
        Axios.post('http://localhost:5000/admin/doctoradd', {
            username: values.username.toString(),
            password: values.password.toString()
        })
        .then((response) => {
            if(response.data.success){
                alert(response.data.info);
            }
            else{
                alert(response.data.info);
            }
        })
        .catch(err => { 
            alert(err)
            console.log(err);
         });
    }

    handleDocRemove(values){
        Axios.post('http://localhost:5000/admin/doctorremove', {
            username: values.username.toString()
        })
        .then((response) => {
            if(response.data.success){
                alert(response.data.info);
            }
            else{
                alert(response.data.info);
            }
        })
        .catch(err => { 
            alert(err)
            console.log(err);
         });
    }

    handlePharAdd(values){
        Axios.post('http://localhost:5000/admin/pharmacyadd', {
            username: values.username.toString(),
            password: values.password.toString()
        })
        .then((response) => {
            if(response.data.success){
                alert(response.data.info);
            }
            else{
                alert(response.data.info);
            }
        })
        .catch(err => { 
            alert(err)
            console.log(err);
         });
    }

    handlePharRemove(values){
        Axios.post('http://localhost:5000/admin/pharmacyremove', {
            username: values.username.toString()
        })
        .then((response) => {
            if(response.data.success){
                alert(response.data.info);
            }
            else{
                alert(response.data.info);
            }
        })
        .catch(err => { 
            alert(err)
            console.log(err);
         });
    }

    render(){
        return(
            <div>
                <div className="subhead">
                    <Row>
                        <h2>Admin</h2>
                        <div className='gap'>
                            <pre>                                                  </pre>
                        </div>
                        <Button className='subItem' onClick={this.props.toggleLogOut.bind(this)}>Log-Out</Button>
                    </Row>
                </div>
                <hr />
                <div className='adminSecurity'>
                    <h3>Security Account Settings</h3>
                    <hr />
                    <p></p><h4>Adding</h4><p></p>
                    <Form model='securityaddsettings' onSubmit = {(values) => this.handleSecAdd(values)}>
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
                        <Button type="submit" className='modalButton'>Add</Button>
                    </Form>
                    <hr />
                    <h4>Removing</h4><p></p>
                    <Form model='securityremovesettings' onSubmit = {(values) => this.handleSecRemove(values)}>
                        <Row className = 'form-group'>
                            <Label htmlFor='username'>UserName</Label>
                            <Col>
                                <Control.text model=".username" id="username" name="username"
                                    placeholder="User Name"
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Button type="submit" className='modalButton'>Remove</Button>
                    </Form>
                </div>
                <div className='adminDoctor'>
                    <h3>Doctors Accounts Settings</h3>
                    <hr />
                    <p></p><h4>Adding</h4><p></p>
                    <Form model='doctoraddsettings' onSubmit = {(values) => this.handleDocAdd(values)}>
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
                        <Button type="submit" className='modalButton'>Add</Button>
                    </Form>
                    <hr />
                    <h4>Removing</h4><p></p>
                    <Form model='doctorremovesettings' onSubmit={(values) => this.handleDocRemove(values)}>
                        <Row className = 'form-group'>
                            <Label htmlFor='username'>UserName</Label>
                            <Col>
                                <Control.text model=".username" id="username" name="username"
                                    placeholder="User Name"
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Button type="submit" className='modalButton'>Remove</Button>
                    </Form>
                </div>
                <div className='adminPharmacist'>
                    <h3>Pharmacist Account Settings</h3>
                    <hr />
                    <p></p><h4>Adding</h4><p></p>
                    <Form model='pharmacistaddsettings' onSubmit={(values) => this.handlePharAdd(values)}>
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
                            <Col>
                                <Control.password model=".password" id="password" name="password"
                                    placeholder="Password"
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Button type="submit" className='modalButton'>Add</Button>
                    </Form>
                    <hr />
                    <h4>Removing</h4><p></p>
                    <Form model='pharmaicstremovesettings' onSubmit={(values) => this.handlePharRemove(values)}>
                        <Row className = 'form-group'>
                            <Label htmlFor='username'>UserName</Label>
                            <Col>
                                <Control.text model=".username" id="username" name="username"
                                    placeholder="User Name"
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Button type="submit" className='modalButton'>Remove</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Administration;