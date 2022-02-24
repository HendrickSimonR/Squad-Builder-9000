function draftTeams(fullDetails, userInput, sortedScores, playerInfo) {
  clearDraftLog();

  let error = document.getElementById('form-error');
  error.style.display = 'none';
  
  let teams = [];
  let drafted = [];
  let favorite = userInput.favorite;
  let amount = userInput.amount;
  let userPlacement = userInput.placement - 1;
  let favoriteFound = false;
  let count = 0;

  while (teams.length < amount) teams.push({});  

  while (count < amount * 5) {
    for (let i = 0; i < teams.length; i++) {
      let team = teams[i];

      if (i === userPlacement) {
        if (favoriteFound === false) {
          let favePlayer = draftFavorite(team, favorite, fullDetails, playerInfo);

          if (!favePlayer) {
            favoriteFound = true;

            let playerID = draftPlayer(team, fullDetails, playerInfo, sortedScores);
            
            if (!playerID) {
              null
            } else {
              let pos = fullDetails[playerID]["pos"];
              team[pos] = fullDetails[playerID];

              let playerName = team[pos].name;
              let playerTeam = team[pos].team;
              let playerAvg = team[pos].avg.toFixed(4);
            
              drafted.push(`${i + 1}, ${playerName}, ${playerTeam}, ${pos}, ${playerAvg}, user`);           
            }
          } else {
            favoriteFound = true;
            let pos = fullDetails[favePlayer]["pos"];
            team[pos] = fullDetails[favePlayer];

            let playerName = team[pos].name;
            let playerTeam = team[pos].team;
            let playerAvg = team[pos].avg.toFixed(4);

            drafted.push(`${i + 1}, ${playerName}, ${playerTeam}, ${pos}, ${playerAvg}, user`);           
          }
        } else {
          let playerID = draftPlayer(team, fullDetails, playerInfo, sortedScores);
          
          if (!playerID) {
            null
          } else {            
            let pos = fullDetails[playerID]["pos"];
            team[pos] = fullDetails[playerID];
            
            let playerName = team[pos].name;
            let playerTeam = team[pos].team;
            let playerAvg = team[pos].avg.toFixed(4);      
               
            drafted.push(`${i + 1}, ${playerName}, ${playerTeam}, ${pos}, ${playerAvg}, user`);                            
          }
        }
      } else {
        let playerID = draftPlayer(team, fullDetails, playerInfo, sortedScores);
        
        if (!playerID) {
          null
        } else {
          let pos = fullDetails[playerID]["pos"];
          team[pos] = fullDetails[playerID];

          let playerName = team[pos].name;
          let playerTeam = team[pos].team;
          let playerAvg = team[pos].avg.toFixed(4);   

          drafted.push(`${i + 1}, ${playerName}, ${playerTeam}, ${pos}, ${playerAvg}`);                     
        }
      }
    }

    count++;

    for (let i = teams.length - 1; i >= 0; i--) {
      let team = teams[i];
      let playerID = draftPlayer(team, fullDetails, playerInfo, sortedScores);

      if (!playerID) {
        null
      } else {
        let pos = fullDetails[playerID]["pos"];
        team[pos] = fullDetails[playerID];

        let playerName = team[pos].name;
        let playerTeam = team[pos].team;
        let playerAvg = team[pos].avg.toFixed(4);   

        if (i === userPlacement) {
          drafted.push(`${i + 1}, ${playerName}, ${playerTeam}, ${pos}, ${playerAvg}, user`);                                    
        } else {
          drafted.push(`${i + 1}, ${playerName}, ${playerTeam}, ${pos}, ${playerAvg}`);                     
        }
      }
    }

    count++;
  }

  resetPlayers(playerInfo, fullDetails);
  draftLog(drafted);

  return teams[userPlacement];
}


function draftFavorite(team, name, fullDetails, playerInfo) {
  for (let i = 0; i < playerInfo.length; i++) {
    let player = playerInfo[i];
    let playerID = player[1];
    let pos = player[2];
    let status = fullDetails[playerID]["drafted"];

    if (player) {
      if (player.includes(name) && team[pos] === undefined && status === false) {
        fullDetails[playerID]["drafted"] = true;
        return playerID;
      }
    }
  }

  return false;
}


function draftPlayer(team, fullDetails, playerInfo, sortedScores) {
  for (let i = 0; i < sortedScores.length; i++) {
    let score = sortedScores[i];

    for (let j = 0; j < playerInfo.length; j++) {
      let player = playerInfo[j];
      let playerID = player[1];
      let pos = player[2];
      let status = fullDetails[playerID]["drafted"];

      if (player) {
        if (player.includes(score) && team[pos] === undefined && status === false) {
          fullDetails[playerID]["drafted"] = true;
          return playerID;
        } 
      }
    }
  }

  return false; 
}

function resetPlayers(playerInfo, fullDetails) {
  for (let i = 0; i < playerInfo.length; i++) {
    let player = playerInfo[i];
    let playerID = player[1];
    let playerFull = fullDetails[playerID];
    playerFull["drafted"] = false;
  }

  return;
}


function draftLog(drafted) {
  let draftLog = document.getElementById('draft-log-results');
  let container = document.getElementById('draft-log');
  let playerDetails = document.getElementById('player-details');

  for (let i = 0; i < drafted.length; i++) {
    let container = document.createElement('div');
    let item = document.createElement('li');
    let avg = document.createElement('li');
    let gap = document.createElement('br');
    let player = drafted[i]
    let info = player.split(',');
    let details = `${info[1]}, ${info[2]}, ${info[3]}`
    avg.innerHTML = `Fantasy Avg: ${info[4]}`;

    let teamLi = document.createElement('li');
    let team = `Team ${info[0]}`
    teamLi.innerHTML = team;
    
    if (info.length > 5) {
      item.innerHTML = details;
      container.setAttribute('id', 'user-team-container');
      item.setAttribute('id', 'user-team');
      teamLi.setAttribute('id', 'user-team');
      avg.setAttribute('id', 'user-team');

      container.appendChild(teamLi);
      container.appendChild(item);
      container.appendChild(avg);
      draftLog.appendChild(container);
      draftLog.appendChild(gap);
    } else {
      item.innerHTML = details;
      container.setAttribute('id', 'other-team-container');
      item.setAttribute('id', 'other-team');
      teamLi.setAttribute('id', 'other-team');
      avg.setAttribute('id', 'other-team');

      container.appendChild(teamLi);
      container.appendChild(item);
      container.appendChild(avg);
      draftLog.appendChild(container);
      draftLog.appendChild(gap);
    }
  }

  container.style.display = 'block';
  playerDetails.style.display = 'block';
}

function clearDraftLog() {
  let draftLog = document.getElementById('draft-log-results');

  for (let i = draftLog.children.length - 1; i >= 0; i--) {
    draftLog.children[i].remove();
  }
}


export default draftTeams;


