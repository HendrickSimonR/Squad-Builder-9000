function playerVitals(sortIDs, fullDetails) {
  let playerVitals = [];

  for (let i = 0; i < sortIDs.length; i++) {
    let playerID = sortIDs[i];
    let player = fullDetails[playerID];

    if (player) {
      let pos = player.pos, score = player.avg, name = player.name;
      playerVitals.push([name, playerID, pos, score]);
    }
  } 

  return playerVitals;
}


export default playerVitals;