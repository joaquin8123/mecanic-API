import { Document } from 'mongoose';

export default interface IServicio extends Document {
    nombre: string;
    precio: number;
}