const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true , unique:true},
    tel: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    
},
{ timestamps: true }
)

const user = mongoose.model('User', userSchema)

module.exports = user