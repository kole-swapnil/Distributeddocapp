import Frame from 'react-frame-component';
import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import '../App.css';
import { render } from 'react-dom';
const iframe = '<iframe height="800" style="width: 100%;" scrolling="yes" title="fx." src="http://localhost:3000/" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>'; 


function Iframe(props) {
    return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
  }

function SharedComp() {
  return (
    <div className="App">
  
      <Iframe iframe={iframe} />,
    </div>
  );
}




export default SharedComp;