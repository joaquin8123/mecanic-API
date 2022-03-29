import mongoose, { Schema } from 'mongoose';
import IVehiculo from '../interfaces/car';

const VehiculoSchema: Schema = new Schema(
    {
        marca: { type: String},
        modelo: { type: String},
        ano: { type: String},
        color: { type: String},
        patente: { type: String, unique: true},
        clienteId: { type: Schema.Types.ObjectId, ref: 'clientes' },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IVehiculo>('Vehiculo', VehiculoSchema);