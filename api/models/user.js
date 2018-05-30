let Mongoose = require('mongoose');
let Schema = Mongoose.Schema;

let userSchema = new Schema({
    username:{
      type:'string'
    },
    password:{
      type:'string'
    },
    email:{
        type:'string'
    },
    mobileNumber:{
        type:'Number'
    },
    firstName:{
        type:'string'
    },
    lastName:{
        type:'string'
    },
    profilePic:{
        type:'string'
    },
    googleId:{
        type:'string'
    },
    facebookId:{
        type:'string'
    },
    twitterId:{
        type:'string'
    },
    githubId:{
        type:'string'
    }
})
let user = Mongoose.model('Users', userSchema);

module.exports = user