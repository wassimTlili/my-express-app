const mongoose = require('mongoose');

const CarShema = new mongoose.Schema({
    carId:{
        type:String,
        required:true,
        unique:true
    },
    make:{
        type:String,
        required:true,
     },
     model:{
        type:String,
        required:true,
     },
     year:{
        type:String,
        required:true,
     },
     status:{
        type:String,
        required:true,
        default : 'available'
     },
    image:{
        type:String,
        required:true,
    },
})


const Car = mongoose.model('Car',CarShema)

module.exports = Car;
