let UserController = require('../api/controllers/UserController');

module.exports=(app)=>{

app.post('/user', UserController.Create);

}

