const MedicoContract = require("./contracts/Medico.json");
const Web3 = require("web3");
var instance;
var accounts;
var doc1;
var pat1 ;
var doc2 ;
var pat2;

var age1 = 4;
var name1 = "Ahmad" ;
var speciality1 = "Eye";
var age2 = 89;
var name2 = "Rohit" ;
var speciality2 = "Ear";

//patient
var allergies = "No";
var weight = '95';
var height = 171;
var gender = "Male";
var age = 39;
var bloodtype = "B+";
var location = "India";



Mount = async () => {
    const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:7545"
      );

    const web3 = new Web3(provider);
    accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = MedicoContract.networks[networkId];
     instance = new web3.eth.Contract(
      MedicoContract.abi,
      deployedNetwork && deployedNetwork.address,
    );
 doc1 = accounts[0];
  pat1 = accounts[9];
 doc2 = accounts[1];
 pat2 = accounts[8];
 pat3 = accounts[7];
  // console.log(instance);
  // console.log(accounts);
 // addingDoctor();
   //   addingDoctor(doc1,age1,name1,speciality1);
   //   addingDoctor(doc2,age2,name2,speciality2);
   //addingTreatment();
  //doingTreatment();
  settingdoc();
}


Mount();


addingDoctor = async(acc,age,name,speciality) => {
    const res = await instance.methods.addDoctor(age,name,speciality).send({from: acc,gas : 1000000});
    console.log(res);
}





addingpatient = async() => {
    const res = await instance.methods.addpatient(accounts[0],allergies,weight,height,gender,age,bloodtype,location).send({from: accounts[0],gas : 1000000});
    console.log(res);
}


var treatment_id;
var doctor_add;
var patient_add;
var symptoms = "fever";
var medications = "fivadol";
var procedure = "liquied";
var description = "this mideicine help people to get low or normall heating body";
var prescription = "3 times a day after food";
var dateofComp = "9/10/2020";

addingTreatment = async() => {
    const res = await instance.methods.addTreatment(accounts[0],symptoms,medications).send({from: accounts[0],gas : 1000000});
    console.log(res);
}



doingTreatment = async() => {
  const res = await instance.methods.dotreatment(1,procedure,description,prescription,1).send({from: accounts[0],gas : 1000000});
  console.log(res);
}

settingdoc = async() => {
  const res = await instance.methods.setDoc(2,accounts[1]).send({from: accounts[0],gas : 1000000});
  console.log(res);
}








/*import React, { Component } from "react";
import MedicoContract from "../contracts/Medico.json";
import getWeb3 from "../getWeb3";
import "../App.css";
const age = 4;
const  name = "Ahmad" ;
var speciality = "Eye";

class Main extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null ,res : null};

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
      this.setState({ web3, accounts, contract: instance }, this.addingDoctor);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };
  


addingDoctor = async() => {
   let { accounts, contract, res } = this.state;  
    res = await contract.methods.addDoctor(age,name,speciality).send({from: accounts[0],gas : 1000000});
    console.log(res);
}

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
       <div className="App">
        <h1>Distributed Doc</h1>
       <p>Your Truffle Box is installed and ready.</p>
         <h2>Smart Contract Example</h2>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
      

       </div>
    );
  }
}

export default Main;
*/

const MedicoContract = require("./contracts/Medico.json");
const Web3 = require("web3");
var instance;
var accounts;
var doc1;
var pat1 ;
var doc2 ;
var pat2;
//doctors
var age1 = 40;
var name1 = "Ahmad" ;
var speciality1 = "Eye";
var age2 = 33;
var name2 = "Meachel" ;
var speciality2 = "Ear";
//patients
var allergies1 = "No";
var weight1 = '95';
var height1 = 171;
var gender1 = "Male";
var age1 = 39;
var bloodtype1 = "B+";
var location1 = "India";
var allergies2 = "Yes";
var weight2 = '60';
var height2 = 165;
var gender2 = "Female";
var age2 = 50;
var bloodtype2 = "A+";
var location2 = "USA";
var allergies3 = "No";
var weight3 = '71.50';
var height3 = 171;
var gender3 = "Female";
var age3 = 28;
var bloodtype3 = "A-";
var location3 = "Malaysia";
//treatments
var symptoms1 = "fever";
var medications1 = "fivadol";
var procedure1 = "liquied";
var description1 = "this mideicine help people to get low or normall heating body";
var prescription1 = "3 times a day after food";
var dateofComp1 = "9/10/2020";
var symptoms2 = "headache";
var medications2 = "Pandol Extra";
var procedure2 = "Pills";
var description2 = "this mideicine help people to rid off headache";
var prescription2 = "one time or 2 times if feel headache";
var dateofComp2 = "2/10/2020";
var symptoms3 = "caugh";
var medications3 = "Pandol caugh and fever";
var procedure3 = "Pills";
var description3 = "this mideicine help people stop caughs";
var prescription3 = "3 times a day after food";
var dateofComp3 = "15/10/2020";


Mount = async () => {
    const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:7545"
      );

    const web3 = new Web3(provider);
    accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = MedicoContract.networks[networkId];
     instance = new web3.eth.Contract(
      MedicoContract.abi,
      deployedNetwork && deployedNetwork.address,
    );
 doc1 = accounts[0];
 pat1 = accounts[9];
 doc2 = accounts[1];
 pat2 = accounts[8];
 pat3 = accounts[7];
  // console.log(instance);
  // console.log(accounts);
 // addingDoctor();
   //   addingDoctor(doc1,age1,name1,speciality1);
   //   addingDoctor(doc2,age2,name2,speciality2);
   //addingTreatment();
  //doingTreatment();
  settingdoc();
}


Mount();


addingDoctor = async(acc,age,name,speciality) => {
    const res = await instance.methods.addDoctor(age,name,speciality).send({from: acc,gas : 1000000});
    console.log(res);
}





addingpatient = async() => {
    const res = await instance.methods.addpatient(accounts[0],allergies,weight,height,gender,age,bloodtype,location).send({from: accounts[0],gas : 1000000});
    console.log(res);
}


var treatment_id;
var doctor_add;
var patient_add;
var symptoms = "fever";
var medications = "fivadol";
var procedure = "liquied";
var description = "this mideicine help people to get low or normall heating body";
var prescription = "3 times a day after food";
var dateofComp = "9/10/2020";

addingTreatment = async() => {
    const res = await instance.methods.addTreatment(accounts[0],symptoms,medications).send({from: accounts[0],gas : 1000000});
    console.log(res);
}



doingTreatment = async() => {
  const res = await instance.methods.dotreatment(1,procedure,description,prescription,1).send({from: accounts[0],gas : 1000000});
  console.log(res);
}

settingdoc = async() => {
  const res = await instance.methods.setDoc(2,accounts[1]).send({from: accounts[0],gas : 1000000});
  console.log(res);
}


