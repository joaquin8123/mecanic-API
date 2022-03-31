const carErrorsMessages = {
    GET_CARS_SUCCESS: 'Cars successfully obtained.',
    GET_CARS_ERROR: `There was an error getting the cars.`,
    GET_CAR_UNEXIST: 'The car does not exist',
    GET_CAR_SUCCESS: 'Car successfully obtained.',
    CREATE_CAR_SUCCESS: 'Voucher created successfully.',
    CREATE_CAR_ERROR: 'An error occurred while creating the voucher',
    UPDATE_CAR_ERROR: 'An error occurred while updating the car',
    UPDATE_CAR_SUCCESS: 'the car was successfully upgraded',
    DELETE_CAR_SUCCESS: 'the car was successfully deleted',
    DELETE_CAR_ERROR: 'An error occurred while deleted the car',
    HISTORY_CAR_ERROR: 'An error occurred when fetching history',
    HISTORY_CAR_SUCCESS: 'History Car successfully obtained.',
};

const serviceErrorsMessages = {
    GET_SERVICES_SUCCESS: 'Services successfully obtained.',
    GET_SERVICES_ERROR: `There was an error getting the Services.`,
    CREATE_SERVICE_SUCCESS: 'Service created successfully.',
    CREATE_SERVICE_ERROR: 'An error occurred while creating the service',
};

const clientErrorsMessages = {
    GET_CLIENTS_SUCCESS: 'Clients successfully obtained.',
    GET_CLIENTS_ERROR: `There was an error getting the clients.`,
    CREATE_CLIENTS_SUCCESS: 'Client created successfully.',
    CREATE_CLIENTS_ERROR: 'An error occurred while creating the clients.',
};

const voucherErrorsMessages = {
    GET_VOUCHERS_SUCCESS: 'Vouchers successfully obtained.',
    GET_VOUCHERS_ERROR: `There was an error getting the vouchers.`,
    CREATE_VOUCHER_SUCCESS: 'Voucher created successfully.',
    CREATE_VOUCHER_ERROR: 'An error occurred while creating the voucher',
    CREATE_VOUCHER_COLOUR_ERROR: "It is not allowed to paint cars gray"
};

const responseMessages: any = {
    ...carErrorsMessages,
    ...serviceErrorsMessages,
    ...clientErrorsMessages,
    ...voucherErrorsMessages
};

const sendResponse = (res: any, msgKey: any, code: number, data: any = {}) => {
    return res?.status(code).json({
        msg: responseMessages[msgKey],
        data: data
    });
};

export default sendResponse;
