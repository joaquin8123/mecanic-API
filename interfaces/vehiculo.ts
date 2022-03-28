import { Document } from 'mongoose';
import ICliente from './cliente';

export default interface IVehiculo extends Document {
    marca: string;
    modelo: string;
    ano: string;
    color: string;
    patente: string;
    cliente: ICliente['_id'];
}