let Mongoose = require('mongoose');
let Schema = Mongoose.Schema;
let bcrypt   = require('bcrypt-nodejs');
let usersSchema = new Schema({
    
      user_name:{
        type:'string',
        unique:true,
        required:true
      },
      email:{
        type:'string',
        unique:true,
        required:true,
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

//generating hash for password
usersSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
usersSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
let users = Mongoose.model('User', usersSchema);

module.exports = users