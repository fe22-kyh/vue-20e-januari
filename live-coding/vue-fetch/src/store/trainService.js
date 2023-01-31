const apiKey = "1fe946fe-b04e-4e67-92f8-ad83afa1471c";

const cityLookupURL = cityName => {
  return `https://api.resrobot.se/v2.1/location.name?input=${cityName}&format=json&accessId=${apiKey}`;
}

const routeLookupURL = (fromId, toId) => {
  return `https://api.resrobot.se/v2.1/trip?format=json&originId=${fromId}&destId=${toId}&passlist=true&showPassingPoints=true&time=08:00&accessId=${apiKey}`;
}

function fetchJson(url) {
  return fetch(url).then(resp => resp.json());
}

function getExtId(data) {
  return data.stopLocationOrCoordLocation[0].StopLocation.extId
}


export async function searchDeparture(from, to) {
  let fromUrl = cityLookupURL(from);
  let toUrl = cityLookupURL(to);

  let idPromises = [
    fetchJson(fromUrl).then(getExtId),
    fetchJson(toUrl).then(getExtId)
  ];

  // let fromId = await fetchJson(fromUrl).then(getExtId);
  // let toId = await fetchJson(toUrl).then(getExtId);

  let response = await Promise.all(idPromises);
  let routeUrl = routeLookupURL(response[0], response[1]);

  let route = await fetchJson(routeUrl);

  let data = {
    nr: route.Trip[0].LegList.Leg[0].number,
    time: route.Trip[0].Origin.time,
    arrival: route.Trip[0].Destination.time
  }

  return data
}