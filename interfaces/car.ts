import { Document } from 'mongoose';
import IClient from './client';

export default interface IVehiculo extends Document {
    marca: string;
    modelo: string;
    ano: string;
    color: string;
    patente: string;
    clientId: IClient['_id'];
}