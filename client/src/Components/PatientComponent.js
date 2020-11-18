import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import '../App.css';
import { render } from 'react-dom';

class PatientComp extends Component{
    constructor(props){
        super(props);
        this.state={pataccount : '',
                    allergies : '', 
                    weight : '', 
                    height : '', 
                    gender : '', 
                    bloodtype : '',
                    age : '',
                    location : ''

                };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    
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
        console.log("Current State" + JSON.stringify(this.state));
        event.preventDefault();
        const res = await this.props.contract.methods.callpatient(this.state.pataccount,this.state.allergies,this.state.weight,this.state.height,this.state.gender,this.state.age,this.state.bloodtype,this.state.location).send({from: this.props.accounts[0],gas : 1000000});
        console.log(res);
    
    }

    render(){
        if(!this.props.auth){
            return(<React.Fragment></React.Fragment>);
        }
        return(
            <div className="container">
                
                    <h2>Add Patient</h2>
                
                <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="pataccount" md={2}>Patient Account</Label>
                                <Col md={10}>
                                    <Input type="text" id="pataccount" name="pataccount" placeholder="Patient Account Address" value={this.state.pataccount} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="allergies" md={2}>Allergies</Label>
                                <Col md={10}>
                                    <Input type="text" id="allergies" name="allergies" placeholder="Allergies" value={this.state.allergies} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="weight" md={2}>Weight</Label>
                                <Col md={10}>
                                    <Input type="text" id="weight" name="weight" placeholder="Weight" value={this.state.weight} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="height" md={2}>Height</Label>
                                <Col md={10}>
                                    <Input type="tel" id="height" name="height" placeholder="Height" value={this.state.height} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="gender" md={2}>Gender</Label>
                                <Col md={4}>
                                    <Input type="select" name="gender" value={this.state.gender} onChange={this.handleInputChange}>
                                    <option>Choose</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="bloodtype" md={2}>Blood Type</Label>
                                <Col md={4}>
                                    <Input type="select" name="bloodtype" value={this.state.bloodtype} onChange={this.handleInputChange}>
                                    <option>Choose</option>
                                    <option>A</option>
                                    <option>B</option>
                                    <option>AB</option>
                                    <option>O</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="age" md={2}>Age</Label>
                                <Col md={10}>
                                    <Input type="tel" id="age" name="age" placeholder="Age" value={this.state.age} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="location" md={2}>Location</Label>
                                <Col md={10}>
                                    <Input type="text" id="location" name="location" placeholder="Location" value={this.state.location} onChange={this.handleInputChange} />    
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">
                                        Add Patient
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                </div>
       
        )
        }        
}

export default PatientComp;