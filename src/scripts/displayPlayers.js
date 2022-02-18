function displayPlayers(team) {
  let stats = document.getElementsByClassName('player-info');
  if (stats.length > 0) clearStats();

  let teamInfo = Object.values(team);

  console.log('teaminfo', teamInfo);

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

    renderStats(person.stats, playerInfo);
    console.log('person', person)
  }

function renderStats(stats, playerInfo) {
  let pts = `Points Per Game: ${stats.pts}`
  let ast = `Assists Per Game: ${stats.ast}`
  let blk = `Blocks Per Game: ${stats.blk}`
  let ftm = `Free Throws Made: ${stats.ftm}`
  let stl = `Steals Per Game: ${stats.stl}`
  let reb = `Rebounds Per Game: ${stats.reb}`
  let games = `Games Played: ${stats.games}`
  let min = `Minutes Per Game: ${stats.min}`
  let to = `Turnovers Per Game: ${stats.to}`

  let statArr = [ pts, ast, reb, stl, blk, ftm, to, games, min ];

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
      console.log('stattttt', stats[i])
      stats[i].remove();
    }
  }
}
  // for (let player in team) {
  //   let info = [];

  //   for (let details in player) {
  //     if (typeof player[details] === 'object') {
  //       let stats = player[details];

  //       for (let stat in stats) {
  //         if (stat === 'pts') {
  //           info.push(`PTS: ${stats[stat]}`);
  //         } else if (stat === 'ast') {
  //           info.push(`AST: ${stats[stat]}`);
  //         } else if (stat === "reb") {
  //           info.push(`REB: ${stats[stat]}`);
  //         }
  //       }
  //     } 
  //   }

  //   // players.push(info);
  // }

  // return players;
}

export default displayPlayers;