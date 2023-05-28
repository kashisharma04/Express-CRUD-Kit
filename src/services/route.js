const express=require('express');
// const customerModel = require('../models/customerModel');
// const cardModel = require('../models/cardModel')
const {createCustomer, getCustomer,loginCustomer} = require('../controllers/customerController');
// const cardModel= require('../controllers/cardController');

const router = express.Router()

//Route - customerModel :-
router.post('/createCustomer', createCustomer);
router.get('/getCustomer', getCustomer );

//Route - cardModel :-

module.exports = router;
