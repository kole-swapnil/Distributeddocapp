import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { BrowserRouter, NavLink, Link } from 'react-router-dom';
import '../App.css';

let addr;



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

   </div>
    )
}

export default Home;