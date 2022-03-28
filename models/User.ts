import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';

const UserSchema: Schema = new Schema(
    {
        email: { type: String, required: [true, 'Email requerido'] ,unique: true},
        password: { type: String, required: 'Password requerido.'},
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);