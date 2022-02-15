async function fetchPlayerStats(playerID) {
  let url = `https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${playerID}`;
  let response = await fetch(url);

  if (response.status === 429) {
    alert('Please refresh the page! :)');
  } else {
    let player = await response.json();
    return player;
  }
};

export default fetchPlayerStats;