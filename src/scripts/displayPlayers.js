import team from "./userInput";

function displayPlayers(team) {
  let players = [];

  for (let player in team) {
    let info = [];

    for (let details in player) {
      if (typeof player[details] === 'object') {
        let stats = player[details];

        for (let stat in stats) {
          if (stat === 'pts') {
            info.push(`PTS: ${stats[stat]}`);
          } else if (stat === 'ast') {
            info.push(`AST: ${stats[stat]}`);
          } else if (stat === "reb") {
            info.push(`REB: ${stats[stat]}`);
          }
        }
      } else if (details === "drafted") {
        continue;
      } else {
        info.push(`${details}: ${player[details]}`);
      }
    }

    players.push(info);
  }

  return players;
}

export default displayPlayers;