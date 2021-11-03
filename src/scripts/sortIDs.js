function sortIDs(sortedScores, playerIDs, fullDetails) {
  let highestFirst = [];

  for (let i = 0; i < sortedScores.length; i++) {
    let score = sortedScores[i];

    for (let j = 0; j < playerIDs.length; j++) {
      let player = fullDetails[playerIDs[j]];

      if (player) {
        if (player.avg === score) {
          highestFirst.push(playerIDs[j]);
        }
      }
    }
  }

  return highestFirst;
}

export default sortIDs;