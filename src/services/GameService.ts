import { Server, Socket } from "socket.io";
import { GameEvents } from "../constants/GameEvents";

class GameService {
    private _socketServer: Server;

    constructor(socketServer: Server) {
        this._socketServer = socketServer;
        this.initGameService();
    }

    private initGameService = () => {
        this._socketServer.on(GameEvents.CONNECTION, this.onSocketConnect);
    };

    private onSocketConnect = (socket: Socket) => {
        this._socketServer.emit(GameEvents.USER_CONNECTED, { id: socket.id });
    }
}
export default GameService;