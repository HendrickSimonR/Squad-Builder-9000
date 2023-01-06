function startCountdown() {
  let counter = 40;
  
  const interval = setInterval(() => {
    console.log(typeof counter)
    console.log(counter);
    counter--;
    
    let countdown = document.getElementById("countdown");
    countdown.innerHTML = `:${counter}`;

    if (counter === 0 ) {
      clearInterval(interval);
      let draftButton = document.getElementById("draft-button");
      let countdownPrompt = document.getElementById('countdownPrompt');
      countdown.setAttribute('class', 'countdown');
      
      if (draftButton.disabled === false) {
        countdown.innerHTML = 'Change Season';
        countdown.addEventListener('click', () => switchForm('season'));
      } else {
        countdown.innerHTML = 'Refresh Page';
        countdown.addEventListener('click', () => switchForm('refresh'));
      }

      countdownPrompt.style.display = 'none';
    }
  }, 1000);
}

const switchForm = (prompt) => {
  if (prompt === 'season') {
    let selectSeason = document.getElementById('select-season');
    let mainForm = document.getElementById('form');
    mainForm.style.display = 'none';
    selectSeason.style.display = 'flex';
  } else {
    window.location.reload();
  }
}


export default startCountdown;