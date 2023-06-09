import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    online: {type: Boolean, default: false}
});

studentSchema.methods.toResponse = function toResponse() {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
        online: this.online,
    };
};

export const Student = mongoose.model('Student', studentSchema);



