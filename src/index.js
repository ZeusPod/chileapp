const express = require('express');
const app = express();
const port = process.env.port || 3000;
const mongosee = require('mongoose');
require('dotenv').config();
const itemsRouter = require('./routes/items.js');
const biddingRouter = require('./routes/biddings.js');
const usersRouter = require('./routes/users.js');
const authRouter = require('./routes/auth.js');


//middleware
app.use(express.json());
app.use('/api/v1/items', itemsRouter);
app.use('/api/v1/biddings', biddingRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);



// mongo connection
mongosee.connect(
    process.env.MONGO_URI,
).then(() => {
    console.log('MongoDB conectado');
}).catch(err => {
    console.error(err);
});



app.listen(port, () => {
    console.log('Server is running on port: ', port);
});



