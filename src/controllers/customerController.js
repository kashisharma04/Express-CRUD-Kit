const { get } = require('mongoose');
const cardModel = require('../models/cardModel');
const customerModel = require('../models/customerModel');
const bcrypt = require('bcrypt');

function isValid(data){
    if (typeof data != "string" || data.trim().length==0) return false
    else return true
}
function validString(input){
    
    return (/^[a-zA-Z\s]+$/.test(input))
}

const validateEmail = (email) => {
    return email.match(/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/);
};
 

const createCustomer = async function(req,res){
    try{
    let customer = req.body
    let {firstName, lastName , mobileNumber , DOB, emailID, address, customerID, status} = customer;
    if (!firstName) {return res.status(400).send("First Name is Mandatory !!"); }
    if(!lastName)  {return  res.status(400).send("Last Name is Mandatory !!"); }
    if(!mobileNumber) {return res.status(400).send("Mobile Number is Manadatory"); }
    if (!DOB) {return res.status(400).send("DOB is Mandatory !!"); }
    if (!emailID) {return res.status(400).send("email Id is Mandatory !!"); }
    if (!address) {return res.status(400).send("Address is Mandatory !!"); }
    if (!customerID) {return res.status(400).send("Customer Id is Mandatory !!"); }
    if (!status) {return res.status(400).send("Status is Mandatory !!"); }

    if(!isValid(firstName) || !validString(firstName)){
        return res.status(400).send("FirstName is Invalid");
    }
    if(!validString(lastName) || !isValid(lastName)){
        return res.status(400).send("LastName is Invalid");
    }
    if(!validateEmail(emailID)){
        return res.send("Email is INVALID")
    }
    
    const uniqueMail= await customerModel.findOne({emailID : emailID});
    if (uniqueMail) res.status(400).send("Email is already registered !!");

    // const saltRound = 10;
    // const hashPassword = bcrypt.hash(customerID , saltRound)
    // customer.customerID(hashPassword);

    const createCustomer = await customerModel.create(customer);
    res.status(201).send({"Customer Detail" : createCustomer});
}    catch(error){
        console.log(error)
        res.status(500).send("Internal Server Error")
}
}


const getCustomer = async function(req,res){
    let data = await customerModel.find({status : "ACTIVE"});
    res.status(200).send({data : data})
}

const deleteCustomer = async function(req,res){
    let input = req.params;
    if(!input) {return res.send("Please check the details!!")}
    let id = await customerModel.findOne(
        {_id : customerId}
    )
    if(!id || id==null){
        return res.status(404).send("Please check your Details!!");
    }
    let data = await customerModel.findOneAndUpdate(
        { _id : customerID},
        {$set : {status : "INACTIVE"}}
    )
    res.status(201).send({data : data});
}


const loginCustomer = async function(req,res){
    let input = req.body
    let {emailID , customerId } = input;
    if(!emailID || !customerId) return res.send({status : false, message:"Invalid details"});

    let customer = await customerModel.findOne ({emailID : emailID});
    if(!customer) return res.send({status : false, message:"Email is invalid !!"});

    let compareMyData = bcrypt.compareSync(customerId, customer.customerId);

    const token = await jwt.sign({_id : customer._id} , "customer-secret-key-unofficial")
    res.send({status:true, validToken : token});
    if(!compareMyData) return res.send({message : "Not authenticated customer"})

}
module.exports.loginCustomer=loginCustomer;
module.exports.createCustomer=createCustomer;
module.exports.getCustomer=getCustomer;
module.exports.deleteCustomer=deleteCustomer;