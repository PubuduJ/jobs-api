require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const express = require('express');
const app = express();
const connectDB = require("./db/connect");

const authRouter = require("./routes/authRouter");
const jobsRouter = require("./routes/jobRouter");

const notFoundMiddleware = require('./middlewares/notFoundMiddleware');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const authenticationMiddleware = require("./middlewares/authenticationMiddleware");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use(authenticationMiddleware);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB();
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start().then(r => {});