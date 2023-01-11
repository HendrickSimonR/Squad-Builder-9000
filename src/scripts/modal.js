function displayModal(modal) { // takes input which modal 
  let id = document.getElementById(`${modal}-modal`);
  let close = document.getElementsByClassName(`close-${modal}`)[0];
  if (id) {
    id.style.display = 'block';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    close.addEventListener('click', () => closeModal(id, modal));
    let infoQuestions = document.getElementById('info-modal-questions');
    let footer = document.getElementById('footer');
    infoQuestions.appendChild(footer);
  } 
}

function closeModal(id, modal) { // takes input which modal
  id.style.display = 'none';
  document.body.style.height = '100%';
  document.body.style.overflowX = 'hidden';
  document.body.style.overflowY = 'scroll';
  if (modal === 'legends') id.setAttribute('id', 'legends-modal-done');
}

export { displayModal, closeModal };