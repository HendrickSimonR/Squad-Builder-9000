function displayModal(modal) { // takes input which modal 
  let id = document.getElementById(`${modal}-modal`);
  let close = document.getElementsByClassName(`close-${modal}`)[0];
  id.style.display = 'block';
  document.body.style.height = '100%';
  document.body.style.overflow = 'hidden';
  close.addEventListener('click', () => closeModal(id));

  let infoQuestions = document.getElementById('info-modal-questions');
  let footer = document.getElementById('footer');
  infoQuestions.appendChild(footer);
}

function closeModal(id) { // takes input which modal
  id.style.display = 'none';
  document.body.style.height = '100%';
  document.body.style.overflowX = 'hidden';
  document.body.style.overflowY = 'scroll';
}

export { displayModal, closeModal };