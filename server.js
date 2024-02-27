const { Sequelize } = require('sequelize');
import { ApolloServer } from '@apollo/server';
import allTypeDefs from './src/schemas/index.schema.js';
import allResolvers from './src/resolvers/Index.resolver.js';
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
 * sql connection setup
 * 
 */

const connectToSQLDatabase = async () => {
  try {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      host: 'localhost',
      username: 'sa',
      password: '',
      database: 'test',
      logging: false,
    });

    await sequelize.authenticate();

    console.log('Connection to the SQL database has been established successfully.');

    // Sync the models with the database (create tables if they don't exist)
    await sequelize.sync();

    console.log('Models synced with the database.');

    console.log('=====🚀🚀🚀 ####   Connected to SQL Database   #### 🚀🚀🚀');
  } catch (error) {
    console.error('Error connecting to SQL Database:', error);
    process.exit(1); // Exit the process with an error code
  }
};

// Call the function to connect to the SQL database
connectToSQLDatabase();


export { server, requestPlugin, connectToMongoDB };