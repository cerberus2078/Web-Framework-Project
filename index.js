const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// mongodb credentials
// const dbURI = 'mongodb+srv://'+process.env.DBUSERNAME+':'
// +process.env.DBPASSWORD+'@'+process.env.CLUSTER+'.mongodb.net/'
// +process.env.DB+'?retryWrites=true&w=majority';
