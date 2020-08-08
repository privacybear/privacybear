import { getCredentials } from "../Auth/auth";
import { serverURL } from "../server-config";

export { Dashboard } from "./Dashboard";
export { Stats } from "./Stats";
export { Menu } from "./Menu";

export interface ISiteInfo {
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

export async function getUserHistory(): Promise<ISiteInfo[]> {
  let history = sessionStorage.getItem("history");

  if (history && !["null", "undefined"].includes(history + "")) {
    console.log({ history });
    return JSON.parse(history);
  } else {
    const { history } = await fetchWithCredentials(serverURL + "/history");

    sessionStorage.setItem("history", JSON.stringify(history));
    console.log({ history });
    return history;
  }
}

/**
 * Returns the last websites visited in a certain time restriction.
 * @param history History Data of a user from the database.
 * @param restriction A time restriction as a number in hours.
 */
export function getWebsitesVisited(history: ISiteInfo[], restriction?: number) {
  const now = Date.now();
  const recentlyVisited = history
    .filter(
      ({ timestamp }) =>
        !restriction || +timestamp + restriction * 1000 * 60 * 60 >= now
    )
    .map(({ site }) => site);

  return recentlyVisited;
}

export function getDataSharedCount(history: ISiteInfo[]) {
  return history.filter(({ permissions }) => permissions.length > 0).length;
}

export function removeDuplicates<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function countSites(history: ISiteInfo[]) {
  const counter = {} as { [key: string]: number };

  for (let siteInfo of history) {
    counter[siteInfo.site] = counter[siteInfo.site]
      ? ++counter[siteInfo.site]
      : 1;
  }
  return counter;
}


export function counterToChartData(counter: {
  [key: string]: number;
}): { labels: string[]; data: number[] } {
  const chartData = { labels: [], data: [] } as {
    labels: string[];
    data: number[];
  };
  // leti = 0;
  for (const item of Object.keys(counter)) {
    chartData.labels.push(item);
    chartData.data.push(counter[item]);
  }

  // console.log({ chartData });
  return chartData;
}
