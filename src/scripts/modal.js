function displayModal() {
  let modal = document.getElementById('modal');
  modal.style.display = 'block';
  document.body.style.height = '100%';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  let modal = document.getElementById('modal');
  modal.style.display = 'none';
  document.body.style.height = '100%';
  document.body.style.overflowX = 'hidden';
  document.body.style.overflowY = 'scroll';
}

export { displayModal, closeModal };