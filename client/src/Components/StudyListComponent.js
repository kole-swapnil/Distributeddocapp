import React, { Component } from 'react';
import moment from 'moment';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,Card, CardImg,CardImgOverlay, CardTitle, CardBody, CardText} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';

import { render } from 'react-dom';
var mst;
var alldocs = [];
function handleClick(y){
        
    window.location.replace(`http://localhost:3000/viewer/${y}`);
}
function Allpatrender({dish}){

    var yz = "bg-primary text-white"; 
    return(
        <Card className={yz}>
        <i className="fa fa-book fa-5x"></i>
        <CardBody>
        <CardTitle>Study ID : {dish.study_id}</CardTitle>
        <CardText><small>Patient Name : {dish.patname}</small></CardText>
        <CardText><small>Study Type : {dish.study_ohifid}</small></CardText>
        <CardText><small>Instance ID : {dish.instance_id}</small></CardText>
        <CardText><small>Study Date : {dish.studydate}</small></CardText>
        <Button color = "warning" onClick={() => handleClick(dish.url)}>
            Look
        </Button>
        </CardBody>
      </Card>
    )
    }

class StudyListComponent extends Component{
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [] }
        //this.com = this.com.bind(this);
    }
    
    async componentDidMount(){
        var res = await this.props.contract?.methods.getshared_treatment(this.props.accounts[0]).call();
               var c = await res?.length;
                var response= [];
                for(var i=0;i<c;i++){
                    var rex = await this.props.contract?.methods.studies(res[i]).call();
                    response.push(rex);
                }

                this.setState({ dish : response});
         
    }

     render(){
  
        const Menu = this.state.dish.map((x) => {
            return (
                <div key={x} className="col-4 col-md-3">
                    < Allpatrender dish={x}/>
                </div>
            );
        })
        if(!this.props.auth){
            return(<React.Fragment></React.Fragment>);
        }
        return(
        <div className="container">
            <h2>All Treatment</h2>
            <div className="row">
                {Menu}
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
        
        )
    }


}




export default StudyListComponent;