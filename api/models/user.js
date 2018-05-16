let Mongoose = require('mongoose');
let Schema = Mongoose.Schema;

let usersSchema = new Schema({
    
      user_name:{
        type:'string',
        unique:true,
        required:true
      },
      email:{
        type:'string',
        unique:true,
        required:true
      },
      password:{
        type:'string'
      },
      createdAt: { 
        type: Date, 
        default: Date.now
       },
      updatedAt:{
        type: Date, 
        default: Date.now
      }
})
let users = Mongoose.model('User', usersSchema);

module.exports = users