import { WebSocketServer, createWebSocketStream } from "ws";
import { moveMouse as mvMouse, getMousePos, screen } from "robotjs";
import Jimp from "jimp";
import { type } from "os";

import { drawRectangle, drawCircle } from "./drawFigures";
import { BRGToRGB } from "./image";
import { WS_PORT } from "../configuration/constants";
import { Command, OS } from "../types/index";

export const handleWS = (ws: WebSocketServer) => {
  console.log(`Start websocket server on the ${WS_PORT} port!`);

  const wsStream = createWebSocketStream(ws, {
    encoding: "utf-8",
    decodeStrings: false,
  });

  wsStream.on("data", async (message) => {
    const [command, distance, height] = message.split(" ");

    const formattedDistance = Number(distance);
    const formattedHeight = Number(height);

    const { x, y } = getMousePos();

    if (command !== Command.SEND_POSITION && command !== Command.PRINT_SCREEN) {
      wsStream.write(command);
    }

    switch (command) {
      case Command.SEND_POSITION: {
        const output = `${command} ${x},${y}\0`;

        wsStream.write(output);
        break;
      }

      case Command.PRINT_SCREEN: {
        const screenshotSize = type() === OS.MAC ? 200 : 100; // pixels density is higher for apple devices

        const bitmap = screen.capture(
          x - screenshotSize / 2, // to capture screenshot with the cursor position as image center
          y - screenshotSize / 2,
          screenshotSize,
          screenshotSize
        );

        const rgbImage = BRGToRGB(bitmap.image);

        const img = new Jimp(
          {
            data: rgbImage,
            width: bitmap.width,
            height: bitmap.height,
          },
          (err, image) => {
            return image || err;
          }
        );

        try {
          const mime = img.getMIME();
          const base64 = await img.getBase64Async(mime);
          const formatted = base64.replace("data:image/png;base64,", "");

          wsStream.write(`${command} ${formatted} \0`);
        } catch (e) {
          console.error(e);
        }

        break;
      }

      case Command.UP:
        mvMouse(x, y - formattedDistance);
        break;

      case Command.DOWN:
        mvMouse(x, y + formattedDistance);
        break;

      case Command.LEFT:
        mvMouse(x - formattedDistance, y);
        break;

      case Command.RIGHT:
        mvMouse(x + formattedDistance, y);
        break;

      case Command.CIRCLE: {
        drawCircle(x, y, formattedDistance);
        break;
      }

      case Command.SQUARE: {
        drawRectangle(x, y, formattedDistance, formattedDistance);
        break;
      }

      case Command.RECTANGLE: {
        drawRectangle(x, y, formattedDistance, formattedHeight);
        break;
      }

      default:
        return null;
    }
  });
};
