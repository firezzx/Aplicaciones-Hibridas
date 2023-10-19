import express from 'express';
import User from '../models/users_models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const route = express.Router();

route.post('/', (req, res) => {
    User.findOne({email: req.body.email})
    .then(data => {
        if(data) {
            const passValid = bcrypt.compareSync(req.body.password, data.password);
            if (!passValid) return res.status(400).json({msj: "Contraseña incorrecta!"})
            // res.json({data})
        const jwToken = jwt.sign({
            user: {_id: data._id, name: data.name, email: data.email}
        }, process.env.SEED, {expiresIn: process.env.EXPIRATION})
        res.json({
            user:{
                _id: data._id, 
                nombre: data.nombre, 
                email: data.email
            },
            jwToken
        })
        } else {
            res.status(400).json({
                msj: "Email incorrecto!"
            })
        }
    }).catch(err => {
        res.status(400).json({
            msj: "Error del servicio!"
        })
    })
})

export default route;