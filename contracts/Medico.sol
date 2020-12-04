pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;


contract Medico{
     uint public patientcount = 0;
      uint public doccount = 0;
      uint public treatmentCount = 0;
      uint public studycount = 0;
      
      event notifydoc(uint indexed treatid,address indexed doc);
      event patstate(address indexed patent,uint8 stat);
      event docadded(address indexed docaddr);
      event patadded(address indexed pataddr);
      event treatadded(uint indexed treataddr,address indexed doc,address indexed pataddr);
      event studyadded(uint indexed studyaddr,address indexed doc); 
      event studysent(uint indexed studyaddr,address indexed doc);
      
      enum State {  Active, Recovered , Deceased }
      
      struct patient{
        uint patient_id;
        address patient_acc;
        string allergies;
        string weight;
        uint height;
        string gender;
        uint age;
        string bloodtype;
        string location;
        uint[] gonetreatment;
        State patient_state;
       
    }
    
    mapping(address=>patient) public pat;
    mapping(uint=>address) public patId;
    
     struct Doctor{
        uint doctor_id;
        address docadd;
        uint age;
        string name;
        string speciality;
        uint[] done_treatment;
        uint[] shared_treatment;
        uint[] shared_study;
    
    }
    
    mapping(address=>Doctor) public docs;
    mapping(uint=>address) public docsId;
    
    struct Treatment{
       uint treatment_id;
       address doctor_add;
       address patient_add;
       string symptoms;
        string medications;
       string procedure;
       string description;
       string prescription;
       uint dateofComp;
    }
    
    mapping(uint => Treatment)public treat;
    
    struct Study{
        uint study_id;
        string patname;
        string study_ohifid;
        string instance_id;
        string studydate;
        string url;
        
    }
    
    mapping(uint => Study)public studies;
    
    function callpatient(address _account,string memory _allergies,string memory _weight, uint _height,string memory _gender,uint _age,string memory _bloodtype,string memory _location) public onlyDoctor(msg.sender){
         bool z = false;
         for(uint i=1;i<=patientcount;i++)
        {
            
            if(patId[i] == _account){
                z = true;
                break;
            }
            
        }
        if(z == false){        
            addpatient(_account,_allergies,_weight,_height,_gender,_age,_bloodtype,_location);
            
        }
        else{
            modpatient(_account,_allergies,_weight,_height,_age,_location);
        }
        
    }
    function addpatient(address _account,string memory _allergies,string memory _weight, uint _height,string memory _gender,uint _age,string memory _bloodtype,string memory _location)public onlyDoctor(msg.sender){
        patientcount++;
        pat[_account].patient_id = patientcount;
        pat[_account].patient_acc = _account;
        pat[_account].allergies = _allergies;
        pat[_account].weight =  _weight;
        pat[_account].height =  _height;
        pat[_account].gender = _gender;
        pat[_account].age = _age;
        pat[_account].bloodtype = _bloodtype;
        pat[_account].location = _location;
        patId[patientcount] = _account;
        emit patadded(_account);
    }
    function modpatient(address _account,string memory _allergies,string memory _weight, uint _height,uint _age,string memory _location)public onlyDoctor(msg.sender)  {
       
      
        pat[_account].allergies = _allergies;
        pat[_account].weight =  _weight;
        pat[_account].height =  _height;

        pat[_account].age = _age;
        pat[_account].location = _location;
        
    }
    function setDoc(uint _treatid ,address _docaccount)public onlyDoctor(msg.sender) {
            docs[_docaccount].shared_treatment.push(_treatid);
            emit notifydoc(_treatid,_docaccount);       
     }
    function sendstudy(uint _study_id,address _docacc)public onlyDoctor(msg.sender){
         docs[_docacc].shared_study.push(_study_id);
         emit studysent(_study_id,_docacc);
    }
     
    function calldoctor(uint _age,string memory _name,string memory _speciality)public{
        address _account = msg.sender;
         bool z = false;
         for(uint i=1;i<=doccount;i++)
        {
            
            if(docsId[i] == _account){
                z = true;
                break;
            }
           
        }
        if(z == false){
            addDoctor(_account,_age,_name, _speciality);
        }
        else{
            modDoctor(_account,_age,_name, _speciality);
        }
    }
     
    function addDoctor(address _account,uint _age,string memory _name,string memory _speciality)public {
        doccount++;
        
        docs[_account].doctor_id = doccount ;
        docs[_account].docadd = _account;
        docs[_account].age = _age;
        docs[_account].name = _name;
        docs[_account].speciality = _speciality;
        docsId[doccount] = _account;
        emit docadded(msg.sender);
    }
    function modDoctor(address _account,uint _age,string memory _name,string memory _speciality)public {
        
        docs[_account].age = _age;
        docs[_account].name = _name;
        docs[_account].speciality = _speciality;
    }
    
    function addTreatment(address _account,string memory _symptoms,string memory _medications)public onlyDoctor(msg.sender) returns(uint){
        treatmentCount++;
        treat[treatmentCount].treatment_id = treatmentCount;
        treat[treatmentCount].doctor_add = msg.sender;
        treat[treatmentCount].patient_add = _account;
          treat[treatmentCount].symptoms = _symptoms;
        treat[treatmentCount].medications = _medications;
        pat[_account].gonetreatment.push(treatmentCount);
        docs[msg.sender].shared_treatment.push(treatmentCount);
        pat[_account].patient_state = State.Active;
        emit treatadded(treatmentCount,msg.sender,_account);
        return treatmentCount;
        
    }
    
    function addStudy(string memory _patname,string memory _study_ohifid,string memory _instance_id,string memory _studydate,string memory _url)public onlyDoctor(msg.sender) returns(uint){
        studycount++;
        studies[studycount].patname = _patname;
        studies[studycount].study_ohifid = _study_ohifid;
        studies[studycount].study_id = studycount;
        studies[studycount].instance_id = _instance_id;
        studies[studycount].studydate = _studydate;
        studies[studycount].url = _url;
        docs[msg.sender].shared_study.push(studycount);
        emit studyadded(studycount,msg.sender);
        return studycount;
        
    }
    
    
    modifier onlyDoctor(address y){
        bool z = false;
         for(uint i=1;i<=doccount;i++)
        {
            
            if(docsId[i] == y){
                z = true;
                break;
            }
           
        }
         require(z==true,"not a doctor");
            _;
            
    }
     modifier alreadypat(address y){
         bool z = false;
         for(uint i=1;i<=patientcount;i++)
        {
            
            if(patId[i] == y){
                z = true;
                break;
            }
            
        }
      
        require(z==false,"call mod patient");
            _;
            
    }
    
    function dotreatment(uint _treatid,string memory _procedure,string memory _description,string memory _prescription,uint _status)public onlyDoctor(msg.sender){
        treat[_treatid].procedure = _procedure;
        treat[_treatid].description = _description;
        treat[_treatid].prescription = _prescription;
        treat[_treatid].dateofComp = now;
        treat[treatmentCount].doctor_add = msg.sender;
        address x = treat[_treatid].patient_add;
        docs[msg.sender].done_treatment.push(_treatid);
        if(_status == 0)
        {pat[x].patient_state = State.Active;
            emit patstate(x,0);
        }
        if(_status == 1)
        {pat[x].patient_state = State.Recovered;
            emit patstate(x,1);
        }
        if(_status == 2)
        {pat[x].patient_state = State.Deceased;
            emit patstate(x,2);
        }
    }
    function gettreatgone(address _account)public view returns (uint[] memory){
        return pat[_account].gonetreatment;
    }
    function gettreatdone(address _docaccount)public view returns (uint[] memory){
        return docs[_docaccount].done_treatment;
    }
    function getshared_treatment(address _acc)public view returns (uint[] memory){
        return docs[_acc].shared_treatment;
    }
    function getshared_doc(address _acc)public view returns (uint[] memory){
        return docs[_acc].shared_study;
    }
    
}