import React from 'react';
import {Row, Button} from 'reactstrap';
import {Form, Control} from 'react-redux-form';
import './Doctor-Styles.css';
import Axios from 'axios';

class Doctor extends React.Component{
    constructor(props){
        super(props);
        
        this.handleForwardPharmacy = this.handleForwardPharmacy.bind(this);
    }

    handleForwardPharmacy(values){
        console.log(values);
        if(values.prescription === ''){
            alert('note the prescription')
        }
        else{
            Axios.post('http://localhost:5000/doctor/prescription', {
                id: values.id.toString(),
                treatedBy: this.props.treatedBy,
                prescription: values.prescription,
                dConf: true
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
            <div className='doctor'>
                <Row>
                    <h2 className='subItem'>Doctor</h2>
                    <div className='gap'>
                        <pre>                                                  </pre>
                    </div>
                    <Button className='subItem' onClick={this.props.toggleLogOut.bind(this)}>Log-Out</Button>
                </Row>
                <hr />
                <Form model='doctorprescription' onSubmit = {(values) => this.handleForwardPharmacy(values)}>
                    <div>
                        <Control.text model=".id" id="id" name="id"
                            placeholder="University ID"
                            className="form-control"/>
                    </div>
                    <p></p>
                    <div>
                        <Control.textarea model=".prescription" id="prescription" name="prescription"
                            placeholder="prescription"
                            className="form-control"/>
                    </div>
                    <p></p>
                    <div>
                        <Button type='submit'>Forward To pharmacy</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Doctor;