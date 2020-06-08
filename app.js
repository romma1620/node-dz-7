const express = require('express');

const db = require('./dataBase').getInstance()
db.setModels();

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const {authRouter ,userRouter} = require('./routes');


app.use('/auth', authRouter)
app.use('/users', userRouter);

app.use('*', (err, req, res, next) => {
    let message = err.message;

    if (err.parent){
        message = err.parent.sqlMessage;
    }

    res
        .status(err.status || 400)
        .json({
            message: err.message,
            code: err.customCode
        })
})

app.listen(1616, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Listen 1616...');
    }
})

process.on("unhandledRejection", reason => {
    console.log('Unhandled error');

    process.exit(0);
})
