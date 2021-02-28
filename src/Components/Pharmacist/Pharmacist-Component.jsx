import React from 'react';
import {Row, Button, Card, CardBody, CardTitle, CardFooter} from 'reactstrap';
import {Form, Control} from 'react-redux-form';
import './Pharmacist-Styles.css';
import Axios from 'axios';

class Pharmacist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            treatedBy:'',
            prescription:'',
            id:'',
            show:false
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchDisplay = this.handleSearchDisplay.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    handleSearch(values){
        Axios.post('http://localhost:5000/pharmacy/search', {
            id: values.id
        })
        .then((response) => {
            console.log(response);
            if(response.data.success){
               this.setState({
                   treatedBy: response.data.student.treatedBy,
                   prescription: response.data.student.prescription,
                   id: response.data.student.id,
                   show: !this.state.show,
               });
            }
            else{
                this.setState({
                    treatedBy:'',
                    prescription:'',
                    id:'',
                    show:false
                });
                alert(response.data.info);
            }
        })
        .catch(err => { 
            alert(err)
            console.log(err);
         });
    }

    handleSearchDisplay(){
        if(this.state.show){
            return(
                <div>
                    <Card className='card'>
                        <CardTitle><spam className='cardtitle'>{this.state.id}</spam></CardTitle>
                        <hr></hr>
                        <CardBody className='cardbody'>
                            <h4>{this.state.prescription.toString()}</h4>
                        </CardBody>
                        <CardFooter className='cardfooter'>-{this.state.treatedBy}</CardFooter>
                    </Card>
                    <p></p>
                    <Form model='.done' onSubmit={() => this.handleDone()}>
                        <Button type='submit'>Done</Button>
                    </Form>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    handleDone(){
        Axios.post('http://localhost:5000/pharmacy/done',{
            id: this.state.id,
            pConf: true
        })
        .then((response) => {
            if(response.data.success){
                this.setState({
                    show : !this.state.show
                });
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
            <div className='pharmacist'>
                <Row>
                    <h2 className='subItem'>Pharmacy</h2>
                    <div className='gap'>
                        <pre>                                                  </pre>
                    </div>
                    <Button className='subItem' onClick={this.props.toggleLogOut.bind(this)}>Log-Out</Button>
                </Row>
                <hr />
                <Form model='pharmacysearch' onSubmit={(values) => this.handleSearch(values)}>
                    <Row>
                        <div>
                        <Control.text model=".id" id="id" name="id"
                            placeholder="University ID"
                            className="form-control"/>
                        </div>
                        <div>
                            <pre>   <Button type='submit'>Search</Button></pre>
                        </div>
                    </Row>
                </Form>
                <p></p>
                <p></p>
                {this.handleSearchDisplay()}
            </div>
        );
    }
}

export default Pharmacist;