import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import Service from '../models/Service'

const NAMESPACE = 'Service Controller';

const create = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, `Create service Method`);
    try {
        const  { name, price } = req.body;
        const service = new Service({
            name,
            price
        })
        return service
            .save()
            .then((service) => res.status(201).json({ message: 'CREATE_SUCCESS', data: service }))
            .catch((error) => res.status(400).json({ message: 'CREATE_ERROR', data: error }));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'CREATE_ERROR', data: error })
    }
};


export default {
    create
};