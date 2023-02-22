const newsRouter = require('./news');
const siteRouter = require('./site');
const meRouter = require('./me');
const courseRouter = require('./courses');
const userRouter = require('./user');
const cartRouter = require('./cart');

function route(app) {
    app.use('/cart', cartRouter);
    app.use('/news', newsRouter);
    app.use('/courses', courseRouter);
    app.use('/me', meRouter);
    app.use('/user',userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
