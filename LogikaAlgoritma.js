function hitungKarakter(paragraf) {
    var hasil = {};
    for (var i = 0; i < paragraf.length; i++) {
        var karakter = paragraf[i].toLowerCase();
        if (hasil[karakter] === undefined) {
            hasil[karakter] = 1;
        } else {
            hasil[karakter]++;
        }
    }
    return hasil;
}

var paragraf = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
console.log(hitungKarakter(paragraf));

function deretA(n) {
    var hasil = [];
    for (var i = 0; i < n; i++) {
        hasil.push(i * i);
    }
    return hasil;
}

function deretB(n) {
    var hasil = [];
    var tambahan = 0;
    for (var i = 0; i < n; i++) {
        hasil.push(1 + tambahan);
        tambahan += 2 * i + 1;
    }
    return hasil;
}

function deretC(n) {
    var hasil = [];
    if (n > 0) hasil.push(0);
    if (n > 1) hasil.push(1);
    for (var i = 2; i < n; i++) {
        hasil.push(hasil[i - 1] + hasil[i - 2]);
    }
    return hasil;
}

function deretD(n) {
    var hasil = [];
    if (n > 0) hasil.push(0);
    if (n > 1) hasil.push(0);
    if (n > 2) hasil.push(1);
    for (var i = 3; i < n; i++) {
        hasil.push(hasil[i - 1] + hasil[i - 2] + hasil[i - 3]);
    }
    return hasil;
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('\nMasukkan nilai n: ', (answer) => {
    let n = parseInt(answer);

    console.log("Deret A:", deretA(n), "\n");
    console.log("Deret B:", deretB(n), "\n");
    console.log("Deret C:", deretC(n), "\n");
    console.log("Deret D:", deretD(n), "\n");

    rl.close();
});