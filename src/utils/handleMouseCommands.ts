import { moveMouse as mvMouse, getMousePos } from "robotjs";

import { drawRectangle, drawCircle } from "./drawFigures";
import { Command } from "../types/index";

const getPosition = () => {
  return getMousePos();
};

export const handleMouse = (
  command: Command,
  distance: number,
  height: number
) => {
  const { x, y } = getPosition();

  switch (command) {
    case Command.UP:
      mvMouse(x, y - distance);
      break;

    case Command.DOWN:
      mvMouse(x, y + distance);
      break;

    case Command.LEFT:
      mvMouse(x - distance, y);
      break;

    case Command.RIGHT:
      mvMouse(x + distance, y);
      break;

    case Command.CIRCLE: {
      drawCircle(x, y, distance);
      break;
    }

    case Command.SQUARE: {
      drawRectangle(x, y, distance, distance);
      break;
    }

    case Command.RECTANGLE: {
      drawRectangle(x, y, distance, height);
      break;
    }

    case Command.SEND_POSITION: {
      console.log(`${command} ${x},${y}\0`);

      break;
    }

    default:
      return null;
  }
};
