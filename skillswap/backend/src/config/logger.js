import winston from "winston";
import { config } from './env.js';

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => {
        return `${info.timestamp} [${info.level}]: ${info.message}`;
    })
);

export const logger = winston.createLogger({
    level: config.env === 'development' ? 'debug' : 'info',
    format: logFormat,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true}),
                logFormat
            )
        }),
        new winston.transports.File({
            filename: 'logs/app.log',
            level: 'info'
        })
    ]
})