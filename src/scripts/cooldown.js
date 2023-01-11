import fullDetails from "./fullDetails";

function startCountdown() {
  let counter = 50;
  
  const interval = setInterval(() => {
    counter--;
    
    let countdown = document.getElementById("countdown");
    let countdownResult = document.getElementsByClassName("countdownResult")[0];
    countdown.style.display = 'block';
    countdown.style.cursor = 'wait';
    countdown.innerHTML = counter >= 10 ? `0:${counter}` : `0:0${counter}`;

    if (counter === 0 ) {
      clearInterval(interval);
      let draftButton = document.getElementById("draft-button");
      let countdownPrompt = document.getElementById('countdownPrompt');
      countdown.style.display = 'none';
      countdown.style.cursor = 'pointer';
      countdownPrompt.style.display = 'none';
      countdownResult.style.display = 'block';

      if (draftButton.disabled === false) {
        countdownResult.innerHTML = 'Change Season';
        countdownResult.addEventListener('click', () => switchForm('season', countdown, countdownResult));
      } else {
        countdownResult.innerHTML = 'Refresh Page';
        countdownResult.addEventListener('click', () => switchForm('refresh'));
      }
    }
  }, 1000);
}

const switchForm = (prompt, countdown = null, result = null) => {
  if (prompt === 'season') {
    let selectSeason = document.getElementById('select-season');
    let mainForm = document.getElementById('form');
    let countdownPrompt = document.getElementById('countdownPrompt');
    countdown.innerHTML = '0:50';
    countdownPrompt.style.display = 'block';
    result.style.display = 'none';
    mainForm.style.display = 'none';
    selectSeason.style.display = 'flex';
    fullDetails = {};
  } else {
    window.location.reload();
  }
}


export { startCountdown, switchForm };