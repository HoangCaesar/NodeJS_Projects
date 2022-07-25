import mongoose from 'mongoose';

async function connectDb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/f8_education_dev');
        console.log('Connect Successfully!');
    } catch (err) {
        console.log('Connect Failure!');
    }
}

export { connectDb };