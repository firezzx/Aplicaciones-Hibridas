//FUNCION IMPORTADA DESDE ESM
import("./main.mjs").then(({multiplicar}) => {
    console.log(multiplicar(3))
})

//EXPORTAR UNA FUNCION A ESM
module.exports = function parImpar(numero) {
    return numero % 2 === 0 ? 'Par' : 'Impar';
};