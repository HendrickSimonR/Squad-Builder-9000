function startCountdown() {
  let counter = 45;
  
  const interval = setInterval(() => {
    console.log(counter);
    counter--;
    
    let countdown = document.getElementById("countdown");
    let countdownResult = document.getElementsByClassName("countdownResult")[0];
    console.log('coutndown', countdownResult)
    countdown.style.display = 'block';
    countdown.innerHTML = `:${counter}`;

    if (counter === 0 ) {
      clearInterval(interval);
      let draftButton = document.getElementById("draft-button");
      let countdownPrompt = document.getElementById('countdownPrompt');
      countdown.style.display = 'none';
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
    countdown.innerHTML = ':45';
    countdownPrompt.style.display = 'block';
    result.style.display = 'none';
    mainForm.style.display = 'none';
    selectSeason.style.display = 'flex';
  } else {
    window.location.reload();
  }
}


export { startCountdown, switchForm };