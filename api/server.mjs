import express from 'express';
import userRouter from './routes/users.mjs';
import cors from 'cors';
import db from './database.mjs';
import 'dotenv/config' 
import path from 'path'
// import axios from 'axios'
// import http from 'http'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json())

app.use(cors())

db.connect()
app.use('/users', userRouter)

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    console.log(err)
    res.status(err.status || 500);
    return res.json({
      message: err.message,
      error: err
    });
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("../build"));
    app.get('/*', (req, res) => {
    console.log(path)
    console.log('path!!!!')
      console.log(__dirname)
      console.log(__filename)
    res.sendFile(path.join(__dirname, '../build/index.html'), (err) => {
      if (err) {
        res.status(500).send(__dirname)
      }
    })
  })
  }


  const server = app.listen(5000, () => {console.log('server is running on port 5000')})