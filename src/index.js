import Example from "./scripts/example";
import fetchPlayerStats from "./scripts/fetchPlayerStats"
import players from "./scripts/players"
import returnInput from "./scripts/userInput"
import playerIDs from "./scripts/playerIDs"
import findPlayer from "./scripts/findPlayer"

document.addEventListener("DOMContentLoaded", async () => {
  // const main = document.getElementById("main");
  // new Example(main);
    
  // const userValues = returnInput();
  // console.log(userValues);
  // let nameValue = document.getElementById("uniqueID").value;

  let fullDetails = {};
  let scores = [];

  function returnInput() {
    let userInput = document.getElementById('form');

    userInput.addEventListener('submit', function (e) {
      e.preventDefault();
      let favorite = e.target[0].value;
      let participants = e.target[1].value;
      let order = e.target[2].value;

      let userValues = { fave: favorite, amount: participants, placement: order }
      console.log(userValues);
      return userValues;
    });
  }

  const userInput = returnInput();
  userInput;

    for (let i = 0; i < 4; i++) {      
      let playerID = playerIDs[i];
      let playerObj;

      if (i % 1 === 0) {
        setTimeout(() => {}, 1000000000000);
        playerObj = await fetchPlayerStats(playerID);
      } else {
        playerObj = await fetchPlayerStats(playerID);
      }

      let stats = playerObj.data[0];
      let playerName;
      let playerPos;
      let playerTeam;

      if (players[playerID]) {
        playerName = players[playerID].name;
        playerPos = players[playerID].pos;
        playerTeam = players[playerID].team;
      }

      // console.log(playerName);
      // console.log(playerPos);
      // console.log(playerTeam);
    
      let offPoints = stats.pts + (stats.ast * 1.5) + stats.ftm;
      let defPoints = (stats.reb * 1.2) + (stats.stl * 2) + (stats.blk * 2);
      let to = stats.turnover;
      let fantasyAvg = (offPoints + defPoints - to) / 7;

      // console.log(fantasyAvg);
    
      let playerInfo = {
        name: playerName,
        pos: playerPos,
        team: playerTeam,
        stats: { pts: stats.pts, ast: stats.ast, ftm: stats.ftm, reb: stats.reb, stl: stats.stl, blk: stats.blk, to: stats.turnover },
        avg: fantasyAvg
      };
      
      fullDetails[playerID] = playerInfo;
    }
      // console.log(playerInfo);
    
    //   // console.log(playerInfo);
    //   scores.push(fantasyAvg);
    //   // console.log(fullDetails.length);
    // }
  // console.log(players);
  // console.log(playerIDs);
  scores.sort().reverse();
  // console.log(players.length);

  // console.log(fullDetails[0][15]);
  // console.log(fullDetails[0][15].name);
  // console.log(fullDetails[27][57]);

  // console.log(findPlayer("Joel Embiid", fullDetails, playerIDs));
  // console.log(scores);
  // {
  //   favoritePlayer: "Jamal Crawford", 
  //   participants: 4, 

  // }


  // function setAction(form) {
  //   form.action = "register.html";
  //   alert(form.action);
  //   return false;
  // }

  // const form = document.getElementById('signup');
});


//object.keys = array of keys of any object

// for (let i = 0; i < best_players.length; i++) {
//   let url = `https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=
//     ${best_players[i]}`
//     .replace(/\s/g, '');


//   fetch(url)
//     .then((response) => {
//       return response.json();
//     })

//     .then((player) => {
//       let stats = player.data[0];

//       let offPoints = stats.pts + (stats.ast * 1.5) + stats.ftm;
//       let defPoints = (stats.reb * 1.2) + (stats.stl * 2) + (stats.blk * 2);
//       let to = stats.turnover;
//       let avg = (offPoints + defPoints - to) / 7;

//       console.log(`${player_names[i]}, ${best_players[i]}, ${i}`);
//       console.log(`Average Score: ${avg}`);
//       avg_scores.push(avg);
//       avg_with_names.push([`${player_names[i]}`, avg]);

//       if (avg_scores.length === best_players.length) {
//         console.log(avg_with_names.push([`${player_names[i]}`, avg]));
//         avg_scores.sort();
//         console.log(avg_scores);

//         for (let i = 0; i < avg_scores.length; i++) {
//           for (let j = 0; j < avg_with_names.length; j++) {
//             if (avg_with_names[j].includes(avg_scores[i])) {
//               console.log(avg_with_names[j][0]);
//               console.log(avg_scores[i]);
//               break;
//             }
//           }
//         }
//       }
//     })


// }