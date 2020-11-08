const http = require('http');
const WebAPIapp = require('./WebAPI/app');
const frontendClient = require('./ClientSide/app');

const APIport = process.env.APIPORT || 3000;
const FrontEndport = process.env.APIPORT || 3001;

const APIserver = http.createServer(WebAPIapp);
const server = http.createServer(frontendClient);

APIserver.listen(APIport, ()=>{
    console.log(`API Server running on port ${APIport}`);   
    server.listen(FrontEndport, ()=>{ console.log(`Front-End Server running on port ${FrontEndport}`)});
});
