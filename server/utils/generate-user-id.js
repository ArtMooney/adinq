export function generateUserId(users) {
  let randomId;
  let isUnique;

  do {
    isUnique = true;
    randomId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();

    for (const user of users.results) {
      if (user["reset-id"] === randomId) {
        isUnique = false;
        break;
      }
    }
  } while (!isUnique);

  return randomId;
}
