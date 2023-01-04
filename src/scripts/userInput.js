import draftTeams from "./draftTeams";
import renderTeam from "./renderTeam";
import displayPlayers from "./displayPlayers";

function returnInput(fullDetails, sortedScores, playerInfo) {
  let userInput = document.getElementById('form');
  console.log("DRAFTTTTT")
  
  userInput.addEventListener('submit', function (e) {
    e.preventDefault();
    
    let firstName;
    let lastName;
    let fave = e.target[0].value;
    let participants = e.target[1].value;
    let order = e.target[2].value;

    if (parseInt(order) > parseInt(participants)) {
      let error = document.getElementById('form-error');
      error.style.display = 'block';
      return;
    }

    if (fave.includes(' ')) {
      fave = fave.split(' ');

      for (let i = 0; i < fave.length; i++) {
        let name = fave[i]; 
        let capped = name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();

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

    let team = draftTeams(fullDetails, userValues, sortedScores, playerInfo);
    displayPlayers(team);
    renderTeam(team);
    return userValues;
  });
}


export default returnInput;

