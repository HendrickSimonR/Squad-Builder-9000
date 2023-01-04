import selectSeason from "./selectSeason"; 
import playerIDs2021 from "./playerIDs2021";
import players2021 from "./players2021";
import sortIDs from "./sortIDs";
import playerVitals from "./playerVitals";
import returnInput from "./userInput";
import connectPlayerInfo from "./connectPlayerInfo";

async function initiateDraft(season, seasonSelected) {
  selectSeason();
  let fullDetails = {}, scores = [], nameAndID = []; // create separate function that includes this line until line 89
  console.log('yippee')
  if (season === 2021) {
    seasonSelected.innerHTML = '2021 - 2022';
    await connectPlayerInfo(playerIDs2021, fullDetails, nameAndID, scores, players2021);
  }

  let sortedScores = scores.sort().reverse();
  let sortedIDs = sortIDs(sortedScores, playerIDs2021, fullDetails);
  let playerInfo = playerVitals(sortedIDs, fullDetails);
  const userInput = returnInput(fullDetails, sortedScores, playerInfo);
  return userInput;
}

export default initiateDraft;