export { Login } from "./Login";
export { Register } from "./Register";
export { Logout } from './Logout';

export async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export function setCredentials(token: string) {
  const item = localStorage.setItem("token", token);
  console.log(item);
}

export function checkCredentials() {
  const token = localStorage.getItem("token");
  return !!token && String(token) !== "null" && String(token) !== "undefined";
}

export function getCredentials(){
  const token = localStorage.getItem("token");
  console.log(token);
  if (token === null || token === undefined) {
    logout();
    return "Token doesn't exist."
  }
  return token;
}

export function logout() {
  console.log(localStorage.getItem("token"));
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}