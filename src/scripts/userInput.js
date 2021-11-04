
// import fetchPlayerStats from "./scripts/fetchPlayerStats";
// import players from "./scripts/players";
// import returnInput from "./scripts/userInput";
// import playerIDs from "./scripts/playerIDs";
// import findPlayer from "./scripts/findPlayer";
import draftTeams from "./draftTeams";
import renderTeam from "./renderTeam";
import displayPlayers from "./displayPlayers";
// // import sortIDs from "./scripts/sortIDs";
// // import playerVitals from "./scripts/playerVitals"

function returnInput(fullDetails, sortedScores, playerInfo) {
  let userInput = document.getElementById('form');
  
  userInput.addEventListener('submit', function (e) {
    e.preventDefault();
    let favorite = e.target[0].value;
    let participants = e.target[1].value;
    let order = e.target[2].value;

    let userValues = { fave: favorite, amount: participants, placement: order }
    console.log(userValues);
    let team = draftTeams(fullDetails, userValues, sortedScores, playerInfo);
    console.log(draftTeams(fullDetails, userValues, sortedScores, playerInfo))
    // let display = displayPlayers(team);
    renderTeam(team);
    return userValues;
  });
}

export default returnInput;

