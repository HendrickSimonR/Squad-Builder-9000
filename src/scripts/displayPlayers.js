import getTeam from "./getTeam";

function displayPlayers(team) {
  let stats = document.getElementsByClassName('player-info');
  if (stats.length > 0) clearStats();
  console.log('displayPLayersteam', team)
  let teamInfo = getTeam(team);  

  console.log('teamInfo', teamInfo);

  for (let i = 0; i < teamInfo.length; i++) {
    let person = teamInfo[i];

    let playerDetails = document.getElementById('player-details');
    let playerInfo = document.createElement('div');
    playerInfo.setAttribute('class', 'player-info');
    playerInfo.setAttribute('id', `player-${i + 1}`);
    playerDetails.appendChild(playerInfo);

    let playerName = document.createElement('h2');
    playerName.setAttribute('id', 'player-name');
    playerName.innerHTML = person.name;
    playerInfo.appendChild(playerName);

    renderStats(person.stats, playerInfo, person.avg);
  }
}

function renderStats(stats, playerInfo, avg) {
  console.log('stats', stats)
  let pts = `Points Per Game: ${stats.pts}`
  let ast = `Assists Per Game: ${stats.ast}`
  let blk = `Blocks Per Game: ${stats.blk}`
  let stl = `Steals Per Game: ${stats.stl}`
  let reb = `Rebounds Per Game: ${stats.reb}`
  let games = `Games Played: ${stats.games}`
  let min = `Minutes Per Game: ${stats.min}`
  let to = `Turnovers Per Game: ${stats.to}`
  let fantasyAvg = `Avg Fantasy Score: ${avg.toFixed(4)}`

  let statArr = [ 
    pts, ast, reb, stl, blk, to, games, min, fantasyAvg 
  ];

  for (let i = 0; i < statArr.length; i++) {
    let stat = statArr[i];
    let statHTML = document.createElement('li');
    statHTML.innerHTML = stat;
    playerInfo.appendChild(statHTML);
  }
}

function clearStats() {
  let stats = document.getElementsByClassName('player-info');

  if (stats.length !== undefined) {
    for (let i = stats.length - 1; i >= 0; i--) {
      stats[i].remove();
    }
  }
}

export default displayPlayers;