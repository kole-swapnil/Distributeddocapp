import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,Card, CardImg,CardImgOverlay, CardTitle, CardBody, CardText} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';

import { render } from 'react-dom';
var mst;
var alldocs = [];
function Alldocsrender({dish,zyq}){
    var yz = zyq[0] == dish.docadd?"bg-success text-white":""; 
    return(
        <Card className={yz}>
        <i className="fa fa-user-md fa-5x"></i>
        <CardBody>
        <CardTitle>Name : {dish.name}</CardTitle>
        <CardText><small>Account : {dish.docadd}</small></CardText>
          <CardText>
            <small>Speciality : {dish.speciality}</small>
          </CardText>
        </CardBody>
      </Card>
    )
    }

class AllDocsComponent extends Component{
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [] }
        //this.com = this.com.bind(this);
    }
    
    async componentDidMount(){
        var res = await this.props.contract?.methods.doccount().call();
               
                var response= [];
                for(var i=1;i<=res;i++){
                    var rex = await this.props.contract?.methods.docsId(i).call();
                    response.push(rex);
                }
                console.log(response);
                alldocs = [];
                for(var j=0;j<response.length;j++){
                    var xt = await this.props.contract.methods.docs(response[j]).call();
                    alldocs.push(xt);
                    console.log(j);
                }
                console.log(alldocs);
                this.setState({ dish : alldocs});
         
    }

     render(){
         var z = this.props.accounts;
        
        const Menu = this.state.dish.map((x) => {
            return (
                <div key={x.docadd} className="col-4 col-md-3">
                    < Alldocsrender dish={x} zyq={z}/>
                </div>
            );
        })
        
        return(
        <div className="container">
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>All Doctors</h2>
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




export default AllDocsComponent;