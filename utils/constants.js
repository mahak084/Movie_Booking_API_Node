const STATUS_CODES={
    OK:200,
    INTERNAL_SERVER_ERROR: 500,
    CREATED: 201,
    UNAUTORIZED: 401,
    NOT_FOUND:404,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    UNPROCESSABLE_ENTITY: 422,
    GONE: 410,
    PAYMENT_REQUIRED:401
}

const USER_STATUS={
    approved:"APPROVED",
    pending:"PENDING",
    rejected:"REJECTED"
}

const USER_ROLE={
    customer:"CUSTOMER",
    client:"CLIENT",
    admin:"ADMIN"
}

const BOOKING_STATUS={
    cancelled:"CANCELLED",
    successfull:"SUCCESSFULL",
    processing:"IN_PROCESS",
    expired:"EXPIRED"
}


const PAYMENT_STATUS = {
    failed: "FAILED",
    success: "SUCCESS",
    pending: "PENDING"
}

module.exports={STATUS:STATUS_CODES,USER_ROLE,USER_STATUS,BOOKING_STATUS,PAYMENT_STATUS};