import getTeam from "./getTeam";

function renderTeam(team) {
  let intro = document.getElementById('intro');
  let header = document.createElement('h1');
  let teamAvg = 0;

  for (let i = intro.children.length - 1; i >= 0; i--) intro.children[i].remove();

  let explainButton = document.getElementById('explain-button');
  explainButton.style.visibility = 'visible';

  let container = document.createElement('div');
  container.setAttribute('id', 'squad-container');
  intro.appendChild(container);
  container.appendChild(header);
  
    
  for (let i = 0; i < 2; i++) {
    let squad = document.createElement('div');
    squad.setAttribute('id', `squad-${i + 1}`);
    squad.setAttribute('class', 'squad-row');
    container.appendChild(squad);
  }

  if (team === undefined) {
    header.innerHTML = 'TRY AGAIN!';
  } else {
    let instructions = document.getElementById('instructions');
    instructions.setAttribute('class', 'results');
    header.innerHTML = 'YOUR SQUAD';
  }

  let fullTeam = getTeam(team);
  let center = fullTeam[0], forward = fullTeam[1];
  fullTeam[1] = center;
  fullTeam[0] = forward;

  for (let i = 0; i < fullTeam.length; i++) {
    let player = fullTeam[i];

    if (i < 3) {
      let row = document.getElementById('squad-1');
      teamAvg += addDetails(row, player, i);
    } else {
      let row = document.getElementById('squad-2');
      teamAvg += addDetails(row, player, i);
    }
  }

  let total = document.createElement('h1');
  let totalAvg = teamAvg;

  total.innerHTML = `FANTASY TEAM AVG: ${totalAvg.toFixed(4)}`
  container.appendChild(total);
}



function nameTransformer(name) {
  let newName = document.createElement('h2'), capped = name.toUpperCase();
  newName.innerHTML = capped;
  return newName;
}


function statline(stats) {
  let selectStats = [];

  for (let stat in stats) {
    if (stat === 'pts') {
      selectStats.push(`PPG: ${stats[stat].toString()}  | `);
    } else if (stat === 'ast') {
      selectStats.push(`APG: ${stats[stat].toString()}  | `);
    } else if (stat === 'reb') {
      selectStats.push(`RPG: ${stats[stat].toString()}`);
    }
  }

  return selectStats.join(' ');
}

function addDetails(row, person, idx) {
  let avg = 0, player = document.createElement('div');
  player.setAttribute('id', 'player');
  if (idx === 0 || idx === 2) player.setAttribute('class', 'not-center-top');
  if (idx === 3 || idx === 4) player.setAttribute('class', 'not-center-bottom');
  if (idx === 1) player.setAttribute('class', 'center');
 
  for (let info in person) {
    let col = document.createElement('li');
    let keys = [], values = [];

    for (const [key, value] of Object.entries(person)) {
      keys.push(key);
      values.push(value);
    }
    console.log('info in addDetails', info)
    console.log('object.entries', keys, values, person)

    if (typeof person[info] === 'object') {
      let stats = statline(person[info]);
      col.innerHTML = `${stats}`;
      player.appendChild(col);
     
    } else if (info === 'drafted' || info === 'legacyDraft') {
      continue;
    } else {
      if (info === 'image') {
        let playerImg = document.createElement('img');
        playerImg.src = person[info];
        playerImg.setAttribute('id', 'player-image');
        player.appendChild(playerImg);
      } else if (info === 'name') {
        let newName = nameTransformer(person[info]);
        player.appendChild(newName);
      } else if (info === 'avg') {
        col.innerHTML = `AVG FANTASY SCORE: ${person[info].toFixed(4)}`;
        player.appendChild(col);
        avg += person[info];
      } else if (info !== 'id') {
        if (info === 'season' && person['legacyDraft'] === false) {
          console.log('legacyDraft')
          continue;
        } else {
          col.innerHTML = `Season: ${person[info].toUpperCase()}`;
          player.appendChild(col);
        }
      }
    }
  }

  row.appendChild(player);
  return avg;
}

export default renderTeam;
