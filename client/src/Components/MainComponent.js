import React, { Component } from "react";
import MedicoContract from "../contracts/Medico.json";
import getWeb3 from "../getWeb3";
import "../App.css";
import Header from "./HeaderComponent";
import Home from './HomeComponent';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import DoctorComp from "./DoctorComponent";
import PatientComp from "./PatientComponent";
import Footer from './FooterComponent';
import TreatmentComp from "./TreatmentComponent";
import AllDocsComponent from "./AllDocsComponent";
import AllTreatmentComponent from "./AllTreatment";
import GetPatient from "./getPatientComponent";
import SharedComp from "./SharedComponent";
import StudyDetail from "./SharedStudyComp";
import StudyListComponent from "./StudyListComponent";


//import HDWalletProvider from "@truffle/hdwallet-provider";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { storageValue: 0, web3: null, accounts: null, contract: null ,res : null,auth:true};
    this.authhandler = this.authhandler.bind(this);
  }
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MedicoContract.networks[networkId];
      const instance = new web3.eth.Contract(
        MedicoContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
     
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      console.log(instance)
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  authhandler = (vt) => {
    this.setState({auth : vt });
  }

  render() {
    const Homepage = () => {
      return(
        <Home auth={this.state.auth} authhandler={this.authhandler} accounts={this.state.accounts}/>
      )
    }
    const StudyParam = ({match}) =>{
      return(
        <StudyDetail params={match.params.dishId} contract={this.state.contract} accounts={this.state.accounts}/>
        )
    }
    return (
      <div className="App">
        <Header contract = {this.state.contract} accounts={this.state.accounts} auth={this.state.auth} />

        <Switch>
          <Route path='/home' component={Homepage} />
          <Route path='/doctor' component={() => <DoctorComp contract={this.state.contract} accounts={this.state.accounts } auth={this.state.auth}/>} />
          <Route path='/treatment' component={() => <TreatmentComp contract={this.state.contract} accounts={this.state.accounts} auth={this.state.auth}/>}/>
          <Route path='/docs' component={() => <AllDocsComponent contract={this.state.contract} accounts={this.state.accounts} auth={this.state.auth}/>}/>
          <Route path='/patient' component={() => <PatientComp contract={this.state.contract} accounts={this.state.accounts} auth={this.state.auth}/>} />
          <Route path='/treat' component={() => <AllTreatmentComponent contract={this.state.contract} accounts={this.state.accounts} auth={this.state.auth}/>}/>
          <Route path='/patdata' component={() => <GetPatient contract={this.state.contract} accounts={this.state.accounts} auth={this.state.auth}/>}/>
          <Route path='/shared' component={() => <StudyListComponent contract={this.state.contract} accounts={this.state.accounts} auth={this.state.auth}/>}/>
          <Route path='/sharedcomp' component={() => <SharedComp contract={this.state.contract} accounts={this.state.accounts} auth={this.state.auth}/>}/>
          <Route path='/studydet/:dishId' component={StudyParam}/>
          <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    )



  }
}

export default Main;
