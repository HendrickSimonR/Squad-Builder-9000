function draftTeams(fullDetails, userInput, sortedScores, playerInfo) {
  clearDraftLog();
  let error = document.getElementById('form-error');
  error.style.display = 'none';
  
  let teams = [];
  let favorite = userInput.favorite;
  let amount = userInput.amount;
  let userPlacement = userInput.placement - 1;
  let favoriteFound = false;
  let count = 0;
  let drafted = [];

  console.log('User Input', userInput);

  while (teams.length < amount) { 
    teams.push({}); 
  }; 

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
              console.log('wtf', pos)
              console.log('fulldetails', fullDetails)
              console.log('pos', pos, i)
              team[pos] = fullDetails[playerID];

              let playerName = team[pos].name;
              let playerTeam = team[pos].team;
              let playerAvg = team[pos].avg.toFixed(4);

              console.log('teampos', team[pos], i)
            
              addToDraftLog('User', team[pos]);   
              drafted.push(`${i + 1}, ${playerName}, ${playerTeam}, ${pos}, ${playerAvg}, user`);           
            }
            
          } else {
            favoriteFound = true;
            let pos = fullDetails[favePlayer]["pos"];
            team[pos] = fullDetails[favePlayer];

            let playerName = team[pos].name;
            let playerTeam = team[pos].team;
            let playerAvg = team[pos].avg.toFixed(4);

            console.log('fulldetails', fullDetails)
            console.log('pos', pos, i)
            console.log('teampos', team[pos], i)

            addToDraftLog('User', team[pos]);
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
               
            console.log('fulldetails', fullDetails);
            console.log('pos', pos, i)
            console.log('teampos', team[pos], i)

            addToDraftLog('User', team[pos]);
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

          console.log('fulldetails', fullDetails)
          console.log('pos', pos, i)
          console.log('teampos', team[pos], i)

          addToDraftLog('not user', team[pos]);
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

        console.log('fulldetails', fullDetails)
        console.log('pos', pos, i)
        console.log('teampos', team[pos], i)

        if (i === userPlacement) {
          addToDraftLog('User', team[pos]);
          drafted.push(`${i + 1}, ${playerName}, ${playerTeam}, ${pos}, ${playerAvg}, user`);                                    
        } else {
          addToDraftLog(i, team[pos]);
          drafted.push(`${i + 1}, ${playerName}, ${playerTeam}, ${pos}, ${playerAvg}`);                     
        }
      }
    }

    count++;
  }

  console.log(userPlacement);
  console.log('teams', teams);
  resetPlayers(playerInfo, fullDetails);
  console.log(typeof teams[userPlacement]);
  console.log('drafted', drafted);
  draftLog(drafted);


  return teams[userPlacement];
}


function draftFavorite(team, name, fullDetails, playerInfo) {
  for (let i = 0; i < playerInfo.length; i++) {
    let player = playerInfo[i];
    let playerID = player[1];
    let pos = player[2];
    let status = fullDetails[playerID]["drafted"];

    // console.log('draftFavorite', player, name);

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


function addToDraftLog(position, playerDetails) {
  console.log('hooplah')
}

function draftLog(drafted) {
  let draftLog = document.getElementById('draft-log-results');
  let container = document.getElementById('draft-log');
  let playerDetails = document.getElementById('player-details');

  for (let i = 0; i < drafted.length; i++) {
    let item = document.createElement('li');
    let avg = document.createElement('li');
    let gap = document.createElement('br');
    let player = drafted[i]
    let info = player.split(',');
    let details = `${info[1]}, ${info[2]}, ${info[3]}`
    avg.innerHTML = `Fantasy Avg: ${info[4]}`;
    // console.log('play', player.split(','));

    let teamLi = document.createElement('li');
    let team = `Team ${info[0]}`
    teamLi.innerHTML = team;
    
    if (info.length > 5) {
      item.innerHTML = details;
      item.setAttribute('id', 'user-team');
      teamLi.setAttribute('id', 'user-team');
      avg.setAttribute('id', 'user-team');

      draftLog.appendChild(teamLi);
      draftLog.appendChild(item);
      draftLog.appendChild(avg);
      draftLog.appendChild(gap);
    } else {
      item.innerHTML = details;
      item.setAttribute('id', 'other-team');
      teamLi.setAttribute('id', 'other-team');
      avg.setAttribute('id', 'other-team');

      draftLog.appendChild(teamLi);
      draftLog.appendChild(item);
      draftLog.appendChild(avg);
      draftLog.appendChild(gap);
    }
  }

  container.style.display = 'block';
  playerDetails.style.display = 'block';
  console.log('draftkids', draftLog.children)
}

function clearDraftLog() {
  let draftLog = document.getElementById('draft-log-results');

  for (let i = draftLog.children.length - 1; i >= 0; i--) {
    draftLog.children[i].remove();
  }
}

      // for (let j = 0; j < sortedScores.length; j++) {
      //     let score = sortedScores[j];

      //     for (let m = 0; m < posWithIDs.length; m++) {
      //       let pos = posWithIDs[m][1];

      //       if (posWithIDs[m].includes(score) && !team.hasOwnProperty(posWithIDs[m][1])) {
      //         let scoreIDX = sortedScores.indexOf(score);
      //         let playerID = posWithIDs[m][0];
      //         team[pos] = fullDetails[playerID];
      //         posWithIDs = posWithIDs.slice(0, m) + posWithIDs.slice(m + 1);
      //         sortedScores = sortedScores.slice(0, scoreIDX) + sortedScores.slice(scoreIDX + 1);
      //         count++;
      //         break;
      //       }
      //     }
      //   }








    // for (let i = userPlayers.length - 1; i >= 0; i--) {
    //   let team = userPlayers[i];

    //     for (let l = 0; l < sortedScores.length; l++) {
    //       let score = sortedScores[l];

    //       for (let m = 0; m < posWithIDs.length; m++) {
    //         let pos = posWithIDs[m][1];

    //         if (posWithIDs[m].includes(score) && !team.hasOwnProperty(posWithIDs[m][1])) {
    //           let scoreIDX = sortedScores.indexOf(score);
    //           team[pos] = fullDetails[posWithIDs[m][0]];

    //           posWithIDs = posWithIDs.slice(0, m) + posWithIDs.slice(m + 1);
    //           sortedScores = sortedScores.slice(0, scoreIDX) + sortedScores.slice(scoreIDX + 1);
    //           break;
    //         }
    //       }
    //     }
    //   } 
        




// [
//   [{},{},{},{},{}],
//   [],[],[],[],[],[]]

// return the index of the user







// const done = () => {
//   let complete = true;

//   userPlayers.forEach((team) => {
//     if (Object.keys(team).length !== 5) complete = false;
//   });

//   return complete;
// };

// function draftPlayers(fullDetails, userInput, sortedScores, nameAndID, posWithIDs) {
//   let userPlayers = [];
//   let favorite = userInput.favorite;
//   let amount = userInput.participants;
//   let placement = userInput.order;
//   let favoriteFound = false;


//   while (userPlayers.length < amount) {
//     userPlayers.push({});
//   }

//   const draftComplete = () => {
//     let complete = true;

//     userPlayers.forEach((team) => {
//       if (Object.keys(team).length !== 5) complete = false;
//     });

//     return complete;
//   };


//   while (draftComplete === false) {

//     for (let i = 0; i < userPlayers.length; i++) {
//       let userPlacement = placement - 1;

//       if (userPlacement === i) {
//         let userTeam = userPlayers[userPlacement];
//         let ogTeamLength = Object.keys(userTeam).length * 1;

//         if (favorite !== '' && favoriteFound === false) { //steph curry
//           for (let k = 0; k < nameAndID.length; k++) {
//             if (nameAndID[k].includes(favorite)) {
//               favoriteFound = true;

//               let playerID = nameAndID[k][1];
//               let playerPos = fullDetails[playerID].pos;
//               let score = fullDetails[playerID].avg;
//               let scoreIDX = sortedScores.indexOf(score);
//               userTeam[playerPos] = fullDetails[playerID];

//               console.log(userTeam);

//               nameAndID = nameAndID.slice(0, k) + nameAndID.slice(k + 1);
//               sortedScores = sortedScores.slice(0, scoreIDX) + sortedScores.slice(scoreIDX + 1);
//               break;
//             }
//           }
//         }

//         if (Object.keys(userTeam).length !== ogTeamLength) {
//           break;
//         } else {
//           for (let l = 0; l < sortedScores.length; l++) {
//             let score = sortedScores[l];

//             for (let m = 0; m < posWithIDs.length; m++) {
//               if (posWithIDs[m].includes(score) && !userTeam.hasOwnProperty(posWithIDs[1])) {
//                 let pos = posWithIDs[1];
//                 let scoreIDX = sortedScores.indexOf(score);
//                 userTeam[pos] = fullDetails[posWithIDs[0]];
//                 posWithIDs = posWithIDs.slice(0, m) + posWithIDs.slice(m + 1);
//                 sortedScores = sortedScores.slice(0, scoreIDX) + sortedScores.slice(scoreIDX + 1);
//                 break;
//               }
//             }
//           }
//         }
//       } else {
//         let otherTeam = userPlayers[i]

//         for (let l = 0; l < sortedScores.length; l++) {
//           let score = sortedScores[l];

//           for (let m = 0; m < posWithIDs.length; m++) {
//             if (posWithIDs[m].includes(score) && !otherTeam.hasOwnProperty(posWithIDs[1])) {
//               let pos = posWithIDs[1];
//               let scoreIDX = sortedScores.indexOf(score);
//               otherTeam[pos] = fullDetails[posWithIDs[0]];
//               posWithIDs = posWithIDs.slice(0, m) + posWithIDs.slice(m + 1);
//               sortedScores = sortedScores.slice(0, scoreIDX) + sortedScores.slice(scoreIDX + 1);
//               break;
//             }
//           }
//         }
//       }
//     }

//     for (let i = userPlayers.length - 1; i >= 0; i--) {
//       let userPlacement = placement - 1;

//       if (userPlacement === i) {
//         let userTeam = userPlayers[userPlacement];

//         for (let l = 0; l < sortedScores.length; l++) {
//           let score = sortedScores[l];

//           for (let m = 0; m < posWithIDs.length; m++) {
//             if (posWithIDs[m].includes(score) && !userTeam.hasOwnProperty(posWithIDs[1])) {
//               let pos = posWithIDs[1];
//               let scoreIDX = sortedScores.indexOf(score);

//               userTeam[pos] = fullDetails[posWithIDs[0]];
//               posWithIDs = posWithIDs.slice(0, m) + posWithIDs.slice(m + 1);
//               sortedScores = sortedScores.slice(0, scoreIDX) + sortedScores.slice(scoreIDX + 1);
//               break;
//             }
//           }
//         }
//       } else {
//         let otherTeam = userPlayers[i]

//         for (let l = 0; l < sortedScores.length; l++) {
//           let score = sortedScores[l];

//           for (let m = 0; m < posWithIDs.length; m++) {
//             if (posWithIDs[m].includes(score) && !otherTeam.hasOwnProperty(posWithIDs[1])) {
//               let pos = posWithIDs[1];
//               let scoreIDX = sortedScores.indexOf(score);

//               otherTeam[pos] = fullDetails[posWithIDs[0]];
//               posWithIDs = posWithIDs.slice(0, m) + posWithIDs.slice(m + 1);
//               sortedScores = sortedScores.slice(0, scoreIDX) + sortedScores.slice(scoreIDX + 1);
//               break;
//             }
//           }
//         }
//       }
//     }
//     // console.log(userPlayers);
//     // if (draftComplete) return userPlayers[placement - 1];
//   }
// }







export default draftTeams;


