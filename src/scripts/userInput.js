
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

    let firstName;
    let lastName;
    let fave = e.target[0].value;
    let participants = e.target[1].value;
    let order = e.target[2].value;

    if (fave.includes(' ')) {
      fave = fave.split(' ');
      
      console.log('LIT', fave)

      for (let i = 0; i < fave.length; i++) {
        let name = fave[i]; 
        let capped = name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
        console.log('capped', capped)

        if (i === 0) {
          firstName = capped;
        } else {
          lastName = capped;
        }
      }

      fave = firstName + ' ' + lastName;
    }

    let userValues = { 
      favorite: fave, 
      amount: participants, 
      placement: order 
    };

    console.log('VALUES', userValues);
    let team = draftTeams(fullDetails, userValues, sortedScores, playerInfo);
    console.log('draftTeams', draftTeams(fullDetails, userValues, sortedScores, playerInfo))
    // let display = displayPlayers(team);
    renderTeam(team);
    return userValues;
  });
}

export default returnInput;

