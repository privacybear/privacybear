import { getCredentials } from "../Auth/auth";
import { serverURL } from "../server-config";
import { userInfo } from "os";
import { time } from "console";

export { Dashboard } from "./Dashboard";
export { Stats } from "./Stats";
export { Menu } from "./Menu";

interface IHistory {
  _id: string;
  permissions: Array<
    | "COOKIES"
    | "BATTERY"
    | "LOCATION"
    | "REFERRER"
    | "WEBGL_FINGERPRINT"
    | "GOOGLE_ANALYTICS_COOKIE"
  >;
  timestamp: string;
  user: string;
  site: string;
  url: string;
  __v: number;
}

export async function fetchWithCredentials(url: string) {
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCredentials(),
      // 'Access-Control-Allow-Origin': '*'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function getUserData() {
  let user = localStorage.getItem("user");

  if (user && !["null", "undefined"].includes(user + "")) {
    return JSON.parse(user);
  } else {
    const { user } = await fetchWithCredentials(serverURL + "/users");

    localStorage.setItem("user", JSON.stringify(user));

    return user;
  }
}

export async function getUserHistory(): Promise<IHistory[]> {
  let history = sessionStorage.getItem("history");

  if (history && !["null", "undefined"].includes(history + "")) {
    return JSON.parse(history).history;
  } else {
    const { history } = await fetchWithCredentials(serverURL + "/history");

    sessionStorage.setItem("history", JSON.stringify(history));

    return history.history;
  }
}

/**
 * Returns the last websites visited in a certain time restriction.
 * @param history History Data of a user from the database.
 * @param restriction A time restriction as a number in hours.
 */
export async function getWebsitesVisited(
  history: IHistory[],
  restriction: number
) {
  const now = Date.now();
  const recentlyVisited = history
    .filter(({ timestamp }) => +timestamp + restriction * 1000 * 60 * 60 >= now)
    .map(({ site }) => site);

  return recentlyVisited;
}

export async function getDataShareCount(history: IHistory[]) {
  return history.filter(({ permissions }) => permissions.length > 0).length;
}
