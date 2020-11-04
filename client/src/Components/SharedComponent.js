import Frame from 'react-frame-component';
import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import '../App.css';
import { render } from 'react-dom';
const iframe = '<iframe height="600" style="width: 90%;" scrolling="no" title="fx." src="http://localhost:3000/" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>'; 


function Iframe(props) {
    return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
  }

function SharedComp() {
  return (
    <div className="App">
      <h1>OHIF VIEWER</h1>
      <Iframe iframe={iframe} />,
    </div>
  );
}




export default SharedComp;