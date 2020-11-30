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
        this.handleAdd = this.handleAdd.bind(this);
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
         event.preventDefault();
         const res = await this.props.contract.methods.sendstudy(1,this.state.docaccount).send({from: this.props.accounts[0],gas : 1000000});
         console.log(res);

    
    }
    async handleAdd(){
        const res = await this.props.contract?.methods.addStudy(this.state.res[0],this.state.res[1],parseInt(this.state.res[2]),this.state.res[3],this.state.res[4]).send({from: this.props.accounts[0],gas : 1000000});
        console.log(res);
    }

    handleClick(){
        
        window.location.replace(`http://localhost:3000/viewer/${this.state.res[4]}`);
    }
    render() {
        console.log(this.props);
     
        return (
            <div className="container">
                <h1>Studies</h1>
                <br/>
                <br/>
                <p>Patient Name : {this.state.res[0]}</p>
                <p>Study Type : {this.state.res[1]}</p>
                <p>Instance Id : {this.state.res[2]}</p>
                <p>Study Date : {this.state.res[3]}</p>
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
                                <Col >
                                    <Button onClick={() => this.handleAdd()} color="primary">
                                        Add Study
                                    </Button>
                                    <Button type="submit" color="success">
                                        Send Study
                                    </Button>
                                    
                                </Col>
                                
                            </FormGroup>

                            
                        </Form>
                        
                       
            
            </div>
            
        );
    }
}

export default StudyDetail;