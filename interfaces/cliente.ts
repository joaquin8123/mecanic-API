import { Document } from 'mongoose';

export default interface ICliente extends Document {
    nombre: string;
    apellido: string;
}