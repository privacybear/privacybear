import { getCredentials } from '../Auth/auth';
import { serverURL } from '../server-config';

export { Dashboard } from "./Dashboard";

export async function fetchWithCredentials(url: string) {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCredentials(),
      // 'Access-Control-Allow-Origin': '*'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function getUserData() {
  const user = localStorage.getItem("user");
  if (!!user && String(user) !== "null" && String(user) !== "undefined") {
    return JSON.parse(user);
  } else {
    fetchWithCredentials(serverURL + '/users')
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.user));
        return response.user;
      })
  } 
  
}