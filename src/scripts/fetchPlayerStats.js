async function fetchPlayerStats(playerID) {
  let url = `https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${playerID}`;
  let response = await fetch(url);
  let player = await response.json();
  return player;
};



export default fetchPlayerStats;