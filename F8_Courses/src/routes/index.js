import coursesRouter from './courses';
import siteRouter from './site';
import meRouter from './me';

function route(app) {
    app.use('/courses', coursesRouter);

    app.use('/me', meRouter);

    app.use('/', siteRouter);
}

export default route;