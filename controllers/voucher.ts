import { Request, Response, NextFunction } from 'express';
import Service from '../models/Service'
import logging from '../config/logging';
import Car from '../models/Car'
import Voucher from '../models/Voucher'
import IVoucher from '../interfaces/voucher'
import moment from 'moment';
import ICar from '../interfaces/car';
import sendResponse from '../helpers/buildResponse'
import IService from '../interfaces/service'

const NAMESPACE = 'Voucher Controller';

const create = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, `Crear vehiculo Method`);
    try {
        const  { carId, services } = req.body;
        let amount:number = 0
        const car: ICar = await Car.findById(carId)
        .populate('clientId', 'name lastName', 'Client')
        .exec()
        await Promise.all([...services.map(async(serviceId: IService['_id']) => {
            const service: IService = await Service.findById(serviceId)
            amount += service.price
        })]);

        const body = {
            date: moment(),
            clientId: car.clientId._id,
            amount: amount,
            car: car._id,
            services: services
        }
        const voucher: IVoucher = new Voucher(body)
            return voucher
                .save()
                .then((voucher) => sendResponse(res,'CREATE_VOUCHER_SUCCESS',201, voucher))
                .catch((error) => sendResponse(res,'CREATE_VOUCHER_ERROR',400, error));
        } catch (error) {
            console.error(error);
            return sendResponse(res,'CREATE_VOUCHER_ERROR',500, error)
        }
};

const getAll = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'GetAllVoucher Method');
    try {
        const vouchers: IVoucher[] = await Voucher.find()
        return sendResponse(res,'GET_VOUCHERS_SUCCESS',200, vouchers)
    } catch (error) {
        console.error(error);
        return sendResponse(res,'GET_VOUCHERS_ERROR',500, error)
    }
};

export default {
    create,
    getAll
};