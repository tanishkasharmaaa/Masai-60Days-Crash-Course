const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 1028;
// Create an HTTP server
const server = http.createServer((req, res) => {
    // Decode the URL path to handle special characters
    const decodePath = decodeURIComponent(req.url);
    // Create the full file path by joining the current directory and the decoded URL path
    const filepath = path.join(__dirname, decodePath);
 // Get the stats of the requested path
    fs.stat(filepath, (err, stats) => {
        if (err) {
              // If the path doesn't exist, send a 404 Not Found response
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
            return;
        }

        if (stats.isDirectory()) {
             // If the path is a directory, read its contents
            fs.readdir(filepath, (err, files) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('<h1>500 Internal Server Error</h1>');
                    return;
                }
// Send a 200 OK response with HTML content
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<ul>');// Start an unordered list
// Iterate over each file/directory in the directory
                files.forEach(file => {
                     // Check if the item is a directory or a file
                    const isDirectory = fs.statSync(path.join(filepath, file)).isDirectory();
                     // Choose the appropriate icon for directories and files
                    const fileIcon = isDirectory ? '&#128193;' : '&#128196;';
                     // Write a list item with a link to the file/directory
                    res.write(`<li>${fileIcon} <a href="${path.join(decodePath, file)}">${file}</a></li>`);
                });

                res.write('</ul>');// End the unordered list
                res.end();// End the response
            });
        } else {
            // If the path is a file, read its contents
            fs.readFile(filepath, (err, content) => {
                if (err) {
                    // If there's an error reading the file, send a 500 Internal Server Error response
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('<h1>500 Internal Server Error</h1>');
                    return;
                }
// Send a 200 OK response with plain text content (the file's contents)
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(content);
            });
        }
    });
});
// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
