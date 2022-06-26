export const BRGToRGB = (data: Buffer): Buffer => {
  let rgb = [];

  for (let i = 0; i < data.length; i += 4) {
    rgb.push(data[i + 2], data[i + 1], data[i], data[i + 3]);
  }

  return Buffer.from(rgb);
};
