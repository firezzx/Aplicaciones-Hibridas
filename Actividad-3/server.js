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

const productos = [
    { id: 1, nombre: "Chips Ahoy", precio: 350 },
    { id: 2, nombre: "Coca-Cola", precio: 200 },
    { id: 3, nombre: "Doritos Ranch", precio: 450 },
    { id: 4, nombre: "Red Bull", precio: 700 },
    { id: 5, nombre: "Kit Kat", precio: 300 },
    { id: 6, nombre: "Mars", precio: 280 },
    { id: 7, nombre: "Pringles", precio: 380 },
    { id: 8, nombre: "Twix", precio: 320 },
    { id: 9, nombre: "Skittles", precio: 180 },
    { id: 10, nombre: "Fanta", precio: 250 },
  ];
  
  //MOSTRAR POR ID
  app.get("/productos/:id", (req, res) => {
    const idProducto = parseInt(req.params.id);
    const producto = productos.find((p) => p.id === idProducto);
    if (producto) {
      res.send({ producto });
    } else {
      return res.status(404).send({ error: "Producto no encontrado" });
    }
  });
  
  //MINIMO - MAXIMO
  app.get("/productos", (req, res) => {
    const minimo = req.query.minimo;
    const maximo = req.query.maximo;
    let productosFiltrados = [...productos];
    if (minimo) {
      productosFiltrados = productosFiltrados.filter(
        (producto) => producto.precio >= minimo
      );
    }
    if (maximo) {
      productosFiltrados = productosFiltrados.filter(
        (producto) => producto.precio <= maximo
      );
    }
    res.send({ productosFiltrados });
  });
  

// NO FOUND!
app.use((req, res) => {
    res.status(404).send("<b>404 Pagina no encontrada</b><p>Esta pagina es como Zoro, se perdio :/</p>")
})

app.listen(2023, () => console.log("Server running on port 2023...\nopen in http://localhost:2023"));