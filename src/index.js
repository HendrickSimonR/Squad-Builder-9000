import fetchPlayerStats from "./scripts/fetchPlayerStats";
import connectPlayerInfo from "./scripts/connectPlayerInfo";
import players2021 from "./scripts/players2021"; // for loop needs this 
import returnInput from "./scripts/userInput";
import playerIDs2021 from "./scripts/playerIDs2021";
import sortIDs from "./scripts/sortIDs";
import playerVitals from "./scripts/playerVitals";
import { displayModal, closeModal } from "./scripts/modal";
import selectSeason from "./scripts/selectSeason"; 

document.addEventListener("DOMContentLoaded", async () => { 
    let explainButton = document.getElementById('explain-button');
  explainButton.addEventListener('click', displayModal);

  let close = document.getElementById('close-modal');
  close.addEventListener('click', closeModal);


  let season21 = document.getElementById('season21'), season22 = document.getElementById('season22');
  let seasonSelected = document.getElementById('selectedSeason');

  season21.addEventListener('click', () => { // initiate draft on season21 button click
    selectSeason();
    seasonSelected.innerHTML = '2021 - 2022';
    /*
     - run function that fetches players and sorts 
    */
  });

  season22.addEventListener('click', () => {
    selectSeason();
    seasonSelected.innerHTML = '2022 - 2023';
  });
  let fullDetails = {}, scores = [], nameAndID = []; // create separate function that includes this line until line 89
  await connectPlayerInfo(playerIDs2021, fullDetails, nameAndID, scores, players2021);
  console.log(fullDetails, scores, nameAndID);
  // function should also initiate spinner graphic, counter, and select different season (other functions)

  // for (let i = 0; i < playerIDs2021.length; i++) { // for loop needs playerIDs2021, nameAndID, fullDetails, scores      
  //   let playerID = playerIDs2021[i];
  //   let playerObj = await fetchPlayerStats(playerID);

  //   // if (i % 1 === 0) {
  //   //   setTimeout(() => {}, 1000000000000);
  //   //   playerObj = await fetchPlayerStats(playerID);
  //   // } else {
  //   //   playerObj = await fetchPlayerStats(playerID);
  //   // }
    
  //   if (!playerObj) continue;  
 
  //   let stats = playerObj.data[0];
  //   let playerName, playerPos, playerTeam, playerImg;

  //   if (players2021[playerID]) {
  //     playerName = players2021[playerID].name;
  //     playerPos = players2021[playerID].pos;
  //     playerTeam = players2021[playerID].team;
  //     playerImg = players2021[playerID].image;
  //     nameAndID.push([playerName, playerID]);
  //   }

  //   let offPoints = stats.pts + (stats.ast * 1.5);
  //   let defPoints = (stats.reb * 1.2) + (stats.stl * 3) + (stats.blk * 3);
  //   let to = stats.turnover;
  //   let fantasyAvg = (offPoints + defPoints - to);
  //   let playerInfo = {
  //     image: playerImg,
  //     name: playerName,
  //     pos: playerPos,
  //     team: playerTeam,
  //     stats: { 
  //       pts: stats.pts, 
  //       ast: stats.ast, 
  //       ftm: stats.ftm, 
  //       reb: stats.reb, 
  //       stl: stats.stl, 
  //       blk: stats.blk, 
  //       to: stats.turnover, 
  //       min: stats.min,
  //       games: stats.games_played
  //     },

  //     avg: fantasyAvg,
  //     drafted: false
  //   };
    
  //   fullDetails[playerID] = playerInfo;
  //   scores.push(fantasyAvg);
  // }

  let sortedScores = scores.sort().reverse();
  let sortedIDs = sortIDs(sortedScores, playerIDs2021, fullDetails);
  let playerInfo = playerVitals(sortedIDs, fullDetails);
  
 // line 87 - 99: separate function that activates draft button and removes spinner

  Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) if (obj.hasOwnProperty(key)) size++;
    return size;
  };
  
  if (Object.size(fullDetails) >= 50) {
    document.getElementById("draft-button").disabled = false;
    document.getElementById("draft-button").value = "Draft!";
  } else {
    alert('Please refresh the page! :)');
    document.getElementById("draft-button").value = ":O";
  }

  // line 104 to end should be initiated in the beginning


  const userInput = returnInput(fullDetails, sortedScores, playerInfo);
  userInput;
});

