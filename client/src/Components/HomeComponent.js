import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { BrowserRouter, NavLink, Link } from 'react-router-dom';
import '../App.css';

let addr;
function handleInputChange(event){
    const target = event.target;
    addr = target.value;
    const name = target.name;
};



function Home(props){
    var y = props.auth;
    async function handleSubmit(event){
        event.preventDefault();  
        if(addr == ''){
            props.authhandler(false);
        }
        if(props.accounts[0] == addr){
            props.authhandler(true);
            addr = '';
        }
        
        
        console.log(props.accounts[0]);
        
    }
    
    return(
        <div className="container">
            <br/>
            <br/>
            <br/>
            <br/>
        <i className="fa fa-user-md fa-5x"></i>
        
       
           <h2>Welcome to Distributed Doc</h2>
      
             <br/>
             <br/>        
            <h2>Login/Logout</h2>
            <Form onSubmit={handleSubmit}>
                        <FormGroup row className={y?"invisible":""}>
                            <Label htmlFor="acx" md={2}>Passphrase</Label>
                            <Col md={10}>
                                <Input type="password" id="acx" name="acx"  onChange={handleInputChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size:12}}>
                                <Button type="submit" color="primary">
                                    {y?"LOGOUT":"LOGIN"}
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
            
   </div>
    )
}

export default Home;