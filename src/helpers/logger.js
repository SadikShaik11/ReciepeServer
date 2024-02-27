import { createLogger, format, transports } from 'winston'
const { combine, timestamp, errors, json } = format;
import errorLogger from '../logs/error.logs'
async function Logger() {
  const info = createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { meta: '' },
    transports: [
      new transports.Console(),
      new transports.File({
        level: 'error',
        filename: errorLogger,
        handleExceptions: true,
        json: true,
        maxsize: 10042880,
        maxFiles: 5,
        colorize: false,
      }),
      new transports.File({
        level: 'info',
        filename: '../logs/error.logs',
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
      }),
    ],
  });
  return info;
}
const logger = await Logger()
export { Logger, logger };
