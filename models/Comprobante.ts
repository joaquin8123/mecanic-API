import mongoose, { Schema } from 'mongoose';

const ComprobanteSchema: Schema = new Schema(
    {
        fecha: {
            type: String
        },
        total: {
            type: Number
        },
        cliente: { type: Schema.Types.ObjectId, ref: 'cliente' },
        servicios: [{ type: Schema.Types.ObjectId, ref: 'servicio' }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Comprobantes', ComprobanteSchema);