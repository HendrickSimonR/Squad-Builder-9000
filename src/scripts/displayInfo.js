// your-squad display none 
// intro display block

export function displayInfo() {
  let intro = document.getElementById('intro'), mainButtons = document.getElementById('main-buttons');
  // mainButtons.style.visibility = 'hidden';

  let playerDetails = document.getElementById('player-details'), draftLog = document.getElementById('draft-log');
  let yourSquad = document.getElementById('your-squad');
  let idsArr = [mainButtons, playerDetails, draftLog, yourSquad];
  
  intro.style.display = 'block';
  for (let id of idsArr) id.style.display = 'none';

  // playerDetails.style.display = 'none';
  // draftLog.style.display = 'none';
  // yourSquad.style.display = 'none';
  return;
}