function draftTeams(fullDetails, userInput, sortedScores, playerInfo) {
  clearDraftLog();

  let error = document.getElementById('form-error');
  error.style.display = 'none';
  
  let pos, team, details, playerID;
  let teams = [], drafted = [];
  let favorite = userInput.favorite, amount = userInput.amount;
  let userPlacement = userInput.placement - 1;
  let favoriteFound = false, count = 0;

  while (teams.length < amount) teams.push({C: undefined, F: [], G: []});  

  while (count < amount * 5) {
    for (let i = 0; i < teams.length; i++) {
      team = teams[i];

      if (i === userPlacement) {
        if (favoriteFound === false) {
          let favePlayer = draftFavorite(team, favorite, fullDetails, playerInfo);
          favoriteFound = true;

          if (!favePlayer) {
            playerID = draftPlayer(team, fullDetails, playerInfo, sortedScores);
            
            if (playerID) {
              pos = fullDetails[playerID]["pos"];
              team[pos] = fullDetails[playerID];

              details = extractInfo(i, team[pos], pos);
              drafted.push(`${details}, user`);           
            }
          } else {
            pos = fullDetails[favePlayer]["pos"];
            team[pos] = fullDetails[favePlayer];

            details = extractInfo(i, team[pos], pos);
            drafted.push(`${details}, user`);               
          }
        } else {
          playerID = draftPlayer(team, fullDetails, playerInfo, sortedScores);
          
          if (playerID) {           
            pos = fullDetails[playerID]["pos"];
            team[pos] = fullDetails[playerID];
            
            details = extractInfo(i, team[pos], pos);
            drafted.push(`${details}, user`);                             
          }
        }
      } else {
        playerID = draftPlayer(team, fullDetails, playerInfo, sortedScores);
        
        if (playerID) {
          pos = fullDetails[playerID]["pos"];
          team[pos] = fullDetails[playerID];

          details = extractInfo(i, team[pos], pos);
          drafted.push(`${details}`);                      
        }
      }
    }

    count++;

    for (let i = teams.length - 1; i >= 0; i--) {
      team = teams[i];
      playerID = draftPlayer(team, fullDetails, playerInfo, sortedScores);

      if (playerID) {
        pos = fullDetails[playerID]["pos"];
        team[pos] = fullDetails[playerID];
        details = extractInfo(i, team[pos], pos);

        if (i === userPlacement) {
          drafted.push(`${details}, user`);                                     
        } else {
          drafted.push(`${details}`);                     
        }
      }
    }

    count++;
    console.log(teams);
  }

  resetPlayers(playerInfo, fullDetails);
  draftLog(drafted);

  return teams[userPlacement];
}

const checkAvailability = (team, pos) => {
  let centerAvailable = pos === 'C' && team[pos] === undefined;
  let otherAvailable = pos !== 'C' && team[pos].length < 2;
  if (centerAvailable || otherAvailable) return true;
  return false;
}

function draftFavorite(team, name, fullDetails, playerInfo) {
  for (let i = 0; i < playerInfo.length; i++) {
    let player = playerInfo[i];
    let playerID = player[1];
    let pos = player[2];
    let status = fullDetails[playerID]["drafted"];

    if (player) {
      if (player.includes(name) && available && status === false) {
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
      let available = checkAvailability(team, pos);

      if (player) {
        if (player.includes(score) && available && status === false) {
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

function extractInfo(placement, player, pos) {
  let playerName = player.name;
  let playerTeam = player.team;
  let playerAvg = player.avg.toFixed(4);

  return `${placement + 1}, ${playerName}, ${playerTeam}, ${pos}, ${playerAvg}`
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


