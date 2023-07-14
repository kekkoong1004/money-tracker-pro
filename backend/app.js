require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const cors = require('cors');
const dbConnect = require('./database/dbConnect');
const expenseRouter = require('./routes/expenseRoute');
const incomeRouter = require('./routes/incomeRoute');
const aggregateRouter = require('./routes/aggregateRoute');
const userRouter = require('./routes/userRoute');

const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json()); //Body parser
app.use(express.static(path.join(__dirname, '../fontend', 'dist')));
console.log(path.join(__dirname, '../frontend', 'dist'));
app.use('/api/v1/expense', expenseRouter);
app.use('/api/v1/income', incomeRouter);
app.use('/api/v1/aggregate', aggregateRouter);
app.use('/api/v1/user', userRouter);

const server = () => {
  dbConnect();
  app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
};

server();
