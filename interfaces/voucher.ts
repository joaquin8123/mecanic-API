import { Document } from 'mongoose';
import IClient from './client';
import IService from './service';

export default interface IVehiculo extends Document {
    fecha: Date;
    total: number;
    cliente: IClient['_id'];
    servicios?: [IService['_id']] | any;
}