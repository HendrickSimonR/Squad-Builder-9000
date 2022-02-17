import team from "./userInput";
import displayPlayers from './displayPlayers'


function renderTeam(team) {
  let menu = document.getElementById('instructions');
  let nameEl = document.createElement('h1');
  let draftView = document.getElementById('draftView');
  // // menu.style.visibility = 'hidden';
  // draftViewEl.style.visibility = 'visible';
  let header = document.createElement('h1');
  let teamAvg = 0;

  for (let i = menu.children.length - 1; i >= 0; i--) {
    menu.children[i].remove();
  }

  // let draftLogButton = document.createElement('span');
  // draftLogButton.innerHTML = 'Draft Log';
  // draftLogButton.setAttribute('id', 'draft-log-button');
  // menu.appendChild(draftLogButton);

  let explainButton = document.createElement('span');
    explainButton.innerHTML = '?';
    explainButton.setAttribute('id', 'explain-button');
    menu.appendChild(explainButton);

  let container = document.createElement('div');
    container.setAttribute('id', 'squad-container');
    menu.appendChild(container);
    container.appendChild(header);
  
    
  for (let i = 0; i < 2; i++) {
    let squad = document.createElement('div');
    squad.setAttribute('id', `squad-${i + 1}`);
    squad.setAttribute('class', 'squad-row');
    console.log('squad', squad)
    container.appendChild(squad);
  }

  if (team === undefined) {
    header.innerHTML = 'TRY AGAIN!';
  } else {
    header.innerHTML = 'YOUR SQUAD';
    let instructions = document.getElementById('instructions');
    instructions.setAttribute('class', 'results');
  }

  let fullTeam = Object.values(team);

  for (let i = 0; i < fullTeam.length; i++) {
    let player = fullTeam[i];

    console.log('player', player)
    if (i < 3) {
      let row = document.getElementById('squad-1');
      teamAvg += addDetails(row, player);
      console.log('team avg', teamAvg)
    } else {
      let row = document.getElementById('squad-2');
      teamAvg += addDetails(row, player);
      console.log('team avg', teamAvg);
    }
  }

  let total = document.createElement('h1');
  let totalAvg = teamAvg;
  total.innerHTML = `FANTASY TEAM AVG: ${totalAvg.toFixed(4)}`
  container.appendChild(total);
}



function nameTransformer(name) {
  let newName = document.createElement('h2');
  let capped = name.toUpperCase();
  newName.innerHTML = capped;
  return newName;
}



function statline(stats) {
  let selectStats = [];
  console.log('stats', stats)

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

function addDetails(row, person) {
  console.log('details', row, person)
  let avg = 0;
  let player = document.createElement('div');
  player.setAttribute('id', 'player');

  for (let info in person) {
    let col = document.createElement('li');
    let keys = [];
    let values = [];

    for (const [key, value] of Object.entries(person)) {
      keys.push(key);
      values.push(value);
    }

    if (typeof person[info] === 'object') {
      let stats = statline(person[info]);
      col.innerHTML = `${stats}`;
      player.appendChild(col);
     
    } else if (person[info] === false) {
      continue;
    } else {
      console.log('current info', info)
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
        // let moreInfoButton = document.createElement('button');
        // moreInfoButton.setAttribute('id', 'more-info');
        // moreInfoButton.innerHTML = 'More Info'
        // player.appendChild(moreInfoButton);
        console.log('player avg before', avg)
        avg += person[info];
        console.log('player avg after', avg)
      } else {
        let capped = info.toUpperCase();
        col.innerHTML = `${person[info].toUpperCase()}`;
        player.appendChild(col);
      }
    }
  }

  row.appendChild(player);
  return avg;
}

// for (let j = 0; j < display.length; j++) {
//   let rowEl = document.createElement('div');
//   let player = display[j];

//   for (let k = 0; k < player.length; k++) {
//     let info = player[k];
//     let col = document.createElement('div');
//     col.innerHTML = info;
//     rowEl.appendChild(col);
//   }

//   draftViewEl.appendChild(rowEl);
// }
// }

export default renderTeam;



   // let stats = person[info];
        // let statPairs = [];

        // for (const [key, value] of Object.entries(stats)) {
        //   statPairs.push([key, value])
        // }

        // for (let i = 0 ; i < statPairs.length; i++) {
        //   if (statPairs[i].includes('pts')) {
        //     col.innerHTML = `${statPairs[i][0]}: ${statPairs[i][1]}`
        //     rowEl.appendChild(col);
        //   } else if (statPairs[i].includes('ast')) {
        //     col.innerHTML = `${statPairs[i][0]}: ${statPairs[i][1]}`
        //     rowEl.appendChild(col);
        //   } else if (statPairs[i].includes('reb')) {
        //     col.innerHTML = `${statPairs[i][0]}: ${statPairs[i][1]}`
        //     rowEl.appendChild(col);
        //   } else {
        //     continue;
        //   }
        // }