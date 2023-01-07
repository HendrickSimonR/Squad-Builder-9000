import getTeam from "./getTeam";

function draftTeams(fullDetails, userInput, sortedScores, playerInfo) {
  clearDraftLog();

  let error = document.getElementById('form-error');
  error.style.display = 'none';
  
  let pos, team, details, playerID;
  let teams = [], drafted = [],  allPlayers = Object.values(fullDetails);
  let favorite = userInput.favorite, amount = userInput.amount;
  let userPlacement = userInput.placement - 1, favoriteFound = false, count = 0;

  // console.log('object.values(fullDetails)', Object.values(fullDetails))

  allPlayers.sort((a, b) => a['avg'] - b['avg']);

  while (teams.length < amount) teams.push({C: [], F: [], G: []});  
  
  // console.log(fullDetails);

  while (count < amount * 5) {
    for (let i = 0; i < teams.length; i++) {
      team = teams[i];

      if (i === userPlacement) {
        if (favoriteFound === false) {
          let favePlayer = draftFavorite(team, favorite, allPlayers);
          favoriteFound = true;

          if (!favePlayer) {
            playerID = draftPlayer(team, allPlayers, sortedScores);
            
            if (playerID) {
              let [ id, idx ] = playerID;
              let player = allPlayers[idx];
              // console.log('id, idx', id, idx)
              // console.log('allPlayersIdx', allPlayers[idx], fullDetails[playerID[0]]["pos"]);
              pos = player["pos"];
              team[pos].push(player);
              allPlayers = allPlayers.slice(0, idx).concat(allPlayers.slice(idx + 1));
              details = extractInfo(i, player, pos);
              drafted.push(`${details}, user`);           
            }
          } else {
            pos = fullDetails[favePlayer[0]]["pos"];
            team[pos].push(fullDetails[favePlayer[0]]);
          // fullDetails[favePlayer]['drafted'] = true;
            allPlayers = allPlayers.slice(0, favePlayer[1]).concat(allPlayers.slice(favePlayer[1] + 1));
            details = extractInfo(i, fullDetails[favePlayer[0]], pos);
            drafted.push(`${details}, user`);               
          }
        } else {
          playerID = draftPlayer(team, allPlayers, sortedScores);
          console.log('playerID', playerID)
          if (playerID === false) console.log('false result', i, team)
          
          if (playerID === false) {
            let playerNeeded = fillRole(team);
            playerID = draftRoleplayer(playerInfo, playerNeeded);    
          }

          if (playerID) {           
            pos = fullDetails[playerID[0]]["pos"];
            team[pos].push(fullDetails[playerID[0]]);
          // fullDetails[playerID]['drafted'] = true;
            allPlayers = allPlayers.slice(0, playerID[1]).concat(allPlayers.slice(playerID[1] + 1));
            details = extractInfo(i, fullDetails[playerID[0]], pos);
            drafted.push(`${details}, user`);                             
          } else {
            console.log('jooplah')
          }
        }
      } else {
        playerID = draftPlayer(team, allPlayers, sortedScores);
        //   console.log('playerID', playerID)
        // if (playerID === false) console.log('false result', i, team)

        if (playerID === false) {
          let playerNeeded = fillRole(team);
          playerID = draftRoleplayer(playerInfo, playerNeeded);    
        }

        if (playerID) {
          pos = fullDetails[playerID[0]]["pos"];
          team[pos].push(fullDetails[playerID[0]]);
          // fullDetails[playerID]['drafted'] = true;
          details = extractInfo(i, fullDetails[playerID[0]], pos);
          drafted.push(`${details}`);       
          allPlayers = allPlayers.slice(0, playerID[1]).concat(allPlayers.slice(playerID[1] + 1));
        } else {
          console.log('pooplah')
        }
      }
    }

    count++;

    for (let i = teams.length - 1; i >= 0; i--) {
      team = teams[i];
      // if (i === userPlacement) console.log('currentTeam', team, i);

      playerID = draftPlayer(team, allPlayers, sortedScores);
      console.log('playerID', playerID)
      if (playerID === false) console.log('false result', i, team)
      
      if (playerID === false) {
        let playerNeeded = fillRole(team);
        playerID = draftRoleplayer(playerInfo, playerNeeded);    
      }

      if (playerID) {
        pos = fullDetails[playerID[0]]["pos"];
        allPlayers = allPlayers.slice(0, playerID[1]).concat(allPlayers.slice(playerID[1] + 1));
        team[pos].push(fullDetails[playerID[0]]);
        details = extractInfo(i, fullDetails[playerID[0]], pos);

        if (i === userPlacement) {
          drafted.push(`${details}, user`);                                     
        } else {
          drafted.push(`${details}`);                     
        }
      } else {
        console.log('hooplah')
      }
    }
    console.log('currentTeams', teams)
    // console.log('draftProgress', fullDetails)
    count++;

  }
  console.log('final count', count)
  console.log(teams)
  resetPlayers(playerInfo, fullDetails);
  draftLog(drafted);

  let draftedCount = 0;
  for (let draftedTeam of teams) {
    let teamCount = getTeam(draftedTeam);
    draftedCount += teamCount.length;
  }

  console.log('draftedCount', draftedCount)

  return teams[userPlacement];
}

function draftRoleplayer(playerInfo, playerNeeded) {
  for (let i = 0; i < playerInfo.length; i++) {
    let player = playerInfo[i];
    let playerID = player[1];
    let pos = player[2];
    if (pos === playerNeeded) return playerID;
  }
}


const checkTeam = team => {
  team = getTeam(team);
  return team.length === 5 ? true : false;
}

const checkAvailability = (team, pos) => {
  // console.log('pos availability', pos, team[pos].length)
  if (pos === 'C') {
    return team[pos].length < 1 ? true : false;
  } else {
    return team[pos].length < 2 ? true : false;
  }
}

function draftFavorite(team, name, allPlayers) {
  let playerIdx = null;
  let caseSensitiveName = name.toLowerCase();

  console.log('draftfavoriteallplayers', allPlayers)
  for (let i = allPlayers.length - 1; i >= 0; i--) {
    let player = allPlayers[i];
    if (player.name.toLowerCase() === name.toLowerCase()) playerIdx = i;
    // console.log('playerIdx', playerIdx)
  }

  // if (playerIdx) return false;
  if (playerIdx) {
    let player = allPlayers[playerIdx];
    return [player.id, playerIdx]; 
    // for (let i = 0; i < playerInfo.length; i++) {
    //   let player = playerInfo[i];
    //   let playerID = player[1], pos = player[2];
    //   // let status = fullDetails[playerID]["drafted"];
    //   let available = checkAvailability(team, pos);

    //   if (player) {
    //     if (player.includes(name) && available) {
    //       // fullDetails[playerID]["drafted"] = true;
    //       allPlayers = allPlayers.slice(0, playerIdx).concat(allPlayers.slice(playerIdx + 1));
    //       return [playerID, i];
    //     }
    //   }
  } else {
    return false;
  }
}


// if all positions filled, need to draft player that can fill role

function draftPlayer(team, allPlayers, sortedScores) {
  for (let i = allPlayers.length - 1; i >= 0; i--) {
    let player = allPlayers[i];
    let playerID = player.id, pos = player.pos;
    // let status = fullDetails[playerID]["drafted"];
    let available = checkAvailability(team, pos);

    if (player) {
      if (available) {
        
        if (i === allPlayers.length - 1) {
          console.log('before first if', allPlayers, allPlayers[allPlayers.length - 1].name)
          // allPlayers.pop();
          console.log('after first if', allPlayers, allPlayers[allPlayers.length - 1].name)
        } else {
          console.log('before second if', allPlayers, allPlayers[i].name)
          // allPlayers = allPlayers.slice(0, i).concat(allPlayers.slice(i + 1));
          console.log('after second if', allPlayers, allPlayers[i].name)
        }

        // fullDetails[playerID]["drafted"] = true;
        return [playerID, i];
      }
    }
  }

  return false;
}

const playerDrafted = (fullDetails, playerID) => {
  fullDetails[playerID]['drafted'] = true;
  return fullDetails;
}

const fillRole = team => {
  if (team['G'].length < 2) return 'G';
  if (team['F'].length < 2) return 'F';
  if (team['C'].length < 1) return 'C';
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



// junkyard lol

/* 
    // console.log(teams);
    // for (let i = 0; i < teams.length; i++) {
    //   let draftedTeam = teams[i];
      
    //   if (!checkTeam(draftedTeam)) {
    //     break;
    //   } else if (i === teams.length - 1 && checkTeam(draftedTeam)) {
    //     resetPlayers(playerInfo, fullDetails);
    //     draftLog(drafted);
    //     return teams[userPlacement];
    //   }
    // }
    //   let playerNeeded = null;
//   if (team['F'].length === 2 || team['G'].length === 2) playerNeeded = fillRole(team);

//   for (let i = 0; i < sortedScores.length; i++) {
//     let score = sortedScores[i];

//     for (let j = 0; j < playerInfo.length; j++) {
//       let player = playerInfo[j];
//       let playerID = player[1];
//       let pos = player[2];
//       let status = fullDetails[playerID]["drafted"];
//       let available = checkAvailability(team, pos);
//       // console.log('status', status)
//       // if (playerNeeded !== pos) continue;

//       if (player) {
//         if (player.includes(score) && available && status === false) {
//             // fullDetails[playerID]["drafted"] = true;
//           fullDetails = playerDrafted(fullDetails, playerID);
//           console.log('player', player)
//           console.log('status after found', fullDetails[playerID]['drafted']);
//           console.log('check', fullDetails)
//           return playerID;
//         } 
//       }
//     }
//   }

//   return false; 
// }  let playerIdx = null;
  
  // for (let i = 0; i < allPlayers.length; i++) {
  //   let player = allPlayers[i];
  //   if (player[name]) playerIdx = i;
  // }

  // if (playerIdx) return false;

      - draft from end of allPlayers. if draft successful, pop
    - if draft not successful, traverse until player found. then remove 
      player from that index. 
  
          // fullDetails[playerID]['drafted'] = true;
  // for (let player in fullDetails) allPlayers.push(fullDetails[player]);
  
              let [ id, idx ] = playerID;
              let player = allPlayers[idx];
              console.log('id, idx', id, idx)
              console.log('allPlayersIdx', allPlayers[idx], fullDetails[playerID[0]]["pos"]);
              pos = player["pos"];// fullDetails[playerID[0]]["pos"];
              team[pos].push(player); //team[pos].push(fullDetails[playerID[0]]);
              allPlayers = allPlayers.slice(0, idx).concat(allPlayers.slice(idx + 1));
              // allPlayers = allPlayers.slice(0, playerID[1]).concat(allPlayers.slice(playerID[1] + 1));
              details = extractInfo(i, player, pos);
              drafted.push(`${details}, user`);    

  */

