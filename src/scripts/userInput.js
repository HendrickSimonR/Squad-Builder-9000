function returnInput() {
  let userInput = document.getElementById('form');
  
  userInput.addEventListener('submit', function (e) {
    e.preventDefault();
    let favorite = e.target[0].value;
    let participants = e.target[1].value;
    let order = e.target[2].value;

    let userValues = { fave: favorite, amount: participants, placement: order }
    console.log(userValues);
    return userValues;
  });
}

export default returnInput;

