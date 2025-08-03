export function getLocalStorage(name) {
  if (!process.client) return null;

  const itemStr = localStorage.getItem(name);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(name);
    return null;
  }

  return item.value;
}
