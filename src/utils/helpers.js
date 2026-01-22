export const getScaleRatio4x3 = ({width, height}) => {
  if (width && height) throw new Error('Provide either width or height, not both');
  if (width) {
    return 1440 / width;
  }
  if (height) {
    return 1080 / height;
  }
}

/**
 * @param num {number}
 * @returns {string}
 */
export const hexNumToString = (num) => {
  return "#" + num.toString(16).padStart(6, "0");
}

/**
 * @param str
 * @returns {number}
 */
export const hexString2Num = (str) => {
  return parseInt(str.replace(/^#/, ""), 16);
}