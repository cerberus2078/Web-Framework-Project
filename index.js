const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// mongodb credentials
const dbURI = 'mongodb+srv://'+process.env.DBUSERNAME+':'
+process.env.DBPASSWORD+'@'+process.env.CLUSTER+'.mongodb.net/'
+process.env.DB+'?retryWrites=true&w=majority';


mongoose.connect(dbURI)
.then((result) => 
{
    console.log('Connected to DB');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log("Listening on " + PORT));
})
.catch((err) => {
    console.log(err);
})