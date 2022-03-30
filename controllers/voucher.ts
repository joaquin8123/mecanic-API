import { Request, Response, NextFunction } from 'express';
import Service from '../models/Service'
import logging from '../config/logging';
//import { getAmount } from '../helpers/getAmount'
import Car from '../models/Car'
import Voucher from '../models/Voucher'
import IVoucher from '../interfaces/voucher'
import moment from 'moment';

const NAMESPACE = 'Vehiculo Controller';

const create = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, `Crear vehiculo Method`);
    try {
        const  { carId, services } = req.body;
        let amount:number = 0
        const car = await Car.findById(carId)
        .populate('clientId', 'name lastName', 'Client')
        .exec()
        await Promise.all([...services.map(async(serviceId:any) => {
            const service = await Service.findById(serviceId)
            amount += service.price
        })]);
        const body = {
            date: moment(),
            clientId: car.clientId._id,
            amount: amount,
            car: car._id,
            services: services
        }
        const voucher = new Voucher(body)
            return voucher
                .save()
                .then((voucher:any) => res.status(201).json({ message: 'CREATE_SUCCESS', data: voucher }))
                .catch((error:any) => res.status(400).json({ message: 'CREATE_ERROR', data: error }));
        } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'CREATE_ERROR', data: error })
    }
};

export default {
    create
};