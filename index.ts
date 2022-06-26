// import Jimp from "jimp";
import { httpServer } from "./src/http_server/index";
import { WebSocketServer } from "ws";

import { handleWS } from "./src/utils/handleWS";
import { HTTP_PORT, WS_PORT } from "./src/configuration/constants";

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const ws: WebSocketServer = new WebSocketServer({
  port: WS_PORT,
});

ws.on("connection", handleWS);
