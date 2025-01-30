const mongoose = require('mongoose');


const teamSchema = mongoose.Schema({
    name:String , 
    date:Date , 
    description:String , 
    image:String , 
    players:[{type:String , ref:'Player'}]
})

const team = mongoose.model('Team' ,teamSchema )

module.exports = team