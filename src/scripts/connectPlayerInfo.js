import fetchPlayerStats from "./fetchPlayerStats";

async function connectPlayerInfo(playerIDs, fullDetails, nameAndID, scores, playerVitals) {
  for (let i = 0; i < playerIDs.length; i++) { // for loop needs playerIDs2021, nameAndID, fullDetails, scores      
    let playerID = playerIDs[i];
    let playerObj = await fetchPlayerStats(playerID); // async here before

    if (!playerObj) continue;  
 
    let stats = playerObj.data[0];
    let playerName, playerPos, playerTeam, playerImg;

    if (playerVitals[playerID]) {
      playerName = playerVitals[playerID].name;
      playerPos = playerVitals[playerID].pos;
      playerTeam = playerVitals[playerID].team;
      playerImg = playerVitals[playerID].image;
      nameAndID.push([playerName, playerID]);
    }

    let offPoints = stats.pts + (stats.ast * 1.5);
    let defPoints = (stats.reb * 1.2) + (stats.stl * 3) + (stats.blk * 3);
    let to = stats.turnover;
    let fantasyAvg = (offPoints + defPoints - to);
    let playerInfo = {
      image: playerImg,
      name: playerName,
      pos: playerPos,
      team: playerTeam,
      stats: { 
        pts: stats.pts, 
        ast: stats.ast, 
        ftm: stats.ftm, 
        reb: stats.reb, 
        stl: stats.stl, 
        blk: stats.blk, 
        to: stats.turnover, 
        min: stats.min,
        games: stats.games_played
      },

      avg: fantasyAvg,
      drafted: false
    };
    
    fullDetails[playerID] = playerInfo;
    scores.push(fantasyAvg);
  }
  console.log(fullDetails);
}

export default connectPlayerInfo;