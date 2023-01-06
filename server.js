//run the app with command: node server.js
const express = require('express');
const {MongoClient} = require('mongodb');
const uri = "";
const db_client = new MongoClient(uri);

const app = express();
const parser = require('body-parser');
const { ObjectID } = require('bson');
const port = 3080;
const users = [];

app.use(parser.json());

app.get('/api/users', (req,res) => {
    console.log("Requesting for user list");
    const user_db = db_client.db('UserDB');
    const users_collection = user_db.collection('users');
    const users_array = users_collection.find().toArray(function(error,data){
        res.json(data);
    });
});

app.get('/api/user/:id', (req,res) => {
    console.log("Geting user by id " + req.params.id);
    const user_db = db_client.db('UserDB');
    const users_collection = user_db.collection('users');
    users_collection.findOne({ _id : new ObjectID(req.params.id)},function(err,data){
        // console.log(data);
        res.json(data);
    });
    
});

app.post('/api/adduser', (req,res) => {
    const user = req.body.user;
    //users.push(user);
    const user_db = db_client.db('UserDB');
    const users = user_db.collection('users');
    users.insertOne(user);
    res.json('user added');
});

app.delete('/api/deleteuser/:id', (req,res) => {
    console.log("Deleting user with _id = " + req.params.id);
    const user_db = db_client.db('UserDB');
    const users = user_db.collection('users');
    users.deleteOne({ _id : new ObjectID(req.params.id)});
    res.json("User Deleted");
});

app.get('/', (req,res) => {
    res.json('User management app is runing at port ' + port);
});

app.listen(port, ()=>{
    console.log('Server is listening at port ' + port);
});

app.post('/api/updateuser', (req,res) => {
    const user = req.body.user;
    console.log("updating user " + user._id);
    console.log("updating user first name " + user.firstName);
    const user_db = db_client.db('UserDB');
    const users = user_db.collection('users');
    users.updateOne(
        {_id: new ObjectID(user._id)},
        {
        $set: {firstName: user.firstName, lastName: user.lastName, email: user.email},
        $currentDate: { lastModified: true }
    });
    res.json('user updated');
});



