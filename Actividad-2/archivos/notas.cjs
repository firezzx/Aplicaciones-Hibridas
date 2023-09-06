const fs = require('fs');
const path = require('path');

//LEER EL ARCHIVO "NOTAS.TXT"
const fileFs = fs.readFileSync("./notas.txt", "utf-8");
console.log(fileFs)

//CREAR EL PATH DEL ARCHIVO "INFO.TXT"
const filePath = path.join(__dirname, 'info.txt');

//OBTENER INFO DEL SISTEMA OPERATIVO
const osInfo = `Sistema Operativo: ${process.platform}\nArquitectura del Sistema: ${process.arch}\n`;

//ESCRIBIR LA INFORMACION ANTERIOR EN EL ARCHIVO "INFO.TXT"
fs.writeFile(filePath, osInfo, 'utf8', (err) => {
  if (err) {
    console.error('Error al escribir en el archivo "info.txt":', err);
  } else {
    console.log('Información escrita en "info.txt":', osInfo);
  }
});

//NOMBRE Y MENSAJE
const nombre = 'JUAN ALEJANDRO';
const mensaje = 'ES DE MI DESAGRADO INFORMARLES QUE HOY NO ES JUEVES DE JUJUTSU KAISEN U.U';

//NOMBRE Y MENSAJE PARA ENVIAR
const contenido = `Nombre: ${nombre}\nMensaje: ${mensaje}\n`;

//AGREGAR LO ULTIMO AL ARCHIVO "INFO.TXT"
fs.appendFile(filePath, contenido, 'utf8', (err) => {
    if (err) {
      console.error('Error al agregar contenido a "info.txt":', err);
    } else {
      console.log('Contenido agregado a "info.txt":', contenido);
    }
  });
