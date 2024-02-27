import { ApolloServer } from '@apollo/server';
import allTypeDefs from './src/schemas/index.schema.js';
import allResolvers from './src/resolvers/Index.resolver.js';
import mongoose from 'mongoose';
import { logger } from './src/helpers/logger.js';
import chalk from 'chalk';
import dotenv from 'dotenv'

/**
 * creating the graph ql server 
 */
const server = new ApolloServer({
  typeDefs: allTypeDefs,
  resolvers: allResolvers,
  includeStacktraceInErrorResponses: false, //to exclude stackTrace parameter from error messages
  introspection: true,
});
/**
 * dot env to use environment variables
 */
dotenv.config();
/**
 * @type : plugin /middle ware
 * @description: use to log type of the request
 */
const requestPlugin = (req, res, next) => {
  const { query, operationName } = req.body;
  if (query && operationName) {
    if (operationName !== 'IntrospectionQuery') {
      const type = query.split(' ')[0].toLowerCase();
      const formattedType = chalk.yellow.bold(type);
      const formattedName = chalk.yellow.bold(operationName);
      console.log(`Type: ${formattedType}, Name: ${formattedName}`);
      logger.info(`Inside ${type} :: ${operationName}`)
    }

  }
  req.context = { logger };
  next();
}

/**
 * mongodb connection setup
 * 
 */
const connectToMongoDB = async () => {
  try {
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const mongodbUri = process.env.DATABASE_URL;
    mongoose.set('strictQuery', false);
    mongoose.connect(mongodbUri, connectionOptions).then(() => {
      console.log(chalk.yellow.bold('################################################################'));
      console.log(chalk.italic.bold('=====🚀🚀🚀 ####   Connected to MongoDB    #### 🚀🚀🚀======'))
      console.log(chalk.yellow.bold('################################################################'));
    }).catch((err) => {

    });
  } catch (error) {
    console.error(chalk.redBright.bold('Error connecting to MongoDB:', error));
    process.exit(1); // Exit the process with an error code
  }
};

export { server, requestPlugin, connectToMongoDB };