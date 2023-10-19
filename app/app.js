import express from 'express';
import mongoose from 'mongoose';
import users from './routes/users.js';
import agents from './routes/agents.js';
import auth from './routes/auth.js';
import 'dotenv/config';

//Configuracion DB.
mongoose
    .connect('mongodb://localhost:27017/arroyo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Conectado con la DB!')
    })
    .catch(() => {
        console.warn('Error al conectar con la DB!')
    });

//Configuracion inicial.
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', users);
app.use('/agents', agents);
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.send('Bienvenido')
})

//Iniciar el servidor.
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`
    ──────▄▀▄─────▄▀▄
    ─────▄█░░▀▀▀▀▀░░█▄
    ─▄▄──█░░░░░░░░░░░█──▄▄
    █▄▄█─█░░▀░░┬░░▀░░█─█▄▄█`);
    console.log(`Servidor vivo en el puerto ${port}.\n> http://localhost:3000`)
})

//>>>> NO LLEGUE CON EL PAGINADO :c <<<<<//