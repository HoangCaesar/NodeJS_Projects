
const multipleMongooseToObject = (mongooseArray) => {
    return Array.isArray(mongooseArray) ? mongooseArray.map(mongoose => mongoose.toObject()) : mongooseArray;
}

const mongooseToObject = (mongoose) => {
    return mongoose ? mongooseArray.toObject() : mongoose;
}

export { multipleMongooseToObject, mongooseToObject };