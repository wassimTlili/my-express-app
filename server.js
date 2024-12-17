const express = require('express');
const mongoose = require('mongoose');
//const dotenv = require("dotenv");

const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/CarRoutes');
const bookingRoutes = require('./routes/BookingRoutes');




const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/rentalCar')
.then(()=>console.log('connected'))
.catch(err => console.log(err));


app.use('/auth', authRoutes);

app.use('/api', carRoutes);
app.use('/api', bookingRoutes); 


const PORT = 5000 ;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

