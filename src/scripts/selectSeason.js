function selectSeason() {
  let button = document.getElementById('select-season');
  let mainForm = document.getElementsByClassName('form');
  button.style.display = 'none';
  mainForm.style.display = 'flex';
}

export default selectSeason;