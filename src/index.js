import Example from "./scripts/example";
let best_players = [
  237, 115, 140, 15, 278, 367, 132, 192, 
  57, 172, 378, 246, 666786, 472, 214, 490, 
  145, 434, 79, 322, 401, 303, 227, 70,
  37, 4, 176, 447, 22, 220, 17, 268,
  185, 460, 286, 125, 375, 306, 61, 112,
  315
];

let player_names = [
  'Lebron James', 'Steph Curry', 'Kevin Durant','Giannis Antentokounmpo', 'Damian Lillard', 'Chris Paul', 'Luka Doncic', 'James Harden',
  'Devin Booker','Paul George','Kristaps Porzingis','Nikola Jokic', 'Ja Morant', 'Russell Westbrook', 'Jrue Holiday', 'Trae Young',
  'Joel Embiid','Jayson Tatum','Jimmy Butler','Donovan Mitchell', 'Derrick Rose', 'CJ McCollum', 'Brandon Ingram', 'Jaylen Brown',
  'Bradley Beal', 'Bam Adebayo', 'Rudy Gobert', 'Karl-Anthony Towns', 'Deandre Ayton', 'Dwight Howard', 'Carmelo Anthony', 'Zach Lavine',
  'Draymond Green', 'Nikola Vucevic', 'Kyle Lowry', 'DeMar DeRozan', 'Michael Porter Jr.', 'JaVale McGee', 'Mikal Bridges', 'Jae Crowder',
  'Khris Middleton'
];


document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main");
  new Example(main);
  
  let avg_scores = [];
  let avg_with_names = [];
 
  for (let i = 0; i < best_players.length; i++) {
    let url = `https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=
    ${best_players[i]}`
    .replace(/\s/g, '');
    

    fetch(url)
      .then((response) => {
        return response.json();
      })

      .then((player) => {
        let stats = player.data[0];

        let offPoints = stats.pts + (stats.ast * 1.5) + stats.ftm;
        let defPoints = (stats.reb * 1.2) + (stats.stl * 2) + (stats.blk * 2);
        let to = stats.turnover;
        let avg = (offPoints + defPoints - to) / 7;

        console.log(`${player_names[i]}, ${best_players[i]}, ${i}`);
        console.log(`Average Score: ${avg}`);
        avg_scores.push(avg);
        avg_with_names.push( [`${player_names[i]}`, avg]);

        if (avg_scores.length === best_players.length) {
          console.log(avg_with_names.push([`${player_names[i]}`, avg]));
          avg_scores.sort();
          console.log(avg_scores);

          for (let i = 0; i < avg_scores.length; i++) {
            for (let j = 0; j < avg_with_names.length; j++) {  
              if (avg_with_names[j].includes(avg_scores[i])) {
                console.log(avg_with_names[j][0]);
                console.log(avg_scores[i]);
                break;
              }
            }
          }
        } 
      })


    }

  });
