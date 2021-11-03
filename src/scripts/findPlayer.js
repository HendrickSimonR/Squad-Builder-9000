function findPlayer(playerName, fullDetails, playerIDs) {
  let player;

  for (let i = playerIDs.length - 1; i >= 0; i--) {
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
}
  // console.log(fullDetails[0][15]);
  // console.log(fullDetails[0][15].name)
  // console.log(fullDetails);
  // console.log(playerName);
  // console.log(playerIDs);


export default findPlayer;