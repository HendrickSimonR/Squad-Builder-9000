function selectSeason() {
  let button = document.getElementById('select-season');
  let mainForm = document.getElementById('form');
  // let seasonSelected = document.getElementById('selectedSeason');
  // seasonSelected.innerHTML = seasonStr;
  button.style.display = 'none';
  mainForm.style.display = 'flex';
}

export default selectSeason;