const express = require('express');
const validator= require('validator');
const mongoose=require('mongoose')
const cardModel = new mongoose.Schema({
    cardNumber : {
        type : String,
        required : true
    },
    cardType :{
        type : String,
        enum : ["REGULAR" , "SPECIAL"],
        required : true
    },
    customerName : {
        type : String,
        required : true
    },
    status :{
        type : String,
        enum : ["ACTIVE", "INACTIVE"],
        default : "ACTIVE"
    },
    vision : String,
    customerID : {
        type : String,
        ref : 'Customer'
    },
},{timestamps : true
})

module.exports = mongoose.model('Card',cardModel);