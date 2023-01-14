const readline = require('readline-sync');
let n = Number(readline.question("Masukkan nilai: "));
const hasil = [];
for (let i = 0; i < n; i++)  {
    rumus = i * (i + 1) / 2 + 1;
    hasil.push(rumus);
}
console.log("Output: "+ hasil.join("-"));