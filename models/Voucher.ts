import mongoose, { Schema } from 'mongoose';

const ComprobanteSchema: Schema = new Schema(
    {
        fecha: {
            type: String
        },
        total: {
            type: Number
        },
        cliente: { type: Schema.Types.ObjectId, ref: 'clientes' },
        servicios: [{ type: Schema.Types.ObjectId, ref: 'servicios' }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Comprobantes', ComprobanteSchema);