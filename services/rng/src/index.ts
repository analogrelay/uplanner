import * as express from "express";

import log from "./logging";

const app = express();
const port = 8080;

app.get("/from/:lower/to/:upper", (req, res) => {
    const lower = Number.parseInt(req.params.lower, 10);
    const upper = Number.parseInt(req.params.upper, 10);
    if (upper < lower) {
        res.status(500);
        res.send("Upper bound must be higher than lower bound!");
    } else {
        const range = upper - lower;
        const value = Math.floor(Math.random() * range);
        res.status(200);
        res.contentType("application/json");
        res.send({ result: value + lower });
    }
});

const server = app.listen(port, () => {
    log.info(`RNG Service is running on port ${port}`);
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
