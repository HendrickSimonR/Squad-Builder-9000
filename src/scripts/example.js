class Example {
  constructor(ele) {
    this.ele = ele;
    this.ele.innerHTML = "<h1><center>Hooplah!</center></h1>";

    this.handleClick = this.handleClick.bind(this);
    this.ele.addEventListener("click", this.handleClick);
  }

  handleClick() {
    this.ele.children[0].innerHTML = "<center>POOP</center>"
  }
}



export default Example;

// first child

// player_ids = [237, 453, 022435, 23335]

// player_ids = data.id(`${id}`)

// 10 PG 
// 10 SG
// 10 SF
// 10 PF 
// 10 C 

// "{ "PG": [13453, 323. 23423], "SG": [sdugh3],  }"


// "data" = {
//   "key" : "this is a key ",
//   "Key2" : "this is also a key"
// }

