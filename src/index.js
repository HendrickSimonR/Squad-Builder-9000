import Example from "./scripts/example";
import fetchPlayerStats from "./scripts/fetchPlayerStats"
import players from "./scripts/players"

document.addEventListener("DOMContentLoaded", async () => {
  // const main = document.getElementById("main");
  // new Example(main);
  
  let full_details = [];
    for (let i = 0; i < players.length; i++) {      
      let playerID = Object.keys(players[i])[0];
      let playerObj;

      if (i % 1 === 0) {
        setTimeout(() => {}, 1000000000000);
        playerObj = await fetchPlayerStats(playerID);
      } else {
        playerObj = await fetchPlayerStats(playerID);
      }

      let stats = playerObj.data[0];
      let playerName = players[i][playerID].name; 
      let playerPos = players[i][playerID].pos;
      let playerTeam = players[i][playerID].team;

      let offPoints = stats.pts + (stats.ast * 1.5) + stats.ftm;
      let defPoints = (stats.reb * 1.2) + (stats.stl * 2) + (stats.blk * 2);
      let to = stats.turnover;
      let fantasyAvg = (offPoints + defPoints - to) / 7;

      let playerInfo = { [playerID]: {
        name: playerName,
        pos: playerPos,
        team: playerTeam,
        stats: { pts: stats.pts, ast: stats.ast, ftm: stats.ftm, reb: stats.reb, stl: stats.stl, blk: stats.blk, to: stats.turnover },
        avg: fantasyAvg
        }
      };

      console.log(playerInfo);
      full_details.push(playerInfo);
      console.log(full_details.length);
    }

  console.log(players.length);
  console.log(full_details);
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