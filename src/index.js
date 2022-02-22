import Example from "./scripts/example";
import fetchPlayerStats from "./scripts/fetchPlayerStats";
import players from "./scripts/players";
import returnInput from "./scripts/userInput";
import playerIDs from "./scripts/playerIDs";
import findPlayer from "./scripts/findPlayer";
import draftTeams from "./scripts/draftTeams";
import sortIDs from "./scripts/sortIDs";
import playerVitals from "./scripts/playerVitals";
import { displayModal, closeModal } from "./scripts/modal";

 
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
      
      // console.log('playerObj', playerObj)

      if (!playerObj) {
        // alert('Please refresh the page! :)');
        // document.getElementById("draft-button").value = ":(";
        continue;
      }  

      let stats = playerObj.data[0];
      let playerName;
      let playerPos;
      let playerTeam;
      let playerImg;

      if (players[playerID]) {
        // console.log('player', players[playerID]);
        playerName = players[playerID].name;
        playerPos = players[playerID].pos;
        playerTeam = players[playerID].team;
        playerImg = players[playerID].image;
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

  let sortedScores = scores.sort().reverse();
  let sortedIDs = sortIDs(sortedScores, playerIDs, fullDetails);
  let playerInfo = playerVitals(sortedIDs, fullDetails);
  

  
  Object.size = function (obj) {
    var size = 0,
    key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  
  if (Object.size(fullDetails) >= 50) {
    document.getElementById("draft-button").disabled = false;
    document.getElementById("draft-button").value = "Draft!";
  } else {
    alert('Please refresh the page! :)');
    document.getElementById("draft-button").value = ":O";
  }

  // console.log(fullDetails);
  // console.log(Object.size(fullDetails));
  // console.log(Object.size(players));
  // console.log(playerIDs.length);
  // console.log(sortedScores.length);
  // console.log('ready!')

  let explainButton = document.getElementById('explain-button');
  // console.log('explain', explainButton)
  explainButton.addEventListener('click', displayModal);

  let close = document.getElementById('close-modal');
  close.addEventListener('click', closeModal);

  
  const userInput = returnInput(fullDetails, sortedScores, playerInfo);
  userInput;
  // console.log(draftTeams(fullDetails, {favorite: "Lebron James", participants: 10, order: 6}, sortedScores, playerInfo));
});

