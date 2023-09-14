import express from 'express';

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let usuarios = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Arroyo",
    nombreUsuario: "firezx",
    email: "juan@gmail.com",
    edad: 21,
    cursos: ['DW', 'DM']
  },
  {
    id: 2,
    nombre: "Nam",
    apellido: "Kim",
    nombreUsuario: "rm",
    email: "nam@gmail.com",
    edad: 21,
    cursos: ['DG', 'DM']
  },
  {
    id: 3,
    nombre: "Lisa",
    apellido: "Manoban",
    nombreUsuario: "lalisa",
    email: "lisa@gmail.com",
    edad: 21,
    cursos: ['DW']
  },
  {
    id: 4,
    nombre: "Lionel",
    apellido: "Messi",
    nombreUsuario: "messi",
    email: "messi@gmail.com",
    edad: 21,
    cursos: ['DW', 'DG']
  },
];

let cursos = [
  {
    id: 1,
    nombre: "DW",
    docente: "Jose Roberto",
  },
  {
    id: 2,
    nombre: "DG",
    docente: "Manu Manitas",
  },
  {
    id: 3,
    nombre: "DM",
    docente: "Jenna Ortega",
  },
]

//RAIZ (/)
app.get('/', (req, res) => {
  const htmlContent = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Actividad-4</title>
  </head>
  <body>
      <h1>Actividad - 4</h1>
      <a href="http://localhost:2023/usuarios">Ver todos los usuarios</a>
      <a href="http://localhost:2023/cursos">Ver todos los cursos</a>
  </body>
  </html>`;
  res.send(htmlContent)
})

//VER TODOS LOS USUARIOS
app.get('/usuarios', (req, res) => {
  res.json(usuarios)
})

//VER USUARIO PARTICULAR (por id)
app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);
  if(!usuario){
    return res.status(404).json({message: "Usuario no encontrado"})
  }
  res.json(usuario)
})

//EDITAR USUARIO
app.patch('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updateFields = req.body;
  const index = usuarios.findIndex((u) => u.id === id);
  if (index === -1){
    return res.status(404).json({message: "Usuario no encontrado"})
  }
  usuarios[index] = {...usuarios[index], ...updateFields}
  res.json(usuarios[index])
})

//CREAR USUARIO
app.post('/usuarios', (req, res) => {
  const newUsuario = req.body;
  usuarios.push(newUsuario);
  res.status(201).json(newUsuario)
})

//ELIMINAR USUARIO
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex((u) => u.id === id);
  if(index === -1){
    return res.status(404).json({message: "Usuario no eoncontrado"})
  }
  const deletedUsuario = usuarios.splice(index, 1);
  res.json(deletedUsuario);
})

//VER TODOS LOS CURSOS
app.get('/cursos', (req, res) => {
  res.json(cursos)
})

//VER CURSO PARTICULAR (por id)
app.get('/cursos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const curso = cursos.find((u) => u.id === id);
  if(!curso){
    return res.status(404).json({message: "Curso no encontrado"})
  }
  res.json(curso)
})

//EDITAR CURSO
app.patch('/cursos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updateFields = req.body;
  const index = cursos.findIndex((u) => u.id === id);
  if (index === -1){
    return res.status(404).json({message: "Curso no encontrado"})
  }
  cursos[index] = {...cursos[index], ...updateFields}
  res.json(cursos[index])
})

//CREAR CURSO
app.post('/cursos', (req, res) => {
  const newCurso = req.body;
  cursos.push(newCurso);
  res.status(201).json(newCurso)
})

//ELIMINAR CURSO
app.delete('/cursos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = cursos.findIndex((u) => u.id === id);
  if(index === -1){
    return res.status(404).json({message: "Curso no eoncontrado"})
  }
  const deletedCurso = cursos.splice(index, 1);
  res.json(deletedCurso);
})

//BUSCAR POR CURSO (NO FUNCIONA :C)
// app.get('/cursos', (req, res) => {
//   const nombreCurso = req.query.curso;
//   let cursoFiltrado = null;
//   if (nombreCurso) {
//     cursoFiltrado = cursos.find((curso) => curso.nombre === nombreCurso);
//   }
//   res.send({ curso: cursoFiltrado });
// });


// NO FOUND!
app.use((req, res) => {
    res.status(404).send("<b>404 Pagina no encontrada</b><p>Esta pagina es como Zoro, se perdio :/</p>")
})

app.listen(2023, () => console.log("Server running on port 2023...\nopen in http://localhost:2023"));