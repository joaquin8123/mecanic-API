import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import Car from '../models/Car'

const NAMESPACE = 'Vehiculo Controller';

const create = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, `Crear vehiculo Method`);
    try {
        const  { marca, modelo, ano, patente, color, clienteId } = req.body;
        // const vehiculo = new Vehiculo({
        //     marca,
        //     modelo,
        //     ano,
        //     patente,
        //     color,
        //     clienteId
        // })
        // return vehiculo
        //     .save()
        //     .then((vehiculo) => res.status(201).json({ message: 'CREATE_SUCCESS', data: vehiculo }))
        //     .catch((error) => res.status(400).json({ message: 'CREATE_ERROR', data: error }));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'CREATE_ERROR', data: error })
    }
};

export default {
    create,
};