const mongoose = require('mongoose');


const matchSchema = mongoose.Schema({
    teamOne:String , 
    teamTwo:String , 
    scoreOne:Number , 
    scoreTwo:Number , 
})

const match = mongoose.model('Match' ,matchSchema )

module.exports = match