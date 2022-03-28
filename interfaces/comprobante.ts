import { Document } from 'mongoose';
import ICliente from './cliente';
import IServicio from './servicio';

export default interface IVehiculo extends Document {
    fecha: Date;
    total: number;
    cliente: ICliente['_id'];
    servicios?: [IServicio['_id']] | any;
}