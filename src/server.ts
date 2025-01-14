import { createServer } from "http";
import next from "next";
import { Server as SocketServer } from "socket.io";
import { parse } from "url";
import GameService from "./services/GameService"; // Adjust the import path as necessary

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url!, true);
        handle(req, res, parsedUrl);
    }).listen(port);
    const socketServer = new SocketServer(server);
    const _ = new GameService(socketServer);
    console.log(
        `> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV
        }`,
    );
});
