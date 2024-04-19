/**
 * Generates an array of random color codes.
 *
 * @param {number} amount - The number of color codes to generate.
 * @returns {string[]} - An array of random color codes.
 * @param AnhDH
 * @version 1.0.0
 */
export const GenerateArrayOfRandomColorCode = (amount) => {
  const colorArray = [];
  const isDarkColor = (color) => {
    const hexToRgb = (hex) =>
      hex.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));
    const [r, g, b] = hexToRgb(color);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128; 
  };
  for (let i = 0; i < amount; i += 1) {
    let newColor;
    do {
      newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    } while (isDarkColor(newColor));
    colorArray.push(newColor);
  }
  return colorArray;
};

