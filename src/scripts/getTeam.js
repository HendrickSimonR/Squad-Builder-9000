const getTeam = team => {
  let teamArr = Object.values(team), teamInfo = [];
  for (let arr of teamArr) teamInfo.push(...arr);
  return teamInfo;
}

export default getTeam;