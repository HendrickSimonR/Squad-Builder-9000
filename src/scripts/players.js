const players = {
   15: { name: "Giannis Antentokounmpo", pos: "C", team: "Milwaukee Bucks" },
   246: { name: "Nikola Jokic", pos: "C", team: "Denver Nuggets" },
   378: { name: "Kristaps Porzingis", pos: "C", team: "Dallas Mavericks" },
   145: { name: "Joel Embiid", pos: "C", team: "Philadelphia 76ers" },
   176: { name: "Rudy Gobert", pos: "C", team: "Utah Jazz" },
   447: { name: "Karl-Anthony Towns", pos: "C", team: "Minnesota Timberwolves" },
  // { 220: { name: "Dwight Howard", pos: "C", team: "Los Angeles Lakers" } },
   460: { name: "Nikola Vucevic", pos: "C", team: "Chicago Bulls" },
   22: { name: "Deandre Ayton", pos: "C", team: "Phoenix Suns" },
   306: { name: "JaVale McGee", pos: "C", team: "Phoenix Suns" },
   83: { name: "Clint Capela", pos: "C", team: "Atlanta Hawks" },
   3: { name: "Steven Adams", pos: "C", team: "Memphis Grizzlies" },
   115: { name: "Steph Curry", pos: "PG", team: "Golden State Warriors" },
   278: { name: "Damian Lillard", pos: "PG", team: "Portland Trailblazers" },
   367: { name: "Chris Paul", pos: "PG", team: "Phoenix Suns" },
   472: { name: "Russell Westbrook", pos: "PG", team: "Los Angeles Lakers" },
   214: { name: "Jrue Holiday", pos: "PG", team: "Milwaukee Bucks" },
   490: { name: "Trae Young", pos: "PG", team: "Atlanta Hawks" },
   322: { name: "Donovan Mitchell", pos: "PG", team: "Utah Jazz" },
   303: { name: "CJ McCollum", pos: "PG", team: "Portland Trailblazers" },
   401: { name: "Derrick Rose", pos: "PG", team: "New York Knicks" },
   286: { name: "Kyle Lowry", pos: "PG", team: "Miami Heat" },
   132: { name: "Luka Doncic", pos: "PG", team: "Dallas Mavericks" },
   104: { name: "Mike Conley", pos: "PG", team: "Utah Jazz" },
   161: { name: "De-Aaron Fox", pos: "PG", team: "Sacramento Kings" },
   465: { name: "Kemba Walker", pos: "PG", team: "New York Knicks"},
   192: { name: "James Harden", pos: "SG", team: "Brooklyn Nets" },
   61: { name: "Mikal Bridges", pos: "SG", team: "Phoenix Suns" },
   57: { name: "Devin Booker", pos: "SG", team: "Phoenix Suns" },
   268: { name: "Zach Lavine", pos: "SG", team: "Chicago Bulls" },
   37: { name: "Bradley Beal", pos: "SG", team: "Washington Wizards" },
   666786: { name: "Ja Morant", pos: "SG", team: "Memphis Grizzlies" },
   57: { name: "Devin Booker", pos: "SG", team: "Phoenix Suns" },
   397: { name: "Duncan Robinson", pos: "SG", team: "Miami Heat" },
   191: { name: "Tim Hardaway Jr.", pos: "SG", team: "Dallas Mavericks" },
   666423: { name: "RJ Barrett", pos: "SG", team: "New York Knicks" },
   413: { name: "Collin Sexton", pos: "SG", team: "Cleveland Cavaliers" },
   175: { name: "Shai Gilgeous-Alexander", pos: "SG", team: "Oklahoma City Thunder" },
   70: { name: "Jaylen Brown", pos: "SG", team: "Boston Celtics" },
   387: { name: "Julius Randle", pos: "PF", team: "New York Knicks" },
   406: { name: "Domantas Sabonis", pos: "PF", team: "Indiana Pacers" },
   101: { name: "John Collins", pos: "PF", team: "Atlanta Hawks" },
   200: { name: "Tobias Harris", pos: "PF", team: "Philadelphia 76ers" },
   177: { name: "Aaron Gordon", pos: "PF", team: "Denver Nuggets" },
   167: { name: "Danilo Gallinari", pos: "PF", team: "Atlanta Hawks" },
   227: { name: "Brandon Ingram", pos: "PF", team: "New Orleans Pelicans" },
   185: { name: "Draymond Green", pos: "PF", team: "Golden State Warriors" },
   434: { name: "Jayson Tatum", pos: "PF", team: "Boston Celtics" },
   4: { name: "Bam Adebayo", pos: "PF", team: "Miami Heat" },
   112: { name: "Jae Crowder", pos: "PF", team: "Phoenix Suns" },
   375: { name: "Michael Porter Jr.", pos: "PF", team: "Denver Nuggets" },
  // { 17: { name: "Carmelo Anthony", pos: "PF", team: "Los Angeles Lakers" } },
   315: { name: "Khris Middleton", pos: "SF", team: "Milwaukee Bucks" },
   125: { name: "DeMar DeRozan", pos: "SF", team: "Chicago Bulls" },
   237: { name: "Lebron James", pos: "SF", team: "Los Angeles Lakers" },
   140: { name: "Kevin Durant", pos: "SF", team: "Brooklyn Nets" },
   172: { name: "Paul George", pos: "SF", team: "Los Angeles Clippers" },
   219: { name: "Al Horford", pos: "SF", team: "Boston Celtics" },
   79: { name: "Jimmy Butler", pos: "SF", team: "Miami Heat" },
   18: { name: "OG Anunoby", pos: "SF", team: "Toronto Raptors" },
   204: { name: "Gordon Hayward", pos: "SF", team: "Charlotte Hornets" },
   31: { name: "Will Barton", pos: "SF", team: "Denver Nuggets" }
};

export default players;

// let best_players = [
//   237, 115, 140, 15, 278, 367, 132, 192,
//   57, 172, 378, 246, 666786, 472, 214, 490,
//   145, 434, 79, 322, 401, 303, 227, 70,
//   37, 4, 176, 447, 22, 220, 17, 268,
//   185, 460, 286, 125, 375, 306, 61, 112,
//   315
// ];

// let player_names = [
//   'Lebron James', 'Steph Curry', 'Kevin Durant', 'Giannis Antentokounmpo', 'Damian Lillard', 'Chris Paul', 'Luka Doncic', 'James Harden',
//   'Devin Booker', 'Paul George', 'Kristaps Porzingis', 'Nikola Jokic', 'Ja Morant', 'Russell Westbrook', 'Jrue Holiday', 'Trae Young',
//   'Joel Embiid', 'Jayson Tatum', 'Jimmy Butler', 'Donovan Mitchell', 'Derrick Rose', 'CJ McCollum', 'Brandon Ingram', 'Jaylen Brown',
//   'Bradley Beal', 'Bam Adebayo', 'Rudy Gobert', 'Karl-Anthony Towns', 'Deandre Ayton', 'Dwight Howard', 'Carmelo Anthony', 'Zach Lavine',
//   'Draymond Green', 'Nikola Vucevic', 'Kyle Lowry', 'DeMar DeRozan', 'Michael Porter Jr.', 'JaVale McGee', 'Mikal Bridges', 'Jae Crowder',
//   'Khris Middleton'
// ];
