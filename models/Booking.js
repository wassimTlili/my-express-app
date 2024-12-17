const mongoose = require ('mongoose')


const bookingSchema = new mongoose.Schema({
    bookingId:{
        type: String,
        required: true,
        unique: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    carId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Car',
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'booked'
    }

})

const booking = mongoose.model('Booking',bookingSchema)


module.exports = booking;