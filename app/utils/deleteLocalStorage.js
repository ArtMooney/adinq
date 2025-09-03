export function deleteLocalStorage(name) {
  if (!process.client) return null;
  
  localStorage.removeItem(name);
}
