function displayModal(event) {
  let modal = document.getElementById('modal');
  modal.style.display = 'block';
  document.body.style.height = '100%';
  document.body.style.overflow = 'hidden';
  // console.log('open')
}

function closeModal(event) {
  let modal = document.getElementById('modal');
  modal.style.display = 'none';
  document.body.style.height = '100%';
  document.body.style.overflowX = 'hidden';
  document.body.style.overflowY = 'scroll';
  // console.log('close')
}

export { displayModal, closeModal };