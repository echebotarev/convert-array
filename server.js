'use strict';

let url = require('url');
let fs = require('fs');
let convert = require('./convert-array-for-trend');

require('http').createServer(function(req, res) {

    let pathname = decodeURI(url.parse(req.url).pathname);
    let param = pathname.split('/')[1];
    let path;

    switch(req.method) {
        case 'GET':
            // Так как поддиректорий нет, то при наличии / или .. в пути сервер должен выдавать ошибку 400.
            if (param &&
                param.indexOf('.') == -1 ||
                pathname.indexOf('..') != -1 ||
                pathname.split('/').length > 2) {

                res.statusCode = 400;
                res.end('Is not correct path');

                return;
            }

            // отдаем index.html
            if (pathname == '/') {

                let path = __dirname + '/public/index.html';
                let file = fs.ReadStream(path);
                sendFile(file, res);

                return;
            }

            // отдаем '/file.ext'
            if (param != 'favicon.ico' && param) {
                let path = __dirname + '/public/' + param;

                fs.stat(path, function(err) {
                    if (err) {
                        console.log('Файл не найден');
                        res.statusCode = 404;
                        res.end('File not found');
                    }
                    else {
                        let file = fs.ReadStream(path);
                        sendFile(file, res);
                    }
                });

                return;
            }

            break;

        case 'POST':
            let arr = decodeURI(url.parse(req.url).pathname.split('/')[1]);
            arr = JSON.parse(arr).arr;

            res.end(convert(arr));

            break;

        default:
            res.statusCode = 502;
            res.end("Not implemented");
    }

}).listen(3000);

function sendFile(file, res) {
    file.pipe(res);

    file.on('error', function(err) {
        res.statusCode = 500;
        res.end('Server Error');
        console.error(err);
    });

    res.on('close', function() {
        file.destroy();
    })
}
