const Payment=require('../models/payment.model');
const Booking=require('../models/booking.model');
const User=require('../models/user.model');
const {STATUS,BOOKING_STATUS, PAYMENT_STATUS, USER_ROLE}=require('../utils/constants')


const createPayment=async(data)=>{
    try{
        const booking=await Booking.findById(data.bookingId);
        if(!booking){
            throw{
                err:'No booking found',
                code:STATUS.NOT_FOUND
            }
        }
        if(booking.status=BOOKING_STATUS.successfull){
            throw{
                err:'Booking already done',
                code:STATUS.FORBIDDEN
            }
        }
        let bookingTime=booking.createdAt;
        let currentTime=Date.now();
        //calculate min remaining
        let minutes=Math.floor(((currentTime-bookingTime)/1000)/60);
        if(minutes>5){
            booking.status=BOOKING_STATUS.expired;
            await booking.save();
            return booking;
        }
        if(payment.amount!=booking.totalCost){
            payment.status=PAYMENT_STATUS.failed;
            await payment.save();
        }
        const payment=await Payment.create({
            bookingId:data.bookingId,
            amount:data.amount
        });
        if(!payment || payment.status==PAYMENT_STATUS.failed){
            booking.status=BOOKING_STATUS.cancelled;
            await booking.save();
            await payment.save();
            return booking
        }
        payment.status=PAYMENT_STATUS.success;
        booking.status=BOOKING_STATUS.successfull;
        await booking.save();
        await payment.save();
        return booking;
    }
    catch(error){
       throw error
    }

}

const getPaymentById=async(id)=>{
    try{
        const response=await Payment.findById(id).populate('bookingId');
        if(!response){
            throw{
                err:'No payment record found',
                code:STATUS.NOT_FOUND
            }
        }
    }
    catch(error){
        throw error
    }
}

const getAllPayments=async(userId)=>{
    try{
        const response=await User.findById(userId);
        let filter={};
        if(user.userRole!=USER_ROLE.admin){
            filter.userId=user.id;
        }
        const bookings=await Booking.find(filter,'id');
        const payments = await Payment.find({booking: {$in: bookings}});
        return payments;
    }
    catch(error){
        throw error;
    }
}

module.exports={createPayment,getPaymentById,getAllPayments};