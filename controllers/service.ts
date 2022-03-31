import { Request, Response, NextFunction } from 'express';
import IService from '../interfaces/service';
import logging from '../config/logging';
import Service from '../models/Service'
import sendResponse from '../helpers/buildResponse'

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
            .then((service: IService) => sendResponse(res,'CREATE_SERVICE_SUCCESS',201, service))
            .catch((error: Error) => sendResponse(res,'CREATE_SERVICE_ERROR',400, error));
    } catch (error) {
        console.error(error);
        return sendResponse(res,'CREATE_SERVICE_ERROR',500, error)
    }
};

const getAll = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'GetAllService Method');
    try {
        const services: IService[] = await Service.find()
        return sendResponse(res,'GET_SERVICES_SUCCESS',200, services)
    } catch (error) {
        console.error(error);
        return sendResponse(res,'GET_SERVICES_ERROR',500, error)
    }
};

export default {
    create,
    getAll
};