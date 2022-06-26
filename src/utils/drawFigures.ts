import { dragMouse, mouseToggle, moveMouseSmooth } from "robotjs";

export const drawCircle = (x, y, radius) => {
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const newX = x + radius * Math.cos(i);
    const newY = y + radius * Math.sin(i);

    mouseToggle("down", "left");
    moveMouseSmooth(newX, newY);
  }
  mouseToggle("up", "left");
};

export const drawRectangle = (startX, startY, width, height) => {
  let x = startX;
  let y = startY;

  for (let i = 0; i <= 4; i += 1) {
    if (i === 1) {
      x += width;
    } else if (i === 2) {
      y += height;
    } else if (i === 3) {
      x -= width;
    } else if (i === 4) {
      y -= height;
    }

    mouseToggle("down", "left");
    dragMouse(x, y);
  }
  mouseToggle("up", "left");
};
