/**
*   Express Server
*   Developed by Murray O'Brien
*   ----------------------------------
*/
require('dotenv').config()
require('express-async-errors')

//Security 
const helmet = require('helmet');
const cors = require('cors')
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

//Express
const express = require("express")
const app = express(); 

//DB
const connectDB = require('./db/connect')

//Middleware
const notFoundMiddleware = require('./middleware/not-found')
app.use(express.static('./public'))
app.use(express.static('./public/src'))

app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimiter({ windowMs: 60 * 1000, max: 60 }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//Routes
const users = require("./routes/users")
app.use("/api/v1/users", users)

app.get("/landing", (req, res) => {
    res.sendFile(__dirname + "/public/src/landing/landing.html")
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/src/login/login.html")
})

app.get("/dashboard", (req, res) => {
    res.sendFile(__dirname + "/public/src/dashboard/dashboard.html")
})

app.use(notFoundMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`))
    }catch(err){
        console.log(err)
    }
}
start()

