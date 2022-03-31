import { Request, Response, NextFunction } from 'express';
import Voucher from '../models/Voucher';
import logging from '../config/logging';
import Car from '../models/Car'
import ICar from '../interfaces/car';
import IService from '../interfaces/service';
import IVoucher from '../interfaces/voucher';
import sendResponse from '../helpers/buildResponse'

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
            .then((car) => sendResponse(res,'CREATE_CAR_SUCCESS',201,car))
            .catch((error) => sendResponse(res,'CREATE_CAR_ERROR',400, error));
    } catch (error) {
        console.error(error);
        return sendResponse(res,'CREATE_CAR_ERROR',500, error)
    }
};



const getAll = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'GetAllVehiculo Method');
    try {
        const cars: ICar[] = await Car.find()
        .populate('clientId', 'name lastName', 'Client')
        .exec()
        return sendResponse(res,'GET_CARS_SUCCESS',200, cars)
    } catch (error) {
        console.error(error);
        return sendResponse(res,'GET_CARS_ERROR',500, error)
    }
};

const getById = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'GetVehiculoById Method');
    try {
        const carId: ICar['_id']  = req.params.id
        const car: ICar= await Car.findById(carId)
        .populate('clientId', 'name lastName', 'Client')
        .exec()
        if (!car) sendResponse(res,'GET_CAR_UNEXIST',400)
        return sendResponse(res,'GET_CAR_SUCCESS',200, car)
    } catch (error) {
        console.error(error);
        return sendResponse(res,'GET_CARS_ERROR',500, error)
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
        return sendResponse(res,'HISTORY_CAR_SUCCESS',200, serviceList)
    } catch (error) {
        console.error(error);
        return sendResponse(res,'HISTORY_CAR_ERROR',500, error)
    }
};

const edit = async(req: Request, res: Response) => {
    logging.info(NAMESPACE, `Edit vehiculo`);
    try {
        const body = req.body;
        const carId: ICar['_id'] = req.params.id
        const car: ICar = await Car.findById(carId);

        if (!car) return sendResponse(res,'GET_CAR_UNEXIST',400)

        const carUpdated :ICar= await Car.findByIdAndUpdate(car, body, { new: true });
        if (!carUpdated) sendResponse(res,'UPDATE_CAR_ERROR',400)
        return sendResponse(res,'UPDATE_CAR_SUCCESS', 400, carUpdated)

    } catch (error) {
        console.error(error);
        return sendResponse(res,'UPDATE_CAR_ERROR', 500, error)
    }
    
};

const deleteCar = async(req: Request, res: Response) => {
    logging.info(NAMESPACE, `Eliminar vehiculo`);
    try {
        const carId: ICar['_id'] = req.params.id
        await Car.findByIdAndDelete(carId);
        return sendResponse(res,'DELETE_CAR_SUCCESS', 200)
    } catch (error) {
        console.error(error);
        return sendResponse(res,'DELETE_CAR_ERROR', 500, error)
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