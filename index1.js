const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const app = express();

require('dotenv').config();
const dbURI ='mongodb+srv://'+process.env.DBUSERNAME+':'+process.env.DBPASSWORD+'@'+process.env.CLUSTER+'.mongodb.net/'+process.env.DB+'?retryWrites=true&w=majority&appName=Cluster0';
// console.log(dbURI);
 mongoose.connect(dbURI)

const users = require('./models/User');

/*
const newUser = new users({
    firstName: 'Sara',
    lastName: 'Paananen',
    email: 'sara1812@student.hamk.fi',
    phoneNumber: '0400235027'
});
newUser.save();
.then((result) => {
    console.log('Connected to DB');
})
.catch((err) => {
    console.log(err);
});
*/
/*
users.find()
.then((result) =>{
    console.log(result);
})
*/

const getAll = async () => {
    try {
        const results = await users.find();
        console.log(results);
    }
    catch(error){
        console.log(error);
    }
};

// getAll();



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
        users: users.map(doc => doc.toJSON())
    }
    );
});

// Get booking page
app.get('/booking', (req,res) => {
    res.render('booking',
    {
        title:'Booking',
        companyName: 'SSS'
    }
    );
});
// Route for creating the resourse
app.post('/users', (req,res) => {
    const user = new user(req.body);
    newUser.save();
    res.send('/thank-you');
});






app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));