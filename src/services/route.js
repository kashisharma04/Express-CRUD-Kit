const express=require('express');
const {createCustomer, getCustomer,loginCustomer,deleteCustomer} = require('../controllers/customerController');
const {createCard, getCard} = require('../controllers/cardController');

const router = express.Router()

//Route - customerModel :-
router.post('/createCustomer', createCustomer);
router.get('/getCustomer', getCustomer );
router.delete('/deleteCustomer',deleteCustomer);
router.post('/loginCustomer',loginCustomer);

//Route - cardModel :-
router.post('/createCard', createCard);
router.get('/getCard', getCard );
// router.delete('/deleteCard',deleteCustomer);

module.exports = router;
