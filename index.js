//Dependencies
const morgan = require('morgan')
const express = require('express')
const app = express()
//Routers
const pokemon = require('./routes/pokemon')
const usuario = require('./routes/usuario')
//Middleware
const auth = require('./middleware/auth')
const notFound = require('./middleware/notFound')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.get("/", (req, res, next)=>{
    return res.status(200).json({code: 1, messsage: "Bienvenido al Pokedex"})
})

app.use("/usuario", usuario)
app.use(auth)
app.use("/pokemon", pokemon )
app.use(notFound)

app.listen(process.env.PORT||3000, () => {
    console.log("Server is running...")
})