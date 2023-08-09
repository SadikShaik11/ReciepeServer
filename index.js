import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import {server} from './server.js'
import { requestPlugin } from './server.js';
import { connectToMongoDB } from './server.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import chalk from 'chalk';
// Create an Express app
const app = express();
await server.start();
app.use(cors());
app.use(bodyParser.json());
app.use('/graphql',(req,res,next)=>requestPlugin(req,res,next));
app.use('/graphql', expressMiddleware(server));
const httpServer = http.createServer(app);



connectToMongoDB()
// // Start the HTTP server
httpServer.listen(4000, () => {
  console.log(chalk.yellow.bold('################################################################')); 
  chalk.italic.bold(console.log(`=====🚀🚀🚀GraphQL server listening on port ${process.env.PORT} 🚀🚀🚀=====`))
});
