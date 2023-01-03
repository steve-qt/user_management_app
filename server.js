//run the app with command: node server.js
const express = require('express');
const app = express();
const parser = require('body-parser');
const port = 3080;


const users = [];

app.use(parser.json());

app.get('/api/users', (req,res) => {
    console.log("Requesting for user list");
    res.json(users);
});

app.post('/api/adduser', (req,res) => {
    const user = req.body.user;
    users.push(user);
    res.json('user added');
});

app.post('/api/deleteuser', (req,res) => {
    const user_lastname = req.body.lastname;
    console.log("Deleting user with lastname = " + user_lastname);
 
    id = users.findIndex(item => item.lastName == user_lastname);
    console.log("deleted id = " + id);
    if (id != -1)
        users.splice(id,1);

    res.json('user deleted');
});

app.get('/', (req,res) => {
    res.json('User management app is runing at port ' + port);
});

app.listen(port, ()=>{
    console.log('Server is listening at port ' + port);
});


