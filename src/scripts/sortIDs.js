function sortIDs(sortedScores, playerIDs, fullDetails) {
  let rankings = [];

  for (let i = 0; i < sortedScores.length; i++) {
    let score = sortedScores[i];

    for (let j = 0; j < playerIDs.length; j++) {
      let player = fullDetails[playerIDs[j]];

      if (player) {
        if (player.avg === score) {
          rankings.push(playerIDs[j]);
        }
      }
    }
  }

  return rankings;
}

export default sortIDs;