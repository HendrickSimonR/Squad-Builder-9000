import team from "./userInput";
import display from "./displayPlayers"



function renderTeam(team) {
  let breaker = document.createElement('br');
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

  let draftLogButton = document.createElement('span');
  draftLogButton.innerHTML = 'Draft Log';
  draftLogButton.setAttribute('id', 'draft-log-button');
  menu.appendChild(draftLogButton);

  let explainButton = document.createElement('span');
  explainButton.innerHTML = '?';
  explainButton.setAttribute('id', 'explain-button');
  menu.appendChild(explainButton)

  let container = document.createElement('div');
  container.setAttribute('id', 'squad-container');
  menu.appendChild(container);
  
  if (team === undefined) {
    header.innerHTML = 'TRY AGAIN!';
    container.appendChild(header);
  } else {
    header.innerHTML = 'YOUR SQUAD';
    container.appendChild(header);
  }

  for (let player in team) {
    let rowEl = document.createElement('div');
    let person = team[player];

    for (let info in person) {
      let col = document.createElement('li');
      let keys = [];
      let values = []

      for (const [key, value] of Object.entries(person)) {
        keys.push(key);
        values.push(value);
      }

      if (typeof person[info] === 'object') {
        let stats = statline(person[info]);
        col.innerHTML = `${stats}`;
        rowEl.appendChild(col);
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
      } else if (person[info] === false) {
        continue;
      } else {
        console.log('current info', info)
        if (info === 'name') {
          let newName = nameTransformer(person[info]);
          rowEl.appendChild(newName);
        } else if (info === 'avg') {
          // let capped = info.toUpperCase();
          col.innerHTML = `AVG FANTASY SCORE: ${person[info].toFixed(4)}`;
          rowEl.appendChild(col);

          let moreInfoButton = document.createElement('button');
          moreInfoButton.setAttribute('id', 'more-info');
          moreInfoButton.innerHTML = 'More Info'
          rowEl.appendChild(moreInfoButton);

          teamAvg += person[info];
        } else if (info === 'image') {
          let playerImg = document.createElement('img');
          rowEl.appendChild(playerImg);
          playerImg.src = person[info];
        } else {
          let capped = info.toUpperCase();
          col.innerHTML = `${capped}: ${person[info].toUpperCase()}`;
          rowEl.appendChild(col);
        }
      }
    }
    
    container.appendChild(rowEl);
    container.appendChild(breaker);
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