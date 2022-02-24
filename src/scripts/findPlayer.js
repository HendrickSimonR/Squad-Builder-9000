function findPlayer(playerName, fullDetails, playerIDs) {
  let player;

  for (let j = playerIDs.length - 1; j >= 0; j--) {
    let playerKey = playerIDs[j];
    let playerObj = fullDetails[playerKey];
    
    if (playerObj) {
      if (playerObj.name === playerName) {
        player = playerObj;
        return player;  
      } 
    }
  }
}

export default findPlayer;