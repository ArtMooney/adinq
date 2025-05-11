export async function getToken(username, password) {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    username: username,
    password: password,
  });

  let response = await fetch("https://api.baserow.io/api/user/token-auth/", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  return await response.json();
}
