async function fetchPlayerStats(playerID, season) {
  let url = `https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${playerID}`;
  let response = await fetch(url);

  if (response.status === 429) {
    null;
  } else {
    let player = await response.json();
    return player;
  }
};

export default fetchPlayerStats;