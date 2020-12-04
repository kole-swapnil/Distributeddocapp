import React, { Component } from 'react';
import moment from 'moment';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,Card, CardImg,CardImgOverlay, CardTitle, CardBody, CardText, Modal,ModalBody,ModalHeader} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';

import { render } from 'react-dom';
var mst;
var alldocs = [];

function handleClick(y){
        
    window.location.replace(`http://localhost:3000/viewer/${y}`);
}


    class Allpatrender extends Component{
        constructor(props){
            super(props);
            this.state = { docCount : 0, qty: 0 , dish: [] , isModalOpen: false, isModalOpen1: false,docaccount : null,newid: 0};
         
            this.toggleModal1 = this.toggleModal1.bind(this);
            this.share = this.share.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);

        } 
        share = async () => {
            console.log(this.state.newid);
            const res = await this.props.contract.methods.sendstudy(this.props.dish.study_id,this.state.docaccount).send({from: this.props.accounts[0],gas : 1000000});
            console.log(res);
        }
        toggleModal1() {
            this.setState({
                isModalOpen1: !this.state.isModalOpen1
            });
        }
        handleInputChange(event){
            const target = event.target;
            const value = target.value;
            const name = target.name;
            this.setState({
                [name] : value
            })
            
        }
    

render(){
    this.state.newid = this.props.dish.study_id;
    return(
        <Card className="bg-primary text-white">
        <i className="fa fa-book fa-5x"></i>
        <CardBody>
        <CardTitle>Study ID : {this.props.dish.study_id}</CardTitle>
        <CardText><small>Patient Name : {this.props.dish.patname}</small></CardText>
        <CardText><small>Study Type : {this.props.dish.study_ohifid}</small></CardText>
        <CardText><small>Instance ID : {this.props.dish.instance_id}</small></CardText>
        <CardText><small>Study Date : {this.props.dish.studydate}</small></CardText>
        <Button color = "warning" onClick={() => handleClick(this.props.dish.url)}>
            Look
        </Button>
        
        <Button className="ml-2 visible" color="success" onClick={this.toggleModal1}>
                    Share
                </Button>
                
                <Modal isOpen={this.state.isModalOpen1}  className="modal-md" style={{marginTop: 150}}>
                    <ModalHeader toggle={this.toggleModal1} className="pl-5">Share to Doctor</ModalHeader>
                    <ModalBody>
                        <div className="row m-auto p-5">
                             <Input type="text" id="docaccount" name="docaccount" placeholder="Doctor Account Address" value={this.state.docaccount} onChange={this.handleInputChange}/>
                             <br/><br/>
                            <Button className="ml-2" color="info" onClick={this.share}>Send</Button>
                        </div>
                    </ModalBody>
                </Modal>
        </CardBody>
      </Card>
    )
    }
}


class StudyListComponent extends Component{
    constructor(props){
        super(props);
        this.state = { docCount : 0, dish: [] }
        //this.com = this.com.bind(this);
    }
    
    async componentDidMount(){
        var res = await this.props.contract?.methods.getshared_doc(this.props.accounts[0]).call();
      //
        console.log(res);
               var c = await res?.length;
                var response= [];
                for(var i=0;i<c;i++){
                    var rex = await this.props.contract?.methods.studies(res[i]).call();
                    response.push(rex);
                }

                this.setState({ dish : response});
                console.log(response);
         
    }

     render(){
  
        const Menu = this.state.dish.map((x) => {
            console.log(x);
            return (
                <div key={x} className="col-4 col-md-3">
                    < Allpatrender dish={x} contract = {this.props.contract} accounts={this.props.accounts}/>
                </div>
            );
        })
        if(!this.props.auth){
            return(<React.Fragment></React.Fragment>);
        }
        return(
        <div className="container">
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>All Studies</h2>
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