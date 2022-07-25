// import mongoose from 'mongoose';
// import courseSchema from "../models/Course";
// const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/f8_academy_dev');
// const Course = conn.model('Course', courseSchema);
import Course from '../models/Course';
// import { multipleMongooseToObject } from '../../utils/mongoose';

class SiteController {

    // [GET] /
    home(req, res, next) {
        // res.render('home');
        // Course.find({}, function (err, courses) {
        //     if (!err) 
        //         res.json(courses);
        //         // return;
        //     else {
        //         next(err)
        //         // return;
        //     }
        // });
        Course.find({})
            .lean()
            .then(courses => {
                // courses = courses.map(course => course.toObject());
                // res.render('home', { courses: multipleMongooseToObject(courses) });
                res.render('home', { courses })
                
            })
            .catch(next)
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

export default new SiteController;