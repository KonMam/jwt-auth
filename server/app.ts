import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { appDataSource } from './src/data-source'

const PORT = 5000

dotenv.config({path: '../.env'});

appDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!")
    }).catch((err) => {
    console.error("Error during Data Source initialization:", err)
})

console.log(process.env.PGHOST)

const app = express()

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);
app.use(cookieParser())

app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true}))

const auth_router = require('./src/routes/auth.router')
const task_router = require('./src/routes/task.router')

app.use('/', auth_router)
app.use('/tasks', task_router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})