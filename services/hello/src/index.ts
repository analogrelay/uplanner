import * as express from "express";

import { dothelog } from "@uplanner/logging";

dothelog();

const log: any = {};
// import log from "./logging";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Hello, world!");
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
