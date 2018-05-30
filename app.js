const express = require('express');
const createError = require('http-errors');
const session = require('express-session');
const {rainbow,success,error,radar} = require('handy-log');
const RedisStore = require('connect-redis')(session);
const db = require('./config/connection');
const passport = require('passport');
const logger = require('morgan');

const app = express();

require('./routes')(app)

//middlewares
app.use(session({
    secret:'SECR*T',
    store: new RedisStore({
        host: 'localhost',
        port: 6379,
        ttl: null,
        db: 0,
        pass: null,
        prefix: 'sess:'
      }),
    cookie:{
        maxAge: 60000,
        path: '/',
        httpOnly:true,
        secure:false
    },
    saveUninitialized:false,
    resave:false
    
}))

app.use((req,res,next)=>{
next(createError(404))
})

app.listen(1337,()=>{
    success(`server started in port 1337`)
})