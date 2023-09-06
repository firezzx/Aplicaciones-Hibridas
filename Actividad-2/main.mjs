//EXPORTAR FUNCION A COMMON JS
export function multiplicar(numero){
    let tabla = '';
    for (let i = 1; i <= 12; i++) {
        tabla += `${numero} x ${i} = ${numero * i}\n`;
    }
    return tabla;
}

//FUNCION IMPORTADA DESDE COMMON JS
import parImpar from "./main.cjs";
console.log(`El número es ${parImpar(2)}`);
