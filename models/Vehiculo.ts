import mongoose, { Schema } from 'mongoose';
import IVehiculo from '../interfaces/vehiculo';

const VehiculoSchema: Schema = new Schema(
    {
        marca: { type: String},
        modelo: { type: String},
        ano: { type: String},
        color: { type: String},
        patente: { type: String, unique: true},
        cliente: { type: Schema.Types.ObjectId, ref: 'cliente' },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IVehiculo>('Vehiculo', VehiculoSchema);