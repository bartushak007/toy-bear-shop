export const resolvePath = (
  filePath,
  prefix = process.env.PUBLIC_URL ? process.env.PUBLIC_URL.concat("/") : "./"
) => (filePath.startsWith("http") ? filePath : prefix.concat(filePath || '/images/noImg1.jpg'));

export const capitalizeFirst = str =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
