const express = require('express');
const app = express();
require('./database/db');
require('dotenv').config();
const userroute = require("./routers/user_route");
const newsroute = require("./routers/news_route");
const morgan = require('morgan');

const port = process.env.PORT;
app.use(express.json());
app.use(morgan('dev'));

app.use(userroute);
app.use(newsroute);

app.listen(port, () => {
    console.log(`Server started on port` , port);
});