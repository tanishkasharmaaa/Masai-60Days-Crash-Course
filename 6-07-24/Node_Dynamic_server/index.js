const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 1028;

const server = http.createServer((req, res) => {
    const decodePath = decodeURIComponent(req.url);
    const filepath = path.join(__dirname, decodePath);

    fs.stat(filepath, (err, stats) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
            return;
        }

        if (stats.isDirectory()) {
            fs.readdir(filepath, (err, files) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('<h1>500 Internal Server Error</h1>');
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<ul>');

                files.forEach(file => {
                    const isDirectory = fs.statSync(path.join(filepath, file)).isDirectory();
                    const fileIcon = isDirectory ? '&#128193;' : '&#128196;';
                    res.write(`<li>${fileIcon} <a href="${path.join(decodePath, file)}">${file}</a></li>`);
                });

                res.write('</ul>');
                res.end();
            });
        } else {
            fs.readFile(filepath, (err, content) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('<h1>500 Internal Server Error</h1>');
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(content);
            });
        }
    });
});

server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
