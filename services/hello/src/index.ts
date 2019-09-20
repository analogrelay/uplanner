import * as express from "express";
import * as request from "request";

import log from "./logging";

const app = express();
const port = 8080;

const RNG_SERVICE_URL = "http://rng.uplanner";

app.get("/", (req, res) => {
    request(`${RNG_SERVICE_URL}/from/20/to/30`, (error, __, body) => {
        if (error) {
            res.status(500);
            res.send(`Upstream error: ${error}`);
        } else {
            res.status(200);
            res.contentType("text/plain");
            const apiResp = JSON.parse(body);
            res.send(`Random Number: ${apiResp.result}`);
        }
    });
});

const server = app.listen(port, () => {
    log.info(`Hello Service is running on port ${port}`);
});

function shutDown() {
    log.info("Shutting down...");
    server.close(() => {
        log.info("Server shut down.");
        process.exit(0);
    });
}

process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown);
