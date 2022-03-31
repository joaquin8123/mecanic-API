import { Request, Response, NextFunction } from 'express';
import Voucher from '../models/Voucher';
import logging from '../config/logging';
import Car from '../models/Car'
import ICar from '../interfaces/car';
import IService from '../interfaces/service';
import IVoucher from '../interfaces/voucher';


const NAMESPACE = 'Car Controller';

const create = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, `Create car Method`);
    try {
        const  { brand, model, year, patent, colour, clientId } = req.body;
        const car: ICar = new Car({
            brand,
            model,
            year,
            patent,
            colour,
            clientId
        })
        return car
            .save()
            .then((car: ICar) => res.status(201).json({ message: 'CREATE_CAR_SUCCESS', data: car }))
            .catch((error: Error) => res.status(400).json({ message: 'CREATE_CAR_ERROR', data: error }));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'CREATE_ERROR', data: error })
    }
};



const getAll = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'GetAllVehiculo Method');
    try {
        const cars: ICar[] = await Car.find()
        .populate('clientId', 'name lastName', 'Client')
        .exec()
        return res.status(200).json({ message: 'GET_ALL_SUCCESS', data: cars  })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'GET_CAR_ERROR', data: error  })
    }
};

const getById = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'GetVehiculoById Method');
    try {
        const carId: ICar['_id']  = req.params.id
        const car: ICar= await Car.findById(carId)
        .populate('clientId', 'name lastName', 'Client')
        .exec()
        if (!car) return res.status(400).json({ message: 'GET_CAR_UNEXIST' })
        return res.status(200).json({ message: 'GET_CAR_SUCCESS', data: car  })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'GET_CAR_ERROR', data: error  })
    }
};

const history = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'GetHistory Method');
    try {
        const carId  = req.params.id
        let serviceList:IService['_id'] = []
        const vouchers = await Voucher.find({
            where: {
               carId: carId
            }
        })
        vouchers.map(async(voucher:IVoucher) => {
            voucher.services.filter( (serviceId:IService['_id']) =>{
                serviceList.push(serviceId)
            })
        });
        return res.status(200).json({ message: 'GET_CAR_SUCCESS', serviceList })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'GET_CAR_ERROR', data: error  })
    }
};

const edit = async(req: Request, res: Response) => {
    logging.info(NAMESPACE, `Edit vehiculo`);
    try {
        const body = req.body;
        const carId: ICar['_id'] = req.params.id
        const car: ICar = await Car.findById(carId);

        if (!car) return res.status(400).json({ message: 'CAR_NOT_EXIST' });

        const carUpdated :ICar= await Car.findByIdAndUpdate(car, body, { new: true });
        if (!carUpdated) res.status(400).json({ message: 'UPDATE_CAR_ERROR' });
        return res.status(200).json({ message: 'UPDATE_CAR_SUCCESS', data: carUpdated });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'UPDATE_CAR_ERROR', data: error });
    }
    
};

const deleteCar = async(req: Request, res: Response) => {
    logging.info(NAMESPACE, `Eliminar vehiculo`);
    try {
        const carId: ICar['_id'] = req.params.id
        await Car.findByIdAndDelete(carId);
        return res.status(200).json({ message: 'DELETE_CAR_SUCCESS'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'DELETE_CAR_ERROR', data: error });
    }
};

export default {
    create,
    deleteCar,
    edit,
    getById,
    getAll,
    history
};