import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
import mongooseDelete from 'mongoose-delete';
// import AutoIncrementFactory   from 'mongoose-sequence';

// const AutoIncrement =  AutoIncrementFactory(mongoose);

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    // _id: { type: Number },
    name: { type: String },
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    level: { type: String },
    videoId: { type: String, require: true },
    deletedAt: { type: Date }
}, {
    // _id: true,
    timestamps: true,
});

// Add Plugin
mongoose.plugin(slug);
courseSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
// courseSchema.plugin(AutoIncrement);

const Course = mongoose.model('Course', courseSchema);

export default Course;