const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const app = express();

require('dotenv').config();
const dbURI ='mongodb+srv://'+process.env.DBUSERNAME+':'+process.env.DBPASSWORD+'@'+process.env.CLUSTER+'.mongodb.net/'+process.env.DB+'?retryWrites=true&w=majority&appName=Cluster0';
console.log(dbURI);
mongoose.connect(dbURI)
.then((result) => {
    console.log('Connected to DB');
})
.catch((err) => {
    console.log(err);
});

const users = require('./models/users');

const newUser = new users({
    firstName: 'Sara',
    lastName: 'Paananen',
    email: 'sara1812@student.hamk.fi',
    phoneNumber: '0400235027'
});

newUser.save();


/*
let users =
[
{
    id: 1,
    firstName: 'Brian',
    lastName: 'Reinhardt',
    email: 'brian1972@gmail.com',
    phoneNumber: '+358040009328'
},
{
    id: 2,
    firstName: 'Koli',
    lastName: 'Bootmaker',
    email: 'kolib@gmail.com',
    phoneNumber: '+35804008299'
},
{
    id: 3,
    firstName: 'Malong',
    lastName: 'Dig',
    email: 'malongdig@mail.com',
    phoneNumber: '+358042309810'
},
{
    id: 4,
    firstName: 'Rosa',
    lastName: 'Acrey',
    email: 'rosa123@mail.com',
    phoneNumber: '+358042128394'
}
] */

// Main layout that we'll have for each page
app.engine('handlebars',exphbs.engine({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// Get main page
app.get('/', (req,res) => {
    res.render('index',
    {
        title:'Home',
        companyName: 'SSS'
    }
    );
});

// Get admin page
app.get('/admin', (req,res) => {
    res.render('admin',
    {
        title:'Admin',
        companyName: 'SSS',
        users: users
    }
    );
});









app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));