const express = require('express');
const helmet = require('helmet');
const bodyparser = require('body-parser');
const { addstudents } = require('./routes/register');
const students = require('./models/students');
const { studentslogin } = require('./routes/loginroute');
const app = express();

app.use(helmet());
app.use(bodyparser.json());
app.get('/', async (req,res)=>{
    res.send('Hello World!')
})

app.listen(8000,()=>{
    console.log(8000);
});
app.use('/add-students',addstudents );
app.use('/login-students',studentslogin);
