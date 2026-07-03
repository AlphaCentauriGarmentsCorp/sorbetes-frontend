let x = document.getElementById('x').innerText;
let y = document.getElementById('y').innerText;

let num1 = parseFloat(x);
let num2 = parseFloat(y);

let sum = num1 + num2;

document.getElementById("total").innerHTML = sum + " PHP";