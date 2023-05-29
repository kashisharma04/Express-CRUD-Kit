const cardModel = require('../models/cardModel');
const customerModel = require('../models/customerModel');

const createCard = async function(req,res){
    let input = req.body;

    let {cardNumber , cardType, customerName,status, vision , customerID}=input;
    if(!cardNumber) return res.status(400).send({message : "Card Number is Manadatory!!"})
    if(!cardType) return res.status(400).send({message : "Card type is manadatory!!"});
    if(!customerName) return res.status(400).send({message : "Customer Name is Manadatory"});
    if(!status) return res.status(400).send({message : "Status is Manadatory!!"});
    if(!vision) return res.status(400).send({message : "Vision is mandatory"});
    if(!customerID) return res.status(400).send({message : "Customer ID is mandatory!!"});

    if(cardType != "REGULAR" || cardType != "SPECIAL"){
        return res.send({message: "CARD TYPE is INVAILD"})
    }
    else if(status != "ACTIVE" || status != "INACTIVE"){
        return res.send({message: "Status is INVAILD"})
    }
    let uniqueID = await cardModel.findOne({cardNumber : cardNumber});
    if(uniqueID) res.send({message : "Card Numebr already Exsists !!"})
    let data =await cardModel.create(input);
    res.status(201).send({status : true, data:data});
}
const getCard = async function(req,res){
    let data = await cardModel.find();
    res.status(200).send({data : data})
}
module.exports.createCard = createCard;
module.exports.getCard=getCard;
