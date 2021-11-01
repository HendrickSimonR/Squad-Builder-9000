// import Example from "./scripts/example";
// let best_players = [
//   237,
//   115,
//   140,
//   15,
//   278,
//   367,
//   132,
//   192,
//   57,
//   172,
//   378,
//   246,
//   666786,
//   472,
//   214,
//   490,
//   145,
//   434,
//   79,
//   322,
//   401,
//   303,
//   227,
//   70,
//   37,
//   4,
//   176,
//   447,
//   22,
//   220,
//   17,
//   268,
//   185,
//   460,
//   286,
//   125,
//   375,
//   306,
//   61,
//   112
// ];

// let player_names = [
//   'Lebron James', 'Steph Curry', 'Kevin Durant','Giannis Antentokounmpo', 'Damian Lillard', 'Chris Paul', 'Luka Doncic', 'James Harden',
//   'Devin Booker','Paul George','Kristaps Porzingis','Nikola Jokic', 'Ja Morant', 'Russell Westbrook', 'Jrue Holiday', 'Trae Young',
//   'Joel Embiid','Jayson Tatum','Jimmy Butler','Donovan Mitchell', 'Derrick Rose', 'CJ McCollum', 'Brandon Ingram', 'Jaylen Brown',
//   'Bradley Beal', 'Bam Adebayo', 'Rudy Gobert', 'Karl-Anthony Towns', 'Deandre Ayton', 'Dwight Howard', 'Carmelo Anthony', 'Zach Lavine',
//   'Draymond Green', 'Nikola Vucevic', 'Kyle Lowry', 'DeMar DeRozan', 'Michael Porter Jr.', 'JaVale McGee', 'Mikal Bridges', 'Jae Crowder'
// ];
// // 
// // 'Chris Paul'
// // 'Kawhi Leonard',
// // 'Luka Doncic',
// // 'James Harden',
// // 'Kyrie Irving',
// // 367, 274, 132, 192, 228


// document.addEventListener("DOMContentLoaded", () => {
//   const main = document.getElementById("main");
//   new Example(main);
  
//   let avg_scores = [];
//   let avg_with_names = [];
//   // console.log(avg_scores);
//   // let player_names = {237: 'Lebron James', 115: 'Steph Curry', 140: 'Kevin Durant', 15: 'Giannis Antentokounmpo', 278: 'Damian Lillard'};

//   for (let i = 0; i < best_players.length; i++) {
//     let url = `https: //www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=
//     ${best_players[i
//       ]
//     }`
//     .replace(/\s/g, '');
    
//     // https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=237
//     fetch(url)
//       .then((response) => {
//         return response.json();
//     })

//       .then((player) => {
//         let stats = player.data[
//         0
//       ];
//         // console.log(stats.player_id);
//       // console.log(stats.pts);
//       // console.log(stats.ast);
//         let offPoints = stats.pts + (stats.ast * 1.5) + stats.ftm;
//         let defPoints = (stats.reb * 1.2) + (stats.stl * 2) + (stats.blk * 2);
//         let to = stats.turnover;
//         let avg = (offPoints + defPoints - to) / 7;
//         // teamAVG += avg;
//       // console.log(stats.pts))
//         console.log(`${player_names[i
//         ]
//       }, ${best_players[i
//         ]
//       }, ${i
//       }`);
//         console.log(`Average Score: ${avg
//       }`);
//         avg_scores.push(avg);
//         avg_with_names.push( [`${player_names[i
//           ]
//         }`, avg
//       ]);
//         // avg_scores[`${player_names[i]}`] = (`${avg}`);
//       // console.log(avg_scores);
//         if (avg_scores.length === best_players.length) {
//           console.log(avg_with_names.push([`${player_names[i
//             ]
//           }`, avg
//         ]));
//           avg_scores.sort();
//           // console.log(avg_scores);
//           console.log(avg_scores);

//           for (let i = 0; i < avg_scores.length; i++) {
//             for (let j = 0; j < avg_with_names.length; j++) {  
//               if (avg_with_names[j
//             ].includes(avg_scores[i
//             ])) {
//                 console.log(avg_with_names[j
//               ][
//                 0
//               ]);
//                 console.log(avg_scores[i
//               ]);
//                 break;
//                 // console.log(avg_with_names[j]);
//             }
//           }
//         }
//         // console.log(avg_scores[i][0]);     
//       }
//     })

//       // .then(() => {
//     //   console.log(avg_scores);
//     // });
//     // player.data[0].map(stat => {
//     //     console.log(stat);
//     // let 
//     // console.log(stats);
//     // console.log(Object.entries(stats));
//     // for (const [key, value] of Object.entries(stats)) {
//     //   console.log(`${key}: ${value}`);
//     // }
//     // console.log(avg_scores);     
//   }
//   // console.log(players_done);
//   // const main = document.querySelector("#main")
//   // myJson.forEach(json => {
//   //   const h2 = document.createElement("h2")
//   //   h2.innerHTML(json.ast)
//   //   main.appendChild(h2)
//   //   console.log(json)
//   // })
// });
        
//         // Promise.all(avg_scores).then(function () {
// //   console.log(avg_scores);
// // });
// // fetch('https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=237')
// //   .then((response) => {
// //     return response.json();
// //   })
// //   .then((myJson) => {
// //     console.log(myJson);
// //   });
// //can make functions inside index.js
// // axios.get('https://api.github.com/users/mapbox')
// //   .then(response => response.json())
// //   .then(data => console.log(data));    
// // https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=`${i}`
// // pts + ass + reb = result   return result 