const express= require('express');
const validator = require('validator');
const mongoose=require('mongoose')
;
const customer = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    mobileNumber : {
        type : String,
        minlength : 10,
        maxlength : 10,
        required : true,
        unique : true
    },
    DOB : {
        type : Date,
        required : true
    },
    emailID: {
        type: String,
        required: true,
        unique: true,
        validate: [{ validator: validator.isEmail, message: 'Please enter email in valid format' }]
    },
    address : String,
    customerID : {
        type: String,
        //match: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
        required: true,
        unique : true
      },
    status : {
        type : String,
        enum : ['ACTIVE' , 'INACTIVE'],
        required : true
    }
},   {timestamps : true
});

module.exports = mongoose.model('Customer', customer);