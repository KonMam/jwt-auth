import express from 'express'
import bodyParser from 'body-parser'

const PORT = 5000

const app = express()

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);

const auth_router = require('./src/routes/test.router')

app.use('/', auth_router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})