function returnInput() {
  let userInput = document.getElementById('form');
  
  userInput.addEventListener('submit', function (e) {
    e.preventDefault();
    let favorite = e.target[0].value;
    let participants = e.target[1].value;
    let order = e.target[2].value;

    let userValues = { fave: favorite, amount: participants, placement: order }
    return userValues;
  });
}

export default returnInput;

// function getData() {
//   var username = document.getElementsByTagName("input")[0];
//   var email = document.getElementById("email");
//   var password = document.forms[0].password;
//   window.alert(password.value);
// }