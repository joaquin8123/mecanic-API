import { Request, Response, NextFunction } from 'express';
import Service from '../models/Service'
import logging from '../config/logging';
import { getAmount } from '../helpers/getAmount'
import Car from '../models/Car'
import Voucher from '../models/Voucher'
import IVoucher from '../interfaces/voucher'
import moment from 'moment';
import ICar from '../interfaces/car';
import IService from '../interfaces/service';

const NAMESPACE = 'Voucher Controller';

const create = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, `Crear vehiculo Method`);
    try {
        const  { carId, services } = req.body;
        let amount:number = 0
        const car: ICar = await Car.findById(carId)
        .populate('clientId', 'name lastName', 'Client')
        .exec()
        amount = await getAmount(services)
        const body = {
            date: moment(),
            clientId: car.clientId._id,
            amount: amount,
            car: car._id,
            services: services
        }
        // const voucher: IVoucher = new Voucher(body)
        //     return voucher
        //         .save()
        //         .then((voucher) => res.status(201).json({ message: 'CREATE_SUCCESS', data: voucher }))
        //         .catch((error) => res.status(400).json({ message: 'CREATE_ERROR', data: error }));
        } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'CREATE_ERROR', data: error })
    }
};

const getAll = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'GetAllVoucher Method');
    try {
        const vouchers: IVoucher[] = await Voucher.find()
        return res.status(200).json({ message: 'GET_ALL_SUCCESS', data: vouchers  })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'GET_CAR_ERROR', data: error  })
    }
};

export default {
    create,
    getAll
};