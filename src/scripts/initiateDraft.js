import selectSeason from "./selectSeason"; 
import playerIDs2021 from "./playerIDs2021";
import players2021 from "./players2021";
import sortIDs from "./sortIDs";
import playerVitals from "./playerVitals";
import returnInput from "./userInput";
import connectPlayerInfo from "./connectPlayerInfo";

async function initiateDraft(season, seasonSelected) {
  let fullDetails = {}, scores = [], nameAndID = []; // create separate function that includes this line until line 89
  seasonSelected.innerHTML = `${season} - ${season + 1}`;
  
  selectSeason();
  
  if (season === 2021) {
    // seasonSelected.innerHTML = '2021 - 2022';
    await connectPlayerInfo(playerIDs2021, fullDetails, nameAndID, scores, players2021);
  } else {
    console.log('current season')
    // seasonSelected.innerHTML = '2022 - 2023';
    // await connectPlayerInfo(playerIDs2021, fullDetails, nameAndID, scores, players2021);
  }

  let sortedScores = scores.sort().reverse();
  let sortedIDs = sortIDs(sortedScores, playerIDs2021, fullDetails);
  let playerInfo = playerVitals(sortedIDs, fullDetails);
  const userInput = returnInput(fullDetails, sortedScores, playerInfo);

  Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) if (obj.hasOwnProperty(key)) size++;
    console.log('SIZE', size);
    return size;
  };
  
  if (Object.size(fullDetails) >= 50) {
    document.getElementById("draft-button").disabled = false;
    document.getElementById("draft-button").value = "Draft!";
  } else {
    alert('Please refresh the page! :)');
    document.getElementById("draft-button").value = ":O";
  }

  return userInput;
}

export default initiateDraft;