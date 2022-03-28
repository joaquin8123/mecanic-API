import mongoose, { Schema } from 'mongoose';
import IServicio from '../interfaces/servicio';

const ServicioSchema: Schema = new Schema(
    {
        nombre: {
            type: String,
            required: 'Nombre requerido.'
        },
        precio: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IServicio>('Servicios', ServicioSchema);