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
    res.send(`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Arroyo Juan</title>
  </head>
  <body>
    <div style="display:flex; margin: 30px;">
      <div>
        <h1>Agentes de Valorant</h1>
        <p>Api que muestra, graba, actualiza, y elimina usuarios y agentes.</p>
        <div>
            <h4>USUARIOS</h4>
            <p>/users/:id</p>
            <p>/users/:name</p>
            <p>/users/sort/sort-by-email</p>
            <a href="/users">Ver lista de usuarios</a>
        </div>
        <div>
            <h4>AGENTES</h4>
            <p>/agents/:id</p>
            <p>/agents/:name</p>
            <p>/users/sort/sort-by-email</p>
            <a href="/agents">Ver lista de agentes</a>
        </div>
      </div>
    </div>
    <footer>
        <ul style="display:flex;">
            <li style="list-style:none; margin-left:1em;">Developer: Arroyo Juan</li>
            <li style="list-style:none; margin-left:1em;">Materia: Aplicaciones Híbridas</li>
            <li style="list-style:none; margin-left:1em;">Docente: Camila Marcos Galbán</li>
            <li style="list-style:none; margin-left:1em;">Curso: DWN4AP 2023</li>
        </ul>
    </footer>
    <script type="module" src="app.js"></script>
  </body>
</html>
`)
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

//>>>> GRACIAS POR VER <<<<<//
