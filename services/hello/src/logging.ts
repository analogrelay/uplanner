import * as winston from "winston";

const format = winston.format;

const log = winston.createLogger({
    format: format.combine(
        format.errors(),
        format.timestamp(),
    ),
    transports: [
        new winston.transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf((info) =>
                    `[${info.timestamp}] ${info.level}: ${info.message}`),
            ),
        }),
    ],
});

export default log;
