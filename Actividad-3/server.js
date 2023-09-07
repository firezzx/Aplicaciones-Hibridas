import express from 'express';

const app = express();
const tecnoArr = ["html", "css", "js", "bootstrap", "vue"];

//  "/"
app.get("/", (req, res) => {
    res.send("<p><b>Nombre: </b>Juan Alejandro</p><p><b>Apellido: </b>Arroyo Fernandez</p>");
})

//  "/materia"
app.get("/materia", (req, res) => {
    res.send("<p><b>Materia: </b>Aplicaciones Hibridas ♥</p>");
})

//  "/profesor"
app.get("/profesor", (req, res) => {
    res.send("<p><b>Docente: </b>Camila Belen Marcos Galban</p>");
})

// "/stack"
app.get("/stack/:tecnologia", (req, res) => {
    let tecnologia = req.params.tecnologia;
    if (!tecnoArr.includes(tecnologia)) {
        return res.send("a leer la documentación entonces...");
    } else {
        return res.send("¿Dónde te dejo el CV?");
    }
});


// NO FOUND!
app.use((req, res) => {
    res.status(404).send("<b>404 Pagina no encontrada</b><p>Esta pagina es como Zoro, se perdio :/</p>")
})

app.listen(2023, () => console.log("Server running on port 2023...\nopen in http://localhost:2023"));