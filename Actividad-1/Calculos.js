// SUMA
const suma = (num1, num2) => {
    return num1 + num2;
}
console.log(suma(5,10));

// DIVISION
const div = (num1, num2) => {
    return num1 / num2;
}
console.log(div(20,2)); //Si divido 20/0, me sale como resultado Infinity

// ARRAY MAYOR
const arrayMayor = (array) => {
    const mayor = Math.max(...array);
    return mayor;
}
const numeros = [2,8,9,7,5,6];
console.log(arrayMayor(numeros));