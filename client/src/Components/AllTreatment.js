import React, { Component } from 'react';
import moment from 'moment';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,Card, CardImg,CardImgOverlay, CardTitle, CardBody, CardText} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';

import { render } from 'react-dom';
var mst;
var alldocs = [];
function Allpatrender({dish}){
    var day = moment.unix(dish.dateofComp); 
    var xy = dish.dateofComp;
    var date = new Date(xy*1000);
    var time = day.format('dddd MMMM Do YYYY, h:mm:ss a');
    var yz = xy != 0?"bg-success text-white":""; 
    return(
        <Card className={yz}>
        <i className="fa fa-medkit fa-5x"></i>
        <CardBody>
        <CardTitle>Treatment ID : {dish.treatment_id}</CardTitle>
        <CardText><small>Doctor account : {dish.doctor_add}</small></CardText>
        <CardText><small>Patient account : {dish.patient_add}</small></CardText>
        <CardText><small>Symptoms : {dish.symptoms}</small></CardText>
        <CardText><small>Medications : {dish.medications}</small></CardText>
        <CardText><small>Description : {dish.description}</small></CardText>
        <CardText><small>Prescription : {dish.prescription}</small></CardText>
          <CardText>
            <small >Time completed : {xy == 0?"Treatment not completed":time}</small>
          </CardText>
        </CardBody>
      </Card>
    )
    }

class AllTreatmentComponent extends Component{
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [] }
        //this.com = this.com.bind(this);
    }
    
    async componentDidMount(){
        var res = await this.props.contract?.methods.treatmentCount().call();
               
                var response= [];
                for(var i=1;i<=res;i++){
                    var rex = await this.props.contract?.methods.treat(i).call();
                    response.push(rex);
                }
                alldocs = [];
                alldocs = response.filter((resp) => resp.doctor_add == this.props.accounts[0])
                console.log(response);
                this.setState({ dish : alldocs});
         
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




export default AllTreatmentComponent;