import getTeam from "./getTeam";

function draftTeams(fullDetails, userInput) {
  clearDraftLog();

  let error = document.getElementById('form-error');
  error.style.display = 'none';
  
  let team, playerIdx, count = 0;
  let userPlacement = userInput.placement - 1;
  let favorite = userInput.favorite, amount = userInput.amount;
  let teams = [], drafted = [],  allPlayers = Object.values(fullDetails);
  
  while (teams.length < amount) teams.push({C: [], F: [], G: []});  
  allPlayers.sort((a, b) => a['avg'] - b['avg']);

  while (count < 5) {
    if (amount > 1) drafted.push(`Round ${count + 1}`);

    for (let i = 0; i < teams.length; i++) {
      let currentUser = i === userPlacement;
      team = teams[i];

      if (teamComplete(team)) continue;

      if (currentUser && favorite) {
        playerIdx = draftPlayer(team, allPlayers, favorite);
        favorite = null;
      } else {
        playerIdx = draftPlayer(team, allPlayers);
      }
      addPlayer(playerIdx, allPlayers, team, drafted, currentUser, i);        
    }

    count++;

    if (count + 1 !== 6 && amount > 1) drafted.push(`Round ${count + 1}`);

    for (let i = teams.length - 1; i >= 0; i--) {
      let currentUser = i === userPlacement;
      team = teams[i];

      if (teamComplete(team)) continue;

      playerIdx = draftPlayer(team, allPlayers);
      addPlayer(playerIdx, allPlayers, team, drafted, currentUser, i);
    }

    count++;
    console.log('draftProgress', allPlayers)
  }
  console.log('final count', count)
  console.log(teams)
  console.log('drafted', drafted)
  draftLog(drafted);

  return teams[userPlacement];
}

const addPlayer = (playerIdx, allPlayers, team, drafted, currentUser, i) => {
  let player = allPlayers[playerIdx], pos = player["pos"];
  let details = extractInfo(i, player, pos);
  allPlayers[playerIdx] = `${player.name} drafted!`;
  currentUser ? drafted.push(`${details}, user`) : drafted.push(`${details}`);
  team[pos].push(player);
  return;
}

const teamComplete = team => {
  team = getTeam(team);
  return team.length === 5 ? true : false;
}

const checkAvailability = (team, pos) => {
  if (pos === 'C') {
    return team[pos].length < 1 ? true : false;
  } else {
    return team[pos].length < 2 ? true : false;
  }
}

function draftFavorite(name, allPlayers) {
  for (let i = allPlayers.length - 1; i >= 0; i--) {
    let player = allPlayers[i];

    if (typeof player === 'string') {
      continue;
    } else if (player.name.toLowerCase() === name) {
      return i;
    }
  }

  return false;
}

function draftPlayer(team, allPlayers, favorite = null) {
  if (favorite) {
    let faveFound = draftFavorite(favorite, allPlayers); 
    if (faveFound !== false) return faveFound;
  } 

  for (let i = allPlayers.length - 1; i >= 0; i--) {
    let player = allPlayers[i];

    if (typeof player === 'string') {
      continue;
    } else if (checkAvailability(team, player["pos"])) {
      return i;
    }
  }

  return false;
}

function extractInfo(placement, player, pos) {
  let playerName = player.name, playerTeam = player.team, playerAvg = player.avg.toFixed(4);
  return `${placement + 1}, ${playerName}, ${playerTeam}, ${pos}, ${playerAvg}`
}

function draftLog(drafted) {
  let draftLog = document.getElementById('draft-log-results');
  let container = document.getElementById('draft-log');
  let playerDetails = document.getElementById('player-details');

  for (let i = 0; i < drafted.length; i++) {
    let player = drafted[i];

    if (player.includes('Round')) {
      let round = document.createElement('h2');
      round.innerHTML = player;
      draftLog.appendChild(round);
    } else {
      let container = document.createElement('div'), item = document.createElement('li');
      let avg = document.createElement('li'), gap = document.createElement('br');
      let info = player.split(','), details = `${info[1]}, ${info[2]}, ${info[3]}`
      avg.innerHTML = `Fantasy Avg: ${info[4]}`;

      let teamLi = document.createElement('li'), team = `Team ${info[0]}`;
      teamLi.innerHTML = team;
      
      let teamAttribute = info.length > 5 ? 'user-team' : 'other-team'; 

      item.innerHTML = details;
      container.setAttribute('id', `${teamAttribute}-container`);
      item.setAttribute('id', teamAttribute);
      teamLi.setAttribute('id', teamAttribute);
      avg.setAttribute('id', teamAttribute);

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
  for (let i = draftLog.children.length - 1; i >= 0; i--) draftLog.children[i].remove();
}

export default draftTeams;