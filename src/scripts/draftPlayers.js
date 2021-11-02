/* 
create arrays depending on how many participants are in the draft
draft players based on score and whether or not the participant has the position filled or not
return the array containing player objects to the user to display as their starting lineup
*/

//use findPlayer function 

function draftPlayers(playerDetails, userInput, scores, playerIDs) {
  //need to find a way to get user input from form
  //let participants = document.getElementWhateverthing(number from form);
  //let userIDX = document.getelementorsomething(user's position)
  //let favorite = document.get(favorite player input);
  let userPlayers = [];
  let favorite = userInput.favorite;
  let amount = userInput.participants;
  let placement = userInput.order;

  while (userPlayers.length < participants) {
    userPlayers.push({PG: null, SG: null, PF: null, SF: null, C: null});
  }
  
  const draftComplete = () => {
    userPlayers.forEach((arr) => {
      let complete = true;
      if (arr.length !== 5) complete = false;
      return complete;
    });
  };

  while (draftComplete === false) {
    draftComplete;

    for (let i = 0; i < userPlayers.length; i++) {
      for (let j = 0; j < playerDetails.length; j++) {
        if (placement - 1 === i) {
          if (favorite !== '') { //steph curry
            //findPlayer function
            //userPlayers[i].push(findPlayer())
          }
        }
      }
    }

    for (let i = userPlayers.length - 1; i >= 0; i--) {

    }

    if (draftComplete) return userPlayers[placement - 1];
  }
}


// [
//   [{},{},{},{},{}],
//   [],[],[],[],[],[]]

// return the index of the user
