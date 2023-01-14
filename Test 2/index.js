const readline = require('readline-sync');

let skor_pemain = [];
let rank_gits= [];

let jml_pemain = Number(readline.question("Masukkan jumlah pemain: "));
for (let i = 0; i < jml_pemain; i++)  {
    let skor = Number(readline.question("Masukkan skor: "));
    skor_pemain.push(skor);
}

let jumlah_permainan_gits = Number(readline.question("Masukkan jumlah permainan: "));
for (let i = 0; i < jumlah_permainan_gits; i++)  {
    let temp = [...skor_pemain.sort((a, b) => b - a).filter(function(item, index, inputArray) {
        return inputArray.indexOf(item) == index;
    })];
    let skor = Number(readline.question("Masukkan skor: "));
    temp.push(skor);
    rank_gits.push(temp.sort((a, b) => b - a).indexOf(skor) + 1);
}
console.log(rank_gits.join(' '));
