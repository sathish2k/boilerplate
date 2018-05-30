let User = require('../models/user');
module.exports = {
    Create:(req,res)=>{
        console.log('create')
        return res.send('working')
    }
}