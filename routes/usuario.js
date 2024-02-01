const express = require('express')
const jwt = require('jsonwebtoken')
const usuario = express.Router()
const db = require('../config/database')

usuario.post("/signin", async (req, res, next) =>{
    const {user_name, user_mail, user_password} = req.body

    if(user_name && user_mail && user_password){
        let query = "INSERT INTO usuario(user_name, user_mail, user_password)"
        query += `VALUE ('${user_name}','${user_mail}','${user_password}')`

        const rows = await db.query(query)

        return (rows.affectedRows == 1) ?
            res.status(201).json({code: 201, message: "Usuario registrado correctamente"}) :
            res.status(500).json({code: 500, message: "Ocurrio un error"})
    }
    return res.status(500).json({code: 500, message: "Datos incompletos"})
})

usuario.post("/login", async (req, res, next) =>{
    const {user_mail, user_password} = req.body
    const query = `SELECT * FROM usuario
                    WHERE user_mail = '${user_mail}'
                    AND user_password = '${user_password}';`
    const rows = await db.query(query)

    if(user_mail && user_password){
        if(rows.length == 1){
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey")
            return res.status(200).json({code:200, message:token}) 
        }else{
            return res.status(401).json({code:401, message:"Usuario y/o contraseña incorrectos"})
        }
            
    }
    return res.status(500).json({code:500, message:"Campos incompletos"})

})

usuario.get("/", async (req, res, next) =>{
    const query = "SELECT * FROM usuario"
    const rows = await db.query(query)

    return res.status(200).json({code: 200, message: rows})
})

module.exports = usuario