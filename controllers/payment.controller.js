const paymentService = require('../services/payment.service');
const { BOOKING_STATUS, STATUS } = require('../utils/constants');
const { errorResponseBody, successResponseBody } = require('../utils/responsebody');
const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const Theatre = require('../models/theatre.model');

const create=async(req,res)=>{
    try{
        const response=await paymentService.createPayment(req.body);
        if(response.status==BOOKING_STATUS.expired){
            errorResponseBody.err='The payment took more than 5 min to get processed hence you are booking get expired'
            errorResponseBody.data=response;
            return res.status(STATUS.GONE).json(errorResponseBody);
        }
        if(response.status==BOOKING_STATUS.cancelled){
            errorResponseBody.err='Payment failed due to some reason'
            errorResponseBody.data=response;
            return res.status(STATUS.PAYMENT_REQUIRED).json(errorResponseBody);
        }
        successResponseBody.data=response;
        successResponseBody.message='Booking completed successfully'
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports={create};