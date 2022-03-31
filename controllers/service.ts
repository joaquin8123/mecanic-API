import { Request, Response, NextFunction } from 'express';
import IService from '../interfaces/service';
import logging from '../config/logging';
import Service from '../models/Service'

const NAMESPACE = 'Service Controller';

const create = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, `Create service Method`);
    try {
        const  { name, price } = req.body;
        const service: IService = new Service({
            name,
            price
        })
        return service
            .save()
            .then((service: IService) => res.status(201).json({ message: 'CREATE_SUCCESS', data: service }))
            .catch((error: Error) => res.status(400).json({ message: 'CREATE_ERROR', data: error }));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'CREATE_ERROR', data: error })
    }
};

const getAll = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'GetAllService Method');
    try {
        const services: IService[] = await Service.find()
        return res.status(200).json({ message: 'GET_ALL_SUCCESS', data: services  })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'GET_CAR_ERROR', data: error  })
    }
};

export default {
    create,
    getAll
};