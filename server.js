const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const helmet = require('helmet');
const compression = require('compression');

const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/doctor');

const homeRoute = require('./routes/homeRoute');
const addRoute = require('./routes/add');
const listRoute = require('./routes/observerListRoute');
const historyRoute = require('./routes/history');
const patientRoute = require('./routes/edit');
const searchRoute = require('./routes/search');
const authRoute = require('./routes/auth');
const registRoute = require('./routes/regist');

const keys = require('./keys/index');

const server = express();

const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGO_DATA_BASE
});

server.engine('hbs', hbs.engine);
server.set('view engine', 'hbs');
server.set('views');

server.use(express.static(path.join(__dirname, './public')));

server.use(express.urlencoded({ extended: true }));

server.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store 
}));

server.use(csrf());
server.use(flash());
server.use(helmet());
server.use(compression());
server.use(varMiddleware);
server.use(userMiddleware);
server.use(methodOverride("_method"));

server.use('/', homeRoute);
server.use('/list', listRoute);
server.use('/add', addRoute);
server.use('/history', historyRoute);
server.use('/edit', patientRoute);
server.use('/search', searchRoute);
server.use('/', authRoute);
server.use('/', registRoute);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await mongoose.connect(keys.MONGO_DATA_BASE, { useUnifiedTopology: true,useNewUrlParser: true });
        server.listen(PORT, () => {
            console.log(`Server is runnning on port: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();

