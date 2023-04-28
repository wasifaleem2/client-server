const net = require('net');

// multiple clients server

const PORT = 12345;
const HOST = 'localhost';

const clients = [];

const server = net.createServer((socket) => {
    console.log('Client connected');
    clients.push(socket);

    socket.on('data', (data) => {
        socket.write(`${data}`);
        let [clientName, message] = data.toString().split("::");
        console.log(`Received from ${clientName} --> ${message}`);
        // console.log("client name ##", clientName)
        // console.log("client message ##", message)
        
        // // Broadcast the message to all clients except the sender
        clients.forEach((client) => {
        if (client !== socket) {
            client.write(`${clientName} ${clients.indexOf(socket) + 1}: ${message}`);
        }
        });
    });

    socket.on('end', () => {
        console.log('Client disconnected');
        const index = clients.indexOf(socket);
        if (index > -1) {
        clients.splice(index, 1);
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});
