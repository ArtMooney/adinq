export function setLocalStorage(name, value, ttl) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };

  localStorage.setItem(name, JSON.stringify(item));
}
