import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';


class StudyDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            res : this.props.params.split("&"),docaccount : null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        })
        
    }

    async handleSubmit(event){
        // console.log("Current State" + JSON.stringify(this.state));
        // event.preventDefault();
        // const res = await this.props.contract.methods.callpatient(this.state.pataccount,this.state.allergies,this.state.weight,this.state.height,this.state.gender,this.state.age,this.state.bloodtype,this.state.location).send({from: this.props.accounts[0],gas : 1000000});
        // console.log(res);
    
    }
    handleClick(){
        
        window.location.replace(`http://localhost:3000/viewer/${this.state.res[4]}`);
    }
    render() {
     
        return (
            <div className="container">
                <p>Patient Name : {this.state.res[0]}</p>
                <p>StudyId : {this.state.res[1]}</p>
                <p>InstanceId : {this.state.res[2]}</p>
                <p>StudyDate : {this.state.res[3]}</p>
                <br/>
                <br/>
                <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="docaccount" md={2}>Doctor Account</Label>
                                <Col md={10}>
                                    <Input type="text" id="docaccount" name="docaccount" placeholder="Doctor Account Address" value={this.state.docaccount} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">
                                        Send Study
                                    </Button>
                                </Col>
                                
                            </FormGroup>

                            
                        </Form>
                        <Button onClick={() => this.handleClick()}>
                            Look
                        </Button>
                       
            
            </div>
            
        );
    }
}

export default StudyDetail;