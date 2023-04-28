const net = require('net');
const readline = require('readline');

const PORT = 12345;
const HOST = 'localhost';

const user_input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new net.Socket();

let clientName = "Wasif";

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
                console.log(data);
            });
            send();
        }
    });
}

client.connect(PORT, HOST, () => {
    console.log('Connected to server');
    send();
});

client.on('close', () => {
  console.log('Connection closed');
});
client.on('error', (error) => {
    console.log(`Error occurred: ${error.message}`);
});

