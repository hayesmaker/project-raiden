export const getScaleRatio4x3 = ({width, height}) => {
  if (width && height) throw new Error('Provide either width or height, not both');
  if (width) {
    return 1440 / width;
  }
  if (height) {
    return 1080 / height;
  }
}