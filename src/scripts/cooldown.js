function startCountdown() {
  let counter = 45;
  
  const interval = setInterval(() => {
    console.log(counter);
    counter--;
    
    let countdown = document.getElementById("countdown");
    countdown.innerHTML = `:${counter}`;

    if (counter === 0 ) {
      clearInterval(interval);
      let draftButton = document.getElementById("draft-button");
      let countdownPrompt = document.getElementById('countdownPrompt');
      countdown.setAttribute('class', 'countdown');
      countdownPrompt.style.display = 'none';

      if (draftButton.disabled === false) {
        // countdown.innerHTML = 'Change Season';
        countdown.addEventListener('click', () => switchForm('season', countdown));
      } else {
        // countdown.innerHTML = 'Refresh Page';
        countdown.addEventListener('click', () => switchForm('refresh'));
      }
    }
  }, 1000);
}

const switchForm = (prompt, countdown = null) => {
  if (prompt === 'season') {
    let selectSeason = document.getElementById('select-season');
    let mainForm = document.getElementById('form');
    let countdownPrompt = document.getElementById('countdownPrompt');
    countdown.innerHTML = ':45';
    countdownPrompt.style.display = 'block';
    mainForm.style.display = 'none';
    selectSeason.style.display = 'flex';
  } else {
    window.location.reload();
  }
}


export default startCountdown;