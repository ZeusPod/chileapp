const express = require('express');
const app = express();
const port = process.env.port || 3000;
const mongosee = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/usersAuth.js');
const itemsRouter = require('./routes/items.js');
const biddingRouter = require('./routes/biddings.js');



//middleware
app.use(express.json());
app.use('/api/v1', userRouter);
app.use('/api/v1', itemsRouter);
app.use('/api/v1', biddingRouter);



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



