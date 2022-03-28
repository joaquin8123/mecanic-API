import mongoose, { Schema } from 'mongoose';
import ICliente from '../interfaces/cliente'; 

const ClienteSchema: Schema = new Schema(
    {
        nombre: {
            type: String,
            required: 'Nombre requerido.'
        },
        apellido: {
            type: String,
            required: 'Apellido requerido.'
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ICliente>('Cliente', ClienteSchema);