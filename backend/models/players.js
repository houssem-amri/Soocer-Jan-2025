const mongoose = require('mongoose');


const playerSchema = mongoose.Schema({
    name:String , 
    post:String , 
    number:Number , 
    teamId:{type:String , ref:'Team'} , 
})

const player = mongoose.model('Player' ,playerSchema)

module.exports = player