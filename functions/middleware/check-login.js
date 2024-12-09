export async function checkLogin(headers, userName, userPass) {
  const authHeader = headers.get("Authorization");
  const decodedString = atob(authHeader.replace("Basic ", ""));
  const [email, password] = decodedString.split(":");

  return userName === email && userPass === password;
}
