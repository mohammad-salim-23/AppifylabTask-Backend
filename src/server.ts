import {Server} from 'http';
import mongoose from 'mongoose';

import app from './app';
import config from './app/config';

let server:Server;

async function main(){
    try{
     await mongoose.connect(process.env.DATABASE_URL as string);

     server = app.listen(config.port,()=>{
        console.log(`Server is running on port ${config.port} in ${config.NODE_ENV} mode`);

     })
    }catch(error){
        console.log('Failed to start server',error);
    }
}
main();

process.on('unhandledRejection',()=>{
    console.log('Unhandled Rejection! Shutting down....');
    if(server){
        server.close(()=>{
            process.exit(1);
        });
    }else{
        process.exit(1);
    }
});
process.on('uncaughtException',()=>{
    console.log('Uncaught Exception! Shutting down....');
})