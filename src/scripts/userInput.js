import draftTeams from "./draftTeams";
import renderTeam from "./renderTeam";
import displayPlayers from "./displayPlayers";

function returnInput(fullDetails, sortedScores) {
  let userInput = document.getElementById('form');
  
  userInput.addEventListener('submit', function (e) {
    e.preventDefault();
    
    let firstName, lastName, fave = e.target[0].value;
    let participants = e.target[1].value, order = e.target[2].value;

    if (parseInt(order) > parseInt(participants)) {
      let error = document.getElementById('form-error');
      error.style.display = 'block';
      return;
    }

    if (fave.includes(' ')) {
      fave = fave.split(' ');

      for (let i = 0; i < fave.length; i++) {
        let name = fave[i]; 
        let lowered = name.toLowerCase();

        if (i === 0) {
          firstName = lowered;
        } else {
          lastName = lowered;
        }
      }

      fave = firstName + ' ' + lastName;
    }

    let userValues = { 
      favorite: fave, 
      amount: participants, 
      placement: order 
    };

    let team = draftTeams(fullDetails, userValues, sortedScores);
    displayPlayers(team);
    renderTeam(team);
    return userValues;
  });
}


export default returnInput;

