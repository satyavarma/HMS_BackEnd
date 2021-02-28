import React from 'react';
import {Form, Control} from 'react-redux-form';
import {Row, Button} from 'reactstrap';
import './Security-Styles.css';
import Axios from 'axios';

class Security extends React.Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values){
        var dANDt = new Date();
        var dvalue = dANDt.getFullYear()+'/'+dANDt.getMonth()+'/'+dANDt.getDate()+', '+dANDt.getHours()+':'+dANDt.getMinutes();
        if(values.action=== "in" || values.action === "In" ){
            Axios.post('http://localhost:5000/security/in', {
                id : values.id.toString(),
                inDetails : dvalue
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
        else if(values.action === "out" || values.action === "Out"){
            Axios.post('http://localhost:5000/security/out', {
                id : values.id.toString(),
                outDetails : dvalue
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
    }
    render(){
        return(
            <div className='security'>
                <Row>
                    <h2>Security</h2>
                    <div className='gap'>
                        <pre>                                                  </pre>
                    </div>
                    <Button className='ButtonLogOut' onClick={this.props.toggleLogOut.bind(this)}>Log-Out</Button>
                </Row>
                <hr />
                <Form model='securityentry' className='formstyle' onSubmit = {(values) => this.handleSubmit(values)}>
                    <div>
                        <Control.text model=".id" id="id" name="id"
                            placeholder="University ID"
                            className="form-control"/>
                    </div>
                    <p></p>
                    <div>
                        <Control.text model=".action" id="action" name="action"
                            placeholder="In / Out"
                            className="form-control"/>
                    </div>
                    <p></p>
                    <div>
                        <Button type="submit" className='modalButton'>Submit</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Security;