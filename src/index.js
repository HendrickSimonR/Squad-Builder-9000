import Example from "./scripts/example";
import fetchPlayerStats from "./scripts/fetchPlayerStats";
import players from "./scripts/players";
import returnInput from "./scripts/userInput";
import playerIDs from "./scripts/playerIDs";
import findPlayer from "./scripts/findPlayer";
import draftTeams from "./scripts/draftTeams";
import sortIDs from "./scripts/sortIDs";
import playerVitals from "./scripts/playerVitals"

 
document.addEventListener("DOMContentLoaded", async () => {

  let fullDetails = {};
  let scores = [];
  let nameAndID = [];


    for (let i = 0; i < playerIDs.length; i++) {      
      let playerID = playerIDs[i];
      let playerObj;

      if (i % 1 === 0) {
        setTimeout(() => {}, 1000000000000);
        playerObj = await fetchPlayerStats(playerID);
      } else {
        playerObj = await fetchPlayerStats(playerID);
      }

      if (!playerObj) {
        alert('Please refresh the page! :)');
        document.getElementById("draft").value = ":(";
        break;
      }  

      let stats = playerObj.data[0];
      let playerName;
      let playerPos;
      let playerTeam;

      if (players[playerID]) {
        playerName = players[playerID].name;
        playerPos = players[playerID].pos;
        playerTeam = players[playerID].team;
        nameAndID.push([playerName, playerID]);
      }

      let offPoints = stats.pts + (stats.ast * 1.5) + stats.ftm;
      let defPoints = (stats.reb * 1.2) + (stats.stl * 2) + (stats.blk * 2);
      let to = stats.turnover;
      let fantasyAvg = (offPoints + defPoints - to);

      let playerInfo = {
        name: playerName,
        pos: playerPos,
        team: playerTeam,
        stats: { pts: stats.pts, ast: stats.ast, ftm: stats.ftm, reb: stats.reb, stl: stats.stl, blk: stats.blk, to: stats.turnover },
        avg: fantasyAvg,
        drafted: false
      };
      
      fullDetails[playerID] = playerInfo;
      scores.push(fantasyAvg);
    }

  let sortedScores = scores.sort().reverse();
  let sortedIDs = sortIDs(sortedScores, playerIDs, fullDetails);
  let playerInfo = playerVitals(sortedIDs, fullDetails);
  

  if (sortedScores.length === playerIDs.length) {
    document.getElementById("draft").disabled = false;
    document.getElementById("draft").value = "Draft!";
  } 

  console.log(fullDetails);
  console.log('ready!')

  // console.log(playerInfo);

  
  const userInput = returnInput(fullDetails, sortedScores, playerInfo);
  userInput;
  // console.log(draftTeams(fullDetails, {favorite: "Lebron James", participants: 10, order: 6}, sortedScores, playerInfo));
});


