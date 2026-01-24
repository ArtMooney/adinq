export const formatText = (text) => {
  return text.replace(/\*/g, "•").replace(/\n/g, "<br>").trim();
};
