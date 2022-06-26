// import Jimp from "jimp";
import { httpServer } from "./src/http_server/index";
import { WebSocketServer, createWebSocketStream } from "ws";

import { handleMouse } from "./src/utils/handleMouseCommands";

const HTTP_PORT = 3000;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const ws: WebSocketServer = new WebSocketServer({
  port: WS_PORT,
});

ws.on("connection", (ws) => {
  console.log(`Start websocket server on the ${WS_PORT} port!`);

  const wsStream = createWebSocketStream(ws, {
    encoding: "utf-8",
    decodeStrings: false,
  });

  wsStream.on("data", (message) => {
    const [command, distance, height] = message.split(" ");

    handleMouse(command, Number(distance), Number(height));
  });
});
