export const truncate = (text, len = 50) => {
  return text?.length > len ? text.slice(0, len) + "..." : text;
};