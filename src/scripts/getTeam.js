const getTeam = team => {
  let teamArr = Object.values(team), teamInfo = [];
  for (let arr of teamArr) for (let i = 0; i < arr.length; i++) teamInfo.push(arr[i]);
  return teamInfo;
}

export default getTeam;