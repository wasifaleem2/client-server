const net = require('net');
const readline = require('readline');

const user_input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PORT = 12345;
const HOST = 'localhost';
const client = new net.Socket();

let clientName = "John"

async function send(){
    user_input.question('Your message? ', (msg) => {
        // console.log(`msg:, ${msg}!`);
        if(msg === "quit"){
            user_input.close();
            client.destroy();
        }
        else{
            client.write(`${clientName}:: ${msg} `);
            client.on('data', (data) => {
                console.log(`"response from server" ${data}`);
            });
            send();
        }
    });
}

client.connect(PORT, HOST, () => {
    console.log('Connected to server');
    send();
//   user_input.question('Your message? ', (msg) => {
//     console.log(`msg:, ${msg}!`);
//     client.write(`client 1:: ${msg} `);
//     user_input.close();
//   });
});

// client.on('data', (data) => {
//   console.log(`"server" ${data}`);
// //   client.destroy();
// });

client.on('close', () => {
  console.log('Connection closed');
});
