const express = require('express')
const app = express()
const {pokemon} = require('./pokedex.json')
/**
 * Verbos HTTP
 * GET --> Obtener recursos
 * POST --> Almacenar recursos
 * PATCH --> Modificar una parte de un recurso
 * PUT --> Modificar un recurso
 * DELETE -> Eliminar recursos  
 */

app.get("/", (req, res, next)=>{
    return res.status(200).send("Bienvenido al Pokedex")
})

app.get('/pokemon', (req, res, next) => {
    return res.status(200).send(pokemon)
})

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) =>{
    const id = req.params.id - 1

    return (id >= 0 && id <= 150) ?
        res.status(200).send(pokemon[id]) :
        res.status(404).send("Pokemon no encontrado")
    
})

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) =>{
    const name = req.params.name

    /*for(i = 0; i < pokemon.length; i++){
        if(pokemon[i].name.toUpperCase() == name.toUpperCase()){
            return res.status(200).send(pokemon[i])
        }
    }
    return res.status(404).send("Pokemon no encontrado")
    */

    const pk = pokemon.filter((p) =>{
        return (p.name.toUpperCase() == name.toUpperCase()) ?
            p :
            null
    })

     return (pk.length > 0) ?
        res.status(200).send(pk) :
        res.status(404).send("Pokemon no encontrado")
})

app.listen(process.env.PORT||3000, () => {
    console.log("Server is running...")
})