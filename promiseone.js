var fs = require('fs');
var Promise = require('bluebird');

function countLines(path) {
    return new Promise(function (resolve, reject) {
        let count = 0;
        fs.createReadStream(path)
            .on('data', (chunk) => {
                chunk.forEach(e => {
                    if (e === 10) count++;
                })
            })
            .on('end', () => {
                resolve(count);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}
Promise.all([countLines('3gables.txt'), countLines('13chil.txt')])
    .then(function (countoflines) {
        console.log(countoflines);
    })
    .catch(function (err) {
        console.log("catch" + err.toString());
    });
