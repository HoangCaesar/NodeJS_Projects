import Course from '../models/Course';

class CourseController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({})

        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            });
        };

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedcount]) =>
                res.render('me/storedCourses', {
                    deletedcount,
                    courses
                }),
            )
            .catch(next);
    }
    // [DELETE] /me/bin/courses
    binCourses(req, res, next) {
        Course.findDeleted({})
            .lean()
            .then((courses) => res.render('me/binCourses', { courses }))
            .catch(next)
    }
}

// module.exports = new CourseController;
export default new CourseController;