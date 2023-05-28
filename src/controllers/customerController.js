const { get } = require('mongoose');
const cardModel = require('../models/cardModel');
const customerModel = require('../models/customerModel');
const bcrypt = require('bcrypt');

function isValid(data){
    if (typeof data != "string" || data.trim().length) return false
    else return true
}
function validString(input){
    
    return (/^[a-zA-Z]+$/.test(input))
}

const validateEmail = (email) => {
    return email.match(/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/);
};
 

const createCustomer = async function(req,res){
    try{
    let customer = req.body
    let {firstName, lastName , mobileNumber , DOB, emailID, address, customerId, status} = customer
    if (!firstName) res.status(400).send("First Name is Mandatory !!");
    if(!lastName)   res.status(400).send("Last Name is Mandatory !!");
    if(!mobileNumber) res.status(400).send("Mobile Number is Manadatory");
    if (!DOB) res.status(400).send("DOB is Mandatory !!");
    if (!emailID) res.status(400).send("email Id is Mandatory !!");
    if (!address) res.status(400).send("Address is Mandatory !!");
    if (!customerId) res.status(400).send("Customer Id is Mandatory !!");
    if (!status) res.status(400).send("Status is Mandatory !!");

    if(!isValid(firstName) || !isValid(firstName)){
        return res.status(400).send("FirstName is Invalid");
    }
    if(!validString(lastName) || !validString(lastName)){
        return res.status(400).send("LastName is Invalid");
    }
    
    const uniqueMail= await customerModel.findOne({emailID : emailID});
    if (!uniqueMail) res.status(400).send("Email is already registered !!");

    const saltRound = 10;
    const hashPassword = bcrypt.hash(customerId , saltRound)
    customer.customerId(hashPassword);

    const createCustomer = await customerModel.create(customer);
    res.status(201).send({"Customer Detail" : createCustomer});
}    catch(error){
        console.log(error)
        res.status(500).send("Internal Server Error")
}
}


const getCustomer = async function(req,res){
    let data = await customerModel.find();
    res.status(200).send({data : data})
}


// const loginCustomer = async function(req,res){
//     let input = req.body
//     let {emailID , customerId } = input;
//     if(!emailID || !customerId) return res.send({status : false, message:"Invalid details"});

//     let customer = await customerModel.findOne ({emailID : emailID});
//     if(!customer) return res.send({status : false, message:"Email is invalid !!"});

//     let compareMyData = bcrypt.compareSync(customerId, customer.customerId);

//     const token = await jwt.sign({_id : customer._id} , "customer-secret-key-unofficial")
//     res.send({status:true, validToken : token});
//     if(!compareMyData) return res.send({message : "Not authenticated customer"})

// }
// module.exports.loginCustomer=loginCustomer;
module.exports.createCustomer=createCustomer;
module.exports.getCustomer=getCustomer;